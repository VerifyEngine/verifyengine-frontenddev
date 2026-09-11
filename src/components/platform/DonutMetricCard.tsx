import type { DonutMetric } from "@/lib/platform/dashboard";

/*
 * Donut metric — Figma node 18172:6307 ("Human Escalation Metric").
 *
 * Label and figure follow the same type scale as MetricCard; the difference is
 * the legend column and the ring beside it.
 *
 * The ring is drawn with one SVG circle per slice using stroke-dasharray
 * rather than generated paths: each slice is a fraction of the circumference,
 * offset by the slices before it. That keeps the arcs exact at any size and
 * needs no charting dependency for what is, geometrically, a stroked circle.
 */

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Figma leaves a small gap between slices. */
const SLICE_GAP = 4;

/** Each slice starts where the previous ones ended. */
function toArcs(slices: DonutMetric["slices"]) {
  return slices.map((slice, index) => {
    const before = slices
      .slice(0, index)
      .reduce((total, previous) => total + previous.percent, 0);
    return {
      slice,
      length: (slice.percent / 100) * CIRCUMFERENCE,
      offset: (before / 100) * CIRCUMFERENCE,
    };
  });
}

export function DonutMetricCard({ metric }: { metric: DonutMetric }) {
  const arcs = toArcs(metric.slices);

  return (
    <div className="flex flex-1 gap-2 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]">
      <div className="flex min-w-px flex-1 flex-col gap-2">
        <p className="text-label-2xs text-app-text-secondary">{metric.label}</p>

        <ul className="flex min-h-px flex-1 flex-col justify-center gap-2">
          {metric.slices.map((slice) => (
            <li key={slice.label} className="flex items-center gap-1">
              <span
                aria-hidden
                className="size-3 shrink-0 rounded-app-12xl"
                style={{ backgroundColor: slice.color }}
              />
              <span className="whitespace-nowrap text-body-2xs text-app-text">
                {slice.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-end gap-1">
          <p className="whitespace-nowrap text-heading-m text-app-text-emphasis">
            {metric.value}
          </p>
          <span
            className={`flex h-full items-end whitespace-nowrap py-1 text-label-2xs ${
              metric.trend === "up" ? "text-app-success" : "text-app-warning"
            }`}
          >
            {metric.delta}
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 100 100"
        className="size-[108px] shrink-0 -rotate-90 self-center"
        role="img"
        aria-label={metric.slices.map((s) => s.label).join(", ")}
      >
        {arcs.map(({ slice, length, offset }) => {
          const dash = Math.max(length - SLICE_GAP, 0);
          return (
            <circle
              key={slice.label}
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke={slice.color}
              strokeWidth="16"
              strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
              strokeDashoffset={-offset}
            />
          );
        })}
      </svg>
    </div>
  );
}
