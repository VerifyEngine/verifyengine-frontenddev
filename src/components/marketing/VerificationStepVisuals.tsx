import {
  IconChartBar,
  IconFileAnalytics,
  IconHome,
  IconPhoneCall,
  IconPhoneOff,
  IconRobot,
  IconSettings,
  IconShieldCheck,
  IconSparkles,
  IconUser,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import {
  MockAvatar,
  MockBadge,
  MockBar,
  MockCheck,
  MockDivider,
  MockPanel,
  MockProgress,
  MockRail,
  MockRing,
  MockRow,
  MockShell,
  MockTag,
  MockTile,
  MockTopBar,
} from "@/components/marketing/PlatformMock";
import type { VerificationStepId } from "@/lib/verification-steps";

/*
 * The product visualisations that sit beside each How It Works step.
 *
 * Each one is a slice of the signed-in Verify Engine platform, built from the
 * shared primitives in PlatformMock.tsx: the platform's tokens, Satoshi, the
 * Tabler icon set and its glass panels on the app canvas. They are markup and
 * inline SVG only — no image, video or Lottie — so they stay sharp at any size
 * and cost nothing to load.
 *
 * They are composed at a fixed native width and painted at whatever width the
 * column gives them, so the whole composition scales as one on a large screen
 * rather than sitting small in the middle of the panel.
 */

const railIcons = [
  IconHome,
  IconUser,
  IconShieldCheck,
  IconFileAnalytics,
  IconChartBar,
  IconSettings,
];

/* ------------------------------------------------------------------ *
 * 01 — Applicant Submitted
 * ------------------------------------------------------------------ */
/*
 * The spec lists applicant name, property, previous landlord and contact
 * information here. They are shown as the set of details the request arrived
 * with rather than as filled-in values: an invented name or address on a
 * verification product reads as a fabricated record.
 */
const submittedDetails = [
  "Applicant Information",
  "Property Details",
  "Previous Landlord",
  "Contact Information",
];

function ApplicantSubmittedVisual() {
  return (
    <MockShell nativeWidth={450} nativeHeight={300}>
      <MockTopBar right={<MockBadge tone="brand">New Request</MockBadge>} />
      <MockPanel
        title="Verification Request Received"
        badge={<MockBadge tone="success">Submitted</MockBadge>}
      >
        <ul className="flex flex-col gap-2">
          {submittedDetails.map((detail) => (
            <MockCheck key={detail} label={detail} value="Received" />
          ))}
        </ul>
        <MockDivider />
        <div className="flex flex-col gap-2">
          <p className="text-nav-heading text-app-text-secondary">
            Verification Requested
          </p>
          <div className="flex flex-wrap gap-1.5">
            <MockTag>Rental History</MockTag>
            <MockTag>Identity</MockTag>
            <MockTag>Income</MockTag>
            <MockTag>Fraud Screening</MockTag>
          </div>
        </div>
        <MockTile className="mt-auto">
          <div className="flex items-center justify-between gap-2">
            <span className="text-label-2xs text-app-text">
              Verification started
            </span>
            <span className="text-body-2xs text-app-text-brand1">Queued</span>
          </div>
          <div className="mt-2">
            <MockProgress percent={22} />
          </div>
        </MockTile>
      </MockPanel>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ *
 * 02 — Fraud Detection
 * ------------------------------------------------------------------ */
function FraudDetectionVisual() {
  return (
    <MockShell nativeWidth={450} nativeHeight={300}>
      <MockTopBar right={<MockBadge tone="neutral">Analyzing</MockBadge>} />
      <MockPanel title="Fraud Analysis">
        <div className="flex flex-1 items-center gap-3.5">
          <MockRing percent={92} label="LOW" caption="Risk" />
          <ul className="flex min-w-px flex-1 flex-col gap-2">
            <MockCheck label="Identity Match" value="Pass" />
            <MockCheck label="Phone Validation" value="Pass" />
            <MockCheck label="Property Match" value="Pass" />
            <MockCheck label="Data Consistency" value="Pass" />
          </ul>
        </div>
        <MockTile className="mt-auto">
          <div className="flex items-center justify-between gap-2">
            <span className="text-label-2xs text-app-text">
              Risk Assessment
            </span>
            <MockBadge tone="success">Low Risk</MockBadge>
          </div>
        </MockTile>
      </MockPanel>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ *
 * 03 — Human QA Review
 * ------------------------------------------------------------------ */
const qaChecklist = [
  "Applicant Information",
  "Landlord Information",
  "Property Match",
  "Contact Information",
];

function HumanQaReviewVisual() {
  return (
    <MockShell nativeWidth={450} nativeHeight={300}>
      <MockTopBar right={<MockBadge tone="brand">QA Queue</MockBadge>} />
      <MockPanel
        title="QA Review"
        badge={<MockBadge tone="success">Approved</MockBadge>}
      >
        <MockTile className="flex items-center gap-2.5">
          <MockAvatar initials="QA" />
          <span className="min-w-px flex-1">
            <span className="block text-label-2xs text-app-text">
              Verification Specialist
            </span>
            <span className="block text-body-2xs text-app-text-tertiary">
              Reviews the full file before outreach
            </span>
          </span>
        </MockTile>
        <ul className="flex flex-1 flex-col justify-center gap-2">
          {qaChecklist.map((item) => (
            <MockCheck key={item} label={item} value="Confirmed" />
          ))}
        </ul>
        <MockTile className="mt-auto flex items-center justify-between gap-2">
          <span className="text-label-2xs text-app-text">
            Ready for Verification
          </span>
          <IconShieldCheck
            size={16}
            stroke={1.6}
            className="text-app-success"
            aria-hidden
          />
        </MockTile>
      </MockPanel>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ *
 * 04 — AI Calls Previous Landlord
 * ------------------------------------------------------------------ */
const interviewTurns = [
  {
    from: "ai" as const,
    text: "How long was the applicant a tenant at your property?",
  },
  { from: "landlord" as const, text: "They were a tenant for 14 months." },
  {
    from: "ai" as const,
    text: "Did the applicant pay rent on time during their tenancy?",
  },
];

function AiCallsLandlordVisual() {
  return (
    // The spec draws the phone UI beside the interview panel, so the two sit
    // side by side inside the app shell rather than floating over each other.
    <MockShell nativeWidth={450} nativeHeight={300}>
      <MockTopBar
        right={
          <MockBadge tone="neutral" live>
            Live Call
          </MockBadge>
        }
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <MockPanel
          title="Interview in Progress"
          className="min-w-px flex-1"
          badge={<MockBadge tone="success">Recording</MockBadge>}
        >
          <ul className="flex flex-col gap-2">
            {interviewTurns.map((turn) => (
              <li key={turn.text} className="flex items-start gap-2">
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-app-12xl ${
                    turn.from === "ai"
                      ? "bg-app-brand2-64 text-app-text-brand1"
                      : "bg-app-fade-48 text-app-text-secondary"
                  }`}
                >
                  {turn.from === "ai" ? (
                    <IconRobot size={13} stroke={1.6} aria-hidden />
                  ) : (
                    <IconUser size={13} stroke={1.6} aria-hidden />
                  )}
                </span>
                <span className="rounded-app-l rounded-tl-app-xs border-w-2xs border-app-line bg-app-fade-48 px-2.5 py-2 text-body-2xs text-app-text">
                  {turn.text}
                </span>
              </li>
            ))}
          </ul>
        </MockPanel>

        <PhoneFrame>
          <span className="flex size-9 items-center justify-center rounded-app-12xl bg-app-brand2-64 text-app-text-brand1">
            <IconPhoneCall size={17} stroke={1.6} aria-hidden />
          </span>
          <span className="block">
            <span className="block text-label-2xs text-app-text-brand1">
              Outgoing Call
            </span>
            {/* The party, not a person: no name, number or address stands in
                for an applicant anywhere in these mockups. */}
            <span className="block text-body-2xs text-app-text-secondary">
              Previous Landlord
            </span>
          </span>
          <Waveform />
          <span className="text-body-2xs text-app-text-secondary">02:18</span>
          <span className="mt-auto flex size-8 items-center justify-center rounded-app-12xl bg-app-warning text-app-text-inverse">
            <IconPhoneOff size={15} stroke={1.8} aria-hidden />
          </span>
        </PhoneFrame>
      </div>
    </MockShell>
  );
}

/**
 * The handset the call lands on, for step 04 only.
 *
 * This step is the one moment in the workflow that leaves the platform: the AI
 * dials a real person, and drawing the call as one more glass panel made it
 * look like another dashboard widget. A phone says the outbound call is
 * happening out in the world while the transcript beside it is what Verify
 * Engine captures — the two read as one event rather than two panels.
 *
 * Drawn in markup: rounded shell, camera cutout and side buttons, no image and
 * no device asset. It scales with the rest of the composition through
 * MockShell's zoom like everything else here, which a bitmap of a phone would
 * not do cleanly. The body borrows navy-900 — the brand's own dark — so the
 * hardware sits in the site's palette instead of introducing a device colour.
 */
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[132px] shrink-0 self-stretch sm:mx-0">
      {/* Side buttons. Decorative, and small enough to read as hardware rather
          than as controls a visitor might try to press. */}
      <span
        aria-hidden="true"
        className="absolute top-12 -left-[2px] h-7 w-[2px] rounded-l-full bg-navy-900/45"
      />
      <span
        aria-hidden="true"
        className="absolute top-[86px] -left-[2px] h-5 w-[2px] rounded-l-full bg-navy-900/45"
      />
      <span
        aria-hidden="true"
        className="absolute top-16 -right-[2px] h-9 w-[2px] rounded-r-full bg-navy-900/45"
      />

      <div className="h-full rounded-[26px] bg-navy-900/10 p-[2px]">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border-[3px] border-navy-900 bg-[var(--ve-canvas)]">
          {/* The camera cutout, which is what makes the shape read as a phone
              at this size more than the rounded corners do. */}
          <span
            aria-hidden="true"
            className="absolute top-1.5 left-1/2 z-10 h-[11px] w-10 -translate-x-1/2 rounded-full bg-navy-900"
          />
          <div className="flex flex-1 flex-col items-center gap-2 px-2.5 pt-6 pb-3 text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Waveform() {
  // A fixed bar pattern rather than an animation loop: it reads as audio
  // without adding motion the page does not need.
  const bars = [4, 8, 14, 9, 18, 11, 20, 13, 17, 8, 13, 6];
  return (
    <span className="flex h-5 items-center justify-center gap-[2px]">
      {bars.map((height, i) => (
        <span
          key={i}
          className="w-[2px] rounded-app-12xl bg-app-brand1"
          style={{ height: `${height}px` }}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * 05 — Dynamic Interview
 * ------------------------------------------------------------------ */
function DynamicInterviewVisual() {
  return (
    <MockShell nativeWidth={450} nativeHeight={300}>
      <MockTopBar right={<MockBadge tone="neutral">Question 4</MockBadge>} />
      <MockPanel
        title="Dynamic Interview"
        badge={<MockBadge tone="brand">Adapting</MockBadge>}
      >
        <Turn from="ai">Did the applicant pay rent on time?</Turn>
        <Turn from="landlord">Yes</Turn>

        <div className="flex flex-col gap-2 rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-40 p-3">
          <span className="flex items-center gap-1.5">
            <IconSparkles
              size={14}
              stroke={1.8}
              className="shrink-0 text-app-text-brand1"
              aria-hidden
            />
            <span className="text-nav-heading text-app-text-brand1">
              Follow-Up Generated
            </span>
          </span>
          <span className="block text-body-2xs text-app-text">
            Were there any late payments during the tenancy?
          </span>
        </div>

        <MockTile className="mt-auto flex items-center gap-2">
          <span className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 rounded-app-12xl bg-app-brand1"
              />
            ))}
          </span>
          <span className="text-body-2xs text-app-text-tertiary">
            Questions adapt to every response received
          </span>
        </MockTile>
      </MockPanel>
    </MockShell>
  );
}

function Turn({
  from,
  children,
}: {
  from: "ai" | "landlord";
  children: ReactNode;
}) {
  const isAi = from === "ai";
  return (
    <div className={`flex items-start gap-2 ${isAi ? "" : "flex-row-reverse"}`}>
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-app-12xl ${
          isAi
            ? "bg-app-brand2-64 text-app-text-brand1"
            : "bg-app-fade-48 text-app-text-secondary"
        }`}
      >
        {isAi ? (
          <IconRobot size={13} stroke={1.6} aria-hidden />
        ) : (
          <IconUser size={13} stroke={1.6} aria-hidden />
        )}
      </span>
      <span
        className={`border-w-2xs border-app-line bg-app-fade-48 px-2.5 py-2 text-body-2xs text-app-text ${
          isAi
            ? "rounded-app-l rounded-tl-app-xs"
            : "rounded-app-l rounded-tr-app-xs font-medium"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 06 — Responses Validated
 * ------------------------------------------------------------------ */
const validationRows = [
  { label: "Identity Confirmed", source: "identity records" },
  { label: "Property Confirmed", source: "property records" },
  { label: "Tenancy Dates Confirmed", source: "lease data" },
  { label: "Payment History Confirmed", source: "landlord responses" },
  { label: "Responses Cross-Checked", source: "trusted data sources" },
];

function ResponsesValidatedVisual() {
  return (
    <MockShell nativeWidth={450} nativeHeight={300}>
      <MockTopBar right={<MockBadge tone="brand">5 of 5</MockBadge>} />
      <MockPanel title="Response Validation">
        <ul className="flex flex-col gap-2">
          {validationRows.map((row) => (
            <MockCheck
              key={row.label}
              label={row.label}
              caption={`Checked against ${row.source}`}
            />
          ))}
        </ul>
        <MockTile className="mt-auto flex items-center justify-between gap-2">
          <span className="text-label-2xs text-app-text">
            Verification Complete
          </span>
          <MockBadge tone="success">Validated</MockBadge>
        </MockTile>
      </MockPanel>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ *
 * 07 — Report Delivered
 * ------------------------------------------------------------------ */
/*
 * The report the spec sketches, minus the applicant's name: the rest of the
 * record is outcome data, and a made-up name is the one field that would read
 * as a real person's file.
 */
const reportRows = [
  { label: "Verification Status", value: "Verified" },
  { label: "Tenancy", value: "14 Months" },
  { label: "Payment History", value: "Verified" },
  { label: "Landlord Recommendation", value: "Positive" },
];

function ReportDeliveredVisual() {
  return (
    <MockShell nativeWidth={450} nativeHeight={300}>
      <MockTopBar right={<MockBadge tone="success">Delivered</MockBadge>} />
      <div className="flex gap-2">
        <MockRail icons={railIcons} />
        <MockPanel
          title="Landlord Verification"
          className="min-w-px flex-1"
          badge={<MockBadge tone="success">Verified</MockBadge>}
        >
          <div className="flex flex-col gap-2">
            {reportRows.map((row) => (
              <MockRow key={row.label} label={row.label}>
                <span className="text-body-2xs text-app-success">
                  {row.value}
                </span>
              </MockRow>
            ))}
          </div>

          <MockDivider />

          <div className="flex flex-1 flex-col justify-center gap-1.5">
            <MockBar />
            <MockBar width="w-4/5" />
            <MockBar width="w-2/3" />
          </div>

          <MockTile className="mt-auto flex items-center justify-between gap-3">
            <span className="block">
              <span className="block text-body-2xs text-app-text-tertiary">
                Verification Score
              </span>
              <span className="block text-heading-s text-app-text-brand1">
                92
                <span className="text-body-2xs text-app-text-tertiary">
                  {" "}
                  / 100
                </span>
              </span>
            </span>
            <span className="rounded-app-4xl bg-app-brand1 px-3 py-1.5 text-body-2xs text-app-text-inverse">
              View Report
            </span>
          </MockTile>
        </MockPanel>
      </div>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ */

const visuals: Record<VerificationStepId, () => ReactNode> = {
  "applicant-submitted": ApplicantSubmittedVisual,
  "fraud-detection": FraudDetectionVisual,
  "human-qa-review": HumanQaReviewVisual,
  "ai-calls-landlord": AiCallsLandlordVisual,
  "dynamic-interview": DynamicInterviewVisual,
  "responses-validated": ResponsesValidatedVisual,
  "report-delivered": ReportDeliveredVisual,
};

/**
 * Renders the visualisation for a step, over the soft mint field the reference
 * art puts behind the product surface.
 */
export function StepVisual({ id }: { id: VerificationStepId }) {
  const Visual = visuals[id];
  return (
    <div className="relative flex w-full items-center justify-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-[45%] bg-mint-200/40 blur-3xl"
      />
      <div className="relative w-full">
        <Visual />
      </div>
    </div>
  );
}
