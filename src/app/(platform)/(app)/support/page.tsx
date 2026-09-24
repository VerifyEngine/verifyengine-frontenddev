import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { SupportCenter } from "@/components/platform/SupportCenter";

export const metadata: Metadata = { title: "Support" };

/* Support — no Figma frame. Common questions beside a request form. */
export default function SupportPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Support"
        description="Answers to common questions, or send the team a request."
        showSearch={false}
        actions={[{ label: "Send Feedback", icon: "pencil", href: "/feedback" }]}
        utilities={[]}
      />
      <SupportCenter />
    </div>
  );
}
