import {
  IconChevronDown,
  IconFileDollar,
  IconFileTypePdf,
  IconPencil,
  IconPrinter,
} from "@tabler/icons-react";
import { IdentityCell, SortHandle } from "./ClientsTable";
import { iconProps } from "./icon";
import type { BillingRow, BillingStatus } from "@/lib/platform/billing";

/*
 * Billing table — Figma nodes 18502:17742 (header) and 18502:17313 (row).
 *
 * The Invoices table's shape: company and contact identity cells, money
 * columns, a status menu and round actions — here invoice, print, PDF and
 * edit. The billing period prints its two dates either side of a dash. One
 * column list drives header and rows so they stay aligned; widths scale with
 * --ve-type-scale.
 */

const COLUMNS = [
  { key: "clientId", label: "Client ID", width: 68 },
  { key: "company", label: "Company Info" },
  { key: "contact", label: "Client Info" },
  { key: "nonInvoiced", label: "Total Non-Invoiced Charges", width: 96 },
  { key: "ordersWithCharges", label: "Total Orders w/ Charges", width: 96 },
  { key: "period", label: "Billing Date Range", width: 164 },
  { key: "pendingAdjustments", label: "Pending Adjustments", width: 96 },
  { key: "status", label: "Invoice Status", width: 132 },
  { key: "dateAdded", label: "Date Added", width: 72 },
  { key: "lastInvoice", label: "Last Invoice", width: 72 },
  { key: "actions", label: "Actions", width: 125 },
] as const;

/** Below this the table scrolls sideways; see InvoicesTable for why it is not scaled. */
const MIN_TABLE_WIDTH = 1280;

const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

/** Figma's Status - Client chip (18611:25261): a menu, so it carries a chevron. */
const STATUS_STYLES: Record<BillingStatus, string> = {
  "Ready for Invoice": "bg-app-success text-app-text-inverse",
  "Pending Review": "bg-app-accent text-app-text-inverse",
  "Adjustments Needed": "bg-app-warning text-app-text-inverse",
  "Invoice Generated": "bg-app-brand1-quaternary text-app-text-tertiary",
};

const ACTIONS = [
  { label: "Invoice", icon: "file-dollar" },
  { label: "Print", icon: "printer" },
  { label: "PDF", icon: "pdf" },
  { label: "Edit", icon: "pencil" },
] as const;

function ActionIcon({ icon }: { icon: (typeof ACTIONS)[number]["icon"] }) {
  if (icon === "file-dollar") return <IconFileDollar {...iconProps(12)} />;
  if (icon === "printer") return <IconPrinter {...iconProps(12)} />;
  if (icon === "pdf") return <IconFileTypePdf {...iconProps(12)} />;
  return <IconPencil {...iconProps(12)} />;
}

function Value({ width, children }: { width: number; children: string }) {
  return (
    <span style={{ width: scaled(width) }} className="shrink-0 pl-2.5 text-body-2xs text-app-text">
      {children}
    </span>
  );
}

export function BillingTable({ rows }: { rows: readonly BillingRow[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-0.5" style={{ minWidth: MIN_TABLE_WIDTH }}>
        <div className="flex items-center gap-4 rounded-app-l bg-app-brand1 px-4 py-2">
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
              key={row.clientId}
              className="flex items-center gap-4 border-w-2xs border-app-line bg-app-fade-48 px-4 py-2 transition-colors hover:bg-app-fade-40"
            >
              <Value width={68}>{row.clientId}</Value>
              <IdentityCell person={row.company} variant="company" />
              <IdentityCell person={row.contact} variant="contact" />
              <Value width={96}>{row.nonInvoiced}</Value>
              <Value width={96}>{row.ordersWithCharges}</Value>
              <span
                style={{ width: scaled(164) }}
                className="flex shrink-0 items-center gap-1 pl-2.5 text-body-2xs text-app-text"
              >
                <span className="min-w-px flex-1">{row.periodStart}</span>
                <span aria-label="to">—</span>
                <span className="min-w-px flex-1">{row.periodEnd}</span>
              </span>
              <Value width={96}>{row.pendingAdjustments}</Value>
              <button
                type="button"
                style={{ width: scaled(132) }}
                className={`flex shrink-0 items-center justify-between rounded-app-4xl px-2 py-1 text-body-2xs ${STATUS_STYLES[row.status]}`}
              >
                {row.status}
                <IconChevronDown {...iconProps(12)} />
              </button>
              <Value width={72}>{row.dateAdded}</Value>
              <Value width={72}>{row.lastInvoice}</Value>
              <div className="flex shrink-0 items-center gap-0.5" style={{ width: scaled(125) }}>
                {ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    aria-label={`${action.label} ${row.clientId}`}
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
