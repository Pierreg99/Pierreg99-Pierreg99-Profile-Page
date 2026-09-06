# CRYO / Pierreg99 — Documentation Hub

This directory contains the language-separated documentation layer, the interactive public-project language dashboard, and the central visual QA references.

## Deutsch

| Bereich | Öffnen |
|---|---|
| Profil | [PROFILE-DE.md](./de/PROFILE-DE.md) |
| Technischer Stack | [TECH-STACK-DE.md](./de/TECH-STACK-DE.md) |
| Programmiersprachen | [PROGRAMMING-LANGUAGES-DE.md](./de/PROGRAMMING-LANGUAGES-DE.md) |
| Öffentlicher Sprachreport | [PUBLIC-LANGUAGE-PROFILE-DE.md](./de/PUBLIC-LANGUAGE-PROFILE-DE.md) |
| Interaktives Dashboard | [public-language-dashboard.html](./public-language-dashboard.html) |
| Qualitätsaudit | [TECHNICAL-QUALITY-AUDIT-DE.md](./de/TECHNICAL-QUALITY-AUDIT-DE.md) |
| Deep-Research-Audit | [DEEP-RESEARCH-AUDIT-DE.md](./de/DEEP-RESEARCH-AUDIT-DE.md) |
| Animationsgalerie | [animation-gallery.html](./animation-gallery.html) |
| Designsystem | [PROFILE-DESIGN-SYSTEM-DE.md](./de/PROFILE-DESIGN-SYSTEM-DE.md) |
| Varianten | [PROFILE-VARIANTS-DE.md](./de/PROFILE-VARIANTS-DE.md) |
| Akademische Bewertung | [ACADEMIC-EVALUATION-DE.md](./de/ACADEMIC-EVALUATION-DE.md) |
| Dev-Vergleich | [PIERREG99-VS-DEV-COMPARISON-DE.md](./de/PIERREG99-VS-DEV-COMPARISON-DE.md) |
| Time-to-Value | [PIERREG99-TIME-TO-VALUE-COMPARISON-DE.md](./de/PIERREG99-TIME-TO-VALUE-COMPARISON-DE.md) |

## English

| Area | Open |
|---|---|
| Profile | [PROFILE-EN.md](./en/PROFILE-EN.md) |
| Technical Stack | [TECH-STACK-EN.md](./en/TECH-STACK-EN.md) |
| Programming Languages | [PROGRAMMING-LANGUAGES-EN.md](./en/PROGRAMMING-LANGUAGES-EN.md) |
| Public Language Report | [PUBLIC-LANGUAGE-PROFILE-EN.md](./en/PUBLIC-LANGUAGE-PROFILE-EN.md) |
| Interactive Dashboard | [public-language-dashboard.html](./public-language-dashboard.html) |
| Quality Audit | [TECHNICAL-QUALITY-AUDIT-EN.md](./en/TECHNICAL-QUALITY-AUDIT-EN.md) |
| Deep-Research Audit | [DEEP-RESEARCH-AUDIT-EN.md](./en/DEEP-RESEARCH-AUDIT-EN.md) |
| Animation Gallery | [animation-gallery.html](./animation-gallery.html) |
| Design System | [PROFILE-DESIGN-SYSTEM-EN.md](./en/PROFILE-DESIGN-SYSTEM-EN.md) |
| Variants | [PROFILE-VARIANTS-EN.md](./en/PROFILE-VARIANTS-EN.md) |
| Academic Evaluation | [ACADEMIC-EVALUATION-EN.md](./en/ACADEMIC-EVALUATION-EN.md) |
| Developer Comparison | [PIERREG99-VS-DEV-COMPARISON-EN.md](./en/PIERREG99-VS-DEV-COMPARISON-EN.md) |
| Time-to-Value | [PIERREG99-TIME-TO-VALUE-COMPARISON-EN.md](./en/PIERREG99-TIME-TO-VALUE-COMPARISON-EN.md) |

## Visual system

The repository root README is the main presentation surface. SVG assets provide the dashboard, language identity, matrix, stack, evidence, delivery and project layers. The HTML dashboard adds client-side filters and project navigation without external dependencies.

The animated layer is centrally indexed in [`animation-gallery.html`](./animation-gallery.html) and uses repository-local GIFs under `../assets/animations/`.

**Evidence rule:** visuals communicate presentation structure. They must not be interpreted as proof of technology usage without corresponding repository evidence.

**Integrity rule:** local Markdown and HTML references are checked by `scripts/validate-local-links.py` in CI before a Pages artifact is uploaded.
