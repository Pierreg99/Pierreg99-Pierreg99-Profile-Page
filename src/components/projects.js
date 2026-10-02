import { escapeHtml, t } from "../lib/html.js";
import { icon } from "./icons.js";
import { picture } from "./media.js";

const actions = {
  play: ["project.play", "Play in browser"],
  explore: ["project.explore", "Open project"],
  read: ["project.read", "Read guides"],
};

export function projectActions(project) {
  const [key, label] = actions[project.action] ?? actions.explore;
  const title = escapeHtml(project.title);
  return /* HTML */ `<div class="project-links">
    ${project.liveUrl ? `<a class="project-live" href="${escapeHtml(project.liveUrl)}">${t(key, label)}<span class="sr-only"> — ${title}</span>${icon("arrow")}</a>` : ""}
    <a class="project-source" href="${escapeHtml(project.url)}"
      >${t("project.source", "Source code")}<span class="sr-only">
        — ${title}</span
      >${icon("github")}</a
    >
  </div>`;
}

export function previewLabel(project) {
  const labels = {
    artwork: ["preview.artwork", "Project artwork"],
    screenshot: ["preview.screenshot", "Project screenshot"],
    local: ["preview.local", "Local preview"],
    upstream: ["preview.upstream", "Upstream preview"],
  };
  const [key, label] = labels[project.imageKind] ?? labels.screenshot;
  return t(key, label);
}

export function featuredProject(project, root = "./") {
  const destination = escapeHtml(project.liveUrl || project.url);
  return /* HTML */ `<article
    class="featured-card"
    data-featured-project="${escapeHtml(project.name)}"
  >
    <a class="featured-image" href="${destination}">
      ${picture(root, project.image, project.imageAlt)}
      <span class="preview-kind">${previewLabel(project)}</span>
      <span class="featured-number"
        >${project.number} / ${t("work.selected", "SELECTED WORK")}</span
      >
      <span class="image-arrow" aria-hidden="true">${icon("arrow")}</span>
    </a>
    <div class="featured-copy">
      <div class="featured-title">
        <h3><a href="${destination}">${escapeHtml(project.title)}</a></h3>
        <span class="tag" data-i18n="domain.${project.domain}"
          >${escapeHtml({ games: "Games & 3D", systems: "Systems", ai: "AI & agents" }[project.domain])}</span
        >
      </div>
      <p
        data-copy-en="${escapeHtml(project.description)}"
        data-copy-de="${escapeHtml(project.descriptionDe)}"
      >
        ${escapeHtml(project.description)}
      </p>
      <div class="project-tags">
        ${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
      ${projectActions(project)}
    </div>
  </article>`;
}
