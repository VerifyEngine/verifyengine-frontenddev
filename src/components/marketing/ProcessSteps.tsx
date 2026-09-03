"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Headset, Phone, Cpu, UserCheck, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: Headset,
    title: "Submit Applicant",
    desc: "You submit the applicant's information and verification requirements.",
    detail:
      "Upload a single applicant or a batch through the dashboard, or push them straight from your screening platform via API. Verify Engine validates the request and queues it instantly.",
  },
  {
    icon: Phone,
    title: "AI Contacts Source",
    desc: "Our AI voice agents make contact via phone, email, or SMS.",
    detail:
      "The agent dials the previous landlord or employer, handles voicemail and gatekeepers, and retries on its own schedule until it reaches a real person.",
  },
  {
    icon: Cpu,
    title: "AI Gathers & Validates",
    desc: "AI collects and validates information using intelligent questions and rules.",
    detail:
      "A dynamic interview adapts to each answer, cross-checks responses against the application, and flags inconsistencies or fraud signals as they surface.",
  },
  {
    icon: UserCheck,
    title: "Human QA Review",
    desc: "Our verification experts review and ensure 100% accuracy.",
    detail:
      "Every report passes a trained reviewer who listens to the call, confirms the extracted data, and adds confidence notes before anything is released.",
  },
  {
    icon: FileText,
    title: "Report Delivered",
    desc: "You receive a complete, compliant verification report in minutes.",
    detail:
      "The finished report lands in your dashboard with the full transcript, audit trail, and a downloadable PDF — ready to attach to your leasing decision.",
  },
];

export function ProcessSteps() {
  // Scroll position inside this tall section drives which step is active,
  // matching the scrollytelling treatment used on the homepage. The step
  // buttons stay clickable as a secondary way to jump around.
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
    <section
      ref={wrapperRef}
      className="relative bg-white"
      style={{ height: `${steps.length * 55}vh` }}
    >
      <div className="sticky top-20 overflow-hidden py-8 sm:py-16">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Our Verification Process</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:mt-3 sm:text-4xl lg:text-5xl">
              How Verify Engine Works
            </h2>
            <p className="mt-2 text-base text-slate-400 sm:mt-3 sm:text-base">
              Scroll to follow the process, step by step.
            </p>
          </Reveal>

          {/*
            The sticky panel has to fit inside a phone viewport for the scroll
            effect to read properly, so on small screens the rail collapses to
            a compact icon row — the active step's full title and description
            still show at full size in the detail card directly below it.
          */}
          <div className="mt-7 grid grid-cols-5 gap-x-2 sm:mt-12 sm:gap-x-6">
            {steps.map((step, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex cursor-pointer flex-col items-center text-center"
                >
                  <div className="relative flex w-full items-center justify-center">
                    {i > 0 && (
                      <span className="absolute top-1/2 right-1/2 w-full -translate-y-1/2 border-t border-dashed border-slate-200" />
                    )}
                    <span
                      className={`relative z-10 flex size-6 items-center justify-center rounded-full text-sm font-bold transition-colors sm:size-7 sm:text-base ${
                        isActive || isDone ? "bg-teal-500 text-white" : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <motion.span
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-3 flex size-11 items-center justify-center rounded-full ring-4 ring-white transition-colors sm:mt-4 sm:size-16 ${
                      isActive
                        ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                        : isDone
                          ? "bg-mint-100 text-teal-600"
                          : "bg-bg-muted text-slate-400 group-hover:bg-mint-100 group-hover:text-teal-600"
                    }`}
                  >
                    <step.icon className="size-5 sm:size-7" strokeWidth={1.75} />
                  </motion.span>

                  <h3
                    className={`mt-4 hidden text-base font-bold transition-colors sm:block sm:text-base ${
                      isActive ? "text-ink-900" : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Expanded detail for whichever step the scroll position lands on. */}
          <div className="mt-7 min-h-[190px] rounded-2xl bg-bg-muted p-5 sm:mt-12 sm:min-h-[132px] sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-card sm:size-14">
                  <ActiveIcon className="size-5 sm:size-7" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-[0.1em] text-teal-600 uppercase">
                    Step {active + 1} of {steps.length}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-ink-900 sm:mt-1.5 sm:text-xl">
                    {steps[active].title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-base">
                    {steps[active].detail}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </section>
  );
}
