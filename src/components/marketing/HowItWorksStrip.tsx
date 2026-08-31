"use client";

import {
  UserPlus,
  ShieldAlert,
  Users,
  PhoneCall,
  AudioLines,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

// The Landlord Verification Workflow, in the order the client signed off on.
// The hero mockup (WorkflowShowcase) walks through the same seven steps in the
// same order — change one and change the other.
const steps = [
  {
    icon: UserPlus,
    label: "Applicant Submitted",
    desc: "The applicant completes your rental application and verification requirements.",
  },
  {
    icon: ShieldAlert,
    label: "Fraud Detection",
    desc: "Identity, documents, and application data are screened for fraud and risk signals.",
  },
  {
    icon: Users,
    label: "Human QA Review",
    desc: "Verification experts review the file and confirm it is accurate and compliant.",
  },
  {
    icon: PhoneCall,
    label: "AI Calls Previous Landlord",
    desc: "Our AI voice agent calls the previous landlord and starts a natural conversation.",
  },
  {
    icon: AudioLines,
    label: "Dynamic Interview",
    desc: "The AI adapts in real time, asking the right follow-up questions to gather detailed history.",
  },
  {
    icon: CheckCircle2,
    label: "Responses Validated",
    desc: "Every answer is validated and cross-checked against trusted data sources.",
  },
  {
    icon: FileText,
    label: "Report Delivered",
    desc: "You receive a complete, compliant verification report in minutes.",
  },
];

export function HowItWorksStrip() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive(idx);
  });

  const ActiveIcon = steps[active].icon;

  return (
    <section ref={wrapperRef} className="relative bg-white" style={{ height: `${steps.length * 55}vh` }}>
      <div className="sticky top-20 overflow-hidden py-12 sm:py-16">
        <Container>
          {/* The section heading carries the weight of a main H2, not the small
              eyebrow it used to be, and the workflow below it gets room to
              breathe. */}
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
              How It Works
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:mt-4 sm:text-lg">
              Scroll to follow the process, step by step.
            </p>
          </Reveal>

          {/* Tall enough for the longest step title and description at every
              width, since the card inside is absolutely positioned and would
              otherwise run into the rail below it. */}
          <div className="relative mx-auto mt-8 min-h-[168px] max-w-2xl text-center sm:mt-14 sm:min-h-[148px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center"
              >
                {/* shrink-0: this is a column flex child, so without it the
                    circle is squashed into a pill when the copy runs long. */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/20 sm:size-14">
                  <ActiveIcon className="size-6 sm:size-7" strokeWidth={1.75} />
                </div>
                <h3 className="mt-3 text-xl font-bold text-ink-900 sm:mt-4 sm:text-2xl">
                  {steps[active].label}
                </h3>
                <p className="mt-2 max-w-md text-sm text-slate-600 sm:text-base">
                  {steps[active].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mx-auto mt-10 max-w-[1360px] sm:mt-16">
            {/* The rail runs between the first and last circle's centre. The
                steps share the row equally, so half a step is half of 1/7th of
                the row — 7.143% — at every width. */}
            <div className="absolute top-5 right-[7.143%] left-[7.143%] sm:top-8">
              <div className="h-px bg-slate-200" />
              <motion.div
                className="absolute top-0 left-0 h-px bg-teal-500"
                animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <div className="relative flex justify-between gap-1 sm:gap-3">
              {steps.map((step, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => setActive(i)}
                    /* Seven steps share the row equally at every width, so they
                       never collide: on a phone each one is barely wider than
                       its circle, and on a desktop each gets a seventh of a
                       1360px rail. */
                    className="flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-2"
                  >
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-full ring-4 ring-white transition-all duration-300 sm:size-16 ${
                        isActive
                          ? "scale-110 bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                          : isDone
                            ? "bg-mint-100 text-teal-600"
                            : "bg-bg-muted text-slate-400"
                      }`}
                    >
                      <step.icon className="size-5 sm:size-7" strokeWidth={1.75} />
                    </span>
                    {/* Seven labels cannot be read side by side on a phone, and
                        they would only repeat the step title shown full size
                        just above the rail — so below sm the circles carry the
                        sequence on their own. */}
                    <p
                      className={`hidden text-center leading-tight font-medium transition-colors sm:block sm:text-sm lg:text-base ${
                        isActive ? "text-ink-900" : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 text-center sm:mt-12">
            <Link
              href="/how-it-works/landlord-verification"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-600/80"
            >
              View the Full Landlord Verification Process <ArrowRight />
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
