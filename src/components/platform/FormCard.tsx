import type { ReactNode } from "react";

/**
 * One numbered block of a long form — "Applicant Details", "Consent & Legal".
 *
 * Figma calls this a "Metric" (node 18176:14014), the same glass card the
 * dashboard uses, but on the form screens it carries a Heading M title and a
 * 32px gap down to its contents instead of a metric figure.
 *
 * The title is Text/Default/Primary here, not Text/Brand 1 as on the dashboard
 * panels — the design uses the plain text colour for form section titles.
 */
export function FormCard({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className="flex scroll-mt-4 flex-col gap-8 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px] sm:p-6"
    >
      <h2 id={id ? `${id}-title` : undefined} className="text-heading-m text-app-text">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * The inner translucent panel a FormCard groups its fields in — Surface/Fade
 * 64% over a hairline. Some carry a muted label ("Tenant Information"), some
 * (the consent row) carry none.
 */
export function FormPanel({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-5 rounded-app-xl border-w-2xs border-app-line bg-app-fade-64 p-4 backdrop-blur-[12px] sm:p-5 ${className}`}
    >
      {label ? <p className="text-label-xs text-app-text-secondary">{label}</p> : null}
      {children}
    </div>
  );
}
