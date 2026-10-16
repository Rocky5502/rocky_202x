import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("static-hosting security boundaries", () => {
  it("protects outbound navigation and blocks referrer leakage in the HTML shell", () => {
    const html = readFileSync("index.html", "utf8");
    const homepage = readFileSync("src/components/PortfolioSite.tsx", "utf8");
    expect(html).toContain('<meta name="referrer" content="no-referrer" />');
    expect(homepage).toContain('target="_blank" rel="noopener noreferrer"');
    expect(homepage).not.toContain("dangerouslySetInnerHTML");
    expect(homepage).not.toContain("document.write(");
  });

  it("uses an allowlisted Pages fallback and preserves only supported shared locales", () => {
    const redirect = readFileSync("public/404.html", "utf8");
    expect(redirect).toContain("routes.indexOf(route) < 0");
    expect(redirect).toContain('language === "en" || language === "zh-CN"');
    expect(redirect).toContain('encodeURIComponent(language)');
    expect(redirect).not.toContain("eval(");
  });

  it("requires generated-content hash pinning rather than unsafe inline scripts", () => {
    const generator = readFileSync("scripts/harden-dist.cjs", "utf8");
    expect(generator).toContain('crypto.createHash("sha256")');
    expect(generator).toContain('"default-src \'none\'"');
    expect(generator).toContain("connect-src 'self' https://api.github.com");
    expect(generator).toContain('url.hostname.endsWith(".workers.dev")');
    expect(generator).toContain("likeApiOrigin");
    expect(generator).toContain('"frame-src https://giscus.app"');
    expect(generator).toContain("https://giscus.app");
    expect(generator).toContain('"object-src \'none\'"');
    expect(generator).toContain('"form-action \'none\'"');
    expect(generator).not.toContain('"script-src \'self\' \'unsafe-inline\'"');
  });
});
