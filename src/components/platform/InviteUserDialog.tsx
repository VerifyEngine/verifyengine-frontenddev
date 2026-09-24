"use client";

import { IconCircleCheck, IconSend } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { FormField, FormSelect } from "./FormField";
import { ModalShell } from "./ModalShell";
import { iconProps } from "./icon";
import { ROLES } from "@/lib/platform/roles";

/*
 * Invite User — no Figma frame. Email, name and role, with an optional note.
 * The invitation is sent once the user service exists; until then the dialog
 * confirms what would be sent rather than claiming it went out.
 */

const CLOSE_HREF = "/roles";

export function InviteUserDialog() {
  const [sent, setSent] = useState<{ email: string; role: string } | null>(null);

  return (
    <ModalShell
      title="Invite User"
      description="They receive an email with a link to set their password and join the company."
      closeHref={CLOSE_HREF}
    >
      {sent ? (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-app-12xl bg-app-success text-app-text-inverse">
            <IconCircleCheck {...iconProps(20)} />
          </span>
          <p className="text-body-s text-app-text">
            Invitation for <strong>{sent.email}</strong> as <strong>{sent.role}</strong> is ready. It
            is delivered once the user service is connected.
          </p>
          <Link
            href={CLOSE_HREF}
            scroll={false}
            className="rounded-app-l bg-app-brand1 px-4 py-3 text-label-xs text-app-text-inverse"
          >
            Done
          </Link>
        </div>
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setSent({
              email: String(data.get("invite-email")),
              role: String(data.get("invite-role")),
            });
          }}
        >
          <FormField name="invite-email" label="Email Address" placeholder="example@email.com" type="email" icon="mail" required />
          <FormField name="invite-name" label="Full Name" placeholder="Type here..." />
          <FormSelect name="invite-role" label="Role" placeholder="Select a role..." options={ROLES.map((item) => item.role)} defaultValue="Viewer" required />
          <div className="flex flex-col gap-1">
            <label htmlFor="invite-note" className="px-3 text-label-2xs text-app-text">
              Personal Note (optional)
            </label>
            <textarea
              id="invite-note"
              name="invite-note"
              rows={3}
              placeholder="Add a short message to the invitation..."
              className="resize-none rounded-app-l border-w-xs border-app-line bg-app-surface p-3 text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary"
            />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              href={CLOSE_HREF}
              scroll={false}
              className="rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-label-xs text-app-text"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center gap-3 rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90"
            >
              <IconSend {...iconProps(20)} />
              <span className="text-label-xs">Send Invitation</span>
            </button>
          </div>
        </form>
      )}
    </ModalShell>
  );
}
