"use client";

import { useId } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AXIS_TICK, ChartTooltip, FORMATS, type ValueFormat } from "../charts/chart-kit";
import type { Risk } from "@/lib/platform/analytics";

/*
 * Charts for Analytics Reports, on Recharts — the library the Reports charts
 * already use, sharing their tooltip, tick style and token colours. The risk
 * map and the funnel are not chart types, so they stay plain markup.
 *
 * Client Components (Recharts measures the DOM), so formats travel as names.
 */

/** The design's grid: mint dashed lines, both directions. */
const GRID = { stroke: "var(--ve-border-brand2)", strokeDasharray: "3 3" } as const;
const HEIGHT = "h-44 sm:h-48";

export function LineChart({
  values,
  categories,
  ticks,
  color,
  format = "plain",
  area = false,
  name,
}: {
  values: readonly number[];
  categories: readonly string[];
  ticks: readonly number[];
  color: string;
  format?: ValueFormat;
  area?: boolean;
  name: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const data = categories.map((label, index) => ({ label, value: values[index] }));
  return (
    <div className={HEIGHT} role="img" aria-label={name}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -8 }}>
          <defs>
            <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ve-surface-brand1-80)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--ve-surface-brand1-80)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...GRID} />
          <XAxis dataKey="label" tick={AXIS_TICK} axisLine={{ stroke: "var(--ve-border-brand2)" }} tickLine={false} tickMargin={8} padding={{ left: 4, right: 4 }} />
          <YAxis
            domain={[ticks[0], ticks[ticks.length - 1]]}
            ticks={[...ticks]}
            tickFormatter={FORMATS[format]}
            tick={AXIS_TICK}
            axisLine={{ stroke: "var(--ve-border-brand2)" }}
            tickLine={false}
            width={50}
          />
          <Tooltip cursor={{ stroke: "var(--ve-border-line)", strokeDasharray: "3 3" }} content={<ChartTooltip format={format} />} />
          <Area
            name={name}
            dataKey="value"
            type="monotone"
            stroke={color}
            strokeWidth={2}
            fill={area ? `url(#${id}-fill)` : "none"}
            dot={{ r: 3.5, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--ve-surface-default)", fill: color }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChart({
  bars,
  ticks,
  format = "plain",
  name,
  barCategoryGap = "16%",
}: {
  bars: readonly { label: string; value: number; color: string }[];
  ticks: readonly number[];
  format?: ValueFormat;
  name: string;
  barCategoryGap?: string;
}) {
  return (
    <div className={HEIGHT} role="img" aria-label={name}>
      <ResponsiveContainer width="100%" height="100%">
        <RBarChart data={[...bars]} margin={{ top: 8, right: 8, bottom: 0, left: -8 }} barCategoryGap={barCategoryGap}>
          <CartesianGrid {...GRID} />
          <XAxis dataKey="label" tick={AXIS_TICK} axisLine={{ stroke: "var(--ve-border-brand2)" }} tickLine={false} tickMargin={8} interval={0} />
          <YAxis
            domain={[ticks[0], ticks[ticks.length - 1]]}
            ticks={[...ticks]}
            tickFormatter={FORMATS[format]}
            tick={AXIS_TICK}
            axisLine={{ stroke: "var(--ve-border-brand2)" }}
            tickLine={false}
            width={50}
            allowDataOverflow
          />
          <Tooltip cursor={{ fill: "var(--ve-surface-brand2-16)" }} content={<ChartTooltip format={format} />} />
          <Bar name={name} dataKey="value" radius={[3, 3, 0, 0]} animationDuration={900}>
            {bars.map((bar) => (
              <Cell key={bar.label} fill={bar.color} />
            ))}
          </Bar>
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HorizontalBars({
  bars,
  ticks,
  name,
}: {
  bars: readonly { label: readonly string[]; value: number; color: string }[];
  ticks: readonly number[];
  name: string;
}) {
  const data = bars.map((bar) => ({ label: bar.label.join(" "), value: bar.value, color: bar.color }));
  return (
    <div className={HEIGHT} role="img" aria-label={name}>
      <ResponsiveContainer width="100%" height="100%">
        <RBarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 0 }} barCategoryGap="18%">
          <CartesianGrid {...GRID} />
          <XAxis
            type="number"
            domain={[ticks[0], ticks[ticks.length - 1]]}
            ticks={[...ticks]}
            tick={AXIS_TICK}
            axisLine={{ stroke: "var(--ve-border-brand2)" }}
            tickLine={false}
            tickMargin={6}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={78}
            tick={{ className: "fill-app-text-secondary text-[calc(8px*var(--ve-type-scale))] font-app" }}
            axisLine={{ stroke: "var(--ve-border-brand2)" }}
            tickLine={false}
          />
          <Tooltip cursor={{ fill: "var(--ve-surface-brand2-16)" }} content={<ChartTooltip />} />
          <Bar name={name} dataKey="value" radius={[0, 3, 3, 0]} animationDuration={900}>
            {data.map((bar) => (
              <Cell key={bar.label} fill={bar.color} />
            ))}
          </Bar>
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Ring({
  slices,
  total,
  size,
  thickness,
}: {
  slices: readonly { label: string; percent: number; color: string }[];
  total: string;
  /** Rendered diameter in px, before the type scale. */
  size: number;
  thickness: number;
}) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: `calc(${size}px * var(--ve-type-scale))`, height: `calc(${size}px * var(--ve-type-scale))` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<ChartTooltip format="percent" />} />
          <Pie
            data={slices.map((slice) => ({ name: slice.label, value: slice.percent, fill: slice.color }))}
            dataKey="value"
            nameKey="name"
            innerRadius={`${100 - thickness * 2}%`}
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={1.5}
            stroke="none"
            animationDuration={900}
          >
            {slices.map((slice) => (
              <Cell key={slice.label} fill={slice.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-label-xs font-bold text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">{total}</span>
        <span className="text-[calc(8px*var(--ve-type-scale))] text-app-text-tertiary">Total</span>
      </span>
    </div>
  );
}

const RISK_COLOR: Record<Risk, string> = {
  low: "var(--ve-slate)",
  medium: "var(--ve-accent)",
  high: "var(--ve-warning)",
};

export function RiskMap({ states }: { states: readonly { state: string; x: number; y: number; risk: Risk }[] }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "379 / 220" }} role="img" aria-label="Tenant risk by state">
      <div className="absolute inset-x-0 top-0 bottom-[11.8%] rounded-[3px] bg-app-brand2-quaternary" />
      {states.map(({ state, x, y, risk }) => (
        <span
          key={state}
          title={`${state}: ${risk} risk`}
          className="absolute size-[2.4%] min-h-1.5 min-w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 transition-transform hover:scale-150"
          style={{ left: `${x}%`, top: `${y}%`, backgroundColor: RISK_COLOR[risk], aspectRatio: "1" }}
        />
      ))}
    </div>
  );
}
