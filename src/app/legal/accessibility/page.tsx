import type { Metadata } from "next";
import { Eye, Keyboard, Lightbulb, MonitorSmartphone } from "lucide-react";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Verify Engine's commitment to digital accessibility, the standards we follow, and how to give us feedback.",
};

const principles = [
  {
    icon: Eye,
    title: "Perceivable",
    description: "Content is presented in ways users can perceive.",
  },
  {
    icon: Keyboard,
    title: "Operable",
    description: "Interface components are usable by all users.",
  },
  {
    icon: Lightbulb,
    title: "Understandable",
    description: "Information and operation are easy to understand.",
  },
  {
    icon: MonitorSmartphone,
    title: "Robust",
    description: "Content works across current and future technologies.",
  },
];

const sections: LegalSection[] = [
  {
    heading: "Our Commitment",
    paragraphs: [
      "We strive to make our website and platform accessible and usable by all individuals, including those with disabilities. We believe everyone should have equal access to information and technology.",
    ],
  },
  {
    heading: "Standards We Follow",
    paragraphs: [
      "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA published by the World Wide Web Consortium (W3C). These guidelines rest on four principles:",
    ],
  },
  {
    heading: "Ongoing Improvements",
    paragraphs: [
      "Accessibility is continuous work rather than a one-time project. We review new features against our standards, test with assistive technologies, and address issues as they are identified.",
    ],
  },
  {
    heading: "Feedback",
    paragraphs: [
      "If you encounter a barrier using our website or platform, we want to hear about it. Contact us at accessibility@verifyengine.ai with a description of the problem and the page where it occurred.",
    ],
  },
  {
    heading: "Compatibility",
    paragraphs: [
      "Our site is designed to work with current versions of major browsers and with screen readers and other assistive technologies. Some third-party content may not be fully accessible; we work with our providers to improve it.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: [
      "For accessibility questions or to request information in an alternative format, contact accessibility@verifyengine.ai.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      lastUpdated="May 1, 2024"
      intro="Verify Engine is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards."
      sections={sections}
    >
      {/* The four WCAG principles, illustrated as the design shows. */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle) => (
          <div
            key={principle.title}
            className="flex flex-col items-center rounded-xl border border-slate-100 px-4 py-6 text-center"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-mint-100 text-teal-600">
              <principle.icon className="size-5" strokeWidth={1.75} />
            </span>
            <p className="mt-3 text-sm font-bold text-ink-900">{principle.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </LegalPage>
  );
}
