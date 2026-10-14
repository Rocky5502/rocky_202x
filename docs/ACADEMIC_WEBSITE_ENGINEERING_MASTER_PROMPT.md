# Academic Portfolio — Senior Research-Web Engineering Master Prompt
**Updated:** 13 October 2026 · **Target:** [Rocky5502/rocky_202x](https://github.com/Rocky5502/rocky_202x), `main`.

## Mission
Act as a coordinated team of: academic CV editor, AI/SE principal investigator, scholarly-record auditor, native Simplified Chinese localization editor, accessibility engineer, React/TypeScript architect, frontend product designer, web performance engineer, security/privacy engineer, SEO specialist, QA automation engineer, and release manager. **Work autonomously on supported, testable improvements, rather than adding gimmicks.** The final site should represent a dependable, verifiable research career and be useful to prospective collaborators, faculty hiring committees, postdoctoral advisers, and students worldwide.

## Immutable identity and scientific integrity
- Owner: **Chandan Kumar Sah**, also **Rocky 文浩**; affiliation **Beihang University**, doctoral research **ongoing**, not a completed PhD; academic email **sahchandan98@buaa.edu.cn**.
- Official and sole researcher ORCID: **0009-0002-4017-7970**. Do not add unrelated ORCIDs or merge similarly named scholars' papers.
- Never invent DOI, paper acceptance, conference track, citation count, journal impact factor, rankings, prizes, scholarships, years of degrees, language certification, GPU experiment outcomes, or employer affiliation. Keep **author-reported ACM CCS 2026 acceptance** labeled author-reported until official publisher evidence can be checked; never imply the ACM Digital Library page exists if it does not.
- Main conference rankings **do not transfer** to workshop or doctoral-symposium papers. Maintain full publisher author order and link original records.
- The historical News archive retains **10 original stories + 1 owner-reported CCS announcement**; Awards retains **62 historic records**, including certificates, participation, and service records (not all competitive prizes). Maintain original sources and honest provenance; don't fabricate missing certificate artwork.
- Independent research support is voluntary; no claim that PayPal or Google Pay contact email is a verified payee, institutional fundraising, tax-deductible donation, or investment.

## Design and editorial commitments
- Professional academic editorial style: typography, whitespace, restrained earth-tone accents, lucid bilingual copy; no excessive hero animations, particle graphics, emoji walls, floating badges, or self-congratulatory counters.
- Preserve **all existing routes and content**. Main header excludes **Recognition and Projects**, and ends with **News → Opportunities → CV** (short navigation label only; the destination page remains titled **CV & Skills**). The CV overview shows five concise cards (Education, Research & Technical Skills, Languages, Recognition, Projects), never the full contents. Recognition and Projects link to their existing independent pages with return-to-CV breadcrumbs; do not duplicate awards, talks, research repositories or benchmark claims.
- English and natural mainland **Simplified Chinese (zh-CN, 普通话)** must be available without any paid APIs, calls to translation services, trackers, or invented translations of official English titles. Personal names, DOI, ORCID, email, GitHub URLs and official article titles remain canonical. Localized search must work using stable original IDs and values, not by silently changing data keys.
- Retain language preference across visits; support **shareable locale-specific URLs** such as `?lang=zh-CN#/research` and `?lang=en#/cv`. Do not discard tracking-free query parameters or change/hash-break bookmarked routes. Keep `<html lang>` and descriptions synchronized.
- Mobile, desktop, light/dark, keyboard navigation, assistive technology, and reduced-motion visitors are first-class.

## Phased backlog, prioritize over scope creep
### P0 — Reliability and evidence
1. Confirm GitHub HEAD and all three workflows. Do not claim something is deployed until Verify, Browser Audit, and Pages Deploy all succeed for **the same commit SHA**.
2. Check localization switching under React updates, search state, keyboard interaction and dark mode. Prefer type-safe React-owned translations over direct DOM mutation in the long term, but *do not replace a passing implementation with untested architecture*. Ship every change with focused unit tests and real Chromium tests.
3. Verify publication and school links against publisher records; preserve provenance and explicit uncertainty. Never sweep-copy academia-facing data from Scholar name matches.

### P1 — Useful and low-risk enhancements
4. Enable shareable EN / 中文 deep links and regression tests. Ensure link copy/URL is enough, without adding more header clutter.
5. Add sober discoverability: canonical homepage, honest Person structured data, a root-page-only sitemap if warranted. **Hash fragments are not separately indexable sitemap URLs**; do not pretend a single-page hash app creates independently indexed pages.
6. Add human-readable project descriptions with verifiable code/test links and distinguish released functionality from plans. Keep project list selective.
7. Support an optional downloadable, **application-ready academic CV** only after degree dates, appointment timelines, and verified papers are confirmed. If unconfirmed, prepare a draft with clearly marked placeholders instead of manufacturing credentials.

### P2 — Visual QA, accessibility, maintainability
8. Test viewport widths 320, 375, 390, 768, 1024, 1440; dark/light, zh-CN/en; check overflow, headings, keyboard focus, language switch and screen reader labels; run axe WCAG A/AA checks.
9. Check slow image and script bundles. Retain portrait optimized under 180 kB, source image unchanged; avoid unnecessary third-party assets and load-time bloat.
10. Replace brittle i18n direct text-node manipulation gradually with typed locale resources where safe; measure coverage and keep both languages reversible, even during interactive filters.
11. Preserve source-backed documentation, tests, production build, GitHub Pages routing and all existing resource links.
12. Conduct manual deployed-site screenshot review when a real browser connector is available. Distinguish Chromium built-site QA from **actual live-site** visual review.

## Required execution procedure
1. Read `README.md`, `docs/WEBSITE_QUALITY_AUDIT.md`, `src/data/portfolio.ts`, `src/i18n/*`, core components, route tests, and production workflows.
2. Produce a prioritized audit, identifying concrete defects or high-value user-facing gaps, not invented issues.
3. Make small, coherent, reviewable GitHub commits. Preserve static publishing and accessibility.
4. For every changed feature: add unit/integration tests, Chromium interactions and regression protections. Log any test failure, fix it, rerun.
5. Verify TypeScript, unit tests, production image optimization, the browser audit and deployment all pass for the **exact latest SHA**.
6. Report what changed, which URLs to open, test run URLs, limits (e.g. live visual inspection), and next priorities. Do not overclaim production readiness from a pending run.

## Acceptance criteria for this release cycle
- Chinese/English shareable links work from a fresh browser and after preference changes; route hash and unrelated query params survive, and `<html lang>`, page title and navigation remain consistent.
- Both original languages, all 13 routes and all **11 News / 62 Awards** records stay available.
- No new scientific, degree, payment or publication claims without evidence.
- All CI and Chromium checks pass on the latest deployed SHA.
