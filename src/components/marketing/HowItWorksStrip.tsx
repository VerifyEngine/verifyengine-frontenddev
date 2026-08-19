"use client";

import { UserPlus, PhoneCall, AudioLines, CheckCircle2, Users, FileText } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

const steps = [
  {
    icon: UserPlus,
    label: "Submit Applicant",
    desc: "The applicant completes your rental application and verification requirements.",
  },
  {
    icon: PhoneCall,
    label: "AI Contacts Landlord",
    desc: "Our AI voice agent calls the previous landlord and starts a natural conversation.",
  },
  {
    icon: AudioLines,
    label: "Dynamic Conversation",
    desc: "The AI adapts in real time, asking the right follow-up questions to gather detailed history.",
  },
  {
    icon: CheckCircle2,
    label: "Responses Validated",
    desc: "Every answer is validated and cross-checked against trusted data sources.",
  },
  {
    icon: Users,
    label: "Human QA Review",
    desc: "Verification experts review the results and ensure 100% accuracy.",
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
          <Reveal className="text-center">
            <Eyebrow>How It Works</Eyebrow>
            <p className="mt-1 text-xs text-slate-400">Scroll to follow the process, step by step.</p>
          </Reveal>

          <div className="relative mx-auto mt-6 min-h-[104px] max-w-xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/20">
                  <ActiveIcon className="size-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-3 text-xl font-bold text-ink-900 sm:text-2xl">{steps[active].label}</h3>
                <p className="mt-2 max-w-md text-sm text-slate-600">{steps[active].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mx-auto mt-10 max-w-4xl">
            <div className="absolute top-6 right-0 left-0 h-px bg-slate-200 sm:top-7" />
            <motion.div
              className="absolute top-6 left-0 h-px bg-teal-500 sm:top-7"
              animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="relative flex justify-between">
              {steps.map((step, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className="flex w-14 flex-col items-center gap-2 sm:w-24"
                  >
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-full ring-4 ring-white transition-all duration-300 sm:size-14 ${
                        isActive
                          ? "scale-110 bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                          : isDone
                            ? "bg-mint-100 text-teal-600"
                            : "bg-bg-muted text-slate-400"
                      }`}
                    >
                      <step.icon className="size-5 sm:size-6" strokeWidth={1.75} />
                    </span>
                    <p
                      className={`text-center text-xs leading-tight font-medium transition-colors sm:text-sm ${
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

          <div className="mt-8 text-center">
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
