<div align="center">

# CRYO / Pierreg99

<p><strong>Zweisprachiges Portfolio mit Browser-Spielen, Interface-Experimenten und AI-Visualisierungen.</strong></p>
<p>
<img alt="JavaScript: 70%" src="https://img.shields.io/badge/JavaScript-70%25-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img alt="CSS: 21%" src="https://img.shields.io/badge/CSS-21%25-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img alt="Python: 10%" src="https://img.shields.io/badge/Python-10%25-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img alt="Sichtbarkeit: Öffentlich" src="https://img.shields.io/badge/Sichtbarkeit-%C3%96ffentlich-0B7285?style=for-the-badge">
</p>
<p>
<a href="https://github.com/Pierreg99/Pierreg99-Pierreg99-Profile-Page/actions/workflows/deploy-pages.yml"><img alt="deploy-pages.yml" src="https://github.com/Pierreg99/Pierreg99-Pierreg99-Profile-Page/actions/workflows/deploy-pages.yml/badge.svg"></a>
<a href="https://github.com/Pierreg99/Pierreg99-Pierreg99-Profile-Page/actions/workflows/profile-sync.yml"><img alt="profile-sync.yml" src="https://github.com/Pierreg99/Pierreg99-Pierreg99-Profile-Page/actions/workflows/profile-sync.yml/badge.svg"></a>
</p>
<p><a href="#schnellstart">Schnellstart</a> · <a href="#projektstruktur">Projektstruktur</a> · <a href="#english-summary">English</a></p>
</div>

