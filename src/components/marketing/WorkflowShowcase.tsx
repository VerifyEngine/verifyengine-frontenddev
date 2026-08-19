"use client";

import { motion, useAnimationFrame, useMotionValue, useSpring } from "motion/react";
import {
  UserPlus,
  PhoneCall,
  AudioLines,
  ClipboardCheck,
  ShieldAlert,
  UserRoundCheck,
  Star,
  FileCheck2,
  ShieldCheck,
  LayoutGrid,
  Phone,
  Clock,
  FileText,
  Settings,
} from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";

const steps = [
  { icon: UserPlus, title: "Applicant Submitted", desc: "Information received and verification initiated" },
  { icon: PhoneCall, title: "AI Calls Previous Landlord", desc: "AI voice agent contacts the previous landlord" },
  { icon: AudioLines, title: "Dynamic Interview", desc: "AI conducts natural conversation and gathers detailed rental history" },
  { icon: ClipboardCheck, title: "Responses Validated", desc: "AI validates answers and cross-checks data" },
  { icon: ShieldAlert, title: "Fraud Detection", desc: "Advanced fraud and risk detection" },
  { icon: UserRoundCheck, title: "Human QA Review", desc: "Experts review and ensure accuracy" },
  { icon: FileCheck2, title: "Verification Report Delivered", desc: "Complete, accurate report delivered instantly" },
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

const railIcons = [ShieldCheck, LayoutGrid, Phone, Clock, FileText, Settings];

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
    <div className="relative pt-8 pb-10 pl-6 sm:pt-10 sm:pb-14 sm:pl-10" style={{ perspective: 1400 }}>
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/25 blur-[110px]" />

      {/* floating mini chart card, peeking from behind bottom-left */}
      <div className="absolute bottom-0 left-0 z-0 hidden w-44 rounded-xl border border-white/10 bg-navy-800/95 p-4 shadow-2xl backdrop-blur sm:block">
        <p className="text-[11px] font-medium text-white/50">Payment History</p>
        <div className="mt-3 flex h-14 items-end gap-1.5">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              className="flex-1 rounded-sm bg-teal-500/70"
            />
          ))}
        </div>
      </div>

      {/* floating "live activity" toast, bobbing gently above the top-right corner */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 right-6 z-20 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-navy-800/95 py-2.5 pr-4 pl-2.5 shadow-2xl backdrop-blur sm:flex"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-mint-200/15 text-mint-200">
          <ShieldCheck className="size-3.5" strokeWidth={2} />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">Verification completed</p>
          <p className="text-[10px] text-white/40">2 seconds ago</p>
        </div>
      </motion.div>

      {/* main app window */}
      <motion.div
        onMouseMove={handleTiltMove}
        onMouseLeave={handleTiltLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-navy-800/95 shadow-2xl backdrop-blur-sm">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-white/5 bg-navy-900/70 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <div className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/35">
            app.verifyengine.ai/workflow
          </div>
          <span className="hidden rounded-full bg-mint-200/15 px-2.5 py-1 text-[10px] font-semibold text-mint-200 sm:inline">
            Live
          </span>
        </div>

        <div className="flex">
          {/* icon rail */}
          <div className="hidden w-14 shrink-0 flex-col items-center gap-5 border-r border-white/5 py-6 sm:flex">
            {railIcons.map((Icon, i) => (
              <div
                key={i}
                className={`flex size-8 items-center justify-center rounded-lg ${
                  i === 0 ? "bg-mint-200/15 text-mint-200" : "text-white/30"
                }`}
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </div>
            ))}
          </div>

          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
            {/* workflow steps */}
            <div className="relative p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-wide text-white/40 uppercase">
                Landlord Verification Workflow
              </p>

              <div className="relative mt-4">
                <div className="absolute top-1 bottom-1 left-[15px] w-px bg-white/10" />
                <motion.div
                  className="absolute top-1 left-[15px] w-px bg-teal-400"
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
                            backgroundColor: isActive ? "rgba(143,233,217,0.1)" : "rgba(255,255,255,0)",
                          }}
                          whileHover={{
                            backgroundColor: isActive ? "rgba(143,233,217,0.12)" : "rgba(255,255,255,0.04)",
                          }}
                          transition={{ duration: 0.35 }}
                          className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 text-left"
                        >
                          <span
                            className={`relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                              isActive || isDone ? "bg-teal-400 text-navy-900" : "bg-white/10 text-white/40"
                            }`}
                          >
                            {i + 1}
                          </span>
                          <Icon
                            className={`mt-0.5 size-4 shrink-0 ${isActive ? "text-mint-200" : "text-white/30"}`}
                            strokeWidth={1.75}
                          />
                          <div>
                            <p className={`text-sm font-semibold ${isActive ? "text-white" : "text-white/50"}`}>
                              {step.title}
                            </p>
                            <p className="text-xs text-white/30">{step.desc}</p>
                          </div>
                        </motion.button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* verification report */}
            <div className="flex flex-col gap-4 border-t border-white/5 bg-white/[0.03] p-5 sm:p-6 lg:border-t-0 lg:border-l">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Verification Report</p>
                <motion.span
                  key={delivered ? "verified" : "progress"}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    delivered ? "bg-mint-200/15 text-mint-200" : "bg-white/10 text-white/50"
                  }`}
                >
                  {delivered ? "✓ Verified" : "In Progress"}
                </motion.span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                <div className="size-9 shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-navy-700" />
                <div>
                  <p className="text-sm font-semibold text-white">John Smith</p>
                  <p className="text-[11px] text-white/40">Applicant ID #48213</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {reportFacts.map((row) => (
                  <ReportRow key={row.label} label={row.label} revealed={active >= row.revealAt}>
                    <span className="font-medium text-white/85">{row.value}</span>
                  </ReportRow>
                ))}
              </div>

              <div className="h-px bg-white/10" />

              <div className="space-y-3 text-sm">
                {reportOutcomes.map((row) => (
                  <ReportRow key={row.label} label={row.label} revealed={active >= row.revealAt}>
                    {row.value === "stars" ? (
                      <span className="flex gap-0.5 text-mint-200">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />
                        ))}
                      </span>
                    ) : (
                      <span className="font-medium text-mint-200">{row.value}</span>
                    )}
                  </ReportRow>
                ))}
              </div>

              <div className="h-px bg-white/10" />

              <div className="mt-auto flex items-center justify-between rounded-xl bg-white/5 p-4">
                <div>
                  <p className="text-xs text-white/40">Verification Score</p>
                  <p className="text-2xl font-bold text-white">
                    {score}
                    <span className="text-sm font-medium text-white/40"> / 100</span>
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
      <span className="text-white/40">{label}</span>
      {revealed ? (
        <motion.span initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}>
          {children}
        </motion.span>
      ) : (
        <span className="h-3 w-20 rounded-full bg-white/10" />
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
      <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
      <motion.circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="var(--color-mint-200)"
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
        stroke="var(--color-mint-200)"
        strokeWidth="0.75"
        strokeDasharray="2 3"
      />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="var(--color-mint-200)" />
      ))}
    </svg>
  );
}
