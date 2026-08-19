"use client";

import { motion } from "motion/react";
import { Headphones, FileText, Phone, Play } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ExperienceCards() {
  return (
    <section className="bg-bg-muted py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Experience Verify Engine</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            See It. Hear It. Try It.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Experience the product before you ever talk to sales.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <RevealItem>
            <ListenCard />
          </RevealItem>
          <RevealItem>
            <ReportCard />
          </RevealItem>
          <RevealItem>
            <LiveDemoCard />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-card transition-shadow duration-200 hover:shadow-lg">
      {children}
    </div>
  );
}

function ListenCard() {
  const [playing, setPlaying] = useState(false);
  return (
    <CardShell>
      <div className="flex size-11 items-center justify-center rounded-full bg-mint-100 text-teal-600">
        <Headphones className="size-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink-900">Listen to an AI Demo Call</h3>
      <p className="mt-2 text-sm text-slate-600">
        Hear a real landlord verification conversation powered by our AI voice agent.
      </p>
      <div className="mt-5 flex-1" />
      {/* The design runs the play button and the waveform along a single row. */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPlaying((v) => !v)}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-mint-200 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-mint-300"
        >
          {playing ? "Playing..." : "Listen Now"} <Play className="size-4" fill="currentColor" />
        </button>
        <div className="flex h-8 min-w-0 flex-1 items-center gap-0.5">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ height: 4 }}
              animate={playing ? { height: [4, 4 + ((i * 5) % 20), 4] } : { height: 4 }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.04 }}
              className="w-1 rounded-full bg-teal-500/70"
            />
          ))}
        </div>
      </div>
    </CardShell>
  );
}

function ReportCard() {
  return (
    <CardShell>
      <div className="flex size-11 items-center justify-center rounded-full bg-mint-100 text-teal-600">
        <FileText className="size-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink-900">View a Sample Report</h3>
      <p className="mt-2 text-sm text-slate-600">
        Explore an interactive verification report and see the level of detail you receive.
      </p>
      <div className="mt-5 flex-1 rounded-xl bg-bg-muted p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink-900">Applicant</span>
          <span className="rounded-full bg-mint-100 px-2 py-0.5 text-[10px] font-semibold text-teal-600">
            VERIFIED
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-2 rounded-full bg-white" style={{ width: `${85 - i * 12}%` }} />
          ))}
        </div>
      </div>
      <button className="mt-5 inline-flex items-center gap-2 self-start rounded-lg bg-mint-200 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-mint-300">
        View Sample Report
      </button>
    </CardShell>
  );
}

function LiveDemoCard() {
  const [phone, setPhone] = useState("");
  return (
    <CardShell>
      <div className="flex size-11 items-center justify-center rounded-full bg-mint-100 text-teal-600">
        <Phone className="size-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink-900">Try a Live AI Demo</h3>
      <p className="mt-2 text-sm text-slate-600">
        Enter your phone number. Verify Engine calls you within seconds.
      </p>
      <div className="mt-5 flex-1" />
      {/* The design pairs the number field and the call button on one row. */}
      <div className="flex gap-2">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
          className="min-w-0 flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-ink-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none"
        />
        <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-mint-200 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-mint-300">
          Call Me Now
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-400">Takes less than 60 seconds.</p>
    </CardShell>
  );
}
