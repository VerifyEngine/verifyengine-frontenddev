/*
 * Score Radar — Figma node 18216:28611.
 *
 * A hexagonal radar: six axes with rings at 0/20/40/60/80/100 and the score
 * polygon inside. Drawn from the values rather than exported as an image, for
 * the same reason as the gauge — the shape is the data.
 *
 * Geometry: axis i sits at -90° + i * 60°, so the first axis points straight
 * up and the labels fall where Figma places them.
 */

export type RadarAxis = { label: string; value: number };

const SIZE = 320;
const CENTRE = SIZE / 2;
const RADIUS = 116;
const RINGS = [20, 40, 60, 80, 100];

function point(index: number, count: number, value: number) {
  const angle = (-90 + (360 / count) * index) * (Math.PI / 180);
  const distance = (Math.min(Math.max(value, 0), 100) / 100) * RADIUS;
  return {
    x: CENTRE + distance * Math.cos(angle),
    y: CENTRE + distance * Math.sin(angle),
  };
}

function polygon(count: number, value: number) {
  return Array.from({ length: count }, (_, index) => {
    const { x, y } = point(index, count, value);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

export function ScoreRadarCard({
  title,
  axes,
}: {
  title: string;
  axes: readonly RadarAxis[];
}) {
  const count = axes.length;
  const shape = axes
    .map((axis, index) => {
      const { x, y } = point(index, count, axis.value);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <section className="flex flex-col gap-3 rounded-app-xl border-w-2xs border-app-line bg-app-brand2-16 p-4 backdrop-blur-[12px]">
      <h2 className="text-heading-xs text-app-text">{title}</h2>

      <div className="flex min-h-px flex-1 items-center justify-center rounded-app-xl border-w-2xs border-app-line bg-app-fade-64 p-4">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full max-w-90"
          role="img"
          aria-label={`${title}: ${axes.map((a) => `${a.label} ${a.value}`).join(", ")}`}
        >
          {RINGS.map((ring) => (
            <polygon
              key={ring}
              points={polygon(count, ring)}
              fill="none"
              strokeWidth="0.6"
              className="stroke-app-line opacity-50"
            />
          ))}

          {axes.map((axis, index) => {
            const { x, y } = point(index, count, 100);
            return (
              <line
                key={axis.label}
                x1={CENTRE}
                y1={CENTRE}
                x2={x}
                y2={y}
                strokeWidth="0.6"
                className="stroke-app-line opacity-50"
              />
            );
          })}

          <polygon
            points={shape}
            strokeWidth="1.2"
            className="fill-app-brand1-80 stroke-app-line-brand2 opacity-70"
          />

          {/* Ring scale, written up the vertical axis as the design does. */}
          {[0, ...RINGS].map((ring) => (
            <text
              key={ring}
              x={CENTRE}
              y={CENTRE - (ring / 100) * RADIUS}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-app-text-tertiary text-body-2xs"
            >
              {ring}
            </text>
          ))}

          {axes.map((axis, index) => {
            const { x, y } = point(index, count, 122);
            return (
              <text
                key={axis.label}
                x={x}
                y={y}
                textAnchor={x > CENTRE + 4 ? "start" : x < CENTRE - 4 ? "end" : "middle"}
                dominantBaseline="central"
                className="fill-app-text-tertiary text-body-2xs"
              >
                {axis.label}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
