"use client";

import { SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/Feedback";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CoverArt } from "@/components/sections/CoverArt";
import { caseStudies, caseStudyIndustries } from "@/lib/case-studies";

export function CaseStudyBrowser() {
  const [industry, setIndustry] = useState<string>("all");
  const [sort, setSort] = useState<"recent" | "oldest">("recent");

  const results = useMemo(() => {
    const filtered =
      industry === "all" ? caseStudies : caseStudies.filter((c) => c.industry === industry);
    return [...filtered].sort((a, b) =>
      sort === "recent" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }, [industry, sort]);

  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterPill active={industry === "all"} onClick={() => setIndustry("all")}>
              All Industries
            </FilterPill>
            {caseStudyIndustries.map((item) => (
              <FilterPill key={item} active={industry === item} onClick={() => setIndustry(item)}>
                {item}
              </FilterPill>
            ))}
          </div>

          <div className="shrink-0 lg:w-52">
            <Select
              aria-label="Sort case studies"
              value={sort}
              onChange={(e) => setSort(e.target.value as "recent" | "oldest")}
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
            </Select>
          </div>
        </div>

        {results.length > 0 ? (
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((study) => (
              <RevealItem key={study.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow duration-200 hover:shadow-card">
                  <div className="relative">
                    <CoverArt category={study.industry} />
                    <span className="absolute bottom-4 left-4 rounded-lg bg-navy-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      {study.industry}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-ink-900">{study.company}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-slate-600">{study.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{study.summary}</p>

                    <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                      {study.results.map((result) => (
                        <div key={result.label}>
                          <dt className="sr-only">{result.label}</dt>
                          <dd>
                            <span className="block text-lg font-bold text-teal-600">
                              {result.value}
                            </span>
                            <span className="mt-0.5 block text-[10px] leading-tight text-slate-500">
                              {result.label}
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-teal-600">
                      Read Full Case Study <ArrowRight />
                    </span>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="mt-10 rounded-2xl border border-slate-100">
            <EmptyState
              icon={SearchX}
              title="No case studies found"
              description="Try another industry filter."
            />
          </div>
        )}
      </Container>
    </section>
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
      className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? "bg-navy-900 text-white"
          : "border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600"
      }`}
    >
      {children}
    </button>
  );
}
