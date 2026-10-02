import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import {
  motionAssets,
  stillAssets,
  vectorAssets,
} from "../../src/data/assets.js";

test("registered artwork has a canonical local source", async () => {
  for (const [name] of stillAssets)
    await access(new URL(`../../assets/${name}.jpg`, import.meta.url));
  for (const asset of motionAssets) {
    await access(
      new URL(`../../assets/animations/${asset.name}.gif`, import.meta.url),
    );
    assert.ok(stillAssets.some(([name]) => name === asset.poster));
  }
});

test("canonical vectors carry descriptions and scalable coordinates", async () => {
  for (const name of ["cryo-mark", ...vectorAssets.map(([name]) => name)]) {
    const svg = await readFile(
      new URL(`../../assets/${name}.svg`, import.meta.url),
      "utf8",
    );
    assert.match(svg, /viewBox=/, name);
    assert.match(svg, /<title\b[^>]*>[^<]+<\/title>/, name);
    assert.match(svg, /<desc\b[^>]*>[^<]+<\/desc>/, name);
  }
});
