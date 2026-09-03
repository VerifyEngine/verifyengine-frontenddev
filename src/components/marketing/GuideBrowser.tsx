"use client";

import { Clock, Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/Feedback";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CoverArt } from "@/components/sections/CoverArt";
import Link from "next/link";
import { guideCategories, guideReadingMinutes, guides } from "@/lib/guides";

/**
 * Guides listing. Search lives in the hero above, so the whole page shares
 * this component's state.
 */
export function GuideBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<"recent" | "shortest">("recent");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = guides.filter((guide) => {
      const inCategory = category === "all" || guide.category === category;
      const matches =
        !q || guide.title.toLowerCase().includes(q) || guide.excerpt.toLowerCase().includes(q);
      return inCategory && matches;
    });

    return [...filtered].sort((a, b) =>
      sort === "recent"
        ? b.date.localeCompare(a.date)
        : guideReadingMinutes(a) - guideReadingMinutes(b),
    );
  }, [query, category, sort]);

  return (
    <>
      <div className="bg-navy-900 pb-16 sm:pb-20">
        <Container>
          <div className="relative max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides..."
              aria-label="Search guides"
              className="w-full rounded-xl bg-white py-4 pr-14 pl-5 text-base text-ink-900 placeholder:text-slate-400 focus:ring-2 focus:ring-mint-200 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {/* Trailing, like the design — decorative, since the field is
                labelled and filtering happens as you type. */}
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-5 size-5 -translate-y-1/2 text-navy-900"
              strokeWidth={2}
            />
          </div>
        </Container>
      </div>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <FilterPill active={category === "all"} onClick={() => setCategory("all")}>
                All Guides
              </FilterPill>
              {guideCategories.map((item) => (
                <FilterPill
                  key={item}
                  active={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </FilterPill>
              ))}
            </div>

            <div className="shrink-0 lg:w-52">
              <Select
                aria-label="Sort guides"
                value={sort}
                onChange={(e) => setSort(e.target.value as "recent" | "shortest")}
              >
                <option value="recent">Most Recent</option>
                <option value="shortest">Shortest Read</option>
              </Select>
            </div>
          </div>

          {results.length > 0 ? (
            <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((guide) => (
                <RevealItem key={guide.slug}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow duration-200 hover:shadow-card">
                    <CoverArt category={guide.category} />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="font-semibold tracking-wide text-teal-600 uppercase">
                          {guide.category}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="size-3.5" strokeWidth={2} />
                          {guideReadingMinutes(guide)} min read
                        </span>
                      </p>
                      <h3 className="mt-3 text-lg leading-snug font-bold text-ink-900 group-hover:text-teal-700">
                        {guide.title}
                      </h3>
                      <p className="mt-2.5 text-base leading-relaxed text-slate-600">
                        {guide.excerpt}
                      </p>
                      <Link
                        href={`/guides/${guide.slug}`}
                        className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-teal-600 hover:text-teal-700"
                      >
                        Read Guide <ArrowRight />
                      </Link>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <div className="mt-10 rounded-2xl border border-slate-100">
              <EmptyState
                icon={SearchX}
                title="No guides found"
                description="Try a different search term or browse another category."
              />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-lg px-4 py-2.5 text-base font-medium whitespace-nowrap transition-colors ${
        active
          ? "bg-navy-900 text-white"
          : "border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600"
      }`}
    >
      {children}
    </button>
  );
}
