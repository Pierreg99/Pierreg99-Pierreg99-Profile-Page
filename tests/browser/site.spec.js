import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";

const snapshot = JSON.parse(
  await readFile(
    new URL("../../assets/sync/public-repositories.json", import.meta.url),
  ),
);
const repositories = snapshot.repositories;
const originalCount = repositories.filter((repo) => !repo.fork).length;
const forkCount = repositories.length - originalCount;
const routes = [
  "./",
  "docs/",
  "docs/animation-gallery.html",
  "docs/public-language-dashboard.html",
  "dashboard/",
  "academic-evaluation/dashboard/",
  "reports/daily/",
];

for (const route of routes) {
  test(`${route} renders accessibly under the Pages subpath`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".site-footer")).toBeAttached();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("search, domain, language, and scope compose and reset correctly", async ({
  page,
}) => {
  await page.goto("./");
  const explorer = page.locator("[data-explorer]");
  const rows = explorer.locator("[data-project]:visible");
  await expect(rows).toHaveCount(originalCount);
  await explorer.locator("[data-search]").fill("KiBlox");
  await expect(rows).toHaveCount(1);
  await explorer.locator('[data-domain="ai"]').click();
  await expect(rows).toHaveCount(0);
  await expect(explorer.locator("[data-empty]")).toBeVisible();
  await explorer.locator("[data-empty] [data-reset]").click();
  await expect(rows).toHaveCount(originalCount);
  await explorer.locator("[data-language-select]").selectOption("TypeScript");
  await expect(rows).toHaveCount(
    repositories.filter((repo) => !repo.fork && repo.language === "TypeScript")
      .length,
  );
  await explorer.locator(".reset-filters").click();
  await explorer.locator('[data-domain="ecosystem"]').click();
  await expect(rows).toHaveCount(forkCount);
  await explorer.locator(".reset-filters").click();
  await explorer.locator("[data-scope]").selectOption("all");
  await expect(rows).toHaveCount(repositories.length);
});

test("project pictures and actions lead to the matching project on every portfolio surface", async ({
  page,
}) => {
  const repository =
    "https://github.com/Pierreg99/ResidentLovely-Maximum-Hapiness-Game";
  const live =
    "https://pierreg99.github.io/ResidentLovely-Maximum-Hapiness-Game/";
  for (const route of [
    "./",
    "docs/public-language-dashboard.html",
    "docs/animation-gallery.html",
  ]) {
    await page.goto(route);
    const card = page
      .locator(
        route === "./"
          ? ".featured-card"
          : route.includes("animation")
            ? ".project-gallery .gallery-card"
            : ".project-row",
      )
      .filter({
        has: page.getByRole("heading", {
          name: "Resident Lovely",
          exact: true,
        }),
      });
    await expect(card.locator(".project-live")).toHaveAttribute("href", live);
    await expect(card.locator(".project-source")).toHaveAttribute(
      "href",
      repository,
    );
    const image = card.locator("img");
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute(
      "src",
      /assets\/projects\/resident-lovely\.jpg$/,
    );
    await expect(image).toHaveAttribute("alt", /Sweet Château/);
    await expect
      .poll(() =>
        image.evaluate(
          (element) => element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await page.locator('[data-locale="de"]').click();
    await expect(card.locator(".project-live")).toContainText(
      "Im Browser spielen",
    );
    await expect(card.locator(".project-source")).toContainText("Quellcode");
  }
  await page.goto("./");
  await page.locator("[data-search]").fill("Call of Shooty");
  const localProject = page.locator("[data-project]:visible");
  await expect(localProject).toHaveCount(1);
  await expect(localProject.locator(".project-source")).toHaveAttribute(
    "href",
    "https://github.com/Pierreg99/futuristic-call-of-shooty",
  );
  await expect(localProject.locator(".project-live")).toHaveCount(0);
});

test("language cards filter the same original inventory", async ({ page }) => {
  await page.goto("docs/public-language-dashboard.html");
  await page.locator('[data-language-card="Unreported"]').click();
  await expect(page.locator("[data-project]:visible")).toHaveCount(
    repositories.filter((repo) => !repo.fork && !repo.language).length,
  );
  await expect(
    page.locator('[data-language-card="Unreported"]'),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator('[data-language-card="Unreported"]').click();
  await expect(page.locator("[data-project]:visible")).toHaveCount(
    originalCount,
  );
});

test("German applies to the interface and persists across navigation", async ({
  page,
}) => {
  await page.goto("./");
  await page.locator('[data-locale="de"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator("#hero-title")).toContainText("Ideen werden Code.");
  await expect(page.locator("[data-search]")).toHaveAttribute(
    "placeholder",
    "Projekte, Sprachen, Ideen suchen…",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("docs/");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator("h1")).toHaveText("Die Gedanken hinter dem Bauen.");
  await page.locator('[data-locale="en"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toHaveText(
    "The thinking behind the building.",
  );
});

test("mobile navigation opens, closes with Escape, and follows section links", async ({
  page,
}, testInfo) => {
  await page.goto("./");
  const menu = page.locator("[data-menu-toggle]");
  if (testInfo.project.name !== "mobile") {
    await expect(menu).toBeHidden();
    await expect(page.locator("#primary-nav")).toBeVisible();
    return;
  }
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.locator("#primary-nav a").filter({ hasText: "Projects" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("motion is deferred and reduced-motion stops active playback", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const mediaRequests = [];
  page.on("request", (request) => {
    if (/\.(mp4|gif)(\?|$)/.test(request.url()))
      mediaRequests.push(request.url());
  });
  await page.goto("./");
  expect(mediaRequests).toEqual([]);
  const frame = page.locator(".hero-visual");
  const button = frame.locator("[data-motion-toggle]");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  expect(mediaRequests.some((url) => url.endsWith("/hero.mp4"))).toBe(true);
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "false");
  await expect(frame.locator("video")).toBeHidden();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(button).toHaveAttribute("aria-pressed", "false");
});

test("every generated route returns HTML and research exports retain original data", async ({
  request,
}) => {
  const manifest = await (await request.get("build-manifest.json")).json();
  for (const route of manifest.pages) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    expect(response.headers()["content-type"], route).toContain("text/html");
  }
  const evaluation = await (
    await request.get("academic-evaluation/dev-team/evaluation.json")
  ).json();
  expect(evaluation.overall_score).toBe(86.5);
  const csv = await (
    await request.get("academic-evaluation/dev-team/evaluation.csv")
  ).text();
  expect(csv).toContain('"Research & Evaluation"');
  expect(csv).toContain('"92"');
});

test("archived Markdown opens as a readable document with usable tables", async ({
  page,
}) => {
  await page.goto("docs/de/PROFILE-DE.html");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator(".prose")).toBeVisible();
  await expect(page.locator(".archive-notice")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("unknown nested routes show a styled 404 and return to the workspace", async ({
  page,
}) => {
  const response = await page.goto("docs/missing/page");
  expect(response.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("A little off the map.");
  expect(
    await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).backgroundColor),
  ).toBe("rgb(8, 14, 22)");
  await page.getByRole("link", { name: "Back to the workspace" }).click();
  await expect(page.locator("#hero-title")).toBeVisible();
});

test("the public content remains available without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.locator("h1")).toContainText("Ideas into code.");
  await expect(page.locator("[data-project]")).toHaveCount(repositories.length);
  await expect(page.locator("#primary-nav")).toBeVisible();
  await context.close();
});
