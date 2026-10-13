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

  it("lists only crawlable homepage URLs and never falsely indexes hash route fragments", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => x[1]);
    expect(urls).toEqual([root]);
    expect(urls.every(url => !url.includes("#"))).toBe(true);
    const robots = readFileSync("public/robots.txt", "utf8");
    expect(robots).toContain("Sitemap: " + root + "sitemap.xml");
  });
});
