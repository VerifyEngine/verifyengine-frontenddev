"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip, toneVar } from "./chart-kit";
import type { ChartSeries } from "./tones";

/*
 * Compliance Completion — Figma node 18176:37915, drawn with Recharts.
 *
 * Four concentric progress rings, outermost first, each over a full track in
 * Surface/Brand 2/Secondary, running clockwise from three o'clock with round
 * caps. The shares are read out in a row of navy pills along the three o'clock
 * radius, one per ring.
 */

export type RingProgress = ChartSeries & { percent: number };

/** Ring thickness and the gap between rings, as fractions of the radius. */
const INNER = 12;
const OUTER = 100;

export function RingProgressChart({ rings }: { rings: readonly RingProgress[] }) {
  // RadialBarChart draws its first entry innermost; the design lists outermost first.
  const data = [...rings].reverse().map((ring) => ({
    name: ring.label,
    value: ring.percent,
    fill: toneVar(ring.tone),
  }));
  const band = (OUTER - INNER) / rings.length;

  return (
    <div className="flex h-full items-center justify-center p-7">
      <div className="relative aspect-square w-full max-w-[448px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={data}
            innerRadius={`${INNER}%`}
            outerRadius={`${OUTER}%`}
            startAngle={0}
            endAngle={-360}
            barCategoryGap="12%"
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip content={<ChartTooltip format="plain" />} cursor={false} />
            <RadialBar
              dataKey="value"
              cornerRadius={999}
              background={{ fill: "var(--ve-surface-brand2-secondary)" }}
              animationDuration={900}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* The shares, on each ring's centre line at three o'clock. */}
        {rings.map((ring, index) => {
          const radius = OUTER - band * index - band / 2;
          return (
            <span
              key={ring.label}
              className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-app-l bg-app-brand1 p-1 text-body-2xs font-bold text-white"
              style={{ left: `${50 + radius / 2}%` }}
            >
              {ring.percent}%
            </span>
          );
        })}
      </div>
    </div>
  );
}
