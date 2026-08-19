import type { Metadata } from "next";
import {
  Users,
  Monitor,
  BarChart3,
  ShieldCheck,
  MessagesSquare,
  Building2,
  Briefcase,
  Landmark,
  HeartPulse,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";
import { SplitFormHero } from "@/components/sections/SplitFormHero";
import { BookDemoForm } from "@/components/marketing/BookDemoForm";
import { StepsRow } from "@/components/sections/StepsRow";
import { AudienceCards } from "@/components/sections/AudienceCards";
import { LogosRow } from "@/components/sections/LogosRow";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Schedule a personalized Verify Engine demo and see how AI-powered verification can streamline your processes and reduce risk.",
};

const agenda = [
  {
    icon: Users,
    title: "1. Understand Your Goals",
    description: "We'll learn about your verification needs, challenges, and goals.",
  },
  {
    icon: Monitor,
    title: "2. Personalized Walkthrough",
    description: "See how Verify Engine works with real examples relevant to your industry.",
  },
  {
    icon: BarChart3,
    title: "3. ROI & Impact",
    description: "Discover how our platform saves time, reduces risk, and improves outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "4. Security & Compliance",
    description: "Learn about our enterprise-grade security, compliance, and data protection.",
  },
  {
    icon: MessagesSquare,
    title: "5. Q&A Session",
    description: "Get answers to your questions and discuss next steps.",
  },
];

const audiences = [
  {
    icon: Building2,
    title: "Property Managers",
    description: "Streamline tenant screening and reduce manual work.",
  },
  {
    icon: Briefcase,
    title: "HR & Talent Teams",
    description: "Verify employment and credentials with speed and accuracy.",
  },
  {
    icon: Landmark,
    title: "Lenders & Banks",
    description: "Reduce fraud risk and accelerate loan approvals.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Providers",
    description: "Verify healthcare professionals and employment history.",
  },
  {
    icon: GraduationCap,
    title: "Educators",
    description: "Verify faculty, staff, and student credentials instantly.",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance Officers",
    description: "Ensure adherence to regulations and reduce compliance risk.",
  },
];

const logos = ["appfolio", "YARDI", "Buildium", "TazWorks", "ProScreen", "RentPrep"];

export default function BookDemoPage() {
  return (
    <>
      <SplitFormHero
        badge="Book a Demo"
        title={
          <>
            See Verify Engine <span className="text-mint-200">in Action</span>
          </>
        }
        subtitle="Schedule a personalized demo to see how our AI-powered verification platform can streamline your processes, reduce risk, and drive better outcomes."
        highlights={[
          "Personalized walkthrough of our platform",
          "See real use cases for your industry",
          "Get answers to your specific questions",
        ]}
        helpCard={{
          title: "Prefer to talk now?",
          description: "Call us at (888) verify-01 or email sales@verifyengine.ai",
          ctaLabel: "Contact sales",
          ctaHref: "/contact",
        }}
      >
        <BookDemoForm />
      </SplitFormHero>

      <StepsRow
        eyebrow="What to Expect"
        title="A Demo Built Around Your Needs"
        subtitle="Our experts will tailor the demo to your unique challenges and show you how Verify Engine can help you achieve your verification goals."
        steps={agenda}
        numbered={false}
        background="white"
      />

      <AudienceCards
        eyebrow="Who It's For"
        title="Designed for Verification Leaders"
        subtitle="Our demo is ideal for teams and leaders responsible for verification, risk, compliance, and operational efficiency."
        audiences={audiences}
        columns={6}
        background="muted"
      />

      <LogosRow label="Trusted by industry leaders" logos={logos} />

      <FinalCta
        title="Ready to Transform Your Verification Process?"
        subtitle="Join thousands of organizations using Verify Engine to automate verification and make confident decisions."
        primaryLabel="See How It Works"
        primaryHref="/how-it-works"
        secondaryLabel="Book Demo"
        secondaryHref="/book-demo"
      />
    </>
  );
}
