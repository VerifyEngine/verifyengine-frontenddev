"use client";

import { useCallback, useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

/**
 * Drives a pinned section: one panel held on screen while the page scroll
 * moves it through a fixed number of states.
 *
 * Pair it with the `pin-*` utilities in globals.css — `trackRef` goes on the
 * element carrying `pin-scroll` and `bodyRef` on the one carrying `pin-body`.
 * `query` is the width at which that layout is the one on screen, so a section
 * with a different desktop composition can drive itself some other way without
 * the two fighting over the scroll position.
 *
 * Progress is measured against the body's own height rather than
 * `window.innerHeight`, which is the whole reason this is shared code: the
 * panel is sized in `svh` and keeps its height when a phone's browser bars
 * slide away, while `innerHeight` grows by around 80px. Measuring against the
 * window would shrink the range under the visitor mid-scroll and shunt the
 * section forward a state for no reason.
 */
export function usePinnedScroll({
  count,
  query,
  offset,
}: {
  /** How many states the track is divided into. */
  count: number;
  /** The media query under which this pinned layout is the one on screen. */
  query: string;
  /** Where the panel sticks, in pixels — normally the site header's height. */
  offset: number;
}): {
  trackRef: RefObject<HTMLDivElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
  active: number;
  setActive: (index: number) => void;
  /** Scrolls the page so `index` is the state on screen. */
  scrollToIndex: (index: number) => void;
} {
  const trackRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const lastIndex = count - 1;

  /** The track's scroll range: everything the body does not already cover. */
  const range = useCallback(() => {
    const track = trackRef.current;
    const body = bodyRef.current;
    if (!track || !body) return 0;
    return track.offsetHeight - body.offsetHeight;
  }, []);

  useMotionValueEvent(scrollY, "change", () => {
    if (!window.matchMedia(query).matches) return;
    const track = trackRef.current;
    const span = range();
    if (!track || span <= 0) return;
    const progress = (offset - track.getBoundingClientRect().top) / span;
    const index = Math.floor(Math.min(1, Math.max(0, progress)) * count);
    setActive(Math.min(lastIndex, index));
  });

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const span = range();
      if (!track || span <= 0) return;
      // The middle of that state's stretch of track, so it is not left sitting
      // on the boundary with the next one.
      const progress = (Math.min(lastIndex, Math.max(0, index)) + 0.5) / count;
      window.scrollTo({
        top: window.scrollY + track.getBoundingClientRect().top - offset + span * progress,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [count, lastIndex, offset, range, reduceMotion],
  );

  return { trackRef, bodyRef, active, setActive, scrollToIndex };
}
