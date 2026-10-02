import copy
import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from profile_sync.account import public_repository, save_snapshot, update_readme, fetch_public_repositories
from validate_portfolio_sync import validate


def repository(name="demo"):
    return {"name": name, "private": False, "owner": {"login": "Pierreg99"}, "html_url": f"https://github.com/Pierreg99/{name}", "language": None, "fork": False, "archived": False, "description": None, "stargazers_count": 1, "topics": ["demo"], "secret_extra": "not-published"}


class PublicSyncTests(unittest.TestCase):
    def test_public_fields_are_whitelisted(self):
        item = public_repository(repository())
        self.assertNotIn("secret_extra", item)
        self.assertEqual(item["description"], "")
        self.assertIsNone(item["language"])

    def test_private_or_unverified_visibility_is_rejected(self):
        for private in (True, None, 0):
            data = repository()
            data["private"] = private
            with self.assertRaises(ValueError):
                public_repository(data)

    def test_owner_and_url_must_match(self):
        data = repository()
        data["owner"]["login"] = "other"
        with self.assertRaises(ValueError): public_repository(data)
        data = repository()
        data["html_url"] = "https://example.org/demo"
        with self.assertRaises(ValueError): public_repository(data)

    def test_pagination_fetches_every_public_page(self):
        batches = [[repository(f"repo-{index:03d}") for index in range(100)], [repository("last")]]
        with patch("profile_sync.account.fetch_json", side_effect=batches) as fetch:
            items = fetch_public_repositories()
        self.assertEqual(len(items), 101)
        self.assertEqual(fetch.call_count, 2)

    def test_unchanged_content_does_not_rewrite_timestamp(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "snapshot.json"
            self.assertTrue(save_snapshot(path, {"public": 2}, "syncedAt"))
            original = path.read_bytes()
            self.assertFalse(save_snapshot(path, {"public": 2}, "syncedAt"))
            self.assertEqual(path.read_bytes(), original)
            self.assertTrue(save_snapshot(path, {"public": 3}, "syncedAt"))

    def test_badges_and_inventory_prose_share_the_same_counts(self):
        text = "Public%20inventory-1-111827 Account%20sync-2%20repos-111827\n<!-- inventory:start -->old<!-- inventory:end -->"
        result = update_readme(text, {"public": 7, "private": 3, "total": 10})
        self.assertIn("Public%20inventory-7-111827", result)
        self.assertIn("Account%20sync-10%20repos-111827", result)
        self.assertIn("**7 public repositories**", result)
        self.assertIn("**3 private**", result)

    def test_actual_snapshot_passes_offline_validation(self):
        summary = json.loads((ROOT / "assets/sync/account-summary.json").read_text())
        snapshot = json.loads((ROOT / "assets/sync/public-repositories.json").read_text())
        readme = (ROOT / "README.md").read_text()
        self.assertEqual(validate(summary, snapshot, readme), [])
        invalid = copy.deepcopy(snapshot)
        invalid["repositories"].append(invalid["repositories"][0])
        self.assertTrue(validate(summary, invalid, readme))


spec = importlib.util.spec_from_file_location("local_links", ROOT / "scripts/validate-local-links.py")
links = importlib.util.module_from_spec(spec)
spec.loader.exec_module(links)


class LinkValidationTests(unittest.TestCase):
    def test_srcset_media_css_and_directory_routes_are_checked(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "index.html").write_text('<source srcset="small.webp 480w, missing.webp 960w"><video data-source="loop.mp4"></video><a href="docs/">Docs</a>')
            (root / "small.webp").touch()
            (root / "loop.mp4").touch()
            (root / "docs").mkdir()
            (root / "site.css").write_text('@font-face{src:url("missing.woff2")}')
            checked, failures = links.validate(root)
            self.assertEqual(checked, 5)
            self.assertEqual(len(failures), 3)
            self.assertTrue(any("index.html" in error for error in failures))

    def test_subpath_percent_encoding_and_external_urls(self):
        root = Path('/tmp/fixture')
        source = root / 'docs/index.html'
        self.assertEqual(links.local_target(source, '/portfolio/image%20one.webp?x=1#top', root, '/portfolio'), root / 'image one.webp')
        for value in ('https://example.org', 'mailto:hello@example.org', '//example.org/asset', '#heading', 'data:image/svg+xml;base64,AA'):
            self.assertIsNone(links.local_target(source, value, root))

    def test_paths_cannot_escape_the_artifact(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "index.html").write_text('<a href="../outside.html">Outside</a>')
            _, failures = links.validate(root)
            self.assertIn("outside artifact", failures[0])


if __name__ == '__main__':
    unittest.main()
