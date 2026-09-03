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
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}) {
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
