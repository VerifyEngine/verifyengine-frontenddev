import type { Metadata } from "next";
import { AreaLineChart } from "@/components/platform/charts/AreaLineChart";
import {
  ColumnChart,
  GroupedBarChart,
  StackedBarChart,
} from "@/components/platform/charts/BarCharts";
import { ChartCard } from "@/components/platform/charts/ChartCard";
import { DonutChart } from "@/components/platform/charts/DonutChart";
import { FunnelChart } from "@/components/platform/charts/FunnelChart";
import { PieChart } from "@/components/platform/charts/PieChart";
import { RadarChart } from "@/components/platform/charts/RadarChart";
import { RingProgressChart } from "@/components/platform/charts/RingProgressChart";
import { StateActivityMap } from "@/components/platform/charts/StateActivityMap";
import { TopClientsTable } from "@/components/platform/charts/TopClientsTable";
import { FilterField } from "@/components/platform/FilterField";
import { PageHeader } from "@/components/platform/PageHeader";
import {
  BILLING_SERIES,
  BREAKDOWN_TOTAL,
  CHANNEL_BREAKDOWN,
  CHANNEL_LEGEND,
  CLIENT_RISK_LEGEND,
  CLIENT_RISK_RADAR,
  COMPLIANCE_LEGEND,
  COMPLIANCE_RINGS,
  ESCALATION_LEGEND,
  ESCALATION_RADAR,
  FRAUD_BREAKDOWN,
  FRAUD_LEGEND,
  FUNNEL_TOTAL,
  MONTHLY_VOLUME,
  MONTH_LABELS,
  MONTH_LABELS_UPPER,
  OPERATIONAL_WORKLOAD,
  OUTREACH_SERIES,
  OVERRIDE_FILTERS,
  OVERRIDE_SERIES,
  QUEUE_DISTRIBUTION,
  QUEUE_TOTAL,
  SLA_RISK,
  SLA_SCOPES,
  SLA_SERIES,
  STATE_COUNTS,
  STATE_METRICS,
  SYSTEM_FAILURE_SERIES,
  TOP_CLIENTS,
  TOP_STATES,
  VERIFICATION_FUNNEL,
  VOLUME_SERIES,
  WORKLOAD_SERIES,
  formatDollars,
  formatMillions,
  formatThousands,
} from "@/lib/platform/reports";

export const metadata: Metadata = { title: "Reports" };

const REPORT_FILTERS = ["Date Range", "Client", "Status", "Verification", "Order", "Vendor"] as const;

