import type { Metadata } from "next";
import { PageHeader } from "@/components/platform/PageHeader";
import { ToolsGrid } from "@/components/platform/ToolsGrid";

export const metadata: Metadata = { title: "Tools" };

/* Tools — no Figma frame. Everyday utilities for the verification team. */
export default function ToolsPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Tools"
        description="Quick utilities for day-to-day verification work."
        showSearch={false}
        utilities={[]}
      />
      <ToolsGrid />
    </div>
  );
}
