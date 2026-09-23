import { IconKey, IconPlugConnected, IconPlus } from "@tabler/icons-react";
import { iconProps } from "../icon";
import { CARD, Eyebrow, EyebrowAction, Pill } from "./TabParts";
import { ToggleSwitch } from "./ToggleSwitch";
import {
  API_KEYS,
  FEATURE_FLAGS,
  PMS_INTEGRATIONS,
  WEBHOOKS,
} from "@/lib/platform/client-profile";

/*
 * Configuration tab — Figma node 18397:224614.
 *
 * Feature flags six to a row, API keys beside webhooks, then the property
 * management integrations. A switched-off flag sits back on a quieter card,
 * as the design draws Chrome Extension.
 */
export function ConfigurationTab() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Eyebrow>Feature Flags</Eyebrow>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {FEATURE_FLAGS.map((flag) => (
            <li
              key={flag.label}
              className={`flex items-center gap-3 rounded-app-l border-w-2xs border-app-line-brand2 px-4 py-2.5 ${
                flag.enabled ? "bg-app-surface" : "bg-app-brand1-quaternary/60"
              }`}
            >
              <span className="min-w-px flex-1 text-label-2xs text-app-heading">{flag.label}</span>
              <ToggleSwitch label={flag.label} defaultOn={flag.enabled} />
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="flex flex-col gap-3">
          <Eyebrow>API Keys</Eyebrow>
          <ul className="flex flex-col gap-2">
            {API_KEYS.map((key) => (
              <li key={key.name} className={`flex flex-wrap items-center gap-3 px-4 py-3 ${CARD}`}>
                <span className="text-app-text-tertiary">
                  <IconKey {...iconProps(16)} />
                </span>
                <div className="flex min-w-px flex-1 flex-col">
                  <p className="text-label-2xs text-app-heading">{key.name}</p>
                  <p className="truncate font-mono text-body-2xs text-app-text-tertiary">{key.masked}</p>
                </div>
                <span className="whitespace-nowrap text-body-2xs text-app-text-tertiary">Created {key.created}</span>
                <Pill tone="success">Active</Pill>
                <button type="button" className="text-body-2xs font-semibold text-app-warning hover:opacity-70">
                  Revoke
                </button>
              </li>
            ))}
          </ul>
          <div>
            <EyebrowAction icon={<IconPlus {...iconProps(12)} />} label="Generate New Key" />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <Eyebrow>Webhooks</Eyebrow>
          <ul className="flex flex-col gap-2">
            {WEBHOOKS.map((hook) => (
              <li key={hook.url} className={`flex items-center gap-3 px-4 py-3 ${CARD}`}>
                <span className="text-app-neutral">
                  <IconPlugConnected {...iconProps(16)} />
                </span>
                <div className="flex min-w-px flex-1 flex-col">
                  <p className="truncate font-mono text-body-2xs text-app-heading">{hook.url}</p>
                  <p className="text-body-2xs text-app-text-tertiary">{hook.events}</p>
                </div>
                <Pill tone="success">Active</Pill>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="flex flex-col gap-3 border-t border-app-line-brand2 pt-5">
        <Eyebrow>Integrations</Eyebrow>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {PMS_INTEGRATIONS.map((pms) => (
            <li key={pms.name} className={`flex items-center gap-3 px-4 py-2.5 ${CARD}`}>
              <span className="min-w-px flex-1 text-label-2xs font-bold text-app-heading">{pms.name}</span>
              <span
                className={`whitespace-nowrap text-body-2xs ${
                  pms.connected ? "font-semibold text-app-success" : "text-app-text-tertiary"
                }`}
              >
                {pms.connected ? "Connected" : "Not Connected"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
