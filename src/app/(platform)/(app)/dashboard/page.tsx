import type { Metadata } from "next";
import { DonutMetricCard } from "@/components/platform/DonutMetricCard";
import { FilterField } from "@/components/platform/FilterField";
import { LiveAlertPanel } from "@/components/platform/LiveAlertPanel";
import { MetricCard } from "@/components/platform/MetricCard";
import { VerificationQueueTable } from "@/components/platform/VerificationQueueTable";
import {
  COMPLETION_RATIO,
  HUMAN_ESCALATION,
  LIVE_ALERTS,
  PRIMARY_METRICS,
  SECONDARY_METRICS,
  SIDE_METRICS,
  VERIFICATION_QUEUE,
} from "@/lib/platform/dashboard";

export const metadata: Metadata = { title: "Dashboard" };

/*
 * Dashboard — Figma node 18045:1125 (light) / 18110:24716 (dark).
 *
 * The Top Metrics band is 1656 wide and splits 816 / 306 / 204 / 306 with 8px
 * gaps. Inside the 816 column the first row is five equal cards; the second
 * row is not equal — Figma gives the first two 130.67 and the last three
 * 174.22, which is exactly a 3:3:4:4:4 split of the same track. That is
 * reproduced with flex-grow weights rather than hard pixels so the proportions
 * survive at other widths.
 *
 * Below lg the bands stack, since the design has no narrow layout to copy.
 */
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      {/* Top Metrics */}
      <section aria-label="Key metrics" className="flex flex-col gap-2 xl:flex-row">
        <div className="flex flex-col gap-2 xl:w-[816px] xl:shrink-0">
          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-5">
            {PRIMARY_METRICS.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:flex lg:flex-row">
            {SECONDARY_METRICS.map((metric, index) => (
              <div
                key={metric.label}
                className="flex lg:min-w-px"
                style={{ flexGrow: index < 2 ? 3 : 4, flexBasis: 0 }}
              >
                <MetricCard metric={metric} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row xl:shrink-0">
          <div className="flex xl:w-[306px]">
            <DonutMetricCard metric={COMPLETION_RATIO} />
          </div>
          <div className="flex flex-col gap-2 xl:w-[204px]">
            {SIDE_METRICS.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
          <div className="flex xl:w-[306px]">
            <DonutMetricCard metric={HUMAN_ESCALATION} />
          </div>
        </div>
      </section>

      {/* Lower content */}
      <div className="flex flex-col gap-2 xl:flex-row">
        <section
          aria-label="Verification queue"
          className="flex min-w-px flex-1 flex-col gap-4 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
        >
          <div className="flex items-center gap-4">
            <h2 className="min-w-px flex-1 text-heading-m text-app-text-brand1">
              Verification Queue Table
            </h2>
            <FilterField label="" placeholder="Search By" className="w-30" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
              <FilterField label="Search" placeholder="Search by keywords..." variant="search" />
              <FilterField label="File#" placeholder="Type here..." variant="text" />
              <FilterField label="Applicant" placeholder="Select an option..." />
              <FilterField label="Property" placeholder="Select an option..." />
              <FilterField label="Client" placeholder="Select an option..." />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
              <FilterField label="Assigned Team" placeholder="Select an option..." />
              <FilterField label="Verification Type" placeholder="Select an option..." />
              <FilterField label="Status" placeholder="Select an option..." />
              <FilterField label="Date Created" placeholder="Select Date Range--" />
              <FilterField label="Last Action Date" placeholder="Select Date Range--" />
            </div>
          </div>

          <VerificationQueueTable rows={VERIFICATION_QUEUE} />
        </section>

        <LiveAlertPanel alerts={LIVE_ALERTS} />
      </div>
    </div>
  );
}
