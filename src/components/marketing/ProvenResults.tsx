"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { resultMetrics, testimonials } from "@/lib/proven-results";

/*
 * Proven Results — a left-aligned header over two panels of matching height:
 * one unified 2x2 results panel and one testimonial panel.
 *
 * Both are data-driven (src/lib/proven-results.ts): the metrics are claims
 * that may still change before launch, and the testimonial list grows without
 * touching this file.
 *
 * The carousel is manual only — no auto-advance — and moves with a fade, so
 * nothing on the page animates unless the visitor asks for it. It answers the
 * arrow keys, the buttons and a swipe.
 */

/*
 * Which edges each metric carries, so the four read as one panel divided by
 * rules rather than as four cards. Written per cell instead of with `divide-*`
 * because the visual grid is 2x2 while the DOM order is linear.
 */
const metricEdges = [
  "border-b border-slate-100 sm:border-r",
  "border-b border-slate-100",
  "border-b border-slate-100 sm:border-r sm:border-b-0",
  "",
];

export function ProvenResults() {
  return (
    /* Tighter at the bottom than the top: the customer proof should hand
       straight over to the final CTA rather than leave a gap under it. */
    <section className="bg-bg-muted pt-20 pb-10 sm:pt-24 sm:pb-12">
      <Container>
        <Reveal className="max-w-[900px]">
          <Eyebrow>Proven Results</Eyebrow>
          <h2 className="font-display mt-3 text-3xl leading-[1.1] font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            Faster Verification. Greater Accuracy.
            <br className="hidden sm:block" /> Less Manual Work.
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Measurable results built for modern verification teams.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[10fr_9fr] lg:gap-8">
          <RevealGroup className="grid grid-cols-1 rounded-3xl border border-slate-200/70 bg-white p-2 shadow-card sm:grid-cols-2 sm:p-4">
            {resultMetrics.map((metric, i) => (
              <RevealItem key={metric.label} className={`${metricEdges[i]} p-5 sm:p-6`}>
                <span className="flex size-14 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                  <metric.icon className="size-6" strokeWidth={1.75} />
                </span>
                <p className="font-display mt-4 text-4xl font-bold text-teal-600 sm:text-[2.75rem]">
                  {metric.value}
                </p>
                <h3 className="mt-1 text-lg leading-snug font-bold text-ink-900">{metric.label}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{metric.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.12} className="h-full">
            <TestimonialPanel />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function TestimonialPanel() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const active = testimonials[index];

  function move(delta: number) {
    setIndex((v) => (v + delta + testimonials.length) % testimonials.length);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = event.changedTouches[0].clientX - start;
    // Ignore anything short enough to be a tap or a vertical scroll.
    if (Math.abs(delta) < 50) return;
    move(delta < 0 ? 1 : -1);
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
      className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-card focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-8"
    >
      <QuoteMark />

      <div className="mt-4 flex-1" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.blockquote
            key={index}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
            className="ve-reveal flex h-full flex-col"
          >
            <p className="pb-6 text-lg leading-relaxed text-slate-600 sm:text-xl">{active.quote}</p>

            <footer className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-navy-700 text-base font-bold text-white">
                  {active.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-base font-bold text-ink-900">{active.name}</p>
                  <p className="text-base text-slate-500">{active.role}</p>
                  <p className="text-sm font-semibold text-teal-600">{active.company}</p>
                </div>
              </div>
              <span className="hidden shrink-0 text-base font-bold tracking-tight text-slate-400 select-none sm:block">
                {active.company}
                <sup className="text-[8px]">®</sup>
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              aria-current={i === index ? "true" : undefined}
              className="rounded-full p-1 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
            >
              <span
                className={`block size-2 rounded-full transition-colors duration-200 ${
                  i === index ? "bg-teal-500" : "bg-slate-200"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <CarouselButton label="Previous testimonial" onClick={() => move(-1)}>
            <ChevronLeft className="size-4" strokeWidth={2} />
          </CarouselButton>
          <CarouselButton label="Next testimonial" onClick={() => move(1)}>
            <ChevronRight className="size-4" strokeWidth={2} />
          </CarouselButton>
        </div>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-teal-500 hover:text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {children}
    </button>
  );
}

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 32 24"
      className="h-10 w-12 shrink-0 text-slate-200"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 24V13.2C0 5.9 4.2 1.1 11.6 0l1.2 3.9c-4.3 1-6.4 3.4-6.4 6.6h5.9V24H0Zm19.2 0V13.2C19.2 5.9 23.4 1.1 30.8 0L32 3.9c-4.3 1-6.4 3.4-6.4 6.6h5.9V24h-12.3Z" />
    </svg>
  );
}
