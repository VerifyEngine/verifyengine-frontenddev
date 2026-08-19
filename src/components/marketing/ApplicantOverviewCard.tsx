import { Download, CheckCircle2, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ScoreGauge } from "@/components/ui/ScoreGauge";

export type DetailRow = { icon: LucideIcon; label: string; value: string };

const meta = [
  { label: "Decision", value: "Approve", pill: true },
  { label: "Confidence", value: "High" },
  { label: "Completed", value: "May 20, 2024" },
  { label: "Time to Complete", value: "8 min" },
];

/**
 * Sample verification report shown in the hero of the product pages.
 *
 * A Server Component on purpose: it renders its own icons and delegates only
 * the animated dial to a client child. Passing icon components into a client
 * component emits a client reference for each, and reusing the same icon on
 * both sides of that boundary hangs the route.
 */
export function ApplicantOverviewCard({
  title = "Applicant Overview",
  score = 92,
  detailsTitle = "Verification Summary",
  details,
  summary = "All verification checks have been completed and verified. The applicant meets the employment, income, and rental history requirements.",
  riskTag = "Low Risk",
  completedIn = "8 min",
}: {
  title?: string;
  score?: number;
  detailsTitle?: string;
  details: DetailRow[];
  summary?: string;
  riskTag?: string;
  completedIn?: string;
}) {
  const metaRows = meta.map((row) =>
    row.label === "Time to Complete" ? { ...row, value: completedIn } : row,
  );

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <p className="text-base font-bold text-ink-900">{title}</p>
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Download className="size-3.5" strokeWidth={2} />
          Download Report
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-[0.8fr_1fr]">
        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-xs font-semibold text-slate-500">
            VE Score<span className="align-super text-[8px]">™</span>
          </p>
          <ScoreGauge score={score} />

          <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-3">
            {metaRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">{row.label}</span>
                {row.pill ? (
                  <span className="rounded-md bg-mint-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                    {row.value}
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-ink-900">{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-semibold text-slate-500">{detailsTitle}</p>
            <RevealGroup className="mt-3 space-y-2.5">
              {details.map((row) => (
                <RevealItem
                  key={row.label}
                  className="flex items-center justify-between gap-3 border-b border-slate-50 pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="flex items-center gap-2 text-xs font-medium text-ink-900">
                    <row.icon className="size-3.5 shrink-0 text-slate-400" strokeWidth={1.75} />
                    {row.label}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    {row.value}
                    <CheckCircle2 className="size-3.5 text-teal-500" strokeWidth={2} />
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-semibold text-slate-500">AI Summary</p>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{summary}</p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-md bg-mint-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
              ↓ {riskTag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
