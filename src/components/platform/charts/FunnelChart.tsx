import { TONE_VAR, type ChartSeries } from "./tones";

/*
 * Verification Funnel — Figma node 18176:37194.
 *
 * Each stage is a trapezoid: it starts as wide as the stage above it ended and
 * narrows in proportion to its own share, so the silhouette tapers to the last
 * stage. Written as SVG polygons because a trapezoid is not a CSS box.
 *
 * The widths come from each stage's percentage, which means the shape follows
 * the data rather than the six fixed shapes the design happens to draw.
 */

export type FunnelStage = ChartSeries & {
  value: string;
  percent: number;
};

const VIEW_W = 100;
const STAGE_H = 40;

export function FunnelChart({
  stages,
  totalLabel,
  total,
}: {
  stages: readonly FunnelStage[];
  totalLabel: string;
  total: string;
}) {
  const height = stages.length * STAGE_H;

  // Each boundary is the width at that point, from full width down to the
  // narrowest stage. The first stage starts at 100% of the plot.
  const widths = [100, ...stages.map((stage) => Math.max(stage.percent, 6))];

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      {/* The plot fills whatever height the row gives it — beside Operational
          Workload that is the design's 604px block. Sized by its own viewBox it
          would take its height from the card's width and grow to ~1400px. */}
      <div className="relative min-h-96 flex-1">
        <svg
          viewBox={`0 0 ${VIEW_W} ${height}`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          role="img"
          aria-label={stages.map((s) => `${s.label} ${s.value}`).join(", ")}
        >
          {stages.map((stage, index) => {
            const top = widths[index];
            const bottom = widths[index + 1];
            const y = index * STAGE_H;
            const topLeft = (VIEW_W - top) / 2;
            const bottomLeft = (VIEW_W - bottom) / 2;

            return (
              <polygon
                key={stage.label}
                points={`${topLeft},${y} ${topLeft + top},${y} ${bottomLeft + bottom},${y + STAGE_H} ${bottomLeft},${y + STAGE_H}`}
                fill={TONE_VAR[stage.tone]}
              />
            );
          })}
        </svg>

        {/* Labels sit above the shape so they keep the platform's type scale. */}
        <div className="absolute inset-0 flex flex-col">
          {stages.map((stage) => (
            <div
              key={stage.label}
              className="flex min-h-px flex-1 flex-col items-center justify-center text-center"
            >
              <span className="text-body-2xs text-app-text-inverse opacity-80">{stage.label}</span>
              <span className="text-label-2xs text-app-text-inverse">
                {stage.value} ({stage.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-label-xs text-app-text">{totalLabel}</span>
        <span className="text-label-xs text-app-text">{total}</span>
      </div>
    </div>
  );
}
