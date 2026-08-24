/**
 * Central place for environment configuration.
 *
 * Anything the browser needs must be prefixed `NEXT_PUBLIC_`. Values are read
 * once here so the rest of the codebase never touches `process.env` directly
 * and a missing variable surfaces in one obvious place.
 *
 * See `.env.example` for the full list and how to set them locally.
 */

export const env = {
  /** Base URL of the Verify Engine backend API. */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",

  /**
   * Public origin of the site itself, used for absolute URLs and metadata.
   * `||`, not `??`: a host env var that is set but left blank (e.g. an empty
   * value in the Vercel dashboard) must fall back too, not reach `new URL("")`
   * in the root layout and crash the entire build.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  /** "development" | "staging" | "production" — drives environment banners etc. */
  appEnv: (process.env.NEXT_PUBLIC_APP_ENV ?? "development") as
    | "development"
    | "staging"
    | "production",
} as const;

/**
 * True while no backend API is configured. The marketing site currently runs
 * in this mode: forms validate and show success locally without POSTing
 * anywhere. Once `NEXT_PUBLIC_API_BASE_URL` is set, the API client switches to
 * real requests with no other code change.
 */
export const isApiConfigured = env.apiBaseUrl.length > 0;
