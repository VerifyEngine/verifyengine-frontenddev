import Image from "next/image";
import { IconChevronDown, IconPencil, IconTrash } from "@tabler/icons-react";
import { SortHandle } from "@/components/platform/ClientsTable";
import { iconProps } from "@/components/platform/icon";
import { COMPANY_USERS, type CompanyUserStatus } from "@/lib/platform/company";

/*
 * Users & permissions — Figma node 18510:25063 (header 18513:19564, row
 * 18513:19566).
 *
 * The navy header and rows of the Clients table. The design gives every
 * person a stock photo; the mock uses the one avatar asset the platform
 * ships, as the Clients table does, until real photos come from the API.
 * Dates split over two lines, as drawn.
 */

const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

const COLUMNS = [
  { key: "id", label: "User ID", width: 76 },
  { key: "info", label: "User Info" },
  { key: "role", label: "Role", width: 110 },
  { key: "dateAdded", label: "Date Added", width: 96 },
  { key: "lastLogin", label: "Last Login", width: 96 },
  { key: "status", label: "Status", width: 88 },
  { key: "actions", label: "Actions", width: 64 },
] as const;

const STATUS_STYLES: Record<CompanyUserStatus, string> = {
  Active: "bg-app-success text-app-text-inverse",
  Pending: "bg-app-accent text-app-text-inverse",
  Inactive: "bg-app-warning text-app-text-inverse",
};

/** "May 18, 2026 5:30 am" → date over time. */
function TwoLineDate({ value }: { value: string }) {
  const match = value.match(/^(.*\d{4}) (.*)$/);
  return (
    <span className="flex flex-col text-body-2xs text-app-text">
      <span>{match ? match[1] : value}</span>
      {match ? <span className="text-app-text-secondary">{match[2]}</span> : null}
    </span>
  );
}

const ROUND_BUTTON =
  "flex items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 p-1.5 transition-colors hover:bg-app-fade-40";

export function UsersTab() {
  return (
    <div className="overflow-x-auto rounded-app-l">
      <div className="min-w-[1080px]">
        <div className="flex items-center gap-4 rounded-t-app-l bg-app-brand1 px-4 py-2.5">
          {COLUMNS.map((column) => (
            <div
              key={column.key}
              className={"width" in column ? "flex shrink-0 items-center gap-1" : "flex min-w-px flex-1 items-center gap-1"}
              style={"width" in column ? { width: scaled(column.width) } : undefined}
            >
              {column.key !== "actions" ? (
                <span aria-hidden className="shrink-0 text-app-text-inverse">
                  <SortHandle />
                </span>
              ) : null}
              <span className="min-w-px flex-1 text-table-heading text-app-text-inverse">{column.label}</span>
            </div>
          ))}
        </div>

        <ul className="flex flex-col">
          {COMPANY_USERS.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-4 border-w-2xs border-app-line bg-app-fade-48 px-4 py-2 transition-colors hover:bg-app-fade-40"
            >
              <span style={{ width: scaled(76) }} className="shrink-0 text-body-2xs text-app-text">
                {user.id}
              </span>
              <div className="flex min-w-px flex-1 items-center gap-3">
                <Image
                  src="/images/platform-avatar.png"
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-app-12xl border-w-2xs border-app-line object-cover"
                />
                <span className="flex min-w-px flex-1 flex-col">
                  <span className="truncate text-body-2xs text-app-text">{user.name}</span>
                  <span className="truncate text-body-2xs text-app-text-secondary">{user.email}</span>
                  <span className="truncate text-body-2xs text-app-text-secondary">{user.phone}</span>
                </span>
              </div>
              <span style={{ width: scaled(110) }} className="shrink-0">
                <span className="rounded-app-4xl border-w-2xs border-app-line bg-app-fade-40 px-2.5 py-1 text-body-2xs text-app-text">
                  {user.role}
                </span>
              </span>
              <span style={{ width: scaled(96) }} className="shrink-0">
                <TwoLineDate value={user.dateAdded} />
              </span>
              <span style={{ width: scaled(96) }} className="shrink-0">
                <TwoLineDate value={user.lastLogin} />
              </span>
              <span style={{ width: scaled(88) }} className="shrink-0">
                <button
                  type="button"
                  aria-label={`Status: ${user.status}`}
                  className={`flex w-full items-center justify-between rounded-app-4xl px-2 py-1 text-body-2xs ${STATUS_STYLES[user.status]}`}
                >
                  {user.status}
                  <IconChevronDown {...iconProps(12)} />
                </button>
              </span>
              <span style={{ width: scaled(64) }} className="flex shrink-0 items-center gap-1">
                <button type="button" aria-label={`Remove ${user.name}`} className={`${ROUND_BUTTON} text-app-warning`}>
                  <IconTrash {...iconProps(12)} />
                </button>
                <button type="button" aria-label={`Edit ${user.name}`} className={`${ROUND_BUTTON} text-app-text`}>
                  <IconPencil {...iconProps(12)} />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
