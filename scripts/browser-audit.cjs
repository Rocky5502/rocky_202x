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
  ["/projects", "Research projects"],
  ["/research", "Research & projects"],
  ["/service", "Academic service"],
  ["/recognition", "Recognition & talks"],
  ["/awards", "Awards & Appreciation"],
  ["/news", "News & milestones"],
  ["/notes/ten-rules-phd-research-ai", "In Love with the Unknown"],
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
    const policy = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute("content");
    ok(!!policy && policy.includes("connect-src 'none'") && policy.includes("object-src 'none'"), "Production browser policy blocks network APIs and embedded objects");
    ok(!!policy && /script-src 'self' 'sha256-[A-Za-z0-9+/=]+'/.test(policy), "Inline structured data is hash-pinned, not broadly executable");
    ok(!policy.split("; ").find(part => part.startsWith("script-src "))?.includes("'unsafe-inline'"), "Production CSP rejects arbitrary inline JavaScript");
    ok(await page.locator('meta[name="referrer"]').getAttribute("content") === "no-referrer", "External visitors' browsing path is not leaked via Referrer header");
    const externalSafety = await page.locator('a[target="_blank"]').evaluateAll(links => links.every(node => node.rel.includes("noopener") && node.rel.includes("noreferrer")));
    ok(externalSafety, "All externally opened homepage links are protected against tabnabbing");
    await page.evaluate(() => {
      const script = document.createElement("script");
      script.textContent = "document.documentElement.dataset.cspProbe = 'unsafe'";
      document.body.appendChild(script);
      script.remove();
    });
    ok(await page.evaluate(() => !document.documentElement.dataset.cspProbe), "Chromium CSP blocks simulated inline script injection");
    const primaryNavigation = page.getByRole("navigation", {name: "Primary navigation"});
    ok(await primaryNavigation.getByRole("link").count() === 7, "Top navigation contains seven entries after moving Recognition and Projects into CV");
    ok(await primaryNavigation.getByRole("link", {name: "Recognition", exact: true}).count() === 0, "Recognition does not appear in the top desktop navigation");
    ok(await primaryNavigation.getByRole("link", {name: "Projects", exact: true}).count() === 0, "Projects does not appear in the top desktop navigation");
    ok(await page.getByText(/Originally from Nepal 🇳🇵 and based in China since April 2018/).count() === 1, "Homepage introduces researcher's background in formal third person without repeating name");
    ok(!(await page.locator(".hero-description").innerText()).includes("Chandan Kumar Sah"), "Name appears in H1, not redundantly in the introduction");
    ok(await page.getByText("Advancing reliable AI through uncertainty, evidence, and verification.").count() === 1, "Homepage has new research-led headline");
    ok((await page.locator(".portrait-research-number").innerText()).trim() === "13+", "Research record presents the supported 13+ scholarly-work count");
    ok(await page.locator(".portrait-research-record").getAttribute("href") === "#/publications", "Research-output summary links to source-backed publication records");
    ok((await page.locator(".portrait-research-record").innerText()).includes("13+"), "Research highlight displays 13+ catalogued works");
    ok((await page.locator(".portrait-research-record").innerText()).includes("Research works"), "Research highlight uses a concise academically careful label");
    ok(await page.locator(".portrait-research-record small").count() === 0, "Portrait research highlight has no publication-type caption");
    ok(await page.locator(".portrait-highlight-list li").count() === 6, "Portrait displays six compact academic highlights");
    ok((await page.locator(".portrait-highlight-list").innerText()).includes("2nd Place (Graduate) · ACM SRC, ASE 2025"), "ACM ASE 2025 Graduate SRC second-place award is present");
    ok(await page.locator(".portrait-highlight-list").innerText().then(t=>t.includes("Excellent Paper · AUA Postgraduate Forum")), "AUA highlight preserves actual Excellent Paper designation");
    ok(await page.locator(".portrait-highlight-list").innerText().then(t=>t.includes("Scholarships · 2 CSC + Belt and Road")), "Scholarships are not mislabeled as three identical CSC grants");
    ok(await page.locator(".portrait-highlight-list sup").count() === 0, "Portrait honors show no ECIR dagger markers");
    ok(await page.locator(".portrait-highlights-note").count() === 0, "No ECIR verification footnote appears under portrait");
    ok(await page.getByRole("link",{name:"Recognition details"}).getAttribute("href") === "#/recognition", "Portrait highlights link to existing Recognition page");
    await page.screenshot({path: path.join(directory, "home-desktop.png"), fullPage: true});
    await auditA11y(page, "home-desktop");

    // Skip-link must not replace the HashRouter route with #main-content.
    await page.goto(url("/cv/education"), {waitUntil: "networkidle"});
    await page.keyboard.press("Tab");
    ok(await page.evaluate(() => document.activeElement?.classList.contains("skip-link") === true), "Keyboard Tab reaches the skip-to-content link");
    await page.keyboard.press("Enter");
    ok(new URL(page.url()).hash === "#/cv/education", "Skip link preserves the active HashRouter route");
    ok(await page.evaluate(() => document.activeElement?.id === "main-content"), "Skip link moves focus to main content");
    await page.goto(url("/cv"), {waitUntil: "networkidle"});
    ok(await page.locator("a.cv-layer-card").count() === 5, "CV overview has five interactive section cards");
    ok(await page.locator('a.cv-layer-card[href="#/recognition"]').count() === 1, "CV Recognition section reuses the existing Recognition route");
    ok(await page.locator('a.cv-layer-card[href="#/projects"]').count() === 1, "CV Projects section links to the existing Projects route");
    await page.locator('a.cv-layer-card[href="#/projects"]').click();
    ok(new URL(page.url()).hash === "#/projects", "CV Projects card opens the existing Projects directory");
    ok(await page.locator(".public-project-card").count() > 0, "Projects directory retains project cards");
    ok(await page.locator(".public-project-card:not(.ongoing-project-card)").count() === 9, "Public research section retains nine original repository entries");
    ok(await page.locator(".ongoing-project-card").count() === 5, "Five appropriately labeled private research previews appear");
    ok(await page.locator(".ongoing-project-card a").count() === 0, "No private research preview exposes a GitHub link");
    ok(await page.locator(".ongoing-project-card").first().getByText("Private research · Code not public").isVisible(), "Private work explicitly does not promise public code");
    const openCoderCard = page.locator(".public-project-card").filter({has:page.getByRole("heading",{name:"OpenCoder",exact:true})});
    ok(await openCoderCard.getByText("Code release coming soon").count() === 1, "OpenCoder public-repository action is replaced with coming soon");
    ok(await openCoderCard.locator("a.project-repo-link").count() === 0, "OpenCoder does not display a misleading direct code-release action");
    await page.getByRole("button",{name:"Trustworthy AI",exact:true}).click();
    ok(await page.locator(".ongoing-project-card").count() === 2, "Trustworthy AI filter shows NMI and U-FLOW as private previews");
    ok(await page.getByRole("heading",{name:"NMI · Epistemic Conservation"}).count() === 1, "NMI remains when Trustworthy AI is selected");
    ok(await page.getByRole("heading",{name:"U-FLOW"}).count() === 1, "U-FLOW is included when Trustworthy AI is selected");
    await page.getByRole("button",{name:"All projects",exact:true}).click();
    await auditA11y(page,"projects-with-private-previews");
    await page.screenshot({path:path.join(directory,"projects-desktop.png"),fullPage:true});
    ok(await page.getByRole("navigation", {name: "Projects breadcrumb"}).getByRole("link", {name: /Back to CV/}).getAttribute("href") === "#/cv", "Projects provides a breadcrumb back to CV");
    await page.goto(url("/cv"), {waitUntil:"networkidle"});
    await page.locator('a.cv-layer-card[href="#/recognition"]').click();
    ok(new URL(page.url()).hash === "#/recognition", "CV Recognition card navigates to existing Recognition page");
    const backToCv = page.getByRole("navigation", {name: "Recognition breadcrumb"}).getByRole("link", {name: /Back to CV/});
    ok(await backToCv.getAttribute("href") === "#/cv", "Recognition breadcrumb provides a route back to CV");
    ok(await page.getByRole("link", {name: "Explore the Awards & Appreciation archive"}).count() === 1, "Recognition keeps Awards & Appreciation click-through");
    ok(await page.getByRole("heading", {name: "Selected talks"}).count() === 1, "Recognition keeps selected academic talks");
    await page.goto(url("/cv"), {waitUntil: "networkidle"});
    ok(await page.locator(".cv-education-row").count() === 0, "CV overview does not expose degree details");
    await page.screenshot({path: path.join(directory, "cv-overview-desktop.png"), fullPage: true});
    await auditA11y(page, "cv-overview");

    await page.getByRole("link", {name: /Education.*3 degrees/i}).click();
    ok(new URL(page.url()).hash === "#/cv/education", "CV Education entry navigates correctly");
    ok(await page.locator(".cv-education-row").count() === 3, "Education displays the three degrees");
    const degreeCopy = await page.locator(".cv-education-list").innerText();
    ok(!/2025|2022|2018|present|Previous degree/i.test(degreeCopy), "University degree timeline hides all date and period labels");
    ok(degreeCopy.includes("Ph.D. · In progress"), "Date-free doctorate still shows ongoing enrollment");
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
    const support = page.locator(".support-disclosure");
    ok(await support.count() === 1, "Optional support appears as one small disclosure, not a full-width fundraising panel");
    ok(await support.evaluate(node => !node.open), "Support details are collapsed by default");
    ok(await support.evaluate(node => node.getBoundingClientRect().width <= 375), "Collapsed support remains compact on desktop");
    ok(await support.evaluate(node => Math.abs(node.getBoundingClientRect().right - node.parentElement.getBoundingClientRect().right) < 3), "Support aligns with lower right of Opportunities content");
    ok(await page.getByRole("textbox", {name: "PayPal support email address"}).count() === 0, "Payment fields are hidden until explicitly expanded");
    ok(await page.getByRole("img",{name:"WeChat Pay receiving QR code supplied by the researcher"}).count() === 0, "WeChat QR remains hidden in collapsed support disclosure");
    await auditA11y(page, "opportunities-collapsed");
    await support.locator("summary").click();
    ok(await support.evaluate(node => node.open), "Support expands using native disclosure interaction");
    ok(await page.getByRole("textbox", {name: "PayPal support email address"}).inputValue() === "sahchandan98@gmail.com", "PayPal contact remains accurate after expansion");
    ok(await page.getByRole("textbox", {name: /Google Pay contact email address/}).inputValue() === "sahchandan98@gmail.com", "Google Pay inquiry email remains accurate after expansion");
    ok(await page.getByText(/An email address is not a universal Google Pay transfer ID/).isVisible(), "Expanded support preserves recipient-verification warning");
    const wechatQr = page.getByRole("img",{name:"WeChat Pay receiving QR code supplied by the researcher"});
    ok(await wechatQr.isVisible(), "WeChat personal receiving code appears when user expands support");
    ok(await wechatQr.getAttribute("viewBox") === "0 0 45 45", "WeChat QR vector has correct module geometry");
    ok(await page.getByText("Rocky 文浩 (***R)").isVisible(), "Recipient identity is shown alongside QR");
    ok(await page.getByText(/Check the recipient shown inside WeChat Pay/).isVisible(), "WeChat transfer includes explicit recipient verification");
    await auditA11y(page, "opportunities-expanded");
    await page.screenshot({path: path.join(directory, "opportunities-support-desktop.png"), fullPage: true});
    await support.locator("summary").click();
    ok(await support.evaluate(node => !node.open), "Support closes cleanly again");

    await page.goto(url("/service"), {waitUntil:"networkidle"});
    const wosLinks = page.getByRole("link", {name:"Web of Science Author Search"});
    ok(await wosLinks.count() >= 1, "Academic service provides Web of Science author search");
    ok((await wosLinks.first().getAttribute("href")) === "https://www.webofscience.com/wos/author/author-search?state=%7B%7D", "Web of Science link preserves owner-provided search URL");
    ok(await page.getByText(/not a uniquely verified researcher profile/).count() === 1, "WoS search is not misrepresented as verified individual profile");

    for (const width of [320, 375, 390, 768, 1024]) {
      await page.setViewportSize({width, height: 844});
      for (const route of ["/", "/cv", "/cv/education", "/cv/skills", "/news", "/awards", "/connect"]) {
        await page.goto(url(route), {waitUntil: "domcontentloaded"});
        await page.locator("main h1").first().waitFor();
        const info = await dimensions(page);
        ok(info.scroll <= info.inner + 2, route + " has no horizontal overflow at " + width + "px (" + info.scroll + "/" + info.inner + ")");
      }
    }
    for (const width of [320, 390]) {
      await page.setViewportSize({width, height: 844});
      await page.goto(url("/connect"), {waitUntil: "networkidle"});
      const compact = page.locator(".support-disclosure");
      ok(await compact.evaluate(node => !node.open), "Compact support defaults closed at " + width + "px");
      await compact.locator("summary").focus();
      await page.keyboard.press("Enter");
      ok(await compact.evaluate(node => node.open), "Keyboard Enter opens support at " + width + "px");
      const size = await dimensions(page);
      ok(size.scroll <= size.inner + 2, "Expanded support has no horizontal overflow at " + width + "px");
      await auditA11y(page, "support-mobile-expanded-" + width);
      if (width === 390) await page.screenshot({path:path.join(directory,"opportunities-support-mobile.png"),fullPage:true});
      await page.keyboard.press("Enter");
      ok(await compact.evaluate(node => !node.open), "Keyboard Enter closes support at " + width + "px");
    }
    await page.setViewportSize({width: 390, height: 844});
    await page.goto(url("/"), {waitUntil: "networkidle"});
    await page.screenshot({path: path.join(directory, "home-mobile.png"), fullPage: true});
    const menu = page.getByRole("button", {name: "Open navigation"});
    await menu.click();
    ok(await page.getByRole("navigation", {name: "Mobile navigation"}).isVisible(), "Mobile menu opens");
    ok(await page.getByRole("navigation", {name: "Mobile navigation"}).getByRole("link", {name: "Recognition", exact: true}).count() === 0, "Recognition absent from mobile menu");
    ok(await page.getByRole("navigation", {name: "Mobile navigation"}).getByRole("link", {name: "Projects", exact: true}).count() === 0, "Projects absent from mobile menu");
    await page.keyboard.press("Escape");
    ok(await page.getByRole("navigation", {name: "Mobile navigation"}).count() === 0, "Escape closes mobile menu");
    ok(await menu.evaluate(node => document.activeElement === node), "Escape returns keyboard focus to menu button");
    await menu.click();
    await page.getByRole("navigation", {name: "Mobile navigation"}).getByRole("link", {name: "CV", exact: true}).click();
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
    await page.goto(url("/"), {waitUntil:"networkidle"});
    ok(await page.getByText(/来自尼泊尔 🇳🇵，自2018年4月起在中国学习和生活/).count() === 1, "Mandarin homepage uses formal name-free third-person biography");
    ok(!(await page.locator(".hero-description").innerText()).includes("Chandan Kumar Sah"), "Mandarin biography does not redundantly repeat the H1 name");
    ok((await page.locator(".portrait-research-record").innerText()).includes("科研成果"), "Research works highlight has authored Mandarin translation");
    ok(!(await page.locator(".portrait-research-record").innerText()).includes("预印本"), "Mandarin portrait highlight stays concise and does not list publication categories");
    ok(await page.locator(".portrait-highlight-list li").count() === 6, "Mandarin homepage preserves six academic highlights");
    ok((await page.locator(".portrait-highlight-list").innerText()).includes("ASE 2025 ACM 学生研究竞赛研究生组二等奖（第二名）"), "Mandarin ACM SRC ranking is correctly localized");
    ok(await page.locator(".portrait-highlight-list").innerText().then(t=>t.includes("亚洲大学联盟研究生论坛优秀论文奖")), "Mandarin award highlight correctly describes AUA Excellent Paper distinction");
    await page.goto(url("/connect"), {waitUntil:"networkidle"});
    ok(await page.locator(".support-disclosure").evaluate(node => !node.open), "Mandarin research support remains discreet by default");
    ok((await page.locator(".support-disclosure summary").textContent()).includes("支持开放、负责任的人工智能研究"), "Compact support title translated into mainland Mandarin");
    await page.locator(".support-disclosure summary").click();
    ok(await page.locator(".support-disclosure").evaluate(node => node.open), "Chinese support expands on demand");
    ok(await page.getByRole("img",{name:"研究者提供的微信支付个人收款二维码"}).isVisible(), "Mandarin WeChat QR accessibility label translated");
    ok(await page.getByText(/转账前请在微信支付中核对收款方身份/).isVisible(), "Mandarin recipient verification warning visible");
    ok(await page.getByRole("textbox",{name:"PayPal support email address"}).count() === 0, "Chinese PayPal accessibility label replaces English label");
    await page.locator(".support-disclosure summary").click();
    await page.goto(url("/cv"), {waitUntil:"networkidle"});
    await page.screenshot({path: path.join(directory, "cv-mobile-zh-dark.png"), fullPage: true});
    await auditA11y(page, "cv-mobile-zh-dark");

    const cnRoutes = [
      ["/research","研究方向与项目"], ["/publications","学术成果"],
      ["/projects","科研项目"], ["/service","学术服务"],
      ["/recognition","荣誉与学术交流"], ["/awards","荣誉与表彰"],
      ["/news","新闻与科研里程碑"], ["/notes/ten-rules-phd-research-ai","热爱未知"], ["/connect","合作机会与科研支持"],
      ["/cv","学术履历与技能"], ["/cv/education","教育经历"],
      ["/cv/skills","科研与技术能力"], ["/cv/languages","编程语言与交流语言"]
    ];
    for (const [route, expected] of cnRoutes) {
      await page.goto(url(route), {waitUntil: "networkidle"});
      const actual = await page.locator("main h1").first().textContent();
      ok(actual.trim() === expected, "Mandarin heading for " + route + ": " + actual.trim());
      ok(await page.evaluate(() => document.documentElement.lang) === "zh-CN", "Mandarin preference persists across " + route);
    }
    await page.goto(url("/projects"), {waitUntil: "networkidle"});
    ok(await page.locator(".ongoing-project-card").count() === 5, "Mandarin Projects page preserves five research previews");
    ok((await page.locator(".ongoing-project-card").first().innerText()).includes("私人研究 · 代码暂不公开"), "Private code status translated into Mandarin without promise of publication");
    ok((await page.locator(".project-overview").innerText()).includes("项研究预览"), "Filtered private-research count localized in Mandarin");
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
