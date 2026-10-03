import { projectDetails } from "../data/projects.js";

export function enrichProjects(repositories) {
  return repositories
    .map((repo) => {
      const details = projectDetails[repo.name] ?? {};
      return {
        ...repo,
        ...details,
        title:
          details.title ??
          repo.name.replace(/-OMEGA-FORKS?$/i, "").replaceAll("-", " "),
        domain: details.domain ?? (repo.fork ? "ecosystem" : "systems"),
        description:
          details.description ??
          (repo.description ||
            (repo.fork
              ? "Public fork · upstream project in the CRYO ecosystem."
              : "An open project in the CRYO ecosystem.")),
        descriptionDe:
          details.descriptionDe ??
          (repo.description ||
            (repo.fork
              ? "Öffentlicher Fork · Upstream-Projekt im CRYO-Ökosystem."
              : "Ein offenes Projekt im CRYO-Ökosystem.")),
      };
    })
    .sort(
      (a, b) =>
        (a.featured ?? 99) - (b.featured ?? 99) ||
        a.title.localeCompare(b.title),
    );
}

export function languageDistribution(repositories, originalsOnly = true) {
  const scoped = repositories.filter((repo) => !originalsOnly || !repo.fork);
  const counts = new Map();
  for (const repo of scoped) {
    const language = repo.language || "Unreported";
    counts.set(language, (counts.get(language) ?? 0) + 1);
  }
  return [...counts]
    .map(([language, count]) => ({
      language,
      count,
      share: scoped.length ? (count / scoped.length) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count || a.language.localeCompare(b.language));
}

export function matchesProject(
  project,
  { query = "", domain = "all", language = "all", scope = "all" } = {},
) {
  const text = [
    project.title,
    project.name,
    project.description,
    project.descriptionDe,
    project.language,
    ...(project.tags ?? []),
    ...(project.topics ?? []),
  ]
    .join(" ")
    .toLocaleLowerCase();
  return (
    (domain === "all" || project.domain === domain) &&
    (language === "all" || (project.language || "Unreported") === language) &&
    (scope === "all" ||
      (scope === "originals" ? !project.fork : project.fork)) &&
    query
      .trim()
      .toLocaleLowerCase()
      .split(/\s+/)
      .every((word) => text.includes(word))
  );
}
