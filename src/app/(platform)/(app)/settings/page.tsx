import type { Metadata } from "next";
import { FormProgressList } from "@/components/platform/FormProgressList";
import { PageHeader } from "@/components/platform/PageHeader";
import { SettingsForm } from "@/components/platform/SettingsForm";

export const metadata: Metadata = { title: "Settings" };

const SECTIONS = [
  { id: "appearance", label: "Appearance" },
  { id: "regional", label: "Language & Region" },
  { id: "notifications", label: "Email Notifications" },
] as const;

/* Settings — no Figma frame. Personal preferences, in the New Order layout. */
export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Account", "Settings"]}
        title="Settings"
        description="Your personal preferences. Company-wide settings live in Company."
        showSearch={false}
        actions={[{ label: "My Account", icon: "pencil", href: "/account" }]}
        utilities={[]}
      />
      <div className="flex flex-col gap-2 xl:flex-row xl:items-start">
        <SettingsForm />
        <div className="xl:sticky xl:top-0 xl:w-80 xl:shrink-0">
          <FormProgressList sections={SECTIONS} />
        </div>
      </div>
    </div>
  );
}
