import { label } from "./i18n.js";

export function initMotion() {
  const stops = new Map();
  for (const frame of document.querySelectorAll("[data-motion]")) {
    const video = frame.querySelector("video");
    const button = frame.querySelector("[data-motion-toggle]");
    const text = button.querySelector("[data-i18n]");
    const symbol = button.querySelector(".play-symbol");
    function update(playing) {
      button.setAttribute("aria-pressed", String(playing));
      text.dataset.i18n = playing ? "motion.pause" : "motion.play";
      text.textContent = label(
        text.dataset.i18n,
        playing ? "Pause motion" : "Play motion",
      );
      symbol.textContent = playing ? "Ⅱ" : "▶︎";
    }
    function stop() {
      video.pause();
      video.hidden = true;
      update(false);
    }
    stops.set(frame, stop);
    button.addEventListener("click", async () => {
      if (!video.paused) {
        stop();
        return;
      }
      if (!video.src) video.src = video.dataset.source;
      video.hidden = false;
      button.disabled = true;
      try {
        await video.play();
        update(true);
      } catch {
        stop();
        if (!frame.querySelector("[role=status]")) {
          const status = document.createElement("p");
          status.className = "motion-error";
          status.setAttribute("role", "status");
          status.textContent = label(
            "motion.error",
            "The animation could not load. The still image is available.",
          );
          frame.append(status);
        }
      } finally {
        button.disabled = false;
      }
    });
    document.addEventListener("localechange", () => update(!video.paused));
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (!entry.isIntersecting) stops.get(entry.target)?.();
    },
    { threshold: 0.1 },
  );
  for (const frame of stops.keys()) observer.observe(frame);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) for (const stop of stops.values()) stop();
  });
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener(
    "change",
    (event) => {
      if (event.matches) for (const stop of stops.values()) stop();
    },
  );
}
