export function initNavigation() {
  const button = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("#primary-nav");
  if (!button || !nav) return;
  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    nav.dataset.open = String(open);
  };
  button.addEventListener("click", () =>
    setOpen(button.getAttribute("aria-expanded") !== "true"),
  );
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      button.getAttribute("aria-expanded") === "true"
    ) {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) setOpen(false);
  });
  matchMedia("(min-width:901px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
