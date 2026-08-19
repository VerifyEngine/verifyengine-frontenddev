"use client";

import { useAnimationFrame } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

const STEP_DURATION = 2200;

/**
 * Auto-cycling, clickable stage list for the process hero card.
 *
 * Icons arrive as already-rendered nodes rather than components: handing a
 * component across the server/client boundary emits a client reference for it,
 * and reusing the same icon on both sides of that boundary trips an RSC
 * streaming bug that hangs the request. Lucide icons stroke with
 * `currentColor`, so the active colour is still driven by the wrapper here.
 */
export function SummaryStepper({
  steps,
  initialActive = 2,
}: {
  steps: { icon: ReactNode; label: string }[];
  initialActive?: number;
}) {
  const [active, setActive] = useState(initialActive);
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
                {step.icon}
              </span>
              <span
                className={`text-sm font-semibold ${isActive ? "text-teal-700" : "text-ink-900"}`}
              >
                {step.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
