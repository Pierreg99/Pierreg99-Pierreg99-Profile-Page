<div align="center">

<img src="./assets/cryo-header.svg" alt="CRYO / Pierreg99 — Ideas into code. Code into experiences." width="100%" />

# CRYO / Pierreg99

AI experiments, software, interfaces, and interactive worlds.

[![GitHub](https://img.shields.io/badge/GitHub-Pierreg99-080e16?style=for-the-badge&logo=github)](https://github.com/Pierreg99)
[![Portfolio](https://img.shields.io/badge/Portfolio-Explore-91e5f7?style=for-the-badge)](https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/)
[![Public inventory](https://img.shields.io/badge/Public%20inventory-73-111827?style=for-the-badge)](https://github.com/Pierreg99?tab=repositories)
[![Account sync](https://img.shields.io/badge/Account%20sync-132%20repos-111827?style=for-the-badge)](https://github.com/Pierreg99/progress)

[Open the portfolio →](https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/) · [Resources](./docs/) · [Public data](./assets/sync/public-repositories.json)

</div>

## Selected work

| Project | Explore |
| --- | --- |
| **KiBlox** | [A voxel world for the browser](https://github.com/Pierreg99/KiBlox-VoxelGame) |
| **cryOS** | [An experimental phone and desktop interface](https://github.com/Pierreg99/cryos-launcher) |
| **CryAIPulse** | [An agent mesh visualization](https://github.com/Pierreg99/CryAIPulse) |
| **Resident Lovely** | [An interactive 3D game experiment](https://github.com/Pierreg99/ResidentLovely-Maximum-Hapiness-Game) |
| **Progress** | [The public portfolio and research hub](https://github.com/Pierreg99/progress) |

The site selects featured work from the current public inventory. Project artwork is a visual concept; the linked repositories provide the source and current state.

## Public inventory

<!-- inventory:start -->
The synchronized inventory contains **73 public repositories**. The account summary records **132 repositories** (**59 private**); private names are never published. The public list comes from GitHub's public user API; the private count is a preserved aggregate from the progress hub.
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
assets/                Canonical artwork, motion originals, and public snapshots
docs/en/ / docs/de/     Separate English and German source documents
academic-evaluation/   Original historical research datasets and downloads
reports/               Original daily reports and inventories
tests/                 Data, synchronization, link, browser, and accessibility checks
dist/                  Generated deployment artifact (not committed)
```

The legacy page URLs remain available in the generated site. Markdown sources are retained, and the build creates readable HTML documents with working relative links. Directory entry pages cover resources, reports, task records, and the asset library.

## Documentation / Dokumentation

Visual review: [desktop preview](./docs/previews/desktop.webp) · [mobile preview](./docs/previews/mobile.webp).

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
