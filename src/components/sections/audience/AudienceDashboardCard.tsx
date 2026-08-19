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
    <div className="overflow-hidden rounded-2xl bg-white p-5 shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <p className="text-base font-bold text-ink-900">{title}</p>
        {rangeLabel && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-500">
            {rangeLabel} <ChevronDown className="size-3.5" strokeWidth={2} />
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[0.85fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-100 p-4 text-center">
            <p className="text-xs font-semibold text-slate-500">{scoreLabel}</p>
            <ScoreDial score={score} />
            {scoreCaption && <p className="mt-2 text-[11px] text-slate-400">{scoreCaption}</p>}
          </div>

          {isColumn && (
            <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 p-3">
                  {stat.icon && (
                    <stat.icon className="size-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-[10px] text-slate-400">{stat.label}</p>
                    <p className="text-sm font-bold text-ink-900">{stat.value}</p>
                    <Delta delta={stat.delta} up={stat.up} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-bold text-ink-900">Verification Breakdown</p>
            <RevealGroup className="mt-3 space-y-2.5">
              {breakdown.map((row) => (
                <RevealItem key={row.label} className="flex items-center gap-2.5">
                  <row.icon className="size-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                  <span className="min-w-0 flex-1 truncate text-xs text-slate-600">
                    {row.label}
                  </span>
                  <span className="shrink-0 text-xs font-bold text-ink-900">{row.value}</span>
                  <CheckCircle2 className="size-4 shrink-0 text-teal-500" strokeWidth={2} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-bold text-ink-900">{insightTitle}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{insight}</p>
            <span className="mt-3 inline-block rounded-md bg-mint-100 px-2.5 py-1 text-[11px] font-semibold text-teal-700">
              {insightTag}
            </span>
          </div>
        </div>
      </div>

      {!isColumn && (
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-100 p-3.5">
              {stat.icon && <stat.icon className="size-4 text-slate-400" strokeWidth={1.75} />}
              <p className="mt-2 text-[10px] text-slate-400">{stat.label}</p>
              <p className="mt-0.5 text-lg font-bold text-ink-900">{stat.value}</p>
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
      className={`mt-0.5 flex items-center gap-1 text-[10px] font-medium ${
        up ? "text-teal-600" : "text-rose-500"
      }`}
    >
      {up ? (
        <ArrowUpRight className="size-3" strokeWidth={2.5} />
      ) : (
        <ArrowDownRight className="size-3" strokeWidth={2.5} />
      )}
      {delta}
      <span className="text-slate-400">vs last 30 days</span>
    </p>
  );
}
