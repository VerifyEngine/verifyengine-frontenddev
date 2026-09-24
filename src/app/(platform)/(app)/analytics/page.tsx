import type { Metadata } from "next";
import { FilterField } from "@/components/platform/FilterField";
import { PageHeader } from "@/components/platform/PageHeader";
import { AnalyticsReport } from "@/components/platform/analytics/AnalyticsReport";

export const metadata: Metadata = { title: "Analytics Reports" };

/*
 * Analytics Reports — Figma node 18176:29544 (Light Mode section).
 *
 * The Side Menu's Analytics. The page header and a panel of four report
 * filters share the top row at 1920 (split 1fr / 0.75fr); the report card
 * below holds the document itself. Below 3xl the two panels stack.
 */
export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4 pb-2">
      <div className="grid grid-cols-1 gap-4 3xl:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)]">
        <PageHeader
          title="Analytics Reports"
          description="Apply filters and get the analytics reports based on your requirements."
          showSearch={false}
          actions={[
            { label: "Mail", icon: "mail" },
            { label: "Present", icon: "present" },
            { label: "Print", icon: "printer" },
            { label: "Export PDF", icon: "download", primary: true },
          ]}
          utilities={[]}
        />
        <section
          aria-label="Report filters"
          className="grid grid-cols-1 items-end gap-2 self-start rounded-app-xl border-w-2xs border-app-line bg-app-brand2-16 p-4 backdrop-blur-[12px] sm:grid-cols-2 xl:grid-cols-4"
        >
          <FilterField label="Date Range" placeholder="Select an option..." surface="solid" />
          <FilterField label="Team" placeholder="Select an option..." surface="solid" />
          <FilterField label="Property" placeholder="Select an option..." surface="solid" />
          <FilterField label="Portfolio" placeholder="Select an option..." surface="solid" />
        </section>
      </div>

      <AnalyticsReport />
    </div>
  );
}
