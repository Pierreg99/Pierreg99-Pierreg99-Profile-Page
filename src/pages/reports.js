import { layout } from "../components/layout.js";
import { pageHeading, resourceCard } from "../components/sections.js";

export function reports() {
  const content = /* HTML */ `<div class="container page-content">
    ${pageHeading({ eyebrow: "CRYO / DAILY RESEARCH ARCHIVE", title: "The records behind the numbers.", description: "The original September 2026 report set and its supporting data exports.", key: "reports" })}
    <div class="resource-grid">
      ${resourceCard({ href: "./2026-09-07/DAILY-REPORT-EN.html", title: "Daily report · English", text: "The original research snapshot from 7 September 2026.", label: "Read the report" })}${resourceCard({ href: "./2026-09-07/DAILY-REPORT-DE.html", title: "Tagesbericht · Deutsch", text: "Der originale Forschungs-Snapshot vom 7. September 2026.", label: "Bericht lesen" })}${resourceCard({ href: "./2026-09-07/ACADEMIC-BENCHMARK.json", title: "Research data", text: "Download the original machine-readable academic benchmark.", glyph: "code", label: "Open JSON" })}
    </div>
    <div class="archive-links">
      <a href="./2026-09-07/ACADEMIC-BENCHMARK.csv" download>Benchmark CSV ↗</a
      ><a href="./2026-09-07/REPOSITORY-INVENTORY-2026-09-07.csv" download
        >Repository inventory CSV ↗</a
      ><a href="./2026-09-07/ACADEMIC-BENCHMARK-EN.html">English benchmark ↗</a
      ><a href="./2026-09-07/ACADEMIC-BENCHMARK-DE.html" lang="de"
        >Deutscher Benchmark ↗</a
      >
    </div>
  </div>`;
  return layout({
    route: "reports/daily/index.html",
    title: "Daily research archive — CRYO / Pierreg99",
    description:
      "The original September 2026 daily reports and downloadable research datasets.",
    content,
    active: "docs",
  });
}
