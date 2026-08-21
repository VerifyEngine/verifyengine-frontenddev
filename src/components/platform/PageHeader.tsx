"use client";

import {
  IconDownload,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconUsersPlus,
  IconX,
} from "@tabler/icons-react";
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
 */

export type HeaderAction = {
  label: string;
  /** Matches the glyphs the design uses for these buttons. */
  icon: "users-plus" | "plus";
};

function ActionIcon({ icon }: { icon: HeaderAction["icon"] }) {
  return icon === "users-plus" ? (
    <IconUsersPlus {...iconProps(20)} />
  ) : (
    <IconPlus {...iconProps(20)} />
  );
}

export function PageHeader({
  title,
  description,
  secondaryAction,
  primaryAction,
}: {
  title: string;
  description: string;
  secondaryAction?: HeaderAction;
  primaryAction?: HeaderAction;
}) {
  return (
    <header className="flex flex-col gap-4 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px] xl:flex-row xl:items-center">
      <div className="flex min-w-px flex-1 flex-col gap-2">
        <h1 className="text-heading-s text-app-text">{title}</h1>
        <p className="text-body-xs text-app-text opacity-50">{description}</p>
      </div>

      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-wrap items-center gap-1 xl:justify-end">
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

          {secondaryAction ? (
            <button
              type="button"
              className="flex shrink-0 items-center justify-center gap-3 rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-app-text transition-colors hover:bg-app-fade-48"
            >
              <ActionIcon icon={secondaryAction.icon} />
              <span className="whitespace-nowrap text-label-xs">{secondaryAction.label}</span>
            </button>
          ) : null}

          {primaryAction ? (
            <button
              type="button"
              className="flex shrink-0 items-center justify-center gap-3 rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90"
            >
              <ActionIcon icon={primaryAction.icon} />
              <span className="whitespace-nowrap text-label-xs">{primaryAction.label}</span>
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-5 px-2 xl:justify-end">
          <button
            type="button"
            className="flex items-center justify-center gap-1 text-app-text-secondary transition-colors hover:text-app-text"
          >
            <IconRefresh {...iconProps(16)} />
            <span className="whitespace-nowrap text-label-2xs">Refresh</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1 text-app-text-secondary transition-colors hover:text-app-text"
          >
            <IconDownload {...iconProps(16)} />
            <span className="whitespace-nowrap text-label-2xs">Export List</span>
          </button>
        </div>
      </div>
    </header>
  );
}
