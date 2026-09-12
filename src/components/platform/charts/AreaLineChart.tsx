import { TONE_VAR, type ChartSeries } from "./ChartCard";

/*
 * The line charts on Reports — Figma nodes 18176:36464 (Billing Usage) and the
 * three "Chart Flow / Gradient / line" blocks further down.
 *
 * SVG rather than divs, because a polyline through N points is geometry: the
 * points are mapped into a 0-100 viewBox on both axes and the path is written
 * from them. `preserveAspectRatio="none"` lets the plot stretch with the card
 * while the stroke is kept honest with `vector-effect`.
 *
 * The gradient wash under the first series is the one in the design; it is
 * painted from the series colour so it follows the token rather than a hex.
 */

export type LineSeries = ChartSeries & {
  values: readonly number[];
  /** Only the first series is drawn with a wash beneath it, as in the design. */
  fill?: boolean;
};

export type LineMarker = { seriesIndex: number; pointIndex: number; label: string };

const VIEW = 100;

function toPoints(values: readonly number[], max: number) {
  const step = values.length > 1 ? VIEW / (values.length - 1) : 0;
  return values.map((value, index) => ({
    x: index * step,
    y: VIEW - (Math.min(Math.max(value, 0), max) / max) * VIEW,
  }));
}

export function AreaLineChart({
  series,
  labels,
  max,
  yTicks,
  formatY,
  marker,
}: {
  series: readonly LineSeries[];
  labels: readonly string[];
  max: number;
  yTicks?: number;
  formatY: (value: number) => string;
  marker?: LineMarker;
}) {
  const tickCount = yTicks ?? 5;
  const ticks = Array.from({ length: tickCount }, (_, index) => (max / (tickCount - 1)) * index)
    .reverse();

  const markerPoint =
    marker !== undefined
      ? toPoints(series[marker.seriesIndex].values, max)[marker.pointIndex]
      : undefined;

  return (
    <div className="flex gap-3 px-5 pb-5">
      <div className="flex w-10 shrink-0 flex-col justify-between text-right">
        {ticks.map((tick) => (
          <span key={tick} className="text-body-2xs text-app-text-secondary">
            {formatY(tick)}
          </span>
        ))}
      </div>

      <div className="min-w-px flex-1">
        <div className="relative h-56">
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            preserveAspectRatio="none"
            className="size-full"
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
                    <stop offset="0%" stopColor={TONE_VAR[line.tone]} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={TONE_VAR[line.tone]} stopOpacity="0" />
                  </linearGradient>
                ) : null,
              )}
            </defs>

            {series.map((line, index) => {
              const points = toPoints(line.values, max);
              const path = points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");

              return (
                <g key={line.label}>
                  {line.fill ? (
                    <polygon
                      points={`0,${VIEW} ${path} ${VIEW},${VIEW}`}
                      fill={`url(#area-${index}-${line.label.replace(/\W/g, "")})`}
                    />
                  ) : null}
                  <polyline
                    points={path}
                    fill="none"
                    stroke={TONE_VAR[line.tone]}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              );
            })}

            {markerPoint ? (
              <g>
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
                <circle
                  cx={markerPoint.x}
                  cy={markerPoint.y}
                  r="2"
                  fill="var(--ve-surface-default)"
                  stroke={TONE_VAR[series[marker!.seriesIndex].tone]}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ) : null}
          </svg>

          {markerPoint && marker ? (
            // Outside the SVG so the label keeps the platform's type scale
            // instead of being stretched by preserveAspectRatio="none".
            <span
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-app-4xl bg-app-brand1 px-2 py-0.5 text-body-2xs text-white"
              style={{ left: `${markerPoint.x}%`, top: `${markerPoint.y}%` }}
            >
              {marker.label}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex justify-between">
          {labels.map((label) => (
            <span key={label} className="text-body-2xs text-app-text-secondary">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
