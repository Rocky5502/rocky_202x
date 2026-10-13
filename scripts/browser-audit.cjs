/* Browser-level portfolio QA using real Chromium (CI runner). */
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("node:fs");
const path = require("node:path");

const BASE = process.env.AUDIT_BASE || "http://127.0.0.1:4173/rocky_202x/";
const directory = path.resolve("artifacts/browser-audit");
fs.mkdirSync(directory, { recursive: true });
const routes = [
  ["/", "Chandan Kumar Sah"],
  ["/publications", "Publications"],
  ["/projects", "Open research projects"],
  ["/research", "Research & projects"],
  ["/service", "Academic service"],
  ["/recognition", "Recognition & talks"],
  ["/awards", "Awards & Appreciation"],
  ["/news", "News & milestones"],
  ["/connect", "Opportunities & support"],
  ["/cv", "CV & Skills"],
  ["/cv/education", "Education"],
  ["/cv/skills", "Research & technical skills"],
  ["/cv/languages", "Programming & languages"],
];
const issues = [];
const observations = [];
const ok = (condition, message) => {
  if (!condition) { issues.push(message); console.error("FAIL: " + message); }
  else console.log("PASS: " + message);
};
const url = (route) => BASE + "#"+ route;
async function dimensions(page) {
  return page.evaluate(() => ({
    inner: window.innerWidth,
    scroll: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
    title: document.title,
    h1: Array.from(document.querySelectorAll("main h1")).map(node => node.textContent.trim()),
  }));
}
async function auditA11y(page, route) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  const problems = results.violations.map(v => ({
    id: v.id, impact: v.impact, affected: v.nodes.length,
    targets: v.nodes.slice(0, 3).map(n => n.target.join(",")),
  }));
  observations.push({ route, accessibility: problems });
  for (const p of problems) {
    console.log("AXE: " + route + " " + JSON.stringify(p));
    if (p.impact === "critical" || p.impact === "serious") issues.push("Accessibility " + route + ": " + p.id + " (" + p.impact + ")");
  }
}
(async () => {
  const browser = await chromium.launch({headless: true});
  try {
    const context = await browser.newContext({viewport: {width: 1440, height: 900}, deviceScaleFactor: 1});
    const page = await context.newPage();
    const scriptErrors = [];
    const brokenOwnAssets = [];
    page.on("pageerror", error => scriptErrors.push(error.message));
    page.on("response", response => {
      if (response.url().startsWith("http://127.0.0.1:4173/") && response.status() >= 400) brokenOwnAssets.push(response.status() + " " + response.url());
    });
    for (const [route, heading] of routes) {
      await page.goto(url(route), {waitUntil: "networkidle", timeout: 30000});
      const info = await dimensions(page);
      observations.push({route, ...info});
      ok(info.h1.length === 1, route + " has exactly one H1 (" + info.h1.join(", ") + ")");
      ok(info.h1[0]?.startsWith(heading), route + " H1 begins with the correct page title");
      ok(info.scroll <= info.inner + 2, route + " has no horizontal overflow at 1440px (" + info.scroll + "/" + info.inner + ")");
      ok(info.title.includes("Chandan Kumar Sah"), route + " has route-specific document title");
    }
    await page.goto(url("/"), {waitUntil: "networkidle"});
    await page.screenshot({path: path.join(directory, "home-desktop.png"), fullPage: true});
    await auditA11y(page, "home-desktop");

    await page.goto(url("/cv"), {waitUntil: "networkidle"});
    ok(await page.locator("a.cv-layer-card").count() === 3, "CV overview has exactly three entry cards");
    ok(await page.locator(".cv-education-row").count() === 0, "CV overview does not expose degree details");
    await page.screenshot({path: path.join(directory, "cv-overview-desktop.png"), fullPage: true});
    await auditA11y(page, "cv-overview");

    await page.getByRole("link", {name: /Education.*3 degrees/i}).click();
    ok(new URL(page.url()).hash === "#/cv/education", "CV Education entry navigates correctly");
    ok(await page.locator(".cv-education-row").count() === 3, "Education displays the three degrees");
    ok(await page.locator(".cv-school-card").count() === 4, "Education displays four original schools");
    await auditA11y(page, "cv-education");

    await page.goto(url("/awards"), {waitUntil: "networkidle"});
    ok(await page.locator(".award-archive-card").count() === 62, "Awards archive preserves 62 records");
    await page.getByRole("searchbox", {name: "Search archived awards"}).fill("xyz-no-results-portfolio-audit");
    ok(await page.getByText("No records match these filters.").isVisible(), "Awards shows useful no-results state");
    await page.getByRole("button", {name: /Clear all filters/}).click();
    ok(await page.locator(".award-archive-card").count() === 62, "Awards reset restores the archive");
    await auditA11y(page, "awards");

    await page.goto(url("/news"), {waitUntil: "networkidle"});
    ok(await page.locator(".news-entry").count() === 11, "News retains eleven original and new items");
    await page.getByRole("button", {name: "2024", exact: true}).click();
    ok(await page.locator(".news-entry").count() > 0 && await page.locator(".news-entry").count() < 11, "News year filter works");

    await page.goto(url("/connect"), {waitUntil: "networkidle"});
    ok(await page.getByRole("textbox", {name: "PayPal support email address"}).inputValue() === "sahchandan98@gmail.com", "PayPal contact shown correctly");
    await auditA11y(page, "opportunities");

    for (const width of [320, 375, 390, 768, 1024]) {
      await page.setViewportSize({width, height: 844});
      for (const route of ["/", "/cv", "/cv/education", "/cv/skills", "/news", "/awards", "/connect"]) {
        await page.goto(url(route), {waitUntil: "domcontentloaded"});
        await page.locator("main h1").first().waitFor();
        const info = await dimensions(page);
        ok(info.scroll <= info.inner + 2, route + " has no horizontal overflow at " + width + "px (" + info.scroll + "/" + info.inner + ")");
      }
    }
    await page.setViewportSize({width: 390, height: 844});
    await page.goto(url("/"), {waitUntil: "networkidle"});
    await page.screenshot({path: path.join(directory, "home-mobile.png"), fullPage: true});
    const menu = page.getByRole("button", {name: "Open navigation"});
    await menu.click();
    ok(await page.getByRole("navigation", {name: "Mobile navigation"}).isVisible(), "Mobile menu opens");
    await page.keyboard.press("Escape");
    ok(await page.getByRole("navigation", {name: "Mobile navigation"}).count() === 0, "Escape closes mobile menu");
    ok(await menu.evaluate(node => document.activeElement === node), "Escape returns keyboard focus to menu button");
    await menu.click();
    await page.getByRole("navigation", {name: "Mobile navigation"}).getByRole("link", {name: "CV & Skills"}).click();
    ok(new URL(page.url()).hash === "#/cv", "Mobile navigation opens CV");
    ok(await page.getByRole("navigation", {name: "Mobile navigation"}).count() === 0, "Mobile menu closes after route selection");

    const darkMode = page.getByRole("button", {name: "Switch to dark mode"});
    await darkMode.click();
    // Wait for browser paint and any requested colour/font transitions before axe.
    await page.waitForTimeout(300);
    ok(await page.locator("html.dark").count() === 1, "Dark mode toggle applies theme");
    await page.screenshot({path: path.join(directory, "cv-mobile-dark.png"), fullPage: true});
    await auditA11y(page, "cv-mobile-dark");

    // Validate real i18n behavior, including refresh, data filters and mobile layout.
    const languageButton = page.getByRole("button", {name: "Switch website to Simplified Chinese"});
    await languageButton.click();
    await page.waitForFunction(() => document.documentElement.lang === "zh-CN");
    await page.waitForTimeout(300);
    ok(await page.getByRole("heading", {name: "学术履历与技能"}).count() === 1, "CV title switches into natural Simplified Chinese");
    ok(await page.getByRole("button", {name: "切换网站语言为英语"}).count() === 1, "Language switch labels its next action accessibly in Mandarin");
    ok(await page.evaluate(() => localStorage.getItem("portfolio-language") === "zh-CN"), "Mandarin preference saved");
    await page.screenshot({path: path.join(directory, "cv-mobile-zh-dark.png"), fullPage: true});
    await auditA11y(page, "cv-mobile-zh-dark");

    const cnRoutes = [
      ["/research","研究方向与项目"], ["/publications","学术成果"],
      ["/projects","开源科研项目"], ["/service","学术服务"],
      ["/recognition","荣誉与学术交流"], ["/awards","荣誉与表彰"],
      ["/news","新闻与科研里程碑"], ["/connect","合作机会与科研支持"],
      ["/cv","学术履历与技能"], ["/cv/education","教育经历"],
      ["/cv/skills","科研与技术能力"], ["/cv/languages","编程语言与交流语言"]
    ];
    for (const [route, expected] of cnRoutes) {
      await page.goto(url(route), {waitUntil: "networkidle"});
      const actual = await page.locator("main h1").first().textContent();
      ok(actual.trim() === expected, "Mandarin heading for " + route + ": " + actual.trim());
      ok(await page.evaluate(() => document.documentElement.lang) === "zh-CN", "Mandarin preference persists across " + route);
    }
    await page.goto(url("/news"), {waitUntil: "networkidle"});
    ok(await page.locator(".news-entry").count() === 11, "All eleven news items remain in the Chinese version");
    ok(await page.locator(".news-entry h3").first().textContent() !== "Auditable Uncertainty Control for Secure LLM Agents — ACM CCS 2026", "News headline translated");
    await page.locator(".news-story-details summary").first().click();
    ok((await page.locator(".news-story-body p").first().textContent()).includes("ACM"), "Full CCS article has its Mandarin editorial translation");

    await page.goto(url("/awards"), {waitUntil: "networkidle"});
    ok(await page.locator(".award-archive-card").count() === 62, "All 62 awards survive Mandarin localization");
    await page.getByRole("combobox", {name: "按类别筛选档案"}).selectOption("Scholarships & fellowships");
    const scholarshipCount = await page.locator(".award-archive-card").count();
    ok(scholarshipCount > 0 && scholarshipCount < 62, "Chinese award category filter retains its stable data key");
    await page.getByRole("searchbox", {name: "搜索荣誉档案"}).fill("中国政府");
    ok(await page.locator(".award-archive-card").count() >= 1, "Award search finds translated Chinese titles");
    await page.screenshot({path: path.join(directory, "awards-mobile-zh.png"), fullPage: true});

    for (const width of [320,390,768,1024,1440]) {
      await page.setViewportSize({width,height:844});
      for (const route of ["/","/cv","/cv/education","/cv/skills","/awards","/news","/connect"]) {
        await page.goto(url(route), {waitUntil:"domcontentloaded"});
        await page.locator("main h1").first().waitFor();
        const dims = await dimensions(page);
        ok(dims.scroll <= dims.inner + 2, "Mandarin " + route + " avoids horizontal overflow at " + width + "px");
      }
    }
    await page.setViewportSize({width:390,height:844});
    await page.goto(url("/research"), {waitUntil:"networkidle"});
    ok(await page.evaluate(() => localStorage.getItem("portfolio-language")) === "zh-CN", "Language preserved on reload");
    ok((await page.title()).startsWith("研究方向"), "Chinese document title and SEO metadata update");
    await page.getByRole("button", {name:"切换网站语言为英语"}).click();
    await page.waitForFunction(() => document.documentElement.lang === "en");
    ok(await page.locator("main h1").textContent() === "Research & projects", "English source restored without losing navigation state");
    ok(await page.evaluate(() => localStorage.getItem("portfolio-language")) === "en", "Returning to English persists");

    // A shareable link must beat prior preferences and preserve hash routes.
    await page.goto(BASE + "?campaign=academic&lang=zh-CN#/cv/education", {waitUntil:"networkidle"});
    ok(await page.evaluate(() => document.documentElement.lang === "zh-CN"), "Explicit shared Chinese deep link overrides saved English");
    ok((await page.locator("main h1").textContent()).trim() === "教育经历", "Shared Chinese URL opens the requested CV education route");
    await page.getByRole("button", {name:"切换网站语言为英语"}).click();
    ok(await page.evaluate(() => document.documentElement.lang === "en"), "Shared link can switch back to English");
    ok(new URL(page.url()).searchParams.get("campaign") === "academic", "Language switch preserves unrelated query parameters");
    ok(new URL(page.url()).searchParams.get("lang") === "en", "Language switch writes an explicit shareable English URL");
    ok(new URL(page.url()).hash === "#/cv/education", "Language switch preserves the deep route hash");
    await page.goto(BASE + "?lang=zh-CN#/news", {waitUntil:"networkidle"});
    ok(await page.evaluate(() => document.documentElement.lang === "zh-CN"), "Chinese share URL reloads correctly");
    ok((await page.locator("main h1").textContent()).trim() === "新闻与科研里程碑", "Chinese news deep link retains full translation");


    ok(scriptErrors.length === 0, "No uncaught browser JavaScript errors: " + scriptErrors.slice(0, 3).join(" | "));
    ok(brokenOwnAssets.length === 0, "No 404/500 responses for first-party assets: " + brokenOwnAssets.slice(0, 3).join(" | "));
  } finally {
    await browser.close();
  }
  fs.writeFileSync(path.join(directory, "audit.json"), JSON.stringify({base:BASE,issues,observations},null,2));
  console.log("Browser audit: "+observations.length+" checks, "+issues.length+" failures.");
  if (issues.length) { console.error(issues.join("\n")); process.exit(1); }
})().catch(err => { console.error("AUDIT_CRASH",err); process.exit(2); });
