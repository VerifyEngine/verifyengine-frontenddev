"use client";

import { motion } from "motion/react";
import {
  IconBell,
  IconBuildingSkyscraper,
  IconChartDots3,
  IconFileAnalytics,
  IconFileDollar,
  IconFileReport,
  IconSearch,
  IconTools,
  IconUserDollar,
} from "@tabler/icons-react";
import { useState } from "react";

/*
 * The two product views the marketing pages screenshot. Both share the same
 * app chrome (Side Menu rail + Top Nav); only the sidebar's active item and
 * the body content differ, so the shell is written once here.
 *
 * Restyled 2026-08-21 to actually look like the signed-in platform (Milestones
 * 5-6) instead of an unrelated generic SaaS mock: same design tokens (the
 * `app-` Tailwind utilities from src/styles/platform.css, already global via
 * globals.css), same Satoshi font, same Tabler icon set and glass-panel
 * chrome as the real Top Nav / Side Menu / MetricCard / VerificationQueueTable.
 * `data-ve-theme="light"` is set on the wrapper (not <html>) so those tokens
 * resolve here without needing the platform's ThemeScript/session — this is a
 * static marketing snapshot, not the real app, and stays a site-only
 * component (no import from src/components/platform).
 */
export type DashboardVariant = "verifications" | "analytics" | "industries";

const sidebarByVariant: Record<
  DashboardVariant,
  { icon: typeof IconChartDots3; label: string; active?: boolean }[]
> = {
  verifications: [
    { icon: IconChartDots3, label: "Dashboard" },
    { icon: IconFileAnalytics, label: "Verifications", active: true },
    { icon: IconUserDollar, label: "Clients" },
    { icon: IconFileReport, label: "Reports" },
    { icon: IconFileDollar, label: "Billing" },
    { icon: IconTools, label: "Settings" },
  ],
  analytics: [
    { icon: IconChartDots3, label: "Dashboard", active: true },
    { icon: IconFileAnalytics, label: "Verifications" },
    { icon: IconUserDollar, label: "Clients" },
    { icon: IconFileReport, label: "Reports" },
    { icon: IconFileDollar, label: "Billing" },
    { icon: IconTools, label: "Settings" },
  ],
  industries: [
    { icon: IconBuildingSkyscraper, label: "Industries", active: true },
    { icon: IconChartDots3, label: "Dashboard" },
    { icon: IconUserDollar, label: "Clients" },
    { icon: IconFileReport, label: "Reports" },
    { icon: IconFileDollar, label: "Billing" },
    { icon: IconTools, label: "Settings" },
  ],
};

type Status = "Verified" | "In Progress" | "Escalated";

type Row = {
  file: string;
  applicant: string;
  type: string;
  status: Status;
};

const allRows: Row[] = [
  { file: "#4821", applicant: "John Smith", type: "Landlord", status: "Verified" },
  { file: "#4822", applicant: "Sarah Johnson", type: "Employment", status: "Verified" },
  { file: "#4823", applicant: "Michael Brown", type: "Income", status: "Escalated" },
  { file: "#4824", applicant: "Emily Davis", type: "Employment", status: "In Progress" },
  { file: "#4825", applicant: "David Wilson", type: "Landlord", status: "Verified" },
];

const filters = ["All", "In Progress", "Escalated", "Verified"] as const;

// Mirrors the STATUS_STYLES tone mapping in components/platform/StatusChip.tsx.
const statusTone: Record<Status, string> = {
  Verified: "bg-app-success text-app-text-inverse",
  "In Progress": "bg-app-neutral text-app-text-inverse",
  Escalated: "bg-app-highlight text-app-text",
};

/**
 * Reusable "product screenshot" mock — Side Menu rail, Top Nav, and one of
 * three body views. Interactive on purpose (the filter tabs really filter)
 * rather than a flat static image, matching the polish of the homepage hero.
 */
