import { translate } from "../data/strings.js";

const originalText = new WeakMap();
let locale = "en";

export function currentLocale() {
  return locale;
}

export function label(key, fallback) {
  return translate(key, locale, fallback);
}

export function setLocale(next, { persist = true } = {}) {
  locale = next === "de" ? "de" : "en";
  document.documentElement.lang = locale;
  for (const element of document.querySelectorAll("[data-i18n]")) {
    if (!originalText.has(element))
      originalText.set(element, element.textContent);
    element.textContent = translate(
      element.dataset.i18n,
      locale,
      originalText.get(element),
    );
  }
  for (const element of document.querySelectorAll("[data-copy-en]")) {
    element.textContent =
      locale === "de" ? element.dataset.copyDe : element.dataset.copyEn;
  }
  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    element.placeholder = translate(
      element.dataset.i18nPlaceholder,
      locale,
      "Search projects, languages, ideas…",
    );
  }
  for (const button of document.querySelectorAll("[data-locale]"))
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.locale === locale),
    );
  if (persist) {
    try {
      localStorage.setItem("cryo-locale", locale);
    } catch {
      /* Browsing with storage disabled remains supported. */
    }
  }
  document.dispatchEvent(
    new CustomEvent("localechange", { detail: { locale } }),
  );
}

export function initLanguage() {
  let saved = "en";
  try {
    saved = localStorage.getItem("cryo-locale") || "en";
  } catch {
    /* No persistence is required. */
  }
  const specified = new URL(location.href).searchParams.get("lang");
  if (document.documentElement.dataset.document === "true") {
    locale = document.documentElement.lang;
    setLocale(locale, { persist: false });
  } else {
    setLocale(["en", "de"].includes(specified) ? specified : saved, {
      persist: false,
    });
  }
  for (const button of document.querySelectorAll("[data-locale]"))
    button.addEventListener("click", () => setLocale(button.dataset.locale));
}
