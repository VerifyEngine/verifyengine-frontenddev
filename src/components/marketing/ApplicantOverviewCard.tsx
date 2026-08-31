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
    <div
      data-ve-theme="light"
      className="mock-type font-app overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-[var(--ve-canvas)] shadow-2xl"
    >
      <div className="flex items-center justify-between gap-4 border-b border-app-line px-5 py-4">
        <p className="text-label-xs text-app-text">{title}</p>
        <span className="flex items-center gap-1.5 text-body-2xs text-app-text-secondary">
          <Download className="size-3.5" strokeWidth={1.6} />
          Download Report
        </span>
      </div>

      {/* No longer shrunk on phones: a half-size card put this type at about
          6px, which is a picture of a product rather than a look at one. It now
          lays out at the width it is given and stacks below sm, so a phone
          reads it at 1:1. Desktop is untouched. */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[0.8fr_1fr]">
        <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4">
          <p className="text-body-2xs text-app-text-secondary">
            VE Score<span className="align-super text-[8px]">™</span>
          </p>
          <ScoreGauge score={score} />

          <div className="mt-4 flex flex-col gap-2.5 border-t border-app-line pt-3">
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

        <div className="flex flex-col gap-3">
          <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4">
            <p className="text-body-2xs text-app-text-secondary">{detailsTitle}</p>
            <RevealGroup className="mt-3 flex flex-col gap-2.5">
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

          <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4">
            <p className="text-body-2xs text-app-text-secondary">AI Summary</p>
            <p className="mt-2 text-body-2xs leading-relaxed text-app-text-secondary">{summary}</p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-app-4xl bg-app-success px-2 py-0.5 text-body-2xs text-app-text-inverse">
              {riskTag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
