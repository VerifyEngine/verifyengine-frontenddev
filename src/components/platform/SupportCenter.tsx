"use client";

import { IconChevronDown, IconCircleCheck, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { FormCard, FormPanel } from "./FormCard";
import { FormField, FormSelect } from "./FormField";
import { UploadDropzone } from "./UploadDropzone";
import { iconProps } from "./icon";
import { FAQ, SUPPORT_CATEGORIES } from "@/lib/platform/support";

/*
 * Support — no Figma frame. Answers first, then a request form. The form has
 * nowhere to send to until the support endpoint exists, so it confirms what
 * was captured instead of claiming a ticket was opened.
 */

function FaqList() {
  const [open, setOpen] = useState<string | null>(FAQ[0]?.question ?? null);
  return (
    <ul className="flex flex-col overflow-hidden rounded-app-l border-w-2xs border-app-line">
      {FAQ.map((item) => {
        const expanded = open === item.question;
        return (
          <li key={item.question} className="border-w-2xs border-app-line bg-app-fade-48">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : item.question)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
            >
              <span className="text-label-xs text-app-text">{item.question}</span>
              <IconChevronDown
                {...iconProps(16)}
                className={`shrink-0 text-app-text-secondary transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
            {expanded ? (
              <p className="px-4 pb-4 text-body-s text-app-text-secondary">{item.answer}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function RequestForm() {
  const [sent, setSent] = useState<string | null>(null);

  if (sent) {
    return (
      <FormPanel>
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-app-12xl bg-app-success text-app-text-inverse">
            <IconCircleCheck {...iconProps(20)} />
          </span>
          <p className="text-body-s text-app-text">
            Your request about <strong>{sent}</strong> is ready. It reaches the team once the
            support service is connected.
          </p>
          <button
            type="button"
            onClick={() => setSent(null)}
            className="rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-label-xs text-app-text"
          >
            New request
          </button>
        </div>
      </FormPanel>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(String(new FormData(event.currentTarget).get("support-topic")));
      }}
    >
      <FormPanel>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FormSelect name="support-topic" label="Topic" placeholder="Select a topic..." options={SUPPORT_CATEGORIES} required />
          <FormField name="support-file" label="File # (if about a verification)" placeholder="#415773" icon="hash" />
        </div>
        <FormField name="support-subject" label="Subject" placeholder="A short summary" required />
        <div className="flex flex-col gap-1">
          <label htmlFor="support-message" className="flex items-center gap-0.5 px-3 text-label-2xs text-app-text">
            Message <span className="text-app-warning">*</span>
          </label>
          <textarea
            id="support-message"
            name="support-message"
            required
            rows={5}
            placeholder="What happened, and what did you expect?"
            className="resize-y rounded-app-l border-w-xs border-app-line bg-app-surface p-3 text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary"
          />
        </div>
        <UploadDropzone
          label="Attach a screenshot (optional)"
          hint="PNG, JPG or PDF."
          name="support-attachment"
        />
      </FormPanel>
      <button
        type="submit"
        className="flex items-center justify-center gap-3 self-start rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90"
      >
        <IconSend {...iconProps(20)} />
        <span className="text-label-xs">Send Request</span>
      </button>
    </form>
  );
}

export function SupportCenter() {
  return (
    <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 xl:items-start">
      <FormCard id="faq" title="Common Questions">
        <FaqList />
      </FormCard>
      <FormCard id="request" title="Contact Support">
        <RequestForm />
      </FormCard>
    </div>
  );
}
