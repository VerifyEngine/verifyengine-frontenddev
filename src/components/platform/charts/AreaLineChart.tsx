"use client";

import { useId } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AXIS_TICK, ChartTooltip, FORMATS, GRID_PROPS, toneVar, type ValueFormat } from "./chart-kit";
import type { ChartSeries } from "./tones";

/*
 * The line and area charts on Reports, drawn with Recharts — Figma nodes
 * 18176:36464 (Billing Usage), 18176:37115 (AI Outreach Performance),
 * 18176:37195 (Human Override Rate) and 18176:38003 (System Failure
 * Monitoring).
 *
 * The x axis is numeric, 0 to 1 across the plot. That lets series with
 * different sample counts — and Human Override's unevenly spaced anchors —
 * share one chart and still each run edge to edge, as every line in the design
 * is its own layer stretched to the plot. Month labels sit on the same scale.
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
 * A highlighted reading, by sample (`pointIndex`) or horizontal position
 * (`at`, 0–1). `labelAt: "bottom"` sits the value pill low on the guide line,
 * as the outreach charts and Human Override Rate draw it.
 */
export type LineMarker = {
  seriesIndex: number;
  pointIndex?: number;
  at?: number;
  label: string;
  labelAt?: "point" | "bottom";
};

type Row = { x: number } & Record<string, number | null>;

function xOf(series: LineSeries, index: number) {
  if (series.positions) return series.positions[index];
  return series.values.length > 1 ? index / (series.values.length - 1) : 0;
}

/** Every series' samples merged into one table keyed by x. */
function toRows(series: readonly LineSeries[]): Row[] {
  const byX = new Map<number, Row>();
  series.forEach((line, lineIndex) => {
    line.values.forEach((value, index) => {
      const x = Math.round(xOf(line, index) * 10000) / 10000;
      const row = byX.get(x) ?? ({ x } as Row);
      row[`s${lineIndex}`] = value;
      byX.set(x, row);
    });
  });
  return [...byX.values()].sort((a, b) => a.x - b.x);
}

/** Linear read of a series at x, for where the marker sits on its line. */
function valueAt(line: LineSeries, x: number) {
  const points = line.values.map((value, index) => ({ x: xOf(line, index), value }));
  const after = points.findIndex((p) => p.x >= x);
  if (after <= 0) return points[Math.max(after, 0)].value;
  const a = points[after - 1];
  const b = points[after];
  return a.value + ((x - a.x) / (b.x - a.x)) * (b.value - a.value);
}

/** The navy value pill, drawn in SVG so it rides on the chart's own geometry. */
function Pill({ x, y, text }: { x: number; y: number; text: string }) {
  const width = 16 + text.length * 8;
  return (
    <g>
      <rect x={x - width / 2} y={y - 13} width={width} height={26} rx={13} fill="var(--ve-surface-brand1)" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" className="fill-white text-label-2xs font-app">
        {text}
      </text>
    </g>
  );
}

export function AreaLineChart({
  series,
  labels,
  max,
  min = 0,
  yTicks = 5,
  format,
  marker,
  heightClass = "h-64",
  grid = true,
  smooth = false,
  strokeWidth = 2,
  dots = false,
}: {
  series: readonly LineSeries[];
  labels: readonly string[];
  max: number;
  /** Bottom of the value axis, when the readings sit in a narrow band. */
  min?: number;
  yTicks?: number;
  format: ValueFormat;
  marker?: LineMarker;
  heightClass?: string;
  grid?: boolean;
  smooth?: boolean;
  strokeWidth?: number;
  /** Marks every sample, as the Client Profile trends draw them. */
  dots?: boolean;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const rows = toRows(series);
  const ticks = Array.from({ length: yTicks }, (_, index) => min + ((max - min) / (yTicks - 1)) * index);
  const labelTicks = labels.map((_, index) => (labels.length > 1 ? index / (labels.length - 1) : 0));
  const labelFor = (x: number) => labels[Math.round(x * (labels.length - 1))] ?? "";

  const markerLine = marker ? series[marker.seriesIndex] : undefined;
  const markerX =
    marker && markerLine
      ? marker.pointIndex !== undefined
        ? xOf(markerLine, marker.pointIndex)
        : (marker.at ?? 0.5)
      : undefined;
  const markerY = markerLine && markerX !== undefined ? valueAt(markerLine, markerX) : undefined;
  const pillY = marker?.labelAt === "bottom" ? min + (max - min) * 0.14 : markerY;

  return (
    <div className={`px-3 pb-2 ${heightClass}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rows} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
          <defs>
            {series.map((line, index) => (
              <linearGradient key={line.label} id={`${id}-fill-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={line.fillColor ?? toneVar(line.tone)} stopOpacity={line.fillOpacity ?? 0.32} />
                <stop offset="100%" stopColor={line.fillColor ?? toneVar(line.tone)} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          {grid ? <CartesianGrid {...GRID_PROPS} /> : null}

          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 1]}
            ticks={labelTicks}
            tickFormatter={labelFor}
            interval="preserveStartEnd"
            minTickGap={20}
            tick={AXIS_TICK}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            domain={[min, max]}
            ticks={ticks}
            tickFormatter={FORMATS[format]}
            width={40}
            tick={AXIS_TICK}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ stroke: "var(--ve-border-line)", strokeDasharray: "3 3" }}
            content={<ChartTooltip format={format} labelFor={(x) => labelFor(Number(x))} />}
          />

          {series.map((line, index) => (
            <Area
              key={line.label}
              name={line.label}
              dataKey={`s${index}`}
              type={smooth ? "natural" : "linear"}
              connectNulls
              stroke={toneVar(line.tone)}
              strokeWidth={strokeWidth}
              fill={line.fill ? `url(#${id}-fill-${index})` : "none"}
              dot={dots ? { r: 3.5, strokeWidth: 0, fill: toneVar(line.tone) } : false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--ve-surface-default)" }}
              animationDuration={900}
            />
          ))}

          {marker && markerX !== undefined && markerY !== undefined && pillY !== undefined ? (
            <>
              <ReferenceLine x={markerX} stroke="var(--ve-border-line)" strokeDasharray="3 3" />
              <ReferenceDot x={markerX} y={markerY} r={6} fill="var(--ve-surface-brand1)" stroke="var(--ve-surface-brand2)" strokeWidth={4} />
              <ReferenceDot
                x={markerX}
                y={pillY}
                r={0}
                label={(props: { viewBox?: { cx?: number; cy?: number; x?: number; y?: number } }) => {
                  const box = props.viewBox ?? {};
                  const cx = box.cx ?? box.x ?? 0;
                  const cy = box.cy ?? box.y ?? 0;
                  return <Pill x={cx} y={marker.labelAt === "bottom" ? cy : cy - 24} text={marker.label} />;
                }}
              />
            </>
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
