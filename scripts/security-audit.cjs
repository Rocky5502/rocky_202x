#!/usr/bin/env node
/**
 * Fail-closed checks for deployed portfolio source. No secrets are read.
 * Scope: first-party TS/TSX, public assets, generated production HTML.
 * Dependency CVEs are checked separately by npm audit from the lockfile.
 */
const fs = require("node:fs");
const path = require("node:path");

const fail = [];
const assert = (value, reason) => { if (!value) fail.push(reason); };
function walk(dir, suffixes) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(file, suffixes);
    return suffixes.some(s => file.endsWith(s)) ? [file] : [];
  });
}
const source = walk("src", [".ts", ".tsx"]);
const bannedSecrets = [
  /\bAKIA[0-9A-Z]{16}\b/g,
  /\bgh[opusr]_[a-zA-Z0-9]{36,255}\b/g,
  /\bsk-(?:proj-)?[a-zA-Z0-9_-]{24,}\b/g,
  /\bAIza[0-9A-Za-z_-]{35}\b/g,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g
];
for (const file of source) {
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of bannedSecrets) assert(!pattern.test(text), `Potential credential detected in ${file} (${pattern.source})`);
  if (file.startsWith("src/test/")) continue;
  // All external destination links must protect against tabnabbing and referrer leakage.
  for (const anchor of text.matchAll(/<a\b[^>]*\btarget="_blank"[^>]*>/gs)) {
    assert(/\brel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/.test(anchor[0]), `External link missing noopener/noreferrer in ${file}`);
  }
  assert(!/\b(?:eval|document\.write)\s*\(/.test(text), `Unsafe eval/document.write in ${file}`);
  assert(!/\bnew\s+Function\s*\(/.test(text), `Dynamic Function execution in ${file}`);
}
const htmlPath = "dist/index.html";
assert(fs.existsSync(htmlPath), "Production HTML missing, run build + harden");
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const match = html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/);
  assert(!!match, "Production CSP missing");
  if (match) {
    const policy = match[1];
    for (const part of ["default-src 'none'", "object-src 'none'", "connect-src 'self' https://api.github.com", "form-action 'none'", "base-uri 'self'", "frame-src https://giscus.app", "script-src-attr 'none'"]) {
      assert(policy.includes(part), `CSP lacks ${part}`);
    }
    assert(/script-src 'self' 'sha256-[A-Za-z0-9+/=]+'/.test(policy), "Trusted inline JSON-LD must be SHA-256 hash-pinned");
    const scripts = policy.split("; ").find(x => x.startsWith("script-src ")) ?? "";
    assert(!scripts.includes("'unsafe-inline'") && !scripts.replaceAll("https://giscus.app", "").includes("https:"), "CSP must not allow unrestricted inline/remote JavaScript");
    assert(scripts.includes(" https://giscus.app"), "Only approved giscus script host is permitted");
    assert(!policy.includes("https://*.") && !policy.includes(" * "), "Never wildcard third-party sources");
  }
  assert(html.includes('<meta name="referrer" content="no-referrer"'), "Privacy-preserving referrer policy missing");
  assert(!/http:\/\/(?!127\.0\.0\.1|localhost)/i.test(html), "Production HTML contains a plaintext HTTP destination");
}
const redirect = fs.readFileSync("public/404.html", "utf8");
assert(redirect.includes("routes.indexOf(route) < 0"), "404 redirect must validate route against known allowlist");
assert(redirect.includes('language === "en" || language === "zh-CN"'), "404 redirect must only propagate validated language values");
if (fail.length) {
  for (const item of fail) console.error("SECURITY_FAIL " + item);
  process.exit(1);
}
console.log(`Security baseline passed: ${source.length} first-party TS/TSX files scanned, CSP + redirect + referrer policy enforced.`);
