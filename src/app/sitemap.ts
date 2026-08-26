import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { allSiteMapPaths } from "@/lib/site-map";
import { blogPosts } from "@/lib/blog";
import { guides } from "@/lib/guides";
import { caseStudies } from "@/lib/case-studies";

/**
 * Machine-readable sitemap served at `/sitemap.xml`.
 *
 * The design's Sitemap screen carries a "Download Sitemap XML" button, so this
 * route has to exist for that button to lead anywhere. It shares its page list
 * with the human-readable `/sitemap` page through `lib/site-map`, and appends
 * the blog articles, which the on-page version summarises as a single Blog
 * entry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl.replace(/\/$/, "");

  const pages = allSiteMapPaths().map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    // The homepage is the entry point; everything else sits below it.
    priority: path === "/" ? 1 : 0.7,
  }));

  // Long-form detail pages, which the on-page sitemap summarises as their
  // three index entries rather than listing item by item.
  const articles = [
    ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, date: post.date })),
    ...guides.map((guide) => ({ path: `/guides/${guide.slug}`, date: guide.date })),
    ...caseStudies.map((study) => ({ path: `/case-studies/${study.slug}`, date: study.date })),
  ].map((item) => ({
    url: `${base}${item.path}`,
    lastModified: new Date(item.date),
    priority: 0.5,
  }));

  return [...pages, ...articles];
}
