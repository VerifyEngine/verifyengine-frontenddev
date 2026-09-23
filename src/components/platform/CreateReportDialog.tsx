"use client";

import {
  IconArrowDown,
  IconArrowUp,
  IconBraces,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconDownload,
  IconFileSpreadsheet,
  IconFileText,
  IconHistory,
  IconMail,
  IconPrinter,
  IconTable,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { iconProps } from "./icon";
import {
  DATE_PRESETS,
  GROUPING_OPTIONS,
  OUTPUT_FORMATS,
  REPORT_COLUMNS,
  REPORT_SHORTCUTS,
  REPORT_TYPES,
} from "@/lib/platform/report-creator";

/*
 * Create Report — Figma node 18545:95891, a 1160px card over the Report
 * Creator list (18545:95100).
 *
 * This card was drawn outside the platform's design system: Inter instead of
 * Satoshi, and raw hexes (#233364, #01A2FF, #E5E7EB, #94A3B8) instead of the
 * variables, with no dark frame. The measurements are the design's; the type
 * and colours are the platform tokens those hexes correspond to, so the card
 * matches the screen behind it and follows the theme. Flagged.
 *
 * The dialog is opened and closed through the URL (?create=1), so the header's
 * New Report is a plain link, Back and Escape return to the list, and a
 * reload keeps it open.
 */

const LIST_HREF = "/report-creator";

function ShortcutIcon({ icon }: { icon: (typeof REPORT_SHORTCUTS)[number]["icon"] }) {
  if (icon === "history") return <IconHistory {...iconProps(12)} />;
  if (icon === "mail") return <IconMail {...iconProps(12)} />;
  if (icon === "printer") return <IconPrinter {...iconProps(12)} />;
  if (icon === "download") return <IconDownload {...iconProps(12)} />;
  return <IconCheck {...iconProps(12)} />;
}

function FormatIcon({ icon }: { icon: (typeof OUTPUT_FORMATS)[number]["icon"] }) {
  if (icon === "table") return <IconTable {...iconProps(12)} />;
  if (icon === "file-spreadsheet") return <IconFileSpreadsheet {...iconProps(12)} />;
  if (icon === "braces") return <IconBraces {...iconProps(12)} />;
  return <IconFileText {...iconProps(12)} />;
}

/** Field label: the design's 12/18 semibold in its navy, which is Text/Heading. */
function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  const className = "block pb-1.5 text-label-2xs font-semibold text-app-heading";
  return htmlFor ? (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  ) : (
    <span className={className}>{children}</span>
  );
}

/**
 * The design's inputs: 1px hairline, 10px radius, 13px side padding. The dark
 * colour scheme lets the browser draw the date picker's own icon light.
 */
const CONTROL =
  "w-full rounded-[10px] border-w-s border-app-line bg-app-surface px-[13px] py-[9px] text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary focus:border-app-line-brand1 [[data-ve-theme=dark]_&]:[color-scheme:dark]";

