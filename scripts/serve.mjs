import { createServer } from "node:http";
import { stat, readFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const argument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};
const port = Number(argument("--port", process.env.PORT || "4173"));
const base = argument("--base", "").replace(/\/$/, "");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
  ".csv": "text/csv; charset=utf-8",
  ".ics": "text/calendar; charset=utf-8",
  ".zip": "application/zip",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    const canonicalBase = "/Pierreg99-Pierreg99-Profile-Page";
    const requestBase =
      base ||
      (pathname === canonicalBase || pathname.startsWith(canonicalBase + "/")
        ? canonicalBase
        : "");
    if (pathname !== requestBase && !pathname.startsWith(requestBase + "/")) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    const path = resolve(
      root,
      "." + (pathname.slice(requestBase.length) || "/"),
    );
    if (path !== root && !path.startsWith(root + sep)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    let file = path;
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith("/")) {
        response.writeHead(308, { Location: pathname + "/" + url.search });
        response.end();
        return;
      }
      file = resolve(file, "index.html");
    }
    const info = await stat(file);
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    const headers = {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "Accept-Ranges": "bytes",
    };
    if (range) {
      const start = Number(range[1]);
      const end = Math.min(Number(range[2] || info.size - 1), info.size - 1);
      if (start > end || start >= info.size) {
        response.writeHead(416, { "Content-Range": `bytes */${info.size}` });
        response.end();
        return;
      }
      response.writeHead(206, {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${info.size}`,
        "Content-Length": end - start + 1,
      });
      if (request.method === "HEAD") response.end();
      else createReadStream(file, { start, end }).pipe(response);
    } else {
      response.writeHead(200, { ...headers, "Content-Length": info.size });
      if (request.method === "HEAD") response.end();
      else createReadStream(file).pipe(response);
    }
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    try {
      response.end(await readFile(resolve(root, "404.html")));
    } catch {
      response.end("Run npm run build before starting the preview.");
    }
  }
});

server.listen(port, "0.0.0.0", () =>
  console.log(`CRYO preview: http://localhost:${port}${base}/`),
);
