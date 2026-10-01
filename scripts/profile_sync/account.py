"""Keep public metadata and private aggregate counts on separate paths."""

from __future__ import annotations

import json
import os
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

OWNER = "Pierreg99"
SOURCE = "https://raw.githubusercontent.com/Pierreg99/progress/main/site/account.json"
PUBLIC_SOURCE = f"https://api.github.com/users/{OWNER}/repos"


def fetch_json(url: str) -> object:
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "CRYO-profile-sync"}
    token = os.environ.get("GITHUB_TOKEN")
    if token and url.startswith("https://api.github.com/"):
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def public_repository(raw: dict) -> dict:
    if raw.get("private") is not False or raw.get("owner", {}).get("login", "").lower() != OWNER.lower():
        raise ValueError("The public inventory contains an unexpected visibility or owner.")
    name = raw["name"]
    if raw.get("html_url") != f"https://github.com/{OWNER}/{name}":
        raise ValueError("The repository URL does not match its public owner/name.")
    return {
        "name": name,
        "url": raw["html_url"],
        "description": raw.get("description") or "",
        "language": raw.get("language"),
        "fork": bool(raw["fork"]),
        "archived": bool(raw["archived"]),
        "stars": int(raw.get("stargazers_count", 0)),
        "topics": raw.get("topics", []),
    }


def fetch_public_repositories() -> list[dict]:
    repositories = []
    page = 1
    while True:
        batch = fetch_json(f"{PUBLIC_SOURCE}?per_page=100&type=owner&page={page}")
        if not isinstance(batch, list):
            raise ValueError("GitHub did not return a public repository list.")
        repositories.extend(public_repository(item) for item in batch)
        if len(batch) < 100:
            break
        page += 1
    return sorted(repositories, key=lambda repo: repo["name"].lower())


def save_snapshot(path: Path, payload: dict, timestamp_key: str) -> bool:
    previous = json.loads(path.read_text()) if path.exists() else {}
    comparable = {key: value for key, value in previous.items() if key != timestamp_key}
    if comparable == payload:
        return False
    payload = {**payload, timestamp_key: datetime.now(timezone.utc).isoformat(timespec="seconds")}
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(".tmp")
    temporary.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    temporary.replace(path)
    return True


def update_readme(text: str, summary: dict) -> str:
    import re

    text = re.sub(r"Public%20inventory-\d+-111827", f"Public%20inventory-{summary['public']}-111827", text)
    text = re.sub(r"Account%20sync-\d+%20repos-111827", f"Account%20sync-{summary['total']}%20repos-111827", text)
    pattern = r"<!-- inventory:start -->.*?<!-- inventory:end -->"
    inventory = (
        "<!-- inventory:start -->\n"
        f"The synchronized inventory contains **{summary['public']} public repositories**. "
        f"The account summary records **{summary['total']} repositories** "
        f"(**{summary['private']} private**); private names are never published. "
        "The public list comes from GitHub's public user API; the private count is a preserved aggregate from the progress hub.\n"
        "<!-- inventory:end -->"
    )
    return re.sub(pattern, lambda _: inventory, text, flags=re.DOTALL)
