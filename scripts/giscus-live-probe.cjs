/* Passive, read-only smoke of real Giscus on the deployed GitHub Pages site.
 * Runs on an isolated GitHub Actions Chromium runner; never posts or signs in.
 * This checks only anonymously visible UI, NOT authenticated commenting.
 */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const BASE = process.env.GISCUS_SITE_BASE || "https://rocky5502.github.io/rocky_202x/";
const output = path.resolve("artifacts/giscus-live");
fs.mkdirSync(output, { recursive: true });
const checks = [
  { slug: "research-rules", route: "/notes/ten-rules-phd-research-ai", viewport: {width: 1280,height:800}, language: "en" },
  { slug: "ai-confidence", route: "/notes/essays/when-ai-says-i-know", viewport: {width: 390,height:844}, language: "zh-CN" },
];
const failurePatterns = [
  /giscus is not installed/i,
  /repository is not public/i,
  /discussions (?:are|is) not enabled/i,
  /bad credentials/i,
  /discussion category was not found/i,
  /could not load discussions/i,
  /an error occurred/i,
  /error loading comments/i,
  /not installed on this repository/i,
];
(async () => {
const results = [];
let failed = false;
const browser = await chromium.launch({ headless: true });
try {
  for (const check of checks) {
    const context = await browser.newContext({
      viewport: check.viewport, locale: check.language === "zh-CN" ? "zh-CN" : "en-US",
      colorScheme: check.slug === "ai-confidence" ? "dark" : "light",
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__giscusSmokeErrors = [];
      window.addEventListener("message", event => {
        if (event.origin !== "https://giscus.app") return;
        const error = event.data?.giscus?.error;
        if (typeof error === "string") window.__giscusSmokeErrors.push(error.slice(0,220));
      });
    });
    const errors = [];
    page.on("pageerror", e => errors.push("pageerror: " + e.message.slice(0,160)));
    page.on("console", msg => {
      if (msg.type() === "error" && /giscus|Content Security Policy|CSP|iframe|discussion/i.test(msg.text()))
        errors.push("console: " + msg.text().slice(0,160));
    });
    const entryUrl = BASE + (check.language === "zh-CN" ? "?lang=zh-CN" : "") + "#" + check.route;
    const result = { article: check.slug, route: check.route, frame: false, contentPresent: false, fallback: false, likelyConfigured: false, iframeOriginValid: false, errors: [] };
    try {
      await page.goto(entryUrl, {waitUntil: "domcontentloaded", timeout: 30000});
      await page.locator(".onpage-discussion").waitFor({state: "attached", timeout: 12000});
      await page.locator(".onpage-discussion").scrollIntoViewIfNeeded();
      const frame = page.locator("iframe.giscus-frame").first();
      await frame.waitFor({state:"attached",timeout:30000});
      const src = await frame.getAttribute("src") || "";
      result.frame = true;
      result.iframeOriginValid = /^https:\/\/giscus\.app\//.test(src);
      const frameBody = page.frameLocator("iframe.giscus-frame").locator("main");
      await frameBody.waitFor({state:"attached",timeout:15000});
      await page.waitForTimeout(3000); // Briefly allow public GitHub Discussion fetch to settle
      const body = (await frameBody.innerText({timeout:10000})).trim().slice(0,2400);
      result.contentPresent = body.length > 25;
      result.contentSample = body.slice(0,450);
      result.fallback = await page.locator(".onpage-discussion-fallback:visible").count() > 0;
      const providerErrors = await page.evaluate(() => window.__giscusSmokeErrors || []);
      result.providerErrors = providerErrors;
      const fatalErrors = providerErrors.filter(e => !/Discussion not found|Bad credentials|Invalid state value|State has expired/i.test(e));
      result.likelyConfigured = !failurePatterns.some(p=>p.test(body)) && fatalErrors.length === 0;
      result.errors = errors;
      result.stylesheetBlocked = errors.some(e => /giscus\.app\/default\.css/.test(e));
      await page.screenshot({path:path.join(output,check.slug+".png"),fullPage:false});
      if (!result.frame || !result.iframeOriginValid || !result.contentPresent || !result.likelyConfigured || result.fallback || result.stylesheetBlocked) {
        failed = true;
        console.error("GISCUS_SMOKE_FAIL "+JSON.stringify(result));
      } else {
        console.log("GISCUS_SMOKE_PASS "+JSON.stringify(result));
      }
    } catch(e) {
      failed = true;
      result.error = String(e.message || e).slice(0,900);
      result.errors = errors;
      console.error("GISCUS_SMOKE_FAIL "+JSON.stringify(result));
      await page.screenshot({path:path.join(output,check.slug+"-failure.png"),fullPage:false}).catch(()=>{});
    } finally {
      results.push(result);
      await context.close();
    }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(output,"results.json"),JSON.stringify({
    note:"Read-only anonymous widget render test; signed-in commenting and posting were NOT tested.",
    checked:results
  },null,2));
}
if(failed) {
  console.error("Giscus integration smoke failed. Review results and screenshots; do not declare comments working.");
  process.exitCode = 1;
} else {
  console.log("Giscus anonymous widget render smoke passed. This does not test GitHub sign-in or posting.");
}

})().catch(error => { console.error('GISCUS_SMOKE_FATAL '+String(error)); process.exitCode=1; });
