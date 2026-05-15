# Rocky_202X — Personal Academic Website

Personal site of **Chandan Kumar Sah (Rocky 文浩)** — PhD Researcher, Software Engineering Institute, Beihang University.

Built with **React + Vite + TypeScript + Tailwind CSS**. Static — deploys anywhere. Fully editable: all profile / publications / projects / talks live in `src/data/site.ts`.

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a repository on GitHub named `Rocky_202X` and push this project to it.
2. Install the gh-pages helper:
   ```bash
   npm install -D gh-pages
   ```
3. In `vite.config.ts`, set `base: "/Rocky_202X/"` (only if hosting under a project path; omit for a custom domain or `<user>.github.io`).
4. Add scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. Deploy:
   ```bash
   npm run deploy
   ```
6. In the repository **Settings → Pages**, set the source to the `gh-pages` branch.

> Tip: For client-side routing, add `public/404.html` mirroring `index.html` so deep links work on GitHub Pages.

## Editing content

Open `src/data/site.ts` — every section reads from typed arrays (publications, projects, talks, honors, timeline, links, profile). Update the file and the site updates everywhere.

## Notes

- No backend, no database, no auth — fully static.
- Dark / light mode toggle included.
- SEO + JSON-LD `Person` schema in `index.html`.
- Accessible semantic HTML, mobile-first responsive.
