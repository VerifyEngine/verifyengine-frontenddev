import { CheckCircle2, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SummaryStepper } from "./SummaryStepper";
import { ScoreArc } from "./ScoreArc";

export type SummaryStep = { icon: LucideIcon; label: string };
export type SummaryCheck = { icon: LucideIcon; label: string; result: string };

/**
 * Hero visual for every process page: an auto-cycling stage list beside a live
 * verification summary.
 *
 * Deliberately a Server Component. Icons are rendered here and handed to the
 * interactive stepper as nodes — passing the icon *components* into a client
 * component emits a client reference for each, and reusing the same icon on
 * both sides of that boundary trips an RSC streaming bug that hangs the route.
 */
export function VerificationSummaryCard({
  steps,
  checks,
  score = 92,
  riskLabel = "Low Risk",
  resultLabel = "Recommended",
}: {
  steps: SummaryStep[];
  checks: SummaryCheck[];
  score?: number;
  riskLabel?: string;
  resultLabel?: string;
}) {
  const renderedSteps = steps.map((step) => ({
    label: step.label,
    icon: <step.icon className="size-4.5" strokeWidth={1.75} />,
  }));

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative border-b border-slate-100 p-5 sm:border-r sm:border-b-0">
          <div className="absolute top-10 bottom-10 left-[38px] w-px border-l border-dashed border-slate-200" />
          <SummaryStepper steps={renderedSteps} />
        </div>

        <div className="p-5">
          <p className="text-sm font-bold text-ink-900">Applicant Verification Summary</p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 p-3.5 text-center">
              <p className="text-[11px] text-slate-500">
                VE Score<span className="align-super text-[8px]">™</span>
              </p>
              <ScoreArc score={score} />
              <p className="mt-1 text-xs font-semibold text-teal-700">{riskLabel}</p>
            </div>

            <div className="rounded-xl border border-slate-100 p-3.5">
              <p className="text-[11px] text-slate-500">Overall Result</p>
              <span className="mt-1.5 inline-block rounded-md bg-mint-100 px-2.5 py-1 text-xs font-semibold text-teal-700">
                {resultLabel}
              </span>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] text-slate-400">Confidence</p>
                  <p className="text-xs font-bold text-ink-900">High</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Completed</p>
                  <p className="text-xs font-bold text-ink-900">2 min ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-slate-100 p-3.5">
            <p className="text-xs font-bold text-ink-900">Verification Breakdown</p>
            <RevealGroup className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {checks.map((check) => (
                <RevealItem
                  key={check.label}
                  className="flex items-center justify-between gap-2 rounded-lg bg-bg-muted px-2.5 py-2"
                >
                  <span className="flex items-center gap-2">
                    <check.icon className="size-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                    <span>
                      <span className="block text-[11px] font-semibold text-ink-900">
                        {check.label}
                      </span>
                      <span className="block text-[10px] text-slate-500">{check.result}</span>
                    </span>
                  </span>
                  <CheckCircle2 className="size-4 shrink-0 text-teal-500" strokeWidth={2} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
