# CRYO / Asset System

The `assets/` directory contains the visual system for the profile README.

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
