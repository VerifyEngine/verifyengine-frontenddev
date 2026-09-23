import { TONE_VAR, type ChartSeries } from "./tones";

/*
 * Verification Breakdown and Fraud Detection Breakdown — Figma nodes
 * 18176:37710 and 18176:37809.
 *
 * A thick donut starting at twelve o'clock, its slices parted by a small gap
 * and softened at every corner, the share written on each slice and the total
 * in the hole. Unlike Queue Status Distribution's stroked circles, these slices
 * need real corners, so each one is an annular-sector path.
 *
 * The rounded corners come from the stroke rather than from arc maths: the
 * sector is drawn shrunk by the corner radius on every side and then stroked
 * in its own colour at twice that radius with round joins, which grows it back
 * to full size with every corner rounded.
 */

export type DonutSlice = ChartSeries & { percent: number };

const SIZE = 500;
const CENTRE = SIZE / 2;
const OUTER = 250;
const INNER = 118;
/** Half the gap between neighbouring slices. */
const HALF_GAP = 3;
const CORNER = 8;
/** Where the share badges sit: the middle of the ring. */
const BADGE_RADIUS = (OUTER + INNER) / 2;

function polar(radius: number, angle: number) {
  // Angle in degrees clockwise from twelve o'clock.
  const radians = ((angle - 90) * Math.PI) / 180;
  return { x: CENTRE + radius * Math.cos(radians), y: CENTRE + radius * Math.sin(radians) };
}

function sectorPath(start: number, end: number) {
  const outer = OUTER - CORNER;
  const inner = INNER + CORNER;
  // The inset along each radius is a fixed distance, so it is a larger angle
  // on the inner edge than on the outer one — that keeps the gap parallel.
  const outerInset = (((HALF_GAP + CORNER) / outer) * 180) / Math.PI;
  const innerInset = (((HALF_GAP + CORNER) / inner) * 180) / Math.PI;
  const a = polar(outer, start + outerInset);
  const b = polar(outer, end - outerInset);
  const c = polar(inner, end - innerInset);
  const d = polar(inner, start + innerInset);
  const large = end - start - 2 * outerInset > 180 ? 1 : 0;
  const f = (n: number) => n.toFixed(2);

  return [
    `M${f(a.x)},${f(a.y)}`,
    `A${outer},${outer} 0 ${large} 1 ${f(b.x)},${f(b.y)}`,
    `L${f(c.x)},${f(c.y)}`,
    `A${inner},${inner} 0 ${large} 0 ${f(d.x)},${f(d.y)}`,
    "Z",
  ].join(" ");
}

export function DonutChart({
  slices,
  totalLabel,
  total,
}: {
  slices: readonly DonutSlice[];
  totalLabel: string;
  total: string;
}) {
  const arcs = slices.map((slice, index) => {
    const before = slices.slice(0, index).reduce((sum, previous) => sum + previous.percent, 0);
    return { slice, start: (before / 100) * 360, end: ((before + slice.percent) / 100) * 360 };
  });

  return (
    <div className="flex h-full items-center justify-center p-7">
      <div className="relative aspect-square w-full max-w-[500px]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="size-full"
          role="img"
          aria-label={slices.map((s) => `${s.label} ${s.percent}%`).join(", ")}
        >
          {arcs.map(({ slice, start, end }) => (
            <path
              key={slice.label}
              d={sectorPath(start, end)}
              fill={TONE_VAR[slice.tone]}
              stroke={TONE_VAR[slice.tone]}
              strokeWidth={CORNER * 2}
              strokeLinejoin="round"
            />
          ))}
        </svg>

        {arcs.map(({ slice, start, end }) => {
          const { x, y } = polar(BADGE_RADIUS, (start + end) / 2);
          return (
            <span
              key={slice.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-app-l bg-app-brand1 p-2 text-body-2xs text-white"
              style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
            >
              {slice.percent}%
            </span>
          );
        })}

        <div className="absolute top-1/2 left-1/2 flex w-40 -translate-x-1/2 -translate-y-1/2 flex-col gap-1 text-center">
          <span className="text-label-2xs font-bold text-app-text-secondary">{totalLabel}</span>
          <span className="text-heading-l text-app-text-emphasis">{total}</span>
        </div>
      </div>
    </div>
  );
}
