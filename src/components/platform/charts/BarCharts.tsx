"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AXIS_TICK, ChartTooltip, FORMATS, GRID_PROPS, toneVar, type ValueFormat } from "./chart-kit";
import type { ChartSeries } from "./tones";

/*
 * The bar charts on Reports, drawn with Recharts — Figma nodes 18176:36384
 * (Monthly Volume, stacked), 18176:36533 (Operational Workload, grouped) and
 * 18176:36849 (SLA Risk Monitor, columns).
 *
 * All three take the same rows: a label and one value per series, in the
 * legend's order. The legend itself stays in ChartCard so every Reports card
 * keeps the same one.
 */

export type BarRow = {
  label: string;
  /** One value per series, in the same order as the card's legend. */
  values: readonly number[];
};

function toData(rows: readonly BarRow[], series: readonly ChartSeries[]) {
  return rows.map((row) => ({
    label: row.label,
    ...Object.fromEntries(series.map((s, i) => [s.label, row.values[i] ?? 0])),
  }));
}

function ticks(max: number, steps: number) {
  return Array.from({ length: steps + 1 }, (_, index) => (max / steps) * index);
}

const CURSOR = { fill: "var(--ve-surface-brand2-16)" };

/** Segments of one row laid end to end, as on Monthly Volume. */
export function StackedBarChart({
  rows,
  series,
  max,
  steps = 8,
  format,
}: {
  rows: readonly BarRow[];
  series: readonly ChartSeries[];
  max: number;
  steps?: number;
  format: ValueFormat;
}) {
  const last = series.length - 1;
  return (
    <div className="h-80 px-3 pb-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={toData(rows, series)} layout="vertical" barCategoryGap="30%" margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid {...GRID_PROPS} horizontal={false} />
          <XAxis type="number" domain={[0, max]} ticks={ticks(max, steps)} tickFormatter={FORMATS[format]} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="label" width={48} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <Tooltip cursor={CURSOR} content={<ChartTooltip format={format} />} />
          {series.map((s, index) => (
            <Bar
              key={s.label}
              dataKey={s.label}
              stackId="stack"
              fill={toneVar(s.tone)}
              // Only the end of the stack is rounded, as the design draws it.
              radius={index === last ? [0, 8, 8, 0] : 0}
              animationDuration={700}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** One bar per series stacked vertically inside each row, as on Operational Workload. */
export function GroupedBarChart({
  rows,
  series,
  max,
  steps = 7,
  format,
}: {
  rows: readonly BarRow[];
  series: readonly ChartSeries[];
  max: number;
  steps?: number;
  format: ValueFormat;
}) {
  return (
    <div className="h-[26rem] px-3 pb-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={toData(rows, series)} layout="vertical" barCategoryGap="18%" barGap={3} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid {...GRID_PROPS} horizontal={false} />
          <XAxis type="number" domain={[0, max]} ticks={ticks(max, steps)} tickFormatter={FORMATS[format]} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="label" width={48} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <Tooltip cursor={CURSOR} content={<ChartTooltip format={format} />} />
          {series.map((s) => (
            <Bar key={s.label} dataKey={s.label} fill={toneVar(s.tone)} radius={[0, 6, 6, 0]} maxBarSize={10} animationDuration={700} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Vertical columns grouped per period, as on SLA Risk Monitor. */
export function ColumnChart({
  rows,
  series,
  max,
  steps = 5,
  format,
}: {
  rows: readonly BarRow[];
  series: readonly ChartSeries[];
  max: number;
  steps?: number;
  format: ValueFormat;
}) {
  return (
    <div className="h-80 px-3 pb-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={toData(rows, series)} barCategoryGap="22%" barGap={3} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid {...GRID_PROPS} vertical={false} />
          <XAxis dataKey="label" tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis domain={[0, max]} ticks={ticks(max, steps)} tickFormatter={FORMATS[format]} width={48} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <Tooltip cursor={CURSOR} content={<ChartTooltip format={format} />} />
          {series.map((s) => (
            <Bar key={s.label} dataKey={s.label} fill={toneVar(s.tone)} radius={[6, 6, 0, 0]} maxBarSize={20} animationDuration={700} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
