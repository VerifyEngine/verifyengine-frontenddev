"use client";

import { IconCaretDown, IconCaretUp, IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import { SortHandle } from "./ClientsTable";
import { iconProps } from "./icon";
import type { UserActivityRow, UserResponse } from "@/lib/platform/user-activity";

/*
 * User Activity table â€” Figma nodes 15915:28474 (header) and 18030:2398 /
 * 18030:2399 (a user expanded and collapsed).
 *
 * A user row carries their latest answer; "Details" unfolds the earlier ones
 * as grey sub-rows that reuse the same columns but fill only Question and
 * Response, exactly as the design leaves the rest of each sub-row blank.
 *
 * The design's header is a fixed 1208 while the rows run 1716, so the two
 * never line up â€” corrected here by driving both from one column list.
 */

const COLUMNS = [
  { key: "user", label: "User Info" },
  { key: "total", label: "Total Responses", width: 86 },
  { key: "properties", label: "Properties" },
  { key: "question", label: "Question" },
  { key: "response", label: "Response", width: 54 },
  { key: "voice", label: "Voice Note" },
  { key: "added", label: "Date Added", width: 72 },
  { key: "updated", label: "Last Updated", width: 72 },
  { key: "insight", label: "Insight Activation", width: 90 },
  { key: "actions", label: "Actions", width: 64 },
] as const;

const MIN_TABLE_WIDTH = 1280;

const scaled = (px: number) => `calc(${px}px * var(--ve-type-scale))`;

function Fixed({ width, children }: { width: number; children?: React.ReactNode }) {
  return (
    <span style={{ width: scaled(width) }} className="shrink-0 text-body-2xs text-app-text">
      {children}
    </span>
  );
}

function Flexible({ children }: { children?: React.ReactNode }) {
  return <span className="min-w-px flex-1 text-body-2xs text-app-text">{children}</span>;
}

/** Figma's Toggle Switch (8852:196240): a navy pill knob on a grey track. */
function InsightSwitch({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => setOn((value) => !value)}
      className={`flex w-12 shrink-0 cursor-pointer items-center overflow-hidden rounded-app-l border-w-2xs border-app-line bg-app-surface-tertiary p-0.5 ${
        on ? "justify-end" : "justify-start"
      }`}
    >
      <span
        aria-hidden
        className={`flex items-center justify-center rounded-app-12xl px-4 py-1.5 transition-colors ${
          on ? "bg-app-switch-on" : "bg-app-text-tertiary"
        }`}
      >
        <span className="h-2 w-0.5 rounded-full bg-app-text-inverse" />
      </span>
    </button>
  );
}

function SubRow({ response }: { response: UserResponse | null }) {
  return (
    <div className="flex items-center gap-4 border-w-2xs border-app-line bg-app-brand1-quaternary px-4 py-3">
      <Flexible />
      <Fixed width={86} />
      <Flexible />
      {response ? (
        <Flexible>{response.question}</Flexible>
      ) : (
        <span className="min-w-px flex-1 text-body-2xs text-app-text-tertiary">
          No earlier responses
        </span>
      )}
      <Fixed width={54}>{response?.answer}</Fixed>
      <Flexible />
      <Fixed width={72} />
      <Fixed width={72} />
      <Fixed width={90} />
      <Fixed width={64} />
    </div>
  );
}

function UserRow({ row, defaultOpen }: { row: UserActivityRow; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `responses-${row.id}`;

  return (
    <li className="flex flex-col border-w-2xs border-app-line bg-app-surface">
      <div className="flex items-center gap-4 border-w-2xs border-app-line bg-app-surface px-4 py-3">
        <span className="flex min-w-px flex-1 flex-col gap-1 text-body-2xs">
          <span className="text-app-text">{row.name}</span>
          <span className="text-app-text-secondary">{row.email}</span>
        </span>

        <Fixed width={86}>{row.totalResponses}</Fixed>

        <span className="flex min-w-px flex-1 flex-wrap items-center gap-0.5 text-body-2xs text-app-text">
          {row.properties.map((mls, index) => (
            <span key={mls} className="whitespace-nowrap">
              {mls}
              {index < row.properties.length - 1 ? "," : ""}
            </span>
          ))}
        </span>

        <Flexible>{row.latest.question}</Flexible>
        <Fixed width={54}>{row.latest.answer}</Fixed>

        <span className="flex min-w-px flex-1 flex-col items-start gap-2.5">
          {row.voiceNote.transcript ? (
            <span className="line-clamp-5 text-body-2xs text-app-text">
              {row.voiceNote.transcript}
            </span>
          ) : null}
          <button
            type="button"
            aria-label={`Play voice note from ${row.name}, ${row.voiceNote.duration}`}
            className="flex items-center gap-2 rounded-app-7xl bg-app-brand2-tertiary px-2 py-1 text-app-text-brand1 transition-opacity hover:opacity-80"
          >
            <IconPlayerPlay {...iconProps(12)} />
            <span className="text-label-2xs">{row.voiceNote.duration}</span>
          </button>
        </span>

        <Fixed width={72}>{row.addedAt}</Fixed>
        <Fixed width={72}>{row.updatedAt}</Fixed>

        <span className="flex shrink-0 items-center" style={{ width: scaled(90) }}>
          <InsightSwitch label={`Insight activation for ${row.name}`} defaultOn={row.insightActive} />
        </span>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          style={{ width: scaled(64) }}
          className="flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-app-12xl bg-app-brand1-quaternary p-2 text-app-text-brand1 transition-opacity hover:opacity-80"
        >
          {open ? (
            <>
              <span className="text-body-2xs font-medium">Hide</span>
              <IconCaretUp {...iconProps(12)} />
            </>
          ) : (
            <>
              <IconCaretDown {...iconProps(12)} />
              <span className="text-body-2xs font-medium">Details</span>
            </>
          )}
        </button>
      </div>

      {open ? (
        <div id={panelId}>
          {row.earlier.length > 0 ? (
            row.earlier.map((response) => (
              <SubRow key={response.question} response={response} />
            ))
          ) : (
            <SubRow response={null} />
          )}
        </div>
      ) : null}
    </li>
  );
}

export function UserActivityTable({ rows }: { rows: readonly UserActivityRow[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-1" style={{ minWidth: MIN_TABLE_WIDTH }}>
        <div className="flex items-center gap-4 rounded-app-l bg-app-brand1 px-4 py-3">
          {COLUMNS.map((column) => (
            <div
              key={column.key}
              className={
                "width" in column
                  ? "flex shrink-0 items-center gap-1"
                  : "flex min-w-px flex-1 items-center gap-1"
              }
              style={"width" in column ? { width: scaled(column.width) } : undefined}
            >
              <button
                type="button"
                aria-label={`Sort by ${column.label}`}
                className="shrink-0 cursor-pointer text-app-text-inverse"
              >
                <SortHandle />
              </button>
              <span className="min-w-px flex-1 text-table-heading text-app-text-inverse">
                {column.label}
              </span>
            </div>
          ))}
        </div>

        <ul className="flex flex-col">
          {rows.map((row, index) => (
            <UserRow key={row.id} row={row} defaultOpen={index === 0} />
          ))}
        </ul>
      </div>
    </div>
  );
}
