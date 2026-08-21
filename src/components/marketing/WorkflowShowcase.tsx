"use client";

import { motion, useAnimationFrame, useMotionValue, useSpring } from "motion/react";
import {
  IconUserPlus,
  IconPhoneCall,
  IconWaveSine,
  IconClipboardCheck,
  IconShieldExclamation,
  IconUserCheck,
  IconStarFilled,
  IconFileCheck,
  IconShieldCheck,
  IconChartDots3,
  IconPhone,
  IconClock,
  IconFileText,
  IconTools,
} from "@tabler/icons-react";
import { useRef, useState, type MouseEvent } from "react";

/*
 * The homepage hero mock. Restyled 2026-08-21 to look like the platform's
 * own dark mode (Milestones 5-6) instead of an unrelated navy/teal palette:
 * same tokens (the `app-` Tailwind utilities from src/styles/platform.css),
 * same Satoshi font and Tabler icon set as the real Top Nav / Side Menu /
 * MetricCard. `data-ve-theme="dark"` is set on the wrapper (not <html>) so
 * those tokens resolve here without the platform's ThemeScript/session —
 * this is a static marketing snapshot, not the real app, and stays a
 * site-only component (no import from src/components/platform).
 */

const steps = [
  { icon: IconUserPlus, title: "Applicant Submitted", desc: "Information received and verification initiated" },
  { icon: IconPhoneCall, title: "AI Calls Previous Landlord", desc: "AI voice agent contacts the previous landlord" },
  { icon: IconWaveSine, title: "Dynamic Interview", desc: "AI conducts natural conversation and gathers detailed rental history" },
  { icon: IconClipboardCheck, title: "Responses Validated", desc: "AI validates answers and cross-checks data" },
  { icon: IconShieldExclamation, title: "Fraud Detection", desc: "Advanced fraud and risk detection" },
  { icon: IconUserCheck, title: "Human QA Review", desc: "Experts review and ensure accuracy" },
  { icon: IconFileCheck, title: "Verification Report Delivered", desc: "Complete, accurate report delivered instantly" },
];

// Split the way the design does: the tenancy facts first, then the assessed
// outcomes below a divider.
const reportFacts = [
  { label: "Previous Address", value: "123 Main St, Anytown, CA", revealAt: 1 },
  { label: "Tenancy Period", value: "Jan 2022 – Dec 2023", revealAt: 2 },
  { label: "Rent Amount", value: "$1,600 / month", revealAt: 3 },
];

const reportOutcomes = [
  { label: "Payment History", value: "On Time", revealAt: 3 },
  { label: "Lease Compliance", value: "Compliant", revealAt: 4 },
  { label: "Fraud Risk", value: "Low Risk", revealAt: 5 },
  { label: "Overall Rating", value: "stars", revealAt: 5 },
];

const railIcons = [IconShieldCheck, IconChartDots3, IconPhone, IconClock, IconFileText, IconTools];

const STEP_DURATION = 2600;

