import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { ComponentGallery } from "./ComponentGallery";

export const metadata: Metadata = {
  title: "Component library",
  robots: { index: false, follow: false },
};

/**
 * Rendered per request so the environment gate below is evaluated at request
 * time rather than baked in at build time — a staging build and a production
 * run of the same artifact then behave according to their own env.
 */
export const dynamic = "force-dynamic";

/**
 * Internal gallery of every shared component, used to review them in isolation
 * and as living component documentation. Not linked from the site.
 *
 * The gate leads with NODE_ENV, which Next sets to "production" for any
 * production build. Relying on NEXT_PUBLIC_APP_ENV alone left the gallery
 * publicly reachable whenever that variable was simply unset — which is the
 * default. NEXT_PUBLIC_APP_ENV still hides it on a staging build that runs
 * with NODE_ENV=production but should behave like production.
 *
 * Verified in a production build: the gallery is not served, the not-found
 * page is rendered in its place. Note that the response still carries a 200
 * status rather than 404 — the content is hidden, but do not rely on the
 * status code here. The route is also marked noindex above.
 */
export default function ComponentsPage() {
  if (process.env.NODE_ENV === "production" || env.appEnv === "production") notFound();
  return <ComponentGallery />;
}
