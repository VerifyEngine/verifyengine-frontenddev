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
 * and as living component documentation, and to walk a client through what a
 * milestone delivered. Not linked from the site.
 *
 * `next build` sets NODE_ENV to "production" for every deployed build alike —
 * staging and production both — so it alone can't tell them apart. The gate
 * fails closed: any deployed build (`NODE_ENV === "production"`) is blocked
 * *unless* NEXT_PUBLIC_APP_ENV is explicitly "staging". That default-closed
 * shape matters — if NEXT_PUBLIC_APP_ENV is simply left unset on the real
 * production deployment (an easy mistake), it still blocks, rather than
 * failing open the way checking only for "production" would.
 *
 * Verified in a production build: the gallery is not served, the not-found
 * page is rendered in its place. Note that the response still carries a 200
 * status rather than 404 — the content is hidden, but do not rely on the
 * status code here. The route is also marked noindex above.
 */
export default function ComponentsPage() {
  const isDeployedBuild = process.env.NODE_ENV === "production";
  const isStagingDeploy = env.appEnv === "staging";
  if (isDeployedBuild && !isStagingDeploy) notFound();
  return <ComponentGallery />;
}
