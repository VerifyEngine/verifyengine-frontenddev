"use client";

import {
  IconArrowLeft,
  IconCheck,
  IconChevronRight,
  IconDownload,
  IconEye,
  IconFileReport,
  IconFileText,
  IconMail,
  IconPlayerPlay,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconTrendingUp,
  IconUsersPlus,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { iconProps } from "./icon";

/*
 * Page header — Figma node 18250:13421.
 *
 * The glass panel every list screen opens with: title in Heading/S, a muted
 * description at 50% opacity, then a 264px search box, a secondary action, a
 * primary navy action, and two quiet sub-actions underneath.
 *
 * The action set changes per screen, so it is passed in rather than hard-coded
 * — Clients has "Bulk Import" and "Add New Client", Billing will have its own.
 * The icons are named by the design's Tabler glyphs and resolved here, so no
 * icon component travels as a prop.
 *
 * The form screens (New Order, node 18115:33588) use the same panel with three
 * differences, each opted into rather than assumed: a breadcrumb above the
 * title, no search box, and a status note where the list screens put Refresh
 * and Export.
 */

export type HeaderAction = {
  label: string;
  /** Matches the glyphs the design uses for these buttons. */
  icon: "users-plus" | "plus" | "cancel" | "check" | "review" | "escalate" | "file-report";
  /** Navy fill. Figma gives one button per header this treatment. */
  primary?: boolean;
  /** Makes the action a link — Report Creator opens its dialog through the URL. */
  href?: string;
};

function ActionIcon({ icon }: { icon: HeaderAction["icon"] }) {
  if (icon === "users-plus") return <IconUsersPlus {...iconProps(20)} />;
  if (icon === "cancel") return <IconX {...iconProps(20)} />;
  if (icon === "check") return <IconCheck {...iconProps(20)} />;
  if (icon === "review") return <IconEye {...iconProps(20)} />;
  if (icon === "escalate") return <IconTrendingUp {...iconProps(20)} />;
  if (icon === "file-report") return <IconFileReport {...iconProps(20)} />;
  return <IconPlus {...iconProps(20)} />;
}

export type UtilityAction = {
  label: string;
  icon: "refresh" | "download" | "transcript" | "replay" | "email";
};

function UtilityIcon({ icon }: { icon: UtilityAction["icon"] }) {
  if (icon === "refresh") return <IconRefresh {...iconProps(16)} />;
  if (icon === "transcript") return <IconFileText {...iconProps(16)} />;
  if (icon === "replay") return <IconPlayerPlay {...iconProps(16)} />;
  if (icon === "email") return <IconMail {...iconProps(16)} />;
  return <IconDownload {...iconProps(16)} />;
}

/** What the list screens show when a caller does not say otherwise. */
const LIST_UTILITIES: readonly UtilityAction[] = [
  { label: "Refresh", icon: "refresh" },
  { label: "Export List", icon: "download" },
];

export function PageHeader({
  breadcrumb,
  backHref,
  title,
  description,
  showSearch = true,
  actions,
  utilities = LIST_UTILITIES,
  note,
}: {
  /** Trail shown above the title on the form screens, e.g. ["Order", "New Order"]. */
  breadcrumb?: readonly string[];
  /** Renders a round back button beside the title, as on Order Details. */
  backHref?: string;
  title: string;
  description: string;
  showSearch?: boolean;
  actions?: readonly HeaderAction[];
  /** The quiet row underneath. Defaults to the list screens' Refresh / Export. */
  utilities?: readonly UtilityAction[];
  /** Status line at the start of the utility row, e.g. "Auto saved 2 min ago". */
  note?: string;
}) {
  return (
    <header className="flex flex-col gap-4 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px] xl:flex-row xl:items-center">
      <div className="flex min-w-px flex-1 flex-col gap-2">
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-app-text-tertiary">
            {breadcrumb.map((crumb, index) => (
              <span key={crumb} className="flex items-center gap-1">
                {index > 0 ? <IconChevronRight {...iconProps(12)} /> : null}
                <span className="text-label-2xs">{crumb}</span>
              </span>
            ))}
          </nav>
        ) : null}
        <div className="flex items-center gap-3">
          {backHref ? (
            <Link
              href={backHref}
              aria-label="Back"
              className="flex size-7 shrink-0 items-center justify-center rounded-app-12xl border-w-2xs border-app-line bg-app-fade-40 text-app-text transition-colors hover:bg-app-fade-48"
            >
              <IconArrowLeft {...iconProps(16)} />
            </Link>
          ) : null}
          <h1 className="text-heading-s text-app-text">{title}</h1>
        </div>
        <p className="text-body-xs text-app-text opacity-50">{description}</p>
      </div>

      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-wrap items-center gap-1 xl:justify-end">
          {showSearch ? (
          <div className="flex w-full items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-40 p-3 sm:w-66">
            <IconSearch {...iconProps(20)} className="shrink-0 text-app-text" />
            <input
              type="search"
              aria-label={`Search ${title.toLowerCase()}`}
              placeholder="Search by keywords..."
              className="min-w-px flex-1 bg-transparent py-0.5 text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary"
            />
            <button type="button" aria-label="Clear search" className="shrink-0 text-app-text">
              <IconX {...iconProps(12)} />
            </button>
          </div>
          ) : null}

          {actions?.map((action) => {
            const className = action.primary
              ? "flex shrink-0 items-center justify-center gap-3 rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90"
              : "flex shrink-0 items-center justify-center gap-3 rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-app-text transition-colors hover:bg-app-fade-48";
            const content = (
              <>
                <span className={action.icon === "cancel" ? "text-app-warning" : ""}>
                  <ActionIcon icon={action.icon} />
                </span>
                <span className="whitespace-nowrap text-label-xs">{action.label}</span>
              </>
            );
            return action.href ? (
              <Link key={action.label} href={action.href} scroll={false} className={className}>
                {content}
              </Link>
            ) : (
              <button key={action.label} type="button" className={className}>
                {content}
              </button>
            );
          })}
        </div>

        {note || utilities.length > 0 ? (
          <div className="flex flex-wrap items-center gap-5 px-2 xl:justify-end">
            {note ? (
              <p className="flex items-center gap-1 text-app-text-tertiary">
                <IconRefresh {...iconProps(16)} />
                <span className="whitespace-nowrap text-label-2xs">{note}</span>
              </p>
            ) : null}
            {utilities.map((utility) => (
              <button
                key={utility.label}
                type="button"
                className="flex items-center justify-center gap-1 text-app-text-secondary transition-colors hover:text-app-text"
              >
                <UtilityIcon icon={utility.icon} />
                <span className="whitespace-nowrap text-label-2xs">{utility.label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
