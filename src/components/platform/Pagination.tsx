"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { iconProps } from "./icon";

const PAGE_BUTTON =
  "flex size-9 items-center justify-center rounded-app-7xl border-w-2xs border-app-line text-label-2xs transition-colors disabled:cursor-not-allowed disabled:opacity-40";

/** Footer for the list screens: a range summary on the left, page controls on the right. */
export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(total, page * pageSize);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center justify-between gap-3 sm:flex-row"
    >
      <p className="text-body-xs text-app-text-secondary">
        Showing {first}–{last} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={`${PAGE_BUTTON} bg-app-fade-48 text-app-text hover:bg-app-fade-40`}
        >
          <IconChevronLeft {...iconProps(16)} />
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
          <button
            key={number}
            type="button"
            aria-current={number === page ? "page" : undefined}
            onClick={() => onPageChange(number)}
            className={`${PAGE_BUTTON} ${
              number === page
                ? "border-app-line-brand1 bg-app-brand1 text-app-text-inverse"
                : "bg-app-fade-48 text-app-text hover:bg-app-fade-40"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className={`${PAGE_BUTTON} bg-app-fade-48 text-app-text hover:bg-app-fade-40`}
        >
          <IconChevronRight {...iconProps(16)} />
        </button>
      </div>
    </nav>
  );
}
