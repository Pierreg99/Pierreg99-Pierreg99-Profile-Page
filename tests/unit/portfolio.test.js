import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  enrichProjects,
  languageDistribution,
  matchesProject,
} from "../../src/lib/portfolio.js";
import { escapeHtml, relativeRoot } from "../../src/lib/html.js";
import { grade } from "../../src/data/benchmark.js";
import { csv } from "../../scripts/utils.mjs";

const snapshot = JSON.parse(
  await readFile(
    new URL("../../assets/sync/public-repositories.json", import.meta.url),
  ),
);

test("featured projects come from the public snapshot, without synthetic entries", () => {
  const projects = enrichProjects(snapshot.repositories);
  assert.equal(projects.length, snapshot.repositories.length);
  const names = new Set(snapshot.repositories.map((repo) => repo.name));
  assert.ok(projects.every((project) => names.has(project.name)));
  assert.ok(
    projects
      .filter((project) => project.featured)
      .every((project) => !project.fork),
  );
  assert.deepEqual(enrichProjects([]), []);
});

test("forks retain useful public descriptions and remain searchable by purpose", () => {
  const [project] = enrichProjects([
    {
      name: "Example-OMEGA-FORK",
      fork: true,
      description: "An accessible download manager",
      language: "TypeScript",
    },
  ]);
  assert.equal(project.description, "An accessible download manager");
  assert.equal(project.descriptionDe, project.description);
  assert.equal(project.fork, true);
  assert.equal(
    matchesProject(project, { query: "download manager", scope: "forks" }),
    true,
  );
});

test("language shares exclude forks and retain missing language metadata", () => {
  const data = [
    { language: "TypeScript", fork: false },
    { language: null, fork: false },
    { language: "Java", fork: true },
  ];
  assert.deepEqual(languageDistribution(data), [
    { language: "TypeScript", count: 1, share: 50 },
    { language: "Unreported", count: 1, share: 50 },
  ]);
  assert.equal(
    languageDistribution(data, false).reduce(
      (sum, item) => sum + item.count,
      0,
    ),
    3,
  );
  assert.deepEqual(languageDistribution([]), []);
});

test("current language counts reconcile with the original inventory", () => {
  const distribution = languageDistribution(snapshot.repositories);
  assert.equal(
    distribution.reduce((sum, item) => sum + item.count, 0),
    snapshot.repositories.filter((repo) => !repo.fork).length,
  );
  assert.ok(
    Math.abs(distribution.reduce((sum, item) => sum + item.share, 0) - 100) <
      0.000001,
  );
});

test("search composes with domain, language, and original/fork scope", () => {
  const project = {
    title: "KiBlox",
    name: "KiBlox-VoxelGame",
    description: "A voxel world",
    descriptionDe: "Eine Voxelwelt",
    tags: ["Three.js"],
    language: "TypeScript",
    domain: "games",
    fork: false,
  };
  assert.equal(
    matchesProject(project, {
      query: "  VOXEL  three ",
      domain: "games",
      language: "TypeScript",
      scope: "originals",
    }),
    true,
  );
  for (const state of [
    { query: "memory" },
    { domain: "ai" },
    { language: "HTML" },
    { scope: "forks" },
  ])
    assert.equal(matchesProject(project, state), false);
  assert.equal(matchesProject(project, { query: "Voxelwelt" }), true);
  assert.equal(
    matchesProject(
      { language: null, fork: true },
      { language: "Unreported", scope: "forks" },
    ),
    true,
  );
});

test("HTML helper escapes attribute delimiters and markup", () => {
  assert.equal(
    escapeHtml("<a title=\"R&D\">'x'</a>"),
    "&lt;a title=&quot;R&amp;D&quot;&gt;&#39;x&#39;&lt;/a&gt;",
  );
  assert.equal(escapeHtml(null), "null");
});

test("route-relative resources support the Pages project subpath", () => {
  assert.equal(relativeRoot("index.html"), "./");
  assert.equal(relativeRoot("docs/animation-gallery.html"), "../");
  assert.equal(
    relativeRoot("academic-evaluation/dashboard/index.html"),
    "../../",
  );
});

test("historical grade boundaries stay consistent with the exported study", () => {
  for (const [score, note] of [
    [100, "1.0"],
    [90, "1.0"],
    [89.9, "2.0"],
    [80, "2.0"],
    [79, "3.0"],
    [65, "3.0"],
    [64, "4.0"],
    [50, "4.0"],
    [49, "5.0"],
  ])
    assert.equal(grade(score).note, note);
});

test("CSV preserves quotes, delimiters, newlines, and inert text cells", () => {
  assert.equal(
    csv([
      ["A,B", 'a"b', "line\nnext"],
      ["=SUM(A1:A2)", 92, "+value"],
    ]),
    '"A,B","a""b","line\nnext"\r\n"\'=SUM(A1:A2)","92","\'+value"\r\n',
  );
});
