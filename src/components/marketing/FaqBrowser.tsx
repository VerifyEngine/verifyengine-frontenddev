"use client";

import Link from "next/link";
import { Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { EmptyState } from "@/components/ui/Feedback";
import { faqCategories, faqs } from "@/lib/faq";

/**
 * FAQ browser: a category rail plus a live search box, both narrowing the same
 * accordion list. Search and filter are combined, so a query inside a category
 * only matches within it.
 */
export function FaqBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((entry) => {
      const inCategory = category === "all" || entry.category === category;
      const matchesQuery =
        !q ||
        entry.question.toLowerCase().includes(q) ||
        entry.answer.toLowerCase().includes(q);
      return inCategory && matchesQuery;
    });
  }, [query, category]);

  const activeCategoryLabel =
    faqCategories.find((c) => c.id === category)?.label ?? "All Questions";

  return (
    <>
      {/* Search sits in the navy hero, above the fold. */}
      <div className="bg-navy-900 pb-16 sm:pb-20">
        <Container>
          <div className="relative max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              aria-label="Search questions"
              className="w-full rounded-xl bg-white py-4 pr-14 pl-5 text-sm text-ink-900 placeholder:text-slate-400 focus:ring-2 focus:ring-mint-200 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {/* Trailing, like the design and the blog search — decorative, since
                the field is labelled and filtering happens as you type. */}
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-5 size-5 -translate-y-1/2 text-navy-900"
              strokeWidth={2}
            />
          </div>
        </Container>
      </div>

      <section className="bg-bg-muted py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* category rail */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <nav className="overflow-hidden rounded-2xl bg-white p-2 shadow-card">
                {faqCategories.map((item) => {
                  const isActive = item.id === category;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id)}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-mint-100 text-teal-700"
                          : "text-slate-600 hover:bg-bg-muted hover:text-ink-900"
                      }`}
                    >
                      <item.icon
                        className={`size-4.5 shrink-0 ${isActive ? "text-teal-600" : "text-slate-400"}`}
                        strokeWidth={1.75}
                      />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 rounded-2xl bg-white p-6 shadow-card">
                <p className="text-base font-bold text-ink-900">Still have questions?</p>
                <p className="mt-1.5 text-sm text-slate-500">
                  Our team is here to help you find the answers you need.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-teal-600 transition-colors hover:border-teal-500"
                >
                  Contact Support <ArrowRight />
                </Link>
              </div>
            </div>

            {/* results */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-bold text-ink-900">
                  {category === "all" && !query ? "Top Questions" : activeCategoryLabel}
                </h2>
                <p className="text-sm text-slate-500">
                  {results.length} {results.length === 1 ? "question" : "questions"}
                </p>
              </div>

              <div className="mt-6">
                {results.length > 0 ? (
                  <Accordion
                    // Remounts on filter change so the open row resets to the
                    // first result rather than a stale index.
                    key={`${category}-${query}`}
                    variant="cards"
                    items={results.map((entry) => ({
                      question: entry.question,
                      answer: entry.answer,
                    }))}
                  />
                ) : (
                  <div className="rounded-2xl bg-white shadow-card">
                    <EmptyState
                      icon={SearchX}
                      title="No questions found"
                      description={`Nothing matches "${query}". Try a different search or browse another category.`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
