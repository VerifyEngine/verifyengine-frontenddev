"use client";

import { useState } from "react";

/*
 * On/off switch for the Client Profile's feature flags, decision engine and
 * decision rules. Local state only: nothing is saved until the client
 * endpoint exists, but a switch that does not move would be a picture of one.
 */
export function ToggleSwitch({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => setOn((value) => !value)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        on ? "bg-app-success" : "bg-app-brand1-quaternary"
      }`}
    >
      <span
        aria-hidden
        className={`absolute size-4 rounded-full bg-white shadow-sm transition-transform ${
          on ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
