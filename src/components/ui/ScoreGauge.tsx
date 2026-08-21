"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Three-quarter dial for the VE Score cards. Takes plain values only, so
 * Server Components can render it without pushing component references across
 * the client boundary.
 */
export function ScoreGauge({
  score,
  caption = "Excellent",
}: {
  score: number;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const r = 44;
  const c = 2 * Math.PI * r;
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
          stroke="var(--ve-border-line, #EEF2F6)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${track} ${c}`}
        />
        <motion.circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="var(--ve-success, var(--color-teal-500))"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${track} ${c}`}
          initial={{ strokeDashoffset: track }}
          animate={{ strokeDashoffset: inView ? track * (1 - score / 100) : track }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-heading-m text-app-text">{score}</span>
        <span className="text-body-2xs text-app-text-tertiary">{caption}</span>
      </div>
    </div>
  );
}
