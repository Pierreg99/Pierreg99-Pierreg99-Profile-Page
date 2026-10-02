import { layout } from "../components/layout.js";
import { pageHeading } from "../components/sections.js";
import { icon } from "../components/icons.js";
import { t, escapeHtml } from "../lib/html.js";
import { benchmark, grade } from "../data/benchmark.js";

export function research() {
  const content = /* HTML */ `<div class="container page-content">
    ${pageHeading({ eyebrow: "CRYO / RESEARCH ARCHIVE", title: "A look at the work before.", description: "The original portfolio benchmarks, preserved with their methodology and historical context.", key: "research" })}
    <div class="notice">
      ${icon("book")}
      <p>
        ${t("research.notice", "Historical snapshot: 7 September 2026. These are editorial portfolio assessments, not current measurements or independent certifications.")}
      </p>
    </div>
    <div class="metrics-grid">
      ${benchmark.profiles
        .map(
          ([key, label, value]) =>
            /* HTML */ `<div class="metric-card">
              ${t(key, label)}<strong>${value}<small> / 100</small></strong
              ><small>${t("research.score", "Historical score / 100")}</small>
            </div>`,
        )
        .join("")}
    </div>
    <section aria-labelledby="benchmark-title">
      <h2 id="benchmark-title">
        ${t("research.dimensions", "Benchmark dimensions")}
      </h2>
      <div
        class="table-scroll"
        tabindex="0"
        role="region"
        aria-label="Historical benchmark comparison"
      >
        <table class="data-table">
          <caption>
            ${t("research.notice", "Historical snapshot: 7 September 2026. Editorial portfolio assessments.")}
          </caption>
          <thead>
            <tr>
              <th scope="col">${t("research.dimension", "Dimension")}</th>
              <th scope="col">Pierreg99</th>
              <th scope="col">Senior</th>
              <th scope="col">Full-stack team</th>
            </tr>
          </thead>
          <tbody>
            ${benchmark.dimensions
              .map(
                ([name, score, senior, team]) =>
                  /* HTML */ `<tr>
                    <td>${name}</td>
                    <td>
                      ${score}<span class="score-bar" aria-hidden="true"
                        ><span style="width:${score}%"></span
                      ></span>
                    </td>
                    <td>${senior}</td>
                    <td>${team}</td>
                  </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
    <section class="source-note">
      <span class="eyebrow"
        >${t("research.source", "Source & methodology")}</span
      >
      <p>
        ${t("research.reference", "Reference snapshot")} ·
        <time datetime="2026-09-07">2026-09-07</time>
      </p>
      <div class="archive-links">
        <a href="../docs/en/ACADEMIC-DASHBOARD-EN.html"
          >English methodology ${icon("arrow")}</a
        ><a href="../docs/de/ACADEMIC-DASHBOARD-DE.html" lang="de"
          >Deutsche Methodik ${icon("arrow")}</a
        ><a href="../reports/daily/">Daily reports ${icon("arrow")}</a
        ><a href="../academic-evaluation/dashboard/"
          >Team readiness study ${icon("arrow")}</a
        >
      </div>
    </section>
  </div>`;
  return layout({
    route: "dashboard/index.html",
    title: "Research archive — CRYO / Pierreg99",
    description:
      "The historical September 2026 portfolio benchmark, preserved with its source documents and interpretation.",
    content,
    active: "docs",
  });
}

export function teams({ evaluation }) {
  const average =
    evaluation.teams.reduce((sum, team) => sum + team.score, 0) /
    evaluation.teams.length;
  const scores = evaluation.teams.map((team) => team.score);
  const averageGrade = grade(average);
  const content = /* HTML */ `<div class="container page-content">
    ${pageHeading({ eyebrow: "CRYO / HISTORICAL READINESS STUDY", title: "An archive of the evaluation.", description: "Six original domain assessments, brought into one consistent, readable dashboard.", key: "teams" })}
    <div class="notice">
      ${icon("layers")}
      <p>
        ${t("teams.notice", "Snapshot: 6 September 2026, from the stored evaluation dataset. Scores describe editorial repository readiness, not individual performance or IQ.")}
      </p>
    </div>
    <div class="metrics-grid">
      <div class="metric-card">
        ${t("teams.average", "Domain average")}<strong
          >${average.toFixed(1)}</strong
        ><small>/ 100</small>
      </div>
      <div class="metric-card">
        ${t("teams.grade", "Overall grade")}<strong>${averageGrade.note}</strong
        ><small>${t(averageGrade.key, averageGrade.label)}</small>
      </div>
      <div class="metric-card">
        ${t("teams.count", "Domains assessed")}<strong
          >${evaluation.teams.length}</strong
        ><small>${evaluation.generated}</small>
      </div>
      <div class="metric-card">
        ${t("teams.range", "Score range")}<strong
          >${Math.min(...scores)}–${Math.max(...scores)}</strong
        ><small>/ 100</small>
      </div>
    </div>
    <div
      class="table-scroll"
      tabindex="0"
      role="region"
      aria-label="Historical team readiness data"
    >
      <table class="data-table">
        <caption>
          ${t("teams.table", "Original readiness assessments")}
        </caption>
        <thead>
          <tr>
            <th scope="col">${t("teams.domain", "Domain")}</th>
            <th scope="col">${t("teams.score", "Score")}</th>
            <th scope="col">${t("teams.note", "Grade")}</th>
            <th scope="col">${t("teams.rating", "Assessment")}</th>
          </tr>
        </thead>
        <tbody>
          ${evaluation.teams
            .map((team) => {
              const rating = grade(team.score);
              return /* HTML */ `<tr>
                <td>
                  <span
                    data-copy-en="${escapeHtml(team.team)}"
                    data-copy-de="${escapeHtml(team.team_de)}"
                    >${escapeHtml(team.team)}</span
                  >
                </td>
                <td>
                  ${team.score}<span class="score-bar" aria-hidden="true"
                    ><span style="width:${team.score}%"></span
                  ></span>
                </td>
                <td>${rating.note}</td>
                <td>${t(rating.key, rating.label)}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
    <div class="export-actions">
      <a class="button secondary" href="../dev-team/evaluation.json" download
        >${icon("download")}${t("teams.downloadJSON", "Download JSON")}</a
      ><a class="button secondary" href="../dev-team/evaluation.csv" download
        >${icon("download")}${t("teams.downloadCSV", "Download CSV")}</a
      >
    </div>
    <div class="source-note">
      <span class="eyebrow">SOURCE / 2026-09-06</span>
      <p>
        Stored source: ${escapeHtml(evaluation.source_repository)} ·
        ${t("research.score", "Historical score / 100")}
      </p>
      <div class="archive-links">
        <a href="../dev-team/DEV_TEAM_GRADE_EN.html"
          >English study ${icon("arrow")}</a
        ><a href="../dev-team/DEV_TEAM_GRADE_DE.html" lang="de"
          >Deutsche Studie ${icon("arrow")}</a
        ><a href="../../dashboard/">Benchmark archive ${icon("arrow")}</a>
      </div>
    </div>
  </div>`;
  return layout({
    route: "academic-evaluation/dashboard/index.html",
    title: "Team readiness study — CRYO / Pierreg99",
    description:
      "An accessible historical evaluation dashboard with the original data, bilingual labels, and direct JSON and CSV exports.",
    content,
    active: "docs",
  });
}
