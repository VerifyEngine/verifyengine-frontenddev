"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const stats = [
  { value: "85%", label: "Faster Verification Turnaround" },
  { value: "99.2%", label: "Verification Accuracy" },
  { value: "73%", label: "Reduction in Manual Work" },
  { value: "2M+", label: "Verifications Completed" },
];

const testimonials = [
  {
    quote:
      "Verify Engine has completely transformed our verification process. We're getting reports back in minutes instead of days, and the accuracy is unmatched. Our leasing team is finally able to focus on what matters—placing great tenants.",
    name: "Sarah Johnson",
    role: "VP of Operations, ProScreen",
    company: "ProScreen",
  },
  {
    quote:
      "We used to spend entire afternoons chasing previous landlords by phone. Verify Engine handles the outreach end to end, and every report comes back human-reviewed—so we trust what we're reading.",
    name: "Marcus Lee",
    role: "Director of Screening, RentPrep",
    company: "RentPrep",
  },
  {
    quote:
      "Turnaround time dropped from four days to under an hour. That difference alone has let us approve qualified applicants before competitors even pick up the phone.",
    name: "Elena Rodriguez",
    role: "Head of Leasing, RentCheck",
    company: "RentCheck",
  },
];

export function ProvenResults() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  function move(delta: number) {
    setIndex((v) => (v + delta + testimonials.length) % testimonials.length);
  }

  return (
    <section className="bg-bg-muted py-20 sm:py-24">
      <Container>
        <Reveal>
          <Eyebrow>Proven Results</Eyebrow>
        </Reveal>

        {/*
          The design pairs the metrics and the testimonial side by side on one
          light band — the numbers carry the teal accent, the quote sits to the
          right with its own carousel controls.
        */}
        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <RevealGroup className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-2">
            {stats.map((s) => (
              <RevealItem key={s.label}>
                <p className="font-display text-3xl font-bold text-teal-600 sm:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-slate-600">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.12}>
            <div className="relative flex items-center gap-4">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous testimonial"
                className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-teal-500 hover:text-teal-600 sm:flex"
              >
                <ChevronLeft className="size-4" strokeWidth={2} />
              </button>

              <div className="min-w-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <QuoteMark />
                    <p className="mt-3 text-base leading-relaxed text-slate-600">{active.quote}</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-navy-700" />
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{active.name}</p>
                          <p className="text-xs text-slate-500">{active.role}</p>
                        </div>
                      </div>
                      <span className="hidden text-sm font-bold tracking-tight text-slate-400 select-none sm:block">
                        {active.company}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next testimonial"
                className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-teal-500 hover:text-teal-600 sm:flex"
              >
                <ChevronRight className="size-4" strokeWidth={2} />
              </button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" className="h-6 w-8 text-slate-200" fill="currentColor" aria-hidden="true">
      <path d="M0 24V13.2C0 5.9 4.2 1.1 11.6 0l1.2 3.9c-4.3 1-6.4 3.4-6.4 6.6h5.9V24H0Zm19.2 0V13.2C19.2 5.9 23.4 1.1 30.8 0L32 3.9c-4.3 1-6.4 3.4-6.4 6.6h5.9V24h-12.3Z" />
    </svg>
  );
}
