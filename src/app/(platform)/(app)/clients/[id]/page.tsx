import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { ProfileSummary } from "@/components/platform/client-profile/ProfileSummary";
import {
  FieldGrid,
  ProfileTabs,
  TabNotDesigned,
  TabSection,
} from "@/components/platform/client-profile/ProfileTabs";
import {
  CLIENT_PROFILE,
  COMPANY_PROFILE_FIELDS,
  CONTRACT_FIELDS,
  PROFILE_TABS,
  REGIONAL_RESTRICTIONS,
} from "@/lib/platform/client-profile";

export const metadata: Metadata = { title: "Client Profile" };

/*
 * Client Profile — Figma section 18398:227163.
 *
 * Header, the shared summary, then eight tabs chosen by ?tab=. The mock serves
 * one client whatever the id, until the client endpoint exists.
 *
 * The tab bodies were drawn in DM Sans at 9–12px, outside the platform's type
 * system; they are set here in the platform's own styles at the same
 * hierarchy, scaled like the rest of the platform.
 */
export default async function ClientProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  const active = PROFILE_TABS.some((t) => t.slug === tab) ? (tab as string) : "overview";
  const activeTab = PROFILE_TABS.find((t) => t.slug === active)!;

  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Clients", "Client Profile"]}
        title={CLIENT_PROFILE.name}
        description={CLIENT_PROFILE.description}
        meta={`${CLIENT_PROFILE.id}  •  ${CLIENT_PROFILE.tier}`}
        showSearch={false}
        actions={[
          { label: CLIENT_PROFILE.status, icon: "none", status: "success" },
          { label: "Feature Flags", icon: "flag" },
          { label: "Preview", icon: "review" },
          { label: "Audit Log", icon: "book" },
          { label: "Billing", icon: "dollar" },
          { label: "Edit Client", icon: "pencil", primary: true },
        ]}
        utilities={[
          { label: "Compliance Freeze", icon: "ban" },
          { label: "Usage Cap", icon: "shield" },
          { label: "Refresh", icon: "refresh" },
          { label: "Download PDF", icon: "download" },
        ]}
      />

      <ProfileSummary />

      <ProfileTabs basePath={`/clients/${encodeURIComponent(id)}`} active={active}>
        {active === "overview" ? (
          <div className="flex flex-col gap-6">
            <TabSection title="Company Profile" first>
              <FieldGrid fields={COMPANY_PROFILE_FIELDS} />
            </TabSection>
            <TabSection title="Contract & Branding">
              <FieldGrid fields={CONTRACT_FIELDS} />
            </TabSection>
            <TabSection title="Regional Restrictions">
              <ul className="flex flex-wrap gap-2">
                {REGIONAL_RESTRICTIONS.map((state) => (
                  <li key={state} className="rounded-full bg-app-fade-48 px-2.5 py-1 text-body-2xs text-app-heading">
                    {state}
                  </li>
                ))}
              </ul>
            </TabSection>
          </div>
        ) : (
          <TabNotDesigned label={activeTab.label} />
        )}
      </ProfileTabs>
    </div>
  );
}
