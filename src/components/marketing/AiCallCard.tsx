"use client";

import { motion } from "motion/react";
import { Headset } from "lucide-react";

/*
 * The live-call card that overlaps the specialist photo in `NewStandard`.
 *
 * The header row is a scrubber: elapsed time, waveform, duration. On a phone
 * the card is only ~290px wide, and a fixed 22-bar waveform is wider than the
 * space left between the two timestamps — it pushed the duration out through
 * the card's padding and left it sitting on the edge. So the wave is the only
 * part allowed to give: it shrinks (`min-w-0`) and clips its trailing bars,
 * while both timestamps keep their own width and stay aligned to the row.
 */
export function AiCallCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 p-1 shadow-2xl">
      <div className="flex items-center gap-3 rounded-t-xl bg-navy-800/60 p-4 sm:gap-4 sm:p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mint-200/15 text-mint-200 sm:size-11">
          <Headset className="size-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">AI Voice Agent</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="shrink-0 text-sm tabular-nums text-white/50">00:45</span>
            <div className="flex min-w-0 flex-1 items-end gap-0.5 overflow-hidden">
              {Array.from({ length: 22 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 4 }}
                  animate={{ height: [4, 4 + ((i * 7) % 14), 4] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.05 }}
                  className="w-0.5 shrink-0 rounded-full bg-mint-200/70"
                />
              ))}
            </div>
            <span className="shrink-0 text-sm tabular-nums text-white/50">01:12</span>
          </div>
        </div>
      </div>
      <div className="rounded-b-xl bg-white p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-ink-900">
          &ldquo;Hi, this is Ava calling on behalf of Verify Engine. I&apos;m conducting a rental
          history verification for one of our clients. Do you have a few minutes to answer some
          questions?&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-teal-600">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-teal-500" />
          </span>
          Listening...
        </div>
      </div>
    </div>
  );
}
