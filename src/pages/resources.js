import { layout } from "../components/layout.js";
import { pageHeading, resourceCard } from "../components/sections.js";
import { documents } from "../data/documents.js";
import { t } from "../lib/html.js";
import { icon } from "../components/icons.js";

export function resources() {
  const content = /* HTML */ `<div class="container page-content">
    ${pageHeading({ eyebrow: "CRYO / KNOWLEDGE & RESOURCES", title: "The thinking behind the building.", description: "Technical notes, visual experiments, and a bilingual research archive — all in one place.", key: "docs" })}
    <div class="resource-grid">
      ${resourceCard({ href: "./public-language-dashboard.html", title: "Public language data", text: "Explore the current public inventory and its primary-language distribution.", glyph: "code", key: "resource.languages", label: "Explore the data" })}${resourceCard({ href: "./animation-gallery.html", title: "The visual laboratory", text: "The complete local motion, image, and vector system.", glyph: "spark", key: "resource.gallery", label: "Explore the gallery" })}${resourceCard({ href: "../dashboard/index.html", title: "Research archive", text: "Historical benchmarks with dated sources and clear interpretation.", glyph: "layers", key: "resource.research", label: "View the archive" })}
    </div>
    <section class="section" aria-labelledby="documents-title">
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">REFERENCE / EN + DE</p>
          <h2 id="documents-title">
            ${t("docs.library", "The document library.")}
          </h2>
          <p class="section-description">
            ${t("docs.libraryDescription", "Each English and German document opens as its own readable page. Research snapshots retain their original dates.")}
          </p>
        </div>
      </div>
      <div class="document-list">
        ${documents
          .map(
            ([name, title, description]) =>
              /* HTML */ `<article class="document-row">
                <span class="document-icon">${icon("book")}</span>
                <div>
                  <h3>${t(`document.${name}.title`, title)}</h3>
                  <p>${t(`document.${name}.description`, description)}</p>
                </div>
                <div class="document-languages">
                  <a
                    href="./en/${name}-EN.html"
                    lang="en"
                    aria-label="${title} in English"
                    >EN${icon("arrow")}</a
                  ><a
                    href="./de/${name}-DE.html"
                    lang="de"
                    aria-label="${title} auf Deutsch"
                    >DE${icon("arrow")}</a
                  >
                </div>
              </article>`,
          )
          .join("")}
      </div>
    </section>
    <section class="section">
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">HISTORY / REPORTS</p>
          <h2>${t("docs.archive", "Keep the context.")}</h2>
        </div>
      </div>
      <div class="resource-grid">
        ${resourceCard({ href: "../reports/daily/", title: "Daily research reports", text: "September 2026 reports, inventories, and benchmark exports.", glyph: "book", key: "resource.reports", label: "Browse reports" })}${resourceCard({ href: "../academic-evaluation/dashboard/", title: "Team readiness study", text: "The archived six-domain evaluation, with JSON and CSV exports.", glyph: "layers", key: "resource.teams", label: "View the study" })}${resourceCard({ href: "../academic-evaluation/task-time-progress/README.html", title: "Tasks & calendars", text: "Historical task records, time estimates, and downloadable calendars.", glyph: "code", key: "resource.tasks", label: "Open the records" })}
      </div>
    </section>
  </div>`;
  return layout({
    route: "docs/index.html",
    title: "Resources & documentation — CRYO / Pierreg99",
    description:
      "Browse bilingual CRYO documentation, visual studies, public language data, and historical research.",
    content,
    active: "docs",
  });
}
