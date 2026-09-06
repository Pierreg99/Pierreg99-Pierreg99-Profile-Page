#!/usr/bin/env python3
"""Validate repository-local Markdown and HTML asset references."""

from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEXT_SUFFIXES = {".md", ".html", ".htm"}
IGNORED_SCHEMES = ("http://", "https://", "mailto:", "#", "data:")

MD_RE = re.compile(r"!?(?:\[[^\]]*\])\(([^)\s]+)(?:\s+['\"][^'\"]*['\"])?\)")
HTML_RE = re.compile(r"(?:href|src)=[\"']([^\"']+)[\"']", re.IGNORECASE)


def candidates() -> list[Path]:
    return [
        p for p in ROOT.rglob("*")
        if p.is_file() and p.suffix.lower() in TEXT_SUFFIXES and ".git" not in p.parts
    ]


def local_target(source: Path, raw: str) -> Path | None:
    target = html.unescape(raw).split("#", 1)[0].split("?", 1)[0].strip()
    if not target or target.startswith(IGNORED_SCHEMES):
        return None
    if target.startswith("/"):
        # Treat root-relative paths as repository-root paths when possible.
        return ROOT / target.lstrip("/")
    return source.parent / target


def main() -> int:
    failures: list[str] = []
    checked = 0

    for source in candidates():
        text = source.read_text(encoding="utf-8", errors="strict")
        references = MD_RE.findall(text) + HTML_RE.findall(text)
        for raw in references:
            target = local_target(source, raw)
            if target is None:
                continue
            checked += 1
            try:
                target.resolve().relative_to(ROOT.resolve())
            except ValueError:
                failures.append(f"{source.relative_to(ROOT)} -> outside repository: {raw}")
                continue
            if not target.exists():
                failures.append(f"{source.relative_to(ROOT)} -> missing: {raw}")

    print(f"Validated {checked} local Markdown/HTML references.")
    if failures:
        print("Broken references:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("All local presentation references resolve.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
