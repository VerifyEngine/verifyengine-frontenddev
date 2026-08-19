import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight as ArrowRightIcon, ShieldCheck } from "lucide-react";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Navigation";
import { CoverArt } from "@/components/sections/CoverArt";
import { ArticleToc } from "@/components/marketing/ArticleToc";
import { NewsletterCard } from "@/components/marketing/NewsletterCard";
import { blogPosts, formatPostDate, getPost, relatedPosts } from "@/lib/blog";

/** Stable anchor id for a section heading, shared by the TOC and the article. */
function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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

  const toc = post.body.map((section) => ({
    id: headingId(section.heading),
    label: section.heading,
  }));

  const related = relatedPosts(slug);
  const index = blogPosts.findIndex((p) => p.slug === slug);
  const previous = blogPosts[index - 1];
  const next = blogPosts[index + 1];

  return (
    <>
      <div className="bg-navy-900 py-5">
        <Container>
          <div className="[&_a]:text-white/50 [&_a:hover]:text-mint-200 [&_span[aria-current]]:text-white">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.category, href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>
        </Container>
      </div>

      <div className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] lg:gap-14">
            {/* article */}
            <article className="min-w-0">
              <p className="inline-block rounded-md bg-mint-100 px-2.5 py-1 text-xs font-semibold tracking-wide text-teal-700 uppercase">
                {post.category}
              </p>
              <h1 className="mt-4 text-3xl leading-[1.15] font-bold tracking-tight text-ink-900 sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{post.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-slate-100 py-4">
                <div className="flex items-center gap-3">
                  <span className="size-10 shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-navy-700" />
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">
                      By {post.author.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {formatPostDate(post.date)} · {post.readingMinutes} min read
                    </span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">{post.author.role}</p>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl">
                <CoverArt category={post.category} className="aspect-16/9" />
              </div>

              <div className="mt-10 space-y-10">
                {post.body.map((section) => (
                  <section key={section.heading}>
                    <h2
                      id={headingId(section.heading)}
                      className="scroll-mt-28 text-2xl font-bold text-ink-900"
                    >
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph, i) => (
                        <p key={i} className="text-base leading-relaxed text-slate-600">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* inline CTA */}
              <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl bg-bg-mint-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="hidden size-12 shrink-0 items-center justify-center rounded-full bg-white text-teal-600 sm:flex">
                    <ShieldCheck className="size-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-base font-bold text-ink-900">
                      The future of verification is here. Are you ready?
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      See how Verify Engine can transform your screening process today.
                    </p>
                  </div>
                </div>
                <Button href="/book-demo" variant="primary" className="shrink-0">
                  Book a Demo <ArrowRight />
                </Button>
              </div>

              {/* prev / next */}
              {(previous || next) && (
                <nav className="mt-10 grid grid-cols-1 gap-6 border-t border-slate-100 pt-8 sm:grid-cols-2">
                  {previous ? (
                    <Link href={`/blog/${previous.slug}`} className="group">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                        <ArrowLeft className="size-3.5" strokeWidth={2} /> Previous Article
                      </span>
                      <span className="mt-2 block text-sm font-semibold text-ink-900 group-hover:text-teal-700">
                        {previous.title}
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next && (
                    <Link href={`/blog/${next.slug}`} className="group sm:text-right">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 sm:justify-end">
                        Next Article <ArrowRightIcon className="size-3.5" strokeWidth={2} />
                      </span>
                      <span className="mt-2 block text-sm font-semibold text-ink-900 group-hover:text-teal-700">
                        {next.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}
            </article>

            {/* sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-100 p-6">
                <ArticleToc items={toc} />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-100 p-6">
                <p className="text-base font-bold text-ink-900">Related Articles</p>
                <ul className="mt-4 space-y-5">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/blog/${item.slug}`} className="group flex gap-3.5">
                        <span className="w-20 shrink-0 overflow-hidden rounded-lg">
                          <CoverArt category={item.category} className="aspect-4/3" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] font-semibold tracking-wide text-teal-600 uppercase">
                            {item.category}
                          </span>
                          <span className="mt-1 block text-sm leading-snug font-semibold text-ink-900 group-hover:text-teal-700">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-xs text-slate-400">
                            {formatPostDate(item.date)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <NewsletterCard />
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}
