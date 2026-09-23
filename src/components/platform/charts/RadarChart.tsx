/*
 * Radar plot — the shape behind Order Details' Score Radar (Figma node
 * 18216:28611) and Reports' Escalation Radar (18176:36849).
 *
 * One polygon per ring, one spoke per axis, and the data polygon on top.
 * Axis i sits at -90° + i * (360 / n), so the first axis points straight up.
 *
 * The two callers differ only in what they label: Order Details prints the
 * ring scale up the vertical axis, Escalation Radar prints each point's own
 * value beside it. Both are options here rather than two near-identical charts.
 * Client Risk Radar (18176:37251) uses both at once and colours each point to
 * match its legend entry.
 */

import { TONE_VAR, type ChartSeries } from "./tones";

export type RadarPoint = { label: string; value: number; tone?: ChartSeries["tone"] };

const SIZE = 320;
const CENTRE = SIZE / 2;
const RADIUS = 112;

function toXY(index: number, count: number, ratio: number, clamp = true) {
  const angle = (-90 + (360 / count) * index) * (Math.PI / 180);
  const distance = (clamp ? Math.min(Math.max(ratio, 0), 1) : ratio) * RADIUS;
  return { x: CENTRE + distance * Math.cos(angle), y: CENTRE + distance * Math.sin(angle) };
}

function ring(count: number, ratio: number) {
  return Array.from({ length: count }, (_, index) => {
    const { x, y } = toXY(index, count, ratio);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

export function RadarChart({
  points,
  max,
  rings = 5,
  showRingScale = false,
  showPointValues = false,
  strokeClass = "stroke-app-line-brand2",
  fillClass = "fill-app-brand1-80",
  shapeOpacityClass = "opacity-70",
  labelClass = "fill-app-text-tertiary text-body-2xs",
}: {
  points: readonly RadarPoint[];
  max: number;
  rings?: number;
  /** Prints the ring values up the vertical axis, as Order Details does. */
  showRingScale?: boolean;
  /** Prints each point's value next to it, as the Escalation Radar does. */
  showPointValues?: boolean;
  strokeClass?: string;
  fillClass?: string;
  /** Client Risk Radar draws its shape at full strength, the fade is in the fill. */
  shapeOpacityClass?: string;
  /** The axis names; Client Risk Radar sets them in Label/2XS, Text/Secondary. */
  labelClass?: string;
}) {
  const count = points.length;
  const ratios = Array.from({ length: rings }, (_, index) => (index + 1) / rings);
  const shape = points
    .map((point, index) => {
      const { x, y } = toXY(index, count, point.value / max);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      // Axis names sit outside the outermost ring and are wider than the
      // viewBox allows at the platform's type scale, so they may overhang it.
      className="w-full max-w-96 overflow-visible max-sm:w-[68%]"
      role="img"
      aria-label={points.map((p) => `${p.label} ${p.value}`).join(", ")}
    >
      {ratios.map((ratio) => (
        <polygon
          key={ratio}
          points={ring(count, ratio)}
          fill="none"
          strokeWidth="0.6"
          className="stroke-app-line opacity-50"
        />
      ))}

      {points.map((point, index) => {
        const { x, y } = toXY(index, count, 1);
        return (
          <line
            key={point.label}
            x1={CENTRE}
            y1={CENTRE}
            x2={x}
            y2={y}
            strokeWidth="0.6"
            className="stroke-app-line opacity-50"
          />
        );
      })}

      <polygon points={shape} strokeWidth="1.2" className={`${fillClass} ${strokeClass} ${shapeOpacityClass}`} />

      {showRingScale
        ? [0, ...ratios].map((ratio) => (
            <text
              key={ratio}
              // With point values also shown, the scale steps off the spoke to
              // its right, as Client Risk Radar draws it, so the two sets of
              // numbers do not print over each other.
              x={showPointValues ? CENTRE + 4 : CENTRE}
              y={CENTRE - ratio * RADIUS}
              textAnchor={showPointValues ? "start" : "middle"}
              dominantBaseline="central"
              className="fill-app-text-tertiary text-body-2xs"
            >
              {Math.round(ratio * max)}
            </text>
          ))
        : null}

      {showPointValues
        ? points.map((point, index) => {
            const { x, y } = toXY(index, count, point.value / max);
            return (
              <g key={point.label}>
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  className={point.tone ? undefined : "fill-app-neutral"}
                  fill={point.tone ? TONE_VAR[point.tone] : undefined}
                />
                <text
                  x={x}
                  y={y - 8}
                  textAnchor="middle"
                  className="fill-app-text text-body-2xs"
                >
                  {point.value}
                </text>
              </g>
            );
          })
        : null}

      {points.map((point, index) => {
        // The ratio is clamped to the outer ring, so the names sit on the
        // vertices — as the existing radars were reviewed. Client Risk Radar,
        // which prints both the scale and the values, sets them clear of the
        // shape as its design does, so the top name does not sit on "7000".
        const outside = showRingScale && showPointValues;
        const { x, y } = toXY(index, count, outside ? 1.14 : 1.18, !outside);
        return (
          <text
            key={point.label}
            x={x}
            y={y}
            textAnchor={x > CENTRE + 4 ? "start" : x < CENTRE - 4 ? "end" : "middle"}
            dominantBaseline="central"
            className={labelClass}
          >
            {point.label}
          </text>
        );
      })}
    </svg>
  );
}
