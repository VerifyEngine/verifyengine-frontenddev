"use client";

import { DonutRing, type DonutSlice } from "./DonutChart";
import { TONE_VAR } from "./tones";

/*
 * Queue Status Distribution — Figma node 18176:36689.
 *
 * A donut with the share written inside each slice, the categories listed
 * down the right and the total along the foot of the card. The ring is the
 * same Recharts donut the breakdown cards use.
 */

export type PieSlice = DonutSlice;

export function PieChart({
  slices,
  totalLabel,
  total,
}: {
  slices: readonly PieSlice[];
  totalLabel: string;
  total: string;
}) {
  return (
    <div className="flex h-full flex-col gap-4 px-5 pb-5">
      <div className="flex min-h-px flex-1 flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="w-full max-w-72 shrink-0">
          <DonutRing slices={slices} inner="55%" />
        </div>

        <ul className="flex shrink-0 flex-col gap-2">
          {slices.map((slice) => (
            <li key={slice.label} className="flex items-center justify-end gap-2">
              <span className="text-label-2xs text-app-text-secondary">{slice.label}</span>
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-app-12xl"
                style={{ backgroundColor: TONE_VAR[slice.tone] }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-label-xs text-app-text">{totalLabel}</span>
        <span className="text-label-xs text-app-text-emphasis">{total}</span>
      </div>
    </div>
  );
}
