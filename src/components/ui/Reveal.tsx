"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/*
 * Entrance animations.
 *
 * Every wrapper here carries the `ve-reveal` class. The hidden state is
 * server-rendered as `opacity: 0`, so without JavaScript nothing would ever
 * reveal it; a <noscript> rule in the root layout keys off that class and
 * paints these blocks in their finished state instead.
 */
const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
  /**
   * For the hero block that holds the page's <h1>. The same rise and fade,
   * but run by CSS from the first paint instead of waiting for JavaScript to
   * load and hydrate — on a phone that wait held the headline invisible for
   * about three seconds and was most of the page's Largest Contentful Paint.
   */
  immediate?: boolean;
}) {
  if (immediate) {
    const Tag = as;
    return (
      <Tag
        className={`ve-reveal-immediate ${className}`}
        style={delay ? { animationDelay: `${delay}s` } : undefined}
      >
        {children}
      </Tag>
    );
  }

  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`ve-reveal ${className}`}
    >
      {children}
    </MotionTag>
  );
}

/** Stagger wrapper: give each direct motion child an increasing delay. */
export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.08 }}
      className={`ve-reveal ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`ve-reveal ${className}`}
    >
      {children}
    </motion.div>
  );
}
