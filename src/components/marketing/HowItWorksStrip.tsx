"use client";

import { Check, ChevronLeft, ChevronRight, FileSearch } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Link from "next/link";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { StepVisual } from "@/components/marketing/VerificationStepVisuals";
import {
  verificationFlows,
  type VerificationFlowId,
  type VerificationFlow,
  type VerificationStep,
} from "@/lib/verification-steps";

/*
 * How It Works — one large persistent step panel driven by scroll.
 *
 * Everything on screen comes from `verificationSteps`: the panel copy, the
 * seven-step timeline, the compact phone progress and the product
 * visualisation beside it.
 *
 * From `xl` (80rem) the whole composition pins and reads the active step off
 * the scroll position, forwards and backwards. Narrower than that it does not
 * pin at all, and keeps the site's own section rhythm: a phone would either
 * squeeze seven timeline labels into 390px or trap the scroll, so below `lg`
 * it gets a compact dots + "n / 7" control with real buttons, and the section
 * is only as tall as its content. The tightened spacing is xl-only for the
 * same reason — it exists to fit the pinned panel into one screen, and applied
 * any wider it just left the section looking starved.
 */

// How much scrolling each step is given while the section is pinned.
const VH_PER_STEP = 58;
// The site header is `h-18`; the pinned panel starts just below it.
const HEADER_OFFSET = "4.5rem";
/*
 * The height the pinned composition is drawn at. When the window offers less,
 * globals.css scales the whole thing down rather than clipping it — see the
 * `.how-pin-fit` rule there.
 */
const NATURAL_HEIGHT = "790px";
/*
 * When the section is pinned and scroll-controlled. It must stay in step with
 * the `.how-pin-track` / `.how-pin-panel` rules in globals.css: on anything
 * narrower or shorter the section is a plain block, and reading the active
 * step off the page scroll would shuffle the panel as the visitor scrolls past.
 */
const PIN_QUERY = "(min-width: 80rem)";

/**
 * @param flow which verification story to tell — the homepage's landlord
 * workflow, or the general process the How It Works page describes.
 *
 * A plain string, not the steps themselves: this is a Client Component, and
 * handing it Lucide icon *components* across the boundary breaks RSC
 * streaming, so the flow is looked up on this side of the line.
 */
