import { matchesProject } from "../lib/portfolio.js";
import { label } from "./i18n.js";

export function initExplorers() {
  for (const root of document.querySelectorAll("[data-explorer]")) {
    const search = root.querySelector("[data-search]");
    const scope = root.querySelector("[data-scope]");
    const language = root.querySelector("[data-language-select]");
    const domainButtons = [...root.querySelectorAll("[data-domain]")];
    const languageCards = [...root.querySelectorAll("[data-language-card]")];
    const rows = [...root.querySelectorAll("[data-project]")];
    const count = root.querySelector("[data-result-count]");
    const empty = root.querySelector("[data-empty]");
    let domain = "all";
    function apply() {
      let visible = 0;
      for (const row of rows) {
        const matches = matchesProject(
          {
            title: row.dataset.searchText,
            language: row.dataset.language,
            domain: row.dataset.domainValue,
            fork: row.dataset.fork === "true",
          },
          {
            query: search.value,
            domain,
            language: language.value,
            scope: scope.value,
          },
        );
        row.hidden = !matches;
        visible += Number(matches);
      }
      for (const button of domainButtons)
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.domain === domain),
        );
      for (const card of languageCards)
        card.setAttribute(
          "aria-pressed",
          String(card.dataset.languageCard === language.value),
        );
      count.textContent = `${visible} / ${rows.length} ${label("results.repositories", "repositories")}`;
      empty.hidden = visible !== 0;
      root.querySelector(".project-list").hidden = visible === 0;
      root.querySelector(".reset-filters").hidden =
        !search.value &&
        domain === "all" &&
        language.value === "all" &&
        scope.value === "originals";
    }
    search.addEventListener("input", apply);
    scope.addEventListener("change", apply);
    language.addEventListener("change", apply);
    for (const button of domainButtons)
      button.addEventListener("click", () => {
        domain = button.dataset.domain;
        if (domain === "ecosystem") scope.value = "forks";
        apply();
      });
    for (const card of languageCards)
      card.addEventListener("click", () => {
        language.value =
          language.value === card.dataset.languageCard
            ? "all"
            : card.dataset.languageCard;
        scope.value = "originals";
        apply();
      });
    for (const button of root.querySelectorAll("[data-reset]"))
      button.addEventListener("click", () => {
        domain = "all";
        search.value = "";
        scope.value = "originals";
        language.value = "all";
        apply();
        search.focus();
      });
    document.addEventListener("localechange", apply);
    apply();
  }
  document.addEventListener("keydown", (event) => {
    if (
      event.key !== "/" ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.target.closest("input,textarea,select,[contenteditable]")
    )
      return;
    const search = document.querySelector("[data-search]");
    if (search) {
      event.preventDefault();
      search.focus();
    }
  });
}
