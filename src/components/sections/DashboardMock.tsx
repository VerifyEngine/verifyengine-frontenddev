"use client";

import { motion } from "motion/react";
import {
  IconBell,
  IconBuildingSkyscraper,
  IconChartDots3,
  IconFileAnalytics,
  IconFileDollar,
  IconFileReport,
  IconHeadset,
  IconRefreshDot,
  IconSearch,
  IconSquareRoundedPlus,
  IconTablePlus,
  IconUserDollar,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { ShieldMark } from "@/components/layout/Logo";

/*
 * The product screenshot the marketing pages show, rebuilt 2026-08-21 to read
 * as the signed-in platform (Milestones 5-6) rather than a generic app window.
 *
 * The platform's visual signature is structural: a full-width Top Nav panel
 * above a separate Side Menu panel and content, each a mint-hairline glass
 * panel floating on the canvas with 8px gaps. That is reproduced here from
 * Figma node 18045:1125 (Dashboard, Light Mode), along with the metric band
 * and the navy-headed queue table.
 *
 * It uses the platform's own tokens (the `app-` Tailwind utilities from
 * src/styles/platform.css, already global via globals.css), Satoshi, and the
 * Tabler icon set. `data-ve-theme="light"` sits on this component's own
 * wrapper rather than <html>, so those tokens resolve without the platform's
 * ThemeScript or session: this is a static marketing snapshot, and stays a
 * site-only component (nothing is imported from src/components/platform).
 */
export type DashboardVariant = "verifications" | "analytics" | "industries";

/** Mirrors the real Side Menu's sections (Figma node 18105:4682). */
const navSections = [
  {
    heading: "Workspace",
    items: [
      { label: "Dashboard", icon: IconChartDots3, key: "dashboard" },
      { label: "Analytics", icon: IconFileAnalytics, key: "analytics" },
    ],
  },
  {
    heading: "Order",
    items: [
      { label: "New Order", icon: IconSquareRoundedPlus, key: "new-order" },
      { label: "Batch Order", icon: IconTablePlus, key: "batch-order" },
    ],
  },
  {
    heading: "Admin",
    items: [
      { label: "Clients", icon: IconUserDollar, key: "clients" },
      { label: "Company", icon: IconBuildingSkyscraper, key: "company" },
    ],
  },
  {
    heading: "Utilities",
    items: [
      { label: "Billing Summary", icon: IconFileDollar, key: "billing" },
      { label: "Report Creator", icon: IconFileReport, key: "reports" },
    ],
  },
];

/** Which nav row reads as current, per view. */
const activeKeyByVariant: Record<DashboardVariant, string> = {
  verifications: "dashboard",
  analytics: "analytics",
  industries: "reports",
};

type Status = "Verified" | "In Progress" | "Escalated" | "Pending";

type Row = {
  file: string;
  applicant: string;
  property: string;
  team: string;
  status: Status;
};

const allRows: Row[] = [
  { file: "#415773", applicant: "Lorri Warf", property: "Rainbow Bay Crafts", team: "Team A", status: "Pending" },
  { file: "#299269", applicant: "John Dukes", property: "Electronic Geek", team: "Team C", status: "In Progress" },
  { file: "#824966", applicant: "Daniel Hamilton", property: "Terri's Stationers", team: "Team B", status: "Escalated" },
  { file: "#879088", applicant: "Frances Swann", property: "Auto Works", team: "Team C", status: "Verified" },
  { file: "#369691", applicant: "Ricky Smith", property: "Britches of Georgetown", team: "Team A", status: "Verified" },
];

const filters = ["All", "In Progress", "Escalated", "Verified"] as const;

// Mirrors the STATUS_STYLES tone mapping in components/platform/StatusChip.tsx.
const statusTone: Record<Status, string> = {
  Verified: "bg-app-success text-app-text-inverse",
  "In Progress": "bg-app-neutral text-app-text-inverse",
  Escalated: "bg-app-highlight text-app-text",
  Pending: "bg-app-accent text-app-text-inverse",
};

export function DashboardMock({ variant = "verifications" }: { variant?: DashboardVariant }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const rows = filter === "All" ? allRows : allRows.filter((r) => r.status === filter);

  return (
    <div data-ve-theme="light" className="font-app relative">
      <div className="flex flex-col gap-2 overflow-hidden rounded-app-xl bg-[var(--ve-canvas)] p-2 shadow-2xl ring-1 ring-slate-900/5">
        <TopNav />

        <div className="flex gap-2">
          <SideMenu activeKey={activeKeyByVariant[variant]} />

          <div className="flex min-w-px flex-1 flex-col gap-2">
            {variant === "analytics" ? (
              <AnalyticsBody />
            ) : variant === "industries" ? (
              <IndustriesBody />
            ) : (
              <>
                <MetricBand />
                <section className="flex flex-col gap-3 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-label-xs text-app-text-brand1">Verification Queue Table</h3>
                    <div className="flex gap-3 overflow-x-auto">
                      {filters.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFilter(f)}
                          className={`relative cursor-pointer pb-1 text-body-2xs whitespace-nowrap transition-colors ${
                            filter === f
                              ? "text-app-text-brand1"
                              : "text-app-text-tertiary hover:text-app-text"
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

                  <QueueTable rows={rows} />
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Full-width Top Nav panel, as the platform draws it (Figma node 18105:4628). */
function TopNav() {
  return (
    <div className="flex items-center gap-2 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-2 backdrop-blur-[12px]">
      <span className="flex shrink-0 items-center gap-1.5 px-2">
        <ShieldMark className="size-5" />
        <span className="text-label-xs whitespace-nowrap text-app-text">
          <span className="text-app-text-brand1">Verify</span>Engine
        </span>
      </span>

      <span className="flex min-w-px flex-1 items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-48 px-3 py-2">
        <IconSearch size={15} stroke={1.6} className="shrink-0 text-app-text" aria-hidden />
        <span className="min-w-px flex-1 truncate text-body-2xs text-app-text-tertiary">
          Search by keywords...
        </span>
        <IconX size={12} stroke={1.6} className="shrink-0 text-app-text" aria-hidden />
      </span>

      <span className="hidden shrink-0 items-center gap-1 sm:flex">
        {[IconHeadset, IconBell].map((Icon, i) => (
          <span
            key={i}
            className="flex size-8 items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 text-app-text"
          >
            <Icon size={15} stroke={1.6} aria-hidden />
          </span>
        ))}
        <span className="flex items-center gap-1.5 rounded-app-7xl border-w-2xs border-app-line bg-app-brand2-40 py-1.5 pr-3 pl-2">
          <IconRefreshDot size={15} stroke={1.6} className="shrink-0 text-app-text" aria-hidden />
          <span className="hidden xl:block">
            <span className="block text-body-2xs whitespace-nowrap text-app-text">
              CutRite Lawn Care
            </span>
            <span className="block text-body-2xs whitespace-nowrap text-app-text-secondary">
              Switch Organization
            </span>
          </span>
        </span>
        <span className="size-8 shrink-0 rounded-app-12xl border-w-2xs border-app-line bg-gradient-to-br from-app-brand2-64 to-app-brand1" />
      </span>
    </div>
  );
}

/** Side Menu panel — grouped rows under uppercase section headings. */
function SideMenu({ activeKey }: { activeKey: string }) {
  return (
    <nav className="hidden w-44 shrink-0 flex-col gap-3 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 px-2 py-3 backdrop-blur-[12px] lg:flex">
      {navSections.map((section) => (
        <div key={section.heading} className="flex flex-col gap-1">
          <p className="px-2 text-nav-heading text-app-text">{section.heading}</p>
          <div className="flex flex-col overflow-hidden rounded-app-l border-w-2xs border-app-line">
            {section.items.map((item) => (
              <span
                key={item.key}
                className={`flex items-center gap-2 border-w-2xs border-app-line px-2.5 py-2 ${
                  item.key === activeKey
                    ? "bg-app-brand1-16 text-app-nav-active"
                    : "bg-app-fade-48 text-app-text"
                }`}
              >
                <item.icon size={15} stroke={1.6} className="shrink-0" aria-hidden />
                <span className="truncate text-body-2xs">{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

/** Glass stat tile, matching components/platform/MetricCard.tsx. */
function MetricCard({
  label,
  value,
  unit,
  delta,
  down,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  down?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-1.5 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3 backdrop-blur-[12px]">
      <p className="truncate text-body-2xs text-app-text-secondary">{label}</p>
      <p className="flex items-end gap-1">
        <span className="text-heading-s whitespace-nowrap text-app-text-brand1">{value}</span>
        {unit ? <span className="pb-0.5 text-body-2xs text-app-text-secondary">{unit}</span> : null}
        {delta ? (
          <span
            className={`pb-0.5 text-body-2xs whitespace-nowrap ${
              down ? "text-app-warning" : "text-app-success"
            }`}
          >
            {delta}
          </span>
        ) : null}
      </p>
    </div>
  );
}

function MetricBand() {
  const metrics = [
    { label: "Pending Verification", value: "1,248", delta: "+6.4%" },
    { label: "In Progress", value: "781", delta: "+8.4%" },
    { label: "Verified", value: "6,210", delta: "+6.4%" },
    { label: "Escalated", value: "123", delta: "-8.4%", down: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}

/** Queue table with the navy header the platform uses (Figma node 18108:4952). */
function QueueTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-app-l">
      <div className="flex items-center gap-3 bg-app-brand1 px-3 py-2">
        <span className="w-16 shrink-0 text-table-heading text-app-text-inverse">File#</span>
        <span className="min-w-px flex-1 text-table-heading text-app-text-inverse">Applicant</span>
        <span className="hidden w-32 shrink-0 text-table-heading text-app-text-inverse md:block">
          Property
        </span>
        <span className="hidden w-16 shrink-0 text-table-heading text-app-text-inverse sm:block">
          Team
        </span>
        <span className="w-20 shrink-0 text-right text-table-heading text-app-text-inverse">
          Status
        </span>
      </div>

      {rows.map((row, i) => (
        <motion.div
          key={row.file}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: i * 0.05, ease: "easeOut" }}
          className="flex items-center gap-3 border-w-2xs border-app-line bg-app-fade-48 px-3 py-2.5"
        >
          <span className="w-16 shrink-0 truncate text-body-2xs text-app-text-secondary">
            {row.file}
          </span>
          <span className="min-w-px flex-1 truncate text-body-2xs text-app-text">
            {row.applicant}
          </span>
          <span className="hidden w-32 shrink-0 truncate text-body-2xs text-app-text-secondary md:block">
            {row.property}
          </span>
          <span className="hidden w-16 shrink-0 text-body-2xs text-app-text-secondary sm:block">
            {row.team}
          </span>
          <span className="flex w-20 shrink-0 justify-end">
            <span
              className={`rounded-app-4xl px-2 py-1 text-center text-body-2xs whitespace-nowrap ${statusTone[row.status]}`}
            >
              {row.status}
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const analyticsStats = [
  { label: "Total Verifications", value: "2,456", delta: "+12.5%" },
  { label: "Completed", value: "1,892", delta: "+15.3%" },
  { label: "In Progress", value: "385", delta: "+2.1%" },
  { label: "Escalated", value: "179", delta: "-3.7%", down: true },
];

function AnalyticsBody() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {analyticsStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </div>
      <section className="rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]">
        <h3 className="text-label-xs text-app-text-brand1">Verification Activity</h3>
        <ActivityChart />
      </section>
    </>
  );
}

const chartPoints = [300, 420, 390, 560, 520];

function ActivityChart() {
  const w = 460;
  const h = 150;
  const padX = 12;
  const maxY = 600;
  const x = (i: number) => padX + (i / (chartPoints.length - 1)) * (w - padX * 2);
  const y = (v: number) => 16 + (1 - v / maxY) * (h - 40);
  const linePath = chartPoints.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const areaPath = `${linePath} L${x(chartPoints.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  return (
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
        <circle
          key={i}
          cx={x(i)}
          cy={y(v)}
          r="3.5"
          fill="var(--ve-surface-default)"
          stroke="var(--ve-surface-brand1)"
          strokeWidth="2"
        />
      ))}
    </svg>
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
  { label: "Avg. Completion", value: "6.2", unit: "min", delta: "-18%", down: true },
];

function IndustriesBody() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {industryStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </div>
      <section className="rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]">
        <h3 className="text-label-xs text-app-text-brand1">Verifications by Industry</h3>
        <ul className="mt-3 flex flex-col gap-3">
          {byIndustry.map((row) => (
            <li key={row.name} className="flex items-center gap-3">
              <span className="w-36 shrink-0 truncate text-body-2xs text-app-text-secondary">
                {row.name}
              </span>
              <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-app-4xl bg-app-fade-48">
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
      </section>
    </>
  );
}
