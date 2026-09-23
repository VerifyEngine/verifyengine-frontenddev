import Link from "next/link";
import type { ReactNode } from "react";
import { COMPANY_TABS } from "@/lib/platform/company";

/*
 * The Company tab strip and panel — the "Company Tabs" instance in each
 * Company frame. Same strip as Client Profile's; inside, the Company frames
 * set every block on a white card with a bold title rather than eyebrows.
 */
export function CompanyTabs({ active, children }: { active: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 backdrop-blur-[12px]">
      <nav aria-label="Company sections" className="overflow-x-auto border-b border-app-line bg-app-fade-40">
        <ul className="flex min-w-max">
          {COMPANY_TABS.map((tab) => {
            const isActive = tab.slug === active;
            return (
              <li key={tab.slug}>
                <Link
                  href={`/company?tab=${tab.slug}`}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={`block border-b-2 px-5 py-3 text-label-2xs whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-app-line-brand1 font-semibold text-app-heading"
                      : "border-transparent text-app-text-tertiary hover:text-app-text"
                  }`}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4">{children}</div>
    </section>
  );
}

export const CARD = "rounded-app-l border-w-2xs border-app-line-brand2 bg-app-surface";

/** A white card with a bold title and an optional action on the right. */
export function Panel({
  title,
  action,
  className = "",
  children,
}: {
  title?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`flex flex-col gap-4 p-4 ${CARD} ${className}`}>
      {title ? (
        <div className="flex items-center gap-3">
          <h3 className="min-w-px flex-1 text-label-2xs font-bold text-app-heading">{title}</h3>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

/** Label-over-value pairs: uppercase label in Text/Tertiary, value in the heading colour. */
export function CompanyFieldGrid({
  fields,
  columns = 3,
}: {
  fields: readonly { label: string; value: string }[];
  columns?: 2 | 3;
}) {
  return (
    <dl className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {fields.map((field) => (
        <div key={field.label} className="flex flex-col gap-1">
          <dt className="text-nav-heading tracking-[0.05em] text-app-text-tertiary uppercase">{field.label}</dt>
          <dd className="text-label-2xs text-app-heading">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Label and description beside a control, as the settings rows draw them. */
export function SettingText({ label, description }: { label: string; description: string }) {
  return (
    <div className="flex min-w-px flex-1 flex-col gap-0.5">
      <p className="text-label-2xs text-app-heading">{label}</p>
      <p className="text-body-2xs text-app-text-tertiary">{description}</p>
    </div>
  );
}

/** Outline button used across the tabs — Regenerate, Connect, View Full Log. */
export const OUTLINE_BUTTON =
  "flex shrink-0 items-center justify-center gap-1.5 rounded-app-m border-w-2xs border-app-line bg-app-surface px-3 py-1.5 text-label-2xs text-app-heading transition-colors hover:bg-app-brand2-16";
