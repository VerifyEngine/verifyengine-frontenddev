"use client";

import { IconAdjustmentsHorizontal, IconChevronDown, IconCrown, IconPencil } from "@tabler/icons-react";
import Image from "next/image";
import { iconProps } from "./icon";
import type { ClientContact, ClientRow, ClientStatus } from "@/lib/platform/clients";

/*
 * Clients table — Figma nodes 18250:15303 (header) and 18250:15584 (row).
 *
 * Unlike the verification queue, this header and its rows do broadly agree in
 * Figma, but three columns differ by 4px (96 vs 100). Both are driven from one
 * column list here so they cannot drift.
 *
 * Two identity columns carry an image plus three stacked lines (name, email,
 * phone) rather than a single value, which is why the row is 76px tall against
 * the queue's 60px.
 *
 * Column widths scale with --ve-type-scale, for the same reason as the other
 * table: the platform ships type 1.2x larger than drawn.
 */

const COLUMNS = [
  { key: "clientId", label: "Client ID", width: 68 },
  { key: "company", label: "Company Info" },
  { key: "contact", label: "Client Info" },
  { key: "orderCount", label: "No. of Order", width: 100 },
  { key: "permissions", label: "Permissions", width: 100 },
  { key: "subscription", label: "Subscription", width: 100 },
  { key: "api", label: "API", width: 100 },
  { key: "whiteLabel", label: "White Label", width: 100 },
  { key: "status", label: "Status", width: 90 },
  { key: "dateAdded", label: "Date Added", width: 76 },
  { key: "lastUpdated", label: "Last Updated", width: 76 },
  { key: "actions", label: "Client Actions", width: 88 },
] as const;

/*
 * Below this the table scrolls sideways. Not scaled with the type: the fixed
 * columns already are, and the design's full 1624 at 1.2x overflowed the very
 * 1920 frame it was drawn for, cutting off the dates and actions. The two
 * identity columns absorb the difference.
 */
const MIN_TABLE_WIDTH = 1280;

const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

const STATUS_STYLES: Record<ClientStatus, string> = {
  Active: "bg-app-success text-app-text-inverse",
  Suspended: "bg-app-warning text-app-text-inverse",
  Trial: "bg-app-highlight text-app-text",
};

/** Status here is a menu, not a label: it carries a chevron (node 18250:15445). */
function ClientStatusChip({ status }: { status: ClientStatus }) {
  return (
    <button
      type="button"
      style={{ width: scaled(90) }}
      className={`flex shrink-0 items-center justify-between rounded-app-4xl px-2 py-1 text-body-2xs ${STATUS_STYLES[status]}`}
    >
      {status}
      <IconChevronDown {...iconProps(12)} />
    </button>
  );
}

/**
 * The design shows a company logo and a contact photo. Real artwork will come
 * from the API, so the mock renders a monogram tile for the company and the
 * one avatar asset the design ships for the person.
 */
export function IdentityCell({
  person,
  variant,
}: {
  person: ClientContact;
  variant: "company" | "contact";
}) {
  return (
    <div className="flex min-w-px flex-1 items-center gap-2">
      {variant === "company" ? (
        <span className="flex size-[50px] shrink-0 items-center justify-center rounded-app-m border-w-2xs border-app-line bg-app-surface text-label-xs text-app-text-emphasis">
          {person.name.slice(0, 2).toUpperCase()}
        </span>
      ) : (
        <Image
          src="/images/platform-avatar.png"
          alt=""
          width={50}
          height={50}
          className="size-[50px] shrink-0 rounded-app-12xl border-w-2xs border-app-line object-cover"
        />
      )}
      <span className="flex min-w-px flex-1 flex-col justify-center gap-1 py-2">
        <span className="truncate text-body-2xs text-app-text">{person.name}</span>
        <span className="truncate text-body-2xs text-app-text-secondary">{person.email}</span>
        <span className="truncate text-body-2xs text-app-text-secondary">{person.phone}</span>
      </span>
    </div>
  );
}

const ROW_ACTIONS = [
  { label: "Configure", icon: "adjustments" },
  { label: "Change plan", icon: "crown" },
  { label: "Edit", icon: "pencil" },
] as const;

function RowActions({ clientId }: { clientId: string }) {
  return (
    <div className="flex shrink-0 items-center gap-0.5" style={{ width: scaled(88) }}>
      {ROW_ACTIONS.map((action) => (
        <button
          key={action.label}
          type="button"
          aria-label={`${action.label} ${clientId}`}
          className="flex items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 p-2 text-app-text transition-colors hover:bg-app-fade-40"
        >
          {action.icon === "adjustments" ? (
            <IconAdjustmentsHorizontal {...iconProps(12)} />
          ) : action.icon === "crown" ? (
            <IconCrown {...iconProps(12)} />
          ) : (
            <IconPencil {...iconProps(12)} />
          )}
        </button>
      ))}
    </div>
  );
}

/** Two 4px carets, matching the Sort component used across the platform. */
export function SortHandle() {
  return (
    <span aria-hidden className="flex shrink-0 flex-col items-center justify-center gap-0.5">
      <svg viewBox="0 0 6 4" className="h-1 w-1.5" fill="none">
        <path d="M1 3.2 3 0.8l2 2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 6 4" className="h-1 w-1.5" fill="none">
        <path d="M1 0.8 3 3.2l2-2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function ClientsTable({ rows }: { rows: ClientRow[] }) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: MIN_TABLE_WIDTH }}>
        <div className="flex items-center gap-4 rounded-t-app-l bg-app-brand1 px-4 py-3">
          {COLUMNS.map((column) => (
            <div
              key={column.key}
              className={
                "width" in column
                  ? "flex shrink-0 items-center gap-1"
                  : "flex min-w-px flex-1 items-center gap-1"
              }
              style={"width" in column ? { width: scaled(column.width) } : undefined}
            >
              <span className="min-w-px flex-1 text-table-heading text-app-text-inverse">
                {column.label}
              </span>
              <button
                type="button"
                aria-label={`Sort by ${column.label}`}
                className="shrink-0 cursor-pointer text-app-text-inverse"
              >
                <SortHandle />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          {rows.map((row) => (
            <div
              key={row.clientId}
              className="flex items-center gap-4 border-w-2xs border-app-line bg-app-fade-48 px-4 py-2 transition-colors hover:bg-app-fade-40"
            >
              <span style={{ width: scaled(68) }} className="shrink-0 text-body-2xs text-app-text">
                {row.clientId}
              </span>
              <IdentityCell person={row.company} variant="company" />
              <IdentityCell person={row.contact} variant="contact" />
              {(["orderCount", "permissions", "subscription", "api", "whiteLabel"] as const).map(
                (key) => (
                  <span
                    key={key}
                    style={{ width: scaled(100) }}
                    className="shrink-0 text-body-2xs text-app-text"
                  >
                    {row[key]}
                  </span>
                ),
              )}
              <ClientStatusChip status={row.status} />
              <span style={{ width: scaled(76) }} className="shrink-0 text-body-2xs text-app-text">
                {row.dateAdded}
              </span>
              <span style={{ width: scaled(76) }} className="shrink-0 text-body-2xs text-app-text">
                {row.lastUpdated}
              </span>
              <RowActions clientId={row.clientId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