export function DashboardMock({ variant = "verifications" }: { variant?: DashboardVariant }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const rows = filter === "All" ? allRows : allRows.filter((r) => r.status === filter);
  const sidebarItems = sidebarByVariant[variant];

  return (
    <div data-ve-theme="light" className="font-app relative">
      {/* The Side Menu rail sits slightly taller than the panel, giving the
          composition the same layered depth as the real app shell. */}
      <div className="absolute top-3 bottom-3 left-0 hidden w-52 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 backdrop-blur-[12px] lg:block" />

      <div className="relative flex overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-surface shadow-2xl lg:ml-6 lg:rounded-l-none">
        {/* Side Menu */}
        <div className="hidden w-48 shrink-0 flex-col gap-1 p-3 lg:flex">
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-app-m px-3 py-2.5 text-label-2xs ${
                item.active ? "bg-app-brand1-16 text-app-nav-active" : "text-app-text-secondary"
              }`}
            >
              <item.icon size={18} stroke={1.6} aria-hidden />
              {item.label}
            </div>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* Top Nav */}
          <div className="flex items-center justify-between gap-4 border-b border-app-line px-5 py-3.5">
            <div className="flex items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-40 px-3 py-1.5 text-body-2xs text-app-text-tertiary">
              <IconSearch size={14} stroke={1.6} aria-hidden />
              Search...
            </div>
            <div className="flex items-center gap-3">
              <IconBell size={18} stroke={1.6} className="text-app-text-secondary" aria-hidden />
              <div className="flex size-8 items-center justify-center rounded-app-12xl bg-app-brand1 text-body-2xs font-bold text-app-text-inverse">
                JS
              </div>
            </div>
          </div>

          {variant === "analytics" ? (
            <AnalyticsBody />
          ) : variant === "industries" ? (
            <IndustriesBody />
          ) : (
            <div className="flex flex-col gap-4 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-heading-s text-app-text-brand1">Verification Queue</p>
                <div className="flex gap-4 overflow-x-auto">
                  {filters.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`relative cursor-pointer pb-1 text-label-2xs whitespace-nowrap transition-colors ${
                        filter === f ? "text-app-text-brand1" : "text-app-text-tertiary hover:text-app-text"
                      }`}
                    >
                      {f}
                      {filter === f && (
                        <motion.span
                          layoutId="dashboard-mock-tab"
                          className="absolute inset-x-0 -bottom-px h-0.5 rounded-app-12xl bg-app-brand1"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-app-l">
                <div className="flex items-center gap-4 bg-app-brand1 px-4 py-2">
                  <span className="w-14 shrink-0 text-table-heading text-app-text-inverse">File#</span>
                  <span className="min-w-px flex-1 text-table-heading text-app-text-inverse">
                    Applicant
                  </span>
                  <span className="hidden w-24 shrink-0 text-table-heading text-app-text-inverse sm:block">
                    Type
                  </span>
                  <span className="w-24 shrink-0 text-right text-table-heading text-app-text-inverse">
                    Status
                  </span>
                </div>

                {rows.map((row, i) => (
                  <motion.div
                    key={row.file}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: i * 0.05, ease: "easeOut" }}
                    className="flex items-center gap-4 border-w-2xs border-app-line bg-app-fade-40 px-4 py-3"
                  >
                    <span className="w-14 shrink-0 text-body-2xs text-app-text-secondary">
                      {row.file}
                    </span>
                    <span className="min-w-px flex-1 truncate text-body-2xs text-app-text">
                      {row.applicant}
                    </span>
                    <span className="hidden w-24 shrink-0 text-body-2xs text-app-text-secondary sm:block">
                      {row.type}
                    </span>
                    <span className="flex w-24 shrink-0 justify-end">
                      <span
                        className={`rounded-app-4xl px-2 py-1 text-center text-body-2xs whitespace-nowrap ${statusTone[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Stat tile matching components/platform/MetricCard.tsx's glass treatment. */
function MockMetricCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="flex flex-1 flex-col justify-between gap-2 rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3 backdrop-blur-[12px]">
      <p className="text-label-2xs text-app-text-secondary">{label}</p>
      <div className="flex items-end gap-1">
        <p className="text-heading-s text-app-text-brand1">{value}</p>
        {delta ? <span className="pb-0.5 text-body-2xs text-app-success">{delta}</span> : null}
      </div>
    </div>
  );
}

const analyticsStats = [
  { label: "Total Verifications", value: "2,456", delta: "+12.5%" },
  { label: "Completed", value: "1,892", delta: "+15.3%" },
  { label: "In Progress", value: "385" },
  { label: "Escalated", value: "179" },
];

function AnalyticsBody() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5">
      <p className="text-heading-s text-app-text-brand1">Dashboard</p>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {analyticsStats.map((stat) => (
          <MockMetricCard key={stat.label} {...stat} />
        ))}
      </div>
      <ActivityChart />
    </div>
  );
}

const chartPoints = [300, 420, 390, 560, 520];

function ActivityChart() {
  const w = 460;
  const h = 160;
  const padX = 12;
  const maxY = 600;
  const x = (i: number) => padX + (i / (chartPoints.length - 1)) * (w - padX * 2);
  const y = (v: number) => 16 + (1 - v / maxY) * (h - 40);
  const linePath = chartPoints.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const areaPath = `${linePath} L${x(chartPoints.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  return (
    <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]">
      <p className="text-label-xs text-app-text-brand1">Verification Activity</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 w-full" aria-hidden>
        <path d={areaPath} fill="var(--ve-surface-brand2-40)" />
        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--ve-surface-brand1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        {chartPoints.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="var(--ve-surface-default)" stroke="var(--ve-surface-brand1)" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
}

const byIndustry = [
  { name: "Landlord Verification", share: 48 },
  { name: "Employment Verification", share: 21 },
  { name: "Financial Services", share: 16 },
  { name: "Healthcare Verification", share: 9 },
];

const industryStats = [
  { label: "Total Verifications", value: "2.4M+", delta: "+28%" },
  { label: "Approval Rate", value: "92.3%", delta: "+6%" },
];

function IndustriesBody() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5">
      <p className="text-heading-s text-app-text-brand1">Industries Overview</p>
      <div className="grid grid-cols-2 gap-2">
        {industryStats.map((stat) => (
          <MockMetricCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]">
        <p className="text-label-xs text-app-text-brand1">Verifications by Industry</p>
        <ul className="mt-3 flex flex-col gap-3">
          {byIndustry.map((row) => (
            <li key={row.name} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-body-2xs text-app-text-secondary">
                {row.name}
              </span>
              <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-app-4xl bg-app-fade-40">
                <motion.span
                  className="block h-full rounded-app-4xl bg-app-brand1"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(row.share / 48) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-body-2xs text-app-text-tertiary">
                {row.share}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
