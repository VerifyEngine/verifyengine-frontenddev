"use client";

import { motion } from "motion/react";
import { Bot, CheckCircle2, Play, Pause, Volume2, Smile } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, PlayIcon, Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const transcript = [
  {
    from: "ai" as const,
    text: "Hi, this is Ava calling on behalf of Verify Engine. May I speak with John Smith?",
    time: "00:45",
  },
  { from: "user" as const, text: "This is John Smith.", time: "00:10" },
  {
    from: "ai" as const,
    text: "Thanks, John. I'm calling to verify your rental history for 123 Main St, Anytown. Is now a good time to continue?",
    time: "00:20",
  },
  { from: "user" as const, text: "Yes, that's fine.", time: "00:08" },
];

const keyDetails = ["Rental Address", "Lease Dates", "Payment History", "Account Status"];

export function AiCallDemo() {
  const [playing, setPlaying] = useState(false);
  // How many transcript lines have "landed" — advances while the call plays so
  // the conversation builds up instead of appearing all at once.
  const [revealed, setRevealed] = useState(transcript.length);

  useEffect(() => {
    if (!playing) return;
    const timers = transcript.map((_, i) =>
      window.setTimeout(() => setRevealed(i + 1), (i + 1) * 900),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [playing]);

  function togglePlaying() {
    setPlaying((wasPlaying) => {
      // Starting a run replays the conversation from the top; the effect above
      // then walks `revealed` back up as each line lands.
      if (!wasPlaying) setRevealed(0);
      return !wasPlaying;
    });
  }

  const progress = playing ? (revealed / transcript.length) * 100 : 78;

  return (
    <section id="experience" className="overflow-hidden bg-bg-mint-50 py-20 sm:py-24">
      {/*
        Same wide treatment as the dashboard section: the copy takes about a
        quarter of the row and the call panel gets the rest, inside the site's
        shared column so both sides keep matching space.
      */}
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.46fr_1fr] lg:gap-14">
        <Reveal>
          <Eyebrow>AI In Action</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Experience an AI Verification Call
          </h2>
          <p className="mt-5 text-base text-slate-600">
            Our AI voice agents have natural conversations, ask the right questions, and collect
            accurate information—just like a human.
          </p>
          <Button variant="dark" size="lg" className="mt-8" onClick={togglePlaying}>
            <PlayIcon /> {playing ? "Restart AI Call Demo" : "Try an AI Call Demo"}
          </Button>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5">
            <div className="flex flex-col xl:flex-row">
              {/* transcript */}
              <div className="min-w-0 flex-1 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-mint-200">
                      <Bot className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-base font-bold text-ink-900">AI Voice Agent: Ava</p>
                      <p className="text-base text-slate-500">Rental History Verification</p>
                    </div>
                  </div>
                  <span className="hidden items-center gap-1.5 rounded-full bg-mint-100 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-teal-700 sm:flex">
                    <span className="size-1.5 rounded-full bg-teal-500" />
                    Live Call Example
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {transcript.map((line, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: i < revealed ? 1 : 0.25 }}
                      transition={{ duration: 0.35 }}
                      className={`flex items-start gap-2.5 ${line.from === "user" ? "flex-row-reverse" : ""}`}
                    >
                      {line.from === "ai" && (
                        <span className="mt-3 flex size-6 shrink-0 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                          <Bot className="size-3.5" strokeWidth={2} />
                        </span>
                      )}
                      <div
                        className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                          line.from === "ai"
                            ? "rounded-tl-sm bg-indigo-50/70"
                            : "rounded-tr-sm bg-sky-50"
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-ink-900">{line.text}</p>
                        {/*
                          Each bubble carries its own audio scrubber in the
                          design: where the clip is on the left, how long it
                          runs on the right. Only the waveform between them may
                          shrink, so the two times stay aligned to the bubble
                          however narrow the screen gets.
                        */}
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <span className="shrink-0 text-base tabular-nums text-slate-400">00:00</span>
                          <BubbleWave active={playing && i < revealed} />
                          <span className="shrink-0 text-base tabular-nums text-slate-400">{line.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* insights panel */}
              <div className="shrink-0 border-t border-slate-100 p-6 xl:w-64 xl:border-t-0 xl:border-l">
                <p className="text-sm font-bold text-ink-900">Call Insights</p>

                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <p className="text-base text-slate-500">Confidence Score</p>
                    <p className="text-xs font-bold text-ink-900">98%</p>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-teal-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "98%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-base text-slate-500">Sentiment</p>
                  <p className="mt-1 flex items-center gap-1.5 text-base font-bold text-ink-900">
                    Positive
                    <Smile className="size-4 text-teal-500" strokeWidth={2} />
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-ink-900">Key Details Collected</p>
                  <ul className="mt-2.5 space-y-2">
                    {keyDetails.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.09 }}
                        className="flex items-center gap-2 text-base text-slate-600"
                      >
                        <CheckCircle2 className="size-4 shrink-0 text-teal-500" strokeWidth={2} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <p className="text-sm font-semibold text-ink-900">Call Duration</p>
                  <p className="text-sm font-bold text-ink-900">02:34</p>
                </div>
              </div>
            </div>

            {/* audio scrubber */}
            <div className="flex items-center gap-4 border-t border-slate-100 px-6 py-4">
              <button
                onClick={togglePlaying}
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-navy-900 text-white transition-colors hover:bg-navy-800"
                aria-label={playing ? "Pause call" : "Play call"}
              >
                {playing ? (
                  <Pause className="size-4" fill="currentColor" />
                ) : (
                  <Play className="size-4" fill="currentColor" />
                )}
              </button>
              <div className="relative h-1.5 flex-1 rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-navy-900"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-900 ring-2 ring-white"
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="shrink-0 text-base tabular-nums text-slate-400">02:34 / 03:12</span>
              <Volume2 className="size-4 shrink-0 text-slate-400" strokeWidth={1.75} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Small inline waveform shown inside each transcript bubble. */
function BubbleWave({ active }: { active: boolean }) {
  const bars = [5, 9, 14, 8, 16, 11, 6, 13, 9, 15, 7, 11, 5, 9, 12, 6];
  return (
    <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-hidden">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full bg-teal-400"
          animate={active ? { height: [h, h * 0.5, h] } : { height: h }}
          transition={{ duration: 1, repeat: active ? Infinity : 0, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}
