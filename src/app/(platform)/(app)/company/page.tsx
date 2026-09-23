import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { CompanySummary } from "@/components/platform/company/CompanySummary";
import { CompanyTabs } from "@/components/platform/company/CompanyTabs";
import { BrandingTab } from "@/components/platform/company/tabs/BrandingTab";
import { ChromeExtensionTab } from "@/components/platform/company/tabs/ChromeExtensionTab";
import { DocumentLibraryTab } from "@/components/platform/company/tabs/DocumentLibraryTab";
import { IntegrationsTab } from "@/components/platform/company/tabs/IntegrationsTab";
import { NotificationsTab } from "@/components/platform/company/tabs/NotificationsTab";
import { ProfileTab } from "@/components/platform/company/tabs/ProfileTab";
import { SecurityTab } from "@/components/platform/company/tabs/SecurityTab";
import { UsersTab } from "@/components/platform/company/tabs/UsersTab";
import { COMPANY_HEADER, COMPANY_TABS } from "@/lib/platform/company";

export const metadata: Metadata = { title: "Company" };

/*
 * Company — Figma section 18510:18576, eight tabs chosen by ?tab=.
 *
 * The header keeps the design's actions. Its title and breadcrumb were left
 * over from the Client Profile frame the design was duplicated from, so they
 * name the company the tabs describe instead.
 */
export default async function CompanyPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const active = COMPANY_TABS.some((t) => t.slug === tab) ? (tab as string) : "profile";

  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Company"]}
        title={COMPANY_HEADER.name}
        meta={COMPANY_HEADER.meta}
        showSearch={false}
        actions={[
          { label: "Active", icon: "none", status: "success" },
          { label: "Feature Flags", icon: "flag" },
          { label: "Preview", icon: "review" },
          { label: "Audit Log", icon: "book" },
          { label: "Billing", icon: "dollar" },
          { label: "Edit Company", icon: "pencil", primary: true },
        ]}
        utilities={[
          { label: "Compliance Freeze", icon: "ban" },
          { label: "Usage Cap", icon: "shield" },
          { label: "Refresh", icon: "refresh" },
          { label: "Download PDF", icon: "download" },
        ]}
      />

      <CompanySummary />

      <CompanyTabs active={active}>
        {active === "users" ? (
          <UsersTab />
        ) : active === "branding" ? (
          <BrandingTab />
        ) : active === "notifications" ? (
          <NotificationsTab />
        ) : active === "integrations" ? (
          <IntegrationsTab />
        ) : active === "chrome-extension" ? (
          <ChromeExtensionTab />
        ) : active === "documents" ? (
          <DocumentLibraryTab />
        ) : active === "security" ? (
          <SecurityTab />
        ) : (
          <ProfileTab />
        )}
      </CompanyTabs>
    </div>
  );
}
