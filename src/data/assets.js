import { projectDetails } from "./projects.js";

export const motionAssets = [
  {
    name: "cryo-pulse",
    title: "CRYO Pulse",
    poster: "pulse",
    category: "IDENTITY / STATUS",
    description:
      "A luminous core and concentric pulses form the CRYO identity in motion.",
  },
  {
    name: "cryo-orbit",
    title: "CRYO Orbit",
    poster: "orbit",
    category: "ENGINEERING / SYSTEMS",
    description:
      "Orbital rings describe the connections between ideas, technologies, and systems.",
  },
  {
    name: "cryo-memory",
    title: "Memory",
    poster: "flagships/memory",
    category: "CONCEPT / MEMORY",
    description: "Layers of ice-glass tiles connected by cyan light.",
  },
  {
    name: "cryo-nexo",
    title: "HUD",
    poster: "flagships/nexo",
    category: "CONCEPT / INTERFACE",
    description: "A holographic interface with a luminous central core.",
  },
  {
    name: "cryo-kiblox",
    title: "Voxel",
    poster: "flagships/kiblox",
    category: "CONCEPT / WORLD",
    description: "A polar landscape built from ice-cyan voxel blocks.",
  },
];

export const vectorAssets = [
  ["cryo-header", "CRYO identity banner"],
  ["immersive-dashboard", "Portfolio system study"],
  ["immersive-orbit", "Engineering orbit study"],
  ["programming-language-symbols-original", "Original language glyphs"],
  ["programming-languages-atlas", "Language atlas"],
  ["language-technology-matrix", "Language & technology matrix"],
  ["public-project-language-profile", "Historical language study"],
  ["stack-icons", "Technology ecosystem"],
  ["stack-map", "Architecture map"],
  ["stack-progress", "Evidence signal study"],
  ["capability-radar", "Capability dimensions"],
  ["delivery-timeline", "Delivery flow"],
  ["project-grid", "Project portfolio study"],
];

export const conceptAssets = [
  ["hero", "CRYO observatory"],
  ["pulse", "Pulse identity"],
  ["orbit", "System orbit"],
  ["mark", "Identity concept"],
  ["flagships/memory", "Memory concept"],
  ["flagships/nexo", "Interface concept"],
  ["flagships/kiblox", "Voxel concept"],
  ["flagships/cryos", "Launcher concept"],
];

export const projectAssets = Object.values(projectDetails)
  .filter((project) => project.image)
  .map((project) => [project.image, project.title]);

export const stillAssets = [...conceptAssets, ...projectAssets];
