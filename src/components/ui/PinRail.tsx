"use client";

import { motion } from "motion/react";

/**
 * The progress rail under a pinned panel on a phone or tablet.
 *
 * Scrolling is what moves those sections on, so this reads as progress first:
 * a filling rail, and the state's number beside it. The segments stay tappable
 * — someone who wants the last one should not have to scroll through five —
 * but nothing about the section depends on being tapped.
 */
export function PinRail({
  labels,
  active,
  onSelect,
  groupLabel,
  className = "",
}: {
  /** One per state, used for the segment's accessible name. */
  labels: string[];
  active: number;
  onSelect: (index: number) => void;
  groupLabel: string;
  className?: string;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <p className="text-base font-semibold whitespace-nowrap tabular-nums text-slate-500">
        <span className="text-teal-600">{pad(active + 1)}</span> / {pad(labels.length)}
      </p>
      <div className="flex flex-1 items-center gap-1.5" role="group" aria-label={groupLabel}>
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${i + 1}: ${label}`}
            aria-current={i === active ? "step" : undefined}
            className="min-w-0 flex-1 cursor-pointer py-2 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
          >
            <span className="block h-1 overflow-hidden rounded-full bg-slate-200">
              <motion.span
                className="block h-full rounded-full bg-teal-500"
                initial={false}
                animate={{ width: i <= active ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
