"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PlatformVisual } from "@/components/marketing/PlatformVisual";
import {
  platformFeaturesLeft,
  platformFeaturesRight,
  type PlatformFeature,
  type PlatformTarget,
} from "@/lib/platform-features";

/*
 * The platform composition: capability cards either side of the product, and
 * the link between them.
 *
 * Pointing at (or tab-focusing) a card lights the part of the dashboard that
 * capability produces, fades the rest back, and draws a thin line from the card
 * to it. That link is what carries the section's actual argument — six
 * capabilities running inside one platform, rather than six features listed.
 *
 * It is deliberately an *extra layer*, never the only way to understand the
 * section: every card already states what it does, and with nothing engaged the
 * dashboard sits at full strength. That matters because hover does not exist on
 * touch, so below `lg` — where the cards stack under the product rather than
 * beside it — the whole interaction is simply switched off and the section
 * reads as plain content.
 *
 * Nothing animates on its own. There is no autoplay and no loop; the only
 * motion is the 200ms fade of a state the visitor asked for, and even that is
 * dropped under `prefers-reduced-motion`.
 */

// Where each card sits in the three-column desktop grid. The visual holds the
// middle column across all three rows.
const rows = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3"];

type Point = { x: number; y: number };

export function PlatformShowcase() {
  const [active, setActive] = useState<PlatformTarget | null>(null);
  const [line, setLine] = useState<{ from: Point; to: Point } | null>(null);

  const frameRef = useRef<HTMLDivElement>(null);

  /*
   * The connector is measured rather than positioned in CSS: the card and its
   * target sit in different grid cells whose sizes depend on the viewport, and
   * the dashboard itself is painted through a `zoom`, so only the real boxes
   * know where the two ends actually are.
   */
  const measure = useCallback((target: PlatformTarget | null) => {
    const frame = frameRef.current;
    if (!frame || !target) {
      setLine(null);
      return;
    }
    // The link is only drawn in the three-column layout; below that the card
    // and the product are not side by side and a line would cross the page.
    if (!window.matchMedia("(min-width: 64rem)").matches) {
      setLine(null);
      return;
    }

    const card = frame.querySelector<HTMLElement>(`[data-platform-card="${target}"]`);
    const region = frame.querySelector<HTMLElement>(`[data-platform-target="${target}"]`);
    if (!card || !region) {
      setLine(null);
      return;
    }

    const base = frame.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const t = region.getBoundingClientRect();
    // Which edge each end leaves from, so the line never crosses its own box.
    const fromRight = c.left < t.left;

    setLine({
      from: {
        x: (fromRight ? c.right : c.left) - base.left,
        y: c.top + c.height / 2 - base.top,
      },
      to: {
        x: (fromRight ? t.left : t.right) - base.left,
        y: t.top + t.height / 2 - base.top,
      },
    });
  }, []);

  /*
   * Engaging a card measures the link there and then, in the event that caused
   * it — the two boxes do not depend on the state being set, so there is
   * nothing to wait for and no effect needed.
   */
  const engage = useCallback(
    (target: PlatformTarget | null) => {
      setActive(target);
      measure(target);
    },
    [measure],
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!active || !frame) return;
    // The grid reflows with the window and the mockup rescales with it, so both
    // ends move; re-measure rather than freeze the line where it started.
    const remeasure = () => measure(active);
    const observer = new ResizeObserver(remeasure);
    observer.observe(frame);
    window.addEventListener("scroll", remeasure, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", remeasure);
    };
  }, [active, measure]);

  return (
    <div ref={frameRef} className="relative">
      <Connector line={line} />

      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[minmax(0,7fr)_minmax(0,12fr)_minmax(0,7fr)] lg:grid-rows-3 lg:items-stretch lg:gap-x-8 lg:gap-y-6 xl:gap-x-12">
        <RevealItem className="sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-center">
          <PlatformVisual active={active} />
        </RevealItem>

        {platformFeaturesLeft.map((feature, i) => (
          <RevealItem key={feature.title} className={`lg:col-start-1 ${rows[i]}`}>
            <FeatureCard
              feature={feature}
              active={active}
              onEngage={engage}
            />
          </RevealItem>
        ))}

        {platformFeaturesRight.map((feature, i) => (
          <RevealItem key={feature.title} className={`lg:col-start-3 ${rows[i]}`}>
            <FeatureCard
              feature={feature}
              active={active}
              onEngage={engage}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

/**
 * The line from a card to the dashboard region it produces.
 *
 * Drawn as a flat cubic so it leaves the card horizontally and arrives at the
 * product horizontally, which reads as a connection rather than a diagonal.
 */
function Connector({
  line,
}: {
  line: { from: Point; to: Point } | null;
}) {
  if (!line) return null;
  const { from, to } = line;
  const dir = to.x > from.x ? 1 : -1;
  const reach = Math.abs(to.x - from.x) * 0.45;
  /*
   * When the two ends sit at nearly the same height the plain cubic collapses
   * into a straight horizontal rule, which reads as a strike-through across the
   * dashboard rather than as a link. Bowing the control points upward keeps it
   * reading as a connector; where the ends already differ in height the curve
   * does that on its own and no bow is needed.
   */
  const bow = Math.abs(to.y - from.y) < 32 ? Math.min(56, Math.abs(to.x - from.x) * 0.22) : 0;
  const d = `M ${from.x} ${from.y} C ${from.x + dir * reach} ${from.y - bow}, ${
    to.x - dir * reach
  } ${to.y - bow}, ${to.x} ${to.y}`;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible lg:block"
    >
      <path
        d={d}
        fill="none"
        stroke="var(--color-teal-500)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="5 4"
        className="ve-connector"
      />
      <circle cx={to.x} cy={to.y} r="3.5" fill="var(--color-teal-500)" />
      <circle cx={from.x} cy={from.y} r="3.5" fill="var(--color-teal-500)" />
    </svg>
  );
}

/** One capability card. Same shell on both sides, so the row reads as a set. */
function FeatureCard({
  feature,
  active,
  onEngage,
}: {
  feature: PlatformFeature;
  active: PlatformTarget | null;
  onEngage: (target: PlatformTarget | null) => void;
}) {
  const engaged = active === feature.target;
  return (
    <div
      data-platform-card={feature.target}
      onMouseEnter={() => onEngage(feature.target)}
      onMouseLeave={() => onEngage(null)}
      onFocus={() => onEngage(feature.target)}
      onBlur={() => onEngage(null)}
      /* Focusable so the link is reachable by keyboard, but it is not a control
         — there is nothing to activate, so it stays a plain group. */
      tabIndex={0}
      role="group"
      aria-label={feature.title}
      className={`group flex h-full flex-col gap-4 rounded-2xl border bg-white p-5 shadow-card transition-all duration-200 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none lg:gap-3 ${
        engaged
          ? "-translate-y-0.5 border-teal-500/40 shadow-lg"
          : "border-slate-200/70 hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-lg"
      }`}
    >
      <span
        className={`flex size-14 shrink-0 items-center justify-center rounded-full transition-colors duration-200 motion-reduce:transition-none ${
          engaged ? "bg-teal-500 text-white" : "bg-mint-100 text-teal-600"
        }`}
      >
        <feature.icon className="size-7" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <h3 className="text-xl leading-snug font-bold text-ink-900">{feature.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-slate-600">{feature.description}</p>
      </div>
    </div>
  );
}
