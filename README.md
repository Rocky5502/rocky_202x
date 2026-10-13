# Academic website — Chandan Kumar Sah

An editorial, multi-page academic portfolio built with React, Vite, and TypeScript.
Designed for readers of research papers, potential collaborators, hiring committees, and students.

**Live website:** https://rocky5502.github.io/rocky_202x/

**Quality audit:** [Browser, accessibility, mobile, routing & performance checks](docs/WEBSITE_QUALITY_AUDIT.md) — including reproducible GitHub Actions screenshots and measured production-image optimization.

**Engineering roadmap:** [Academic website senior-engineering master prompt](docs/ACADEMIC_WEBSITE_ENGINEERING_MASTER_PROMPT.md) — evidence-first priorities, release gates and bilingual UX rules.

## Pages

| Route | Content |
| --- | --- |
| `/#/` | Research overview, selected publications and contact |
| `/#/publications` | Papers with topic/type filters and correctly scoped CCF/ICORE venue ratings |
| `/#/projects` | Curated, tagged and filtered links to publicly accessible research repositories |
| `/#/research` | Five research directions, including Software Engineering for AI and Trustworthy AI |
| `/#/service` | Reviewing roles, volunteer activities, academic identities |
| `/#/recognition` | Compact Awards & Appreciation entry point; selected academic talks |
| `/#/awards` | Separate year-by-year historical archive of 62 awards, certificates, and academic activities |
| `/#/cv` | CV overview with four clickable cards: Education, Research Skills, Languages and Recognition (links to existing Recognition page) |
| `/#/cv/education` | Three university degrees, four original summer/winter schools, and separate short programmes |
| `/#/cv/skills` | Ten public-evidence-linked AI and software engineering research competencies |
| `/#/cv/languages` | Programming languages and self-reported spoken languages |
| `/#/news` | Full chronological archive of the original 10 news stories plus author-reported ACM CCS 2026 acceptance |
| `/#/connect` | Visiting research, fellowships, research-oriented roles and optional individual research support |

Hash routes are intentional because GitHub Pages does not rewrite deep route URLs to `index.html`.

The [XML sitemap](public/sitemap.xml) intentionally indexes **only the canonical homepage**, because hash-router fragments are not separate crawlable URLs. A true independently indexable multilingual publication/CV site would require static pre-rendering or server-rewritten paths; sitemap entries for `/#/research` or `/#/cv` would incorrectly suggest each fragment is indexed independently. `public/robots.txt` advertises the sitemap.

### Routing and troubleshooting

**Canonical links** always use the hash syntax (`https://rocky5502.github.io/rocky_202x/#/connect` for Opportunities). Legacy hash route aliases (`/#/opportunities`, `/#/contact`, `/#/support`, `/#/research-areas`) redirect inside the app. The `public/404.html` fallback also redirects ordinary clean URLs such as `/rocky_202x/connect` to their canonical hash routes; missing asset requests remain 404 responses.

GitHub Pages may serve temporarily cached HTML immediately after a deployment, even though the latest hashed JS bundle is in the repository. If a page displays the previous header without the Opportunities navigation, **hard-refresh** or open `https://rocky5502.github.io/rocky_202x/?v=20261012#/connect` once. Do not change URLs to `/rocky_202x/connect` unless the legacy redirect is desired.

`src/test/navigation.test.tsx` tests the real `/#/connect` address, legacy hash aliases, 404 recovery and all five research topics. Both `Verify portfolio` and the Pages deployment should succeed for the same latest commit before considering a release complete.

## Portrait highlights and international introduction

The homepage introduction identifies the researcher as **from Nepal 🇳🇵, living in China since April 2018** (researcher-provided timeline), supported by Chinese Government Scholarship(s), and currently undertaking doctoral work at Beihang University. It avoids subjective rankings such as “highly talented” or “top 0.1%.”

Five understated highlights appear **directly beneath the portrait** (not in the top navigation), with small Lucide icons, an academic typographic hierarchy and a direct link to the existing Recognition page. The underlying 62-record archive is not duplicated:

