"use client";

import { motion, useInView } from "motion/react";
import {
  Download,
  Briefcase,
  Wallet,
  Home,
  Fingerprint,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";

const checks = [
  { icon: Briefcase, label: "Employment", result: "Verified" },
  { icon: Wallet, label: "Income", result: "Verified" },
  { icon: Home, label: "Rental History", result: "Verified" },
  { icon: Fingerprint, label: "Identity", result: "Verified" },
  { icon: ShieldCheck, label: "Fraud Check", result: "Clear" },
];

const meta = [
  { label: "Decision", value: "Approve", pill: true },
  { label: "Confidence", value: "High" },
  { label: "Completed", value: "May 20, 2024" },
  { label: "Time to Complete", value: "8 min" },
];

/** The sample verification report shown in the Landlord Verification hero. */
export function ApplicantOverviewCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <p className="text-base font-bold text-ink-900">Applicant Overview</p>
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Download className="size-3.5" strokeWidth={2} />
          Download Report
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-[0.8fr_1fr]">
        {/* score column */}
        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-xs font-semibold text-slate-500">
            VE Score<span className="align-super text-[8px]">™</span>
          </p>
          <ScoreGauge score={92} />

          <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-3">
            {meta.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">{row.label}</span>
                {row.pill ? (
                  <span className="rounded-md bg-mint-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                    {row.value}
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-ink-900">{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* checks + summary column */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-semibold text-slate-500">Verification Summary</p>
            <ul className="mt-3 space-y-2.5">
              {checks.map((check, i) => (
                <motion.li
                  key={check.label}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
                  className="flex items-center justify-between gap-3 border-b border-slate-50 pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="flex items-center gap-2 text-xs font-medium text-ink-900">
                    <check.icon className="size-3.5 text-slate-400" strokeWidth={1.75} />
                    {check.label}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    {check.result}
                    <CheckCircle2 className="size-3.5 text-teal-500" strokeWidth={2} />
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-semibold text-slate-500">AI Summary</p>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
              All verification checks have been completed and verified. The applicant meets the
              employment, income, and rental history requirements.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-md bg-mint-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
              ↓ Low Risk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const r = 44;
  const c = 2 * Math.PI * r;
  // Three-quarter arc, so the gauge reads as a dial rather than a full ring.
  const sweep = 0.75;
  const track = c * sweep;

  return (
    <div ref={ref} className="relative mt-3 flex justify-center">
      <svg viewBox="0 0 112 112" className="size-32 rotate-[135deg]">
        <circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="#EEF2F6"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${track} ${c}`}
        />
        <motion.circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="var(--color-teal-500)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${track} ${c}`}
          initial={{ strokeDashoffset: track }}
          animate={{ strokeDashoffset: inView ? track * (1 - score / 100) : track }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-ink-900">{score}</span>
        <span className="text-[10px] font-medium text-slate-400">Excellent</span>
      </div>
    </div>
  );
}
