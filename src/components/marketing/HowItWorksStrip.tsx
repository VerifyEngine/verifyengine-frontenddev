"use client";

import { Check, FileSearch } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Link from "next/link";
import { useCallback, useRef, type CSSProperties } from "react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { PinRail } from "@/components/ui/PinRail";
import { usePinnedScroll } from "@/lib/usePinnedScroll";
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
 * The section is scroll-driven at every width — scrolling is what moves the
 * workflow forward, and it never degrades into a slider you have to tap. What
 * changes with the width is *what* gets pinned:
 *
 * - From `xl` (80rem) the whole composition pins, heading included, and the
 *   two-column panel reads the active step off the scroll position.
 * - Below `xl` there is not a screen's worth of room for the heading *and* a
 *   stacked step, so the heading scrolls away first and only the step body
 *   pins. The body then carries a phone-sized version of the same panel: no
 *   "Step n of 7" pill (the progress rail under it already says so), compact
 *   capability chips, and the supporting callout left to the wider layouts.
 *
 * Both regimes are declared in globals.css (`.how-pin-*`) and both are read
 * back here through DESKTOP_PIN / MOBILE_PIN, which must stay in step with it.
 */

// How much scrolling each step is given while the section is pinned.
const VH_PER_STEP = 58;
// The phone regime measures in `svh` — the viewport at its smallest, with the
// browser bars showing — so the track never changes length as they slide away.
const VH_PER_STEP_SM = 64;
// The site header is `h-18`; the pinned panel starts just below it.
const HEADER_OFFSET = "4.5rem";
const HEADER_OFFSET_PX = 72;
/*
 * The height each pinned composition is drawn at. When the window offers less,
 * globals.css scales the whole thing down rather than clipping it — see the
 * `.how-pin-fit` rule and the `pin-body-fit` utility there.
 */
const NATURAL_HEIGHT = "790px";
/*
 * The pinned frame below `xl` has three of them, one per layout: the stacked
 * panel on a phone, the same panel from `sm` up with the mockup painted large
 * by its own zoom, and the two-column panel with the step rail from `lg`. Each
 * is the tallest step that layout produces, measured rather than guessed, and
 * declared on the frame itself — see the `pin-*` utilities in globals.css.
 */
const PIN_NATURAL =
  "[--pin-natural:705px] sm:[--pin-natural:840px] lg:[--pin-natural:760px]";
/*
 * The two pinned regimes. They must stay in step with the `.how-pin-*` rules
 * in globals.css: each scroll handler only runs while its own layout is the
 * one on screen, so the step never advances from a scroll position that is not
 * driving it.
 */
