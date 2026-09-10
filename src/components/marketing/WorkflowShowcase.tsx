"use client";

import { motion, useAnimationFrame, useMotionValue, useSpring } from "motion/react";
import {
  IconAdjustmentsHorizontal,
  IconBell,
  IconChartDots3,
  IconBuildingSkyscraper,
  IconFileAnalytics,
  IconFileCheck,
  IconHeadset,
  IconPhoneCall,
  IconRefreshDot,
  IconSearch,
  IconShieldCheck,
  IconShieldExclamation,
  IconSquareRoundedPlus,
  IconStarFilled,
  IconTablePlus,
  IconUserCheck,
  IconUserDollar,
  IconUserPlus,
  IconWaveSine,
  IconX,
} from "@tabler/icons-react";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ShieldMark } from "@/components/layout/Logo";

/*
 * The homepage hero mock, rebuilt 2026-08-21 to actually read as the
 * signed-in platform (Milestones 5-6) rather than a generic app window.
 *
 * The platform's visual signature is structural, not just chromatic, so the
 * old browser chrome (traffic-light dots, URL bar, icon rail) is gone and the
 * real shell is reproduced instead: a full-width Top Nav panel above a
 * separate Side Menu panel and content, each a mint-hairline glass panel
 * floating on the canvas with 8px gaps — matching Figma node 18045:1125
 * (Dashboard, Light Mode).
 *
 * Light, not dark: the hero sits on bg-navy-900, so a light mock reads as a
 * real product screenshot rather than decoration blending into the section,
 * and light is the theme the platform actually boots into.
 *
 * It uses the platform's own tokens (the `app-` Tailwind utilities from
 * src/styles/platform.css, already global via globals.css), Satoshi, and the
 * Tabler icon set. `data-ve-theme="light"` sits on this component's own
 * wrapper rather than <html>, so those tokens resolve without the platform's
 * ThemeScript or session: this is a static marketing snapshot, and stays a
 * site-only component (nothing is imported from src/components/platform).
 */

// The order the client signed off on. It is the same order the How It Works
// section walks through, so the two never disagree.
const steps = [
  { icon: IconUserPlus, title: "Applicant Submitted", desc: "Information received and verification initiated" },
  { icon: IconShieldExclamation, title: "Fraud Detection", desc: "Advanced fraud and risk detection" },
  { icon: IconUserCheck, title: "Human QA Review", desc: "Experts review and ensure accuracy" },
  { icon: IconPhoneCall, title: "AI Calls Previous Landlord", desc: "AI voice agent contacts the previous landlord" },
  { icon: IconWaveSine, title: "Dynamic Interview", desc: "Natural conversation gathers detailed rental history" },
  { icon: IconAdjustmentsHorizontal, title: "Client Rules Applied", desc: "Verified results are evaluated against your screening rules" },
  { icon: IconFileCheck, title: "Report Delivered", desc: "Complete, accurate report delivered instantly" },
];

// Split the way the design does: the tenancy facts first, then the assessed
// outcomes below a divider.
// `revealAt` is the step index that fills each row in, so the report builds
// itself in step with the workflow above: the address comes off the
// application, the fraud verdict off the fraud-detection step, and everything
// the landlord says only appears once the call is under way.
const reportFacts = [
  { label: "Previous Address", value: "123 Main St, Anytown, CA", revealAt: 0 },
  { label: "Tenancy Period", value: "Jan 2022 – Dec 2023", revealAt: 3 },
  { label: "Rent Amount", value: "$1,600 / month", revealAt: 4 },
];

const reportOutcomes = [
  { label: "Payment History", value: "On Time", revealAt: 4 },
  { label: "Lease Compliance", value: "Compliant", revealAt: 5 },
  { label: "Fraud Risk", value: "Low Risk", revealAt: 1 },
  { label: "Overall Rating", value: "stars", revealAt: 6 },
];

