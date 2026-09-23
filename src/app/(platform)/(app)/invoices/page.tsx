import type { Metadata } from "next";
import { FilterField } from "@/components/platform/FilterField";
import { InvoicesTable } from "@/components/platform/InvoicesTable";
import { MetricCard } from "@/components/platform/MetricCard";
import { PageHeader } from "@/components/platform/PageHeader";
import {
  INVOICES,
  INVOICE_FILTERS_BOTTOM,
  INVOICE_FILTERS_TOP,
  INVOICE_METRICS,
} from "@/lib/platform/invoices";

export const metadata: Metadata = { title: "Invoices" };

/*
 * Invoices — Figma node 18540:22351.
 *
 * Same structure as Client Listing: page header, one row of eight metric
 * cards, then a glass panel with two rows of filters above the table. The
 * first filter row gives search a fixed 360px and shares the rest; the second
 * row is five equal selects.
 *
 * Below xl the metric row wraps and the filters fold into fewer columns; the
 * table scrolls sideways rather than squeezing its identity columns.
 */
export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Invoices"
        description="Financial Records & Invoice Management"
        actions={[
          { label: "Email Invoice", icon: "mail" },
          { label: "Print Invoice", icon: "printer" },
          { label: "Create Invoice", icon: "plus", primary: true },
        ]}
        utilities={[
          { label: "Download Statements", icon: "statement" },
          { label: "Refresh", icon: "refresh" },
          { label: "Export Invoices", icon: "download" },
        ]}
      />

      <section
        aria-label="Invoice metrics"
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8"
      >
        {INVOICE_METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section
        aria-label="Invoice list"
        className="flex flex-col gap-4 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
      >
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[calc(360px*var(--ve-type-scale))_repeat(4,minmax(0,1fr))]">
            <FilterField label="Search" placeholder="Search by keywords..." variant="search" />
            {INVOICE_FILTERS_TOP.map((label) => (
              <FilterField key={label} label={label} placeholder="Select an option..." />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {INVOICE_FILTERS_BOTTOM.map((filter) => (
              <FilterField key={filter.label} label={filter.label} placeholder={filter.placeholder} />
            ))}
          </div>
        </div>

        <InvoicesTable rows={INVOICES} />
      </section>
    </div>
  );
}
