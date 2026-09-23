"use client";

import { Cell, Pie, PieChart as RechartsPie, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip, toneVar } from "./chart-kit";
import type { ChartSeries } from "./tones";

/*
 * Donuts on Reports, drawn with Recharts — Verification Breakdown and Fraud
 * Detection Breakdown (Figma 18176:37710, 18176:37809), and the ring inside
 * Queue Status Distribution (PieChart.tsx).
 *
 * Slices start at twelve o'clock and run clockwise, parted by a small gap with
 * rounded corners, the share written on each slice in a navy pill.
 */

export type DonutSlice = ChartSeries & { percent: number };

const RADIAN = Math.PI / 180;

/** The share badge at the middle of each slice. */
function SliceBadge(props: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  value?: number;
}) {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, value = 0 } = props;
  const radius = (innerRadius + outerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const text = `${value}%`;
  const width = 14 + text.length * 7;
  return (
    <g pointerEvents="none">
      <rect x={x - width / 2} y={y - 12} width={width} height={24} rx={12} fill="var(--ve-surface-brand1)" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" className="fill-white text-body-2xs font-app">
        {text}
      </text>
    </g>
  );
}

/** The ring itself; the cards around it decide the size and what sits beside it. */
export function DonutRing({
  slices,
  inner = "47%",
  outer = "98%",
  children,
}: {
  slices: readonly DonutSlice[];
  inner?: string;
  outer?: string;
  /** Rendered in the hole, e.g. the total. */
  children?: React.ReactNode;
}) {
  const data = slices.map((slice) => ({ name: slice.label, value: slice.percent, tone: slice.tone }));
  return (
    <div className="relative aspect-square w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPie>
          <Tooltip content={<ChartTooltip format="plain" />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            startAngle={90}
            endAngle={-270}
            innerRadius={inner}
            outerRadius={outer}
            paddingAngle={1.5}
            cornerRadius={8}
            stroke="none"
            labelLine={false}
            label={SliceBadge}
            animationDuration={800}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={toneVar(entry.tone)} />
            ))}
          </Pie>
        </RechartsPie>
      </ResponsiveContainer>
      {children ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">{children}</div>
      ) : null}
    </div>
  );
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
  return (
    <div className="flex h-full items-center justify-center p-7">
      <div className="w-full max-w-[500px]">
        <DonutRing slices={slices}>
          <div className="flex w-40 flex-col gap-1 text-center">
            <span className="text-label-2xs font-bold text-app-text-secondary">{totalLabel}</span>
            <span className="text-heading-l text-app-text-emphasis">{total}</span>
          </div>
        </DonutRing>
      </div>
    </div>
  );
}