/** Mirrors the real Side Menu's sections (Figma node 18105:4682). */
const navSections = [
  {
    heading: "Workspace",
    items: [
      { label: "Dashboard", icon: IconChartDots3, active: true },
      { label: "Analytics", icon: IconFileAnalytics },
    ],
  },
  {
    heading: "Order",
    items: [
      { label: "New Order", icon: IconSquareRoundedPlus },
      { label: "Batch Order", icon: IconTablePlus },
    ],
  },
  {
    heading: "Admin",
    items: [
      { label: "Clients", icon: IconUserDollar },
      { label: "Company", icon: IconBuildingSkyscraper },
    ],
  },
];

const STEP_DURATION = 2600;

export function WorkflowShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const elapsed = useRef(0);
  const lastTick = useRef<number | null>(null);

  // Subtle cursor-driven 3D tilt on the shell — spring-smoothed so it settles
  // instead of snapping straight to the pointer.
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

  // The metric band counts up with the workflow, so the mock reads as live.
  const verified = 6210 + active * 3;

  return (
    <div
      data-ve-theme="light"
      className="mock-type font-app relative pt-8 pb-10 sm:pt-10 sm:pb-14"
      style={{ perspective: 1400, "--mock-type-lg": 1.2 } as CSSProperties}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-app-brand2-40 blur-[110px]" />

      {/* floating "live activity" toast, bobbing gently above the top-right corner */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 right-6 z-20 hidden items-center gap-2.5 rounded-app-l border-w-2xs border-app-line-brand2 bg-[var(--ve-canvas)] py-2.5 pr-4 pl-2.5 shadow-2xl sm:flex"
      >
        <span className="flex size-7 items-center justify-center rounded-app-12xl bg-app-brand2-64 text-app-text-brand1">
          <IconShieldCheck size={16} stroke={1.6} aria-hidden />
        </span>
        <div>
          <p className="text-body-2xs font-medium text-app-text">Verification completed</p>
          <p className="text-body-2xs text-app-text-tertiary">2 seconds ago</p>
        </div>
      </motion.div>

      {/*
        The platform shell: canvas, 8px gaps, floating glass panels.

        The shell keeps this composition at every width — `mock-fit` scales it
        down rather than letting it reflow, so the narrow layouts a phone would
        otherwise pick never apply. The wrapper is what `mock-fit` measures, so
        it has to be the container; it is a separate element from the padded box
        above so the glow and the toast stay outside the measurement.
      */}
      <div
        className="@container relative z-10"
        /* The full-bleed hero hands this mockup a much wider column than its
           780px native composition needs, and it is meant to read as a large
           product screenshot. Letting `mock-fit` scale past 1 fills that column:
           the whole screenshot grows together, so the proportions stay the ones
           that were approved, only larger. The property is set here, on the
           element `mock-fit` measures, and inherits into it. */
        style={{ "--mock-max-zoom": 1.45 } as CSSProperties}
      >
        <motion.div
          onMouseMove={handleTiltMove}
          onMouseLeave={handleTiltLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="mock-fit flex flex-col gap-2 overflow-hidden rounded-app-xl bg-[var(--ve-canvas)] p-2 shadow-2xl"
        >
          <TopNav />

          <div className="flex gap-2">
            {/* The side menu is the first thing a real phone layout drops. */}
            <SideMenu />

            <div className="flex min-w-px flex-1 flex-col gap-2">
              <MetricBand verified={verified} />

              {/*
                One column on a phone, where the two panels side by side would
                be 180px each. The report panel is the one that gives way: the
                workflow is what the hero is about, and stacking both would make
                the mockup taller than the phone screen.
              */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.1fr_1fr]">
                {/* workflow steps */}
                <section className="flex flex-col gap-3 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]">
                  <h3 className="text-label-xs text-app-text-brand1">
                    Landlord Verification Workflow
                  </h3>

                  <div className="relative">
                    <div className="absolute top-1 bottom-1 left-[13px] w-px bg-app-line" />
                    <motion.div
                      className="absolute top-1 left-[13px] w-px bg-app-brand1"
                      animate={{ height: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    <ol className="flex flex-col gap-0.5">
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
                                backgroundColor: isActive
                                  ? "var(--ve-surface-fade-48)"
                                  : "rgba(255,255,255,0)",
                              }}
                              whileHover={{ backgroundColor: "var(--ve-surface-fade-48)" }}
                              transition={{ duration: 0.35 }}
                              className="flex w-full cursor-pointer items-start gap-2.5 rounded-app-m px-2 py-2 text-left"
                            >
                              <span
                                className={`relative z-10 mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-app-12xl text-body-2xs font-bold transition-colors ${
                                  isActive || isDone
                                    ? "bg-app-brand1 text-app-text-inverse"
                                    : "bg-app-fade-48 text-app-text-tertiary"
                                }`}
                              >
                                {i + 1}
                              </span>
                              <Icon
                                className={`mt-0.5 shrink-0 ${isActive ? "text-app-text-brand1" : "text-app-text-tertiary"}`}
                                size={15}
                                stroke={1.6}
                                aria-hidden
                              />
                              <span className="min-w-px flex-1">
                                <span
                                  className={`block text-label-2xs ${isActive ? "text-app-text" : "text-app-text-secondary"}`}
                                >
                                  {step.title}
                                </span>
                                <span className="block text-body-2xs text-app-text-tertiary">
                                  {step.desc}
                                </span>
                              </span>
                            </motion.button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </section>

                {/* verification report */}
                <section className="hidden flex-col gap-3 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px] sm:flex">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-label-xs text-app-text-brand1">Verification Report</h3>
                    <motion.span
                      key={delivered ? "verified" : "progress"}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-app-4xl px-2 py-1 text-body-2xs whitespace-nowrap ${
                        delivered
                          ? "bg-app-success text-app-text-inverse"
                          : "bg-app-neutral text-app-text-inverse"
                      }`}
                    >
                      {delivered ? "Verified" : "In Progress"}
                    </motion.span>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-app-l border-w-2xs border-app-line bg-app-fade-48 p-3">
                    <div className="size-8 shrink-0 rounded-app-12xl bg-gradient-to-br from-app-brand2-64 to-app-brand1" />
                    <div>
                      <p className="text-label-2xs text-app-text">John Smith</p>
                      <p className="text-body-2xs text-app-text-tertiary">Applicant ID #48213</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {reportFacts.map((row) => (
                      <ReportRow key={row.label} label={row.label} revealed={active >= row.revealAt}>
                        <span className="text-body-2xs text-app-text">{row.value}</span>
                      </ReportRow>
                    ))}
                  </div>

                  <div className="h-px bg-app-line" />

                  <div className="flex flex-col gap-2.5">
                    {reportOutcomes.map((row) => (
                      <ReportRow key={row.label} label={row.label} revealed={active >= row.revealAt}>
                        {row.value === "stars" ? (
                          <span className="flex gap-0.5 text-app-success">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <IconStarFilled key={i} size={12} aria-hidden />
                            ))}
                          </span>
                        ) : (
                          <span className="text-body-2xs text-app-success">{row.value}</span>
                        )}
                      </ReportRow>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between rounded-app-l border-w-2xs border-app-line bg-app-fade-48 p-3">
                    <div>
                      <p className="text-body-2xs text-app-text-tertiary">Verification Score</p>
                      <p className="text-heading-s text-app-text-brand1">
                        {score}
                        <span className="text-body-2xs text-app-text-tertiary"> / 100</span>
                      </p>
                    </div>
                    <ScoreRing score={score} />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** Full-width Top Nav panel, as the platform draws it (Figma node 18110:24717). */
function TopNav() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-2 backdrop-blur-[12px] sm:justify-start">
      <span className="flex shrink-0 items-center gap-1.5 px-2">
        <ShieldMark className="size-5" />
        <span className="text-label-xs whitespace-nowrap text-app-text">
          <span className="text-app-text-brand1">Verify</span>Engine
        </span>
      </span>

      {/* The search field and the organisation switcher are what a phone-width
          app bar leaves out — without them the row fits, with them it spills. */}
      <span className="hidden min-w-px flex-1 items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-48 px-3 py-2 sm:flex">
        <IconSearch size={15} stroke={1.6} className="shrink-0 text-app-text" aria-hidden />
        <span className="min-w-px flex-1 truncate text-body-2xs text-app-text-tertiary">
          Search by keywords...
        </span>
        <IconX size={12} stroke={1.6} className="shrink-0 text-app-text" aria-hidden />
      </span>

      <span className="flex shrink-0 items-center gap-1">
        {[IconHeadset, IconBell].map((Icon, i) => (
          <span
            key={i}
            className="flex size-8 items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 text-app-text"
          >
            <Icon size={15} stroke={1.6} aria-hidden />
          </span>
        ))}
        <span className="hidden items-center gap-1.5 rounded-app-7xl border-w-2xs border-app-line bg-app-brand2-40 py-1.5 pr-3 pl-2 sm:flex">
          <IconRefreshDot size={15} stroke={1.6} className="shrink-0 text-app-text" aria-hidden />
          <span className="block">
            <span className="block text-body-2xs whitespace-nowrap text-app-text">
              CutRite Lawn Care
            </span>
            <span className="block text-body-2xs whitespace-nowrap text-app-text-secondary">
              Switch Organization
            </span>
          </span>
        </span>
        <span className="size-8 shrink-0 rounded-app-12xl border-w-2xs border-app-line bg-gradient-to-br from-app-brand2-64 to-app-brand1" />
      </span>
    </div>
  );
}

/** Side Menu panel — grouped rows under uppercase section headings. */
function SideMenu() {
  return (
    <nav className="hidden w-40 shrink-0 flex-col gap-3 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 px-2 py-3 backdrop-blur-[12px] sm:flex">
      {navSections.map((section) => (
        <div key={section.heading} className="flex flex-col gap-1">
          <p className="px-2 text-nav-heading text-app-text">{section.heading}</p>
          <div className="flex flex-col overflow-hidden rounded-app-l border-w-2xs border-app-line">
            {section.items.map((item) => (
              <span
                key={item.label}
                className={`flex items-center gap-2 border-w-2xs border-app-line px-2.5 py-2 ${
                  item.active
                    ? "bg-app-brand1-16 text-app-nav-active"
                    : "bg-app-fade-48 text-app-text"
                }`}
              >
                <item.icon size={15} stroke={1.6} className="shrink-0" aria-hidden />
                <span className="truncate text-body-2xs">{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

/**
 * The metric band the real Dashboard opens with, figures in Text/Brand 1 as
 * the light Figma frame draws them.
 */
function MetricBand({ verified }: { verified: number }) {
  const metrics = [
    { label: "Pending Verification", value: "1,248", delta: "+6.4%" },
    { label: "In Progress", value: "781", delta: "+8.4%" },
    { label: "Verified", value: verified.toLocaleString("en-US"), delta: "+6.4%" },
    { label: "Avg. Completion", value: "14.2", unit: "hrs", delta: "-8.4%", down: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col justify-between gap-1.5 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3 backdrop-blur-[12px]"
        >
          <p className="truncate text-body-2xs text-app-text-secondary">{metric.label}</p>
          <p className="flex items-end gap-1">
            <span className="text-heading-s whitespace-nowrap text-app-text-brand1">{metric.value}</span>
            {metric.unit ? (
              <span className="pb-0.5 text-body-2xs text-app-text-secondary">{metric.unit}</span>
            ) : null}
            <span
              className={`pb-0.5 text-body-2xs whitespace-nowrap ${
                metric.down ? "text-app-warning" : "text-app-success"
              }`}
            >
              {metric.delta}
            </span>
          </p>
        </div>
      ))}
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
    <div className="flex items-center justify-between gap-2">
      <span className="text-body-2xs text-app-text-tertiary">{label}</span>
      {revealed ? (
        <motion.span initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}>
          {children}
        </motion.span>
      ) : (
        <span className="h-2.5 w-20 rounded-app-4xl bg-app-fade-48" />
      )}
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg viewBox="0 0 44 44" className="size-11 -rotate-90">
      <circle cx="22" cy="22" r={r} fill="none" stroke="var(--ve-surface-fade-40)" strokeWidth="5" />
      <motion.circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="var(--ve-surface-brand1)"
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
