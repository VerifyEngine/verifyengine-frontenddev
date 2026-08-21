import type { AlertTone, VerificationStatus } from "@/lib/platform/dashboard";

/*
 * Status chips — Figma node 18110:26001 and its four variants.
 *
 * Radius/4XL 40, padding Gap/XS 4, Body/2XS text. The verification chip is a
 * fixed 64px wide so the table column stays aligned regardless of label
 * length. Escalated is the one variant with dark text, because yellow cannot
 * carry white legibly — that is the design's own choice, not an override.
 */

const STATUS_STYLES: Record<VerificationStatus, string> = {
  Pending: "bg-app-accent text-app-text-inverse",
  "In Progress": "bg-app-neutral text-app-text-inverse",
  Verified: "bg-app-success text-app-text-inverse",
  Unverified: "bg-app-warning text-app-text-inverse",
  Escalated: "bg-app-highlight text-app-text",
};

export function StatusChip({ status }: { status: VerificationStatus }) {
  return (
    <span
      // 64px in Figma, scaled with the type so the label still fits the pill.
      style={{ width: "calc(64px * var(--ve-type-scale))" }}
      className={`flex shrink-0 items-center justify-center rounded-app-4xl p-1 text-center text-body-2xs ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

const TONE_STYLES: Record<AlertTone, string> = {
  success: "bg-app-success text-app-text-inverse",
  warning: "bg-app-warning text-app-text-inverse",
  highlight: "bg-app-highlight text-app-text",
  neutral: "bg-app-neutral text-app-text-inverse",
  accent: "bg-app-accent text-app-text-inverse",
};

/**
 * The alert tag chip hugs its label instead of using the table's fixed width,
 * since it sits in a free-flowing row (Figma node 18110:30942).
 */
export function TagChip({ label, tone }: { label: string; tone: AlertTone }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center whitespace-nowrap rounded-app-4xl px-2 py-1 text-center text-body-2xs ${TONE_STYLES[tone]}`}
    >
      {label}
    </span>
  );
}

/** The "1 New" counter, which uses the Brand 2 tint rather than a status colour. */
export function NewCountChip({ label }: { label: string }) {
  return (
    <span className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-app-4xl bg-app-brand2-64 px-2 py-1 text-center text-body-2xs text-app-text-brand1">
      {label}
    </span>
  );
}
