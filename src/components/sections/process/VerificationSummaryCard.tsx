"use client";

import { motion, useAnimationFrame, useInView } from "motion/react";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

export type SummaryStep = { icon: LucideIcon; label: string };
export type SummaryCheck = { icon: LucideIcon; label: string; result: string };

const STEP_DURATION = 2200;

/**
 * The hero visual for every process page: a vertical stepper that cycles on
 * its own beside a live verification summary. Steps are clickable, matching
 * the interactivity level set by the homepage hero.
 */
export function VerificationSummaryCard({
  steps,
  checks,
  score = 92,
  riskLabel = "Low Risk",
  resultLabel = "Recommended",
}: {
  steps: SummaryStep[];
  checks: SummaryCheck[];
  score?: number;
  riskLabel?: string;
  resultLabel?: string;
}) {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const elapsed = useRef(0);
  const lastTick = useRef<number | null>(null);

  useAnimationFrame((t) => {
    if (paused) {
      lastTick.current = null;
      return;
    }
    if (lastTick.current === null) lastTick.current = t;
    elapsed.current += t - lastTick.current;
    lastTick.current = t;
    if (elapsed.current >= STEP_DURATION) {
      elapsed.current = 0;
      setActive((v) => (v + 1) % steps.length);
    }
  });

  function selectStep(i: number) {
    setActive(i);
    elapsed.current = 0;
    setPaused(true);
    window.setTimeout(() => setPaused(false), 4000);
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-[0.72fr_1fr]">
        {/* stepper */}
        <div className="relative border-b border-slate-100 p-5 sm:border-r sm:border-b-0">
          <div className="absolute top-10 bottom-10 left-[38px] w-px border-l border-dashed border-slate-200" />
          <ul className="relative space-y-1">
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <li key={step.label}>
                  <button
                    type="button"
                    onClick={() => selectStep(i)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors ${
                      isActive ? "bg-bg-mint-50" : "hover:bg-bg-muted"
                    }`}
                  >
                    <span
                      className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isActive ? "bg-mint-100 text-teal-600" : "bg-white text-slate-400"
                      }`}
                    >
                      <step.icon className="size-4.5" strokeWidth={1.75} />
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? "text-teal-700" : "text-ink-900"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* summary */}
        <div className="p-5">
          <p className="text-sm font-bold text-ink-900">Applicant Verification Summary</p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 p-3.5 text-center">
              <p className="text-[11px] text-slate-500">
                VE Score<span className="align-super text-[8px]">™</span>
              </p>
              <ScoreArc score={score} />
              <p className="mt-1 text-xs font-semibold text-teal-700">{riskLabel}</p>
            </div>

            <div className="rounded-xl border border-slate-100 p-3.5">
              <p className="text-[11px] text-slate-500">Overall Result</p>
              <span className="mt-1.5 inline-block rounded-md bg-mint-100 px-2.5 py-1 text-xs font-semibold text-teal-700">
                {resultLabel}
              </span>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] text-slate-400">Confidence</p>
                  <p className="text-xs font-bold text-ink-900">High</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Completed</p>
                  <p className="text-xs font-bold text-ink-900">2 min ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-slate-100 p-3.5">
            <p className="text-xs font-bold text-ink-900">Verification Breakdown</p>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {checks.map((check, i) => (
                <motion.div
                  key={check.label}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
                  className="flex items-center justify-between gap-2 rounded-lg bg-bg-muted px-2.5 py-2"
                >
                  <span className="flex items-center gap-2">
                    <check.icon className="size-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                    <span>
                      <span className="block text-[11px] font-semibold text-ink-900">
                        {check.label}
                      </span>
                      <span className="block text-[10px] text-slate-500">{check.result}</span>
                    </span>
                  </span>
                  <CheckCircle2 className="size-4 shrink-0 text-teal-500" strokeWidth={2} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreArc({ score }: { score: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const r = 34;
  const c = 2 * Math.PI * r;
  const sweep = 0.6;
  const track = c * sweep;

  return (
    <div ref={ref} className="relative mx-auto mt-1 w-fit">
      <svg viewBox="0 0 88 88" className="size-20 rotate-[144deg]">
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="#EEF2F6"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${track} ${c}`}
        />
        <motion.circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="var(--color-teal-500)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${track} ${c}`}
          initial={{ strokeDashoffset: track }}
          animate={{ strokeDashoffset: inView ? track * (1 - score / 100) : track }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-ink-900">
        {score}
      </span>
    </div>
  );
}
