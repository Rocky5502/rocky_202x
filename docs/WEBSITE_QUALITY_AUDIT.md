# Website quality and reproducibility audit

**Audit date:** 13 October 2026  
**Repository:** [Rocky5502/rocky_202x](https://github.com/Rocky5502/rocky_202x)  
**Canonical site:** https://rocky5502.github.io/rocky_202x/

This report distinguishes checks on the *built site in a real Chromium browser* from visual review of the *deployed public URL*. The latter is **not yet independently inspected** in a connected browser. Automated build success is not a substitute for visually reading a deployed screenshot.

## Findings and improvements

1. **Routing:** All 13 live HashRouter routes are exercised from the built Vite site (Home, Publications, Projects, Research, Service, Recognition, Awards, News, Opportunities, CV, CV/Education, CV/Skills and CV/Languages). The browser audit verifies a single H1 and route-specific browser title for each.
2. **Responsive quality:** Main pages are checked at desktop 1440px and mobile/tablet widths **320, 375, 390, 768 and 1024px**, rejecting horizontal overflow.
3. **Accessibility:** A pinned Chromium and axe-core audit tests WCAG 2 A/AA, WCAG 2.1 AA and WCAG 2.2 AA rules on representative pages in regular and dark modes. Mobile navigation focus/escape, correct page titles, route changes and functional search filters are also tested. **A passing automated audit cannot prove complete WCAG conformance.**
4. **Production portrait:** The original `src/assets/portrait.jpg` is **1,861,566 bytes**, much too large for the visible 165–238 CSS-pixel portrait. A production-only Pillow build step resizes the generated JPEG to fit within 640 × 760 pixels, uses progressive JPEG encoding at quality 80, and requires **at most 180,000 bytes**. The first verified output was **608 × 760 pixels / 47,318 bytes**, a **97.5% reduction**. The source photo remains unchanged in Git.
5. **External accuracy:** The Bern International Software Engineering Winter School 2025 is linked to the programme’s [actual university-hosted event site](https://innoguard-winter-school-2025.inf.unibe.ch/), rather than a generic university research-group website. The school itself can be confirmed from the organizer; an owner-specific attendance certificate is still archive-sourced.
6. **React warnings:** The portrait uses standard React 18-compatible loading attributes; the unsupported `fetchPriority` prop was removed to avoid runtime warnings from the current React version.
7. **No made-up evidence:** User-reported CCS acceptance, award archives, peer-review records, model experiment plans, school attendance and spoken-language proficiency continue to be distinguished from independently verified primary-source claims.
8. **Multilingual Mandarin:** A static English / 简体中文 toggle changes the document language, metadata, navigation, research content, awards, complete historical news articles, and the layered CV. Local preference persists across reloads; English can be restored exactly. Interactive filters keep their underlying option values even when labels are localized.
9. **Bilingual Chromium audit:** The real-browser suite checks Chinese headings on every route, translated archive and record counts, Chinese award searches, persistent selection on refresh, screen-reader labels, and mobile horizontal overflow from **320–1440 px**. The 13 October 2026 run at [GitHub Actions](https://github.com/Rocky5502/rocky_202x/actions/runs/38337573776) recorded **178 PASS, zero FAIL, zero reported axe violations**. This is automated WCAG rule coverage, not a complete manual accessibility certification.


## How to reproduce

The lightweight suite runs on **every push**:
- [Verify portfolio](../.github/workflows/verify.yml): typecheck, build, optimized-portrait budget, unit/regression tests.
- [Deploy Vite site to Pages](../.github/workflows/deploy.yml): typecheck, unit tests, production build, optimize portrait, publish.
- [Chromium browser audit](../.github/workflows/browser-audit.yml): Chromium viewport and navigation checks, keyboard/mobile behaviors, axe WCAG scans, link-route assertions, payment contact visibility, JavaScript/asset errors, plus English and Mandarin screenshot artifacts and bilingual interaction assertions.

The browser suite runs via `scripts/browser-audit.cjs` against a **locally served production preview**, not the deployed URL. Browser installation uses pinned Playwright/axe versions in an isolated `.audit` folder, and retains artifacts for seven days (the GitHub Actions artifact includes screenshots of desktop homepage, CV overview and mobile views, plus `audit.json`).

At the end of the browser job, the complete list of `PASS:`, `FAIL:`, `AXE:` and `Browser audit:` statements is available in the job log. The browser step fails if any serious/critical automated accessibility violation, client-side error, missing first-party asset, overflow or required interaction fails.

## Pending improvements / limitations

- **Live site visual QA**: inspect desktop/mobile screenshots from GitHub Actions and manually navigate the actual Pages URL in a connected browser; screenshots are generated, but not automatically evaluated for subjective visual quality.
- **Keyboard and assistive-technology review**: axe scans are useful but do not replace manual screen-reader review or complete WCAG audit.
- **Link rot**: the historical Awards and News galleries retain owner-provided links, some of which are only general organizer homepages. Do not claim that every third-party link independently verifies a certificate or that every external URL is permanently available.
- **CV evidence**: exact earlier degree-conferral dates, course attendance, language proficiency and verified individual award certificates have not been independently substantiated.
- **JS/CSS budgets**: revisit production JavaScript/CSS bundle size during future site architecture work; prioritize meaningful speed improvements over cosmetic animation.

**Release rule:** Do not report a commit as published until **Verify portfolio** and **Deploy Vite site to Pages** both finish successfully for the **same exact commit SHA**; report browser-audit status separately.
