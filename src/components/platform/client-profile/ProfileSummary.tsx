import { IconPencil } from "@tabler/icons-react";
import { MetricCard } from "../MetricCard";
import { iconProps } from "../icon";
import { TONE_VAR } from "../charts/tones";
import {
  ACCOUNT_HEALTH,
  CLIENT_PROFILE,
  HEALTH_BARS,
  PROFILE_METRICS,
  type HealthBar,
} from "@/lib/platform/client-profile";

/*
 * The block every Client Profile tab opens with — Figma node 18393:218159.
 *
 * One third holds six metric cards in two rows of three; the other two thirds
 * hold three glass cards: Account Health (a legend, the standing and a ring),
 * five health bars, and Account Notes.
 */

const PANEL =
  "rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 backdrop-blur-[12px]";

const TEXT_TONE: Record<HealthBar["tone"], string> = {
  success: "text-app-success",
  information: "text-app-information",
  accent: "text-app-accent",
  warning: "text-app-warning",
};

/** The 92% ring: a full track in Brand 2 at 40% with the share drawn over it. */
function HealthRing({ percent }: { percent: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative size-[calc(132px*var(--ve-type-scale))] shrink-0">
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
          strokeDasharray={`${(percent / 100) * circumference} ${circumference}`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-heading-m text-app-text-emphasis">
        {percent}%
      </span>
    </div>
  );
}

export function ProfileSummary() {
  return (
    <section aria-label="Client summary" className="grid grid-cols-1 gap-2 xl:grid-cols-[1fr_2fr]">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PROFILE_METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className={`flex gap-5 p-4 ${PANEL}`}>
          <div className="flex min-w-px flex-1 flex-col gap-2">
            <p className="text-label-2xs text-app-text-secondary">Account Health</p>
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {ACCOUNT_HEALTH.legend.map((item) => (
                <li key={item.label} className="flex items-center gap-1">
                  <span aria-hidden className="size-3 rounded-app-12xl" style={{ backgroundColor: TONE_VAR[item.tone] }} />
                  <span className="text-body-2xs text-app-text">{item.label}</span>
                </li>
              ))}
            </ul>
            <p className="text-label-2xs text-app-success">{ACCOUNT_HEALTH.standing}</p>
          </div>
          <div className="flex items-center">
            <HealthRing percent={ACCOUNT_HEALTH.percent} />
          </div>
        </div>

        <div className={`flex flex-col justify-between gap-2 p-4 ${PANEL}`}>
          {HEALTH_BARS.map((bar) => (
            <div key={bar.label} className="flex items-center gap-1">
              <span className="w-[calc(87px*var(--ve-type-scale))] shrink-0 text-label-2xs text-app-text-emphasis">
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
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${bar.value}%`, backgroundColor: TONE_VAR[bar.tone] }}
                />
              </span>
              <span className={`w-[calc(23px*var(--ve-type-scale))] shrink-0 text-right text-label-2xs font-bold ${TEXT_TONE[bar.tone]}`}>
                {bar.value}
              </span>
            </div>
          ))}
        </div>

        <div className={`flex flex-col p-2 ${PANEL}`}>
          <div className="flex items-center gap-2 p-2">
            <p className="min-w-px flex-1 text-label-2xs text-app-text-secondary">Account Notes</p>
            <button type="button" aria-label="Edit account notes" className="text-app-text">
              <IconPencil {...iconProps(16)} />
            </button>
          </div>
          <div className="flex min-h-24 flex-1 rounded-app-m border-w-2xs border-app-line bg-app-fade-48 p-3">
            {CLIENT_PROFILE.notes ? (
              <p className="text-body-xs text-app-text-secondary">{CLIENT_PROFILE.notes}</p>
            ) : (
              <p className="text-body-xs text-app-text-tertiary">No account notes yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
