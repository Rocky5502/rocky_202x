#!/usr/bin/env python3
"""Optimize the generated Vite portrait asset without modifying the original photo.

The academic site shows the portrait at roughly 165–238 CSS pixels wide.
640px image width is sufficient for typical 2x displays, while avoiding
a roughly 1.86 MB download for every visitor. We preserve the original
source image in Git, and optimize only the deployed distribution.

Requires Pillow; installed at a pinned version in GitHub Actions.
"""
from __future__ import annotations

from pathlib import Path
from tempfile import NamedTemporaryFile
import os
from PIL import Image, ImageOps

DIST = Path("dist/assets")
pictures = list(DIST.glob("portrait-*.jpg"))
if len(pictures) != 1:
    raise SystemExit(f"Expected one built portrait JPG; found {len(pictures)}: {pictures}")
source = pictures[0]
before = source.stat().st_size
with Image.open(source) as im:
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((640, 760), Image.Resampling.LANCZOS)
    w, h = im.size
    with NamedTemporaryFile(dir=DIST, suffix=".jpg", delete=False) as tmp:
        name = tmp.name
    try:
        im.save(name, format="JPEG", quality=80, optimize=True, progressive=True, subsampling=0)
        after = os.stat(name).st_size
        if after > 180_000 or after >= before:
            raise RuntimeError(f"Optimization insufficient: {after:,} bytes from {before:,}")
        os.replace(name, source)
    finally:
        if os.path.exists(name):
            os.remove(name)

saving = round((1 - after / before) * 100, 1)
print(f"Optimized {source} -> {w}×{h}, {before:,} -> {after:,} bytes ({saving}% less)")