function Select({
  id,
  placeholder,
  options,
  defaultValue = "",
}: {
  id: string;
  placeholder?: string;
  options: readonly string[];
  defaultValue?: string;
}) {
  return (
    <div className="relative">
      {/* Required with an empty value is :invalid, which is how the placeholder
          gets the design's dimmed text — a <select> has no placeholder of its own. */}
      <select
        id={id}
        defaultValue={defaultValue}
        required={placeholder !== undefined && placeholder !== ""}
        className={`${CONTROL} appearance-none pr-9 invalid:text-app-text-tertiary`}
      >
        {placeholder !== undefined ? (
          <option value="" disabled={defaultValue !== ""}>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <IconChevronDown
        {...iconProps(12)}
        className="pointer-events-none absolute top-1/2 right-[13px] -translate-y-1/2 text-app-text-secondary"
      />
    </div>
  );
}

export function CreateReportDialog() {
  const router = useRouter();
  const id = useId();
  const nameRef = useRef<HTMLInputElement>(null);

  const [preset, setPreset] = useState<string | null>(null);
  const [columns, setColumns] = useState<readonly string[]>(REPORT_COLUMNS);
  const [format, setFormat] = useState<string>("PDF");
  const [ascending, setAscending] = useState(false);

  useEffect(() => {
    nameRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.push(LIST_HREF, { scroll: false });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router]);

  const toggleColumn = (column: string) =>
    setColumns((current) =>
      current.includes(column) ? current.filter((c) => c !== column) : [...current, column],
    );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-app-fade-64 p-4 backdrop-blur-[2px] sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="flex w-full max-w-[1160px] flex-col gap-4 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-surface p-4 backdrop-blur-[12px]"
      >
        <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:gap-2">
          <div className="flex min-w-px flex-1 items-center gap-2">
            <Link
              href={LIST_HREF}
              scroll={false}
              aria-label="Close"
              className="flex shrink-0 items-center justify-center rounded-app-7xl bg-app-brand2-tertiary p-1.5 text-app-warning"
            >
              <IconX {...iconProps(12)} />
            </Link>
            <h2 id={`${id}-title`} className="min-w-px flex-1 text-heading-s text-app-text">
              Create Report
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {REPORT_SHORTCUTS.map((shortcut) => (
              <button
                key={shortcut.label}
                type="button"
                className="flex items-center justify-center gap-2 rounded-app-7xl bg-app-brand1-quaternary px-3 py-2 text-app-text-emphasis"
              >
                <ShortcutIcon icon={shortcut.icon} />
                <span className="whitespace-nowrap text-body-2xs">{shortcut.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form
          className="flex flex-col gap-5 p-5"
          onSubmit={(event) => {
            // No report endpoint exists yet; the form is complete but has
            // nowhere to send to, so it does not pretend a report was made.
            event.preventDefault();
          }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor={`${id}-name`}>Report Name</FieldLabel>
              <input
                ref={nameRef}
                id={`${id}-name`}
                type="text"
                defaultValue="Applicant Screening Summary"
                className={CONTROL}
              />
            </div>
            <div>
              <FieldLabel htmlFor={`${id}-type`}>Report Type</FieldLabel>
              <Select id={`${id}-type`} placeholder="Select--" options={REPORT_TYPES} />
            </div>
          </div>

          <fieldset>
            <legend className="contents">
              <FieldLabel>Date Range</FieldLabel>
            </legend>
            <div className="flex flex-wrap items-center gap-2">
              {DATE_PRESETS.map((option) => {
                const isActive = option === preset;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setPreset(isActive ? null : option)}
                    className={`rounded-app-s border-w-s px-2 py-1 text-label-2xs transition-colors ${
                      isActive
                        ? "border-app-line-brand1 bg-app-brand1 text-white"
                        : "border-app-line bg-app-fade-40 text-app-text-tertiary hover:text-app-text"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
              <label className="flex min-w-px flex-1 items-center gap-1.5">
                <IconCalendar {...iconProps(12)} className="shrink-0 text-app-text-tertiary" />
                <span className="sr-only">From</span>
                <input type="date" className={`${CONTROL} h-9`} />
              </label>
              <span className="text-body-xs text-app-text-tertiary">to</span>
              <label className="flex min-w-px flex-1 items-center gap-1.5">
                <IconCalendar {...iconProps(12)} className="shrink-0 text-app-text-tertiary" />
                <span className="sr-only">To</span>
                <input type="date" className={`${CONTROL} h-9`} />
              </label>
            </div>
          </fieldset>

          <div>
            <FieldLabel htmlFor={`${id}-client`}>Client Filter</FieldLabel>
            <Select id={`${id}-client`} options={["All Clients"]} defaultValue="All Clients" />
          </div>

          <fieldset>
            <legend className="contents">
              <FieldLabel>Columns to Include</FieldLabel>
            </legend>
            <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
              {REPORT_COLUMNS.map((column) => {
                const checked = columns.includes(column);
                return (
                  <label
                    key={column}
                    className={`flex h-9 cursor-pointer items-center gap-2 rounded-[10px] border-w-s px-[13px] transition-colors ${
                      checked
                        ? "border-app-neutral bg-app-neutral/10"
                        : "border-app-line bg-app-surface"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleColumn(column)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={`flex size-4 shrink-0 items-center justify-center rounded-app-xs border-w-s ${
                        checked ? "border-app-neutral bg-app-neutral text-white" : "border-app-line"
                      }`}
                    >
                      {checked ? <IconCheck {...iconProps(12)} /> : null}
                    </span>
                    <span className="text-label-2xs text-app-heading">{column}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor={`${id}-group`}>Group By</FieldLabel>
              <Select id={`${id}-group`} placeholder="" options={GROUPING_OPTIONS} />
            </div>
            <div>
              <FieldLabel htmlFor={`${id}-sort`}>Sort By</FieldLabel>
              <div className="flex items-start gap-2">
                <div className="min-w-px flex-1">
                  <Select id={`${id}-sort`} placeholder="" options={GROUPING_OPTIONS} />
                </div>
                <button
                  type="button"
                  aria-label={ascending ? "Sort descending" : "Sort ascending"}
                  onClick={() => setAscending((value) => !value)}
                  className="flex h-[37.5px] shrink-0 items-center rounded-[10px] border-w-s border-app-line bg-app-surface px-[11px] text-app-text"
                >
                  {ascending ? <IconArrowUp {...iconProps(12)} /> : <IconArrowDown {...iconProps(12)} />}
                </button>
              </div>
            </div>
          </div>

          <fieldset>
            <legend className="contents">
              <FieldLabel>Output Format</FieldLabel>
            </legend>
            <div className="flex flex-wrap items-center gap-2">
              {OUTPUT_FORMATS.map((option) => {
                const isActive = option.label === format;
                return (
                  <button
                    key={option.label}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFormat(option.label)}
                    className={`flex items-center gap-1.5 rounded-[10px] border-w-s px-[17px] py-[9px] text-label-2xs transition-colors ${
                      isActive
                        ? "border-app-line-brand1 bg-app-brand1 text-white"
                        : "border-app-line bg-app-surface text-app-text-tertiary hover:text-app-text"
                    }`}
                  >
                    <FormatIcon icon={option.icon} />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-app-brand1 py-3 text-white transition-opacity hover:opacity-90"
          >
            <IconFileText {...iconProps(16)} />
            <span className="text-label-xs font-semibold">Generate Report</span>
          </button>
        </form>
      </div>
    </div>
  );
}
