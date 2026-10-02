import { layout } from "../components/layout.js";
import { motion, picture } from "../components/media.js";
import { icon } from "../components/icons.js";
import { pageHeading } from "../components/sections.js";
import { motionAssets, vectorAssets, stillAssets } from "../data/assets.js";
import { t } from "../lib/html.js";

export function gallery() {
  const root = "../";
  const content = /* HTML */ `<div class="container page-content">
    ${pageHeading({ eyebrow: "CRYO / VISUAL LABORATORY", title: "A system with a little soul.", description: "Motion, light, and structure. Explore the local artwork that gives the CRYO workspace its identity.", key: "gallery" })}
    <div class="notice">
      ${icon("spark")}
      <p>
        ${t("gallery.notice", "Concept artwork and historical visual studies. Choose play to explore an animation; every scene starts as a still.")}
      </p>
    </div>
    <section aria-labelledby="motion-title">
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">
            ${t("gallery.motionLabel", "01 / MOTION STUDIES")}
          </p>
          <h2 id="motion-title">
            ${t("gallery.motion", "From stillness to motion.")}
          </h2>
        </div>
      </div>
      <div class="gallery-grid">
        ${motionAssets
          .map(
            (asset) =>
              /* HTML */ `<article class="gallery-card">
                ${motion(root, asset)}
                <div class="gallery-copy">
                  <p class="eyebrow">${asset.category}</p>
                  <h3>${asset.title}</h3>
                  <p>
                    ${t(`gallery.${asset.name}.description`, asset.description)}
                  </p>
                  <a
                    class="text-link"
                    href="${root}assets/animations/${asset.name}.gif"
                    download
                    >${t("gallery.original", "Original GIF")}${icon("download")}</a
                  >
                </div>
              </article>`,
          )
          .join("")}
      </div>
    </section>
    <section class="section" aria-labelledby="stills-title">
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">
            ${t("gallery.stillsLabel", "02 / CONCEPT ARTWORK")}
          </p>
          <h2 id="stills-title">
            ${t("gallery.stills", "Frames from the workspace.")}
          </h2>
        </div>
      </div>
      <div class="still-grid">
        ${stillAssets.map(([name, title]) => /* HTML */ `<a class="still-card" href="${root}assets/${name}.jpg">${picture(root, name, title)}<span>${title}${icon("arrow")}</span></a>`).join("")}
      </div>
    </section>
    <section class="section" aria-labelledby="vectors-title">
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">
            ${t("gallery.vectorsLabel", "03 / VECTOR STUDIES")}
          </p>
          <h2 id="vectors-title">
            ${t("gallery.vectors", "Structure, made visible.")}
          </h2>
          <p class="section-description">
            ${t("gallery.archive", "Identity artwork is current. Other studies preserve their September 2026 context, including historical numbers and editorial scores.")}
          </p>
        </div>
      </div>
      <div class="vector-grid">
        ${vectorAssets.map(([name, title]) => /* HTML */ `<a class="vector-card" href="${root}assets/${name}.svg"><img src="${root}assets/${name}.svg" alt="${title}" loading="lazy" decoding="async" width="1200" height="650" /><span>${title}${icon("arrow")}</span></a>`).join("")}
      </div>
    </section>
  </div>`;
  return layout({
    route: "docs/animation-gallery.html",
    title: "Visual laboratory — CRYO / Pierreg99",
    description:
      "Explore CRYO concept art, controlled motion studies, and the original vector asset archive.",
    active: "docs",
    content,
  });
}
