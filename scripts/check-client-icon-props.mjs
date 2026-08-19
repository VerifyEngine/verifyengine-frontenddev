#!/usr/bin/env node
/**
 * Guards the Server/Client boundary against icon component props.
 *
 * Handing a Lucide icon *component* to a Client Component makes React emit a
 * client reference for it. When the same icon is also rendered from a Server
 * Component on that page, RSC streaming breaks and the route hangs — no error,
 * no failed type check, just a request that never finishes.
 *
 * The safe patterns are: keep the component that renders icons on the server,
 * declare the icons inside the client module itself, or pass already-rendered
 * nodes (ReactNode) instead of components.
 *
 * Only shapes a *caller* can fill are flagged: exported types/interfaces and
 * inline props annotations. Icons declared in a client module's own constants
 * never cross the boundary and are left alone.
 *
 * Run via `npm run lint:boundaries`.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.join(process.cwd(), "src");
const ICON_PROP = /\b(icon|Icon)s?\s*\??\s*:\s*(LucideIcon|typeof\s+[A-Z]\w*)\b/;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

/**
 * Returns the source slice from `start` through its balanced closing brace.
 * Bails out when a statement ends first, so a brace-less declaration such as
 * `export type X = "a" | "b";` doesn't swallow whatever block follows it.
 */
function blockFrom(source, start) {
  const open = source.indexOf("{", start);
  if (open === -1) return "";
  if (source.slice(start, open).includes(";")) return "";
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) return source.slice(open, i + 1);
    }
  }
  return source.slice(open);
}

function lineOf(source, index) {
  return source.slice(0, index).split("\n").length;
}

const problems = [];

for (const file of await walk(SRC)) {
  const source = await readFile(file, "utf8");
  if (!/^\s*["']use client["']/m.test(source)) continue;

  const regions = [];

  // Exported type/interface declarations — callers build objects from these.
  for (const match of source.matchAll(/export\s+(?:type|interface)\s+\w+[^{]*/g)) {
    regions.push({ index: match.index, code: blockFrom(source, match.index) });
  }

  // Inline props annotations on exported components: `}: { ... }`.
  for (const match of source.matchAll(/\}\s*:\s*(?=\{)/g)) {
    regions.push({ index: match.index, code: blockFrom(source, match.index) });
  }

  for (const region of regions) {
    if (!ICON_PROP.test(region.code)) continue;
    const offending = region.code.split("\n").find((l) => ICON_PROP.test(l)) ?? "";
    problems.push({
      file: path.relative(process.cwd(), file),
      line: lineOf(source, region.index),
      text: offending.trim(),
    });
  }
}

if (problems.length > 0) {
  console.error("Client components must not take icon components as props:\n");
  for (const p of problems) {
    console.error(`  ${p.file}:${p.line}`);
    console.error(`    ${p.text}`);
  }
  console.error(
    "\nMove the icon rendering to a Server Component, declare the icons inside\n" +
      "the client module, or accept ReactNode instead of a component.\n",
  );
  process.exit(1);
}

console.log("Server/Client boundary check passed — no icon components crossing as props.");
