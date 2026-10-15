#!/usr/bin/env python3
"""Fail-closed source and built-site audit for the standalone X Pages microsite.

No third-party dependencies. This intentionally does not replace browser QA.
"""
from __future__ import annotations

import argparse
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

PUBLIC_BASE = "https://rocky5502.github.io/rocky_202x/x/"
PAGES = ("index.html", "docs/index.html", "learn/index.html",
         "status/index.html", "community/index.html")
ASSETS = ("assets/styles.css", "assets/site.js", "assets/search-core.mjs",
          "assets/docs-search.mjs", "assets/x-mark.svg")


class HTMLAudit(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.references = []
        self.canonicals = []
        self.scripts = []
        self.csp = []
        self.h1 = self.main = self.current = 0
        self.inline_code = []
        self.description = False

    def handle_starttag(self, tag, pairs):
        values = dict(pairs)
        if values.get("id"):
            self.ids.append(values["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "main":
            self.main += 1
        if values.get("aria-current") == "page":
            self.current += 1
        if "style" in values or tag == "style":
            self.inline_code.append(tag)
        if tag == "script":
            if not values.get("src"):
                self.inline_code.append("inline script")
            else:
                self.scripts.append(values["src"])
        if tag == "form" and (values.get("action") or values.get("method")):
            self.inline_code.append("remote or submitting form")
        if tag == "meta" and values.get("http-equiv", "").lower() == "content-security-policy":
            self.csp.append(values.get("content", ""))
        if tag == "meta" and values.get("name") == "description" and values.get("content"):
            self.description = True
        if tag == "link" and values.get("rel") == "canonical":
            self.canonicals.append(values.get("href"))
        if tag in ("a", "link", "script", "img"):
            attr = "src" if tag in ("script", "img") else "href"
            if values.get(attr):
                self.references.append(values[attr])
        if tag == "a" and values.get("target") == "_blank":
            rel = values.get("rel", "")
            if not ("noopener" in rel and "noreferrer" in rel):
                self.inline_code.append("unprotected new-tab link")


def audit(root: Path, sitemap: Path) -> list[str]:
    root = root.resolve()
    issues = []
    for asset in ASSETS:
        if not (root / asset).is_file():
            issues.append("missing static asset: " + asset)

    for name in PAGES:
        path = root / name
        if not path.is_file():
            issues.append("missing X page: " + name)
            continue
        parser = HTMLAudit()
        parser.feed(path.read_text(encoding="utf-8"))
        parser.close()
        canonical = PUBLIC_BASE + name.removesuffix("index.html")
        if parser.canonicals != [canonical]:
            issues.append(name + ": incorrect or duplicated canonical URL")
        if not parser.description:
            issues.append(name + ": missing description")
        if len(parser.csp) != 1 or not all(
            value in parser.csp[0]
            for value in ("default-src 'none'", "script-src 'self'",
                          "connect-src 'none'", "form-action 'none'")
        ):
            issues.append(name + ": missing restrictive CSP")
        if (parser.h1, parser.main, parser.current) != (1, 1, 1):
            issues.append(name + ": expected one H1, main and current nav")
        if "main" not in parser.ids or len(set(parser.ids)) != len(parser.ids):
            issues.append(name + ": duplicate IDs or missing main anchor")
        if parser.inline_code:
            issues.append(name + ": unsafe inline element: " + repr(parser.inline_code))
        if not parser.scripts:
            issues.append(name + ": no first-party script loaded")
        for ref in parser.references:
            parsed = urlsplit(ref)
            if parsed.scheme or parsed.netloc:
                if parsed.scheme not in ("https",):
                    issues.append(name + ": non-HTTPS external resource: " + ref)
                continue
            target = (path.parent / unquote(parsed.path)).resolve() if parsed.path else path.resolve()
            if not target.is_relative_to(root):
                issues.append(name + ": link escapes X site root: " + ref)
            elif not target.is_file():
                issues.append(name + ": broken internal link: " + ref)
            elif parsed.fragment and target.suffix == ".html":
                other = HTMLAudit()
                other.feed(target.read_text(encoding="utf-8"))
                if unquote(parsed.fragment) not in other.ids:
                    issues.append(name + ": missing fragment target: " + ref)

    try:
        tree = ET.parse(sitemap)
        locations = {item.text for item in tree.findall(".//{*}loc")}
        for name in PAGES:
            url = PUBLIC_BASE + name.removesuffix("index.html")
            if url not in locations:
                issues.append("sitemap missing: " + url)
    except (OSError, ET.ParseError) as exc:
        issues.append("invalid sitemap: " + type(exc).__name__)

    for asset in ("assets/site.js", "assets/search-core.mjs", "assets/docs-search.mjs"):
        file = root / asset
        if file.is_file() and re.search(r"\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon)\s*\(", file.read_text(encoding="utf-8")):
            issues.append("unexpected external communication code in " + asset)
    return issues


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path("dist/x"))
    parser.add_argument("--sitemap", type=Path, default=Path("dist/sitemap.xml"))
    args = parser.parse_args()
    errors = audit(args.root, args.sitemap)
    for message in errors:
        print("FAIL: " + message)
    if errors:
        print("X microsite verification FAILED (" + str(len(errors)) + " issues).")
        return 1
    print("X microsite verified: 5 static pages, 5 assets, CSP, links, canonical URLs and sitemap.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