const DESKTOP_PIN = "(min-width: 80rem)";
const MOBILE_PIN = "(max-width: 79.9375rem)";

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
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, subtitle, steps, cta } = verificationFlows[flow];
  const stepCount = steps.length;
  const lastIndex = stepCount - 1;

  // Below `xl` the step body is what pins, and the shared hook drives it.
  const { trackRef, bodyRef, active, setActive, scrollToIndex } = usePinnedScroll({
    count: stepCount,
    query: MOBILE_PIN,
    offset: HEADER_OFFSET_PX,
  });
  const step = steps[active];

  // On a desktop the whole section pins, so its own scroll range is the step
  // position there.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!window.matchMedia(DESKTOP_PIN).matches) return;
    setActive(Math.min(lastIndex, Math.max(0, Math.floor(v * stepCount))));
  });

  /*
   * Jumping to a step has to move the page, not just the state: while the
   * section is pinned the scroll position *is* the active step, so setting
   * state alone would be undone by the next scroll event. Which element
   * carries that scroll depends on the regime.
   */
  const goTo = useCallback(
    (index: number) => {
      const next = Math.min(lastIndex, Math.max(0, index));
      setActive(next);

      if (!window.matchMedia(DESKTOP_PIN).matches) {
        scrollToIndex(next);
        return;
      }

      const el = wrapperRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const range = el.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + range * ((next + 0.5) / stepCount),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [lastIndex, stepCount, reduceMotion, scrollToIndex, setActive],
  );

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };
  const enter = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 };

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
          "--pin-scroll-height": `${steps.length * VH_PER_STEP_SM}svh`,
          "--pin-offset": HEADER_OFFSET,
        } as CSSProperties
      }
      aria-labelledby="how-it-works-title"
    >
      <div className="how-pin-panel py-20 sm:py-24">
        <Container className="how-pin-fit">
          <Reveal className="how-pin-head text-center">
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
            Below `xl` this wrapper is the scroll track the pinned body reads;
            from `xl` up it is a plain block inside the already-pinned panel.
          */}
          <div ref={trackRef} className="max-xl:mt-10 max-xl:pin-scroll">
            <div ref={bodyRef} className="max-xl:pin-body">
              <div className={`max-xl:pin-body-fit ${PIN_NATURAL}`}>
                {/*
                  The one large active-step area.
                  Three blocks — headline copy, product visualisation,
                  supporting capabilities — placed into two columns on a
                  desktop. On a phone they simply flow in DOM order, which is
                  the order the spec asks for: heading, description,
                  visualisation, then features.
                */}
                <div className="flex flex-1 flex-col justify-center rounded-3xl border border-slate-200/70 bg-bg-muted p-3.5 sm:p-6 xl:mt-4 xl:block xl:flex-none xl:p-4">
                  <div className="grid gap-3.5 sm:gap-6 lg:min-h-[340px] lg:grid-cols-[minmax(0,92fr)_minmax(0,100fr)] lg:grid-rows-[1fr_auto_auto_1fr] lg:items-center lg:gap-x-12 lg:gap-y-3">
                    <div className="lg:col-start-1 lg:row-start-2">
                      {/*
                        Keyed, and animated on the way in only. An exit
                        animation would have to finish before the next step
                        could be mounted, and scrolling crosses steps faster
                        than that: a stroke that passed two boundaries showed
                        01 then 03, with the step between them never drawn.
                      */}
                      <motion.div
                        key={step.id}
                        initial={enter}
                        animate={{ opacity: 1, y: 0 }}
                        transition={transition}
                        className="ve-reveal"
                      >
                          {/* The full pill costs a line of its own, which a
                              phone panel does not have. There the number rides
                              on the category line instead, drawn as the node
                              the desktop rail uses for the step it is on. */}
                          <span className="hidden items-center rounded-full border border-teal-500/30 bg-white px-3.5 py-1.5 text-sm font-bold tracking-wide text-teal-600 uppercase lg:inline-flex">
                            Step {step.number.replace(/^0/, "")} of {steps.length}
                          </span>
                          <p className="flex items-center gap-2.5 text-base font-semibold tracking-wide text-teal-600 uppercase lg:mt-4">
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white lg:hidden">
                              {step.number}
                            </span>
                            {step.category}
                          </p>
                          <h3 className="font-display mt-1.5 text-2xl font-bold tracking-tight text-ink-900 sm:mt-2 sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]">
                            {step.title}
                          </h3>
                          <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-600 sm:mt-3 sm:text-lg lg:min-h-[5rem] lg:text-[1.2rem] lg:leading-[1.6]">
                            {step.description}
                          </p>
                      </motion.div>
                    </div>

                    <div className="flex items-center justify-center sm:min-h-[300px] lg:col-start-2 lg:row-span-4 lg:row-start-1">
                      {/* Visualisations come in with a touch of scale rather
                          than the vertical move the copy uses. */}
                      <motion.div
                        key={step.id}
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={transition}
                        className="ve-reveal flex w-full justify-center"
                      >
                        <StepVisual id={step.id} />
                      </motion.div>
                    </div>

                    <div className="lg:col-start-1 lg:row-start-3">
                      <motion.div
                        key={step.id}
                        initial={enter}
                        animate={{ opacity: 1, y: 0 }}
                        transition={transition}
                        className="ve-reveal"
                      >
                          {/* Chips on a phone, where they have to sit two to a
                              row without reading as a list; the desktop row of
                              large icon and label is unchanged. */}
                          <ul className="flex flex-wrap gap-2 lg:gap-x-6 lg:gap-y-3">
                            {step.features.map((feature) => (
                              <li
                                key={feature.label}
                                className="flex items-center gap-2 rounded-full bg-white px-3 py-0.5 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0"
                              >
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mint-100 text-teal-600 lg:size-9">
                                  <feature.icon className="size-4 lg:size-4.5" strokeWidth={1.75} />
                                </span>
                                <span className="text-base font-semibold text-ink-900">{feature.label}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 hidden items-start gap-3 rounded-2xl border border-mint-100 bg-bg-mint-50 px-4 py-3 lg:flex">
                            <SparkMark />
                            <p className="text-base leading-relaxed text-slate-600">{step.callout}</p>
                          </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <Timeline steps={steps} active={active} onSelect={goTo} />
                <PinRail
                  labels={steps.map((s) => s.title)}
                  active={active}
                  onSelect={goTo}
                  groupLabel="Verification workflow steps"
                  className="mt-4 lg:hidden"
                />
              </div>
            </div>
          </div>
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
