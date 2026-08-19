"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Three-quarter dial used in the process hero card. Takes plain numbers only,
 * so Server Components can render it without pushing component references
 * across the client boundary.
 */
export function ScoreArc({ score }: { score: number }) {
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
