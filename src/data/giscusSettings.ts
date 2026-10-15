/**
 * GitHub Discussions supplies persistent comments and reactions through the giscus iframe.
 * This site's URL uses HashRouter, so discussions MUST map via a stable specific term,
 * never 'pathname' (all essays share the same browser pathname on GitHub Pages).
 *
 * GitHub Discussions is enabled, and the Announcements category ID was retrieved
 * from the repository using its GITHUB_TOKEN in a one-time CI check. The owner
 * must also ensure the official giscus GitHub App has repository access.
 * No GitHub OAuth token is embedded in this site.
 */
export const giscusSettings = {
  repo: "Rocky5502/rocky_202x",
  repoId: "R_kgDOSeIGfg",
  category: "Announcements",
  categoryId: "DIC_kwDOSeIGfs4DIhO6", // Read from repository GraphQL API via authenticated GitHub Actions; public ID.
} as const;

export const giscusReady =
  /^DIC_[A-Za-z0-9_-]{8,}$/.test(giscusSettings.categoryId);

export function giscusTerm(articlePath: string) {
  if (!/^\/notes\/(?:essays\/[a-z0-9-]+|[a-z0-9-]+)$/.test(articlePath))
    throw new Error("Invalid article route");
  return "Rocky Research Notes: " + articlePath;
}
