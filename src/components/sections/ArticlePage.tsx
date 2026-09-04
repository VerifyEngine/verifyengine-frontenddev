import Link from "next/link";
import { ArrowLeft, ArrowRight as ArrowRightIcon, Quote, ShieldCheck } from "lucide-react";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Navigation";
import { CoverArt } from "@/components/sections/CoverArt";
import { ArticleToc } from "@/components/marketing/ArticleToc";
import { NewsletterCard } from "@/components/marketing/NewsletterCard";

/**
 * The long-form reading template, extracted from the approved Blog Article
 * screen and shared by every long-form page on the site: blog articles, guides
 * and case studies.
 *
 * Nothing here is a new design. It is the Blog Article layout — navy
 * breadcrumb band, two-column grid with a 340px sticky sidebar, eyebrow pill,
 * lead paragraph, byline rule, cover, anchored sections, the mint inline CTA
 * and prev/next — driven by a config object, the way ProcessPage and
 * AudiencePage already work. `highlights` is the one addition: the results row
 * the approved Case Studies card already shows, carried through to the detail
 * page at full size.
 *
 * Deliberately a Server Component. The two interactive pieces it renders
 * (ArticleToc, NewsletterCard) are client components that take plain data, so
 * no icon component ever crosses the boundary — see AGENTS.md / PROGRESS §6.
 */

/** Stable anchor id for a section heading, shared by the TOC and the article. */
export function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  /** Optional checklist under the prose — used by the how-to guides. */
  bullets?: string[];
};

export type ArticleLink = {
  href: string;
  eyebrow: string;
  title: string;
  meta: string;
  coverCategory: string;
};

export type ArticlePageConfig = {
  breadcrumb: { label: string; href?: string }[];
  eyebrow: string;
  title: string;
  lead: string;
  /** Byline row: who wrote it, when, and how long it takes to read. */
  byline: { name: string; detail: string; trailing?: string };
  coverCategory: string;
  /** Case-study results band, shown between the byline and the cover. */
  highlights?: { value: string; label: string }[];
  body: ArticleSection[];
  /** Pull quote closing the narrative — used by the case studies. */
  quote?: { text: string; name: string; role: string };
  /** "At a glance" panel pinned above the table of contents. */
  profile?: { label: string; value: string }[];
  cta: { title: string; description: string; href: string; label: string };
  previous?: { href: string; title: string };
  next?: { href: string; title: string };
  relatedTitle: string;
  related: ArticleLink[];
  /** Label used on the prev/next rail, e.g. "Article", "Guide". */
  pieceLabel: string;
};

