import { IconCopy, IconDownload, IconTrash } from "@tabler/icons-react";
import { iconProps } from "./icon";
import type { SavedReport } from "@/lib/platform/report-creator";

/*
 * Saved reports — Figma nodes 18545:59754 (header) and 18544:59357 (row).
 *
 * A Brand 1 header bar set apart from the list by 2px, then a hairlined list
 * of glass rows with three round actions each: delete, duplicate, download.
 *
 * Figma sizes the Type column 96 in the header and 80 in the rows, and starts
 * some values under the sort caret and others under the label, so the header
 * does not line up with what it heads. Here one column list drives both, and
 * every value starts where its label starts — after the caret. Flagged.
 *
 * Widths scale with --ve-type-scale, as in the other platform tables.
 */

const COLUMNS = [
  { key: "id", label: "Report ID", width: 68 },
  { key: "name", label: "Report Name" },
  { key: "type", label: "Type", width: 96 },
  { key: "createdAt", label: "Date Created", width: 160 },
  { key: "dateRange", label: "Date Range", width: 160 },
  { key: "actions", label: "Action", width: 88 },
] as const;

const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

/** Below this the table scrolls sideways rather than squeezing the name. */
const MIN_TABLE_WIDTH = 960;

/** The platform's Sort glyph: two 4px carets. */
function SortHandle() {
  return (
    <span aria-hidden className="flex w-1.5 shrink-0 flex-col items-center justify-center gap-0.5">
      <svg viewBox="0 0 6 4" className="h-1 w-1.5" fill="none">
        <path d="M1 3.2 3 0.8l2 2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 6 4" className="h-1 w-1.5" fill="none">
        <path d="M1 0.8 3 3.2l2-2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function cellProps(column: (typeof COLUMNS)[number]) {
  return "width" in column
    ? { className: "shrink-0", style: { width: scaled(column.width) } }
    : { className: "min-w-px flex-1" };
}

const ACTIONS = [
  { label: "Delete", icon: "trash" },
  { label: "Duplicate", icon: "copy" },
  { label: "Download", icon: "download" },
] as const;

export function SavedReportsTable({ rows }: { rows: readonly SavedReport[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-0.5" style={{ minWidth: MIN_TABLE_WIDTH }}>
        <div className="flex items-center gap-4 rounded-app-l bg-app-brand1 px-4 py-3">
          {COLUMNS.map((column) => {
            const { className, style } = cellProps(column);
            return (
              <div key={column.key} className={`${className} flex items-center gap-1`} style={style}>
                <button
                  type="button"
                  aria-label={`Sort by ${column.label}`}
                  className="shrink-0 cursor-pointer text-app-text-inverse"
                >
                  <SortHandle />
                </button>
                <span className="min-w-px flex-1 text-table-heading text-app-text-inverse">
                  {column.label}
                </span>
              </div>
            );
          })}
        </div>

        <ul className="overflow-hidden rounded-app-l border-w-2xs border-app-line">
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex items-center gap-4 border-w-2xs border-app-line bg-app-fade-48 px-4 py-2 transition-colors hover:bg-app-fade-40"
            >
              {COLUMNS.map((column) => {
                const { className, style } = cellProps(column);
                if (column.key === "actions") {
                  return (
                    <div key={column.key} className={`${className} flex items-center gap-0.5`} style={style}>
                      {ACTIONS.map((action) => (
                        <button
                          key={action.label}
                          type="button"
                          aria-label={`${action.label} ${row.id}`}
                          className="flex items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 p-2 text-app-text transition-colors hover:bg-app-fade-40"
                        >
                          {action.icon === "trash" ? (
                            <IconTrash {...iconProps(12)} />
                          ) : action.icon === "copy" ? (
                            <IconCopy {...iconProps(12)} />
                          ) : (
                            <IconDownload {...iconProps(12)} />
                          )}
                        </button>
                      ))}
                    </div>
                  );
                }
                return (
                  // pl-2.5 = the 6px caret + 4px gap, so the value starts under its label.
                  <span
                    key={column.key}
                    className={`${className} truncate pl-2.5 text-body-2xs text-app-text`}
                    style={style}
                  >
                    {row[column.key]}
                  </span>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
