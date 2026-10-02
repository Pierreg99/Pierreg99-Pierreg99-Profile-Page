# CRYO / Asset System

## Current web pipeline · October 2026

The canonical JPG, GIF, MP4, and SVG files retain their original paths. `src/data/assets.js` registers every still, motion study, and vector used by the visual laboratory. The CRYO identity mark and header use the current ink-blue / ice-cyan palette.

`npm run build` creates three responsive WebP variants per still, an MP4 and poster per GIF, and optimized SVGs in the deployment artifact. Generated files stay in `dist/`; `.cache/optimized-assets` avoids repeating unchanged work. `assets/asset-manifest.json` in the built site records dimensions and byte counts.

Motion starts from a static image, loads only after playback is requested, and pauses outside the viewport or when reduced-motion is enabled. The original GIFs remain available as downloads and for historical GitHub references.

All original vector studies below retain their historical presentation context. Their scores, language inventories, and project selections are not current public metrics.

The `assets/` directory contains the visual system for the profile README.

Current project pictures are documented in [`projects/README.md`](projects/README.md), with machine-readable provenance in [`projects/manifest.json`](projects/manifest.json). They are shared by the featured cards, project explorer, and project preview gallery.

## Composition

- `immersive-dashboard.svg` — master entry panel and visual overview
- `immersive-orbit.svg` — engineering-domain relationship view
- `programming-language-symbols-original.svg` — custom language glyph system
- `programming-languages-atlas.svg` — language roles and formats
- `language-technology-matrix.svg` — evidence-aware language/technology mapping
- `public-project-language-profile.svg` — public project primary-language distribution
- `stack-icons.svg` — technology ecosystem wall
- `stack-map.svg` — architecture map
- `stack-progress.svg` — quantitative evidence signals
- `capability-radar.svg` — capability dimensions
- `delivery-timeline.svg` — engineering delivery flow
- `project-grid.svg` — project portfolio view

## Animated layer

The `animations/` directory provides lightweight repository-native GIF accents used by the root profile and bilingual profile pages:

- `animations/cryo-pulse.gif` — animated CRYO pulse indicator
- `animations/cryo-orbit.gif` — animated engineering-orbit accent

These GIFs are self-contained presentation assets. They do not replace the evidence-bearing SVGs; they add motion while keeping the portfolio renderer-independent from external animation services.

## Masterwork hierarchy

`immersive-dashboard` → `immersive-orbit` → `language symbols` → `language matrix` → `public language profile` → `evidence signals` → `delivery` → `stack detail` → `projects`

The animated layer is a presentation overlay around this hierarchy.

## Visual contract

All custom SVGs use a shared dark CRYO HUD language, scalable vector geometry, semantic `<title>`/`<desc>` metadata, and evidence-aware wording. The original symbol sheet is custom artwork and does not claim to reproduce official brand logos. Animated GIFs are similarly presentation-only and are kept lightweight for GitHub README rendering.
