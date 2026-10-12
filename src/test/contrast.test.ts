import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** WCAG 2.2 relative luminance and contrast ratio for normal-sized text. */
const linearize = (channel: number) => channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
const luminance = (hex: string) => {
  const rgb = hex.replace("#", "").match(/.{2}/g);
  if (!rgb || rgb.length !== 3) throw new Error("Invalid 6-digit hex color");
  const [r, g, b] = rgb.map(channel => linearize(parseInt(channel, 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (text: string, background: string) => {
  const top = Math.max(luminance(text), luminance(background));
  const bottom = Math.min(luminance(text), luminance(background));
  return (top + 0.05) / (bottom + 0.05);
};
// Vitest transforms import.meta.url to a virtual module URL; read from the workspace root.
const sheet = readFileSync("src/portfolio.css", "utf8");

function palette(theme: "light" | "dark") {
  const declaration = theme === "light" ? ":root" : ":root.dark";
  const selector = theme === "light" ? /:root\s*\{([^}]+)\}/ : /:root\.dark\s*\{([^}]+)\}/;
  const block = sheet.match(selector)?.[1];
  if (!block) throw new Error(`Cannot find ${declaration} CSS palette`);
  const get = (token: string) => {
    const match = block.match(new RegExp(`--portfolio-${token}:\\s*(#[0-9a-fA-F]{6})`));
    if (!match) throw new Error(`Cannot find CSS variable --portfolio-${token}`);
    return match[1];
  };
  return { faint: get("faint"), bg: get("bg"), panel: get("panel"), soft: get("soft"), muted: get("muted") };
}

describe("editorial palette accessibility", () => {
  for (const theme of ["light", "dark"] as const) {
    it(`keeps normal-size metadata readable on ${theme} theme surfaces`, () => {
      const colors = palette(theme);
      for (const surface of ["bg", "panel", "soft"] as const) {
        expect(ratio(colors.faint, colors[surface]), `${theme}: faint on ${surface}`).toBeGreaterThanOrEqual(4.5);
        expect(ratio(colors.muted, colors[surface]), `${theme}: muted on ${surface}`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }
});
