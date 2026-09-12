import type { Metadata } from "next";
import { AreaLineChart } from "@/components/platform/charts/AreaLineChart";
import { GroupedBarChart, StackedBarChart } from "@/components/platform/charts/BarCharts";
import { ChartCard } from "@/components/platform/charts/ChartCard";
import { FunnelChart } from "@/components/platform/charts/FunnelChart";
import { PageHeader } from "@/components/platform/PageHeader";
import {
  BILLING_SERIES,
  FUNNEL_TOTAL,
  MONTHLY_VOLUME,
  MONTH_LABELS,
  OPERATIONAL_WORKLOAD,
  VERIFICATION_FUNNEL,
  VOLUME_SERIES,
  WORKLOAD_SERIES,
  formatDollars,
  formatThousands,
} from "@/lib/platform/reports";

export const metadata: Metadata = { title: "Reports" };

/*
 * Reports — Figma node 18176:36360.
 *
 * An analytics page of ten chart blocks down a 1656 column, each block one or
 * two cards. The charts are written as SVG and CSS in this project rather than
 * pulled from a charting library, following the technique the dashboard's donut
 * and the order screen's gauge and radar already use.
 *
 * Blocks one and two are in place; the remaining eight — two more bar blocks, a
 * column block, three line blocks, a pie block and the United States map — are
 * still to come, and the map needs its outline exported from the design file
 * before it can be drawn at all.
 */
export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Reports"
        description="Verification volume, workload and billing across your organisation"
        utilities={[
          { label: "Refresh", icon: "refresh" },
          { label: "Download PDF", icon: "download" },
        ]}
      />

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.33fr_1fr]">
        <ChartCard title="Monthly Volume" series={VOLUME_SERIES}>
          <StackedBarChart
            rows={MONTHLY_VOLUME}
            series={VOLUME_SERIES}
            max={400000}
            format={formatThousands}
          />
        </ChartCard>

        <ChartCard title="Billing Usage" series={BILLING_SERIES}>
          <AreaLineChart
            series={BILLING_SERIES}
            labels={MONTH_LABELS}
            max={100}
            formatY={(value) => `${Math.round(value)}u`}
            marker={{ seriesIndex: 0, pointIndex: 12, label: "203" }}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-[2fr_1fr]">
        <ChartCard title="Operational Workload" series={WORKLOAD_SERIES} defaultRange="Yearly">
          <GroupedBarChart
            rows={OPERATIONAL_WORKLOAD}
            series={WORKLOAD_SERIES}
            max={100000}
            format={formatDollars}
          />
        </ChartCard>

        <ChartCard title="Verification Funnel" showRange={false}>
          <FunnelChart
            stages={VERIFICATION_FUNNEL}
            totalLabel="Total"
            total={FUNNEL_TOTAL}
          />
        </ChartCard>
      </div>
    </div>
  );
}
