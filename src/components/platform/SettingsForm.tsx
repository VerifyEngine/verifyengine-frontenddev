"use client";

import { IconCheck, IconMoon, IconSun } from "@tabler/icons-react";
import { useState } from "react";
import { FormCard, FormPanel } from "./FormCard";
import { FormSelect } from "./FormField";
import { ToggleSwitch } from "./client-profile/ToggleSwitch";
import { iconProps } from "./icon";
import { useVeTheme } from "./theme";

/*
 * Settings — no Figma frame. Personal preferences only; company-wide settings
 * stay in Company. Appearance drives the same theme the Top Nav toggles.
 * The rest are saved once the preferences endpoint exists.
 */

const TIMEZONES = [
  "Eastern Time (ET)",
  "Central Time (CT)",
  "Mountain Time (MT)",
  "Arizona (MST)",
  "Pacific Time (PT)",
  "Alaska Time (AKT)",
  "Hawaii Time (HT)",
] as const;

const DATE_FORMATS = ["May 18, 2026", "05/18/2026", "2026-05-18"] as const;

const LANDING_PAGES = ["Dashboard", "Verifications", "New Order", "Clients", "Reports"] as const;

const NOTIFICATIONS = [
  { label: "A verification is completed", defaultOn: true },
  { label: "A file is escalated for human review", defaultOn: true },
  { label: "A landlord responds", defaultOn: false },
  { label: "A batch order finishes", defaultOn: true },
  { label: "Weekly activity summary", defaultOn: false },
  { label: "Billing and invoice alerts", defaultOn: true },
] as const;

function ThemeChoice() {
  const { theme, toggleTheme } = useVeTheme();
  const options = [
    { value: "light", label: "Light", icon: <IconSun {...iconProps(20)} /> },
    { value: "dark", label: "Dark", icon: <IconMoon {...iconProps(20)} /> },
  ] as const;
  return (
    <div role="radiogroup" aria-label="Theme" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => {
              if (!active) toggleTheme();
            }}
            className={`flex items-center gap-3 rounded-app-l border-w-2xs px-4 py-3 transition-colors ${
              active
                ? "border-app-line-brand1 bg-app-brand1 text-app-text-inverse"
                : "border-app-line bg-app-fade-40 text-app-text hover:bg-app-fade-48"
            }`}
          >
            {option.icon}
            <span className="text-label-xs">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SettingsForm() {
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="flex min-w-px flex-1 flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
    >
      <FormCard id="appearance" title="Appearance">
        <FormPanel label="Theme">
          <ThemeChoice />
        </FormPanel>
      </FormCard>

      <FormCard id="regional" title="Language & Region">
        <FormPanel>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <FormSelect name="language" label="Language" placeholder="Select..." options={["English (US)"]} defaultValue="English (US)" />
            <FormSelect name="timezone" label="Time Zone" placeholder="Select a time zone..." options={TIMEZONES} defaultValue="Eastern Time (ET)" />
            <FormSelect name="date-format" label="Date Format" placeholder="Select..." options={DATE_FORMATS} defaultValue={DATE_FORMATS[0]} />
          </div>
          <FormSelect name="landing" label="Open After Sign-In" placeholder="Select a page..." options={LANDING_PAGES} defaultValue="Dashboard" className="lg:max-w-[calc(100%/3)]" />
        </FormPanel>
      </FormCard>

      <FormCard id="notifications" title="Email Notifications">
        <FormPanel label="Email me when">
          <ul className="flex flex-col divide-y divide-app-line">
            {NOTIFICATIONS.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-4 py-3">
                <span className="text-body-s text-app-text">{item.label}</span>
                <ToggleSwitch label={item.label} defaultOn={item.defaultOn} tone="brand1" />
              </li>
            ))}
          </ul>
        </FormPanel>
      </FormCard>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="flex items-center justify-center gap-3 self-start rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90"
        >
          <IconCheck {...iconProps(20)} />
          <span className="text-label-xs">Save Preferences</span>
        </button>
        {saved ? (
          <p role="status" className="text-body-xs text-app-text-secondary">
            The theme is already applied. The other preferences are sent once the account service is connected.
          </p>
        ) : null}
      </div>
    </form>
  );
}
