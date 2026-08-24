"use client";

import Link from "next/link";
import { Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/Feedback";
import { Pagination } from "@/components/ui/Navigation";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CoverArt } from "@/components/sections/CoverArt";
import { blogCategories, blogPosts, formatPostDate } from "@/lib/blog";

const PER_PAGE = 6;

/**
 * Article grid with category tabs, a sort control and pagination. The hero
 * search box lives here too, so one piece of state drives every filter.
 */
export function BlogBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<"recent" | "oldest">("recent");
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = blogPosts.filter((post) => {
      const inCategory = category === "all" || post.category === category;
      const matches =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return inCategory && matches;
    });

    return [...filtered].sort((a, b) =>
      sort === "recent" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }, [query, category, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visible = results.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  /** Any filter change sends the reader back to the first page of results. */
  function updateFilter(apply: () => void) {
    apply();
    setPage(1);
  }

  return (
    <>
      <div className="bg-navy-900 pb-16 sm:pb-20">
        <Container>
          <div className="relative max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => updateFilter(() => setQuery(e.target.value))}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="w-full rounded-xl bg-white py-4 pr-14 pl-5 text-sm text-ink-900 placeholder:text-slate-400 focus:ring-2 focus:ring-mint-200 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {/* Decorative: the field is already labelled, and filtering happens
                as you type, so there is nothing to click here. */}
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
              <FilterPill
                active={category === "all"}
                onClick={() => updateFilter(() => setCategory("all"))}
              >
                All Articles
              </FilterPill>
              {blogCategories.map((item) => (
                <FilterPill
                  key={item}
                  active={category === item}
                  onClick={() => updateFilter(() => setCategory(item))}
                >
                  {item}
                </FilterPill>
              ))}
            </div>

            <div className="shrink-0 lg:w-52">
              <Select
                aria-label="Sort articles"
                value={sort}
                onChange={(e) => updateFilter(() => setSort(e.target.value as "recent" | "oldest"))}
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
              </Select>
            </div>
          </div>

          {visible.length > 0 ? (
            <>
              <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((post) => (
                  <RevealItem key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow duration-200 hover:shadow-card"
                    >
                      <CoverArt category={post.category} />
                      <div className="flex flex-1 flex-col p-6">
                        <p className="flex flex-wrap items-center gap-2 text-xs text-slate-400 uppercase">
                          {formatPostDate(post.date)}
                          <span className="text-slate-300">•</span>
                          <span className="font-semibold tracking-wide text-teal-600">
                            {post.category}
                          </span>
                        </p>
                        <h3 className="mt-3 text-lg leading-snug font-bold text-ink-900 group-hover:text-teal-700">
                          {post.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                          {post.excerpt}
                        </p>
                        <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-teal-600">
                          Read More <ArrowRight />
                        </span>
                      </div>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>

              {/* Pagination renders nothing on a single page of results, so the
                  spacing has to go with it rather than leave a gap behind. */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
                </div>
              )}
            </>
          ) : (
            <div className="mt-10 rounded-2xl border border-slate-100">
              <EmptyState
                icon={SearchX}
                title="No articles found"
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
