import { watch } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
let running = false;
let queued = false;
let timer;
function rebuild() {
  if (running) {
    queued = true;
    return Promise.resolve();
  }
  running = true;
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ["scripts/build.mjs"], {
      cwd: root,
      stdio: "inherit",
    });
    child.on("exit", (code) => {
      running = false;
      if (code === 0)
        console.log("Ready. Refresh the browser to see your changes.");
      if (queued) {
        queued = false;
        void rebuild();
      }
      resolve(code);
    });
  });
}
await rebuild();
const server = spawn(
  process.execPath,
  ["scripts/serve.mjs", ...process.argv.slice(2)],
  { cwd: root, stdio: "inherit" },
);
for (const path of [
  "src",
  "assets",
  "docs",
  "reports",
  "academic-evaluation",
  "scripts",
  "README.md",
])
  watch(
    new URL(path, new URL("../", import.meta.url)),
    { recursive: true },
    () => {
      clearTimeout(timer);
      timer = setTimeout(() => void rebuild(), 150);
    },
  );
process.on("SIGINT", () => {
  server.kill("SIGINT");
  process.exit(0);
});
process.on("SIGTERM", () => {
  server.kill("SIGTERM");
  process.exit(0);
});
