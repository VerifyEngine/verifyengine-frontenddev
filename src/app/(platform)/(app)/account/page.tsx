import type { Metadata } from "next";
import { AccountForms } from "@/components/platform/AccountForms";
import { FormProgressList } from "@/components/platform/FormProgressList";
import { PageHeader } from "@/components/platform/PageHeader";

export const metadata: Metadata = { title: "My Account" };

const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "password", label: "Password" },
  { id: "sessions", label: "Sessions" },
] as const;

/*
 * My Account — no Figma frame. The New Order layout: form cards on the left,
 * the section index held in view on the right. The name and email are the
 * signed-in session's, the same values the Top Nav shows.
 */
export default function AccountPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Account", "My Account"]}
        title="My Account"
        description="Your profile, password and sign-in sessions."
        showSearch={false}
        actions={[{ label: "Preferences", icon: "pencil", href: "/settings" }]}
        utilities={[]}
      />
      <div className="flex flex-col gap-2 xl:flex-row xl:items-start">
        <AccountForms name="Account" email="demo@verifyengine.com" />
        <div className="xl:sticky xl:top-0 xl:w-80 xl:shrink-0">
          <FormProgressList sections={SECTIONS} />
        </div>
      </div>
    </div>
  );
}
