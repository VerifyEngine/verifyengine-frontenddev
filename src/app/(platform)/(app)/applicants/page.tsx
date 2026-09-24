import type { Metadata } from "next";
import { ApplicantsBrowser } from "@/components/platform/ApplicantsBrowser";
import { MetricCard } from "@/components/platform/MetricCard";
import { PageHeader } from "@/components/platform/PageHeader";
import { APPLICANTS } from "@/lib/platform/applicants";

export const metadata: Metadata = { title: "Applicants" };

/*
 * Applicants — no Figma frame. One row per person across all verification
 * files, with the latest file's property, client and status. Counts are
 * computed from the same list, never typed in.
 */
export default function ApplicantsPage() {
  const verified = APPLICANTS.filter((row) => row.latestStatus === "Verified").length;
  const open = APPLICANTS.filter((row) =>
    ["Pending", "In Progress", "Escalated"].includes(row.latestStatus),
  ).length;

  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Applicants"
        description="Everyone who has been through a verification, and where their latest file stands."
        showSearch={false}
        actions={[{ label: "New Order", icon: "plus", primary: true, href: "/orders/new" }]}
      />

      <section aria-label="Applicant metrics" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <MetricCard metric={{ label: "Total Applicants", value: String(APPLICANTS.length) }} />
        <MetricCard metric={{ label: "Latest File Verified", value: String(verified) }} />
        <MetricCard metric={{ label: "Latest File Still Open", value: String(open) }} />
      </section>

      <ApplicantsBrowser rows={APPLICANTS} />
    </div>
  );
}
