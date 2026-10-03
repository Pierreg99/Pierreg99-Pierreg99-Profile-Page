# CRYO Site Architecture

The October 2026 site generates complete HTML from shared JavaScript templates. Native browser modules add filters, localization, navigation, and motion. Pages remain readable without JavaScript.

`src/data/projects.js` holds reviewed project descriptions, direct demo links, and preview metadata. Optional `coverImage` and `coverAlt` fields select edited homepage covers from `assets/selected-work/`; original `image` fields remain the previews used in the explorer and gallery. Shared project actions keep live destinations and source repositories distinct. The explorer preserves upstream descriptions for public forks. Both image directories include source records and checksums, and the build optimizes them alongside the separately labeled concept artwork.

## Source boundaries

| Directory | Responsibility |
| --- | --- |
| `src/components` | Shared page shell, media, icons, section headings, and explorer |
| `src/pages` | Home, resources, gallery, languages, research, and reports |
| `src/client` | Small, independent browser interactions |
| `src/styles` | Tokens, typography, layout, components, and responsive styles |
| `src/data` | Editorial descriptions, translations, documents, and assets |
| `src/lib` | Escaping, relative paths, project matching, and language calculations |
| `scripts` | Build, asset processing, preview, synchronization, and validation |

## Rendering and routes

`npm run build` recreates `dist/`, copies canonical resources, prepares assets, and bundles browser modules and CSS with esbuild. Markdown-It renders each Markdown document into an HTML companion. Local Markdown links point to those readable companions; source files and downloads remain available.

Relative URLs support the GitHub Pages project path without a client router. Test that path with `npm run preview -- --base /Pierreg99-Pierreg99-Profile-Page`. Original published page URLs remain stable, and resource directories have entry pages.

## Data contracts

`assets/sync/public-repositories.json` contains selected fields from GitHub's public user repository API. `src/data/projects.js` adds editorial descriptions. Featured cards are emitted only for repositories still in the public list.

The explorer distinguishes original projects and forks. Language percentages count original projects, include unreported metadata, and use the same snapshot as the home page. They are project shares, rather than byte or line counts.

The account summary preserves the private aggregate from the progress hub. The public query never reads private repository records. Synchronization validates owner, visibility, URLs, and counts before writing. Timestamps change only when content changes.

Historical evaluation data keeps its original dates and scores. Dashboards and document pages identify it as archived editorial research.

## Asset lifecycle

Canonical files retain their paths under `assets/`. The pipeline creates three WebP sizes per still, and an MP4 plus poster per GIF. Its cache key includes source inputs and processing configuration. SVG optimization preserves accessibility metadata; `assets/asset-manifest.json` records dimensions and byte counts.

Motion starts as a still, loads only after playback is requested, and pauses outside the viewport, in a hidden tab, or when reduced-motion is enabled. Self-hosted fonts include their licenses.

## Verification and delivery

`npm run check` covers formatting, lint, data calculations, sync rules, build output, links, media, fonts, and snapshot integrity. Playwright checks the actual Pages subpath on desktop and mobile, including filters, languages, keyboard navigation, motion, downloads, and WCAG accessibility.

Pull requests receive a preview artifact. After checks pass, `main` publishes `dist/` through GitHub Pages. Changed public metadata requests another Pages build.

Add a page by composing components in `src/pages` and registering its route in `scripts/build.mjs`. Register canonical artwork in `src/data/assets.js`. Add translations in `src/data/strings.js` and tests for meaningful new behavior.