export function ArticlePage({ config }: { config: ArticlePageConfig }) {
  const toc = config.body.map((section) => ({
    id: headingId(section.heading),
    label: section.heading,
  }));

  return (
    <>
      <div className="bg-navy-900 py-5">
        <Container>
          <div className="[&_a]:text-white/50 [&_a:hover]:text-mint-200 [&_span[aria-current]]:text-white">
            <Breadcrumb items={config.breadcrumb} />
          </div>
        </Container>
      </div>

      <div className="bg-white py-12 sm:py-16">
        <Container>
          {/* The block runs the full site column, so the article starts on the
              same left edge as the header and breadcrumb above it and the
              sidebar ends on the same right edge — which is how the design sets
              it. A line of body copy still has to stay readable, so it is the
              article's own measure that is capped, not the block: on a very
              wide window the slack falls between the two columns rather than
              stepping the whole page in from the site's gutter. */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
            <article className="min-w-0 lg:max-w-[880px]">
              <p className="inline-block rounded-md bg-mint-100 px-2.5 py-1 text-xs font-semibold tracking-wide text-teal-700 uppercase">
                {config.eyebrow}
              </p>
              <h1 className="mt-4 text-3xl leading-[1.15] font-bold tracking-tight text-ink-900 sm:text-4xl">
                {config.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{config.lead}</p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-slate-100 py-4">
                <div className="flex items-center gap-3">
                  <span className="size-10 shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-navy-700" />
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">
                      {config.byline.name}
                    </span>
                    <span className="block text-base text-slate-500">{config.byline.detail}</span>
                  </span>
                </div>
                {config.byline.trailing && (
                  <p className="text-base text-slate-400">{config.byline.trailing}</p>
                )}
              </div>

              {config.highlights && (
                <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-slate-100 sm:grid-cols-3">
                  {config.highlights.map((item) => (
                    <div key={item.label} className="bg-bg-mint-50 px-5 py-6 text-center">
                      <dt className="sr-only">{item.label}</dt>
                      <dd>
                        <span className="block text-3xl font-bold text-teal-600">{item.value}</span>
                        <span className="mt-1.5 block text-base leading-snug text-slate-600">
                          {item.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-8 overflow-hidden rounded-2xl">
                <CoverArt category={config.coverCategory} className="aspect-16/9" />
              </div>

              <div className="mt-10 space-y-10">
                {config.body.map((section) => (
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
                    {section.bullets && (
                      <ul className="mt-5 space-y-2.5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-base leading-relaxed text-slate-600">
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-500"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {config.quote && (
                <figure className="mt-12 rounded-2xl bg-navy-900 p-8 sm:p-10">
                  <Quote className="size-8 text-mint-200/50" strokeWidth={1.5} aria-hidden="true" />
                  <blockquote className="mt-4 text-lg leading-relaxed font-medium text-white sm:text-xl">
                    {config.quote.text}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="size-10 shrink-0 rounded-full bg-gradient-to-br from-mint-200 to-teal-500" />
                    <span>
                      <span className="block text-sm font-semibold text-white">
                        {config.quote.name}
                      </span>
                      <span className="block text-base text-white/60">{config.quote.role}</span>
                    </span>
                  </figcaption>
                </figure>
              )}

              <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl bg-bg-mint-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="hidden size-12 shrink-0 items-center justify-center rounded-full bg-white text-teal-600 sm:flex">
                    <ShieldCheck className="size-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-base font-bold text-ink-900">{config.cta.title}</p>
                    <p className="mt-1 text-base text-slate-600">{config.cta.description}</p>
                  </div>
                </div>
                <Button href={config.cta.href} variant="primary" className="shrink-0">
                  {config.cta.label} <ArrowRight />
                </Button>
              </div>

              {(config.previous || config.next) && (
                <nav className="mt-10 grid grid-cols-1 gap-6 border-t border-slate-100 pt-8 sm:grid-cols-2">
                  {config.previous ? (
                    <Link href={config.previous.href} className="group">
                      <span className="flex items-center gap-1.5 text-base font-semibold text-slate-400">
                        <ArrowLeft className="size-3.5" strokeWidth={2} /> Previous{" "}
                        {config.pieceLabel}
                      </span>
                      <span className="mt-2 block text-sm font-semibold text-ink-900 group-hover:text-teal-700">
                        {config.previous.title}
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {config.next && (
                    <Link href={config.next.href} className="group sm:text-right">
                      <span className="flex items-center gap-1.5 text-base font-semibold text-slate-400 sm:justify-end">
                        Next {config.pieceLabel}{" "}
                        <ArrowRightIcon className="size-3.5" strokeWidth={2} />
                      </span>
                      <span className="mt-2 block text-sm font-semibold text-ink-900 group-hover:text-teal-700">
                        {config.next.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              {config.profile && (
                <div className="mb-6 rounded-2xl bg-bg-mint-50 p-6">
                  <p className="text-base font-bold text-ink-900">At a Glance</p>
                  <dl className="mt-4 space-y-3.5">
                    {config.profile.map((item) => (
                      <div key={item.label}>
                        <dt className="text-xs font-semibold tracking-wide text-teal-700 uppercase">
                          {item.label}
                        </dt>
                        <dd className="mt-0.5 text-base text-slate-600">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="rounded-2xl border border-slate-100 p-6">
                <ArticleToc items={toc} />
              </div>

              {config.related.length > 0 && (
                <div className="mt-6 rounded-2xl border border-slate-100 p-6">
                  <p className="text-base font-bold text-ink-900">{config.relatedTitle}</p>
                  <ul className="mt-4 space-y-5">
                    {config.related.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="group flex gap-3.5">
                          <span className="w-20 shrink-0 overflow-hidden rounded-lg">
                            <CoverArt category={item.coverCategory} className="aspect-4/3" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold tracking-wide text-teal-600 uppercase">
                              {item.eyebrow}
                            </span>
                            <span className="mt-1 block text-sm leading-snug font-semibold text-ink-900 group-hover:text-teal-700">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-base text-slate-400">{item.meta}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
