import type { Metadata } from "next";
import { MetricCard } from "@/components/platform/MetricCard";
import { PageHeader } from "@/components/platform/PageHeader";
import { VerificationsBrowser } from "@/components/platform/VerificationsBrowser";
import { PRIMARY_METRICS, VERIFICATION_QUEUE } from "@/lib/platform/dashboard";

export const metadata: Metadata = { title: "Verifications" };

/*
 * Verifications — the full list the Dashboard's queue previews. No Figma
 * frame; composed from the Dashboard's metric row and queue table so the two
 * screens read as one. Rows open the existing Verification Details route.
 */
export default function VerificationsPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Verifications"
        description="Every verification file, with its status, confidence and last action."
        showSearch={false}
        actions={[{ label: "New Order", icon: "plus", primary: true, href: "/orders/new" }]}
      />

      <section
        aria-label="Verification metrics"
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5"
      >
        {PRIMARY_METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <VerificationsBrowser rows={VERIFICATION_QUEUE} />
    </div>
  );
}
