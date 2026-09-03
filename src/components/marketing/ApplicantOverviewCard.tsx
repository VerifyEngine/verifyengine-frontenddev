import { CheckCircle2, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { MockAppFrame, MockBadge } from "@/components/marketing/PlatformMock";

export type DetailRow = { icon: LucideIcon; label: string; value: string };

const meta = [
  { label: "Decision", value: "Approve", pill: true },
  { label: "Confidence", value: "High" },
  { label: "Human QA", value: "Reviewed" },
  { label: "Time to Complete", value: "8 min" },
];

/**
 * Sample verification report shown in the hero of the product pages.
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
    <MockAppFrame right={<MockBadge tone="success">Verified</MockBadge>}>
      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-label-xs text-app-text">{title}</p>
        <span className="text-body-2xs text-app-text-secondary">Download Report</span>
      </div>

      {/* The approved composition, unchanged: the score panel beside the
          verification summary and the AI note. Below sm it stacks, so a phone
          reads it at 1:1 rather than as a shrunken screenshot. */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[0.82fr_1fr]">
        <div className="flex flex-col rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5">
          {/* The dial takes the slack so the panel has no hole in the middle
              when the summary beside it runs taller. */}
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-body-2xs text-app-text-secondary">
              VE Score<span className="align-super text-[8px]">™</span>
            </p>
            <ScoreGauge score={score} />
          </div>

          <div className="mt-auto flex flex-col gap-2 border-t border-app-line pt-3">
            {metaRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-2">
                <span className="text-body-2xs text-app-text-tertiary">{row.label}</span>
                {row.pill ? (
                  <span className="rounded-app-4xl bg-app-success px-2 py-0.5 text-body-2xs text-app-text-inverse">
                    {row.value}
                  </span>
                ) : (
                  <span className="text-body-2xs text-app-text">{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5">
            <p className="text-body-2xs text-app-text-secondary">{detailsTitle}</p>
            <RevealGroup className="mt-2.5 flex flex-col gap-2">
              {details.map((row) => (
                <RevealItem
                  key={row.label}
                  className="flex items-center justify-between gap-3 border-b border-app-line pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="flex items-center gap-2 text-body-2xs text-app-text">
                    <row.icon
                      className="size-3.5 shrink-0 text-app-text-tertiary"
                      strokeWidth={1.6}
                    />
                    {row.label}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-body-2xs text-app-text-secondary">
                    {row.value}
                    <CheckCircle2 className="size-3.5 text-app-success" strokeWidth={1.8} />
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="flex flex-1 flex-col rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3.5">
            <p className="text-body-2xs text-app-text-secondary">AI Summary</p>
            <p className="mt-2 text-body-2xs leading-relaxed text-app-text-secondary">{summary}</p>
            <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-app-4xl bg-app-success px-2 py-0.5 text-body-2xs text-app-text-inverse">
              {riskTag}
            </span>
          </div>
        </div>
      </div>
    </MockAppFrame>
  );
}
