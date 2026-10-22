#!/usr/bin/env python3
"""Create a small *local build asset* of the Beihang University seal.

The mark is based on a public reproduction of the university emblem. For the
institution's own visual-identity policy, see:
https://xcb.buaa.edu.cn/info/1032/1631.htm

Download is performed at build time so readers' browsers never contact a
third-party logo host. The actual university emblem is not redrawn or modified
(other than proportional downscaling for website display).
"""
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image

SOURCE = (
    "https://static.wixstatic.com/media/"
    "912e35_da1b2b926e5a48f7bd0cbe6c3495cc3e~mv2.png/"
    "v1/fill/w_1200%2Ch_1200%2Cal_c/"
    "%E5%8C%97%E4%BA%AC%E8%88%AA%E7%A9%BA%E8%88%AA%E5%A4%A9%E5%A4%A7%E5%AD%A6.png"
)
DESTINATION = Path("dist/assets/beihang-university-emblem.png")
MAX_BYTES = 40_000

request = Request(SOURCE, headers={"User-Agent": "Mozilla/5.0 (academic-portfolio-build)"})
with urlopen(request, timeout=25) as response:
    raw = response.read(2_000_000)
with Image.open(BytesIO(raw)) as image:
    image.load()
    if min(image.size) < 450:
        raise ValueError("Retrieved emblem too small")
    image = image.convert("RGB")
    image.thumbnail((168, 168), Image.Resampling.LANCZOS)
    image = image.quantize(colors=64, method=Image.Quantize.MEDIANCUT)

DESTINATION.parent.mkdir(parents=True, exist_ok=True)
image.save(DESTINATION, optimize=True)
length = DESTINATION.stat().st_size
if length > MAX_BYTES:
    raise ValueError(f"Beihang emblem exceeds size budget: {length} bytes")
print(f"Beihang emblem: {image.width}x{image.height}, {length} bytes; locally served")
