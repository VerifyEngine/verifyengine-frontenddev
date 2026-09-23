import { TONE_VAR, type ChartSeries } from "./tones";

/*
 * The line charts on Reports — Figma nodes 18176:36464 (Billing Usage),
 * 18176:37115 (AI Outreach Performance), 18176:37195 (Human Override Rate) and
 * 18176:38003 (System Failure Monitoring).
 *
 * SVG rather than divs, because a polyline through N points is geometry: the
 * points are mapped into a 0-100 viewBox on both axes and the path is written
 * from them. `preserveAspectRatio="none"` lets the plot stretch with the card
 * while the stroke is kept honest with `vector-effect`.
 *
 * Each series is spread across the full width on its own, so series with
 * different sample counts still start and end on the plot's edges — the same
 * as the design, where every line is its own layer stretched to the plot.
 *
 * The washes are painted from the series colour so they follow the token
 * rather than a hex.
 */

export type LineSeries = ChartSeries & {
  values: readonly number[];
  /** Draws a gradient wash beneath the line. */
  fill?: boolean;
  /** Opacity of the wash at the top of the plot. Figma uses 0.32 on most. */
  fillOpacity?: number;
  /** Wash colour when it is not the line's own — Human Override Rate. */
  fillColor?: string;
  /** Horizontal position of each value, 0–1, when they are not evenly spaced. */
  positions?: readonly number[];
};

/**
 * A highlighted reading. Either a sample (`pointIndex`) or a horizontal
 * position (`at`, 0–1), which is how the design pins it on the smooth chart.
 * `labelAt: "bottom"` sits the value pill at the foot of the guide line, as the
 * two outreach charts and Human Override Rate draw it.
 */
export type LineMarker = {
  seriesIndex: number;
  pointIndex?: number;
  at?: number;
  label: string;
  labelAt?: "point" | "bottom";
};

const VIEW = 100;

type Point = { x: number; y: number };

function toPoints(values: readonly number[], max: number, positions?: readonly number[]): Point[] {
  const step = values.length > 1 ? VIEW / (values.length - 1) : 0;
  return values.map((value, index) => ({
    x: positions ? positions[index] * VIEW : index * step,
    y: VIEW - (Math.min(Math.max(value, 0), max) / max) * VIEW,
  }));
}

/*
 * Catmull-Rom through the samples, written as cubic Béziers. Tension 1/6 is the
 * uniform spline, which passes through every point without overshooting much.
 */
function smoothSegments(points: Point[]) {
  return points.slice(1).map((end, index) => {
    const p0 = points[index - 1] ?? points[index];
    const p1 = points[index];
    const p3 = points[index + 2] ?? end;
    return {
      start: p1,
      c1: { x: p1.x + (end.x - p0.x) / 6, y: p1.y + (end.y - p0.y) / 6 },
      c2: { x: end.x - (p3.x - p1.x) / 6, y: end.y - (p3.y - p1.y) / 6 },
      end,
    };
  });
}

function linePath(points: Point[], smooth: boolean) {
  const fmt = (p: Point) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  if (!smooth) return `M${points.map(fmt).join(" L")}`;
  return (
    `M${fmt(points[0])}` +
    smoothSegments(points)
      .map(({ c1, c2, end }) => ` C${fmt(c1)} ${fmt(c2)} ${fmt(end)}`)
      .join("")
  );
}

/** The height of the drawn line at horizontal position x. */
function yAt(points: Point[], x: number, smooth: boolean) {
  if (!smooth) {
    const index = points.findIndex((p) => p.x >= x);
    if (index <= 0) return points[Math.max(index, 0)].y;
    const a = points[index - 1];
    const b = points[index];
    return a.y + ((x - a.x) / (b.x - a.x)) * (b.y - a.y);
  }
  // Sample the Bézier segment that spans x and take the closest sample.
  const segment = smoothSegments(points).find((s) => s.end.x >= x) ?? smoothSegments(points).at(-1)!;
  let best = segment.start;
  for (let step = 0; step <= 40; step++) {
    const t = step / 40;
    const u = 1 - t;
    const p = {
      x: u * u * u * segment.start.x + 3 * u * u * t * segment.c1.x + 3 * u * t * t * segment.c2.x + t * t * t * segment.end.x,
      y: u * u * u * segment.start.y + 3 * u * u * t * segment.c1.y + 3 * u * t * t * segment.c2.y + t * t * t * segment.end.y,
    };
    if (Math.abs(p.x - x) < Math.abs(best.x - x)) best = p;
  }
  return best.y;
}

