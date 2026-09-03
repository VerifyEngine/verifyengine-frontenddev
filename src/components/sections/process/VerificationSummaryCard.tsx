import { CheckCircle2, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MockAppFrame, MockBadge } from "@/components/marketing/PlatformMock";
import { SummaryStepper } from "./SummaryStepper";
import { ScoreArc } from "./ScoreArc";

export type SummaryStep = { icon: LucideIcon; label: string };
export type SummaryCheck = { icon: LucideIcon; label: string; result: string };

/**
 * Hero visual for every process page: an auto-cycling stage list beside a live
 * verification summary.
 *
 * Built from the shared platform mockup vocabulary in PlatformMock — the app
 * bar, the side rail and the glass panels the signed-in product is made of —
 * so it reads as a slice of the real screen rather than as a card. Its twin,
 * ApplicantOverviewCard, is composed the same way; the two are the site's
 * product-hero pair and stay in step.
 *
 * MockAppFrame carries the light theme, Satoshi and the fixed-width-then-zoom
 * sizing, so this composition is drawn once and painted at whatever width its
 * column has: magnified on a desktop, laid out fluid at 1:1 on a phone. Light,
 * not dark: the hero behind it is bg-navy-900, so a light frame reads as a real
 * product screenshot instead of blending in, and light is the theme the
 * platform actually boots into. It stays a site-only component (nothing
 * imported from src/components/platform).
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
    <MockAppFrame right={<MockBadge tone="success">Verified</MockBadge>}>
      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-label-xs text-app-text">Applicant Verification Summary</p>
        <span className="text-body-2xs text-app-text-secondary">Download Report</span>
      </div>

      {/* The approved composition, unchanged: the stage list beside the score,
          the overall result and the breakdown. Below sm it stacks, so a phone
          reads it at 1:1 rather than as a shrunken screenshot. */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative flex flex-col justify-center rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5">
          {/* The dashed spine runs behind the stage icons: 14px of panel
              padding + 8px of button padding puts their centre at 40px. */}
          <div className="absolute top-9 bottom-9 left-[40px] w-px border-l border-dashed border-app-line" />
          <SummaryStepper steps={renderedSteps} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5 text-center">
              <p className="text-body-2xs text-app-text-secondary">
                VE Score<span className="align-super text-[8px]">™</span>
              </p>
              <ScoreArc score={score} />
              <p className="mt-1 text-body-2xs text-app-success">{riskLabel}</p>
            </div>

            <div className="flex flex-col rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5">
              <p className="text-body-2xs text-app-text-secondary">Overall Result</p>
              <span className="mt-1.5 inline-block w-fit rounded-app-4xl bg-app-success px-2.5 py-1 text-body-2xs text-app-text-inverse">
                {resultLabel}
              </span>
              {/* Pinned to the bottom so this panel matches the dial beside it
                  instead of leaving a hole under the pill. */}
              <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                <div>
                  <p className="text-body-2xs text-app-text-tertiary">Confidence</p>
                  <p className="text-label-2xs text-app-text">High</p>
                </div>
                <div>
                  <p className="text-body-2xs text-app-text-tertiary">Human QA</p>
                  <p className="text-label-2xs text-app-text">Reviewed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5">
            <p className="text-label-2xs text-app-text">Verification Breakdown</p>
            <RevealGroup className="mt-2.5 grid flex-1 grid-cols-2 content-start gap-2">
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
    </MockAppFrame>
  );
}
