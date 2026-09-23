#!/usr/bin/env python3
"""Fetch hiragana stroke paths from KanjiVG and emit stroke-data.js.

Usage:  python3 tools/build_strokes.py
Output: stroke-data.js  (window.KANA_STROKES)
"""

import json
import re
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

RAW = "https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/{}.svg"
API_COMMIT = "https://api.github.com/repos/KanjiVG/kanjivg/commits/master"

SEION = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
DAKUTEN = "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ"
SMALL = "ゃゅょっ"
CHARS = SEION + DAKUTEN + SMALL

PATH_RE = re.compile(r'<path id="kvg:([0-9a-f]+)-s(\d+)"[^>]*\sd="([^"]+)"')
NUM_RE = re.compile(r'<text transform="matrix\(1 0 0 1 ([\d.-]+) ([\d.-]+)\)">(\d+)</text>')


def fetch(ch):
    cp = "%05x" % ord(ch)
    with urllib.request.urlopen(RAW.format(cp), timeout=20) as r:
        svg = r.read().decode("utf-8")
    strokes = [(int(n), d) for cph, n, d in PATH_RE.findall(svg) if cph == cp]
    strokes.sort()
    nums = [(int(n), round(float(x), 1), round(float(y), 1)) for x, y, n in NUM_RE.findall(svg)]
    nums.sort()
    if not strokes:
        raise RuntimeError("no strokes found for %s (%s)" % (ch, cp))
    if len(nums) != len(strokes):
        nums = [(i + 1, 0.0, 0.0) for i in range(len(strokes))]
    return ch, {"s": [d for _, d in strokes], "n": [[x, y] for _, x, y in nums]}


def main():
    root = Path(__file__).resolve().parent.parent
    try:
        with urllib.request.urlopen(API_COMMIT, timeout=20) as r:
            sha = json.load(r)["sha"][:12]
    except Exception:
        sha = "unknown"

    data = {}
    errors = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        for ch, result in zip(CHARS, pool.map(lambda c: _safe(fetch, c), CHARS)):
            if isinstance(result, Exception):
                errors.append("%s: %s" % (ch, result))
            else:
                data[result[0]] = result[1]

    if errors:
        print("FAILED:\n  " + "\n  ".join(errors), file=sys.stderr)
        return 1

    body = ",".join(
        '"%s":{"s":%s,"n":%s}' % (ch, json.dumps(data[ch]["s"]), json.dumps(data[ch]["n"]))
        for ch in CHARS
    )
    out = root / "stroke-data.js"
    out.write_text(
        "/*!\n"
        " * Hiragana stroke path data derived from KanjiVG (commit %s).\n"
        " * KanjiVG is copyright (c) 2009-2025 Ulrich Apel and released under the\n"
        " * Creative Commons Attribution-Share Alike 3.0 licence.\n"
        " * https://kanjivg.tagaini.net  |  https://creativecommons.org/licenses/by-sa/3.0/\n"
        " * This derived file is distributed under the same CC BY-SA 3.0 licence.\n"
        " */\n"
        "window.KANA_STROKES={%s};\n" % (sha, body),
        encoding="utf-8",
    )
    print("wrote %s (%d chars, %.1f KB)" % (out.name, len(data), out.stat().st_size / 1024))
    return 0


def _safe(fn, arg):
    for _ in range(3):
        try:
            return fn(arg)
        except Exception as e:
            err = e
    return err


if __name__ == "__main__":
    sys.exit(main())
