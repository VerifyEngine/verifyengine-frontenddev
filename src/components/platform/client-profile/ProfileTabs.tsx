import Link from "next/link";
import type { ReactNode } from "react";
import { PROFILE_TABS } from "@/lib/platform/client-profile";

/*
 * The Client Profile tab strip and panel — Figma node 18391:216358.
 *
 * A glass panel whose top edge is a strip of eight tabs; the open tab is set
 * in the heading colour and underlined in Brand 1, the rest sit back in
 * Text/Tertiary. Tabs are links (?tab=…), so each is addressable and the page
 * stays a Server Component. The strip scrolls sideways on narrow screens
 * rather than wrapping into rows.
 */
export function ProfileTabs({
  basePath,
  active,
  children,
}: {
  basePath: string;
  active: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 backdrop-blur-[12px]">
      <nav aria-label="Client profile sections" className="overflow-x-auto border-b border-app-line bg-app-fade-40">
        <ul className="flex min-w-max">
          {PROFILE_TABS.map((tab) => {
            const isActive = tab.slug === active;
            return (
              <li key={tab.slug}>
                <Link
                  href={`${basePath}?tab=${tab.slug}`}
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
      <div className="p-6">{children}</div>
    </section>
  );
}

/** Section title inside a tab: the design's small uppercase eyebrow. */
export function TabSection({
  title,
  first = false,
  children,
}: {
  title: string;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-3 ${first ? "" : "border-t border-app-line-brand2 pt-5"}`}>
      <h3 className="text-nav-heading tracking-[0.1em] text-app-text-tertiary">{title}</h3>
      {children}
    </div>
  );
}

/** A label-over-value pair, three to a row on wide screens. */
export function FieldGrid({ fields }: { fields: readonly { label: string; value: string; wide?: boolean }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      {fields.map((field) => (
        <div key={field.label} className={`flex flex-col gap-0.5 ${field.wide ? "lg:col-span-2" : ""}`}>
          <dt className="text-nav-heading tracking-[0.05em] text-app-text-tertiary">{field.label}</dt>
          <dd className="text-label-2xs text-app-heading">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** For the two tabs the design lists but has not drawn yet. */
export function TabNotDesigned({ label }: { label: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center">
      <p className="text-heading-xs text-app-text">{label}</p>
      <p className="max-w-md text-body-xs text-app-text-secondary">
        This section is not available yet.
      </p>
    </div>
  );
}
