"use client";

import { IconSearch, IconSearchOff, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { FilterField } from "./FilterField";
import { Pagination } from "./Pagination";
import { VerificationQueueTable } from "./VerificationQueueTable";
import { iconProps } from "./icon";
import type { VerificationRow, VerificationStatus } from "@/lib/platform/dashboard";

/*
 * Full verification list — no Figma frame; built from the platform's own
 * parts. The Dashboard's queue table, the list screens' glass filter panel,
 * and a row of status pills that filter in place with their counts.
 */

const STATUSES: readonly ("All" | VerificationStatus)[] = [
  "All",
  "Pending",
  "In Progress",
  "Verified",
  "Unverified",
  "Escalated",
];

const PAGE_SIZE = 10;

export function VerificationsBrowser({ rows }: { rows: readonly VerificationRow[] }) {
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (status !== "All" && row.status !== status) return false;
      if (!needle) return true;
      return [row.fileNumber, row.applicant, row.property, row.client]
        .some((value) => value.toLowerCase().includes(needle));
    });
  }, [rows, status, query]);

  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function countFor(value: (typeof STATUSES)[number]) {
    return value === "All" ? rows.length : rows.filter((row) => row.status === value).length;
  }

  return (
    <section
      aria-label="Verification list"
      className="flex flex-col gap-4 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end">
        <div className="flex flex-col gap-1 xl:w-[calc(360px*var(--ve-type-scale))]">
          <label htmlFor="verification-search" className="px-3 text-label-2xs text-app-text">
            Search
          </label>
          <div className="flex items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-40 p-3">
            <IconSearch {...iconProps(16)} className="shrink-0 text-app-text" />
            <input
              id="verification-search"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="File#, applicant, property or client..."
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
        <div className="grid flex-1 grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
          <FilterField label="Client" placeholder="Select an option..." />
          <FilterField label="Assigned Team" placeholder="Select an option..." />
          <FilterField label="Verification Type" placeholder="Select an option..." />
          <FilterField label="Created" placeholder="Select a date range..." />
        </div>
      </div>

      <div role="tablist" aria-label="Status" className="flex flex-wrap gap-1">
        {STATUSES.map((value) => {
          const active = value === status;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setStatus(value);
                setPage(1);
              }}
              className={`flex items-center gap-2 rounded-app-7xl border-w-2xs px-4 py-2 transition-colors ${
                active
                  ? "border-app-line-brand1 bg-app-brand1 text-app-text-inverse"
                  : "border-app-line bg-app-fade-48 text-app-text hover:bg-app-fade-40"
              }`}
            >
              <span className="text-label-2xs">{value}</span>
              <span
                className={`rounded-app-7xl px-1.5 text-body-2xs ${
                  active ? "bg-app-fade-40 text-app-text-inverse" : "bg-app-brand1-16 text-app-text"
                }`}
              >
                {countFor(value)}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <VerificationQueueTable rows={[...visible]} />
      ) : (
        <EmptyState
          icon={<IconSearchOff {...iconProps(20)} />}
          title="No verifications match"
          description="Try another status or clear the search to see every file."
        />
      )}

      <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
    </section>
  );
}
