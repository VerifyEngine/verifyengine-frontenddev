"use client";

import { motion, useInView } from "motion/react";
import {
  LayoutGrid,
  ShieldCheck,
  Users,
  FileBarChart2,
  Contact,
  CreditCard,
  Settings,
  Search,
  Bell,
  Eye,
  Building2,
} from "lucide-react";
import { useRef, useState } from "react";
import { ShieldMark } from "@/components/layout/Logo";
import { AnalyticsBody } from "./DashboardAnalytics";

/**
 * The two product views the marketing pages screenshot. Both share the same
 * app chrome (navy rail + top bar); only the sidebar's active item and the
 * body content differ, so the shell is written once here.
 */
export type DashboardVariant = "verifications" | "analytics";

const sidebarByVariant: Record<
  DashboardVariant,
  { icon: typeof LayoutGrid; label: string; active?: boolean }[]
> = {
  verifications: [
    { icon: LayoutGrid, label: "Dashboard" },
    { icon: ShieldCheck, label: "Verifications", active: true },
    { icon: Users, label: "Applicants" },
    { icon: FileBarChart2, label: "Reports" },
    { icon: Contact, label: "Clients" },
    { icon: CreditCard, label: "Billing" },
    { icon: Settings, label: "Settings" },
  ],
  analytics: [
    { icon: LayoutGrid, label: "Dashboard", active: true },
    { icon: ShieldCheck, label: "Verifications" },
    { icon: Users, label: "Applicants" },
    { icon: FileBarChart2, label: "Reports" },
    { icon: Building2, label: "Properties" },
    { icon: Contact, label: "Team" },
    { icon: Settings, label: "Settings" },
  ],
};

type Status = "Completed" | "In Progress" | "Under Review";

type Row = {
  applicant: string;
  type: string;
  source: string;
  status: Status;
  completion: number;
};

const allRows: Row[] = [
  { applicant: "John Smith", type: "Landlord", source: "Phone", status: "Completed", completion: 100 },
  { applicant: "Sarah Johnson", type: "Employment", source: "Phone", status: "Completed", completion: 100 },
  { applicant: "Michael Brown", type: "Income", source: "Phone", status: "Under Review", completion: 85 },
  { applicant: "Emily Davis", type: "Employment", source: "Email", status: "In Progress", completion: 60 },
  { applicant: "David Wilson", type: "Landlord", source: "Phone", status: "Completed", completion: 100 },
];

const filters = ["All", "In Progress", "Under Review", "Completed"] as const;

const statusTone: Record<Status, string> = {
  Completed: "bg-mint-100 text-teal-700",
  "In Progress": "bg-amber-50 text-amber-700",
  "Under Review": "bg-sky-50 text-sky-700",
};

/**
 * Reusable "product screenshot" mock — layered navy sidebar, top bar, and one
 * of two body views. Interactive on purpose (the verifications tabs really
 * filter; the analytics chart has a working hover readout) rather than being a
 * flat static image, matching the polish set by the homepage hero mock.
 */
