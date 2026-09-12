#!/usr/bin/env python3
"""Pull the public account summary from progress into the profile repository."""
from __future__ import annotations

import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
README = ROOT / "README.md"
SUMMARY = ROOT / "assets" / "sync" / "account-summary.json"
SOURCE = "https://raw.githubusercontent.com/Pierreg99/progress/main/site/account.json"


def main() -> int:
    with urllib.request.urlopen(SOURCE, timeout=20) as response:
        data = json.loads(response.read().decode("utf-8"))

    public_count = int(data["public"])
    total = int(data["total"])
    private_count = int(data["private"])
    summary = {
        "schemaVersion": 1,
        "source": SOURCE,
        "syncedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "owner": data.get("owner", "Pierreg99"),
        "total": total,
        "public": public_count,
        "private": private_count,
        "privateNamesPublished": False,
    }
    SUMMARY.parent.mkdir(parents=True, exist_ok=True)
    SUMMARY.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    text = README.read_text(encoding="utf-8")
    text = re.sub(r"Public%20inventory-\d+-111827", f"Public%20inventory-{public_count}-111827", text, count=1)
    text = re.sub(r"Account%20sync-\d+%20repos-111827", f"Account%20sync-{total}%20repos-111827", text, count=1)
    README.write_text(text, encoding="utf-8")
    print(f"profile sync public={public_count} total={total} private={private_count}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
