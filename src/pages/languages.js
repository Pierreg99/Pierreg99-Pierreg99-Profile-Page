import { layout } from "../components/layout.js";
import { explorer, languageClass } from "../components/explorer.js";
import { pageHeading } from "../components/sections.js";
import { languageDistribution } from "../lib/portfolio.js";
import { t, escapeHtml } from "../lib/html.js";
import { icon } from "../components/icons.js";

export function languages({ projects, snapshot }) {
  const originals = projects.filter((project) => !project.fork);
  const distribution = languageDistribution(projects);
  const cards = /* HTML */ `<div class="language-grid">
    ${distribution
      .map(
        (item) =>
          /* HTML */ `<button
            class="language-card ${languageClass(item.language)}"
            type="button"
            data-language-card="${escapeHtml(item.language)}"
            aria-pressed="false"
          >
            <span class="language-dot ${languageClass(item.language)}"
              >${item.language}</span
            ><strong>${item.share.toFixed(1)}<small>%</small></strong
            ><span
              >${item.count} / ${originals.length}
              ${t("scope.originals", "Original projects")}</span
            ><span class="meter-track"
              ><span style="width:${item.share}%"></span
            ></span>
          </button>`,
      )
      .join("")}
  </div>`;
  const content = /* HTML */ `<div class="container page-content">
    ${pageHeading({ eyebrow: "CRYO / PUBLIC LANGUAGE DATA", title: "The languages behind the ideas.", description: "A transparent look at the public collection, from original projects to ecosystem forks.", key: "languages" })}
    <div class="notice">
      ${icon("code")}
      <p>
        ${t("languages.method", "Percentages show the number of original public projects by GitHub’s primary language, including unreported metadata. They describe project share, not lines of code. Forks are excluded from the chart.")}
      </p>
    </div>
    <section
      class="section-small"
      aria-label="Language distribution and project explorer"
    >
      ${explorer(projects, { id: "language-explorer", languageCards: cards, root: "../" })}
    </section>
    <div class="source-note">
      <span class="eyebrow">DATA / PROVENANCE</span>
      <p>
        <a href="../assets/sync/public-repositories.json"
          >${t("languages.download", "Download the public snapshot")}</a
        >
        ·
        <time datetime="${snapshot.updatedAt}"
          >${snapshot.updatedAt.slice(0, 10)}</time
        >
      </p>
      <p>
        ${t("languages.source", "One public inventory powers the portfolio, explorer, and language chart. Unreported languages remain visible; private repository names are never included.")}
      </p>
    </div>
  </div>`;
  return layout({
    route: "docs/public-language-dashboard.html",
    title: "Public language data — CRYO / Pierreg99",
    description:
      "A reproducible language distribution and searchable explorer of the public CRYO portfolio.",
    active: "docs",
    content,
  });
}
