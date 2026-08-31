"use client";

import { motion, useAnimationFrame } from "motion/react";
import { Headset, Cpu, UserCheck, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { Button, ArrowRight, PlayIcon, FullBleedContainer } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { icon: Headset, title: "AI Voice Agents", desc: "Make Contact" },
  { icon: Cpu, title: "AI Gathers & Validates", desc: "Information" },
  { icon: UserCheck, title: "Human QA Review", desc: "Ensures Accuracy" },
  { icon: FileText, title: "Report Delivered", desc: "Instantly" },
];

const STEP_DURATION = 2400;

export function HeroHowItWorks() {
  const [active, setActive] = useState(0);
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
    <section className="relative overflow-hidden bg-navy-900 pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        className="pointer-events-none absolute top-8 right-0 h-72 w-72 opacity-[0.13]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <FullBleedContainer>
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.68fr_1fr] lg:gap-16">
          <Reveal>
            <PillBadge>How It Works</PillBadge>
            <h1 className="mt-5 text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl">
              A Smarter Verification Process from{" "}
              <span className="text-mint-200">Start to Finish</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">
              Verify Engine combines AI voice agents, intelligent automation, and human expertise
              to deliver accurate verification reports faster—so you can screen with confidence
              and lease faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-demo" size="lg">
                Book Demo <ArrowRight />
              </Button>
              <Button href="#experience" variant="outline-dark" size="lg">
                <PlayIcon /> Watch Overview
              </Button>
            </div>
          </Reveal>

          {/* The theme attribute goes on a plain element, not on Reveal —
              Reveal takes a fixed prop list and silently drops anything else,
              and TypeScript does not flag hyphenated JSX attributes. */}
          <Reveal delay={0.12}>
            <div
              data-ve-theme="light"
              className="mock-type font-app grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1.05fr]"
            >
            <LiveCallCard />

            {/* Step rail — glass circles + pill panels, in the platform's language. */}
            <div className="relative flex flex-col justify-center gap-2">
              <div className="absolute top-8 bottom-8 left-7 w-px bg-app-line" />
              <motion.div
                className="absolute top-8 left-7 w-px bg-app-brand1"
                animate={{ height: `${(active / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => selectStep(i)}
                    className="relative flex cursor-pointer items-center gap-4 text-left"
                  >
                    <motion.span
                      animate={{ scale: isActive ? 1.06 : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-app-12xl border-w-2xs transition-colors ${
                        isActive
                          ? "border-app-line-brand2 bg-[var(--ve-canvas)] text-app-text-brand1"
                          : "border-app-line bg-[var(--ve-canvas)] text-app-text-tertiary"
                      }`}
                    >
                      <step.icon className="size-6" strokeWidth={1.6} />
                    </motion.span>
                    <span
                      className={`min-w-0 flex-1 rounded-app-l border-w-2xs px-4 py-3 shadow-lg transition-colors ${
                        isActive
                          ? "border-app-line-brand2 bg-[var(--ve-canvas)]"
                          : "border-app-line bg-[var(--ve-canvas)]"
                      }`}
                    >
                      <span className="block text-label-2xs text-app-text">{step.title}</span>
                      <span className="block text-body-2xs text-app-text-secondary">
                        {step.desc}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            </div>
          </Reveal>
        </div>
      </FullBleedContainer>
    </section>
  );
}

/** The tall "AI VOICE AGENT" transcript card on the left of the hero visual. */
function LiveCallCard() {
  const bars = [
    6, 10, 16, 22, 14, 26, 18, 30, 12, 24, 20, 34, 16, 28, 10, 20, 14, 24, 8, 18, 12, 22, 16, 10,
  ];

  return (
    <div className="flex flex-col rounded-app-xl border-w-2xs border-app-line-brand2 bg-[var(--ve-canvas)] p-6 shadow-2xl">
      <p className="text-nav-heading text-app-text-secondary">AI Voice Agent</p>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-body-2xs text-app-text-secondary">00:45</span>
        <div className="flex flex-1 items-center justify-center gap-0.5">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="w-0.5 rounded-app-4xl bg-app-brand1"
              animate={{ height: [h, Math.max(4, h * 0.35), h] }}
              transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.045, ease: "easeInOut" }}
            />
          ))}
        </div>
        <span className="text-body-2xs text-app-text-secondary">00:45</span>
      </div>

      <p className="mt-7 text-body-xs leading-relaxed text-app-text">
        Hi, this is Ava calling on behalf of Verify Engine. I&apos;m conducting a rental history
        verification for one of our clients. Do you have a few minutes to answer some questions?
      </p>

      <p className="mt-auto flex items-center gap-2 pt-8 text-label-xs text-app-text">
        Listening...
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="size-1.5 rounded-app-12xl bg-app-success"
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </span>
      </p>
    </div>
  );
}
