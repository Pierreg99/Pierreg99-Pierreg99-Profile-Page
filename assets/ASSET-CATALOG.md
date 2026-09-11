# CRYO / Pierreg99 — Asset Catalog

## Canonical vector assets

| Asset | Purpose |
|---|---|
| `cryo-header.svg` | Primary hero banner |
| `cryo-mark.svg` | CRYO identity mark |
| `immersive-dashboard.svg` | Master profile/system dashboard |
| `immersive-orbit.svg` | Engineering-domain relationship view |
| `programming-language-symbols-original.svg` | Custom language identity symbols |
| `programming-languages-atlas.svg` | Language roles and formats |
| `language-technology-matrix.svg` | Evidence-aware language-to-technology mapping |
| `stack-icons.svg` | Technology icon wall |
| `stack-map.svg` | Architecture and stack map |
| `stack-progress.svg` | Evidence progress dashboard |
| `capability-radar.svg` | Capability radar |
| `delivery-timeline.svg` | Build / delivery flow |
| `project-grid.svg` | Featured project selection |

## Canonical animated assets

| Asset | Purpose |
|---|---|
| `animations/cryo-pulse.gif` | Compact hero/status motion layer (regenerated 2026-09-11) |
| `animations/cryo-orbit.gif` | Ambient system/technology motion layer (regenerated 2026-09-11) |
| `hero.jpg` / `hero.mp4` | Cinematic observatory hero still + 6s loop |
| `pulse.jpg` / `orbit.jpg` | Motion posters |


The animation layer is repository-native and dependency-free. The central integration page is [`docs/animation-gallery.html`](../docs/animation-gallery.html).

## Presentation hierarchy

1. `immersive-dashboard.svg` — entry showcase
2. `immersive-orbit.svg` — system architecture view
3. `programming-language-symbols-original.svg` — language identity
4. `language-technology-matrix.svg` — language/technology bridge
5. `stack-progress.svg` + `capability-radar.svg` — evidence signals
6. `delivery-timeline.svg` — engineering process
7. `stack-map.svg` + `stack-icons.svg` — detailed stack
8. `project-grid.svg` — project selection
9. `animations/cryo-pulse.gif` + `animations/cryo-orbit.gif` — motion accent layer

## Design standard

All original vectors use accessible titles/descriptions, scalable dimensions, and a shared CRYO visual language. The language-symbol sheet is custom artwork; it does not claim to reproduce official brand logos.

## Evidence standard

Core language evidence is kept separate from contextual ecosystem symbols. Visual design must not imply verified use of a technology without repository evidence. Animated assets are presentation elements and are not technical proof by themselves.

## Integrity checks

- Every README asset link must resolve to a tracked file.
- Every canonical asset must appear in this catalog.
- Animation filenames remain canonical and must not be duplicated for presentation variants.
- German and English documentation stays separated under `docs/de/` and `docs/en/`.
- Visual scores remain explicitly labeled as portfolio/evidence signals.
- `scripts/validate-local-links.py` validates local Markdown/HTML references in CI.