export function WorkflowShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const elapsed = useRef(0);
  const lastTick = useRef<number | null>(null);

  // Subtle cursor-driven 3D tilt on the window card — spring-smoothed so it
  // settles instead of snapping straight to the pointer.
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  function handleTiltMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(py * -6);
  }

  function handleTiltLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  useAnimationFrame((t) => {
    if (paused) {
      lastTick.current = null;
      return;
    }
    if (lastTick.current === null) lastTick.current = t;
    elapsed.current += t - lastTick.current;
    lastTick.current = t;
    if (elapsed.current >= STEP_DURATION) {
      elapsed.current = 0;
      setActive((v) => (v + 1) % steps.length);
    }
  });

  function selectStep(i: number) {
    setActive(i);
    elapsed.current = 0;
    setPaused(true);
    window.setTimeout(() => setPaused(false), 4000);
  }

  const progress = ((active + 1) / steps.length) * 100;
  const score = Math.round(((active + 1) / steps.length) * 92);
  const delivered = active === steps.length - 1;

  return (
    <div
      data-ve-theme="dark"
      className="font-app relative pt-8 pb-10 pl-6 sm:pt-10 sm:pb-14 sm:pl-10"
      style={{ perspective: 1400 }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-app-brand2-40 blur-[110px]" />

      {/* floating mini chart card, peeking from behind bottom-left */}
      <div className="absolute bottom-0 left-0 z-0 hidden w-44 rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 shadow-2xl backdrop-blur-[12px] sm:block">
        <p className="text-label-2xs text-app-text-secondary">Payment History</p>
        <div className="mt-3 flex h-14 items-end gap-1.5">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              className="flex-1 rounded-app-xs bg-app-brand2-64"
            />
          ))}
        </div>
      </div>

      {/* floating "live activity" toast, bobbing gently above the top-right corner */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 right-6 z-20 hidden items-center gap-2.5 rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 py-2.5 pr-4 pl-2.5 shadow-2xl backdrop-blur-[12px] sm:flex"
      >
        <span className="flex size-7 items-center justify-center rounded-app-12xl bg-app-brand2-40 text-app-text-brand2">
          <IconShieldCheck size={16} stroke={1.6} aria-hidden />
        </span>
        <div>
          <p className="text-label-2xs text-app-text">Verification completed</p>
          <p className="text-body-2xs text-app-text-tertiary">2 seconds ago</p>
        </div>
      </motion.div>

      {/* main app window */}
      <motion.div
        onMouseMove={handleTiltMove}
        onMouseLeave={handleTiltLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-surface shadow-2xl backdrop-blur-[12px]"
      >
        {/* Top Nav-style browser chrome */}
        <div className="flex items-center gap-3 border-b border-app-line bg-app-brand2-16 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-app-fade-48" />
            <span className="size-2.5 rounded-full bg-app-fade-48" />
            <span className="size-2.5 rounded-full bg-app-fade-48" />
          </div>
          <div className="ml-2 flex-1 truncate rounded-app-m bg-app-fade-40 px-3 py-1 text-body-2xs text-app-text-tertiary">
            app.verifyengine.ai/workflow
          </div>
          <span className="hidden rounded-app-4xl bg-app-brand2-40 px-2.5 py-1 text-body-2xs font-semibold text-app-text-brand1 sm:inline">
            Live
          </span>
        </div>

        <div className="flex">
          {/* Side Menu-style icon rail */}
          <div className="hidden w-14 shrink-0 flex-col items-center gap-5 border-r border-app-line py-6 sm:flex">
            {railIcons.map((Icon, i) => (
              <div
                key={i}
                className={`flex size-8 items-center justify-center rounded-app-m ${
                  i === 0 ? "bg-app-brand1-16 text-app-nav-active" : "text-app-text-tertiary"
                }`}
              >
                <Icon size={16} stroke={1.6} aria-hidden />
              </div>
            ))}
          </div>

          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
            {/* workflow steps */}
            <div className="relative p-5 sm:p-6">
              <p className="text-nav-heading text-app-text-secondary">
                Landlord Verification Workflow
              </p>

              <div className="relative mt-4">
                <div className="absolute top-1 bottom-1 left-[15px] w-px bg-app-line" />
                <motion.div
                  className="absolute top-1 left-[15px] w-px bg-app-brand2-64"
                  animate={{ height: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                <ol className="space-y-1">
                  {steps.map((step, i) => {
                    const Icon = step.icon;
                    const isActive = i === active;
                    const isDone = i < active;
                    return (
                      <li key={step.title}>
                        <motion.button
                          type="button"
                          onClick={() => selectStep(i)}
                          animate={{
                            backgroundColor: isActive ? "var(--ve-surface-brand2-16)" : "rgba(255,255,255,0)",
                          }}
                          whileHover={{
                            backgroundColor: isActive ? "var(--ve-surface-brand2-40)" : "var(--ve-surface-fade-40)",
                          }}
                          transition={{ duration: 0.35 }}
                          className="flex w-full cursor-pointer items-start gap-3 rounded-app-l px-3 py-2.5 text-left"
                        >
                          <span
                            className={`relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-app-12xl text-body-2xs font-bold transition-colors ${
                              isActive || isDone
                                ? "bg-app-brand2-64 text-app-text-brand1"
                                : "bg-app-fade-40 text-app-text-tertiary"
                            }`}
                          >
                            {i + 1}
                          </span>
                          <Icon
                            className={isActive ? "text-app-text-brand2 mt-0.5 shrink-0" : "text-app-text-tertiary mt-0.5 shrink-0"}
                            size={16}
                            stroke={1.6}
                            aria-hidden
                          />
                          <div>
                            <p className={`text-label-2xs ${isActive ? "text-app-text" : "text-app-text-secondary"}`}>
                              {step.title}
                            </p>
                            <p className="text-body-2xs text-app-text-tertiary">{step.desc}</p>
                          </div>
                        </motion.button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* verification report */}
            <div className="flex flex-col gap-4 border-t border-app-line bg-app-fade-40 p-5 sm:p-6 lg:border-t-0 lg:border-l">
              <div className="flex items-center justify-between">
                <p className="text-label-xs text-app-text">Verification Report</p>
                <motion.span
                  key={delivered ? "verified" : "progress"}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-app-4xl px-2.5 py-1 text-body-2xs font-semibold ${
                    delivered
                      ? "bg-app-brand2-40 text-app-text-brand1"
                      : "bg-app-fade-48 text-app-text-secondary"
                  }`}
                >
                  {delivered ? "✓ Verified" : "In Progress"}
                </motion.span>
              </div>

              <div className="flex items-center gap-3 rounded-app-l bg-app-fade-48 p-3">
                <div className="size-9 shrink-0 rounded-app-12xl bg-gradient-to-br from-app-brand2-64 to-app-brand1" />
                <div>
                  <p className="text-label-2xs text-app-text">John Smith</p>
                  <p className="text-body-2xs text-app-text-tertiary">Applicant ID #48213</p>
                </div>
              </div>

              <div className="space-y-3 text-body-2xs">
                {reportFacts.map((row) => (
                  <ReportRow key={row.label} label={row.label} revealed={active >= row.revealAt}>
                    <span className="font-medium text-app-text">{row.value}</span>
                  </ReportRow>
                ))}
              </div>

              <div className="h-px bg-app-line" />

              <div className="space-y-3 text-body-2xs">
                {reportOutcomes.map((row) => (
                  <ReportRow key={row.label} label={row.label} revealed={active >= row.revealAt}>
                    {row.value === "stars" ? (
                      <span className="flex gap-0.5 text-app-text-brand2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IconStarFilled key={i} size={14} aria-hidden />
                        ))}
                      </span>
                    ) : (
                      <span className="font-medium text-app-text-brand2">{row.value}</span>
                    )}
                  </ReportRow>
                ))}
              </div>

              <div className="h-px bg-app-line" />

              <div className="mt-auto flex items-center justify-between rounded-app-l bg-app-fade-48 p-4">
                <div>
                  <p className="text-body-2xs text-app-text-tertiary">Verification Score</p>
                  <p className="text-heading-s text-app-text">
                    {score}
                    <span className="text-label-2xs text-app-text-tertiary"> / 100</span>
                  </p>
                </div>
                <ScoreRing score={score} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <NetworkDecoration />
    </div>
  );
}

function ReportRow({
  label,
  revealed,
  children,
}: {
  label: string;
  revealed: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-app-text-tertiary">{label}</span>
      {revealed ? (
        <motion.span initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}>
          {children}
        </motion.span>
      ) : (
        <span className="h-3 w-20 rounded-app-4xl bg-app-fade-40" />
      )}
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg viewBox="0 0 48 48" className="size-12 -rotate-90">
      <circle cx="24" cy="24" r={r} fill="none" stroke="var(--ve-surface-fade-40)" strokeWidth="5" />
      <motion.circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="var(--ve-text-brand2)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
}

function NetworkDecoration() {
  const nodes = [
    [20, 6],
    [70, 2],
    [130, 10],
    [190, 4],
    [240, 12],
  ];
  return (
    <svg
      viewBox="0 0 260 16"
      className="pointer-events-none absolute -bottom-2 left-8 hidden h-6 w-64 opacity-40 sm:block"
      fill="none"
    >
      <path
        d={`M${nodes.map((n) => n.join(",")).join(" L")}`}
        stroke="var(--ve-text-brand2)"
        strokeWidth="0.75"
        strokeDasharray="2 3"
      />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="var(--ve-text-brand2)" />
      ))}
    </svg>
  );
}
