# Verify Engine — Frontend

The frontend for Verify Engine: an AI-powered verification platform for landlords,
employers, and lenders.

This repository holds the public website — the marketing, product, industry, and resource
pages, built from the approved design package.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS v4, with design tokens defined in `src/app/globals.css` |
| Motion | Motion (`motion/react`) |
| Icons | Lucide (site chrome) and Tabler (product mockups) |
| Type | Public Sans (body), Poppins (display), Satoshi (product mockups, self-hosted) |

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev
```

The site runs at <http://localhost:3000>.

## Environment variables

All variables are documented in `.env.example`. Anything the browser reads must be prefixed
`NEXT_PUBLIC_`. They are read in one place, `src/lib/env.ts`, so a missing value surfaces
there rather than deep in a component.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the Verify Engine backend API. Leave empty while the backend is still being built: the API client then returns the mock each call site supplies, so forms and dashboards keep working. Setting it switches every call to real requests, with no code change. |
| `NEXT_PUBLIC_SITE_URL` | Public origin of the site. Used for absolute URLs, metadata, sitemap, and robots. |
| `NEXT_PUBLIC_APP_ENV` | `development`, `staging`, or `production`. Drives the environment badge and keeps non-production environments out of search results. |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload. |
| `npm run build` | Production build. |
| `npm start` | Serves the production build (run `build` first). |
| `npm run lint` | ESLint. |
| `npm run lint:boundaries` | Checks that no icon component is passed as a prop across a Server/Client boundary — a mistake that hangs a route without failing the type check. |
| `npm run verify` | `lint` + `lint:boundaries` + `tsc --noEmit`. Run this before every commit. |
| `npm run smoke` | Requests every route against a running server with a hard timeout and fails on any error, hang, or unusually slow response. Needs a server up: `npm run dev` (or `npm start`) in another terminal. Point it elsewhere with `BASE_URL=https://... npm run smoke`. |

## Project structure

```
src/
  app/                     Routes (App Router). (site) groups every public page
                           under the shared header/footer layout.
    globals.css            Design tokens, typography scale, shared utilities.
    sitemap.ts, robots.ts  Generated from the route list.
  components/
    layout/                Header, footer, logo.
    ui/                    The shared system: buttons, forms and inputs, modal,
                           table, toasts, alerts, loading/empty/error states,
                           navigation, accordion, reveal animations.
    marketing/             Page-level sections and the product mockups.
    sections/              Reusable page shells (article, legal, company,
                           audience and process pages).
  lib/                     Content sources, the API client, environment config,
                           form handling and validation.
  fonts/                   Self-hosted Satoshi files.
scripts/                   The checks behind `lint:boundaries` and `smoke`.
public/images/             Static images.
```

Two conventions worth knowing before editing:

- **Product mockups are drawn in markup, not images.** The screens shown across the site are
  built from the shared primitives in `src/components/marketing/PlatformMock.tsx`, using the
  platform's own tokens, type, and icon set. They stay sharp at any size, cost nothing to
  load, and update with the product.
- **Server Components by default.** Only components that need state, effects, or browser APIs
  carry `"use client"`. Icon *components* must never be passed as props into a Client
  Component — render them instead. `npm run lint:boundaries` enforces this.

## Backend integration

The site talks to the backend in six places, all typed in
`src/lib/api-endpoints.ts` and specified in **[docs/api-contract.md](docs/api-contract.md)**:
request and response shapes, status codes, the error format, and the questions
still open with the backend team.

Until `NEXT_PUBLIC_API_BASE_URL` is set, each call resolves against a mock of the
same type, so every form works end to end locally. Setting the variable switches
all of them to real requests with no code change. In production, a submission
with no API configured fails visibly rather than pretending to succeed.

## Content

Blog posts, guides, case studies, glossary terms, and FAQ entries are data, not pages: each
lives in a file under `src/lib/` and is rendered through one reusable template. Adding an
entry means adding an object to that list — no layout work, and no new route file.

## Deployment

The project is a standard Next.js application and deploys to Vercel with no custom
configuration:

1. Create a project pointing at this repository.
2. Set the three environment variables above for each environment. Use `production` for
   `NEXT_PUBLIC_APP_ENV` only on the production deployment — every other value keeps the
   environment out of search engines.
3. Build command `npm run build`, output handled by the Vercel Next.js runtime.

Any host that runs a Node.js server works too: `npm run build` followed by `npm start`.

## Browser support

Current versions of Chrome, Safari, Edge, and Firefox, plus mobile Safari and Chrome. Layouts
are responsive from 360px up.
