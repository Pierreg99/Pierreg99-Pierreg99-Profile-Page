#!/usr/bin/env python3
"""Refresh the verified public portfolio without publishing private names."""

from pathlib import Path

from profile_sync.account import (
    OWNER, PUBLIC_SOURCE, SOURCE, fetch_json, fetch_public_repositories,
    save_snapshot, update_readme,
)

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    account = fetch_json(SOURCE)
    if account.get("owner") != OWNER or account.get("privateNamesPublished") is not False:
        raise ValueError("Unexpected account owner or publication policy.")
    private_count = account["private"]
    if not isinstance(private_count, int) or isinstance(private_count, bool) or private_count < 0:
        raise ValueError("Invalid private aggregate count.")
    repositories = fetch_public_repositories()
    summary = {
        "schemaVersion": 1,
        "source": SOURCE,
        "owner": OWNER,
        "total": len(repositories) + private_count,
        "public": len(repositories),
        "private": private_count,
        "privateNamesPublished": False,
        "completeAccountSync": account.get("completeAccountSync", False),
    }
    save_snapshot(ROOT / "assets/sync/account-summary.json", summary, "syncedAt")
    save_snapshot(ROOT / "assets/sync/public-repositories.json", {
        "schemaVersion": 1,
        "owner": OWNER,
        "source": PUBLIC_SOURCE,
        "repositories": repositories,
    }, "updatedAt")
    readme = ROOT / "README.md"
    text = readme.read_text(encoding="utf-8")
    updated = update_readme(text, summary)
    if text != updated:
        readme.write_text(updated, encoding="utf-8")
    print(f"Public portfolio synchronized: {len(repositories)} repositories.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