export function HowItWorksStrip({ flow = "landlord" }: { flow?: VerificationFlowId }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, subtitle, steps, cta } = verificationFlows[flow];
  const step = steps[active];
  const stepCount = steps.length;
  const lastIndex = stepCount - 1;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Only the pinned desktop layout is scroll-driven. On smaller screens the
    // section is a normal block, so scrolling past it must not shuffle steps.
    if (!window.matchMedia(PIN_QUERY).matches) return;
    const idx = Math.min(lastIndex, Math.max(0, Math.floor(v * stepCount)));
    setActive(idx);
  });

  /*
   * Jumping to a step has to move the page, not just the state: while the
   * section is pinned the scroll position *is* the active step, so setting
   * state alone would be undone by the next scroll event.
   */
  const goTo = useCallback(
    (index: number) => {
      const next = Math.min(lastIndex, Math.max(0, index));
      setActive(next);

      const el = wrapperRef.current;
      if (!el || !window.matchMedia(PIN_QUERY).matches) return;

      const top = el.getBoundingClientRect().top + window.scrollY;
      const range = el.offsetHeight - window.innerHeight;
      const progress = (next + 0.5) / stepCount;
      window.scrollTo({
        top: top + range * progress,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [lastIndex, stepCount, reduceMotion],
  );

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };
  const enter = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 };
  const exit = reduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -14 };

  return (
    <>
    <section
      ref={wrapperRef}
      className="how-pin-track relative bg-white"
      style={
        {
          "--how-it-works-scroll": `${steps.length * VH_PER_STEP}vh`,
          "--how-it-works-offset": HEADER_OFFSET,
          "--how-it-works-natural": NATURAL_HEIGHT,
        } as CSSProperties
      }
      aria-labelledby="how-it-works-title"
    >
      <div className="how-pin-panel py-20 sm:py-24">
        <Container className="how-pin-fit">
          <Reveal className="text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
              id="how-it-works-title"
              className="font-display mt-3 text-4xl leading-[1.05] font-bold tracking-tight text-ink-900 sm:text-5xl lg:text-[clamp(2.5rem,4.6dvh,3.5rem)] 2xl:text-[clamp(2.75rem,4.8dvh,4rem)]"
            >
              {title}
            </h2>
            <p className="how-pin-sub mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
              {subtitle}
            </p>
          </Reveal>

          {/*
            The one large active-step area.
            Three blocks — headline copy, product visualisation, supporting
            capabilities — placed into two columns on a desktop. On a phone
            they simply flow in DOM order, which is the order the spec asks
            for: heading, description, visualisation, then features and
            callout.
          */}
          <div className="mt-10 rounded-3xl border border-slate-200/70 bg-bg-muted p-6 sm:mt-12 sm:p-7 xl:mt-4 xl:p-4">
            <div className="grid gap-6 lg:min-h-[340px] lg:grid-cols-[minmax(0,92fr)_minmax(0,100fr)] lg:grid-rows-[1fr_auto_auto_1fr] lg:items-center lg:gap-x-12 lg:gap-y-3">
              <div className="lg:col-start-1 lg:row-start-2">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step.id}
                    initial={enter}
                    animate={{ opacity: 1, y: 0 }}
                    exit={exit}
                    transition={transition}

                    className="ve-reveal"
                  >
                    <span className="inline-flex items-center rounded-full border border-teal-500/30 bg-white px-3.5 py-1.5 text-sm font-bold tracking-wide text-teal-600 uppercase">
                      Step {step.number.replace(/^0/, "")} of {steps.length}
                    </span>
                    <p className="mt-4 text-base font-semibold tracking-wide text-teal-600 uppercase">
                      {step.category}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]">
                      {step.title}
                    </h3>
                    <p className="mt-3 min-h-[5rem] max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:text-[1.2rem] lg:leading-[1.6]">
                      {step.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex min-h-[280px] items-center justify-center sm:min-h-[300px] lg:col-start-2 lg:row-span-4 lg:row-start-1">
                <AnimatePresence mode="wait" initial={false}>
                  {/* Visualisations crossfade with a touch of scale rather than
                      the vertical move the copy uses — the spec asks for a
                      crossfade here. */}
                  <motion.div
                    key={step.id}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={transition}
                    className="ve-reveal flex w-full justify-center"
                  >
                    <StepVisual id={step.id} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="lg:col-start-1 lg:row-start-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step.id}
                    initial={enter}
                    animate={{ opacity: 1, y: 0 }}
                    exit={exit}
                    transition={transition}

                    className="ve-reveal"
                  >
                    <ul className="flex flex-wrap gap-x-6 gap-y-3">
                      {step.features.map((feature) => (
                        <li key={feature.label} className="flex items-center gap-2">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                            <feature.icon className="size-4.5" strokeWidth={1.75} />
                          </span>
                          <span className="text-base font-semibold text-ink-900">{feature.label}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-mint-100 bg-bg-mint-50 px-4 py-3">
                      <SparkMark />
                      <p className="text-base leading-relaxed text-slate-600">{step.callout}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <Timeline steps={steps} active={active} onSelect={goTo} />
          <CompactProgress steps={steps} active={active} onSelect={goTo} />
        </Container>
      </div>
    </section>
    {cta ? <ProcessLink cta={cta} /> : null}
    </>
  );
}

/*
 * The deep-dive link sits after the pinned track rather than inside it: while
 * the section is pinned every extra row competes for the same viewport, and
 * this is the one thing that reads better once the visitor has reached the end
 * of the workflow.
 */
function ProcessLink({ cta }: { cta: NonNullable<VerificationFlow["cta"]> }) {
  return (
    <div className="bg-white pb-16 sm:pb-20 xl:pt-12">
      <Container>
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-x-3 gap-y-1 rounded-2xl bg-bg-muted px-5 py-3.5 text-center sm:flex-row sm:text-left">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600">
              <FileSearch className="size-5" strokeWidth={1.75} />
            </span>
            <p className="text-base font-semibold text-ink-900">{cta.prompt}</p>
            {/* Inline rather than a flex row: the label wraps to two lines on a
                phone, and a flex arrow would drift to the far right of it. */}
            <Link
              href={cta.href}
              className="rounded text-base font-semibold text-teal-600 transition-colors hover:text-teal-600/80 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {cta.label}{" "}
              <ArrowRight className="ml-0.5 inline size-4 align-[-2px]" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

/** The seven-step rail. Desktop only — see CompactProgress for phones. */
function Timeline({
  steps,
  active,
  onSelect,
}: {
  steps: VerificationStep[];
  active: number;
  onSelect: (index: number) => void;
}) {
  const lastIndex = steps.length - 1;

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      onSelect(Math.min(lastIndex, active + 1));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      onSelect(Math.max(0, active - 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      onSelect(0);
    } else if (event.key === "End") {
      event.preventDefault();
      onSelect(lastIndex);
    }
  }

  return (
    <div
      className="relative mx-auto mt-10 hidden max-w-[1200px] lg:block xl:mt-3"
      onKeyDown={handleKeyDown}
      role="group"
      aria-label="Verification workflow steps"
    >
      {/* The rail runs between the first and last node's centre: half a step is
          half of 1/7th of the row — 7.143% — at every width. */}
      <div className="absolute top-[26px] right-[7.143%] left-[7.143%]">
        <div className="h-px bg-slate-200" />
        <motion.div
          className="absolute top-0 left-0 h-px bg-teal-500"
          animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <ol className="relative flex justify-between gap-2">
        {steps.map((step, i) => {
          const isActive = i === active;
          const isDone = i < active;
          return (
            <li key={step.id} className="flex min-w-0 flex-1 justify-center">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${step.title}`}
                className="flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl px-1 py-1 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {/* A fixed-height slot so the active node can grow without
                    pushing its own circle off the rail behind the row. */}
                <span className="flex h-13 items-center">
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-full font-semibold ring-4 ring-white transition-all duration-300 ${
                      isActive
                        ? "size-13 bg-teal-500 text-base text-white shadow-lg shadow-teal-500/25"
                        : isDone
                          ? "size-11 bg-teal-500 text-white"
                          : "size-11 border border-slate-200 bg-white text-base text-slate-400"
                    }`}
                  >
                    {isDone ? <Check className="size-5" strokeWidth={3} /> : step.number}
                  </span>
                </span>
                {/* The number is already inside the node, so the label below is
                    the step title alone — one line less to fit while pinned. */}
                <span
                  className={`text-center text-base leading-tight transition-colors ${
                    isActive ? "font-bold text-ink-900" : "font-medium text-slate-500"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Phone and tablet progress: dots, a counter and real previous/next buttons. */
function CompactProgress({
  steps,
  active,
  onSelect,
}: {
  steps: VerificationStep[];
  active: number;
  onSelect: (index: number) => void;
}) {
  const lastIndex = steps.length - 1;
  return (
    <div className="mt-8 flex items-center justify-between gap-4 lg:hidden">
      <button
        type="button"
        onClick={() => onSelect(active - 1)}
        disabled={active === 0}
        aria-label="Previous step"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-teal-500 hover:text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
      >
        <ChevronLeft className="size-5" strokeWidth={2} />
      </button>

      <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
        <div className="flex items-center gap-1.5">
          {steps.map((step, i) => (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Step ${i + 1}: ${step.title}`}
              aria-current={i === active ? "step" : undefined}
              className="rounded-full p-1 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-teal-500" : i < active ? "w-1.5 bg-teal-500/40" : "w-1.5 bg-slate-200"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-base font-semibold text-slate-500">
          <span className="text-teal-600">{active + 1}</span> / {steps.length}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onSelect(active + 1)}
        disabled={active === lastIndex}
        aria-label="Next step"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-teal-500 hover:text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
      >
        <ChevronRight className="size-5" strokeWidth={2} />
      </button>
    </div>
  );
}

function SparkMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-teal-600" fill="none" aria-hidden="true">
      <path
        d="M10 2.5 11.6 7 16 8.6 11.6 10.2 10 14.7 8.4 10.2 4 8.6 8.4 7 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M15.5 13.5 16.2 15.4 18 16.1 16.2 16.8 15.5 18.6 14.8 16.8 13 16.1 14.8 15.4 15.5 13.5Z" fill="currentColor" />
    </svg>
  );
}
