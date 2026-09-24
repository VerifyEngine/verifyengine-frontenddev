import type { Metadata } from "next";
import type { DetailTone } from "@/components/platform/DetailCard";
import { ReportActions } from "@/components/platform/ReportActions";
import { Wordmark } from "@/components/platform/Wordmark";
import {
  AI_SUMMARY,
  CONFIDENCE,
  DETAIL_SECTIONS,
  FRAUD_FLAGS,
  LANDLORD_RESPONSES,
  ORDER,
  VE_SCORE,
} from "@/lib/platform/order-details";

export const metadata: Metadata = { title: "Verification Report" };

/*
 * Verification Report — no Figma frame. The finished document a client reads,
 * prints or saves as PDF: the same data as Verification Details, laid out as
 * a page rather than a workspace. It prints without the platform chrome.
 * Like Details, every id shows the one file the mock carries.
 */

const TONE_TEXT: Record<DetailTone, string> = {
  success: "text-app-success",
  warning: "text-app-warning",
  accent: "text-app-accent",
  neutral: "text-app-neutral",
  highlight: "text-app-text",
};

const TONE_DOT: Record<DetailTone, string> = {
  success: "bg-app-success",
  warning: "bg-app-warning",
  accent: "bg-app-accent",
  neutral: "bg-app-neutral",
  highlight: "bg-app-highlight",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex break-inside-avoid flex-col gap-3 border-t-[0.6px] border-app-line pt-5">
      <h2 className="text-heading-xs text-app-heading">{title}</h2>
      {children}
    </section>
  );
}

export default async function VerificationReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const raisedFlags = FRAUD_FLAGS.filter((flag) => flag.raised);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-2 pb-2 print:max-w-none">
      <ReportActions backHref={`/verifications/${id}`} />

      <article className="flex flex-col gap-6 rounded-app-xl border-w-2xs border-app-line bg-app-surface p-6 sm:p-10 print:rounded-none print:border-0 print:p-0">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <Wordmark className="h-7 w-auto text-[var(--ve-wordmark)]" />
            <div className="flex flex-col gap-1">
              <h1 className="text-heading-m text-app-text">Rental Verification Report</h1>
              <p className="text-body-s text-app-text-secondary">
                {ORDER.applicant} · {ORDER.address}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 text-body-xs sm:text-right">
            <dt className="text-app-text-secondary">Reference</dt>
            <dd className="text-app-text">{ORDER.reference}</dd>
            <dt className="text-app-text-secondary">File</dt>
            <dd className="text-app-text">#{id}</dd>
          </dl>
        </header>

        <section className="grid break-inside-avoid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-app-l bg-app-brand2-tertiary p-4">
            <span className="text-label-2xs text-app-text-secondary">{VE_SCORE.label}</span>
            <span className="text-heading-l text-app-text-emphasis">
              {VE_SCORE.score}
              <span className="text-body-s text-app-text-secondary"> / {VE_SCORE.max}</span>
            </span>
            <span className={`text-label-2xs ${TONE_TEXT[VE_SCORE.riskTone]}`}>{VE_SCORE.riskLabel}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-app-l bg-app-brand2-tertiary p-4">
            <span className="text-label-2xs text-app-text-secondary">{CONFIDENCE.label}</span>
            <span className="text-heading-l text-app-text-emphasis">{CONFIDENCE.percent}%</span>
            <span className="text-label-2xs text-app-text-secondary">{VE_SCORE.caption}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-app-l bg-app-brand1 p-4 text-app-text-inverse">
            <span className="text-label-2xs opacity-70">{CONFIDENCE.recommendationLabel.replace(":", "")}</span>
            <span className="text-heading-xs">{CONFIDENCE.recommendation}</span>
          </div>
        </section>

        <Section title={AI_SUMMARY.title}>
          <p className="text-body-s text-app-text">{AI_SUMMARY.quote}</p>
        </Section>

        {DETAIL_SECTIONS.map((section) => (
          <Section key={section.title} title={section.title}>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-4 border-b-[0.6px] border-dashed border-app-line pb-1">
                  <dt className="text-body-xs text-app-text-secondary">{item.label}</dt>
                  <dd className={`text-right text-body-xs ${item.tone ? TONE_TEXT[item.tone] : "text-app-text"}`}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        ))}

        <Section title="Landlord Responses">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {LANDLORD_RESPONSES.map((row) => (
              <li key={row.question} className="flex items-center justify-between gap-4 text-body-xs">
                <span className="text-app-text">{row.question}</span>
                <span className="flex items-center gap-2 text-app-text">
                  <span aria-hidden className={`size-2 rounded-full ${TONE_DOT[row.tone]}`} />
                  {row.answer}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Fraud Indicators">
          {raisedFlags.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {FRAUD_FLAGS.map((flag) => (
                <li
                  key={flag.label}
                  className={`rounded-app-7xl border-w-2xs px-3 py-1 text-body-2xs ${
                    flag.raised ? "border-app-warning text-app-warning" : "border-app-line text-app-text-tertiary line-through"
                  }`}
                >
                  {flag.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body-xs text-app-text-secondary">No fraud indicators were raised.</p>
          )}
          <p className="text-body-2xs text-app-text-secondary">
            Raised: {raisedFlags.length} of {FRAUD_FLAGS.length}. Crossed-out items were checked and not raised.
          </p>
        </Section>

        <footer className="border-t-[0.6px] border-app-line pt-4 text-body-2xs text-app-text-tertiary">
          Generated by VerifyEngine from verification file #{id}.
        </footer>
      </article>
    </div>
  );
}
