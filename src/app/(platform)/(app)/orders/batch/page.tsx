import type { Metadata } from "next";
import { BatchOrderForm } from "@/components/platform/BatchOrderForm";
import { PageHeader } from "@/components/platform/PageHeader";
import { VerificationProcessCard } from "@/components/platform/VerificationProcessCard";
import { CONSENT_STATEMENT, VERIFICATION_PREFERENCES, VERIFICATION_PROCESS } from "@/lib/platform/new-order";

export const metadata: Metadata = { title: "Batch Order" };

/*
 * Batch Order — no Figma frame. Same two-column layout as New Order: the
 * form on the left, the Verification Process card held in view on the right,
 * moving above the form below xl.
 */
export default function BatchOrderPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Order", "Batch Order"]}
        title="Create Batch Verification Order"
        description="Upload many applicants at once from a CSV file. Every row is checked before it is sent."
        showSearch={false}
        actions={[{ label: "Single Order", icon: "plus", href: "/orders/new" }]}
        utilities={[]}
      />

      <div className="flex flex-col gap-2 xl:flex-row xl:items-start">
        <BatchOrderForm preferences={VERIFICATION_PREFERENCES} consent={CONSENT_STATEMENT} />
        <div className="flex flex-col gap-2 xl:sticky xl:top-0 xl:w-80 xl:shrink-0">
          <VerificationProcessCard {...VERIFICATION_PROCESS} />
        </div>
      </div>
    </div>
  );
}
