import { IconCopy, IconEye, IconPencil, IconPlug, IconPlus, IconRefresh, IconWebhook } from "@tabler/icons-react";
import { OUTLINE_BUTTON, Panel } from "@/components/platform/company/CompanyTabs";
import { iconProps } from "@/components/platform/icon";
import { API_KEYS, INTEGRATIONS, WEBHOOKS } from "@/lib/platform/company";

/*
 * Integrations & API — Figma node 18514:51517.
 *
 * API keys beside webhooks, then the six connected services three to a row.
 * Each service tile keeps the tint the design gives it.
 */

const SERVICE_TINT: Record<string, string> = {
  Stripe: "bg-app-brand1-16 text-app-heading",
  Twilio: "bg-app-warning/10 text-app-warning",
  SendGrid: "bg-app-neutral/10 text-app-neutral",
  Salesforce: "bg-app-information/10 text-app-information",
  Zapier: "bg-app-accent/10 text-app-accent",
  Slack: "bg-app-brand1-quaternary text-app-heading",
};

const ICON_BUTTON =
  "flex items-center justify-center rounded-app-m p-1.5 text-app-text-tertiary transition-colors hover:bg-app-brand2-16 hover:text-app-heading";

export function IntegrationsTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="API Keys">
          <ul className="flex flex-col gap-4">
            {API_KEYS.map((key) => (
              <li key={key.label} className="flex flex-col gap-1">
                <p className="text-nav-heading tracking-[0.05em] text-app-text-tertiary uppercase">{key.label}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="min-w-px flex-1 truncate font-mono text-body-2xs text-app-heading">{key.masked}</p>
                  <button type="button" aria-label={`Reveal ${key.label.toLowerCase()}`} className={ICON_BUTTON}>
                    <IconEye {...iconProps(16)} />
                  </button>
                  <button type="button" aria-label={`Copy ${key.label.toLowerCase()}`} className={ICON_BUTTON}>
                    <IconCopy {...iconProps(16)} />
                  </button>
                  <button type="button" className={OUTLINE_BUTTON}>
                    <IconRefresh {...iconProps(12)} />
                    Regenerate
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Webhooks"
          action={
            <button type="button" className={OUTLINE_BUTTON}>
              <IconPlus {...iconProps(12)} />
              Add Webhook
            </button>
          }
        >
          <ul className="flex flex-col">
            {WEBHOOKS.map((hook) => (
              <li key={hook.url} className="flex items-center gap-3 border-b border-app-line-brand2 py-2.5 first:pt-0 last:border-b-0">
                <span className="text-app-text-tertiary">
                  <IconWebhook {...iconProps(16)} />
                </span>
                <div className="flex min-w-px flex-1 flex-col gap-0.5">
                  <p className="truncate font-mono text-body-2xs text-app-heading">{hook.url}</p>
                  <p className="truncate text-body-2xs text-app-text-tertiary">{hook.events}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-body-2xs font-semibold ${
                    hook.active ? "bg-app-success/10 text-app-success" : "bg-app-brand1-quaternary text-app-text-tertiary"
                  }`}
                >
                  {hook.active ? "Active" : "Inactive"}
                </span>
                <button type="button" aria-label={`Edit ${hook.url}`} className={ICON_BUTTON}>
                  <IconPencil {...iconProps(12)} />
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Connected Integrations">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {INTEGRATIONS.map((service) => {
            const connected = service.status === "Connected";
            return (
              <li key={service.name} className="flex items-center gap-3 rounded-app-l border-w-2xs border-app-line-brand2 px-3 py-2.5">
                <span className={`flex size-8 shrink-0 items-center justify-center rounded-app-m ${SERVICE_TINT[service.name] ?? ""}`}>
                  <IconPlug {...iconProps(16)} />
                </span>
                <div className="flex min-w-px flex-1 flex-col gap-0.5">
                  <p className="text-label-2xs text-app-heading">{service.name}</p>
                  <p className={`text-body-2xs ${connected ? "text-app-success" : "text-app-text-tertiary"}`}>{service.status}</p>
                </div>
                <button
                  type="button"
                  className={
                    connected
                      ? "shrink-0 rounded-app-m border-w-2xs border-app-warning/40 px-3 py-1.5 text-label-2xs text-app-warning transition-colors hover:bg-app-warning/10"
                      : OUTLINE_BUTTON
                  }
                >
                  {connected ? "Disconnect" : "Connect"}
                </button>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
