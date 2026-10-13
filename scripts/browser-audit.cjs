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
    const page = await browser.newPage({viewport: {width: 1440, height: 900}, deviceScaleFactor: 1});
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
      ok(info.h1[0] === heading, route + " H1 matches expected route");
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
    ok(await page.locator("html.dark").count() === 1, "Dark mode toggle applies theme");
    await page.screenshot({path: path.join(directory, "cv-mobile-dark.png"), fullPage: true});
    await auditA11y(page, "cv-mobile-dark");

    ok(scriptErrors.length === 0, "No uncaught browser JavaScript errors: " + scriptErrors.slice(0, 3).join(" | "));
    ok(brokenOwnAssets.length === 0, "No 404/500 responses for first-party assets: " + brokenOwnAssets.slice(0, 3).join(" | "));
  } finally {
    await browser.close();
  }
  fs.writeFileSync(path.join(directory, "audit.json"), JSON.stringify({base:BASE,issues,observations},null,2));
  console.log("Browser audit: "+observations.length+" checks, "+issues.length+" failures.");
  if (issues.length) { console.error(issues.join("\n")); process.exit(1); }
})().catch(err => { console.error("AUDIT_CRASH",err); process.exit(2); });
