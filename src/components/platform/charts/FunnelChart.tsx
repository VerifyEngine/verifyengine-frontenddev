"use client";

import { Cell, Funnel, FunnelChart as RechartsFunnel, LabelList, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip, toneVar } from "./chart-kit";
import type { ChartSeries } from "./tones";

/*
 * Verification Funnel — Figma node 18176:37194, drawn with Recharts.
 *
 * Each stage is a trapezoid that starts as wide as the stage above it ended
 * and narrows to its own share, so the silhouette follows the data. Recharts
 * draws each trapezoid from its value down to the next one's, so the widths
 * fed in are the stage boundaries: the full plot, then each stage's share
 * (floored so a tiny stage still has room for its label).
 */

export type FunnelStage = ChartSeries & {
  value: string;
  percent: number;
};

type Datum = { name: string; width: number; tone: FunnelStage["tone"]; value: string; percent: number };

function StageLabel(props: { x?: number; y?: number; width?: number; height?: number; index?: number; data: Datum[] }) {
  const { x = 0, y = 0, width = 0, height = 0, index = 0, data } = props;
  const stage = data[index];
  if (!stage) return null;
  const cx = x + width / 2;
  const cy = y + height / 2;
  return (
    <g pointerEvents="none">
      <text x={cx} y={cy - 8} textAnchor="middle" dominantBaseline="central" className="fill-white text-body-2xs font-app opacity-80">
        {stage.name}
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" dominantBaseline="central" className="fill-white text-label-2xs font-app">
        {stage.value} ({stage.percent}%)
      </text>
    </g>
  );
}

export function FunnelChart({
  stages,
  totalLabel,
  total,
}: {
  stages: readonly FunnelStage[];
  totalLabel: string;
  total: string;
}) {
  const data: Datum[] = stages.map((stage, index) => ({
    name: stage.label,
    width: index === 0 ? 100 : Math.max(stages[index - 1].percent, 6),
    tone: stage.tone,
    value: stage.value,
    percent: stage.percent,
  }));

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      {/* The plot fills whatever height the row gives it — beside Operational
          Workload that is the design's 604px block. */}
      <div className="relative min-h-96 flex-1">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsFunnel>
              <Tooltip
                content={({ active, payload }) => (
                  <ChartTooltip
                    active={active}
                    format="plain"
                    payload={payload?.map((entry) => {
                      const stage = entry.payload as Datum;
                      return { name: stage.name, value: `${stage.value} (${stage.percent}%)`, color: toneVar(stage.tone) };
                    })}
                  />
                )}
              />
              <Funnel dataKey="width" data={data} isAnimationActive animationDuration={800} lastShapeType="rectangle" stroke="none">
                {data.map((entry) => (
                  <Cell key={entry.name} fill={toneVar(entry.tone)} />
                ))}
                <LabelList content={(props) => <StageLabel {...(props as object)} data={data} />} />
              </Funnel>
            </RechartsFunnel>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-label-xs text-app-text">{totalLabel}</span>
        <span className="text-label-xs text-app-text">{total}</span>
      </div>
    </div>
  );
}
