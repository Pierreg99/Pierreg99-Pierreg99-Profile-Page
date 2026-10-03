import { featuredProject } from "../components/projects.js";
import { layout } from "../components/layout.js";
import { icon } from "../components/icons.js";
import { motion } from "../components/media.js";
import { explorer } from "../components/explorer.js";
import { resourceCard, sectionHeading } from "../components/sections.js";
import { t } from "../lib/html.js";

export function home({ projects, snapshot }) {
  const originalCount = projects.filter((project) => !project.fork).length;
  const featured = projects.filter((project) => project.featured);
  const date = new Date(snapshot.updatedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const content = /* HTML */ `<section
      class="hero container"
      aria-labelledby="hero-title"
    >
      <div class="hero-copy">
        <p class="eyebrow hero-kicker">
          <span class="status-dot" aria-hidden="true"></span
          >${t("hero.eyebrow", "THE CRYO WORKSPACE")}
        </p>
        <h1 id="hero-title">
          ${t("hero.line1", "Ideas into code.")}<br />${t("hero.line2", "Code into")}<br /><span
            class="hero-accent"
            >${t("hero.line3", "experiences.")}</span
          >
        </h1>
        <p class="hero-intro">
          ${t("hero.intro", "I’m Pierreg99. I explore the space between AI, software, and interactive worlds — one experiment at a time.")}
        </p>
        <div class="hero-actions">
          <a class="button primary" href="#work"
            >${t("hero.work", "Explore my work")}${icon("right")}</a
          ><a class="button secondary" href="https://github.com/Pierreg99"
            >${icon("github")}${t("hero.source", "View GitHub")}</a
          >
        </div>
        <p class="hero-footnote">
          <span class="small-line" aria-hidden="true"></span> AI
          <span>/</span> SOFTWARE <span>/</span> GAMES <span>/</span> 3D
        </p>
      </div>
      <div class="hero-art">
        ${motion("./", { name: "hero", title: "CRYO observatory", poster: "hero", description: "A luminous cyan sphere suspended above a circular observatory platform.", hero: true })}
        <div class="art-label">
          <span class="art-cross" aria-hidden="true">+</span
          ><span>CRYO OBSERVATORY</span><span>EXP. / 001</span>
        </div>
        <div class="art-caption">
          <span
            >${icon("spark")}${t("hero.art", "A little curiosity. A lot of possibility.")}</span
          ><span class="mono">[ 01 — ∞ ]</span>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="snapshot-strip">
        <div class="snapshot-label">
          <span class="status-dot" aria-hidden="true"></span
          ><span
            >${t("snapshot.label", "PUBLIC WORKSPACE")}<small
              >${t("snapshot.date", "Snapshot")} ·
              <time datetime="${snapshot.updatedAt.slice(0, 10)}"
                >${date}</time
              ></small
            ></span
          >
        </div>
        <div class="snapshot-metric">
          <strong>${projects.length}</strong
          ><span>${t("snapshot.public", "public repositories")}</span>
        </div>
        <div class="snapshot-metric">
          <strong>${originalCount}</strong
          ><span>${t("snapshot.original", "original projects")}</span>
        </div>
        <div class="snapshot-metric">
          <strong>${projects.length - originalCount}</strong
          ><span>${t("snapshot.forks", "ecosystem forks")}</span>
        </div>
        <a
          href="./docs/public-language-dashboard.html"
          class="snapshot-link"
          aria-label="Explore public language data"
          >${icon("arrow")}</a
        >
      </div>
    </div>
    <section class="container section" id="work">
      ${sectionHeading("01", "work", "Built to be explored.", "A selection of public projects across interactive worlds, interfaces, and AI.", `<a class="text-link" href="#projects">${t("work.all", "All projects")}${icon("arrow")}</a>`)}
      <div class="featured-grid">
        ${featured.map((project) => featuredProject(project)).join("")}
      </div>
      <p class="caption">
        ${t("work.caption", "Portfolio covers inspired by each project's own visuals. Open a project to explore it, or view its source code.")}
      </p>
    </section>
    <section class="approach-section section" id="approach">
      <div class="container">
        ${sectionHeading("02", "approach", "Different disciplines. One curious mind.", "From the logic behind a system to the feeling of using it.")}
        <div class="approach-grid">
          <article>
            <span class="approach-icon">${icon("cpu")}</span
            ><span class="mono">01 / INTELLIGENCE</span>
            <h3>${t("approach.ai.title", "Make the invisible useful.")}</h3>
            <p>
              ${t("approach.ai.body", "Agent workflows, memory, and visual experiments that make complex AI ideas easier to explore.")}
            </p>
            <div class="project-tags">
              <span>AI</span><span>Agents</span><span>Knowledge</span>
            </div>
          </article>
          <article>
            <span class="approach-icon">${icon("code")}</span
            ><span class="mono">02 / INTERFACES</span>
            <h3>${t("approach.web.title", "Give ideas an interface.")}</h3>
            <p>
              ${t("approach.web.body", "Thoughtful web experiences and experimental systems, built around clarity and interaction.")}
            </p>
            <div class="project-tags">
              <span>TypeScript</span><span>Web</span><span>UI / UX</span>
            </div>
          </article>
          <article>
            <span class="approach-icon">${icon("cube")}</span
            ><span class="mono">03 / WORLDS</span>
            <h3>
              ${t("approach.games.title", "Create something to get lost in.")}
            </h3>
            <p>
              ${t("approach.games.body", "Voxels, browser games, and 3D spaces where creative technology becomes an experience.")}
            </p>
            <div class="project-tags">
              <span>Three.js</span><span>Games</span><span>3D</span>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section class="container section" id="projects">
      ${sectionHeading("03", "projects", "The open-source collection.", "Find a project, follow an idea, or explore the ecosystem.")}
      ${explorer(projects)}
      <p class="caption">
        ${t("projects.caption", "Original projects and public forks are listed separately. Repository metadata comes from the public GitHub API.")}
      </p>
    </section>
    <section class="container section" id="resources">
      ${sectionHeading("04", "resources", "More than the finished thing.", "The documentation, visual experiments, and research behind the work.")}
      <div class="resource-grid">
        ${resourceCard({ href: "./docs/index.html", title: "Notes & documentation", text: "Profiles, technical references, and design notes. Available in English and German.", glyph: "book", key: "resource.docs", label: "Open resources" })}${resourceCard({ href: "./docs/animation-gallery.html", title: "The visual laboratory", text: "A closer look at the CRYO motion system, concept artwork, and visual studies.", glyph: "spark", key: "resource.gallery", label: "Explore the gallery" })}${resourceCard({ href: "./dashboard/index.html", title: "Research archive", text: "Historical portfolio evaluations with their dates, sources, and interpretation.", glyph: "layers", key: "resource.research", label: "View the archive" })}
      </div>
    </section>
    <section class="container section connect-section" id="connect">
      <div>
        <p class="eyebrow">
          ${t("connect.eyebrow", "KEEP THE CONVERSATION GOING")}
        </p>
        <h2>
          ${t("connect.title", "Good things start")}<br /><span
            >${t("connect.accent", "with a connection.")}</span
          >
        </h2>
        <p>
          ${t("connect.description", "Explore the code, follow the experiments, or find me around the web.")}
        </p>
      </div>
      <div class="connect-links">
        <a href="https://github.com/Pierreg99"
          >${icon("github")}<span>GitHub<small>@Pierreg99</small></span
          >${icon("arrow")}</a
        ><a href="https://x.com/cryofreee"
          ><span class="x-logo" aria-hidden="true">𝕏</span
          ><span>X<small>@cryofreee</small></span
          >${icon("arrow")}</a
        ><a href="https://beacons.ai/cryopg.it"
          >${icon("spark")}<span>Beacons<small>cryopg.it</small></span
          >${icon("arrow")}</a
        >
      </div>
    </section>`;
  return layout({
    route: "index.html",
    title: "CRYO / Pierreg99 — Code, curiosity & interactive worlds",
    description:
      "Explore the public workspace of Pierreg99: AI experiments, software, interactive 3D worlds, and open-source projects.",
    content,
    active: "work",
  });
}
