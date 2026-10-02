import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files.sort();
}

export function csv(rows) {
  return (
    rows
      .map((row) =>
        row
          .map((value) => {
            // Keep text cells inert when the export is opened in spreadsheet software.
            const cell = String(value);
            const safe = /^[=+@-]/.test(cell) ? `'${cell}` : cell;
            return `"${safe.replaceAll('"', '""')}"`;
          })
          .join(","),
      )
      .join("\r\n") + "\r\n"
  );
}
