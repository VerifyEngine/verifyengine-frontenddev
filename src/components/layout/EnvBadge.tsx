import { env } from "@/lib/env";

/**
 * A small marker shown on every non-production deployment.
 *
 * Staging serves the same pages on a different origin, and reviewers have no
 * other way to tell which one they are looking at when they land on a link
 * someone pasted. Production renders nothing at all.
 */
export function EnvBadge() {
  if (env.appEnv === "production") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-3 left-3 z-50 rounded-full bg-ink-900/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg"
    >
      {env.appEnv}
    </div>
  );
}
