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
 * the text: the platform ships type 1.2x larger than drawn, and fixed pixel
 * columns would squeeze that text into wrapping. The table keeps its full
 * width and scrolls horizontally inside its own container, so the shell never
 * gets a horizontal scrollbar.
 */

type Column = {
  key: keyof VerificationRow;
  label: string;
  /** Figma width in px; scaled with the type. Omitted for the flexible column. */
  width?: number;
};

const COLUMNS: Column[] = [
  { key: "fileNumber", label: "File#", width: 68 },
  { key: "applicant", label: "Applicant", width: 100 },
  { key: "property", label: "Property" },
  { key: "client", label: "Client", width: 100 },
  { key: "assignedTeam", label: "Assigned Team", width: 80 },
  { key: "verificationType", label: "Type", width: 64 },
  { key: "status", label: "Status", width: 64 },
  { key: "confidenceScore", label: "Confidence", width: 72 },
  { key: "ruleResult", label: "Rule", width: 44 },
  { key: "escalationTimer", label: "Timer", width: 58 },
  { key: "created", label: "Created", width: 76 },
  { key: "lastAction", label: "Last Action", width: 76 },
];

/** Total of the fixed columns plus gaps and padding, before the flexible one. */
const MIN_TABLE_WIDTH = 1216;

const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

/** Two 4px carets, as drawn in the Sort component (node 18106:4859). */
function SortHandle() {
  return (
    <span aria-hidden className="flex shrink-0 flex-col items-center justify-center gap-0.5">
      <svg viewBox="0 0 6 4" className="h-1 w-1.5" fill="none">
        <path
          d="M1 3.2 3 0.8l2 2.4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg viewBox="0 0 6 4" className="h-1 w-1.5" fill="none">
        <path
          d="M1 0.8 3 3.2l2-2.4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function VerificationQueueTable({ rows }: { rows: VerificationRow[] }) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: scaled(MIN_TABLE_WIDTH) }}>
        <div className="flex items-center gap-4 rounded-t-app-l bg-app-brand1 px-4 py-2">
          {COLUMNS.map((column) => (
            <div
              key={column.key}
              className={
                column.width === undefined
                  ? "flex min-w-px flex-1 items-center gap-1"
                  : "flex shrink-0 items-center gap-1"
              }
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
            <a
              key={row.fileNumber}
              href={`/verifications/${row.fileNumber.replace("#", "")}`}
              className="flex min-h-15 items-center gap-4 border-w-2xs border-app-line bg-app-fade-48 p-4 transition-colors hover:bg-app-fade-40"
            >
              {COLUMNS.map((column) => {
                if (column.key === "status") {
                  return <StatusChip key={column.key} status={row.status} />;
                }
                return (
                  <span
                    key={column.key}
                    className={
                      column.width === undefined
                        ? "min-w-px flex-1 text-left text-body-2xs text-app-text"
                        : "shrink-0 text-left text-body-2xs text-app-text"
                    }
                    style={
                      column.width === undefined ? undefined : { width: scaled(column.width) }
                    }
                  >
                    {row[column.key]}
                  </span>
                );
              })}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
