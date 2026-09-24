"use client";

import {
  IconArrowRight,
  IconCalendarStats,
  IconFileSearch,
  IconPhone,
  IconTableImport,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { iconProps } from "./icon";

/*
 * Tools — no Figma frame. Small utilities a verification team reaches for
 * during the day, each working entirely in the browser.
 */

const INPUT =
  "min-w-px flex-1 rounded-app-l border-w-xs border-app-line bg-app-surface p-3 text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary focus:border-app-line-brand1";
const BUTTON =
  "flex shrink-0 items-center justify-center gap-2 rounded-app-l bg-app-brand1 px-4 py-3 text-label-2xs text-app-text-inverse transition-opacity hover:opacity-90 disabled:opacity-40";

function ToolCard({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-5 backdrop-blur-[12px]">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-app-12xl bg-app-brand1-16 text-app-text-emphasis">
          {icon}
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-heading-xs text-app-heading">{title}</h2>
          <p className="text-body-xs text-app-text-secondary">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function FileLookup() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const digits = value.replace(/\D/g, "");
  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (digits) router.push(`/verifications/${digits}`);
      }}
    >
      <label className="sr-only" htmlFor="tool-file">File number</label>
      <input id="tool-file" value={value} onChange={(event) => setValue(event.target.value)} placeholder="#415773" className={INPUT} />
      <button type="submit" disabled={!digits} className={BUTTON}>
        Open <IconArrowRight {...iconProps(16)} />
      </button>
    </form>
  );
}

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (digits.length !== 10) return null;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function PhoneFormatter() {
  const [value, setValue] = useState("");
  const formatted = value ? formatPhone(value) : null;
  return (
    <div className="flex flex-col gap-2">
      <label className="sr-only" htmlFor="tool-phone">Phone number</label>
      <input id="tool-phone" value={value} onChange={(event) => setValue(event.target.value)} placeholder="+1 406 382 2670" className={INPUT} />
      <p role="status" className={`text-body-xs ${value && !formatted ? "text-app-warning" : "text-app-text"}`}>
        {!value
          ? "Paste a number in any format."
          : formatted
            ? `US format: ${formatted}`
            : "Not a 10-digit US number."}
      </p>
    </div>
  );
}

function monthsBetween(start: string, end: string) {
  const from = new Date(start);
  const to = new Date(end);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || to < from) return null;
  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) months -= 1;
  return months;
}

function LeaseLength() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const months = start && end ? monthsBetween(start, end) : null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="tool-start">Lease start</label>
        <input id="tool-start" type="date" value={start} onChange={(event) => setStart(event.target.value)} className={`${INPUT} [[data-ve-theme=dark]_&]:[color-scheme:dark]`} />
        <span className="text-body-xs text-app-text-tertiary">to</span>
        <label className="sr-only" htmlFor="tool-end">Lease end</label>
        <input id="tool-end" type="date" value={end} onChange={(event) => setEnd(event.target.value)} className={`${INPUT} [[data-ve-theme=dark]_&]:[color-scheme:dark]`} />
      </div>
      <p role="status" className="text-body-xs text-app-text">
        {!start || !end
          ? "Pick both dates to see the tenancy length."
          : months === null
            ? "The end date is before the start date."
            : `${Math.floor(months / 12)} years, ${months % 12} months (${months} months in total)`}
      </p>
    </div>
  );
}

export function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      <ToolCard icon={<IconFileSearch {...iconProps(20)} />} title="File Lookup" description="Jump straight to a verification by its file number.">
        <FileLookup />
      </ToolCard>
      <ToolCard icon={<IconPhone {...iconProps(20)} />} title="Phone Formatter" description="Check a landlord or tenant number and get it in standard US format.">
        <PhoneFormatter />
      </ToolCard>
      <ToolCard icon={<IconCalendarStats {...iconProps(20)} />} title="Tenancy Length" description="Work out how long a lease ran from its start and end dates.">
        <LeaseLength />
      </ToolCard>
      <ToolCard icon={<IconTableImport {...iconProps(20)} />} title="Batch Import" description="Download the CSV template and send many orders at once.">
        <Link href="/orders/batch" className={`${BUTTON} self-start`}>
          Open Batch Order <IconArrowRight {...iconProps(16)} />
        </Link>
      </ToolCard>
    </div>
  );
}
