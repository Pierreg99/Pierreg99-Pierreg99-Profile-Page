#!/usr/bin/env python3
"""Validate the profile README/asset layer against the public progress hub."""
from __future__ import annotations

import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
REQUIRED = (
    "https://github.com/Pierreg99/progress",
    "account-sync-2026-09-12.md",
    "assets/cryo-header.svg",
    "assets/animations/cryo-pulse.gif",
)


def main() -> int:
    text = README.read_text(encoding="utf-8")
    missing = [value for value in REQUIRED if value not in text]
    for asset in ("assets/cryo-header.svg", "assets/animations/cryo-pulse.gif", "assets/animations/cryo-orbit.gif"):
        if not (ROOT / asset).is_file():
            missing.append(asset)
    if missing:
        print("SYNC FAIL")
        for item in missing:
            print(f"- {item}")
        return 1

    url = "https://raw.githubusercontent.com/Pierreg99/progress/main/site/account.json"
    try:
        with urllib.request.urlopen(url, timeout=20) as response:
            remote = response.read().decode("utf-8")
    except Exception as exc:
        print(f"SYNC FAIL — progress account endpoint unavailable: {exc}")
        return 2

    for key in ("owner", "total", "public", "private", "repositories"):
        if f'"{key}"' not in remote:
            print(f"SYNC FAIL — account.json missing key: {key}")
            return 1

    if not re.search(r"Public%20inventory-\d+-111827", text):
        print("SYNC FAIL — public inventory badge not found")
        return 1
    if not re.search(r"Account%20sync-\d+%20repos-111827", text):
        print("SYNC FAIL — account sync badge not found")
        return 1

    print("SYNC OK — README links, local presentation assets, badges, and progress account endpoint are present.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
