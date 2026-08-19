import {
  UserRound,
  UploadCloud,
  ShieldCheck,
  CircleCheck,
  FileText,
  Database,
  BrainCircuit,
  UserCog,
  Lock,
} from "lucide-react";
import type { ProcessStep } from "@/components/sections/process/ProcessPage";
import type { SummaryStep } from "@/components/sections/process/VerificationSummaryCard";

/**
 * Shared content for the six verification-process pages.
 *
 * The designs repeat the same five-stage skeleton on every page and only vary
 * the wording of the first two steps and the domain-specific detail, so the
 * identical parts live here rather than being copy-pasted six times.
 */

export const summaryStages: SummaryStep[] = [
  { icon: UserRound, label: "Application" },
  { icon: UploadCloud, label: "Verifications" },
  { icon: ShieldCheck, label: "AI Analysis" },
  { icon: CircleCheck, label: "Decision" },
  { icon: FileText, label: "Report" },
];

export const workflowSubtitle =
  "From request to result—our process is designed for accuracy, speed, and compliance.";

/**
 * Builds the five workflow cards. Steps 1 and 2 differ per vertical; steps 3
 * to 5 are the same wording everywhere except for the noun in the final one.
 */
export function buildWorkflowSteps({
  requestedDescription,
  initiatedDescription,
  analysisDescription = "AI analyzes the data instantly, while human review ensures accuracy, context, and compliance.",
  reportNoun,
  requestedTitle = "Verification Requested",
}: {
  requestedDescription: string;
  initiatedDescription: string;
  analysisDescription?: string;
  reportNoun: string;
  requestedTitle?: string;
}): ProcessStep[] {
  return [
    { icon: UserRound, title: requestedTitle, description: requestedDescription },
    { icon: UploadCloud, title: "Verifications Initiated", description: initiatedDescription },
    { icon: ShieldCheck, title: "AI + Human Analysis", description: analysisDescription },
    {
      icon: CircleCheck,
      title: "Decision Generated",
      description:
        "Get a clear verification result and VE Score™ with explainable insights you can trust.",
    },
    {
      icon: FileText,
      title: "Report Delivered",
      description: `Receive a detailed report with verified ${reportNoun} information in seconds.`,
    },
  ];
}

/** The four "behind the scenes" cards, with per-vertical copy. */
export function buildBehindTheScenes({
  dataSources,
  aiIntelligence,
  humanLoop,
  compliance,
}: {
  dataSources: string;
  aiIntelligence: string;
  humanLoop: string;
  compliance: string;
}) {
  return [
    { icon: Database, title: "Data from Trusted Sources", description: dataSources },
    { icon: BrainCircuit, title: "AI-Powered Intelligence", description: aiIntelligence },
    { icon: UserCog, title: "Human in the Loop", description: humanLoop },
    { icon: Lock, title: "Secure & Compliant", description: compliance },
  ];
}

export const defaultCta = {
  title: "See the Verify Engine Difference",
  description:
    "Join thousands of landlords who verify faster, reduce risk, and make better decisions.",
};
