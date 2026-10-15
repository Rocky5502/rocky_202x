/**
 * GitHub Discussions supplies persistent comments and reactions through the giscus iframe.
 * This site's URL uses HashRouter, so discussions MUST map via a stable specific term,
 * never 'pathname' (all essays share the same browser pathname on GitHub Pages).
 *
 * One-time owner setup: turn on repo Discussions, install github.com/apps/giscus for this
 * repository, and copy the Announcements category ID from https://giscus.app/.
 * Category ID is not a secret; no GitHub OAuth token is ever embedded in this site.
 */
export const giscusSettings = {
  repo: "Rocky5502/rocky_202x",
  repoId: "R_kgDOSeIGfg",
  category: "Announcements",
  categoryId: "", // Activate after owner enables Discussions and supplies correct category ID.
} as const;

export const giscusReady =
  /^DIC_[A-Za-z0-9_-]{8,}$/.test(giscusSettings.categoryId);

export function giscusTerm(articlePath: string) {
  if (!/^\/notes\/(?:essays\/[a-z0-9-]+|[a-z0-9-]+)$/.test(articlePath))
    throw new Error("Invalid article route");
  return "Rocky Research Notes: " + articlePath;
}
