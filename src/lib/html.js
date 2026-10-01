export function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
}

export function relativeRoot(route) {
  return "../".repeat(route.split("/").length - 1) || "./";
}

export function t(key, text, tag = "span", attributes = "") {
  return `<${tag} data-i18n="${escapeHtml(key)}" ${attributes}>${escapeHtml(text)}</${tag}>`;
}
