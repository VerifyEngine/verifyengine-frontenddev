"use client";

import { IconCheck, IconDeviceDesktop, IconEye, IconEyeOff, IconLogout, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { FormCard, FormPanel } from "./FormCard";
import { FormField, FormPhoneField } from "./FormField";
import { iconProps } from "./icon";
import { destroySession } from "@/lib/platform/session";

/*
 * Account — no Figma frame. Profile, password and sign-out, built from the
 * New Order form cards and fields. Nothing is sent yet: the profile and
 * password endpoints do not exist, so saving says so instead of pretending.
 */

const PRIMARY_BUTTON =
  "flex items-center justify-center gap-3 self-start rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40";
const SECONDARY_BUTTON =
  "flex items-center justify-center gap-3 self-start rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-app-text transition-colors hover:bg-app-fade-48";

function PendingNote({ shown }: { shown: boolean }) {
  if (!shown) return null;
  return (
    <p role="status" className="text-body-xs text-app-text-secondary">
      Saved on this screen only — it is sent once the account service is connected.
    </p>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex min-w-px flex-col gap-1">
      <label htmlFor={id} className="px-3 text-label-2xs text-app-text">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-surface p-3">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-px flex-1 bg-transparent py-px text-body-xs text-app-text outline-none"
        />
        <button
          type="button"
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          onClick={() => setVisible((value) => !value)}
          className="shrink-0 text-app-text-secondary"
        >
          {visible ? <IconEyeOff {...iconProps(16)} /> : <IconEye {...iconProps(16)} />}
        </button>
      </div>
    </div>
  );
}

function ProfileCard({ name, email }: { name: string; email: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <FormCard id="profile" title="Profile">
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <FormPanel label="Personal Information">
          <div className="flex items-center gap-4">
            <Image
              src="/images/platform-avatar.png"
              alt=""
              width={72}
              height={72}
              className="size-18 shrink-0 rounded-app-12xl border-w-2xs border-app-line object-cover"
            />
            <label className="cursor-pointer rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-2 text-label-2xs text-app-text transition-colors hover:bg-app-fade-48">
              Change photo
              <input type="file" accept=".jpg,.jpeg,.png" className="sr-only" />
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <FormField name="account-name" label="Full Name" placeholder="Type here..." defaultValue={name} required />
            <FormField name="account-email" label="Email Address" placeholder="example@email.com" type="email" icon="mail" defaultValue={email} required />
            <FormPhoneField name="account-phone" label="Phone Number" />
            <FormField name="account-title" label="Job Title" placeholder="e.g. Leasing Manager" />
          </div>
        </FormPanel>
        <button type="submit" className={PRIMARY_BUTTON}>
          <IconCheck {...iconProps(20)} />
          <span className="text-label-xs">Save Profile</span>
        </button>
        <PendingNote shown={saved} />
      </form>
    </FormCard>
  );
}

const RULES = [
  { label: "At least 12 characters", test: (value: string) => value.length >= 12 },
  { label: "An uppercase and a lowercase letter", test: (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value) },
  { label: "A number", test: (value: string) => /\d/.test(value) },
  { label: "A symbol", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
] as const;

function PasswordCard() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saved, setSaved] = useState(false);

  const strong = RULES.every((rule) => rule.test(next));
  const matches = next !== "" && next === confirm;
  const canSave = current !== "" && strong && matches;

  return (
    <FormCard id="password" title="Password">
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSave) setSaved(true);
        }}
      >
        <FormPanel label="Change Password">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <PasswordInput label="Current Password" value={current} onChange={setCurrent} autoComplete="current-password" />
            <PasswordInput label="New Password" value={next} onChange={setNext} autoComplete="new-password" />
            <PasswordInput label="Confirm New Password" value={confirm} onChange={setConfirm} autoComplete="new-password" />
          </div>
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {RULES.map((rule) => {
              const met = rule.test(next);
              return (
                <li key={rule.label} className={`flex items-center gap-2 text-body-xs ${met ? "text-app-success" : "text-app-text-secondary"}`}>
                  {met ? <IconCheck {...iconProps(16)} /> : <IconX {...iconProps(16)} />}
                  {rule.label}
                </li>
              );
            })}
            <li className={`flex items-center gap-2 text-body-xs ${matches ? "text-app-success" : "text-app-text-secondary"}`}>
              {matches ? <IconCheck {...iconProps(16)} /> : <IconX {...iconProps(16)} />}
              Both new passwords match
            </li>
          </ul>
        </FormPanel>
        <button type="submit" disabled={!canSave} className={PRIMARY_BUTTON}>
          <IconCheck {...iconProps(20)} />
          <span className="text-label-xs">Update Password</span>
        </button>
        <PendingNote shown={saved} />
      </form>
    </FormCard>
  );
}

function SessionCard() {
  const router = useRouter();
  async function signOut() {
    await destroySession();
    router.push("/login");
  }
  return (
    <FormCard id="sessions" title="Sessions">
      <FormPanel label="Signed In">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-app-12xl bg-app-brand1-16 text-app-text-emphasis">
            <IconDeviceDesktop {...iconProps(20)} />
          </span>
          <span className="flex flex-col">
            <span className="text-label-xs text-app-text">This browser</span>
            <span className="text-body-xs text-app-text-secondary">Current session</span>
          </span>
        </div>
      </FormPanel>
      <button type="button" onClick={signOut} className={`${SECONDARY_BUTTON} text-app-warning`}>
        <IconLogout {...iconProps(20)} />
        <span className="text-label-xs">Sign Out</span>
      </button>
    </FormCard>
  );
}

export function AccountForms({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex min-w-px flex-1 flex-col gap-2">
      <ProfileCard name={name} email={email} />
      <PasswordCard />
      <SessionCard />
    </div>
  );
}
