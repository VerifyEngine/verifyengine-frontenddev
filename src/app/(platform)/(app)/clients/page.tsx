import type { Metadata } from "next";
import { ClientsTable } from "@/components/platform/ClientsTable";
import { FilterField } from "@/components/platform/FilterField";
import { MetricCard } from "@/components/platform/MetricCard";
import { PageHeader } from "@/components/platform/PageHeader";
import { CLIENTS, CLIENT_METRICS } from "@/lib/platform/clients";

export const metadata: Metadata = { title: "Clients" };

/*
 * Client Listing — Figma node 18250:13416.
 *
 * Structure: page header, one row of eight metric cards, then the filter block
 * and the table inside a single glass panel. The metric cards on this screen
 * carry no change indicator, which is why MetricCard takes an optional delta.
 *
 * Below xl the metric row wraps instead of scrolling; the design only
 * specifies 1920.
 */
export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Clients"
        description="View list of all clients and edit, delete, suspend or delete clients. Manage their subscriptions & permissions"
        actions={[
          { label: "Bulk Import Clients", icon: "users-plus" },
          { label: "Add New Client", icon: "plus", primary: true },
        ]}
      />

      <section
        aria-label="Client metrics"
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8"
      >
        {CLIENT_METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section
        aria-label="Client list"
        className="flex flex-col gap-4 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
      >
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-6">
            <FilterField
              label="Search"
              placeholder="Search by keywords..."
              variant="search"
              className="lg:col-span-2"
            />
            <FilterField label="Subscription" placeholder="Select an option..." />
            <FilterField label="Status" placeholder="Select an option..." />
            <FilterField label="API Access" placeholder="Select an option..." />
            <FilterField label="White Label" placeholder="Select an option..." />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-6">
            <FilterField label="Permissions" placeholder="Select an option..." />
            <FilterField label="No. of Order" placeholder="Select an option..." />
            <FilterField label="Date Added" placeholder="Select Date Range--" />
            <FilterField label="Last Updated" placeholder="Select Date Range--" />
          </div>
        </div>

        <ClientsTable rows={CLIENTS} />
      </section>
    </div>
  );
}
