import Link from "next/link";
import { StatusChip } from "./StatusChip";
import type { VerificationRow } from "@/lib/platform/dashboard";

/*
 * Verification Queue table — Figma nodes 18108:4952 (header) and 18108:5014
 * (row).
 *
 * Three deliberate corrections to the design, each because the source file is
 * wrong rather than because a different look was wanted:
 *
 *   - Header and rows are driven by the same column definitions. In Figma the
 *     header declares seven attributes on their own width rhythm while each
 *     row renders twelve on another, so labels do not sit over their data.
 *   - The sort control follows its label instead of preceding it. Ahead of the
 *     label it pushes every heading ~10px right of the cell beneath it.
 *   - The header is rounded on its top corners only, so it reads as the top of
 *     the table rather than a bar floating above it.
 *
 * Column widths are the design's, multiplied by --ve-type-scale so they track
 * the text.
 *
 * All twelve columns need the width a 1920 screen gives (3xl). Narrower, the
 * secondary columns step out in order of importance, so the table fits its
 * panel instead of scrolling sideways; on a phone each file becomes a card.
 */

type Tier = "lg" | "xl" | "2xl" | "3xl";

type Column = {
  key: keyof VerificationRow;
  label: string;
  /** Figma width in px; scaled with the type. Omitted for the flexible column. */
  width?: number;
  /** Smallest breakpoint the column shows at; always shown when omitted. */
  from?: Tier;
};

const COLUMNS: Column[] = [
  { key: "fileNumber", label: "File#", width: 68 },
  { key: "applicant", label: "Applicant", width: 100 },
  { key: "property", label: "Property" },
  { key: "client", label: "Client", width: 100, from: "xl" },
  { key: "assignedTeam", label: "Assigned Team", width: 80, from: "2xl" },
  { key: "verificationType", label: "Type", width: 64, from: "3xl" },
  { key: "status", label: "Status", width: 64 },
  { key: "confidenceScore", label: "Confidence", width: 72, from: "xl" },
  { key: "ruleResult", label: "Rule", width: 44, from: "3xl" },
  { key: "escalationTimer", label: "Timer", width: 58, from: "3xl" },
  { key: "created", label: "Created", width: 76 },
  { key: "lastAction", label: "Last Action", width: 76, from: "2xl" },
];

/* Written out in full so Tailwind sees every class. */
const SHOW_FLEX: Record<Tier, string> = {
  lg: "hidden lg:flex",
  xl: "hidden xl:flex",
  "2xl": "hidden 2xl:flex",
  "3xl": "hidden 3xl:flex",
};
const SHOW_BLOCK: Record<Tier, string> = {
  lg: "hidden lg:block",
  xl: "hidden xl:block",
  "2xl": "hidden 2xl:block",
  "3xl": "hidden 3xl:block",
};

const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

const hrefFor = (row: VerificationRow) => `/verifications/${row.fileNumber.replace("#", "")}`;

/** Two 4px carets, as drawn in the Sort component (node 18106:4859). */
function SortHandle() {
  return (
    <span aria-hidden className="flex shrink-0 flex-col items-center justify-center gap-0.5">
      <svg viewBox="0 0 6 4" className="h-1 w-1.5" fill="none">
        <path d="M1 3.2 3 0.8l2 2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 6 4" className="h-1 w-1.5" fill="none">
        <path d="M1 0.8 3 3.2l2-2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Phone layout: one card per file with the fields that decide what to open. */
function QueueCards({ rows }: { rows: VerificationRow[] }) {
  return (
    <ul className="flex flex-col gap-2 md:hidden">
      {rows.map((row) => (
        <li key={row.fileNumber}>
          <Link
            href={hrefFor(row)}
            className="flex flex-col gap-2 rounded-app-l border-w-2xs border-app-line bg-app-fade-48 p-4 transition-colors hover:bg-app-fade-40"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-label-2xs text-app-text-secondary">{row.fileNumber}</span>
              <StatusChip status={row.status} />
            </span>
            <span className="text-label-xs text-app-text">{row.applicant}</span>
            <span className="text-body-xs text-app-text-secondary">{row.property}</span>
            <span className="flex flex-wrap gap-x-4 gap-y-1 text-body-2xs text-app-text-secondary">
              <span>{row.client}</span>
              <span>Confidence {row.confidenceScore}</span>
              <span>{row.created}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function VerificationQueueTable({ rows }: { rows: VerificationRow[] }) {
  return (
    <>
      <QueueCards rows={rows} />

      <div className="hidden overflow-x-auto md:block">
        <div className="3xl:min-w-[calc(1216px*var(--ve-type-scale))]">
          <div className="flex items-center gap-4 rounded-t-app-l bg-app-brand1 px-4 py-2">
            {COLUMNS.map((column) => (
              <div
                key={column.key}
                className={`${column.from ? SHOW_FLEX[column.from] : "flex"} ${
                  column.width === undefined ? "min-w-px flex-1" : "shrink-0"
                } items-center gap-1`}
                style={column.width === undefined ? undefined : { width: scaled(column.width) }}
              >
                <span className="min-w-px flex-1 text-table-heading text-app-text-inverse">
                  {column.label}
                </span>
                <button
                  type="button"
                  aria-label={`Sort by ${column.label}`}
                  className="shrink-0 cursor-pointer text-app-text-inverse"
                >
                  <SortHandle />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            {rows.map((row) => (
              <Link
                key={row.fileNumber}
                href={hrefFor(row)}
                className="flex min-h-15 items-center gap-4 border-w-2xs border-app-line bg-app-fade-48 p-4 transition-colors hover:bg-app-fade-40"
              >
                {COLUMNS.map((column) => {
                  if (column.key === "status") {
                    return <StatusChip key={column.key} status={row.status} />;
                  }
                  return (
                    <span
                      key={column.key}
                      className={`${column.from ? SHOW_BLOCK[column.from] : ""} ${
                        column.width === undefined ? "min-w-px flex-1" : "shrink-0"
                      } text-left text-body-2xs text-app-text`}
                      style={column.width === undefined ? undefined : { width: scaled(column.width) }}
                    >
                      {row[column.key]}
                    </span>
                  );
                })}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
