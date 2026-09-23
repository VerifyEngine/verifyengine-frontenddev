import { IconDownload, IconRefresh } from "@tabler/icons-react";
import { iconProps } from "../icon";
import { CARD, Eyebrow, ROW_CARD } from "./TabParts";
import {
  AUDIT_LOG,
  COMPLIANCE_CHECKS,
  OVERRIDE_HISTORY,
  type AuditCategory,
} from "@/lib/platform/client-profile";

/*
 * Audit & Compliance tab — Figma node 18398:226181 (named "Applicant Scoring"
 * in the file, but drawn as this tab).
 *
 * The audit log takes two thirds; TCPA / FCRA compliance and the override
 * history stack in the last third. Each log entry carries its category in the
 * colour the design gives it. The design fills the frame by repeating its
 * first three entries; each entry appears once here.
 */

const CATEGORY_TEXT: Record<AuditCategory, string> = {
  Config: "text-app-heading",
  Billing: "text-app-success",
  Auth: "text-app-neutral",
  Override: "text-app-accent",
  System: "text-app-warning",
  Users: "text-app-neutral",
};

const OUTLINE_BUTTON =
  "flex items-center gap-1.5 rounded-app-m border-w-2xs border-app-line bg-app-surface px-3 py-1.5 text-label-2xs text-app-heading transition-colors hover:bg-app-brand2-16";

export function AuditTab() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
      <section className="flex flex-col gap-2">
        <Eyebrow
          action={
            <div className="flex gap-2">
              <button type="button" className={OUTLINE_BUTTON}>
                <IconRefresh {...iconProps(12)} />
                Refresh
              </button>
              <button type="button" className={OUTLINE_BUTTON}>
                <IconDownload {...iconProps(12)} />
                Export CSV
              </button>
            </div>
          }
        >
          Audit Log
        </Eyebrow>
        <ol className={`flex flex-col overflow-hidden ${CARD}`}>
          {AUDIT_LOG.map((entry) => (
            <li
              key={`${entry.at}-${entry.action}`}
              className="flex flex-col gap-1 border-b border-app-line-brand2 px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
            >
              <time className="shrink-0 font-mono text-body-2xs text-app-text-tertiary sm:w-[calc(110px*var(--ve-type-scale))]">
                {entry.at}
              </time>
              <p className="min-w-px flex-1 text-body-xs text-app-heading">
                <span className="font-bold">{entry.actor}</span> — {entry.action}
              </p>
              <span
                className={`self-start rounded-app-xs bg-app-brand2-16 px-2 py-0.5 text-body-2xs font-bold sm:self-auto ${CATEGORY_TEXT[entry.category]}`}
              >
                {entry.category}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-col gap-5">
        <section className="flex flex-col gap-3">
          <Eyebrow>TCPA / FCRA Compliance</Eyebrow>
          <ul className="flex flex-col gap-0.5">
            {COMPLIANCE_CHECKS.map((check) => (
              <li key={check.label} className={`flex items-center justify-between gap-3 ${ROW_CARD}`}>
                <span className="text-label-2xs text-app-heading">{check.label}</span>
                <span className="text-body-2xs font-semibold text-app-success">{check.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <Eyebrow>Override History (Last 30 Days)</Eyebrow>
          <ul className="flex flex-col gap-0.5">
            {OVERRIDE_HISTORY.map((row) => (
              <li key={row.label} className={`grid grid-cols-3 items-center gap-3 ${ROW_CARD}`}>
                <span className="text-label-2xs text-app-heading">{row.label}</span>
                <span className="text-center text-label-2xs font-bold text-app-heading">{row.count}</span>
                <span className="text-right text-body-2xs text-app-text-tertiary">by {row.by}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
