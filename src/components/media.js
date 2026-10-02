import { escapeHtml } from "../lib/html.js";

export function picture(
  root,
  name,
  alt = "",
  {
    eager = false,
    sizes = "(max-width: 700px) 100vw, 50vw",
    className = "",
  } = {},
) {
  return /* HTML */ `<picture
    ><source
      type="image/webp"
      srcset="
        ${root}assets/media/${name}-480.webp   480w,
        ${root}assets/media/${name}-960.webp   960w,
        ${root}assets/media/${name}-1440.webp 1440w
      "
      sizes="${sizes}" />
    <img
      class="${className}"
      src="${root}assets/${name}.jpg"
      alt="${escapeHtml(alt)}"
      width="1440"
      height="810"
      loading="${eager ? "eager" : "lazy"}"
      decoding="async"
      ${eager ? 'fetchpriority="high"' : ""}
  /></picture>`;
}

export function motion(
  root,
  { name, title, poster, description = "", hero = false },
) {
  const source = hero ? "hero.mp4" : `motion/${name}.mp4`;
  return /* HTML */ `<div
    class="motion-frame ${hero ? "hero-visual" : ""}"
    data-motion
  >
    ${picture(root, poster, description, { eager: hero, sizes: hero ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 700px) 100vw, 50vw" })}
    <video
      muted
      loop
      playsinline
      preload="none"
      data-source="${root}assets/${source}"
      aria-label="${escapeHtml(title)}"
      hidden
    ></video>
    <button
      class="motion-toggle"
      type="button"
      aria-pressed="false"
      data-motion-toggle
    >
      <span class="play-symbol" aria-hidden="true">▶︎</span
      ><span data-i18n="motion.play">Play motion</span>
    </button>
  </div>`;
}
