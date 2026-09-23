import { TONE_VAR, type ChartSeries } from "./tones";

/*
 * Compliance Completion — Figma node 18176:37915.
 *
 * Four concentric progress rings, outermost first. Each ring is a full track in
 * Surface/Brand 2/Secondary with its progress drawn over it from three o'clock,
 * clockwise, ending in a round cap; a thin ring in the surface colour parts
 * each ring from the next, and the same colour fills the dot in the middle.
 * The shares are read out in a row of badges along the three o'clock radius,
 * one on each ring.
 *
 * Same stroked-circle technique as DonutMetricCard: a circle's stroke starts at
 * three o'clock and runs clockwise, which is exactly where the design starts.
 */

export type RingProgress = ChartSeries & { percent: number };

const SIZE = 448;
const CENTRE = SIZE / 2;
/** Outer edge of each ring, from the four groups in the design. */
const RING_EDGES = [224, 171, 118, 65.5];
const RING_WIDTH = 49;
/** The surface-coloured hairline between rings. */
const SEPARATOR = 4;

export function RingProgressChart({ rings }: { rings: readonly RingProgress[] }) {
  return (
    <div className="flex h-full items-center justify-center p-7">
      <div className="relative aspect-square w-full max-w-[448px]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="size-full"
          role="img"
          aria-label={rings.map((r) => `${r.label} ${r.percent}%`).join(", ")}
        >
          {rings.map((ring, index) => {
            const edge = RING_EDGES[index];
            const radius = edge - RING_WIDTH / 2;
            const circumference = 2 * Math.PI * radius;
            return (
              <g key={ring.label}>
                <circle
                  cx={CENTRE}
                  cy={CENTRE}
                  r={radius}
                  fill="none"
                  strokeWidth={RING_WIDTH}
                  stroke="var(--ve-surface-brand2-secondary)"
                />
                <circle
                  cx={CENTRE}
                  cy={CENTRE}
                  r={radius}
                  fill="none"
                  strokeWidth={RING_WIDTH}
                  strokeLinecap="round"
                  stroke={TONE_VAR[ring.tone]}
                  strokeDasharray={`${(ring.percent / 100) * circumference} ${circumference}`}
                />
                <circle
                  cx={CENTRE}
                  cy={CENTRE}
                  r={edge - RING_WIDTH - SEPARATOR / 2}
                  fill="none"
                  strokeWidth={SEPARATOR}
                  stroke="var(--ve-surface-default)"
                />
              </g>
            );
          })}
          <circle
            cx={CENTRE}
            cy={CENTRE}
            r={RING_EDGES.at(-1)! - RING_WIDTH - SEPARATOR}
            fill="var(--ve-surface-default)"
          />
        </svg>

        {rings.map((ring, index) => {
          const radius = RING_EDGES[index] - RING_WIDTH / 2;
          return (
            <span
              key={ring.label}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-app-l bg-app-brand1 p-1 text-body-2xs font-bold text-white"
              style={{ left: `${((CENTRE + radius) / SIZE) * 100}%` }}
            >
              {ring.percent}%
            </span>
          );
        })}
      </div>
    </div>
  );
}