export function DashboardMock({ variant = "verifications" }: { variant?: DashboardVariant }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const rows = filter === "All" ? allRows : allRows.filter((r) => r.status === filter);
  const sidebarItems = sidebarByVariant[variant];

  return (
    <div className="relative">
      {/* The navy rail sits slightly taller than the white panel, giving the
          composition the same layered depth as the homepage hero mock. */}
      <div className="absolute top-3 bottom-3 left-0 hidden w-56 rounded-2xl bg-navy-900 shadow-2xl lg:block" />

      <div className="relative flex overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5 lg:ml-6 lg:rounded-l-none">
        {/* sidebar */}
        <div className="hidden w-50 shrink-0 flex-col bg-navy-900 px-4 py-6 lg:flex">
          <div className="flex items-center gap-2 px-2 pb-7">
            <ShieldMark className="size-6" />
            <span className="text-sm font-bold tracking-tight text-white">
              VERIFY <span className="text-mint-200">ENGINE</span>
            </span>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  item.active ? "bg-white/10 text-white" : "text-white/55"
                }`}
              >
                <item.icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        <div className="min-w-0 flex-1">
          {/* top bar */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-3.5">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Building2 className="size-4 text-slate-400" strokeWidth={1.75} />
              Northgate Residential
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-lg bg-bg-muted px-3 py-1.5 text-xs text-slate-400 sm:flex">
                <Search className="size-3.5" /> Search...
              </div>
              <Bell className="size-4 text-slate-400" strokeWidth={1.75} />
              <div className="flex size-8 items-center justify-center rounded-full bg-navy-900 text-[11px] font-bold text-white">
                JS
              </div>
            </div>
          </div>

          {variant === "analytics" ? (
            <AnalyticsBody />
          ) : (
          <div className="flex flex-col gap-5 p-4 sm:p-5 xl:flex-row">
            {/* table */}
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-ink-900 sm:text-lg">Verifications</p>

              {/* Tabs scroll sideways on narrow screens rather than wrapping. */}
              <div className="mt-3 flex gap-5 overflow-x-auto border-b border-slate-100">
                {filters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`relative -mb-px cursor-pointer pb-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                      filter === f ? "text-teal-600" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {f}
                    {filter === f && (
                      <motion.span
                        layoutId="dashboard-tab"
                        className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-teal-500"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="mt-1 w-full min-w-[280px] text-left text-sm">
                <thead>
                  <tr className="text-slate-400">
                    <th className="py-3 pr-4 font-medium">Applicant</th>
                    <th className="hidden py-3 pr-4 font-medium sm:table-cell">Type</th>
                    <th className="hidden py-3 pr-4 font-medium md:table-cell">Source</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="hidden py-3 pr-4 font-medium sm:table-cell">Completion</th>
                    <th className="py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <motion.tr
                      key={row.applicant}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: i * 0.05, ease: "easeOut" }}
                      className="border-t border-slate-50"
                    >
                      <td className="py-3.5 pr-4 font-semibold whitespace-nowrap text-ink-900">
                        {row.applicant}
                      </td>
                      <td className="hidden py-3.5 pr-4 whitespace-nowrap text-slate-500 sm:table-cell">
                        {row.type}
                      </td>
                      <td className="hidden py-3.5 pr-4 whitespace-nowrap text-slate-500 md:table-cell">
                        {row.source}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`rounded-md px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${statusTone[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="hidden py-3.5 pr-4 whitespace-nowrap text-slate-500 sm:table-cell">
                        {row.completion}%
                      </td>
                      <td className="py-3.5">
                        <Eye className="size-4 text-slate-300" strokeWidth={1.75} />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>

            {/* summary panel */}
            <SummaryPanel />
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const successRate = 92.3;
  const r = 46;
  const c = 2 * Math.PI * r;

  return (
    <div
      ref={ref}
      className="w-full shrink-0 self-start rounded-xl bg-white p-5 ring-1 ring-slate-900/5 xl:w-56"
    >
      <p className="text-sm font-semibold text-ink-900">Verification Summary</p>

      <div className="mt-4 flex justify-center">
        <div className="relative">
          <svg viewBox="0 0 112 112" className="size-32 -rotate-90">
            <circle cx="56" cy="56" r={r} fill="none" stroke="#EEF2F6" strokeWidth="11" />
            <motion.circle
              cx="56"
              cy="56"
              r={r}
              fill="none"
              stroke="var(--color-teal-500)"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: inView ? c - (successRate / 100) * c : c }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-ink-900">{successRate}%</span>
            <span className="text-[10px] text-slate-400">Success Rate</span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {[
          { label: "Total Verifications", value: "2.4M+" },
          { label: "Completed Today", value: "1,320" },
          { label: "Avg Completion Time", value: "6.2 min" },
        ].map((stat) => (
          <div key={stat.label} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
            <p className="text-xs text-slate-400">{stat.label}</p>
            <p className="mt-0.5 text-base font-bold text-ink-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
