import { ArrowDownRight, ArrowUpRight, CheckCircle2, ChevronDown, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ScoreDial } from "./ScoreDial";

export type BreakdownRow = { icon: LucideIcon; label: string; value: string };
export type AudienceStat = {
  icon?: LucideIcon;
  label: string;
  value: string;
  delta: string;
  up: boolean;
};

/**
 * Hero card for the audience sub-pages: an overall-score dial beside a
 * verification breakdown, a strip of trend stats, and an AI insight note.
 *
 * Restyled 2026-08-21 to read as the signed-in platform: platform design
 * tokens (the `app-` Tailwind utilities from src/styles/platform.css, global
 * via globals.css), Satoshi, and the glass-panel treatment the real screens
 * use. `data-ve-theme="light"` sits on this component's own wrapper. Light,
 * not dark: the hero behind it is bg-navy-900, so a light card reads as a real
 * product screenshot instead of blending in, and light is the theme the
 * platform actually boots into. The tokens resolve without the platform's
 * ThemeScript. It stays a site-only component (nothing imported from
 * src/components/platform).
 *
 * Deliberately a Server Component. Icons are rendered here and handed to the
 * client wrappers as children — passing the icon *components* across the
 * server/client boundary makes React emit a client reference for each one,
 * and reusing the same icon on both sides of that boundary trips an RSC
 * streaming bug that hangs the request. Only ScoreDial, which needs
 * viewport-triggered animation, is a client component, and it takes plain
 * numbers.
 */
export function AudienceDashboardCard({
  title,
  rangeLabel = "Last 30 Days",
  scoreLabel,
  score,
  scoreCaption,
  breakdown,
  stats,
  insightTitle = "AI Insight",
  insight,
  insightTag = "High Performance",
  statsLayout = "row",
}: {
  title: string;
  rangeLabel?: string;
  scoreLabel: string;
  score: number;
  scoreCaption?: string;
  breakdown: BreakdownRow[];
  stats: AudienceStat[];
  insightTitle?: string;
  insight: string;
  insightTag?: string;
  statsLayout?: "row" | "column";
}) {
  const isColumn = statsLayout === "column";

  return (
    <div
      data-ve-theme="light"
      className="mock-type font-app overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-[var(--ve-canvas)] p-4 shadow-2xl"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-label-xs text-app-text">{title}</p>
        {rangeLabel && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-app-l border-w-xs border-app-line bg-app-fade-40 px-2.5 py-1.5 text-body-2xs text-app-text-secondary">
            {rangeLabel} <ChevronDown className="size-3.5" strokeWidth={1.6} />
          </span>
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[0.85fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 text-center">
            <p className="text-body-2xs text-app-text-secondary">{scoreLabel}</p>
            <ScoreDial score={score} />
            {scoreCaption && (
              <p className="mt-2 text-body-2xs text-app-text-tertiary">{scoreCaption}</p>
            )}
          </div>

          {isColumn && (
            <div className="flex flex-col overflow-hidden rounded-app-l border-w-2xs border-app-line">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3"
                >
                  {stat.icon && (
                    <stat.icon
                      className="size-4 shrink-0 text-app-text-tertiary"
                      strokeWidth={1.6}
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-body-2xs text-app-text-tertiary">{stat.label}</p>
                    <p className="text-label-2xs text-app-text">{stat.value}</p>
                    <Delta delta={stat.delta} up={stat.up} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4">
            <p className="text-label-2xs text-app-text">Verification Breakdown</p>
            <RevealGroup className="mt-3 flex flex-col gap-2.5">
              {breakdown.map((row) => (
                <RevealItem key={row.label} className="flex items-center gap-2.5">
                  <row.icon className="size-4 shrink-0 text-app-text-tertiary" strokeWidth={1.6} />
                  <span className="min-w-0 flex-1 truncate text-body-2xs text-app-text-secondary">
                    {row.label}
                  </span>
                  <span className="shrink-0 text-body-2xs text-app-text">{row.value}</span>
                  <CheckCircle2 className="size-4 shrink-0 text-app-success" strokeWidth={1.8} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4">
            <p className="text-label-2xs text-app-text">{insightTitle}</p>
            <p className="mt-2 text-body-2xs leading-relaxed text-app-text-secondary">{insight}</p>
            <span className="mt-3 inline-block rounded-app-4xl bg-app-success px-2.5 py-1 text-body-2xs text-app-text-inverse">
              {insightTag}
            </span>
          </div>
        </div>
      </div>

      {!isColumn && (
        <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5"
            >
              {stat.icon && (
                <stat.icon className="size-4 text-app-text-tertiary" strokeWidth={1.6} />
              )}
              <p className="mt-2 text-body-2xs text-app-text-tertiary">{stat.label}</p>
              <p className="mt-0.5 text-heading-s text-app-text">{stat.value}</p>
              <Delta delta={stat.delta} up={stat.up} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Delta({ delta, up }: { delta: string; up: boolean }) {
  return (
    <p
      className={`mt-0.5 flex items-center gap-1 text-body-2xs ${
        up ? "text-app-success" : "text-app-warning"
      }`}
    >
      {up ? (
        <ArrowUpRight className="size-3" strokeWidth={2} />
      ) : (
        <ArrowDownRight className="size-3" strokeWidth={2} />
      )}
      {delta}
      <span className="text-app-text-tertiary">vs last 30 days</span>
    </p>
  );
}
