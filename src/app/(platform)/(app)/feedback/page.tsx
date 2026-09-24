import type { Metadata } from "next";
import { FeedbackForm } from "@/components/platform/FeedbackForm";
import { PageHeader } from "@/components/platform/PageHeader";

export const metadata: Metadata = { title: "Feedback" };

/* Feedback — no Figma frame. A rating, the areas it concerns, and a message. */
export default function FeedbackPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Feedback"
        description="Tell the product team what is working and what is not."
        showSearch={false}
        actions={[{ label: "Get Support", icon: "book", href: "/support" }]}
        utilities={[]}
      />
      <div className="xl:max-w-4xl">
        <FeedbackForm />
      </div>
    </div>
  );
}
