# Academic website — master prompt execution status

Updated 13 October 2026. Review against [the engineering master prompt](ACADEMIC_WEBSITE_ENGINEERING_MASTER_PROMPT.md), not as a substitute for it.

## Implemented and subject to CI verification

- **Menu and information architecture:** The top menu excludes Recognition and ends **News → Opportunities → CV**. Recognition remains accessible via the fourth CV overview card and its own return-to-CV breadcrumb. The bilingual heading and nested CV pages remain **CV & Skills** (English) and 学术履历与技能 (Chinese); the Chinese top menu item is **简历**.
- **Bilingual sharing:** EN / 简体中文 toggle, persistent preference and explicit `?lang=en` or `?lang=zh-CN` deep links; route hash and other query parameters preserved. All original 11 News entries and 62 Awards remain.
- **Keyboard skip link:** Focus now moves to the `<main>` landmark without overwriting the `#/…` HashRouter fragment. Protected by React unit tests and the Playwright/Chromium keyboard audit.
- **Academic identity:** One ORCID (0009-0002-4017-7970). Do not replace individual papers with similarly named scholars, inflate conference-workshop rankings or label the author-reported CCS 2026 acceptance as independently publisher-verified.
- **Homepage discovery:** Real canonical homepage, Person JSON-LD, homepage-only XML sitemap and robots sitemap link. Hash-based subpages must not be claimed as separate sitemap-indexable URLs.
- **Image performance:** Optimized built portrait, size budget in CI, full source photograph retained.
- **Application CV preparation:** [Source-backed editable CV draft](ACADEMIC_CV_APPLICATION_DRAFT.md), with explicit verification placeholders, not a public/downloadable official document.
- **Release gate:** TypeScript/build/unit tests, actual Chromium route/mobile/accessibility suite, and GitHub Pages are required on **the same final commit SHA**. Passing one job does not certify the others.

## Remaining high-priority work (do not fake completion)

1. **Manual live browser visual review:** Have a connected browser review actual public GitHub Pages and compare screenshot artifacts on desktop, small phones and dark mode. Chromium CI against a production preview is *not* the same as inspecting the published URL.
2. **Verify academic record:** Confirm Bachelor's/Master's conferral dates, formal doctoral title/advisor, owner-provided certificates, review history and official conference/proceedings status. Do not add unconfirmed details just to fill the CV.
3. **Finalize an application-ready PDF:** Only after (2). Avoid bundling provisional qualifications in a downloadable official résumé.
4. **Publication/project evidence maintenance:** Revisit individual publisher links and public repository smoke tests when new results become verifiable. Never extrapolate experiment success from a README's intentions.
5. **React-owned translations:** The current runtime translations use a tested reversible DOM-text bridge. If it becomes brittle, migrate incrementally to typed React translations, in small patches with focused UI/browser tests. Avoid a broad rewrite without a demonstrated defect.
6. **Accessible usability beyond automation:** Real keyboard/screen-reader review, WCAG manual checks, subjective line wrapping/copy quality of mainland Mandarin, link-rot checks and performance monitoring.

## Release verification checklist

- [ ] Latest GitHub `main` commit SHA recorded.
- [ ] Verify portfolio is completed/success for that exact SHA.
- [ ] Chromium browser audit is completed/success for that exact SHA.
- [ ] Deploy Vite site to Pages is completed/success for that exact SHA.
- [ ] Links to public site, GitHub source and job logs included in release report.

**Caution:** This document is a project status tracker. The checkboxes above are meant to be checked against GitHub Actions at the time of each release and must not be marked passed merely because previous commits succeeded.
