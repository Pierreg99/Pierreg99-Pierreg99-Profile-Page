import { escapeHtml, t } from "../lib/html.js";
import { domains } from "../data/projects.js";
import { icon } from "./icons.js";
import { picture } from "./media.js";
import { projectActions, previewLabel } from "./projects.js";

export function languageClass(language) {
  return (
    {
      TypeScript: "ts",
      JavaScript: "js",
      HTML: "html",
      CSS: "css",
      Java: "java",
    }[language] ?? "other"
  );
}

export function explorer(
  projects,
  { id = "explorer", languageCards = "", root = "./" } = {},
) {
  const languages = [
    ...new Set(projects.map((project) => project.language || "Unreported")),
  ].sort();
  return /* HTML */ `<div class="explorer" id="${id}" data-explorer>
    ${languageCards}
    <div class="explorer-toolbar">
      <div class="search-field">
        ${icon("search")}<label class="sr-only" for="${id}-search"
          >${t("search.label", "Search projects")}</label
        ><input
          id="${id}-search"
          type="search"
          data-search
          placeholder="Search projects, languages, ideas…"
          data-i18n-placeholder="search.placeholder"
          autocomplete="off"
        /><kbd aria-hidden="true">/</kbd>
      </div>
      <div class="select-field">
        <label class="sr-only" for="${id}-scope"
          >${t("scope.label", "Repository scope")}</label
        ><select id="${id}-scope" data-scope>
          <option value="originals" data-i18n="scope.originals">
            Original projects
          </option>
          <option value="all" data-i18n="scope.all">All repositories</option>
          <option value="forks" data-i18n="scope.forks">
            Public forks
          </option></select
        >${icon("down")}
      </div>
      <div class="select-field">
        <label class="sr-only" for="${id}-language"
          >${t("language.label", "Primary language")}</label
        ><select id="${id}-language" data-language-select>
          <option value="all" data-i18n="language.all">All languages</option>
          ${languages.map((language) => /* HTML */ `<option value="${escapeHtml(language)}">${escapeHtml(language)}</option>`).join("")}</select
        >${icon("down")}
      </div>
    </div>
    <div class="filter-chips" role="group" aria-label="Project domain">
      ${domains.map((domain) => /* HTML */ `<button class="filter-chip" type="button" data-domain="${domain.id}" aria-pressed="${domain.id === "all"}">${t(domain.key, domain.label)}</button>`).join("")}
    </div>
    <div class="explorer-meta">
      <p data-result-count role="status" aria-live="polite">
        ${projects.length} ${t("results.repositories", "repositories")}
      </p>
      <button class="text-button reset-filters" type="button" data-reset hidden>
        ${t("filter.reset", "Reset filters")} ${icon("close")}
      </button>
    </div>
    <div class="project-list">
      ${projects
        .map((project) => {
          const searchable = [
            project.name,
            project.title,
            project.description,
            project.descriptionDe,
            project.language,
            ...(project.tags ?? []),
            ...(project.topics ?? []),
          ].join(" ");
          return /* HTML */ `<article
            class="project-row ${project.image ? "has-preview" : ""}"
            data-project
            data-domain-value="${project.domain}"
            data-language="${escapeHtml(project.language || "Unreported")}"
            data-fork="${project.fork}"
            data-search-text="${escapeHtml(searchable)}"
          >
            ${
              project.image
                ? `<a class="project-thumbnail" href="${escapeHtml(project.liveUrl || project.url)}">${picture(root, project.image, project.imageAlt, { sizes: "(max-width: 700px) 104px, 132px" })}</a>`
                : `<span
              class="project-glyph ${languageClass(project.language)}"
              aria-hidden="true"
              >${project.fork ? icon("layers") : icon(project.domain === "games" ? "cube" : project.domain === "ai" ? "cpu" : project.domain === "docs" ? "book" : "code")}</span
            >`
            }
            <div class="project-copy">
              <h3>
                <a href="${escapeHtml(project.liveUrl || project.url)}"
                  >${escapeHtml(project.title)}</a
                >
              </h3>
              <p
                data-copy-en="${escapeHtml(project.description)}"
                data-copy-de="${escapeHtml(project.descriptionDe)}"
              >
                ${escapeHtml(project.description)}
              </p>
              <div class="project-meta">
                <span class="language-dot ${languageClass(project.language)}"
                  >${escapeHtml(project.language || "Unreported")}</span
                >${project.archived ? `<span class="tag">${t("project.archived", "Archived")}</span>` : ""}${project.fork ? `<span class="tag fork-tag">${t("scope.fork", "Fork")}</span>` : ""}
                ${project.image ? `<span class="preview-note">${previewLabel(project)}</span>` : ""}
              </div>
              ${projectActions(project)}
            </div>
          </article>`;
        })
        .join("")}
    </div>
    <div class="empty-state" data-empty hidden>
      ${icon("search")}
      <h3>${t("empty.title", "No projects found")}</h3>
      <p>${t("empty.body", "Try a different search or reset the filters.")}</p>
      <button class="button secondary" type="button" data-reset>
        ${t("filter.reset", "Reset filters")}
      </button>
    </div>
  </div>`;
}
