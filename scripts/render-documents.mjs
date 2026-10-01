import { readFile } from "node:fs/promises";
import { relative, posix } from "node:path";
import MarkdownIt from "markdown-it";
import { layout } from "../src/components/layout.js";
import { relativeRoot } from "../src/lib/html.js";
import { motionAssets } from "../src/data/assets.js";
import { walk } from "./utils.mjs";

export async function renderDocuments(output, pages) {
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  markdown.renderer.rules.heading_open = (
    tokens,
    index,
    options,
    env,
    self,
  ) => {
    const text = tokens[index + 1]?.content || "";
    const id = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-");
    const number = env.headings.get(id) ?? 0;
    env.headings.set(id, number + 1);
    tokens[index].attrSet("id", number ? `${id}-${number}` : id);
    return self.renderToken(tokens, index, options);
  };

  function rewriteReferences(html, source) {
    return html.replace(
      /(href|src)=(['"])(.*?)\2/g,
      (match, attribute, quote, url) => {
        const canonical =
          "https://pierreg99.github.io/Pierreg99-Pierreg99-Profile-Page/";
        if (url.startsWith(canonical)) {
          const [, path, suffix] = url
            .slice(canonical.length)
            .match(/^([^?#]*)(.*)$/s);
          const route =
            !path || path.endsWith("/") ? `${path}index.html` : path;
          return `${attribute}=${quote}${posix.relative(posix.dirname(source), route)}${suffix}${quote}`;
        }
        if (/^(?:[a-z]+:|\/\/|#)/i.test(url)) return match;
        let updated = url.replace(/\.md(?=[?#]|$)/i, ".html");
        const absolute = posix.normalize(
          posix.join(posix.dirname(source), url.split(/[?#]/)[0]),
        );
        const animation = motionAssets.find(
          (asset) => absolute === `assets/animations/${asset.name}.gif`,
        );
        if (attribute === "src" && animation)
          updated = posix.relative(
            posix.dirname(source),
            `assets/motion/${animation.name}.webp`,
          );
        if (
          attribute === "src" &&
          absolute.startsWith("assets/") &&
          absolute.endsWith(".jpg")
        )
          updated = posix.relative(
            posix.dirname(source),
            absolute
              .replace(/^assets\//, "assets/media/")
              .replace(/\.jpg$/, "-960.webp"),
          );
        return `${attribute}=${quote}${updated}${quote}`;
      },
    );
  }

  for (const file of (await walk(output)).filter((file) =>
    file.endsWith(".md"),
  )) {
    const source = relative(output, file).replaceAll("\\", "/");
    const route = source.replace(/\.md$/, ".html");
    const text = await readFile(file, "utf8");
    const title =
      text.match(/^#\s+(.+)$/m)?.[1].replace(/[*`]/g, "") ||
      posix.basename(source);
    const lang = /(?:\/de\/|-DE\.|_DE\.)/.test(source) ? "de" : "en";
    const prefix = relativeRoot(route);
    const historical = ![
      "README.md",
      "CHANGELOG.md",
      "CHANGELOG-DE.md",
      "docs/README.md",
      "assets/README.md",
      "assets/ASSET-CATALOG.md",
      "docs/en/ARCHITECTURE-EN.md",
      "docs/de/ARCHITECTURE-DE.md",
      "docs/en/PROFILE-DESIGN-SYSTEM-EN.md",
      "docs/de/PROFILE-DESIGN-SYSTEM-DE.md",
    ].includes(source);
    let body = rewriteReferences(
      markdown.render(text, { headings: new Map() }),
      source,
    );
    body = body
      .replace(
        /<table>/g,
        '<div class="table-scroll" tabindex="0" role="region" aria-label="Document table"><table>',
      )
      .replace(/<\/table>/g, "</table></div>");
    const content = `<div class="container page-content"><div class="document-heading"><span class="eyebrow">RESOURCE / ${lang.toUpperCase()}</span><a class="text-link" href="${prefix}docs/">${lang === "de" ? "← Zur Bibliothek" : "← Back to the library"}</a><a class="text-link" href="./${posix.basename(source)}" download>${lang === "de" ? "Markdown herunterladen" : "Download Markdown"} ↗</a></div>${historical ? `<p class="archive-notice">${lang === "de" ? "Archivdokument. Bewertungen, Inventare und Quellen behalten ihren ursprünglichen zeitlichen Kontext." : "Archive document. Assessments, inventories, and sources retain their original historical context."}</p>` : ""}<article class="prose">${body}</article></div>`;
    const page = layout({
      route,
      title: `${title} — CRYO`,
      description: `CRYO / Pierreg99 ${lang === "de" ? "Dokumentation" : "documentation"}: ${title}`,
      content,
      active: "docs",
      lang,
      document: true,
    });
    pages.set(route, page);
    if (
      posix.basename(source) === "README.md" &&
      source !== "README.md" &&
      !pages.has(posix.join(posix.dirname(source), "index.html"))
    )
      pages.set(posix.join(posix.dirname(source), "index.html"), page);
  }
}
