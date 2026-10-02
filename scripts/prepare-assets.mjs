import { readFile, writeFile, mkdir, cp, stat } from "node:fs/promises";
import { join, dirname, relative } from "node:path";
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { optimize } from "svgo";
import { stillAssets, motionAssets } from "../src/data/assets.js";
import { walk } from "./utils.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const cache = join(root, ".cache/optimized-assets");
const sizes = [480, 960, 1440];

function transcode(source, output) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "ffmpeg",
      [
        "-y",
        "-loglevel",
        "error",
        "-i",
        source,
        "-an",
        "-vf",
        "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        "25",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        output,
      ],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
    let error = "";
    child.stderr.on("data", (chunk) => {
      error += chunk;
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`Asset transcode failed: ${error}`)),
    );
  });
}

export async function prepareAssets(outDir = join(root, "dist/assets")) {
  await mkdir(cache, { recursive: true });
  const inputs = [
    ...stillAssets.map(([name]) => `assets/${name}.jpg`),
    ...motionAssets.map((asset) => `assets/animations/${asset.name}.gif`),
  ];
  const hash = createHash("sha256").update(
    "cryo-assets-v1-sharp-webp74-h26425",
  );
  for (const input of inputs) hash.update(await readFile(join(root, input)));
  const fingerprint = hash.digest("hex");
  let cached = "";
  try {
    cached = await readFile(join(cache, "fingerprint"), "utf8");
  } catch {
    /* First build prepares the cache. */
  }
  if (cached !== fingerprint) {
    await mkdir(join(cache, "media/flagships"), { recursive: true });
    await mkdir(join(cache, "motion"), { recursive: true });
    for (const [name] of stillAssets) {
      for (const width of sizes)
        await sharp(join(root, `assets/${name}.jpg`))
          .resize({ width })
          .webp({ quality: 74, effort: 5 })
          .toFile(join(cache, `media/${name}-${width}.webp`));
    }
    for (const asset of motionAssets) {
      const source = join(root, `assets/animations/${asset.name}.gif`);
      await sharp(source, { animated: false })
        .resize({ width: 960 })
        .webp({ quality: 74 })
        .toFile(join(cache, `motion/${asset.name}.webp`));
      await transcode(source, join(cache, `motion/${asset.name}.mp4`));
    }
    await writeFile(join(cache, "fingerprint"), fingerprint);
  }
  await mkdir(outDir, { recursive: true });
  await cp(join(cache, "media"), join(outDir, "media"), { recursive: true });
  await cp(join(cache, "motion"), join(outDir, "motion"), { recursive: true });
  const sourceFiles = (await walk(join(root, "assets"))).filter((file) =>
    file.endsWith(".svg"),
  );
  for (const file of sourceFiles) {
    const svg = await readFile(file, "utf8");
    const result = optimize(svg, {
      path: file,
      plugins: [
        "removeComments",
        "cleanupAttrs",
        "convertColors",
        "convertPathData",
        "sortAttrs",
      ],
    });
    await mkdir(dirname(join(outDir, relative(join(root, "assets"), file))), {
      recursive: true,
    });
    await writeFile(
      join(outDir, relative(join(root, "assets"), file)),
      result.data,
    );
  }
  await cp(join(root, "assets/hero.jpg"), join(outDir, "social-card.jpg"));
  const manifest = {
    schemaVersion: 1,
    widths: sizes,
    stills: [],
    motion: [],
    vectors: [],
  };
  for (const [name, title] of stillAssets) {
    const metadata = await sharp(join(root, `assets/${name}.jpg`)).metadata();
    manifest.stills.push({
      name,
      title,
      width: metadata.width,
      height: metadata.height,
      originalBytes: (await stat(join(root, `assets/${name}.jpg`))).size,
      variants: await Promise.all(
        sizes.map(async (width) => ({
          width,
          path: `media/${name}-${width}.webp`,
          bytes: (await stat(join(outDir, `media/${name}-${width}.webp`))).size,
        })),
      ),
    });
  }
  for (const asset of motionAssets)
    manifest.motion.push({
      name: asset.name,
      originalBytes: (
        await stat(join(root, `assets/animations/${asset.name}.gif`))
      ).size,
      videoBytes: (await stat(join(outDir, `motion/${asset.name}.mp4`))).size,
      path: `motion/${asset.name}.mp4`,
      poster: `motion/${asset.name}.webp`,
    });
  for (const file of sourceFiles)
    manifest.vectors.push({
      path: relative(join(root, "assets"), file),
      bytes: (await stat(join(outDir, relative(join(root, "assets"), file))))
        .size,
    });
  await writeFile(
    join(outDir, "asset-manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  console.log(
    `Assets prepared: ${manifest.stills.length} responsive stills, ${manifest.motion.length} controlled motion studies, ${manifest.vectors.length} accessible vectors.`,
  );
  return manifest;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await prepareAssets();
