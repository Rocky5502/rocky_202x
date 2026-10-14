# Security policy — Rocky academic portfolio

This repository publishes an informational, static academic portfolio at
https://rocky5502.github.io/rocky_202x/. It does not operate login accounts,
custom server endpoints, databases, or a payment-processing backend.

## Responsible disclosure

If you identify a vulnerability in the site source or deployed assets, please
report it privately to **sahchandan98@gmail.com** with a short description,
affected URL, steps to reproduce, and potential impact. Do not include
credentials or private information in a public GitHub issue.

The researcher does not operate a bug-bounty programme or promise a fixed
response-time SLA. Responsible reports are welcome.

## Security boundaries

- **GitHub Pages controls the HTTP response headers.** The site enforces a
  build-generated HTML meta Content Security Policy and a no-referrer policy.
  Meta CSP is not a substitute for server-enforced framing protections,
  HSTS, COOP or other security response headers.
- **Browser-only architecture:** no password collection, form submissions,
  remote API calls or analytics scripts are intended in the production site.
  Scholarly links open independently, with `noopener noreferrer`.
- **No payment checkout:** the small optional support disclosure contains
  contact information only; a valid recipient must be verified directly with
  the payment provider before sending any money.
- **Author-supplied metadata:** conference news, archived awards and CV content
  are informational. The site's editorial verification policy is not a security
  identity-verification service.
- **Third-party images:** the optional PayPal and Google Pay mark files are
  currently loaded from their official domains. The source code must not add
  remote scripts or trackers to compensate for unavailable branding.
- **Dependency supply chain:** weekly Dependabot reviews and the production
  advisory workflow track package vulnerabilities. An advisory for a package
  present in the installed graph does not prove the code is reachable in the
  shipped browser bundle. Nevertheless, high/critical advisories should be
  triaged, patched and documented.

## Developer verification

```bash
bun install
bun run test
bun run build
node scripts/harden-dist.cjs
node scripts/security-audit.cjs
bun audit --prod --audit-level=high
```

The source tree is written in React, TypeScript, CSS, JavaScript and small
Python build tooling; the runtime website is a compiled static Vite bundle.
The standalone Chromium QA workflow tests the actual production build and
checks CSP behaviour in a real browser.

Report security errors clearly: do not disable a failing security check solely
to obtain a green deployment badge.
