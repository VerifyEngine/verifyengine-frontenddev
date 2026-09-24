import { SortHandle } from "./ClientsTable";
import type { UserActivityRow } from "@/lib/platform/user-activity";

/*
 * User Activity — Properties view. No Figma frame (only the Users view is
 * drawn); the same rows regrouped by MLS ID, in the Users table's navy header
 * and white rows, so switching views keeps the page's look.
 */

type PropertyRow = { mls: string; respondents: string[]; lastActivity: string; lastTime: number };

const COLUMNS = [
  { key: "mls", label: "MLS ID", width: 96 },
  { key: "count", label: "Respondents", width: 96 },
  { key: "names", label: "Users" },
  { key: "last", label: "Last Activity", width: 120 },
] as const;

const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

function byProperty(rows: readonly UserActivityRow[]): PropertyRow[] {
  const map = new Map<string, PropertyRow>();
  for (const row of rows) {
    const time = Date.parse(row.addedAt.replace(/(am|pm)$/, " $1"));
    for (const mls of row.properties) {
      const entry = map.get(mls) ?? { mls, respondents: [], lastActivity: row.addedAt, lastTime: time };
      entry.respondents.push(row.name);
      if (time > entry.lastTime) {
        entry.lastTime = time;
        entry.lastActivity = row.addedAt;
      }
      map.set(mls, entry);
    }
  }
  return [...map.values()].sort(
    (a, b) => b.respondents.length - a.respondents.length || b.lastTime - a.lastTime,
  );
}

export function UserActivityProperties({ rows }: { rows: readonly UserActivityRow[] }) {
  const properties = byProperty(rows);
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[760px] flex-col gap-1">
        <div className="flex items-center gap-4 rounded-app-l bg-app-brand1 px-4 py-3">
          {COLUMNS.map((column) => (
            <div
              key={column.key}
              className={"width" in column ? "flex shrink-0 items-center gap-1" : "flex min-w-px flex-1 items-center gap-1"}
              style={"width" in column ? { width: scaled(column.width) } : undefined}
            >
              <span aria-hidden className="shrink-0 text-app-text-inverse">
                <SortHandle />
              </span>
              <span className="text-table-heading text-app-text-inverse">{column.label}</span>
            </div>
          ))}
        </div>
        <ul className="flex flex-col">
          {properties.map((property) => (
            <li
              key={property.mls}
              className="flex items-center gap-4 border-w-2xs border-app-line bg-app-surface px-4 py-3"
            >
              <span className="shrink-0 text-body-2xs text-app-text" style={{ width: scaled(96) }}>
                {property.mls}
              </span>
              <span className="shrink-0 text-body-2xs text-app-text" style={{ width: scaled(96) }}>
                {property.respondents.length}
              </span>
              <span className="min-w-px flex-1 text-body-2xs text-app-text">
                {property.respondents.join(", ")}
              </span>
              <span className="shrink-0 text-body-2xs text-app-text" style={{ width: scaled(120) }}>
                {property.lastActivity}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
