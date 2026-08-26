import type { CSSProperties } from "react";
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
    icon: <step.icon className="size-4.5" strokeWidth={1.6} />,
  }));

  return (
    <div
      data-ve-theme="light"
      className="mock-miniature font-app overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-[var(--ve-canvas)] shadow-2xl"
      /* The platform ships type at 1.2x the Figma sizes; these hero cards are
         shown much smaller than a 1920px screen, so they carry a little more
         again to stay readable at hero scale. Every box sized from the same
         token scales with it. */
      style={{ "--ve-type-scale": "1.35" } as CSSProperties}
    >
      <div className="grid grid-cols-[0.72fr_1fr] gap-0">
        <div className="relative border-r border-app-line p-4">
          <div className="absolute top-10 bottom-10 left-[38px] w-px border-l border-dashed border-app-line" />
          <SummaryStepper steps={renderedSteps} />
        </div>

        <div className="p-4">
          <p className="text-label-xs text-app-text">Applicant Verification Summary</p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5 text-center">
              <p className="text-body-2xs text-app-text-secondary">
                VE Score<span className="align-super text-[8px]">™</span>
              </p>
              <ScoreArc score={score} />
              <p className="mt-1 text-body-2xs text-app-success">{riskLabel}</p>
            </div>

            <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5">
              <p className="text-body-2xs text-app-text-secondary">Overall Result</p>
              <span className="mt-1.5 inline-block rounded-app-4xl bg-app-success px-2.5 py-1 text-body-2xs text-app-text-inverse">
                {resultLabel}
              </span>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-body-2xs text-app-text-tertiary">Confidence</p>
                  <p className="text-label-2xs text-app-text">High</p>
                </div>
                <div>
                  <p className="text-body-2xs text-app-text-tertiary">Completed</p>
                  <p className="text-label-2xs text-app-text">2 min ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5">
            <p className="text-label-2xs text-app-text">Verification Breakdown</p>
            <RevealGroup className="mt-3 grid grid-cols-2 gap-2">
              {checks.map((check) => (
                <RevealItem
                  key={check.label}
                  className="flex items-center justify-between gap-2 rounded-app-m bg-app-fade-40 px-2.5 py-2"
                >
                  <span className="flex items-center gap-2">
                    <check.icon
                      className="size-4 shrink-0 text-app-text-tertiary"
                      strokeWidth={1.6}
                    />
                    <span>
                      <span className="block text-body-2xs text-app-text">{check.label}</span>
                      <span className="block text-body-2xs text-app-text-tertiary">
                        {check.result}
                      </span>
                    </span>
                  </span>
                  <CheckCircle2 className="size-4 shrink-0 text-app-success" strokeWidth={1.8} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
