import { escapeHtml, relativeRoot, t } from "../lib/html.js";
import { icon } from "./icons.js";

export function layout({
  route,
  title,
  description,
  content,
  active = "",
  lang = "en",
  document = false,
  rootOverride,
}) {
  const root = rootOverride ?? relativeRoot(route);
  const nav = [
    ["work", `${root}index.html#work`, "nav.work", "Work"],
    ["projects", `${root}index.html#projects`, "nav.projects", "Projects"],
    ["docs", `${root}docs/`, "nav.docs", "Resources"],
    ["connect", `${root}index.html#connect`, "nav.connect", "Connect"],
  ];
  return /* HTML */ `<!doctype html>
    <html lang="${lang}" data-document="${document}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#080e16" />
        <meta name="description" content="${escapeHtml(description)}" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="${escapeHtml(title)}" />
        <meta property="og:description" content="${escapeHtml(description)}" />
        <meta
          property="og:image"
          content="https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/assets/social-card.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <title>${escapeHtml(title)}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="${root}assets/cryo-mark.svg"
        />
        <link rel="stylesheet" href="${root}assets/site.css" />
        <script type="module" src="${root}assets/site.js"></script>
      </head>
      <body>
        <a class="skip-link" href="#main"
          >${t("nav.skip", "Skip to content")}</a
        >
        <header class="site-header">
          <div class="container header-inner">
            <a
              class="brand"
              href="${root}index.html"
              aria-label="CRYO / Pierreg99 home"
              ><img
                src="${root}assets/cryo-mark.svg"
                width="34"
                height="34"
                alt=""
              /><span
                >CRYO<span class="brand-divider">/</span
                ><span class="brand-name">PIERREG99</span></span
              ></a
            >
            <button
              class="menu-toggle icon-button"
              type="button"
              aria-expanded="false"
              aria-controls="primary-nav"
              data-menu-toggle
              aria-label="Open navigation"
            >
              ${icon("menu")}
            </button>
            <nav
              class="primary-nav"
              id="primary-nav"
              aria-label="Main navigation"
            >
              ${nav.map(([id, href, key, label]) => /* HTML */ `<a href="${href}" ${active === id ? 'aria-current="page"' : ""}>${t(key, label)}</a>`).join("")}
            </nav>
            <div class="header-actions">
              ${document ? "" : '<div class="language-switch" role="group" aria-label="Page language"><button type="button" data-locale="en" aria-pressed="true">EN</button><button type="button" data-locale="de" aria-pressed="false">DE</button></div>'}
              <a
                class="header-github"
                href="https://github.com/Pierreg99"
                aria-label="Pierreg99 on GitHub"
                >${icon("github")}<span>GitHub</span>${icon("arrow")}</a
              >
            </div>
          </div>
        </header>
        <main id="main" tabindex="-1">${content}</main>
        <footer class="site-footer">
          <div class="container footer-main">
            <a class="brand" href="${root}index.html"
              ><img
                src="${root}assets/cryo-mark.svg"
                width="30"
                height="30"
                alt=""
              /><span
                >CRYO<span class="brand-divider">/</span
                ><span class="brand-name">PIERREG99</span></span
              ></a
            >
            <p>
              ${t("footer.line", "Curiosity into code. Ideas into experiences.")}
            </p>
            <a class="back-top" href="#main"
              >${t("footer.top", "Back to top")}${icon("arrow")}</a
            >
          </div>
          <div class="container footer-bottom">
            <span>© 2026 CRYO / Pierreg99</span
            ><span
              >${t("footer.built", "Built with intention. Shared in the open.")}</span
            >
            <div>
              <a href="https://github.com/Pierreg99">GitHub</a
              ><a href="https://x.com/cryofreee">X</a
              ><a href="https://beacons.ai/cryopg.it">Beacons</a>
            </div>
          </div>
        </footer>
        <noscript
          ><div class="noscript-note">
            Browse every project and document below. Search, filters, language
            switching, and motion controls need JavaScript.
          </div></noscript
        >
      </body>
    </html>`;
}
