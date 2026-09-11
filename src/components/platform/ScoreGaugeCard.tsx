/*
 * VE SCORE™ — Figma node 18216:28474.
 *
 * A half ring: the score fills it from the left, the remainder stays muted.
 * Drawn with the same technique as DonutMetricCard — one stroked circle per
 * arc, sized with stroke-dasharray — rather than an exported SVG, because the
 * fill has to follow the score rather than stay at the one value the design
 * happens to draw.
 *
 * Half of a circle is half its circumference, so a score fraction f fills
 * f * C / 2 and the track covers the other half.
 */

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const HALF = CIRCUMFERENCE / 2;

export function ScoreGaugeCard({
  label,
  score,
  max,
  riskLabel,
  riskTone,
  caption,
}: {
  label: string;
  score: number;
  max: number;
  riskLabel: string;
  riskTone: "success" | "warning" | "accent";
  caption: string;
}) {
  const filled = Math.min(Math.max(score / max, 0), 1) * HALF;
  const toneClass =
    riskTone === "success"
      ? "bg-app-success"
      : riskTone === "warning"
        ? "bg-app-warning"
        : "bg-app-accent";

  return (
    <div className="flex overflow-hidden rounded-app-xl border-w-2xs border-app-line bg-app-fade-48 backdrop-blur-[12px]">
      <div className="flex min-h-px flex-1 items-center justify-center gap-5 p-5">
        <div className="flex h-full min-w-px flex-1 flex-col justify-between gap-4">
          <p className="text-label-2xs text-app-text-secondary">{label}</p>

          <div className="flex flex-col items-start gap-3">
            <span
              className={`rounded-app-4xl px-2 py-1 text-body-2xs text-app-text-inverse ${toneClass}`}
            >
              {riskLabel}
            </span>
            <p className="text-body-2xs text-app-text">{caption}</p>
          </div>
        </div>

        <div className="relative shrink-0">
          <svg
            viewBox="0 0 100 60"
            className="w-36"
            role="img"
            aria-label={`${label}: ${score} of ${max}`}
          >
            {/* Rotated a half turn so the arc opens upward from the left. */}
            <g transform="rotate(180 50 50)">
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                className="stroke-app-brand2-40"
                strokeDasharray={`${HALF} ${CIRCUMFERENCE}`}
              />
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                className="stroke-app-neutral"
                strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
              />
            </g>
          </svg>

          <p className="absolute inset-x-0 bottom-0 text-center text-heading-l text-app-text-emphasis">
            {score}
          </p>
        </div>
      </div>
    </div>
  );
}