---

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#features)
- [Schnellstart](#schnellstart)
- [Architektur](#architektur)
- [Projektstruktur](#projektstruktur)
- [Dokumentation](#dokumentation)
- [Projektdetails](#projektdetails)
- [English summary](#english-summary)

## Überblick

Zweisprachiges Portfolio mit Browser-Spielen, Interface-Experimenten und AI-Visualisierungen.

| Merkmal | Wert |
| --- | --- |
| Sprachen | JavaScript (70%), CSS (21%), Python (10%) |
| Dateien im Repository | 175 |
| Version (`package.json`) | 2.0.0 |
| CI-Workflows | 2 |

## Features

- End-to-End-Tests mit Playwright
- Linting mit ESLint
- Lokale Speicherung im Browser (localStorage)
- Kommandozeilen-Interface (argparse)
- Automatisierung über GitHub Actions: `deploy-pages.yml`, `profile-sync.yml`
- Veröffentlichung über GitHub Pages
- 4 Testdateien im Repository
- 14 SVG-Grafiken
- 52 Markdown-Dokumente

## Schnellstart

```bash
git clone https://github.com/Pierreg99/Pierreg99-Pierreg99-Profile-Page.git
cd Pierreg99-Pierreg99-Profile-Page
```

**Node.js**

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
npm run lint
npm run check
```

<details>
<summary>Alle Skripte aus <code>package.json</code></summary>

| Skript | Befehl |
| --- | --- |
| `dev` | `node scripts/dev.mjs` |
| `build` | `node scripts/build.mjs` |
| `preview` | `node scripts/serve.mjs` |
| `assets` | `node scripts/prepare-assets.mjs` |
| `sync` | `python3 scripts/sync_profile_assets.py` |
| `lint` | `eslint . && prettier --check src scripts/*.mjs tests package.json eslint.config.js play...` |
| `format` | `prettier --write src scripts/*.mjs tests package.json eslint.config.js playwright.confi...` |
| `test` | `node --test tests/unit/*.test.js && python3 -m unittest discover -s tests/python` |
| `test:browser` | `playwright test` |
| `validate` | `python3 scripts/validate-local-links.py --root . && python3 scripts/validate-local-link...` |
| `check` | `npm run lint && npm test && npm run build && npm run validate` |

</details>

## Architektur

Übersicht der wichtigsten Verzeichnisse nach Anzahl der enthaltenen Dateien.

```mermaid
flowchart LR
    R(["Pierreg99-Pierreg99-Profile-Page"])
    R --> D0["assets/<br/>54 Dateien"]
    R --> D1["docs/<br/>35 Dateien"]
    R --> D2["src/<br/>34 Dateien"]
    R --> D3["academic-evaluation/<br/>13 Dateien"]
    R --> D4["scripts/<br/>11 Dateien"]
    R --> D5["reports/<br/>10 Dateien"]
    R --> D6["tests/<br/>4 Dateien"]
    CI[["GitHub Actions<br/>2 Workflows"]] -.-> R
```

## Projektstruktur

```text
Pierreg99-Pierreg99-Profile-Page/
├── .github/  (3 Dateien)
│   ├── workflows/
│   └── pull_request_template.md
├── academic-evaluation/  (13 Dateien)
│   ├── dev-team/
│   └── task-time-progress/
├── assets/  (54 Dateien)
│   ├── animations/
│   ├── flagships/
│   ├── projects/
│   ├── selected-work/
│   ├── sync/
│   ├── ASSET-CATALOG.md
│   └── … (20 weitere)
├── docs/  (35 Dateien)
│   ├── de/
│   ├── en/
│   ├── previews/
│   └── README.md
├── reports/  (10 Dateien)
│   ├── daily/
│   └── raud/
├── scripts/  (11 Dateien)
│   ├── profile_sync/
│   ├── build.mjs
│   ├── dev.mjs
│   ├── prepare-assets.mjs
│   ├── render-documents.mjs
│   ├── serve.mjs
│   └── … (4 weitere)
├── src/  (34 Dateien)
│   ├── client/
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── tests/  (4 Dateien)
│   ├── browser/
│   ├── python/
│   └── unit/
├── .gitignore
├── CHANGELOG-DE.md
├── CHANGELOG.md
├── eslint.config.js
├── package-lock.json
├── package.json
├── playwright.config.js
├── README-PROFESSIONAL-PORTFOLIO.md
└── README.md
```

## Dokumentation

- [CHANGELOG-DE.md](CHANGELOG-DE.md)
- [CHANGELOG.md](CHANGELOG.md)
- [README-PROFESSIONAL-PORTFOLIO.md](README-PROFESSIONAL-PORTFOLIO.md)
- [docs/README.md](docs/README.md)

## Projektdetails

Der folgende Abschnitt übernimmt die bisherige Projektdokumentation.

<div align="center">

<img src="./assets/cryo-header.svg" alt="CRYO / Pierreg99 — Ideas into code. Code into experiences." width="100%" />

A bilingual portfolio of browser games, interface experiments, and AI visualizations — built to explore, with direct links to every project's source.

[![GitHub](https://img.shields.io/badge/GitHub-Pierreg99-080e16?style=for-the-badge&logo=github)](https://github.com/Pierreg99)
[![Portfolio](https://img.shields.io/badge/Portfolio-Explore-91e5f7?style=for-the-badge)](https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/)
[![Public inventory](https://img.shields.io/badge/Public%20inventory-76-111827?style=for-the-badge)](https://github.com/Pierreg99?tab=repositories)
[![Account sync](https://img.shields.io/badge/Account%20sync-135%20repos-111827?style=for-the-badge)](https://github.com/Pierreg99/progress)

[Open the portfolio →](https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/) · [Resources](./docs/) · [Public data](./assets/sync/public-repositories.json)

</div>

## Selected work

| Resident Lovely | KiBlox |
| --- | --- |
| [![Resident Lovely — Sweet Château portfolio cover](assets/selected-work/resident-lovely.jpg)](https://pierreg99.github.io/ResidentLovely-Maximum-Hapiness-Game/) | [![KiBlox — voxel forest portfolio cover](assets/selected-work/kiblox.jpg)](https://pierreg99.github.io/KiBlox-VoxelGame/) |
| Explore the Sweet Château in a pastel 3D adventure. Meet companions, complete quests, and experiment with crafting across connected destinations. | Build your own voxel world, take flight, and explore five themed realms. Campaign, creative, and free-play modes combine construction with Ki combat. |
| [Play](https://pierreg99.github.io/ResidentLovely-Maximum-Hapiness-Game/) · [Source](https://github.com/Pierreg99/ResidentLovely-Maximum-Hapiness-Game) | [Play](https://pierreg99.github.io/KiBlox-VoxelGame/) · [Source](https://github.com/Pierreg99/KiBlox-VoxelGame) |
| **cryOS** | **CryAIPulse** |
| [![cryOS — desktop interface portfolio cover](assets/selected-work/cryos.jpg)](https://pierreg99.github.io/cryos-launcher/) | [![CryAIPulse — neural connections and heartbeat portfolio cover](assets/selected-work/cryaipulse.jpg)](https://pierreg99.github.io/CryAIPulse/) |
| Switch between a phone launcher and Linux-inspired desktops in your browser. Explore app windows, themes, and gesture navigation in an interactive interface simulation. | Explore an agent mesh through glowing neural connections and heartbeat traces. An interactive playground presents illustrative activity in a distinctive cyan-and-rose interface. |
| [Explore](https://pierreg99.github.io/cryos-launcher/) · [Source](https://github.com/Pierreg99/cryos-launcher) | [Explore](https://pierreg99.github.io/CryAIPulse/) · [Source](https://github.com/Pierreg99/CryAIPulse) |

The four selected-work covers are edited from each project's own visuals. Their composition, lighting, and detail are refined for portfolio cards; they are labeled **Portfolio cover** on the website. [Cover sources and editing notes](assets/selected-work/README.md) describe the changes. The explorer and gallery retain the original screenshots and repository artwork.

## Project collection

| Project | Focus | Open |
| --- | --- | --- |
| **Resident Lovely** | Three.js · Adventure · WebGL | [Play](https://pierreg99.github.io/ResidentLovely-Maximum-Hapiness-Game/) · [Source](https://github.com/Pierreg99/ResidentLovely-Maximum-Hapiness-Game) |
| **KiBlox** | TypeScript · Three.js · Voxels | [Play](https://pierreg99.github.io/KiBlox-VoxelGame/) · [Source](https://github.com/Pierreg99/KiBlox-VoxelGame) |
| **cryOS** | TypeScript · Desktop UI · Simulation | [Explore](https://pierreg99.github.io/cryos-launcher/) · [Source](https://github.com/Pierreg99/cryos-launcher) |
| **CryAIPulse** | JavaScript · Canvas · Visualization | [Explore](https://pierreg99.github.io/CryAIPulse/) · [Source](https://github.com/Pierreg99/CryAIPulse) |
| **Cryoplane** | TypeScript · Flight · Three.js | [Play](https://pierreg99.github.io/Cryoplane-Polygonal-Flight/) · [Source](https://github.com/Pierreg99/Cryoplane-Polygonal-Flight) |
| **Cyberdash** | JavaScript · Rhythm · Level editor | [Play](https://pierreg99.github.io/Cyberdash-Rhythm-Platformer-GAME/) · [Source](https://github.com/Pierreg99/Cyberdash-Rhythm-Platformer-GAME) |
| **Call of Groky** | TypeScript · Three.js · FPS | [Play](https://pierreg99.github.io/call-of-groky/) · [Source](https://github.com/Pierreg99/call-of-groky) |
| **Call of Shooty** | Three.js · Cannon-es · FPS | [Source](https://github.com/Pierreg99/futuristic-call-of-shooty) |
| **AI for Everyone** | Learning · DE / EN · Interactive docs | [Explore](https://pierreg99.github.io/AI-FOR-Everyone-Learn-Docs/en/) · [Source](https://github.com/Pierreg99/AI-FOR-Everyone-Learn-Docs) |
| **Command Wiki** | Linux · Windows · DE / EN | [Explore](https://pierreg99.github.io/Linux-Windows-Helpful-Commands-DOCS/) · [Source](https://github.com/Pierreg99/Linux-Windows-Helpful-Commands-DOCS) |
| **CRYOGAMEHELP** | Guides · Team builder · Fan project | [Source](https://github.com/Pierreg99/inoffical-cryogamehelp-repo) |
| **Cryo Progress** | Progress · Public data · Research | [Explore](https://pierreg99.github.io/progress/) · [Source](https://github.com/Pierreg99/progress) |
| **CRYO Portfolio** | JavaScript · Accessibility · Static site | [Explore](https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/) · [Source](https://github.com/Pierreg99/Pierreg99-Pierreg99-Profile-Page) |
| **Streamflixrouge** | Android · TV · Upstream project | [Source](https://github.com/Pierreg99/Streamflixrouge-OMEGA-FORK) |

The 14 reviewed projects have descriptions, dedicated previews, and separate live/source links. English and German descriptions are shared across the homepage, searchable explorer, and visual gallery. Projects without a verified public demo lead to their repositories. [Preview sources and capture notes](assets/projects/README.md) identify repository artwork, public screenshots, local captures, and upstream imagery.

## Public inventory

<!-- inventory:start -->
The synchronized inventory contains **76 public repositories**. The account summary records **135 repositories** (**59 private**); private names are never published. The public list comes from GitHub's public user API; the private count is a preserved aggregate from the progress hub.
<!-- inventory:end -->

One versioned snapshot powers the project explorer, public totals, and language distribution. Original projects and public forks are separately filterable. Missing language metadata remains visible. The chart describes project share by primary language, rather than lines of code.

- [Public repository snapshot](./assets/sync/public-repositories.json)
- [Account summary](./assets/sync/account-summary.json)
- [Public language dashboard](https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/docs/public-language-dashboard.html)
- [Progress hub account source](https://github.com/Pierreg99/progress/blob/main/site/account.json)

## Run locally

Requires Node.js 22+, Python 3.10+, and `ffmpeg` on your path.

```sh
npm ci
npm run dev
```

Open `http://localhost:4173`. The development command rebuilds when source files change; refresh the browser to see the result.

```sh
npm run build          # Create the complete static site in dist/
npm run preview        # Serve the production build
npm run check          # Lint, unit tests, build, links, and data validation
npx playwright install --with-deps chromium
npm run test:browser   # Desktop/mobile, accessibility, interactions, and routes
npm run sync           # Refresh the public inventory from GitHub
```

The runtime uses plain HTML, CSS, and native browser modules. Dependencies are used only during authoring, build, and verification. The committed snapshots make builds reproducible without a live API dependency.

## Project structure

```text
src/
  components/          Shared layout, icons, media, explorer, and section templates
  pages/               Home, resources, gallery, languages, research, and reports
  client/              Navigation, localization, project filters, and motion controls
  styles/              Design tokens, base, layout, components, and page styles
  data/                Editorial projects, bilingual UI, documents, and asset registry
  lib/                 HTML helpers and pure portfolio calculations
scripts/
  build.mjs            Static page generation, document rendering, and browser bundles
  prepare-assets.mjs   Responsive WebP, MP4, SVG optimization, and asset manifest
  dev.mjs / serve.mjs   Development rebuilds and a subpath-compatible preview server
  profile_sync/        Validated public metadata synchronization
assets/selected-work/  Edited covers for the four selected projects
assets/projects/       Original project previews and source records
assets/                Identity artwork, motion originals, and public snapshots
docs/en/ / docs/de/     Separate English and German source documents
academic-evaluation/   Original historical research datasets and downloads
reports/               Original daily reports and inventories
tests/                 Data, synchronization, link, browser, and accessibility checks
dist/                  Generated deployment artifact (not committed)
```

The legacy page URLs remain available in the generated site. Markdown sources are retained, and the build creates readable HTML documents with working relative links. Directory entry pages cover resources, reports, task records, and the asset library.

## Documentation / Dokumentation

Visual review: [desktop preview](./docs/previews/desktop.webp) · [mobile preview](./docs/previews/mobile.webp) · selected work [desktop](./docs/previews/projects-desktop.webp) / [mobile](./docs/previews/projects-mobile.webp).

| Reference | English | Deutsch |
| --- | --- | --- |
| Architecture | [EN](./docs/en/ARCHITECTURE-EN.md) | [DE](./docs/de/ARCHITECTURE-DE.md) |
| Profile | [EN](./docs/en/PROFILE-EN.md) | [DE](./docs/de/PROFILE-DE.md) |
| Technical stack | [EN](./docs/en/TECH-STACK-EN.md) | [DE](./docs/de/TECH-STACK-DE.md) |
| Design system | [EN](./docs/en/PROFILE-DESIGN-SYSTEM-EN.md) | [DE](./docs/de/PROFILE-DESIGN-SYSTEM-DE.md) |
| Historical academic methodology | [EN](./docs/en/ACADEMIC-EVALUATION-EN.md) | [DE](./docs/de/ACADEMIC-EVALUATION-DE.md) |

[Complete document library](./docs/README.md) · [Visual laboratory](https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/docs/animation-gallery.html) · [Asset catalog](./assets/ASSET-CATALOG.md) · [Research archive](https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/dashboard/) · [Daily reports](./reports/daily/)

## Assets and motion

Canonical JPGs, GIFs, MP4, and vectors retain their stable paths. The build prepares responsive WebP images, compressed MP4 versions of all five GIF studies, and an inspectable asset manifest. Motion starts from a still and loads only after playback is requested; leaving the viewport pauses it. Reduced-motion preferences are respected.

Self-hosted Manrope and Space Grotesk fonts include their SIL Open Font License files. The interface uses local fonts, artwork, and data, with no analytics or live API calls. Historical documents retain their GitHub reference badges.

## Delivery and data

Pull requests run the full checks and browser suite, then provide a downloadable site artifact. On `main`, the Pages workflow deploys the validated `dist/` artifact through the standard Pages actions using the existing site's configuration. Deployment runs from `main`, which also matches the configured source branch. The hourly profile sync updates verified public metadata and badges only when their content changes, validates the result, and requests a fresh Pages build after a change.

Research documents and original SVG studies remain a dated archive. Their editorial scores and old inventories are clearly separated from the current public snapshot.

[GitHub](https://github.com/Pierreg99) · [X / cryofreee](https://x.com/cryofreee) · [Beacons](https://beacons.ai/cryopg.it)

## English summary

Bilingual portfolio of browser games, interface experiments and AI visualizations.

Clone the repository and follow the commands in [Schnellstart](#schnellstart); the [project layout](#projektstruktur) shows where the code lives. Further documents are listed under [Dokumentation](#dokumentation).
