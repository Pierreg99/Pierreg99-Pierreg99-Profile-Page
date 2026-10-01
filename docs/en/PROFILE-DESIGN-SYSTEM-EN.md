# CRYO Profile Design System

The October 2026 web interface shares one system across the portfolio, resources, gallery, and research archive. GitHub Markdown documents remain readable standalone references.

## Visual language

- Ink-blue background (`#080e16`), pale foreground (`#f0f5fa`), and ice-cyan accent (`#91e5f7`).
- Muted text stays readable against dark surfaces. Green marks the public snapshot; language dots have distinct colors and text labels.
- Space Grotesk headings and Manrope body text are self-hosted with their SIL Open Font Licenses.
- Clear section numbers, generous spacing, restrained borders, and original concept artwork give the site its identity.
- Shared buttons, resource cards, explorer rows, document pages, and tables use the same tokens.

## Structure

The home moves from identity and current public data through selected work, creative domains, the project explorer, resources, and connections. Secondary routes keep the shared navigation and footer. Documents link back to the library and offer their original Markdown.

## Responsive and accessible behavior

Layouts use fluid typography and grids, with a keyboard-operable mobile menu. Focus is visible, every page has a skip link, form fields have labels, and filter state uses `aria-pressed`. Results announce changes through a polite live region. Wide tables scroll inside named regions.

Animations start as stills and load only when requested. They pause outside the viewport and when reduced-motion becomes active. The static content remains available without JavaScript.

## Content and evidence

Public totals and language shares come from one verified repository snapshot. Original projects and forks remain distinct. Artwork is identified as concept presentation. Historical scores and inventories stay in dated archive surfaces.

English and German web controls are translated by the shared client module. Long reference documents remain separate under `docs/en/` and `docs/de/`.

The source system is organized in `src/styles/tokens.css`, `base.css`, `layout.css`, `components.css`, and `pages.css`. See [the architecture reference](./ARCHITECTURE-EN.md) for module and delivery boundaries.
