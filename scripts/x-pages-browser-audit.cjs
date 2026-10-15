/* Real Chromium QA for the public X language microsite. */
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("node:fs");
const path = require("node:path");

const base = process.env.AUDIT_BASE || "http://127.0.0.1:4173/rocky_202x/";
const prefix = new URL("x/", base);
const outDir = path.resolve("artifacts/browser-audit");
fs.mkdirSync(outDir, {recursive:true});
const pages = [
  ["", "Build what you"],
  ["docs/", "Understand the language."],
  ["learn/", "Your first steps"],
  ["status/", "Progress without"],
  ["community/", "Build carefully."],
];
const errors = [];
const assert = (ok, description) => {
  console.log((ok ? "PASS: " : "FAIL: ") + description);
  if (!ok) errors.push(description);
};
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{width:1440,height:900,name:"desktop"}, {width:390,height:844,name:"mobile"}]) {
      const context = await browser.newContext({viewport,deviceScaleFactor:1});
      const page = await context.newPage();
      const jsErrors = [], badResponses = [];
      page.on("pageerror", e => jsErrors.push(e.message));
      page.on("response", r => {
        if (r.url().startsWith(prefix.href) && r.status() >= 400) badResponses.push(r.status()+" "+r.url());
      });
      for (const [route,heading] of pages) {
        const dest = new URL(route,prefix);
        const response = await page.goto(dest.href,{waitUntil:"networkidle",timeout:30000});
        assert(response?.status() === 200, viewport.name+" "+route+" returns HTTP 200");
        const h1 = await page.locator("main h1").allTextContents();
        assert(h1.length === 1 && h1[0].includes(heading), viewport.name+" "+route+" has expected H1");
        const widths=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
        assert(widths.scroll <= widths.client + 2,viewport.name+" "+route+" no horizontal overflow");
        const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
        const expectedCanonical = new URL(route, "https://rocky5502.github.io/rocky_202x/x/").href;
        assert(canonical===expectedCanonical,viewport.name+" "+route+" has correct canonical");
        assert(await page.locator('meta[http-equiv="Content-Security-Policy"]').count()===1,
          viewport.name+" "+route+" has CSP");
        if (!route || route==="docs/") {
          await page.screenshot({path:path.join(outDir,"x-"+(route?route.replace("/",""):"home")+"-"+viewport.name+".png"),fullPage:true});
          const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
          const severe=result.violations.filter(x=>x.impact==="critical"||x.impact==="serious");
          assert(severe.length===0,viewport.name+" "+route+" has no serious/critical Axe WCAG findings: "+severe.map(v=>v.id).join(","));
        }
        if(route==="docs/"){
          const input=page.getByRole("searchbox",{name:"Search topics"});
          await input.fill("ownership");
          assert(await page.locator("[data-docs-results] li").count()>=1,
            viewport.name+" offline search resolves ownership query");
          await page.keyboard.press("Control+k");
          assert(await input.evaluate(e=>e===document.activeElement),
            viewport.name+" Ctrl+K focuses docs search");
        }
        if(route==="" && viewport.name==="mobile"){
          const toggle=page.getByRole("button",{name:"Toggle navigation"});
          await toggle.click();
          assert(await toggle.getAttribute("aria-expanded")==="true",
            "Mobile navigation expands accessibly");
        }
      }
      assert(jsErrors.length===0,viewport.name+" JavaScript exceptions: "+jsErrors.join(" | "));
      assert(badResponses.length===0,viewport.name+" local assets load: "+badResponses.join(" | "));
      await context.close();
    }
  } catch (e) {
    errors.push("Browser audit exception: "+String(e));
    console.error(e);
  } finally {
    await browser.close();
  }
  if(errors.length){console.error("X microsite browser QA FAILED: "+errors.length+" issue(s)");process.exitCode=1;}
  else console.log("X microsite browser QA passed.");
})().catch(e=>{console.error(e);process.exitCode=1;});
