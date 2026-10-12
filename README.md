# Academic website — Chandan Kumar Sah

An editorial, multi-page academic portfolio built with React, Vite, and TypeScript.
Designed for readers of research papers, potential collaborators, hiring committees, and students.

**Live (production after merge):** https://rocky5502.github.io/rocky_202x/

## Pages

| Route | Content |
| --- | --- |
| `/#/` | Research overview, selected publications and contact |
| `/#/publications` | Searchable publications with topic and type filters |
| `/#/research` | Research directions and selected public projects |
| `/#/service` | Reviewing roles, volunteer activities, academic identities |
| `/#/recognition` | Awards and selected invited / conference talks |

Hash routes are intentional because GitHub Pages does not rewrite deep route URLs to `index.html`.

## Maintain the content

Edit `src/data/portfolio.ts` for public profile details, publication records, project links, reviewing, volunteering, awards and talks. Each publication has an external **primary source**, a year and a publication type. Add papers only after checking the title, author list, venue, date and link against the publisher or arXiv. Do not classify workshop papers as main-conference papers or preprints as peer-reviewed papers.

**Google Scholar:** https://scholar.google.com/citations?user=PyH-zqygdCYC&hl=en

Google Scholar does not provide a supported public publications API and may block automated scraping. For this reason the site links to Scholar as the complete record and keeps a manually verified, curated on-site bibliography. The previous one-page data and presentation components were removed to avoid outdated records and unnecessary personal content.

Update the portrait by replacing `src/assets/portrait.jpg` with your own photo. The site deliberately omits personal life information, exact address, background counters and other non-academic biography.

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

This pull request does not modify the deployed site until merged to `main`.
