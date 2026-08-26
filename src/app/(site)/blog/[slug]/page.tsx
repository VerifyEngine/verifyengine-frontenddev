import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/sections/ArticlePage";
import { blogPosts, formatPostDate, getPost, relatedPosts } from "@/lib/blog";

/**
 * Every post is known at build time, so an unlisted slug is genuinely not a
 * page. Without this, Next renders unknown slugs on demand and the not-found
 * body is served with a 200 status, which search engines would index.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = blogPosts.findIndex((p) => p.slug === slug);
  const previous = blogPosts[index - 1];
  const next = blogPosts[index + 1];

  return (
    <ArticlePage
      config={{
        breadcrumb: [
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category, href: "/blog" },
          { label: post.title },
        ],
        eyebrow: post.category,
        title: post.title,
        lead: post.excerpt,
        byline: {
          name: `By ${post.author.name}`,
          detail: `${formatPostDate(post.date)} · ${post.readingMinutes} min read`,
          trailing: post.author.role,
        },
        coverCategory: post.category,
        body: post.body,
        cta: {
          title: "The future of verification is here. Are you ready?",
          description: "See how Verify Engine can transform your screening process today.",
          href: "/book-demo",
          label: "Book a Demo",
        },
        previous: previous && { href: `/blog/${previous.slug}`, title: previous.title },
        next: next && { href: `/blog/${next.slug}`, title: next.title },
        pieceLabel: "Article",
        relatedTitle: "Related Articles",
        related: relatedPosts(slug).map((item) => ({
          href: `/blog/${item.slug}`,
          eyebrow: item.category,
          title: item.title,
          meta: formatPostDate(item.date),
          coverCategory: item.category,
        })),
      }}
    />
  );
}
