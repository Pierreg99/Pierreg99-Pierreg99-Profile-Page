#!/usr/bin/env python3
"""Validate rendered HTML, Markdown, CSS, responsive media, and directory routes."""

from __future__ import annotations

import argparse
import html
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

REPOSITORY = Path(__file__).resolve().parents[1]
TEXT_SUFFIXES = {".md", ".html", ".htm", ".css", ".svg"}
IGNORED_PARTS = {".git", "node_modules", ".cache", "test-results", "playwright-report", "__pycache__"}
MD_RE = re.compile(r"!?\[[^\]]*\]\(([^)\s]+)(?:\s+['\"][^'\"]*['\"])?\)")
CSS_RE = re.compile(r"url\(\s*['\"]?([^)'\"]+)['\"]?\s*\)", re.IGNORECASE)


class References(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.references = []

    def handle_starttag(self, _tag, attrs):
        for key, value in attrs:
            if not value:
                continue
            if key in {"href", "src", "poster", "data-source"}:
                self.references.append(value)
            elif key == "srcset" and not value.startswith("data:"):
                self.references.extend(part.strip().split()[0] for part in value.split(",") if part.strip())


def local_target(source: Path, raw: str, root: Path, base: str = "") -> Path | None:
    value = html.unescape(raw).strip()
    if not value or value.startswith("#"):
        return None
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return None
    path = unquote(parsed.path)
    if base and (path == base or path.startswith(base + "/")):
        path = path[len(base):] or "/"
    return root / path.lstrip("/") if path.startswith("/") else source.parent / path


def validate(root: Path, base: str = "") -> tuple[int, list[str]]:
    checked = 0
    failures = []
    root = root.resolve()
    for source in sorted(root.rglob("*")):
        if not source.is_file() or source.suffix.lower() not in TEXT_SUFFIXES:
            continue
        parts = source.relative_to(root).parts
        if any(part in IGNORED_PARTS or (part == "dist" and root == REPOSITORY) for part in parts):
            continue
        text = source.read_text(encoding="utf-8")
        parser = References()
        if source.suffix != ".css":
            parser.feed(text)
        references = parser.references
        if source.suffix == ".md":
            # Code fences contain examples rather than authored links.
            references += MD_RE.findall(re.sub(r"```.*?```", "", text, flags=re.DOTALL))
        if source.suffix in {".css", ".svg"}:
            references += CSS_RE.findall(text)
        for raw in references:
            target = local_target(source, raw, root, base)
            if target is None:
                continue
            checked += 1
            try:
                target.resolve().relative_to(root)
            except ValueError:
                failures.append(f"{source.relative_to(root)} -> outside artifact: {raw}")
                continue
            if not target.exists():
                failures.append(f"{source.relative_to(root)} -> missing: {raw}")
            elif target.is_dir() and root != REPOSITORY and not (target / "index.html").exists():
                failures.append(f"{source.relative_to(root)} -> directory has no index.html: {raw}")
    return checked, failures


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=REPOSITORY / "dist")
    parser.add_argument("--base", default="/Pierreg99-Pierreg99-Profile-Page")
    args = parser.parse_args()
    if not args.root.is_dir():
        parser.error("Build the site with npm run build before validating links.")
    checked, failures = validate(args.root, args.base.rstrip("/"))
    print(f"Validated {checked} local presentation references.")
    if failures:
        print("\n".join(f"- {failure}" for failure in failures))
        return 1
    print("All local pages, assets, responsive media, and font references resolve.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
