"use client";

import { useState } from "react";

/* VE Score™ Mode — a three-way segmented control; the chosen mode fills navy. */
export function ScoreModeControl({ modes }: { modes: readonly string[] }) {
  const [active, setActive] = useState(modes[0]);
  return (
    <div role="radiogroup" aria-label="VE Score mode" className="flex flex-col gap-1 sm:flex-row">
      {modes.map((mode) => {
        const selected = mode === active;
        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setActive(mode)}
            className={`flex-1 rounded-app-m px-4 py-2.5 text-label-2xs transition-colors ${
              selected
                ? "bg-app-brand1 text-white"
                : "text-app-text-tertiary hover:bg-app-brand2-16 hover:text-app-heading"
            }`}
          >
            {mode}
          </button>
        );
      })}
    </div>
  );
}
