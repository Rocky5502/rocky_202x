# Academic website — Chandan Kumar Sah

An editorial, multi-page academic portfolio built with React, Vite, and TypeScript.
Designed for readers of research papers, potential collaborators, hiring committees, and students.

**Live website:** https://rocky5502.github.io/rocky_202x/

## Pages

| Route | Content |
| --- | --- |
| `/#/` | Research overview, selected publications and contact |
| `/#/publications` | Papers with topic/type filters and correctly scoped CCF/ICORE venue ratings |
| `/#/projects` | Curated, tagged and filtered links to publicly accessible research repositories |
| `/#/research` | Five research directions, including Software Engineering for AI and Trustworthy AI |
| `/#/service` | Reviewing roles, volunteer activities, academic identities |
| `/#/recognition` | Awards and selected invited / conference talks |
| `/#/news` | Full chronological archive of the original 10 news stories plus author-reported ACM CCS 2026 acceptance |
| `/#/connect` | Visiting research, fellowships, research-oriented roles and optional individual research support |

Hash routes are intentional because GitHub Pages does not rewrite deep route URLs to `index.html`.

### Routing and troubleshooting

**Canonical links** always use the hash syntax (`https://rocky5502.github.io/rocky_202x/#/connect` for Opportunities). Legacy hash route aliases (`/#/opportunities`, `/#/contact`, `/#/support`, `/#/research-areas`) redirect inside the app. The `public/404.html` fallback also redirects ordinary clean URLs such as `/rocky_202x/connect` to their canonical hash routes; missing asset requests remain 404 responses.

GitHub Pages may serve temporarily cached HTML immediately after a deployment, even though the latest hashed JS bundle is in the repository. If a page displays the previous header without the Opportunities navigation, **hard-refresh** or open `https://rocky5502.github.io/rocky_202x/?v=20261012#/connect` once. Do not change URLs to `/rocky_202x/connect` unless the legacy redirect is desired.

`src/test/navigation.test.tsx` tests the real `/#/connect` address, legacy hash aliases, 404 recovery and all five research topics. Both `Verify portfolio` and the Pages deployment should succeed for the same latest commit before considering a release complete.

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