- **Outstanding Reviewer — ECIR 2026**, recorded in the original archive; the conference's public reviewer-awards announcement lists “Chandan Kumar,” a name requiring care in identification.
- **Senior Program Committee — ECIR 2027**: **researcher-reported**; the public organiser page does not currently establish individual Senior PC membership, so the portrait explicitly says independent confirmation is pending.
- **Excellent Paper Award — Asian Universities Alliance (AUA) Postgraduate Forum**, matching the archived *Excellent Paper* distinction, **not** an incorrectly inflated “Best Paper Award.”
- **Scholarship history — two Chinese Government Scholarship entries (master's and PhD) plus a separate Belt and Road bachelor's scholarship.** Do not describe these three different award types as “three Chinese Government Scholarships” without primary documentation.
- **Excellent International Graduate — Beihang University (2025)**, archived as an owner-provided historical distinction.

The section preserves the researcher's original award data, notes source provenance, and uses authored Simplified Chinese (`src/i18n/zh-content.ts`) rather than remote machine-translation APIs. It is not a substitute for independently verifying individual appointment and award certificates.

## Short introduction and Web of Science

The homepage now includes a short academic biography: **“Originally from Nepal, I am a Chinese Government Scholarship recipient pursuing doctoral research at Beihang University in Beijing, China.”** This is a researcher-provided historical scholarship claim, consistent with the original academic certificate archive. It must not be presented as a separately authenticated scholarship registry record. The **CV overview** also includes a restrained, single-line origin/scholarship descriptor.

The owner provided the URL `https://www.webofscience.com/wos/author/author-search?state=%7B%7D`. This is a **generic Web of Science Author Search portal**, not a unique researcher profile, ResearcherID or a connected Clarivate account. The site links it in the **Academic Service → Academic identity** area, **CV overview**, and footer, always labeled **Web of Science Author Search / Web of Science 作者检索** and never used as a verified individual's bibliographic citation. To upgrade the link, request the owner's exact public Web of Science Researcher Profile URL or ResearcherID and verify that it matches the Beihang University researcher and their correct ORCID (`0009-0002-4017-7970`). Do **not** accidentally associate a similarly named author. Neither personal review counts nor records are automatically imported from this link.

Both new additions have manually authored native Simplified Chinese text in `src/i18n/zh-content.ts`, with English and Chinese regression tests and Chromium route tests in `scripts/browser-audit.cjs`.

## Navigation and keyboard accessibility

The main header intentionally removes **Recognition** and ends with **News → Opportunities → CV**. Recognition remains a fourth card inside the CV overview and its own page provides a direct return-to-CV breadcrumb. Only the **top navigation label** is abbreviated; the page heading remains **CV & Skills** and the existing Education, Skills and Languages subpages stay unchanged. In Mandarin the compact top label is **简历**, while the page retains its more descriptive Chinese heading.

The visually prominent-on-focus **Skip to content** link moves keyboard focus to the main landmark without navigating to `#main-content`, because replacing a hash route fragment would break React Router navigation. This is covered by unit and real Chromium keyboard tests.

## English / 简体中文 bilingual website

The academic portfolio supports **English** (default) and **Simplified Chinese (zh-CN, standard Mandarin)** through a compact `中文 / EN` toggle next to the light/dark control. Translation works across the existing sections and hash-based URLs, with no external translation service, cookies or extra user tracking. The selected language is saved locally under `portfolio-language` and preserved on refresh and navigation. Visitors can also share an exact bilingual destination using `https://rocky5502.github.io/rocky_202x/?lang=zh-CN#/research` or `?lang=en#/cv`; an explicit URL language overrides the previous local preference, and toggling keeps route fragments and unrelated query parameters intact. The document language (`<html lang>`), metadata, screen-reader labels and placeholders follow the selection. Changing language preserves the reader's position.

The Chinese experience includes researcher-authored translations of the **five research directions**, **nine curated public projects**, **ten CV competencies**, the layered Education/Skills/Languages sections, the original **eleven News stories including full articles**, and titles for all **62 Awards records**. Source English records remain untouched; personal and institutional names, official paper titles, DOI/ORCID IDs and URLs retain their canonical spellings. Award organization names and published paper titles may intentionally appear in English when they are official names.

**Implementation:** `src/i18n/LanguageProvider.tsx` maintains a reversible translation view, using reviewed dictionaries in `src/i18n/zh-ui.ts`, `zh-content.ts`, `zh-archive.ts` and `zh-extras.ts`. The original English strings are preserved in memory for exact restoration on `EN` switch. No AI service is called at runtime and no archival source text is modified. All select options use stable English values even while the visible labels are translated; award and publication searches also accept Chinese queries. The layout switches to CJK-appropriate typography and collapses the navigation earlier for Chinese text.

**Testing:** `src/test/i18n.test.tsx` verifies coverage for news articles, award titles, research summaries, navigation, translated metadata, language persistence and reverse switching. The real Chromium suite `scripts/browser-audit.cjs` checks all Chinese route headings, 320–1440px overflow, Chinese archived-text filtering, dark-mode interaction and return to English. Screenshots are available in the **Chromium browser audit** GitHub Actions artifacts. Automated accessibility coverage is helpful but does not replace review by a native Chinese speaker or a manual screen reader test.

## Web CV & research skills

The `/#/cv` page is a concise **academic CV & Skills** entry in the main navigation, placed after **Opportunities**. It now acts as a **four-card overview**; visitors choose Education, Research & Technical Skills, Programming & Languages, or Recognition. The Recognition card reuses the existing `/#/recognition` page with its Awards & Appreciation gateway and selected talks; it does not duplicate the 62-record archive. It is not a fabricated ranking of "top 0.1%" students. Relevant academic CV guidance: [Harvard GSAS CV guide](https://careerservices.fas.harvard.edu/resources/gsas-cv-cover-letter-guide-2/) and [Harvard SEAS CV/resume guidance](https://seas.harvard.edu/office-student-career-development/resources-graduate-students-postdocs/resumes-cvs-portfolios).

The nested Education page (`/#/cv/education`) restores three education records from the historical `src/data/site.ts` at [the original snapshot](https://github.com/Rocky5502/rocky_202x/blob/40677b335ea851d0c6a5dd3fcd774c776c23c97c/src/data/site.ts): ongoing Beihang PhD, preceding Beihang M.Eng, and Sichuan University B.Eng. At the owner's request, **no dates or period labels are displayed for the three university degrees**. The PhD is clearly marked *in progress*. Historical summer/winter school years remain on their separate archive.

The dedicated Skills page (`/#/cv/skills`) preserves **ten skills** curated against specific, public project READMEs as of 13 October 2026: LLM evaluation, calibration, open-weight model integrations, repository-level code generation, software testing, agent security, GPU experiment preparation, neuro-symbolic verification, reproducible experimentation, and research software engineering. Each card links to a public repository. The label "research plan/tooling" means the configuration/code exists but **not** that every benchmark or GPU run has completed. Llama is noted as an access-dependent configured family, not verified experimental results.

The Languages page (`/#/cv/languages`) lists programming and spoken languages separately. The programming languages Python and TypeScript are backed by public source; Java, C++, C and R are researcher-listed without proficiency levels. Spoken languages Nepali, English, Chinese, Hindi, Urdu and French are user-supplied, with no invented fluency certificate or CEFR score. Update these only after confirmation. Technical skills and education are maintained in `src/data/cv.ts`. Tests in `src/test/cv.test.tsx` protect the education data, skill evidence, language lists and new route. The page is a web CV and **not** a generated official PDF/transcript.

**Summer and winter schools were restored from the original `AwardsGalaxy.tsx` historical award/certificate entries, not invented:** 2025 ACM Europe School on Recommender Systems (TU Wien, Vienna; [official site](https://recsys-lab.at/rsss2025/)), 2025 International Software Engineering Winter School on Hybrid and Generative Intelligence (University of Bern; [official site](https://telegraf.inf.unibe.ch/)), 2025 AI Photonics International Summer School (Beihang, Hangzhou; [official course](https://biss.buaa.edu.cn/info/1036/1107.htm)), and 2024 International Terahertz Summer School (from an archived **oral-presentation award**, *not* a completion-certificate claim). The historical Oxford Saïd/UNESCO short-program entry is preserved as **professional learning**, not a degree or summer school.

University/organizer pages establish events and school descriptions, but not the researcher's personal attendance or completion. Personal participation is attributed to the owner's pre-redesign archive and not independently verified. The prior historical certificate images were mostly unavailable. `researchSchools` and `additionalLearning` live in `src/data/cv.ts`. No artificial degree dates or course completion claims were created.

Deep links use `/#/cv/education`, `/#/cv/skills` and `/#/cv/languages`. Legacy `/#/education` and `/#/skills` now redirect to the corresponding **inner page**; `/#/resume` returns to the overview. The GitHub Pages 404 fallback covers clean direct paths.

`src/test/cv.test.tsx` verifies progressive disclosure, school provenance, accurate categories, nested routes and original skills/language records.

## Awards & Appreciation (historical archive)

The **Recognition & talks** page intentionally stays minimal: it has one clickable **Awards & Appreciation** gateway linking to `/#/awards`, not the full 62-item collection. No awards wall is inserted into the homepage or primary navigation.

All **62 original entries** were recovered from the owner's [pre-redesign `AwardsGalaxy.tsx`](https://github.com/Rocky5502/rocky_202x/blob/40677b335ea851d0c6a5dd3fcd774c776c23c97c/src/components/AwardsGalaxy.tsx). `src/data/awards.ts` preserves every original entry's title, issuer, location, external URL, original image filename, and historical year group: 2026, 2025, 2024, and 2023–2018. Legacy year buckets are kept without inventing precise dates. The UI distinguishes competitive awards from scholarships, speaking/review service, attendance, and certificates.

**Important provenance:** This is a self-authored historical archive, not independent verification of every entry. The majority of certificate images mentioned by the old code were never committed to GitHub. The historic repository contains only `public/awards/ase2025.png`; the other image paths are missing. The redesigned page therefore uses small category icons, not broken images, substitute stock photos, or fabricated certificates. All original image filenames remain in the data for later restoration.

The private-free, mobile-responsive page supports year tabs, category filtering, title/issuer/place search, and meaningful empty-state recovery. `src/test/awards.test.tsx` enforces archive count and the click-through-only Recognition layout. Legacy and direct links to awards are supported by the router and `public/404.html`.

## Historical news archive

The original 2026 site included a `RockyNews` section. On 13 October 2026 it was restored as a dedicated **News** page (`/#/news`, in the header before **Opportunities**) and a three-item homepage preview. The **original 10 items** were recovered from [the last pre-redesign GitHub commit](https://github.com/Rocky5502/rocky_202x/blob/40677b335ea851d0c6a5dd3fcd774c776c23c97c/src/components/RockyNews.tsx). The original descriptions, long-form stories, external links, video links and month-level dates are preserved in `src/data/news.ts`. News chronology uses normalized month keys to support both `Apr 2026` and `April 2026`. **No artificial exact event day was added to historical entries.**

The new **"Auditable Uncertainty Control for Secure LLM Agents — ACM CCS 2026"** entry is dated **October 2026 as a site announcement** (not the unknown acceptance-decision date); the sole-authored acceptance is **researcher-reported, not independently verified against an individual ACM proceedings record**. The conference website is linked, but no paper DOI is invented.

Older articles are retained as part of the owner's original-site archive, **not represented as newly independently corroborated reporting**. Some links lead to organizational homepages rather than independent award announcements; retain the source and provenance distinction. To update stories, edit `src/data/news.ts`, keep source links and exact month dates, and run `src/test/news.test.tsx` along with the mandatory deployment gate.

Old links `/#/rocky-news` and `/#/updates` redirect to `/#/news`; GitHub Pages `public/404.html` also supports `/rocky_202x/rocky-news` and `/rocky_202x/news` for direct navigation.

## Maintain the content

Edit `src/data/portfolio.ts` for public profile details, the institutional contact address, the explicit PayPal recipient email, publication records, venue rankings, reviewing, volunteering, awards and talks. Edit `src/data/projects.ts` for the curated public GitHub project directory; each entry is explicitly linked to a public repository and has a non-final release-status label. Each publication has an external reference, a year and a publication type; if publisher proceedings are not public yet, the event website is used and marked explicitly. Add papers only after checking the title, author list, venue, date and link against the publisher or arXiv. Do not classify workshop papers as main-conference papers or preprints as peer-reviewed papers.

**Google Scholar:** https://scholar.google.com/citations?user=PyH-zqygdCYC&hl=en

**Verification ledger:** [docs/BIBLIOGRAPHY_PROVENANCE.md](docs/BIBLIOGRAPHY_PROVENANCE.md) records which publisher bylines and publication types were verified and which sources still require follow-up. Two July 2026 arXiv records were corrected in October 2026 to use the publisher-listed order Chandan Kumar Sah, Li Zhang, Xiaoli Lian.

Google Scholar does not provide a supported public publications API and may block automated scraping. For this reason the site links to Scholar as the complete record and keeps a manually verified, curated on-site bibliography. The previous one-page data and presentation components were removed to avoid outdated records and unnecessary personal content.

The portrait is intentionally rendered at a compact width (238 px max on large screens, smaller on mobile). To replace it, edit `src/assets/portrait.jpg`. The site deliberately omits personal life information, exact address, background counters and other non-academic biography.


## Publication venue rankings (checked 2026-10-12)

The website uses the **7th CCF recommended venue directory (2026)** and **ICORE 2026** for conference venue labels. Venue ranks are informational, not individual paper grades.

- **ACM CCS:** CCF A, ICORE A*. "Auditable Uncertainty Control for Secure LLM Agents" is listed as accepted **on author report only**, with solo authorship, and links to the event rather than a nonexistent publisher paper page. The public 2026 conference program did not independently corroborate the exact paper title at the time of checking.
- **ASE:** CCF A, ICORE A* (the published paper is from the *Doctoral Symposium*; the host grade does NOT transfer to the track).
- **ICCV and CVPR:** CCF A, ICORE A* (the listed papers are from **workshops**, NOT the main conference).
- **CSEE&T / CSEET:** ICORE C; CCF not assigned because an official CCF classification was not verified.
- **Journals, books, preprints, and other conference venues:** no guessed CCF or ICORE grades.

CCF: https://www.ccf.org.cn/Academic_Evaluation/By_category/

ICORE: https://portal.core.edu.au/conf-ranks/

**Ethical rank policy:** These are *venue* classifications, not individual paper quality scores. Never represent doctoral-symposium or workshop publications as ranked main-conference publications. Only add a rating after checking the exact publication type and source.

## Academic identity and service sources

- [LinkedIn](https://www.linkedin.com/in/chandan-sah-rocky-%E6%96%87%E6%B5%A9-5803bb1b4/): selected publicly indexed academic service, volunteering, and recognitions; do not import private life details or unverified organizational claims.
- [Public ORCID](https://orcid.org/0009-0002-4017-7970): persistent researcher identifier. The `/my-orcid` edit link requires login and is NOT a public permalink.
- [Web of Science Researcher Profiles](https://clarivate.com/academia-government/scientific-and-academic-research/research-discovery-and-referencing/web-of-science/wos-researcher-profiles/): verified review history may be exported by the account owner.
- Reviewer counts supplied by the researcher: **7 Web of Science review-round records covering 5 manuscripts** and **2 ORCID peer-review records**. These records can overlap, should not be added, and are not independently auditable from the public website. No manuscript titles or confidential report content are published.
- Added IASEAI 2026 volunteer contribution as researcher-reported and selected academic service from the indexed LinkedIn profile.
- Grokipedia is not an authoritative publisher or identity registry and its page was inaccessible; do not use it as evidence for paper acceptance, review appointments, or institutional roles.

## Current public research code

The `/#/projects` page is a manually curated subset of the owner's public GitHub repositories, not a full index of private or work-in-progress submissions. To update:
1. Verify the repository is public (private projects are deliberately excluded).
2. Inspect its current README and project status.
3. Update `src/data/projects.ts`, including the accurate stage and GitHub repository name.
4. Run `bun run test` and the full build before pushing.

The site deliberately does not infer acceptance, scientific validation, or production readiness from the existence of a GitHub repository.

## Research opportunities and personal support

The **Opportunities & support** page at `/#/connect` communicates the current doctoral researcher's professional interests without implying existing appointments or readiness for an immediate full-time start:

- Academic collaborations and reproducible research.
- Visiting researcher placements, visiting scholar programs and research fellowships.
- Industry research internships, applied AI research and selective remote/part-time software/ML engineering collaborations.
- Conversations about future postdoctoral and research-scientist opportunities at appropriate stages of the PhD.

Opportunity wording is authored in `src/data/opportunities.ts` and is not a guarantee of eligibility or institutional approval.

The optional **“Support open, responsible AI research”** content is deliberately **collapsed by default** in a small, bottom-right, in-page native HTML `<details>` disclosure (not a persistent overlay, floating solicitation, or separate top-level page). Desktop shows a compact ≤370px card at the bottom of Opportunities; mobile retains a full-width but restrained summary. Clicking or keyboard-opening it reveals PayPal and Google Pay inquiries, the original full research-support explanation, and payment-verification disclosures. The support block remains subordinate to academic collaboration and is covered by unit, English/Chinese browser interaction, expanded accessibility and 320/390px overflow tests.

The researcher explicitly requested displaying **sahchandan98@gmail.com** as a *public PayPal recipient email and contact address for Google Pay inquiries* for optional personal support of open, responsible AI research. Academic correspondence continues to use the institutional `sahchandan98@buaa.edu.cn` address. The site implements:

- A labeled, selectable read-only payment email with a copy-to-clipboard button.
- A small, unmodified PayPal logo sourced from PayPal's official asset CDN and a link to the generic PayPal homepage.
- An unmodified Google Pay mark from Google's developer-branding resources, shown only alongside a request for verified receiving details; the same Gmail address is a **contact address**, not a verified Google Pay payee identifier.
- Official Google support states personal money transfers depend on country and supported payment rails. Email-address transfers are not universally supported: https://support.google.com/googlepay/answer/12429287?hl=en.
- Google Pay branding: https://developers.google.com/pay/api/web/guides/brand-guidelines.
- **No payment processor integration, embedded checkout, unverified PayPal.Me or Google Pay payment identifier, user analytics or automated receipt claims.**
- Explicit disclosure that voluntary contributions are personal, not tax-deductible charitable donations or institutional grants, and do not influence research results, authorship or peer review.
- A confirmation reminder to verify recipient details in PayPal before sending funds.

The PayPal trademark belongs to PayPal, and the Google Pay mark belongs to Google. Displaying the marks does not imply endorsement, a verified recipient, or active checkout integration. Remove the email from the public repository and website if privacy or institutional funding rules change. It will otherwise remain publicly indexed. The site owner should ensure any independent financial support complies with scholarship, institutional and relevant tax/payment requirements.

## Run locally

```bash
bun install
bun run dev
bun run build
bun run test
bunx tsc --noEmit -p tsconfig.app.json
```

The site is hosted as a Vite project on GitHub Pages with `base: "/rocky_202x/"` in `vite.config.ts`. Pushing to `main` triggers `.github/workflows/deploy.yml`, which **must pass TypeScript typechecking and all unit/integration regression tests before the production bundle can deploy**. The separate `verify.yml` workflow provides additional confirmation on pushes and pull requests.

## Design and accessibility

- Warm neutral palette with deliberately restrained typography, no gradient or floating effects
- Persistent light/dark preference stored in the browser
- Separate routes, keyboard-accessible navigation and filter controls, mobile menu, visible focus states
- Semantic publication records, external links, reduced-motion handling
- Route-specific browser titles and metadata, mobile navigation that supports Escape and restores focus, and accessible contrast for small labels
- Automated test guard for WCAG AA 4.5:1 normal-text contrast across light/dark surfaces
- No tracking or backend required by the redesigned pages

## Content policy

**This website represents Chandan Kumar Sah (Rocky 文浩), ORCID [0009-0002-4017-7970](https://orcid.org/0009-0002-4017-7970) only.** Do not import publications by name matching alone; verify authorship, affiliation, and the owner's ORCID before adding any record. Academic reviewer appointments may not be independently public; do not disclose confidential review assignments or imply PC membership based on peer review. Distinctions are a selected set copied from the earlier public portfolio and should be confirmed with certificates if the exact award wording is important.

Changes to the `main` branch trigger both verification checks and GitHub Pages deployment. Public code and site content are maintained in the same repository.
