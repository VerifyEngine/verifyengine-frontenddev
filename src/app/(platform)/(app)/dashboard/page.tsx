import type { Metadata } from "next";
import { DonutMetricCard } from "@/components/platform/DonutMetricCard";
import { FilterField } from "@/components/platform/FilterField";
import { LiveAlertPanel } from "@/components/platform/LiveAlertPanel";
import { MetricCard } from "@/components/platform/MetricCard";
import { QueueFilters } from "@/components/platform/QueueFilters";
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
 * That band needs the full 1656 a 1920 screen leaves, so it applies from 3xl
 * (1912) only. Narrower, every group becomes a fluid grid: two columns on a
 * phone, three on a tablet, five from lg, with the donuts and side metrics on
 * their own row. The queue and Live Alert sit side by side only at 3xl.
 */

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      {/* Top Metrics */}
      <section aria-label="Key metrics" className="flex flex-col gap-2 3xl:flex-row">
        {/* Below 3xl both rows dissolve into one ten-card grid: two columns
            on a phone, five from md — full rows at every width. */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 3xl:flex 3xl:w-[816px] 3xl:shrink-0 3xl:flex-col">
          <div className="contents 3xl:grid 3xl:grid-cols-5 3xl:gap-2">
            {PRIMARY_METRICS.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
          <div className="contents 3xl:flex 3xl:flex-row 3xl:gap-2">
            {SECONDARY_METRICS.map((metric, index) => (
              <div
                key={metric.label}
                className="flex 3xl:min-w-px"
                style={{ flexGrow: index < 2 ? 3 : 4, flexBasis: 0 }}
              >
                <MetricCard metric={metric} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-[1fr_minmax(0,0.75fr)_1fr] 3xl:flex 3xl:shrink-0">
          <div className="flex 3xl:w-[306px]">
            <DonutMetricCard metric={COMPLETION_RATIO} />
          </div>
          <div className="grid grid-cols-2 gap-2 md:order-last md:col-span-2 lg:order-none lg:col-span-1 lg:grid-cols-1 3xl:flex 3xl:w-[204px] 3xl:flex-col">
            {SIDE_METRICS.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
          <div className="flex 3xl:w-[306px]">
            <DonutMetricCard metric={HUMAN_ESCALATION} />
          </div>
        </div>
      </section>

      {/* Lower content */}
      <div className="flex flex-col gap-2 3xl:flex-row">
        <section
          aria-label="Verification queue"
          className="flex min-w-px flex-1 flex-col gap-4 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
        >
          <div className="flex items-center gap-4">
            <h2 className="min-w-px flex-1 text-heading-s text-app-heading sm:text-heading-m">
              Verification Queue Table
            </h2>
            <FilterField label="" placeholder="Search By" className="w-30 shrink-0" />
          </div>

          <QueueFilters />

          <VerificationQueueTable rows={VERIFICATION_QUEUE} />
        </section>

        <LiveAlertPanel alerts={LIVE_ALERTS} />
      </div>
    </div>
  );
}
