import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { home } from "../src/pages/home.js";
import { resources } from "../src/pages/resources.js";
import { gallery } from "../src/pages/gallery.js";
import { languages } from "../src/pages/languages.js";
import { research, teams } from "../src/pages/research.js";
import { reports } from "../src/pages/reports.js";
import { layout } from "../src/components/layout.js";
import { enrichProjects } from "../src/lib/portfolio.js";
import { prepareAssets } from "./prepare-assets.mjs";
import { csv } from "./utils.mjs";
import { renderDocuments } from "./render-documents.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "dist");
const readJson = async (path) =>
  JSON.parse(await readFile(join(root, path), "utf8"));
const snapshot = await readJson("assets/sync/public-repositories.json");
const summary = await readJson("assets/sync/account-summary.json");
const evaluation = await readJson(
  "academic-evaluation/dev-team/evaluation.json",
);
if (
  snapshot.repositories.length !== summary.public ||
  snapshot.owner !== summary.owner
)
  throw new Error(
    "Public portfolio snapshot and account summary do not agree. Run npm run sync.",
  );
const projects = enrichProjects(snapshot.repositories);
const context = { projects, snapshot, summary, evaluation };
const pages = new Map([
  ["index.html", home(context)],
  ["docs/index.html", resources(context)],
  ["docs/animation-gallery.html", gallery(context)],
  ["docs/public-language-dashboard.html", languages(context)],
  ["dashboard/index.html", research(context)],
  ["academic-evaluation/dashboard/index.html", teams(context)],
  ["reports/daily/index.html", reports(context)],
]);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const folder of ["assets", "docs", "academic-evaluation", "reports"])
  await cp(join(root, folder), join(output, folder), { recursive: true });
for (const name of [
  "README.md",
  "README-PROFESSIONAL-PORTFOLIO.md",
  "CHANGELOG.md",
  "CHANGELOG-DE.md",
])
  await cp(join(root, name), join(output, name));
await prepareAssets(join(output, "assets"));
await build({
  absWorkingDir: root,
  entryPoints: { site: "src/client/main.js" },
  outdir: join(output, "assets"),
  bundle: true,
  format: "esm",
  minify: true,
  target: ["es2022"],
  legalComments: "none",
});
await build({
  absWorkingDir: root,
  entryPoints: { site: "src/styles/index.css" },
  outdir: join(output, "assets"),
  bundle: true,
  minify: true,
  loader: { ".woff2": "file" },
  assetNames: "fonts/[name]-[hash]",
  legalComments: "none",
});
await cp(
  join(root, "src/styles/fonts/manrope-OFL.txt"),
  join(output, "assets/fonts/manrope-OFL.txt"),
);
await cp(
  join(root, "src/styles/fonts/space-grotesk-OFL.txt"),
  join(output, "assets/fonts/space-grotesk-OFL.txt"),
);

await renderDocuments(output, pages);

pages.set(
  "404.html",
  layout({
    route: "404.html",
    rootOverride: "/Pierreg99-Pierreg99-Profile-Page/",
    title: "Page not found — CRYO",
    description: "Find your way back to the CRYO workspace.",
    content:
      '<div class="container page-content"><header class="page-heading"><p class="eyebrow">404 / OUTSIDE THE WORKSPACE</p><h1>A little off the map.</h1><p class="page-lead">This page could not be found. Return to the workspace to explore the projects and resources.</p></header><a class="button primary" href="/Pierreg99-Pierreg99-Profile-Page/">Back to the workspace →</a></div>',
  }),
);
for (const [route, html] of pages) {
  await mkdir(dirname(join(output, route)), { recursive: true });
  await writeFile(join(output, route), html);
}
await writeFile(
  join(output, "academic-evaluation/dev-team/evaluation.csv"),
  csv([
    ["Team", "Team DE", "Score", "Grade"],
    ...evaluation.teams.map((team) => [
      team.team,
      team.team_de,
      team.score,
      team.note,
    ]),
  ]),
);
await writeFile(join(output, ".nojekyll"), "");
await writeFile(
  join(output, "build-manifest.json"),
  JSON.stringify(
    {
      schemaVersion: 1,
      pages: [...pages.keys()].sort(),
      publicRepositories: projects.length,
      snapshot: snapshot.updatedAt,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Built ${pages.size} static pages with ${projects.length} verified public repositories. Output: dist/`,
);
