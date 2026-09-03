"use client";

import Link from "next/link";
import { ChevronDown, CircleHelp, Search, SearchX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Feedback";
import { glossaryLetters, glossaryTerms } from "@/lib/glossary";

/**
 * Glossary with a letter index and live search. Entries expand in place;
 * everything derives from the term list, so adding a term needs no layout work.
 */
export function GlossaryBrowser() {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);

  const letters = useMemo(() => glossaryLetters(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossaryTerms
      .filter((entry) => {
        const matchesLetter = letter === "all" || entry.term[0].toUpperCase() === letter;
        const matchesQuery =
          !q || entry.term.toLowerCase().includes(q) || entry.short.toLowerCase().includes(q);
        return matchesLetter && matchesQuery;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [query, letter]);

  return (
    <>
      <div className="bg-navy-900 pb-16 sm:pb-20">
        <Container>
          <div className="relative max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search glossary terms..."
              aria-label="Search glossary terms"
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

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
            {/* letter index */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <p className="border-b border-slate-100 px-5 py-4 text-sm font-bold text-ink-900">
                  Browse by Letter
                </p>
                <div className="max-h-[26rem] overflow-y-auto p-2">
                  <LetterRow
                    label="All Terms"
                    active={letter === "all"}
                    onClick={() => setLetter("all")}
                  />
                  {letters.map(([initial, count]) => (
                    <LetterRow
                      key={initial}
                      label={initial}
                      count={count}
                      active={letter === initial}
                      onClick={() => setLetter(initial)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-100 p-5">
                <span className="flex size-9 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                  <CircleHelp className="size-4.5" strokeWidth={1.75} />
                </span>
                <p className="mt-3 text-sm font-bold text-ink-900">Can&apos;t find a term?</p>
                <p className="mt-1.5 text-base leading-relaxed text-slate-500">
                  Contact our support team and we&apos;ll help you out.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:underline"
                >
                  Contact Support <ArrowRight />
                </Link>
              </div>
            </div>

            {/* terms */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-bold text-ink-900">
                  {letter === "all" ? "All Terms" : `Terms starting with ${letter}`}
                </h2>
                <p className="text-base text-slate-500">
                  {results.length} {results.length === 1 ? "Term" : "Terms"}
                </p>
              </div>

              {results.length > 0 ? (
                <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100">
                  {results.map((entry) => {
                    const isOpen = open === entry.term;
                    return (
                      <div key={entry.term}>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : entry.term)}
                          aria-expanded={isOpen}
                          className="flex w-full cursor-pointer items-start gap-4 px-5 py-5 text-left"
                        >
                          <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-mint-100 text-teal-600">
                            <entry.icon className="size-5" strokeWidth={1.75} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-base font-bold text-ink-900">
                              {entry.term}
                            </span>
                            <span className="mt-1 block text-base leading-relaxed text-slate-600">
                              {entry.short}
                            </span>
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={`mt-1 shrink-0 ${isOpen ? "text-teal-600" : "text-slate-400"}`}
                          >
                            <ChevronDown className="size-5" strokeWidth={2} />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 pl-19 text-base leading-relaxed text-slate-600">
                                {entry.detail}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-slate-100">
                  <EmptyState
                    icon={SearchX}
                    title="No terms found"
                    description="Try a different search term or browse another letter."
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function LetterRow({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-base transition-colors ${
        active
          ? "bg-mint-100 font-semibold text-teal-700"
          : "text-slate-600 hover:bg-bg-muted hover:text-ink-900"
      }`}
    >
      {label}
      {count !== undefined && <span className="text-base text-slate-400">{count}</span>}
    </button>
  );
}
