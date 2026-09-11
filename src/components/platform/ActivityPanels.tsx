"use client";

import { useState } from "react";
import {
  IconChevronDown,
  IconMail,
  IconMessage2,
  IconPhone,
  IconRobot,
  IconTrendingUp,
} from "@tabler/icons-react";
import { iconProps } from "./icon";
import type { DetailTone } from "./DetailCard";

/*
 * The right column of Order Details — Figma nodes 18216:28706 (timeline),
 * 18216:28707 and 18216:28783 (the two Landlord Responses panels) and
 * 18216:28854 (notes).
 *
 * All four are the same glass card with a Heading XS title over a stack of
 * rows on the translucent panel; they differ only in what a row holds, so the
 * shell lives in PanelCard and each list supplies its own row.
 *
 * Channel and tone are names rather than components or colours, so no icon
 * crosses a module boundary and no hex is written at a call site.
 */

const TONE_BG: Record<DetailTone, string> = {
  success: "bg-app-success",
  warning: "bg-app-warning",
  accent: "bg-app-accent",
  neutral: "bg-app-neutral",
  highlight: "bg-app-highlight",
};

export type Channel = "call" | "mail" | "sms" | "ai" | "escalation";

function ChannelIcon({ channel }: { channel: Channel }) {
  if (channel === "call") return <IconPhone {...iconProps(12)} />;
  if (channel === "mail") return <IconMail {...iconProps(12)} />;
  if (channel === "sms") return <IconMessage2 {...iconProps(12)} />;
  if (channel === "ai") return <IconRobot {...iconProps(12)} />;
  return <IconTrendingUp {...iconProps(12)} />;
}

function Chip({ tone, children }: { tone: DetailTone; children: string }) {
  return (
    <span
      className={`shrink-0 rounded-app-4xl px-2 py-0.5 text-body-2xs text-app-text-inverse ${TONE_BG[tone]}`}
    >
      {children}
    </span>
  );
}

function PanelCard({
  title,
  collapsible = false,
  children,
}: {
  title: string;
  collapsible?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="flex flex-col gap-3 rounded-app-xl border-w-2xs border-app-line bg-app-brand2-16 p-4 backdrop-blur-[12px]">
      {collapsible ? (
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          className="flex w-full items-center gap-2 text-left"
        >
          <span className="min-w-px flex-1 text-heading-xs text-app-text">{title}</span>
          <span
            className={`flex shrink-0 items-center justify-center rounded-app-7xl border-w-2xs border-app-line-brand2 bg-app-brand2-tertiary px-2 pt-1 pb-[3px] text-app-text transition-transform ${
              isOpen ? "" : "-rotate-90"
            }`}
          >
            <IconChevronDown {...iconProps(12)} />
          </span>
        </button>
      ) : (
        <h2 className="text-heading-xs text-app-text">{title}</h2>
      )}

      {isOpen ? <div className="flex flex-col gap-2">{children}</div> : null}
    </section>
  );
}

export type TimelineEntry = {
  id: string;
  body: string;
  channel: Channel;
  channelLabel: string;
  status: string;
  statusTone: DetailTone;
  time: string;
};

export function ActivityTimeline({
  title,
  entries,
}: {
  title: string;
  entries: readonly TimelineEntry[];
}) {
  return (
    <PanelCard title={title} collapsible>
      {entries.map((entry) => (
        <article
          key={entry.id}
          className="flex flex-col gap-2 rounded-app-l border-w-2xs border-app-line bg-app-fade-64 p-3"
        >
          <p className="text-body-2xs text-app-text">{entry.body}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex shrink-0 items-center gap-1 rounded-app-4xl border-w-2xs border-app-line px-2 py-0.5 text-app-text-secondary">
              <ChannelIcon channel={entry.channel} />
              <span className="text-body-2xs">{entry.channelLabel}</span>
            </span>
            <Chip tone={entry.statusTone}>{entry.status}</Chip>
            <span className="ml-auto shrink-0 text-body-2xs text-app-text-tertiary">
              {entry.time}
            </span>
          </div>
        </article>
      ))}
    </PanelCard>
  );
}

export type ResponseRow = { question: string; answer: string; tone: DetailTone };

export function ResponseList({
  title,
  rows,
}: {
  title: string;
  rows: readonly ResponseRow[];
}) {
  return (
    <PanelCard title={title}>
      {rows.map((row) => (
        <div
          key={row.question}
          className="flex items-center gap-3 rounded-app-l border-w-2xs border-app-line bg-app-fade-64 px-3 py-2"
        >
          <span className="min-w-px flex-1 text-body-xs text-app-text">{row.question}</span>
          <Chip tone={row.tone}>{row.answer}</Chip>
        </div>
      ))}
    </PanelCard>
  );
}

export type FlagRow = { label: string; raised: boolean };

/**
 * The second Landlord Responses panel is a checklist of fraud flags. Figma
 * draws ticks and empty circles; they are real checkboxes here because each
 * one is a reviewer's assertion about the file, not decoration — but they are
 * disabled until there is an endpoint to write them back to.
 */
export function FlagList({
  title,
  rows,
}: {
  title: string;
  rows: readonly FlagRow[];
}) {
  return (
    <PanelCard title={title}>
      {rows.map((row) => (
        <label
          key={row.label}
          className="flex items-center gap-3 rounded-app-l border-w-2xs border-app-line bg-app-fade-64 px-3 py-2"
        >
          <span className="min-w-px flex-1 text-body-xs text-app-text">{row.label}</span>
          <input
            type="checkbox"
            checked={row.raised}
            disabled
            readOnly
            className="size-4 shrink-0 accent-[var(--ve-text-brand1)]"
          />
        </label>
      ))}
    </PanelCard>
  );
}

export type NoteRow = { id: string; body: string; kind: string; time: string };

export function NotesList({
  title,
  rows,
}: {
  title: string;
  rows: readonly NoteRow[];
}) {
  return (
    <PanelCard title={title}>
      {rows.map((row) => (
        <article
          key={row.id}
          className="flex flex-col gap-2 rounded-app-l border-w-2xs border-app-line bg-app-fade-64 p-3"
        >
          <p className="text-body-2xs text-app-text">{row.body}</p>
          <div className="flex items-center gap-2">
            <span className="shrink-0 rounded-app-4xl bg-app-brand2-64 px-2 py-0.5 text-body-2xs text-app-text-brand1">
              {row.kind}
            </span>
            <span className="ml-auto shrink-0 text-body-2xs text-app-text-tertiary">
              {row.time}
            </span>
          </div>
        </article>
      ))}
    </PanelCard>
  );
}
