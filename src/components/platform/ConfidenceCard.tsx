/*
 * Confidence — Figma node 18216:28530.
 *
 * A legend of three bands on the left, the ring on the right with the figure
 * inside it, and the recommendation under the legend. Same stroked-circle ring
 * as DonutMetricCard; here it is a single value against a track rather than
 * a set of slices.
 */

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export type ConfidenceBand = { label: string; color: string };

export function ConfidenceCard({
  label,
  percent,
  bands,
  recommendationLabel,
  recommendation,
}: {
  label: string;
  percent: number;
  bands: readonly ConfidenceBand[];
  recommendationLabel: string;
  recommendation: string;
}) {
  const filled = (Math.min(Math.max(percent, 0), 100) / 100) * CIRCUMFERENCE;

  return (
    <div className="flex gap-5 overflow-hidden rounded-app-xl border-w-2xs border-app-line bg-app-fade-48 p-5 backdrop-blur-[12px]">
      <div className="flex min-w-px flex-1 flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-label-2xs text-app-text-secondary">{label}</p>
          <ul className="flex flex-col gap-1">
            {bands.map((band) => (
              <li key={band.label} className="flex items-center gap-1">
                <span
                  aria-hidden
                  className="size-3 shrink-0 rounded-app-12xl"
                  style={{ backgroundColor: band.color }}
                />
                <span className="whitespace-nowrap text-body-2xs text-app-text">
                  {band.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <p className="text-body-2xs text-app-text-secondary">{recommendationLabel}</p>
          <p className="text-body-xs text-app-text">{recommendation}</p>
        </div>
      </div>

      <svg
        viewBox="0 0 100 100"
        className="size-28 shrink-0 -rotate-90 self-center"
        role="img"
        aria-label={`${label}: ${percent}%`}
      >
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="10"
          className="stroke-app-brand2-40"
        />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className="stroke-app-success"
          strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          transform="rotate(90 50 50)"
          className="fill-app-text-emphasis text-heading-m"
        >
          {percent}%
        </text>
      </svg>
    </div>
  );
}
