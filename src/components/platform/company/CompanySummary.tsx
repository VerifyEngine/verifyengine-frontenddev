import { IconAlertCircle, IconCircleCheck, IconClock } from "@tabler/icons-react";
import { MetricCard } from "@/components/platform/MetricCard";
import { iconProps } from "@/components/platform/icon";
import { TONE_VAR } from "@/components/platform/charts/tones";
import {
  COMPANY_ALERTS,
  COMPANY_HEALTH,
  COMPANY_METRICS,
  ORGANIZATION_SCORE,
  type CompanyAlert,
  type HealthTone,
} from "@/lib/platform/company";

/*
 * The band every Company tab opens with — "Frame 2085666098" in each frame.
 * Six metric cards, the Organization Score ring, five health bars and Recent
 * Alerts, the same arrangement as the Client Profile summary.
 */

const PANEL =
  "rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 backdrop-blur-[12px]";

const TEXT_TONE: Record<HealthTone, string> = {
  success: "text-app-success",
  information: "text-app-information",
  accent: "text-app-accent",
  warning: "text-app-warning",
};

const ALERT_STYLE: Record<CompanyAlert["tone"], string> = {
  accent: "border-app-accent/40 bg-app-accent/10 text-app-accent",
  highlight: "border-app-highlight/50 bg-app-highlight/15 text-app-accent",
  success: "border-app-success/40 bg-app-success/10 text-app-success",
};

function AlertIcon({ tone }: { tone: CompanyAlert["tone"] }) {
  if (tone === "success") return <IconCircleCheck {...iconProps(12)} />;
  if (tone === "highlight") return <IconClock {...iconProps(12)} />;
  return <IconAlertCircle {...iconProps(12)} />;
}

/** Score out of 100 on a full Brand 2 track. */
function ScoreRing({ score, out }: { score: number; out: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative size-[calc(112px*var(--ve-type-scale))] shrink-0">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="12" stroke="var(--ve-surface-brand2-40)" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          stroke="var(--ve-success)"
          strokeDasharray={`${(score / out) * circumference} ${circumference}`}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-heading-m text-app-text-emphasis">{score}</span>
        <span className="text-body-2xs text-app-text-tertiary">/{out}</span>
      </span>
    </div>
  );
}

export function CompanySummary() {
  return (
    <section aria-label="Company summary" className="grid grid-cols-1 gap-2 xl:grid-cols-[1.7fr_1.2fr_1fr_1fr]">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {COMPANY_METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className={`flex gap-4 p-4 ${PANEL}`}>
        <div className="flex min-w-px flex-1 flex-col gap-2">
          <p className="whitespace-nowrap text-label-2xs text-app-text-secondary">Organization Score</p>
          <ul className="flex flex-1 flex-col justify-center gap-2">
            {ORGANIZATION_SCORE.legend.map((item) => (
              <li key={item.label} className="flex items-center gap-1">
                <span aria-hidden className="size-3 rounded-app-12xl" style={{ backgroundColor: TONE_VAR[item.tone] }} />
                <span className="text-body-2xs text-app-text">{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="whitespace-nowrap text-label-2xs text-app-success">{ORGANIZATION_SCORE.standing}</p>
        </div>
        <div className="flex items-center">
          <ScoreRing score={ORGANIZATION_SCORE.score} out={ORGANIZATION_SCORE.out} />
        </div>
      </div>

      <div className={`flex flex-col justify-between gap-2 p-4 ${PANEL}`}>
        {COMPANY_HEALTH.map((bar) => (
          <div key={bar.label} className="flex items-center gap-2">
            <span className="w-[calc(92px*var(--ve-type-scale))] shrink-0 text-label-2xs text-app-text-emphasis">
              {bar.label}
            </span>
            <span
              role="meter"
              aria-label={bar.label}
              aria-valuenow={bar.value}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-1.5 min-w-px flex-1 overflow-hidden rounded-full border-w-2xs border-app-line bg-app-brand2-16"
            >
              <span className="block h-full rounded-full" style={{ width: `${bar.value}%`, backgroundColor: TONE_VAR[bar.tone] }} />
            </span>
            <span className={`w-[calc(32px*var(--ve-type-scale))] shrink-0 text-right text-label-2xs font-bold ${TEXT_TONE[bar.tone]}`}>
              {bar.value}%
            </span>
          </div>
        ))}
      </div>

      <div className={`flex flex-col gap-2 p-4 ${PANEL}`}>
        <p className="text-label-2xs text-app-text-secondary">Recent Alerts</p>
        <ul className="flex flex-col gap-1.5">
          {COMPANY_ALERTS.map((alert) => (
            <li
              key={alert.message}
              className={`flex items-center gap-2 rounded-app-m border-w-2xs px-3 py-1.5 ${ALERT_STYLE[alert.tone]}`}
            >
              <AlertIcon tone={alert.tone} />
              <span className="min-w-px flex-1 text-body-2xs text-app-heading">{alert.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