export function AreaLineChart({
  series,
  labels,
  max,
  yTicks,
  formatY,
  marker,
  heightClass = "h-56",
  grid = false,
  smooth = false,
  strokeWidth = 1.5,
  axisWidthClass = "w-10",
}: {
  series: readonly LineSeries[];
  labels: readonly string[];
  max: number;
  yTicks?: number;
  formatY: (value: number) => string;
  marker?: LineMarker;
  /** Plot height; the outreach charts are much taller than Billing Usage. */
  heightClass?: string;
  /** Dashed Border/Primary gridlines on every tick and every label. */
  grid?: boolean;
  smooth?: boolean;
  strokeWidth?: number;
  axisWidthClass?: string;
}) {
  const tickCount = yTicks ?? 5;
  const ticks = Array.from({ length: tickCount }, (_, index) => (max / (tickCount - 1)) * index)
    .reverse();

  const markerPoint = (() => {
    if (!marker) return undefined;
    const points = toPoints(series[marker.seriesIndex].values, max, series[marker.seriesIndex].positions);
    if (marker.pointIndex !== undefined) return points[marker.pointIndex];
    const x = (marker.at ?? 0.5) * VIEW;
    return { x, y: yAt(points, x, smooth) };
  })();
  const labelAtBottom = marker?.labelAt === "bottom";

  return (
    <div className="flex gap-3 px-5 pb-5">
      <div
        className={`flex shrink-0 flex-col justify-between text-right ${axisWidthClass} ${
          // With a grid the ticks line up with the plot, so they stop above the
          // month row (16px gap + one Body/2XS line) instead of running past it.
          grid ? "-mt-[calc(6px*var(--ve-type-scale))] pb-[calc(16px+6px*var(--ve-type-scale))]" : ""
        }`}
      >
        {ticks.map((tick) => (
          <span key={tick} className="text-body-2xs text-app-text-secondary">
            {formatY(tick)}
          </span>
        ))}
      </div>

      <div className="min-w-px flex-1">
        <div className={`relative ${heightClass}`}>
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            preserveAspectRatio="none"
            className="size-full overflow-visible"
            role="img"
            aria-label={series.map((s) => s.label).join(", ")}
          >
            <defs>
              {series.map((line, index) =>
                line.fill ? (
                  <linearGradient
                    key={line.label}
                    id={`area-${index}-${line.label.replace(/\W/g, "")}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={line.fillColor ?? TONE_VAR[line.tone]}
                      stopOpacity={line.fillOpacity ?? 0.35}
                    />
                    <stop offset="100%" stopColor={line.fillColor ?? TONE_VAR[line.tone]} stopOpacity="0" />
                  </linearGradient>
                ) : null,
              )}
            </defs>

            {grid ? (
              <g className="stroke-app-line" strokeWidth="0.6" strokeDasharray="4 7">
                {ticks.map((tick) => {
                  const y = VIEW - (tick / max) * VIEW;
                  return (
                    <line key={tick} x1="0" x2={VIEW} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
                  );
                })}
                {labels.map((label, index) => {
                  const x = labels.length > 1 ? (index / (labels.length - 1)) * VIEW : 0;
                  return (
                    <line key={label} x1={x} x2={x} y1="0" y2={VIEW} vectorEffect="non-scaling-stroke" />
                  );
                })}
              </g>
            ) : null}

            {series.map((line, index) => {
              const points = toPoints(line.values, max, line.positions);
              const path = linePath(points, smooth);

              return (
                <g key={line.label}>
                  {line.fill ? (
                    <path
                      d={`${path} L${VIEW},${VIEW} L0,${VIEW} Z`}
                      fill={`url(#area-${index}-${line.label.replace(/\W/g, "")})`}
                    />
                  ) : null}
                  <path
                    d={path}
                    fill="none"
                    stroke={TONE_VAR[line.tone]}
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              );
            })}

            {markerPoint ? (
              <line
                x1={markerPoint.x}
                y1="0"
                x2={markerPoint.x}
                y2={VIEW}
                stroke="var(--ve-border-line)"
                strokeWidth="1"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}

            {markerPoint && !labelAtBottom ? (
              <circle
                cx={markerPoint.x}
                cy={markerPoint.y}
                r="2"
                fill="var(--ve-surface-default)"
                stroke={TONE_VAR[series[marker!.seriesIndex].tone]}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
          </svg>

          {markerPoint && labelAtBottom ? (
            // The ring is HTML so it stays round while the plot stretches:
            // Surface/Brand 2 around a 12px Brand 1 dot, with the design's glow.
            <span
              aria-hidden
              className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] bg-app-brand2 p-1 shadow-[0_0_16px_0_rgba(0,0,0,0.16)]"
              style={{ left: `${markerPoint.x}%`, top: `${markerPoint.y}%` }}
            >
              <span className="size-3 rounded-full bg-app-brand1" />
            </span>
          ) : null}

          {markerPoint && marker ? (
            // Outside the SVG so the label keeps the platform's type scale
            // instead of being stretched by preserveAspectRatio="none".
            <span
              className={`pointer-events-none absolute -translate-x-1/2 text-white ${
                labelAtBottom
                  ? "bottom-11 rounded-app-l bg-app-brand1 p-2 text-label-2xs"
                  : "-translate-y-1/2 rounded-app-4xl bg-app-brand1 px-2 py-0.5 text-body-2xs"
              }`}
              style={{
                left: `${markerPoint.x}%`,
                ...(labelAtBottom ? {} : { top: `${markerPoint.y}%` }),
              }}
            >
              {marker.label}
            </span>
          ) : null}
        </div>

        {grid ? (
          // Each label sits under its own gridline, 16px below the plot: the
          // first and last hug the edges, the rest are centred on the line.
          <div className="relative mt-4 h-[calc(12px*var(--ve-type-scale))]">
            {labels.map((label, index) => {
              const edge = index === 0 ? "start" : index === labels.length - 1 ? "end" : "middle";
              return (
                <span
                  key={label}
                  className={`absolute top-0 whitespace-nowrap text-body-2xs text-app-text-secondary ${
                    // On a phone twelve months do not fit; every other one is
                    // kept, always including the first and last, and the one
                    // just before the last goes so the two do not collide.
                    edge === "middle" && (index % 2 === 1 || index === labels.length - 2)
                      ? "max-sm:hidden"
                      : ""
                  } ${
                    edge === "start" ? "" : edge === "end" ? "-translate-x-full" : "-translate-x-1/2"
                  }`}
                  style={{ left: `${(index / Math.max(labels.length - 1, 1)) * 100}%` }}
                >
                  {label}
                </span>
              );
            })}
          </div>
        ) : (
          <div className="mt-2 flex justify-between">
            {labels.map((label) => (
              <span key={label} className="text-body-2xs text-app-text-secondary">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
