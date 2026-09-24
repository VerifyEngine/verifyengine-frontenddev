"use client";

import { IconArrowRight, IconSearch, IconUserSearch, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { Pagination } from "./Pagination";
import { StatusChip } from "./StatusChip";
import { iconProps } from "./icon";
import type { ApplicantRow } from "@/lib/platform/applicants";

/*
 * Applicant list — no Figma frame. Same header bar, row surface and scaled
 * column widths as the Verification Queue table, so it reads as its sibling.
 * Each row opens the applicant's most recent verification file.
 */

const COLUMNS = [
  { key: "name", label: "Applicant", width: 160 },
  { key: "files", label: "Files", width: 48 },
  { key: "property", label: "Latest Property" },
  { key: "client", label: "Client", width: 140 },
  { key: "status", label: "Latest Status", width: 72 },
  { key: "lastAction", label: "Last Action", width: 110 },
  { key: "open", label: "", width: 88 },
] as const;

const PAGE_SIZE = 10;
const MIN_TABLE_WIDTH = 1100;
const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ApplicantsBrowser({ rows }: { rows: readonly ApplicantRow[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) =>
      [row.name, row.property, row.client].some((value) => value.toLowerCase().includes(needle)),
    );
  }, [rows, query]);

  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section
      aria-label="Applicant list"
      className="flex flex-col gap-4 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
    >
      <div className="flex flex-col gap-1 sm:max-w-[calc(360px*var(--ve-type-scale))]">
        <label htmlFor="applicant-search" className="px-3 text-label-2xs text-app-text">
          Search
        </label>
        <div className="flex items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-40 p-3">
          <IconSearch {...iconProps(16)} className="shrink-0 text-app-text" />
          <input
            id="applicant-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Name, property or client..."
            className="min-w-px flex-1 bg-transparent py-px text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="shrink-0 text-app-warning"
            >
              <IconX {...iconProps(16)} />
            </button>
          ) : null}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="overflow-x-auto">
          <div style={{ minWidth: MIN_TABLE_WIDTH }}>
            <div className="flex items-center gap-4 rounded-t-app-l bg-app-brand1 px-4 py-2">
              {COLUMNS.map((column) => (
                <span
                  key={column.key}
                  style={"width" in column ? { width: scaled(column.width) } : undefined}
                  className={`text-table-heading text-app-text-inverse ${
                    "width" in column ? "shrink-0" : "min-w-px flex-1"
                  }`}
                >
                  {column.label}
                </span>
              ))}
            </div>
            <ul className="flex flex-col">
              {visible.map((row) => (
                <li
                  key={row.name}
                  className="flex min-h-15 items-center gap-4 border-w-2xs border-app-line bg-app-fade-48 px-4 py-3 transition-colors hover:bg-app-fade-40"
                >
                  <span className="flex shrink-0 items-center gap-2" style={{ width: scaled(160) }}>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-app-12xl bg-app-brand1-16 text-label-2xs text-app-text-emphasis">
                      {initials(row.name)}
                    </span>
                    <span className="truncate text-body-2xs text-app-text">{row.name}</span>
                  </span>
                  <span className="shrink-0 text-body-2xs text-app-text" style={{ width: scaled(48) }}>
                    {row.files.length}
                  </span>
                  <span className="min-w-px flex-1 text-body-2xs text-app-text">{row.property}</span>
                  <span className="shrink-0 text-body-2xs text-app-text" style={{ width: scaled(140) }}>
                    {row.client}
                  </span>
                  <span className="shrink-0" style={{ width: scaled(72) }}>
                    <StatusChip status={row.latestStatus} />
                  </span>
                  <span className="shrink-0 text-body-2xs text-app-text" style={{ width: scaled(110) }}>
                    {row.lastAction}
                  </span>
                  <Link
                    href={`/verifications/${row.files[0].fileNumber.replace("#", "")}`}
                    style={{ width: scaled(88) }}
                    className="flex shrink-0 items-center justify-center gap-1 rounded-app-7xl bg-app-brand1-quaternary px-2 py-2 text-app-text-brand1 transition-opacity hover:opacity-80"
                  >
                    <span className="text-body-2xs font-medium">View file</span>
                    <IconArrowRight {...iconProps(12)} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={<IconUserSearch {...iconProps(20)} />}
          title="No applicants match"
          description="Check the spelling or search by property or client instead."
        />
      )}

      <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
    </section>
  );
}
