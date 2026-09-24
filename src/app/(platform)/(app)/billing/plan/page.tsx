import type { Metadata } from "next";
import Link from "next/link";
import { IconCreditCard, IconFileInvoice, IconPackage } from "@tabler/icons-react";
import { EmptyState } from "@/components/platform/EmptyState";
import { FormCard, FormPanel } from "@/components/platform/FormCard";
import { MetricCard } from "@/components/platform/MetricCard";
import { PageHeader } from "@/components/platform/PageHeader";
import { iconProps } from "@/components/platform/icon";
import { SIDE_METRICS } from "@/lib/platform/dashboard";

export const metadata: Metadata = { title: "Plan & Payment" };

/*
 * Plan & Payment — no Figma frame. Usage uses the figures the Dashboard
 * already shows. There is no plan or payment data anywhere yet, so those
 * cards show their empty state rather than a made-up price or card.
 *
 * Card details are never typed into this page: when billing is connected,
 * "Add Payment Method" opens the payment provider's own secure form.
 */

const LINK_BUTTON =
  "flex items-center justify-center gap-3 self-start rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-app-text transition-colors hover:bg-app-fade-48";

export default function PlanPage() {
  const usage = SIDE_METRICS.find((metric) => metric.label === "Billing Usage");
  const percent = usage ? Number.parseInt(usage.value, 10) : 0;

  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Billing", "Plan & Payment"]}
        title="Plan & Payment"
        description="Your plan, how much of it you have used this month, and how you pay."
        showSearch={false}
        actions={[{ label: "Invoices", icon: "file-report", href: "/invoices" }]}
        utilities={[]}
      />

      <section aria-label="Usage" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {SIDE_METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <FormCard id="usage" title="This Month's Usage">
        <FormPanel>
          <div className="flex items-end justify-between gap-4">
            <span className="text-body-s text-app-text">Included verification volume</span>
            <span className="text-heading-s text-app-text-emphasis">{usage?.value ?? "—"}</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Plan usage"
            className="h-3 overflow-hidden rounded-app-7xl bg-app-brand1-quaternary"
          >
            <div
              className={`h-full rounded-app-7xl ${percent >= 90 ? "bg-app-warning" : percent >= 75 ? "bg-app-accent" : "bg-app-success"}`}
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>
          <p className="text-body-xs text-app-text-secondary">
            The bar turns orange past 75% and red past 90%, so a busy month is visible before it ends.
          </p>
        </FormPanel>
      </FormCard>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
        <FormCard id="plan" title="Current Plan">
          <FormPanel>
            <EmptyState
              icon={<IconPackage {...iconProps(20)} />}
              title="Plan details are on their way"
              description="Your plan name, price and included volume appear here once the billing account is connected."
              action={
                <Link href="/support" className={LINK_BUTTON}>
                  <span className="text-label-xs">Talk to us about plans</span>
                </Link>
              }
            />
          </FormPanel>
        </FormCard>

        <FormCard id="payment" title="Payment Method">
          <FormPanel>
            <EmptyState
              icon={<IconCreditCard {...iconProps(20)} />}
              title="No payment method on file"
              description="Cards are added through the payment provider's secure form, never typed into this page."
              action={
                <button type="button" disabled className={`${LINK_BUTTON} cursor-not-allowed opacity-50`}>
                  <span className="text-label-xs">Add Payment Method</span>
                </button>
              }
            />
          </FormPanel>
        </FormCard>
      </div>

      <FormCard id="history" title="Billing History">
        <FormPanel>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-3 text-body-s text-app-text">
              <IconFileInvoice {...iconProps(20)} />
              Every invoice, with its status and PDF, is in Invoices.
            </span>
            <Link href="/invoices" className={LINK_BUTTON}>
              <span className="text-label-xs">Open Invoices</span>
            </Link>
          </div>
        </FormPanel>
      </FormCard>
    </div>
  );
}
