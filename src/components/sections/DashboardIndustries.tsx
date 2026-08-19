"use client";

import { motion, useInView } from "motion/react";
import { ArrowDownRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useRef } from "react";

const stats = [
  { label: "Total Verifications", value: "2.4M+", delta: "+28%", up: true },
  { label: "Approval Rate", value: "92.3%", delta: "+6%", up: true },
  { label: "Avg. Completion Time", value: "6.2 min", delta: "-18%", up: false },
  { label: "Fraud Detected", value: "14,820", delta: "+31%", up: true },
];

const byIndustry = [
  { name: "Landlord Verification", volume: "1.2M+", share: 48 },
  { name: "Employment Verification", volume: "520K+", share: 21 },
  { name: "Financial Services", volume: "380K+", share: 16 },
  { name: "Healthcare Verification", volume: "210K+", share: 9 },
  { name: "Education Verification", volume: "90K+", share: 4 },
];

/** Industry-mix view of the product mock, used on the Industries Overview hero. */
export function IndustriesBody() {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-base font-bold text-ink-900 sm:text-lg">Industries Overview</p>
        <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500">
          All Industries <ChevronDown className="size-3.5" strokeWidth={2} />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-100 p-3.5">
            <p className="text-xs text-slate-400">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-ink-900">{stat.value}</p>
            <p
              className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${
                stat.up ? "text-teal-600" : "text-rose-500"
              }`}
            >
              {stat.up ? (
                <ArrowUpRight className="size-3" strokeWidth={2.5} />
              ) : (
                <ArrowDownRight className="size-3" strokeWidth={2.5} />
              )}
              {stat.delta}
              <span className="text-slate-400">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        <IndustryBars />
        <SuccessDonut />
      </div>
    </div>
  );
}

function IndustryBars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="rounded-xl border border-slate-100 p-4">
      <p className="text-sm font-bold text-ink-900">Verifications by Industry</p>
      <ul className="mt-4 space-y-3.5">
        {byIndustry.map((row, i) => (
          <li key={row.name} className="flex items-center gap-3">
            <span className="w-36 shrink-0 truncate text-xs text-slate-600">{row.name}</span>
            <span className="w-12 shrink-0 text-xs font-semibold text-ink-900">{row.volume}</span>
            <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
              <motion.span
                className="block h-full rounded-full bg-navy-800"
                initial={{ width: 0 }}
                animate={{ width: inView ? `${(row.share / 48) * 100}%` : 0 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
              />
            </span>
            <span className="w-8 shrink-0 text-right text-xs text-slate-400">{row.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SuccessDonut() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const rate = 92.3;
  const r = 46;
  const c = 2 * Math.PI * r;

  return (
    <div ref={ref} className="flex flex-col items-center rounded-xl border border-slate-100 p-4">
      <p className="self-start text-sm font-bold text-ink-900">Overall Success Rate</p>
      <div className="relative mt-3">
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
            animate={{ strokeDashoffset: inView ? c - (rate / 100) * c : c }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-ink-900">{rate}%</span>
          <span className="text-[10px] text-slate-400">Success</span>
        </div>
      </div>
    </div>
  );
}
