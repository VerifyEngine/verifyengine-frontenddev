import type { ReactNode } from "react";

export type Column<T> = {
  key: string;
  header: string;
  /** Render the cell; defaults to the raw value at `key`. */
  cell?: (row: T) => ReactNode;
  /** Tailwind classes to hide the column below a breakpoint, etc. */
  className?: string;
  align?: "left" | "right";
};

/**
 * Shared data table. Wraps itself in a horizontal scroller so narrow screens
 * scroll the table instead of clipping or breaking the page layout.
 */
export function Table<T extends { id?: string | number }>({
  columns,
  rows,
  empty,
  caption,
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: ReactNode;
  caption?: string;
}) {
  if (rows.length === 0 && empty) {
    return <>{empty}</>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-slate-100 text-slate-400">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`py-3 pr-4 font-medium whitespace-nowrap ${
                  col.align === "right" ? "text-right" : ""
                } ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="border-b border-slate-50 last:border-0">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-3.5 pr-4 text-slate-600 ${
                    col.align === "right" ? "text-right" : ""
                  } ${col.className ?? ""}`}
                >
                  {col.cell ? col.cell(row) : String((row as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const statusTones: Record<string, string> = {
  success: "bg-mint-100 text-teal-700",
  info: "bg-sky-50 text-sky-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700",
  neutral: "bg-slate-100 text-slate-600",
};

/** Small coloured pill for row status columns. */
export function StatusBadge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof statusTones;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${statusTones[tone]}`}
    >
      {children}
    </span>
  );
}
