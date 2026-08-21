import type { Metric } from "@/lib/platform/dashboard";

/*
 * Metric card — Figma node 18046:23458 ("Metric Item Column").
 *
 * Glass panel: Surface/Fade (Brand 2)/16% behind a 0.6px Brand 2 hairline,
 * Radius/XL 20, padding Gap/L 16, 12px backdrop blur. Inside, the label is
 * Label/2XS in Text/Secondary, the figure is Heading/M in Text/Brand 1, and
 * the delta is Label/2XS tinted by direction.
 *
 * This is the single most repeated component in the platform — the dashboard
 * alone stamps it twelve times — so every other screen should reuse it rather
 * than redraw the panel.
 */
export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="flex h-full flex-1 items-stretch gap-2 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]">
      {/* justify-between pins the figure to the bottom of the card, so a label
          that wraps to two lines does not push its number out of line with the
          cards beside it. */}
      <div className="flex min-w-px flex-1 flex-col justify-between gap-2">
        <p className="text-label-2xs text-app-text-secondary">{metric.label}</p>
        <div className="flex items-end gap-1">
          <p className="whitespace-nowrap text-heading-m text-app-text-brand1">
            {metric.value}
          </p>
          {metric.unit ? (
            <span className="flex h-full items-end py-1 text-label-2xs text-app-text-secondary">
              {metric.unit}
            </span>
          ) : null}
          {metric.delta ? (
            <span
              className={`flex h-full items-end whitespace-nowrap py-1 text-label-2xs ${
                metric.trend === "down" ? "text-app-warning" : "text-app-success"
              }`}
            >
              {metric.delta}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
