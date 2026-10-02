import { t, escapeHtml } from "../lib/html.js";
import { icon } from "./icons.js";

export function sectionHeading(
  number,
  key,
  title,
  description = "",
  trailing = "",
) {
  return /* HTML */ `<div class="section-heading">
    <div>
      <p class="eyebrow">
        <span class="section-number">${number}</span
        >${t(`${key}.eyebrow`, { work: "SELECTED WORK", projects: "OPEN SOURCE", approach: "THE APPROACH", resources: "GO DEEPER" }[key] || "CRYO / RESOURCES")}
      </p>
      <h2>${t(`${key}.title`, title)}</h2>
      ${description ? `<p class="section-description">${t(`${key}.description`, description)}</p>` : ""}
    </div>
    ${trailing}
  </div>`;
}

export function pageHeading({ eyebrow, title, description, key }) {
  return /* HTML */ `<header class="page-heading">
    <p class="eyebrow">${t(`${key}.eyebrow`, eyebrow)}</p>
    <h1>${t(`${key}.title`, title)}</h1>
    <p class="page-lead">${t(`${key}.description`, description)}</p>
  </header>`;
}

export function resourceCard({
  href,
  title,
  text,
  glyph = "book",
  key,
  label = "Explore",
}) {
  return /* HTML */ `<a class="resource-card" href="${escapeHtml(href)}"
    ><span class="resource-icon">${icon(glyph)}</span>
    <h3>${key ? t(`${key}.title`, title) : escapeHtml(title)}</h3>
    <p>${key ? t(`${key}.text`, text) : escapeHtml(text)}</p>
    <span class="resource-link"
      >${key ? t(`${key}.link`, label) : escapeHtml(label)}${icon("arrow")}</span
    ></a
  >`;
}
