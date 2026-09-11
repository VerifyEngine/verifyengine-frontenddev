"use client";

import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { iconProps } from "./icon";

/*
 * Collapsible detail card — Figma node 18216:13713, used six times down the
 * left column of Order Details.
 *
 * Same glass card as the form screens but with a plain hairline instead of the
 * mint one, a Heading XS title, and a small mint pill on the right holding a
 * chevron. Figma draws every card open with the chevron pointing down; the
 * pill is a real disclosure button here, which is the only thing a chevron on
 * a card header can reasonably mean.
 *
 * Values are read-only: a label in the secondary colour over either plain text
 * or a functional chip.
 */

export type DetailTone = "success" | "warning" | "accent" | "neutral" | "highlight";

const TONE_BG: Record<DetailTone, string> = {
  success: "bg-app-success",
  warning: "bg-app-warning",
  accent: "bg-app-accent",
  neutral: "bg-app-neutral",
  highlight: "bg-app-highlight",
};

export type DetailItem = {
  label: string;
  value: string;
  tone?: DetailTone;
};

export function DetailField({ item }: { item: DetailItem }) {
  return (
    <div className="flex min-w-px flex-1 flex-col justify-end gap-1">
      <p className="text-label-2xs text-app-text-secondary">{item.label}</p>
      {item.tone ? (
        <p>
          <span
            className={`inline-flex items-center justify-center rounded-app-4xl px-2 py-0.5 text-body-xs text-app-text-inverse ${TONE_BG[item.tone]}`}
          >
            {item.value}
          </span>
        </p>
      ) : (
        <p className="truncate text-body-xs text-app-text">{item.value}</p>
      )}
    </div>
  );
}

export function DetailCard({
  title,
  items,
}: {
  title: string;
  items: readonly DetailItem[];
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="flex flex-col gap-3 overflow-hidden rounded-app-xl border-w-2xs border-app-line bg-app-brand2-16 p-4 backdrop-blur-[12px]">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-2 text-left"
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

      {isOpen ? (
        <div className="flex flex-col gap-5 rounded-app-xl border-w-2xs border-app-line bg-app-fade-64 p-5 backdrop-blur-[12px]">
          {/* Figma lays these out three to a row; they wrap instead of
              shrinking past legibility on a narrow screen. */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {items.map((item) => (
              <DetailField key={item.label} item={item} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

/**
 * The two collapsed panels under the radar — "AI Transcript" and "Source
 * Verification". Figma draws them shut with the chevron pointing up, and gives
 * them no open state, so opening one shows the placeholder line rather than
 * inventing a layout the design does not specify.
 */
export function AccordionCard({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex flex-col gap-3 overflow-hidden rounded-app-xl border-w-2xs border-app-line bg-app-brand2-16 p-4 backdrop-blur-[12px]">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-2 text-left"
      >
        <span className="min-w-px flex-1 text-heading-xs text-app-text">{title}</span>
        <span
          className={`flex shrink-0 items-center justify-center rounded-app-7xl border-w-2xs border-app-line-brand2 bg-app-brand2-tertiary px-2 pt-1 pb-[3px] text-app-text transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
        >
          <IconChevronDown {...iconProps(12)} />
        </span>
      </button>

      {isOpen ? (
        <p className="rounded-app-xl border-w-2xs border-app-line bg-app-fade-64 p-5 text-body-xs text-app-text-secondary">
          Available once the verification backend returns this record.
        </p>
      ) : null}
    </section>
  );
}
