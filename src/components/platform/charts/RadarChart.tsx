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
 */

export type RadarPoint = { label: string; value: number };

const SIZE = 320;
const CENTRE = SIZE / 2;
const RADIUS = 112;

function toXY(index: number, count: number, ratio: number) {
  const angle = (-90 + (360 / count) * index) * (Math.PI / 180);
  const distance = Math.min(Math.max(ratio, 0), 1) * RADIUS;
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
      className="w-full max-w-96"
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

      <polygon points={shape} strokeWidth="1.2" className={`${fillClass} ${strokeClass} opacity-70`} />

      {showRingScale
        ? [0, ...ratios].map((ratio) => (
            <text
              key={ratio}
              x={CENTRE}
              y={CENTRE - ratio * RADIUS}
              textAnchor="middle"
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
                <circle cx={x} cy={y} r="3" className="fill-app-neutral" />
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
        const { x, y } = toXY(index, count, 1.18);
        return (
          <text
            key={point.label}
            x={x}
            y={y}
            textAnchor={x > CENTRE + 4 ? "start" : x < CENTRE - 4 ? "end" : "middle"}
            dominantBaseline="central"
            className="fill-app-text-tertiary text-body-2xs"
          >
            {point.label}
          </text>
        );
      })}
    </svg>
  );
}
