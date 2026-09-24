import type { Tone } from "@/lib/platform/analytics";

/** Report tones as token colours — shared by the server report and the client charts. */
export const TONE_COLOR: Record<Tone, string> = {
  success: "var(--ve-success)",
  highlight: "var(--ve-highlight)",
  warning: "var(--ve-warning)",
  accent: "var(--ve-accent)",
  neutral: "var(--ve-neutral)",
  information: "var(--ve-information)",
  brand1: "var(--ve-surface-brand1)",
  slate: "var(--ve-slate)",
  muted: "var(--ve-text-tertiary)",
  faint: "var(--ve-border-line)",
};
