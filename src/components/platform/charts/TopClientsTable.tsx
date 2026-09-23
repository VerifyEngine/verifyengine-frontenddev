import { rankFade } from "./RankedRows";

/*
 * Top Clients — Figma node 18176:37625.
 *
 * A Brand 1 header bar over a hairlined, clipped list whose rows fade out down
 * the ranking. Columns are the design's fixed widths (44, 64, 60, 72, 50) with
 * the client name taking the rest; they are scaled with the type, as the other
 * platform tables are, so the larger text does not wrap inside them.
 *
 * Below lg the table keeps its columns and scrolls sideways rather than
 * squeezing the name down to nothing.
 */

export type TopClientRow = {
  id: string;
  name: string;
  volume: string;
  success: string;
  escalation: string;
  avgTat: string;
};

const COLUMNS = [
  { key: "id", label: "ID", width: "w-[calc(44px*var(--ve-type-scale))]" },
  { key: "name", label: "Client Name", width: "min-w-px flex-1" },
  { key: "volume", label: "Volume", width: "w-[calc(64px*var(--ve-type-scale))]" },
  { key: "success", label: "Success %", width: "w-[calc(60px*var(--ve-type-scale))]" },
  { key: "escalation", label: "Escalation %", width: "w-[calc(72px*var(--ve-type-scale))]" },
  { key: "avgTat", label: "Avg TAT", width: "w-[calc(50px*var(--ve-type-scale))]" },
] as const;

export function TopClientsTable({ rows }: { rows: readonly TopClientRow[] }) {
  return (
    <div className="overflow-x-auto px-5 pb-5">
      <table className="flex w-full min-w-[640px] flex-col gap-0.5">
        <thead className="block">
          <tr className="flex items-center gap-4 rounded-app-l bg-app-brand1 p-4 text-label-2xs text-white">
            {COLUMNS.map((column) => (
              <th key={column.key} scope="col" className={`shrink-0 text-left font-medium ${column.width}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block overflow-hidden rounded-app-l border-w-2xs border-app-line bg-app-surface">
          {rows.map((row, index) => (
            <tr
              key={row.id}
              className={`flex items-center gap-4 p-4 text-body-xs text-app-text ${rankFade(index)}`}
            >
              {COLUMNS.map((column) => (
                <td key={column.key} className={`shrink-0 ${column.width}`}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
