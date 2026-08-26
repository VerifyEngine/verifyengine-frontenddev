import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/sections/ArticlePage";
import { formatGuideDate, getGuide, guideReadingMinutes, guides, relatedGuides } from "@/lib/guides";

/**
 * Guide detail, on the shared long-form template.
 *
 * Like the blog, every guide is known at build time — an unlisted slug is
 * genuinely not a page, and without `dynamicParams = false` Next would serve
 * the not-found body with a 200 status for search engines to index.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const index = guides.findIndex((g) => g.slug === slug);
  const previous = guides[index - 1];
  const next = guides[index + 1];

  return (
    <ArticlePage
      config={{
        breadcrumb: [
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.category, href: "/guides" },
          { label: guide.title },
        ],
        eyebrow: guide.category,
        title: guide.title,
        lead: guide.excerpt,
        byline: {
          name: "Verify Engine Team",
          detail: `${formatGuideDate(guide.date)} · ${guideReadingMinutes(guide)} min read`,
          trailing: guide.category,
        },
        coverCategory: guide.category,
        body: guide.body,
        cta: {
          title: "Need help implementing what you've learned?",
          description: "Our team is here to help you get the most out of Verify Engine.",
          href: "/book-demo",
          label: "Book a Demo",
        },
        previous: previous && { href: `/guides/${previous.slug}`, title: previous.title },
        next: next && { href: `/guides/${next.slug}`, title: next.title },
        pieceLabel: "Guide",
        relatedTitle: "Related Guides",
        related: relatedGuides(slug).map((item) => ({
          href: `/guides/${item.slug}`,
          eyebrow: item.category,
          title: item.title,
          meta: `${guideReadingMinutes(item)} min read`,
          coverCategory: item.category,
        })),
      }}
    />
  );
}
