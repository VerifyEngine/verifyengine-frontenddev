import type { Metadata } from "next";
import { BillingTable } from "@/components/platform/BillingTable";
import { FilterField } from "@/components/platform/FilterField";
import { MetricCard } from "@/components/platform/MetricCard";
import { PageHeader } from "@/components/platform/PageHeader";
import { BILLING_FILTERS, BILLING_METRICS, BILLING_ROWS } from "@/lib/platform/billing";

export const metadata: Metadata = { title: "Billing Summary" };

/*
 * Billing Summary — Figma node 18502:17787.
 *
 * Same structure as Invoices: page header, a row of four metric cards, then a
 * glass panel with one row of filters — search at a fixed 360px, seven equal
 * selects — above the table.
 *
 * Below xl the metrics wrap to two columns and the filters fold into fewer;
 * the table scrolls sideways rather than squeezing its identity columns.
 */
export default function BillingSummaryPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Billing Summary"
        description="Internal accounting operations for the record-keeping of billings."
        actions={[
          { label: "Print Summary", icon: "printer" },
          { label: "Export Summary", icon: "file-export" },
          { label: "Generate Invoice", icon: "plus", primary: true },
        ]}
      />

      <section aria-label="Billing metrics" className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {BILLING_METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section
        aria-label="Billing list"
        className="flex flex-col gap-4 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
      >
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[calc(360px*var(--ve-type-scale))_repeat(7,minmax(0,1fr))]">
          <FilterField
            label="Search"
            placeholder="Search by keywords..."
            variant="search"
            className="sm:col-span-2 lg:col-span-4 xl:col-span-1"
          />
          {BILLING_FILTERS.map((filter) => (
            <FilterField key={filter.label} label={filter.label} placeholder={filter.placeholder} />
          ))}
        </div>

        <BillingTable rows={BILLING_ROWS} />
      </section>
    </div>
  );
}
