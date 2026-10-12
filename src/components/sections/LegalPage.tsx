import { Fragment, type ReactNode } from "react";
import { Container } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Navigation";
import { ArticleToc } from "@/components/marketing/ArticleToc";

/** A paragraph that opens with a bolded term, as in "Essential Cookies: Used for…". */
export type LegalTerm = { term: string; text: string };

/**
 * One piece of a section, in the order the client's document gives it.
 *
 * - a string is a paragraph;
 * - `term` is a paragraph led by a bold term;
 * - `subheading` is a lettered or named sub-part ("A. Information You Provide");
 * - `list` is a bulleted list, whose items may also lead with a bold term;
 * - `lines` is an address or contact block, one line each;
 * - `node` is anything else the page draws itself.
 */
export type LegalBlock =
  | string
  | LegalTerm
  | { subheading: string }
  | { list: (string | LegalTerm)[] }
  | { lines: string[] }
  | { node: ReactNode };

export type LegalSection = {
  heading: string;
  content: LegalBlock[];
  /** False for the documents' unnumbered parts, such as a closing contact block. */
  numbered?: boolean;
};

/** Stable anchor id shared by the on-page nav and the section headings. */
export function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Email addresses and full URLs in the documents become links.
const LINKABLE = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|https?:\/\/[^\s]+?(?=[.,;)]?(?:\s|$)))/g;

function Linked({ text }: { text: string }) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    const href = part.includes("@") ? `mailto:${part}` : part;
    return (
      <a
        key={i}
        href={href}
        className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-600"
      >
        {part}
      </a>
    );
  });
}

function TermText({ item }: { item: string | LegalTerm }) {
  if (typeof item === "string") return <Linked text={item} />;
  return (
    <>
      <strong className="font-semibold text-ink-900">{item.term}</strong>{" "}
      <Linked text={item.text} />
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string" || "term" in block) {
    return (
      <p className="text-base leading-relaxed text-slate-600">
        <TermText item={block} />
      </p>
    );
  }
  if ("subheading" in block) {
    return <h3 className="pt-2 text-lg font-semibold text-ink-900">{block.subheading}</h3>;
  }
  if ("list" in block) {
    return (
      <ul className="space-y-2">
        {block.list.map((item) => (
          <li
            key={typeof item === "string" ? item : item.term}
            className="flex items-start gap-2.5 text-base leading-relaxed text-slate-600"
          >
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal-500" />
            <span>
              <TermText item={item} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if ("lines" in block) {
    return (
      <address className="rounded-xl border border-slate-100 bg-bg-muted px-5 py-4 text-base leading-relaxed text-slate-600 not-italic">
        {block.lines.map((line, i) => (
          <span key={i} className={`block ${i === 0 ? "font-semibold text-ink-900" : ""}`}>
            <Linked text={line} />
          </span>
        ))}
      </address>
    );
  }
  return <>{block.node}</>;
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

/**
 * Shared layout for the legal pages: a sticky on-page index beside numbered
 * prose sections. Each page supplies only its title, dates and sections.
 */
export function LegalPage({
  title,
  effectiveDate,
  lastUpdated,
  intro = [],
  sections,
}: {
  title: string;
  effectiveDate?: string;
  lastUpdated: string;
  intro?: LegalBlock[];
  sections: LegalSection[];
}) {
  let n = 0;
  const numbered = sections.map((section) =>
    section.numbered === false ? section.heading : `${++n}. ${section.heading}`,
  );
  const toc = sections.map((section, i) => ({
    id: sectionId(section.heading),
    label: numbered[i],
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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-100 p-5">
                <ArticleToc items={toc} />
              </div>
            </aside>

            <article className="min-w-0 lg:max-w-[880px]">
              <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-2 flex flex-wrap gap-x-5 text-base text-slate-500">
                {effectiveDate && <span>Effective date: {effectiveDate}</span>}
                <span>Last updated: {lastUpdated}</span>
              </p>
              {intro.length > 0 && (
                <div className="mt-6">
                  <Blocks blocks={intro} />
                </div>
              )}

              <div className="mt-10 space-y-10">
                {sections.map((section, i) => (
                  <section key={section.heading}>
                    <h2
                      id={sectionId(section.heading)}
                      className="scroll-mt-28 text-xl font-bold text-ink-900"
                    >
                      {numbered[i]}
                    </h2>
                    <div className="mt-3">
                      <Blocks blocks={section.content} />
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </div>
    </>
  );
}
