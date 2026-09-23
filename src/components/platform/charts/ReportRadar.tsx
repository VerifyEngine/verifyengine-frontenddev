"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartTooltip, toneVar } from "./chart-kit";
import type { RadarPoint } from "./RadarChart";
import type { ChartTone } from "./tones";

/*
 * The radars on Reports, drawn with Recharts — Escalation Radar (Figma
 * 18176:36849) and Client Risk Radar (18176:37251).
 *
 * Order Details' Score Radar keeps its hand-drawn RadarChart; only the Reports
 * cards moved to Recharts.
 */

type Dot = { cx?: number; cy?: number; index?: number };

export function ReportRadar({
  points,
  max,
  tone,
  fillOpacity = 0.35,
  showScale = false,
  name = "Value",
  stroke,
  fill,
}: {
  points: readonly RadarPoint[];
  max: number;
  /** Colour of the shape. Points with their own tone keep it on their dot. */
  tone: ChartTone;
  fillOpacity?: number;
  /** Prints the ring values up the first spoke, as Client Risk Radar does. */
  showScale?: boolean;
  name?: string;
  /** Overrides for Escalation Radar, which draws a purple shape with a mint edge. */
  stroke?: string;
  fill?: string;
}) {
  const data = points.map((point) => ({ axis: point.label, value: point.value }));

  const renderDot = ({ cx = 0, cy = 0, index = 0 }: Dot) => {
    const point = points[index];
    return (
      <g key={point?.label ?? index}>
        <circle cx={cx} cy={cy} r={4} fill={toneVar(point?.tone ?? tone)} stroke="var(--ve-surface-default)" strokeWidth={1.5} />
        <text x={cx} y={cy - 12} textAnchor="middle" className="fill-app-text text-body-2xs font-app">
          {point?.value}
        </text>
      </g>
    );
  };

  return (
    // The axis names sit outside the plot; let them overhang the SVG rather
    // than be clipped by it.
    <div className="aspect-square w-full max-w-[26rem] max-sm:w-[70%] [&_svg]:overflow-visible">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar data={data} outerRadius="62%">
          <PolarGrid stroke="var(--ve-border-line)" strokeWidth={0.6} />
          <PolarAngleAxis dataKey="axis" tick={{ className: "fill-app-text-secondary text-label-2xs font-app" }} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, max]}
            tickCount={6}
            tick={showScale ? { className: "fill-app-text-tertiary text-body-2xs font-app" } : false}
            axisLine={false}
          />
          <Tooltip content={<ChartTooltip format="plain" />} />
          <Radar
            name={name}
            dataKey="value"
            stroke={stroke ?? toneVar(tone)}
            strokeWidth={1.5}
            fill={fill ?? toneVar(tone)}
            fillOpacity={fillOpacity}
            dot={renderDot}
            activeDot={false}
            animationDuration={800}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
