import type { Metadata } from "next";
import {
  ActivityTimeline,
  FlagList,
  NotesList,
  ResponseList,
} from "@/components/platform/ActivityPanels";
import { AccordionCard, DetailCard } from "@/components/platform/DetailCard";
import { ConfidenceCard } from "@/components/platform/ConfidenceCard";
import { MetricCard } from "@/components/platform/MetricCard";
import { PageHeader } from "@/components/platform/PageHeader";
import { ScoreGaugeCard } from "@/components/platform/ScoreGaugeCard";
import { ScoreRadarCard } from "@/components/platform/ScoreRadarCard";
import { AdminActionsCard, AiSummaryCard } from "@/components/platform/SummaryCards";
import {
  ADMIN_ACTIONS,
  AI_SUMMARY,
  CONFIDENCE,
  DETAIL_SECTIONS,
  FRAUD_FLAGS,
  LANDLORD_RESPONSES,
  NOTES,
  ORDER,
  ORDER_METRICS,
  SCORE_RADAR,
  TIMELINE,
  VE_SCORE,
} from "@/lib/platform/order-details";

export const metadata: Metadata = { title: "Verification Details" };

/*
 * Verification Details — Figma node 18176:20341, where the frame is named
 * "Order Details" but the screen itself is titled Verification Details. The
 * route matches the link the dashboard queue table already points at.
 *
 * The design exists only in the Dark Mode section of the file. Nothing here is
 * a dark-specific colour, though: every surface and text colour is a token that
 * already has a light value, so the light theme comes out of the same markup.
 *
 * Layout at 1920: a 1656 content area holding a four-card score band, a row of
 * seven counters, then a body split 1230 / 410. Inside the 1230 the detail
 * cards and the radar column sit side by side at 611 each.
 *
 * The route is dynamic so the header can name the record, but there is no
 * backend yet — every order id renders the one file the design draws, and the
 * module it comes from is replaced by a single fetch once the endpoint exists.
 */
export default async function VerificationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Order", "Verification Details"]}
        backHref="/dashboard"
        title={ORDER.applicant}
        description={`${ORDER.address} • ${ORDER.reference}`}
        showSearch={false}
        actions={[
          { label: "Manual Review", icon: "review" },
          { label: "Escalate", icon: "escalate" },
          { label: "Override Results", icon: "check" },
          { label: "Escalate", icon: "escalate", primary: true },
        ]}
        utilities={[
          { label: "View Transcript", icon: "transcript" },
          { label: "Replay Call", icon: "replay" },
          { label: "Email Report", icon: "email" },
          { label: "Download PDF", icon: "download" },
        ]}
      />

      <section aria-label="Verification scores" className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-4">
        <ScoreGaugeCard {...VE_SCORE} />
        <ConfidenceCard {...CONFIDENCE} />
        <AiSummaryCard {...AI_SUMMARY} />
        <AdminActionsCard title="Super Admin Actions" actions={ADMIN_ACTIONS} />
      </section>

      <section
        aria-label="Outreach counters"
        className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7"
      >
        {ORDER_METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <div className="flex flex-col gap-2 2xl:flex-row 2xl:items-start">
        <div className="flex min-w-px flex-1 flex-col gap-2 lg:flex-row lg:items-start">
          <div className="flex min-w-px flex-1 flex-col gap-2">
            {DETAIL_SECTIONS.map((section) => (
              <DetailCard key={section.title} title={section.title} items={section.items} />
            ))}
          </div>

          <div className="flex min-w-px flex-1 flex-col gap-2">
            <ScoreRadarCard title="Score Radar" axes={SCORE_RADAR} />
            <AccordionCard title="AI Transcript" />
            <AccordionCard title="Source Verification" />
          </div>
        </div>

        <div className="flex flex-col gap-2 2xl:w-[410px] 2xl:shrink-0">
          <ActivityTimeline title="Timeline of Activity" entries={TIMELINE} />
          <ResponseList title="Landlord Responses" rows={LANDLORD_RESPONSES} />
          <FlagList title="Landlord Responses" rows={FRAUD_FLAGS} />
          <NotesList title="Notes" rows={NOTES} />
        </div>
      </div>
    </div>
  );
}
