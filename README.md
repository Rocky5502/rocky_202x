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
| `/#/research` | Research questions, themes, and a few highlighted open projects |
| `/#/service` | Reviewing roles, volunteer activities, academic identities |
| `/#/recognition` | Awards and selected invited / conference talks |

Hash routes are intentional because GitHub Pages does not rewrite deep route URLs to `index.html`.

## Maintain the content

Edit `src/data/portfolio.ts` for public profile details, publication records, venue rankings, reviewing, volunteering, awards and talks. Edit `src/data/projects.ts` for the curated public GitHub project directory; each entry is explicitly linked to a public repository and has a non-final release-status label. Each publication has an external **primary source**, a year and a publication type. Add papers only after checking the title, author list, venue, date and link against the publisher or arXiv. Do not classify workshop papers as main-conference papers or preprints as peer-reviewed papers.

**Google Scholar:** https://scholar.google.com/citations?user=PyH-zqygdCYC&hl=en

Google Scholar does not provide a supported public publications API and may block automated scraping. For this reason the site links to Scholar as the complete record and keeps a manually verified, curated on-site bibliography. The previous one-page data and presentation components were removed to avoid outdated records and unnecessary personal content.

The portrait is intentionally rendered at a compact width (238 px max on large screens, smaller on mobile). To replace it, edit `src/assets/portrait.jpg`. The site deliberately omits personal life information, exact address, background counters and other non-academic biography.


## Publication venue rankings (checked 2026-10-12)

The website uses the **7th CCF recommended venue directory (2026)** and **ICORE 2026** for conference venue labels.

- **ASE:** CCF A, ICORE A* (the published paper is from the *Doctoral Symposium*; the host grade does NOT transfer to the track).
- **ICCV and CVPR:** CCF A, ICORE A* (the listed papers are from **workshops**, NOT the main conference).
- **CSEE&T / CSEET:** ICORE C; CCF not assigned because an official CCF classification was not verified.
- **Journals, books, preprints, and other conference venues:** no guessed CCF or ICORE grades.

CCF: https://www.ccf.org.cn/Academic_Evaluation/By_category/

ICORE: https://portal.core.edu.au/conf-ranks/

**Ethical rank policy:** These are *venue* classifications, not individual paper quality scores. Never represent doctoral-symposium or workshop publications as ranked main-conference publications. Only add a rating after checking the exact publication type and source.

## Current public research code

The `/#/projects` page is a manually curated subset of the owner's public GitHub repositories, not a full index of private or work-in-progress submissions. To update:
1. Verify the repository is public (private projects are deliberately excluded).
2. Inspect its current README and project status.
3. Update `src/data/projects.ts`, including the accurate stage and GitHub repository name.
4. Run `bun run test` and the full build before pushing.

The site deliberately does not infer acceptance, scientific validation, or production readiness from the existence of a GitHub repository.

## Run locally

```bash
bun install
bun run dev
bun run build
bun run test
bunx tsc --noEmit -p tsconfig.app.json
```

The site is hosted as a Vite project on GitHub Pages with `base: "/rocky_202x/"` in `vite.config.ts`. Pushing to `main` triggers `.github/workflows/deploy.yml`.

## Design and accessibility

- Warm neutral palette with deliberately restrained typography, no gradient or floating effects
- Persistent light/dark preference stored in the browser
- Separate routes, keyboard-accessible navigation and filter controls, mobile menu, visible focus states
- Semantic publication records, external links, reduced-motion handling
- No tracking or backend required by the redesigned pages

## Content policy

Do not import papers by matching author names alone. Another published researcher named Chandan Kumar Sah has ORCID 0000-0002-9768-4431 and is affiliated with robotics research at the Indian Institute of Science; this site's ORCID is 0009-0002-4017-7970. Verify identities from affiliations and ORCID before any publication import. Academic reviewer appointments may not be independently public; do not disclose confidential review assignments or imply PC membership based on peer review. Distinctions are a selected set copied from the earlier public portfolio and should be confirmed with certificates if the exact award wording is important.

Changes to the `main` branch trigger both verification checks and GitHub Pages deployment. Public code and site content are maintained in the same repository.