/*
 * Reports — Figma node 18176:36360.
 *
 * A row of six filters, then an analytics page of ten chart blocks down a 1656
 * column, each block one or two cards. The charts are written as SVG and CSS
 * in this project rather than pulled from a charting library, following the
 * technique the dashboard's donut and the order screen's gauge and radar
 * already use. The one drawn asset is the United States outline, exported from
 * the design file.
 *
 * Below xl every two-card block stacks, and the filters fold into two and then
 * three columns, since the design has no narrower frame to follow.
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

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {REPORT_FILTERS.map((label) => (
          <FilterField key={label} label={label} placeholder="Select an option..." surface="solid" />
        ))}
      </div>

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

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1fr_1.33fr]">
        <ChartCard title="Queue Status Distribution" showRange={false}>
          <PieChart
            slices={QUEUE_DISTRIBUTION}
            totalLabel="Total"
            total={QUEUE_TOTAL}
          />
        </ChartCard>

        <ChartCard title="Operational Workload" series={WORKLOAD_SERIES} defaultRange="Yearly">
          <GroupedBarChart
            rows={OPERATIONAL_WORKLOAD}
            series={WORKLOAD_SERIES}
            max={100000}
            format={formatDollars}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-[2fr_1fr]">
        <ChartCard
          title="SLA Risk Monitor"
          series={SLA_SERIES}
          defaultRange="Yearly"
          scopes={SLA_SCOPES}
          defaultScope="Region"
        >
          <ColumnChart
            rows={SLA_RISK}
            series={SLA_SERIES}
            max={550000}
            format={formatThousands}
          />
        </ChartCard>

        <ChartCard title="Escalation Radar" series={ESCALATION_LEGEND} showRange={false}>
          <div className="flex items-center justify-center px-5 pb-5">
            <RadarChart points={ESCALATION_RADAR} max={7000} rings={5} showPointValues />
          </div>
        </ChartCard>
      </div>

      <ChartCard title="AI Outreach Performance" series={OUTREACH_SERIES} legendGapClass="gap-x-8 gap-y-3">
        <AreaLineChart
          series={OUTREACH_SERIES}
          labels={MONTH_LABELS}
          max={5}
          formatY={formatMillions}
          heightClass="h-96"
          axisWidthClass="w-6"
          strokeWidth={2}
          grid
          marker={{ seriesIndex: 0, at: 0.5, label: "203", labelAt: "bottom" }}
        />
      </ChartCard>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1fr_0.75fr]">
        <ChartCard
          title="Human Override Rate"
          footerToggle={{
            label: "Override type",
            options: OVERRIDE_FILTERS,
            defaultOption: "AI Review Escalated",
            wide: true,
          }}
        >
          <AreaLineChart
            series={OVERRIDE_SERIES}
            labels={MONTH_LABELS_UPPER}
            max={5000}
            formatY={formatThousands}
            heightClass="h-96"
            axisWidthClass="w-6"
            grid
            smooth
            marker={{ seriesIndex: 0, at: 0.52, label: "203", labelAt: "bottom" }}
          />
        </ChartCard>

        <ChartCard
          title="Client Risk Radar"
          series={CLIENT_RISK_LEGEND}
          showRange={false}
          titleAlign="center"
          legendGapClass="gap-5"
          legendDotClass="size-3"
        >
          <div className="flex h-full items-center justify-center p-7">
            <RadarChart
              points={CLIENT_RISK_RADAR}
              max={7000}
              rings={5}
              showRingScale
              showPointValues
              strokeClass="stroke-app-accent"
              fillClass="fill-app-accent/16"
              shapeOpacityClass=""
              labelClass="fill-app-text-secondary text-label-2xs"
            />
          </div>
        </ChartCard>
      </div>

      <ChartCard
        title="Verification Activity by State"
        toggle={{ label: "Map metric", options: STATE_METRICS, defaultOption: "Volume", wide: true }}
      >
        <StateActivityMap counts={STATE_COUNTS} ranking={TOP_STATES} />
      </ChartCard>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1fr_0.75fr]">
        <ChartCard title="Top Clients" className="self-start">
          <TopClientsTable rows={TOP_CLIENTS} />
        </ChartCard>

        <ChartCard
          title="Verification Breakdown"
          series={CHANNEL_LEGEND}
          showRange={false}
          legendPosition="header"
        >
          <DonutChart slices={CHANNEL_BREAKDOWN} totalLabel="Total:" total={BREAKDOWN_TOTAL} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
        <ChartCard
          title="Fraud Detection Breakdown"
          series={FRAUD_LEGEND}
          showRange={false}
          legendPosition="header"
        >
          <DonutChart slices={FRAUD_BREAKDOWN} totalLabel="Total:" total={BREAKDOWN_TOTAL} />
        </ChartCard>

        <ChartCard
          title="Compliance Completion"
          series={COMPLIANCE_LEGEND}
          showRange={false}
          titleAlign="center"
          legendGapClass="gap-x-8 gap-y-3"
          legendDotClass="size-3"
        >
          <RingProgressChart rings={COMPLIANCE_RINGS} />
        </ChartCard>
      </div>

      <ChartCard title="System Failure Monitoring" series={SYSTEM_FAILURE_SERIES} legendGapClass="gap-x-8 gap-y-3">
        <AreaLineChart
          series={SYSTEM_FAILURE_SERIES}
          labels={MONTH_LABELS}
          max={5}
          formatY={formatMillions}
          heightClass="h-96"
          axisWidthClass="w-6"
          strokeWidth={2}
          grid
          marker={{ seriesIndex: 0, at: 0.5, label: "203", labelAt: "bottom" }}
        />
      </ChartCard>
    </div>
  );
}
