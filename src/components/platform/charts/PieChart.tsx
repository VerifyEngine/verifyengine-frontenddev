import { TONE_VAR, type ChartSeries } from "./ChartCard";

/*
 * Queue Status Distribution — Figma node 18176:36689.
 *
 * A donut with the share written inside each slice and the categories listed
 * down the right. Same stroked-circle technique as the dashboard's
 * DonutMetricCard: each slice is a fraction of the circumference offset by the
 * slices before it, so no path arithmetic and no charting dependency.
 *
 * The percentage badges are placed at the mid-angle of their slice, converted
 * back to cartesian coordinates on the ring's centre line.
 */

export type PieSlice = ChartSeries & { percent: number };

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Where the badges sit: the middle of the stroke, not the path itself. */
const BADGE_RADIUS = 40;

export function PieChart({
  slices,
  totalLabel,
  total,
}: {
  slices: readonly PieSlice[];
  totalLabel: string;
  total: string;
}) {
  // Each slice starts where the ones before it ended, summed per slice rather
  // than carried in a running total — the same shape DonutMetricCard uses.
  const arcs = slices.map((slice, index) => ({
    slice,
    offset: slices.slice(0, index).reduce((total, previous) => total + previous.percent, 0),
    length: (slice.percent / 100) * CIRCUMFERENCE,
  }));

  return (
    <div className="flex h-full flex-col gap-4 px-5 pb-5">
      <div className="flex min-h-px flex-1 flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="relative w-full max-w-72 shrink-0">
          <svg viewBox="0 0 100 100" role="img" aria-label={totalLabel} className="w-full">
            <g className="-rotate-90 origin-center">
              {arcs.map(({ slice, offset, length }) => (
                <circle
                  key={slice.label}
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  strokeWidth="20"
                  stroke={TONE_VAR[slice.tone]}
                  strokeDasharray={`${length} ${CIRCUMFERENCE}`}
                  strokeDashoffset={-(offset / 100) * CIRCUMFERENCE}
                />
              ))}
            </g>

            {arcs.map(({ slice, offset }) => {
              const midAngle = ((offset + slice.percent / 2) / 100) * 360 - 90;
              const radians = (midAngle * Math.PI) / 180;
              const x = 50 + BADGE_RADIUS * Math.cos(radians);
              const y = 50 + BADGE_RADIUS * Math.sin(radians);

              return (
                <g key={slice.label}>
                  <rect
                    x={x - 8}
                    y={y - 4.5}
                    width="16"
                    height="9"
                    rx="4.5"
                    className="fill-app-brand1"
                  />
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-white text-[5px]"
                  >
                    {slice.percent}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <ul className="flex shrink-0 flex-col gap-2">
          {slices.map((slice) => (
            <li key={slice.label} className="flex items-center justify-end gap-2">
              <span className="text-label-2xs text-app-text-secondary">{slice.label}</span>
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-app-12xl"
                style={{ backgroundColor: TONE_VAR[slice.tone] }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-label-xs text-app-text">{totalLabel}</span>
        <span className="text-label-xs text-app-text-emphasis">{total}</span>
      </div>
    </div>
  );
}
