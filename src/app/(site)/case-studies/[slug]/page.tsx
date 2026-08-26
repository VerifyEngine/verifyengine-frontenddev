import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/sections/ArticlePage";
import {
  caseStudies,
  formatCaseStudyDate,
  getCaseStudy,
  relatedCaseStudies,
} from "@/lib/case-studies";

/**
 * Case study detail, on the shared long-form template.
 *
 * The results row is the same one the approved listing card shows, carried
 * through at full size; the narrative runs challenge / change / outcome. As
 * with the blog and the guides, every slug is known at build time.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };
  return { title: `${study.company} — ${study.tagline}`, description: study.summary };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((s) => s.slug === slug);
  const previous = caseStudies[index - 1];
  const next = caseStudies[index + 1];

  return (
    <ArticlePage
      config={{
        breadcrumb: [
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: study.industry, href: "/case-studies" },
          { label: study.company },
        ],
        eyebrow: study.industry,
        title: study.company,
        lead: study.summary,
        byline: {
          name: study.tagline,
          detail: formatCaseStudyDate(study.date),
          trailing: study.industry,
        },
        coverCategory: study.industry,
        highlights: study.results,
        body: study.body,
        quote: study.quote,
        profile: study.profile,
        cta: {
          title: "Your success story could be next.",
          description:
            "Join thousands of organizations already achieving greater accuracy, efficiency, and peace of mind.",
          href: "/book-demo",
          label: "Book a Demo",
        },
        previous: previous && {
          href: `/case-studies/${previous.slug}`,
          title: previous.company,
        },
        next: next && { href: `/case-studies/${next.slug}`, title: next.company },
        pieceLabel: "Case Study",
        relatedTitle: "Related Case Studies",
        related: relatedCaseStudies(slug).map((item) => ({
          href: `/case-studies/${item.slug}`,
          eyebrow: item.industry,
          title: item.company,
          meta: item.tagline,
          coverCategory: item.industry,
        })),
      }}
    />
  );
}
