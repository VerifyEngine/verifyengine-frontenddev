import {
  IconChevronDown,
  IconDownload,
  IconEye,
  IconMail,
  IconPrinter,
  IconRefresh,
} from "@tabler/icons-react";
import { IdentityCell, SortHandle } from "./ClientsTable";
import { iconProps } from "./icon";
import type { InvoiceRow, InvoiceStatus } from "@/lib/platform/invoices";

/*
 * Invoices table — Figma nodes 18539:22320 (header) and 18539:22211 (row).
 *
 * The same shape as the Clients table — company and contact identity cells
 * of three stacked lines — with billing columns and five round actions: view,
 * download, resend, email, print. Header and rows are driven from one column
 * list so they stay aligned, and widths scale with --ve-type-scale.
 *
 * Columns the mock has no value for show an em dash (see lib/platform/invoices).
 */

const COLUMNS = [
  { key: "invoice", label: "Invoice#", width: 68 },
  { key: "company", label: "Company Info" },
  { key: "contact", label: "Client Info" },
  { key: "billingPeriod", label: "Billing Period", width: 80 },
  { key: "amount", label: "Amount", width: 80 },
  { key: "usageCharges", label: "Usage Charges", width: 80 },
  { key: "status", label: "Status", width: 72 },
  { key: "paymentMethod", label: "Payment Method", width: 80 },
  { key: "generatedAt", label: "Generated Date", width: 72 },
  { key: "dueAt", label: "Due Date", width: 72 },
  { key: "actions", label: "Action", width: 148 },
] as const;

/*
 * Below this the table scrolls sideways. Not scaled with the type: the fixed
 * columns already are, and the design's full 1624 at 1.2x would overflow the
 * very 1920 frame it was drawn for — the two identity columns absorb the rest.
 */
const MIN_TABLE_WIDTH = 1280;

const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

/** Figma's Status - Client chip (18539:22409): a menu, so it carries a chevron. */
const STATUS_STYLES: Record<InvoiceStatus, string> = {
  Paid: "bg-app-success text-app-text-inverse",
  Pending: "bg-app-highlight text-app-text-inverse",
  Overdue: "bg-app-accent text-app-text-inverse",
  Failed: "bg-app-warning text-app-text-inverse",
  Draft: "bg-app-brand1-quaternary text-app-text-tertiary",
};

const ACTIONS = [
  { label: "View", icon: "eye" },
  { label: "Download", icon: "download" },
  { label: "Resend", icon: "refresh" },
  { label: "Email", icon: "mail" },
  { label: "Print", icon: "printer" },
] as const;

function ActionIcon({ icon }: { icon: (typeof ACTIONS)[number]["icon"] }) {
  if (icon === "eye") return <IconEye {...iconProps(12)} />;
  if (icon === "download") return <IconDownload {...iconProps(12)} />;
  if (icon === "refresh") return <IconRefresh {...iconProps(12)} />;
  if (icon === "mail") return <IconMail {...iconProps(12)} />;
  return <IconPrinter {...iconProps(12)} />;
}

function Value({ width, children }: { width: number; children: string | null }) {
  return (
    <span style={{ width: scaled(width) }} className="shrink-0 pl-2.5 text-body-2xs text-app-text">
      {children ?? <span className="text-app-text-tertiary">—</span>}
    </span>
  );
}

export function InvoicesTable({ rows }: { rows: readonly InvoiceRow[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-0.5" style={{ minWidth: MIN_TABLE_WIDTH }}>
        <div className="flex items-center gap-4 rounded-app-l bg-app-brand1 px-4 py-3">
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
              <button
                type="button"
                aria-label={`Sort by ${column.label}`}
                className="shrink-0 cursor-pointer text-app-text-inverse"
              >
                <SortHandle />
              </button>
              <span className="min-w-px flex-1 text-table-heading text-app-text-inverse">
                {column.label}
              </span>
            </div>
          ))}
        </div>

        <ul className="overflow-hidden rounded-app-l border-w-2xs border-app-line">
          {rows.map((row) => (
            <li
              key={row.invoice}
              className="flex items-center gap-4 border-w-2xs border-app-line bg-app-fade-48 px-4 py-2 transition-colors hover:bg-app-fade-40"
            >
              <Value width={68}>{row.invoice}</Value>
              <IdentityCell person={row.company} variant="company" />
              <IdentityCell person={row.contact} variant="contact" />
              <Value width={80}>{row.billingPeriod}</Value>
              <Value width={80}>{row.amount}</Value>
              <Value width={80}>{row.usageCharges}</Value>
              <button
                type="button"
                style={{ width: scaled(72) }}
                className={`flex shrink-0 items-center justify-between rounded-app-4xl px-2 py-1 text-body-2xs ${STATUS_STYLES[row.status]}`}
              >
                {row.status}
                <IconChevronDown {...iconProps(12)} />
              </button>
              <Value width={80}>{row.paymentMethod}</Value>
              <Value width={72}>{row.generatedAt}</Value>
              <Value width={72}>{row.dueAt}</Value>
              <div className="flex shrink-0 items-center gap-0.5" style={{ width: scaled(148) }}>
                {ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    aria-label={`${action.label} ${row.invoice}`}
                    className="flex items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 p-2 text-app-text transition-colors hover:bg-app-fade-40"
                  >
                    <ActionIcon icon={action.icon} />
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
