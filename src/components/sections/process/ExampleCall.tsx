"use client";

import { motion } from "motion/react";
import { Bot, Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export type CallLine = { time: string; text: string };

/**
 * Two-column call transcript with a working scrubber, shown near the bottom of
 * every process page. The two speakers sit side by side rather than as chat
 * bubbles, matching the process designs.
 */
export function ExampleCall({
  title = "Example AI Call in Action",
  description,
  duration = "1:12",
  agentLabel = "AI Agent",
  respondentLabel,
  agentLines,
  respondentLines,
}: {
  title?: string;
  description: string;
  duration?: string;
  agentLabel?: string;
  respondentLabel: string;
  agentLines: CallLine[];
  respondentLines: CallLine[];
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-bg-muted pb-20 sm:pb-24">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-white shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.6fr]">
              <div className="border-b border-slate-100 p-7 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-bold text-ink-900">{title}</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>

                <button
                  type="button"
                  onClick={() => setPlaying((v) => !v)}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:border-teal-500 hover:text-teal-600"
                >
                  {playing ? (
                    <Pause className="size-4" fill="currentColor" />
                  ) : (
                    <Play className="size-4" fill="currentColor" />
                  )}
                  {playing ? "Pause Example Call" : "Play Example Call"}
                </button>
                <p className="mt-2.5 text-base text-slate-400">Duration: {duration}</p>
              </div>

              <div>
                <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
                  <Speaker label={agentLabel} lines={agentLines} isAgent />
                  <Speaker label={respondentLabel} lines={respondentLines} />
                </div>

                <div className="flex items-center gap-3 border-t border-slate-100 px-6 py-3.5">
                  <button
                    type="button"
                    onClick={() => setPlaying((v) => !v)}
                    aria-label={playing ? "Pause call" : "Play call"}
                    className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-navy-900 text-white"
                  >
                    {playing ? (
                      <Pause className="size-3.5" fill="currentColor" />
                    ) : (
                      <Play className="size-3.5" fill="currentColor" />
                    )}
                  </button>

                  <div className="flex min-w-0 flex-1 items-center gap-px">
                    {Array.from({ length: 60 }).map((_, i) => {
                      const h = 4 + ((i * 7) % 14);
                      return (
                        <motion.span
                          key={i}
                          className="w-0.5 flex-1 rounded-full bg-teal-400"
                          animate={
                            playing ? { height: [h, Math.max(3, h * 0.4), h] } : { height: h }
                          }
                          transition={{
                            duration: 1,
                            repeat: playing ? Infinity : 0,
                            delay: i * 0.02,
                          }}
                        />
                      );
                    })}
                  </div>

                  <span className="shrink-0 text-base text-slate-400">{duration}</span>
                  <Volume2 className="size-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Speaker({
  label,
  lines,
  isAgent = false,
}: {
  label: string;
  lines: CallLine[];
  isAgent?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {isAgent && (
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-mint-100 text-teal-600">
            <Bot className="size-3.5" strokeWidth={2} />
          </span>
        )}
        <p className="text-sm font-bold text-ink-900">{label}</p>
      </div>

      <div className="mt-3 space-y-4">
        {lines.map((line, i) => (
          <div key={i}>
            <p className="text-right text-base text-slate-400">{line.time}</p>
            <p className="mt-0.5 text-base leading-relaxed text-slate-600">{line.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
