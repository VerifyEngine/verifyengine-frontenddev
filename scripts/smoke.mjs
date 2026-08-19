#!/usr/bin/env node
/**
 * Route smoke test.
 *
 * Walks src/app, derives every static route from the page files, and requests
 * each one against a running server with a hard timeout. Fails the run if any
 * route errors, times out, or is suspiciously slow.
 *
 * This exists because a Server/Client boundary mistake once hung a route
 * indefinitely rather than throwing — the type checker and linter both passed.
 * A hang is only visible by actually asking for the page, so this check does.
 *
 *   npm run smoke                 # against http://localhost:3000
 *   BASE_URL=... npm run smoke    # against another origin
 */

import { readdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS ?? 20000);
const SLOW_MS = Number(process.env.SMOKE_SLOW_MS ?? 8000);
const APP_DIR = path.join(process.cwd(), "src", "app");

/** Collect routes from page.tsx files, skipping dynamic and grouped segments. */
async function collectRoutes(dir, segments = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const name = entry.name;
      // Route groups don't appear in the URL; dynamic segments need real data.
      if (name.startsWith("(") || name.startsWith("[") || name.startsWith("_")) continue;
      routes.push(...(await collectRoutes(path.join(dir, name), [...segments, name])));
    } else if (entry.name === "page.tsx" || entry.name === "page.jsx") {
      routes.push("/" + segments.join("/"));
    }
  }

  return routes;
}

async function check(route) {
  const url = `${BASE_URL}${route === "/" ? "" : route}`;
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    // Drain the body so streamed responses are measured to completion.
    await response.text();
    return { route, status: response.status, ms: Date.now() - started };
  } catch (error) {
    const timedOut = error.name === "AbortError";
    return {
      route,
      status: 0,
      ms: Date.now() - started,
      error: timedOut ? `timed out after ${TIMEOUT_MS}ms` : error.message,
    };
  } finally {
    clearTimeout(timer);
  }
}

const routes = (await collectRoutes(APP_DIR)).sort();
if (routes.length === 0) {
  console.error("No routes found under src/app — is this the right directory?");
  process.exit(1);
}

console.log(`Checking ${routes.length} routes against ${BASE_URL}\n`);

const failures = [];
const slow = [];

// Sequential on purpose: a dev server compiles on demand, and hammering it in
// parallel makes timings meaningless.
for (const route of routes) {
  const result = await check(route);
  const ok = result.status >= 200 && result.status < 400;

  if (!ok) {
    failures.push(result);
    console.log(`  FAIL  ${result.route}  ${result.error ?? `status ${result.status}`}`);
  } else if (result.ms > SLOW_MS) {
    slow.push(result);
    console.log(`  SLOW  ${result.route}  ${result.ms}ms`);
  } else {
    console.log(`  ok    ${result.route}  ${result.ms}ms`);
  }
}

console.log("");
if (failures.length > 0) {
  console.error(`${failures.length} route(s) failed.`);
  process.exit(1);
}
if (slow.length > 0) {
  console.error(`${slow.length} route(s) slower than ${SLOW_MS}ms — investigate before shipping.`);
  process.exit(1);
}
console.log(`All ${routes.length} routes responded.`);
