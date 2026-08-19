import type { ReactNode } from "react";
import { Container } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Navigation";
import { ArticleToc } from "@/components/marketing/ArticleToc";

export type LegalSection = {
  heading: string;
  /** Body paragraphs; optional bullet list rendered after them. */
  paragraphs: string[];
  bullets?: string[];
};

/** Stable anchor id shared by the on-page nav and the section headings. */
export function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Shared layout for the legal pages: a sticky on-page index beside numbered
 * prose sections. Each page supplies only its title, date and sections.
 */
export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
  children,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  /** Extra content rendered after the sections, e.g. the accessibility cards. */
  children?: ReactNode;
}) {
  const toc = sections.map((section, i) => ({
    id: sectionId(section.heading),
    label: `${i + 1}. ${section.heading}`,
  }));

  return (
    <>
      <div className="bg-navy-900 py-5">
        <Container>
          <div className="[&_a]:text-white/50 [&_a:hover]:text-mint-200 [&_span[aria-current]]:text-white">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Legal", href: "/sitemap" },
                { label: title },
              ]}
            />
          </div>
        </Container>
      </div>

      <div className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:gap-14">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-100 p-5">
                <p className="mb-1 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  On this page
                </p>
                <ArticleToc items={toc} />
              </div>
            </aside>

            <article className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-slate-500">Last updated: {lastUpdated}</p>
              <p className="mt-6 text-base leading-relaxed text-slate-600">{intro}</p>

              <div className="mt-10 space-y-10">
                {sections.map((section, i) => (
                  <section key={section.heading}>
                    <h2
                      id={sectionId(section.heading)}
                      className="scroll-mt-28 text-xl font-bold text-ink-900"
                    >
                      {i + 1}. {section.heading}
                    </h2>
                    <div className="mt-3 space-y-3">
                      {section.paragraphs.map((paragraph, p) => (
                        <p key={p} className="text-base leading-relaxed text-slate-600">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets && (
                      <ul className="mt-4 space-y-2">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-base text-slate-600"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-500" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {children}
            </article>
          </div>
        </Container>
      </div>
    </>
  );
}
