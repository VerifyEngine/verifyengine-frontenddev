"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Animated percentage dial. Takes only plain numbers and strings so it can be
 * used from Server Components without pushing component references across the
 * client boundary.
 */
export function ScoreDial({
  score,
  caption = "Excellent",
}: {
  score: number;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const r = 46;
  const c = 2 * Math.PI * r;

  return (
    <div ref={ref} className="relative mx-auto mt-2 w-fit">
      <svg viewBox="0 0 112 112" className="size-32 -rotate-90">
        <circle cx="56" cy="56" r={r} fill="none" stroke="#EEF2F6" strokeWidth="10" />
        <motion.circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="var(--color-teal-500)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: inView ? c - (score / 100) * c : c }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-ink-900">{score}%</span>
        <span className="text-[10px] text-slate-400">{caption}</span>
      </span>
    </div>
  );
}
