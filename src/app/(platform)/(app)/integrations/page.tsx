import type { Metadata } from "next";
import { MetricCard } from "@/components/platform/MetricCard";
import { PageHeader } from "@/components/platform/PageHeader";
import { IntegrationsTab } from "@/components/platform/company/tabs/IntegrationsTab";
import { API_KEYS, INTEGRATIONS, WEBHOOKS } from "@/lib/platform/company";

export const metadata: Metadata = { title: "Integrations" };

/*
 * Integrations — the Side Menu entry. No Figma frame of its own; it gives the
 * Company › Integrations & API tab (Figma 18514:51517) a page of its own, with
 * counters computed from the same lists, so both stay in step.
 */
export default function IntegrationsPage() {
  const connected = INTEGRATIONS.filter((item) => item.status === "Connected").length;
  const activeHooks = WEBHOOKS.filter((hook) => hook.active).length;

  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Integrations"
        description="Connected services, API keys and webhooks for your company."
        showSearch={false}
        actions={[{ label: "Company Settings", icon: "pencil", href: "/company?tab=integrations" }]}
        utilities={[{ label: "Refresh", icon: "refresh" }]}
      />

      <section aria-label="Integration metrics" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <MetricCard metric={{ label: "Connected Services", value: `${connected} / ${INTEGRATIONS.length}` }} />
        <MetricCard metric={{ label: "API Keys", value: String(API_KEYS.length) }} />
        <MetricCard metric={{ label: "Active Webhooks", value: `${activeHooks} / ${WEBHOOKS.length}` }} />
      </section>

      <section
        aria-label="Integrations"
        className="rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
      >
        <IntegrationsTab />
      </section>
    </div>
  );
}
