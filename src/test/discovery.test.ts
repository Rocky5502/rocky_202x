import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const root = "https://rocky5502.github.io/rocky_202x/";

describe("academically honest discovery metadata", () => {
  it("advertises the correct homepage canonical and the researcher's only ORCID", () => {
    const html = readFileSync("index.html", "utf8");
    expect(html).toContain('<link rel="canonical" href="' + root + '"');
    expect(html).toContain('"https://orcid.org/0009-0002-4017-7970"');
    expect(html).not.toContain("0000-0002-9768-4431");
    expect(html).toContain('"@type": "Person"');
  });

  it("indexes the academic homepage and six real X HTML pages, never hash-router fragments", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => x[1]);
    const x = root + "x/";
    expect(urls).toEqual([
      root,
      x,
      x + "docs/",
      x + "learn/",
      x + "status/",
      x + "community/",
      x + "ai/",
    ]);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every(url => url.startsWith(root) && !url.includes("#"))).toBe(true);
    for (const relative of ["index.html", "docs/index.html", "learn/index.html", "status/index.html", "community/index.html", "ai/index.html"]) {
      const html = readFileSync("public/x/" + relative, "utf8");
      const canonical = x + relative.replace(/index\.html$/, "");
      expect(html).toContain('<link rel="canonical" href="' + canonical + '">');
    }
    const robots = readFileSync("public/robots.txt", "utf8");
    expect(robots).toContain("Sitemap: " + root + "sitemap.xml");
  });
});
