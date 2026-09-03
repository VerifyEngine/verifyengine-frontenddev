import type { ReactNode } from "react";

/** Small uppercase pill used in dark hero sections, e.g. "LANDLORD VERIFICATION". */
export function PillBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold tracking-wide text-mint-200 uppercase">
      {children}
    </span>
  );
}

/** Plain uppercase label used as a section eyebrow on light backgrounds. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-semibold tracking-wide text-teal-600 uppercase">{children}</p>
  );
}

/** Small callout ribbon, e.g. "MOST POPULAR" on a featured pricing/industry card. */
export function CalloutTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-mint-200 px-3.5 py-1.5 text-sm font-semibold tracking-wide text-navy-900 uppercase">
      {children}
    </span>
  );
}
