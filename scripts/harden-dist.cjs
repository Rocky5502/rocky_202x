#!/usr/bin/env node
/**
 * Build-only, defense-in-depth browser policy for GitHub Pages.
 * GitHub Pages does not let us configure custom response security headers.
 * A meta CSP protects the generated SPA from most unexpected remote scripts,
 * inline script injection, third-party network calls and embedded objects.
 * The author JSON-LD is deliberately hash-allowed (never use unsafe-inline
 * for scripts). The source index.html stays readable in local Vite dev.
 */
const fs = require("node:fs");
const crypto = require("node:crypto");
const path = require("node:path");

const dir = path.resolve("dist");
const page = path.join(dir, "index.html");
if (!fs.existsSync(page)) throw new Error("Missing dist/index.html: run the production build first");
let html = fs.readFileSync(page, "utf8");
if (html.includes("http-equiv=\"Content-Security-Policy\"")) {
  throw new Error("Production CSP already present: refusing to inject duplicates");
}
const jsonld = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (jsonld.length !== 1) throw new Error("Expected exactly one trusted structured-data script, found " + jsonld.length);
JSON.parse(jsonld[0][1]);
const hash = crypto.createHash("sha256").update(jsonld[0][1], "utf8").digest("base64");
const directives = [
  "default-src 'none'",
  `script-src 'self' 'sha256-${hash}'`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.paypalobjects.com https://developers.google.com https://avatars.githubusercontent.com",
  "font-src 'self' data:",
  "connect-src 'none'",
  "worker-src 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "manifest-src 'self'"
];
const policy = directives.join("; ");
const CSP = `<meta http-equiv="Content-Security-Policy" content="${policy}" />`;
const marker = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
if (!html.includes(marker)) throw new Error("Cannot place CSP before production scripts: viewport anchor missing");
html = html.replace(marker, marker + "\n  " + CSP);
if (!html.includes('<meta name="referrer" content="no-referrer"')) {
  throw new Error("Expected a privacy-preserving referrer policy in source index.html");
}
fs.writeFileSync(page, html, "utf8");
console.log("Production browser security policy generated: inline JSON-LD SHA-256 pinned, other inline scripts blocked.");
console.log("Allowed third-party assets: only published research identity/payment logos; network APIs, frames and form posts disabled.");
