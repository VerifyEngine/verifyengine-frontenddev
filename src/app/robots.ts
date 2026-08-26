import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * Only the production deployment may be indexed.
 *
 * Staging serves the same marketing pages on a different origin, so without
 * this guard search engines would index the staging copy and compete with the
 * real site for the same terms. Every non-production environment is closed off
 * entirely; production allows everything except the unlisted component
 * catalogue, which is already gated but should never be crawled either.
 */
export default function robots(): MetadataRoute.Robots {
  if (env.appEnv !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/dev/" },
    sitemap: `${env.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
