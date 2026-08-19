"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Breadcrumb trail. The last crumb is the current page and is not a link. */
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-slate-500 transition-colors hover:text-teal-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="font-medium text-ink-900">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="size-3.5 text-slate-300" strokeWidth={2} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Page list with a sliding window of numbers. Emits page numbers via onChange
 * so the caller decides whether that means routing or client-side slicing.
 */
export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  // Always show first and last; window the rest around the current page.
  const pages: (number | "gap")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "gap") {
      pages.push("gap");
    }
  }

  const navButton =
    "flex size-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-teal-500 hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-500";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={navButton}
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </button>

      {pages.map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className="flex size-9 items-center justify-center text-slate-300">
            <MoreHorizontal className="size-4" strokeWidth={2} />
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`size-9 cursor-pointer rounded-lg text-sm font-medium transition-colors ${
              p === page
                ? "bg-navy-900 text-white"
                : "border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={navButton}
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </button>
    </nav>
  );
}

/** Click-outside menu used for filters and row actions. */
export function Dropdown({
  trigger,
  children,
  align = "left",
}: {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="cursor-pointer"
      >
        {trigger}
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute top-full z-50 mt-2 min-w-48 overflow-hidden rounded-xl bg-white py-1.5 shadow-2xl ring-1 ring-slate-900/5 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="block w-full cursor-pointer px-4 py-2.5 text-left text-sm text-slate-600 transition-colors hover:bg-bg-muted hover:text-ink-900"
    >
      {children}
    </button>
  );
}
