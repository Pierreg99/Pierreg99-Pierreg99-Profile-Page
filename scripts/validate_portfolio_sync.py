#!/usr/bin/env python3
"""Validate the published public inventory and summary without network dependence."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from profile_sync.account import OWNER, SOURCE, PUBLIC_SOURCE, fetch_json

ROOT = Path(__file__).resolve().parents[1]


def validate(summary: dict, snapshot: dict, readme: str) -> list[str]:
    failures = []
    if summary.get("owner") != OWNER or snapshot.get("owner") != OWNER:
        failures.append("Unexpected portfolio owner.")
    if summary.get("privateNamesPublished") is not False:
        failures.append("Private-name publication must remain disabled.")
    if summary.get("source") != SOURCE or snapshot.get("source") != PUBLIC_SOURCE:
        failures.append("Unexpected data source.")
    repositories = snapshot.get("repositories", [])
    counts = [summary.get(key) for key in ("public", "private", "total")]
    if any(type(value) is not int or value < 0 for value in counts):
        failures.append("Inventory counts must be nonnegative integers.")
    elif summary["public"] != len(repositories) or summary["total"] != summary["public"] + summary["private"]:
        failures.append("Public inventory and account summary counts do not agree.")
    if len({repo.get("name", "").lower() for repo in repositories}) != len(repositories):
        failures.append("Duplicate public repository names.")
    expected_keys = {"name", "url", "description", "language", "fork", "archived", "stars", "topics"}
    for repo in repositories:
        if set(repo) != expected_keys or repo.get("url") != f"https://github.com/{OWNER}/{repo.get('name')}":
            failures.append("Unexpected public repository schema or URL.")
            continue
        if type(repo["fork"]) is not bool or type(repo["archived"]) is not bool or (repo["language"] is not None and not isinstance(repo["language"], str)):
            failures.append("Invalid repository metadata types.")
    for badge in (f"Public%20inventory-{summary.get('public')}-111827", f"Account%20sync-{summary.get('total')}%20repos-111827"):
        if badge not in readme:
            failures.append("README inventory badges are out of sync.")
    for required in ("https://github.com/Pierreg99/progress", "assets/cryo-header.svg", "<!-- inventory:start -->"):
        if required not in readme:
            failures.append(f"README is missing {required}.")
    return failures


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--offline", action="store_true", help="Default: validate local snapshots only.")
    mode.add_argument("--online", action="store_true", help="Also verify the progress endpoint is reachable.")
    args = parser.parse_args()
    summary = json.loads((ROOT / "assets/sync/account-summary.json").read_text())
    snapshot = json.loads((ROOT / "assets/sync/public-repositories.json").read_text())
    failures = validate(summary, snapshot, (ROOT / "README.md").read_text())
    for asset in ("assets/cryo-header.svg", "assets/cryo-mark.svg", "assets/animations/cryo-pulse.gif", "assets/animations/cryo-orbit.gif"):
        if not (ROOT / asset).is_file():
            failures.append(f"Missing canonical asset: {asset}.")
    if args.online:
        account = fetch_json(SOURCE)
        if account.get("owner") != OWNER:
            failures.append("Unexpected progress endpoint owner.")
    if failures:
        print("\n".join(f"SYNC FAIL: {failure}" for failure in failures))
        return 1
    print(f"SYNC OK: {len(snapshot['repositories'])} public repositories; consistent badges, counts, and sources.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
