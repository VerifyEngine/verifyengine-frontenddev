import type { Metadata } from "next";
import Link from "next/link";
import { CompanyPage, type CompanySection } from "@/components/sections/CompanyPage";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Verify Engine — sales, support, and general enquiries, with the fastest route for each.",
};

const sections: CompanySection[] = [
  {
    heading: "How to reach us",
    paragraphs: [
      "The quickest route depends on what you need. If you are evaluating Verify Engine, booking a demo puts you straight in front of someone who can answer platform questions and run a live verification with you.",
      "If you are already a customer with a question about a report in progress, sign in and open the verification — the fastest answers come with the record attached.",
    ],
  },
];

/** Each route says plainly who it is for, so nobody has to guess. */
const routes = [
  {
    title: "Talk to sales",
    description:
      "Pricing, volume, integrations, and anything about whether Verify Engine fits your workflow.",
    action: "Book a demo",
    href: "/book-demo",
  },
  {
    title: "Start using the platform",
    description: "Create an account and run your first verification without talking to anyone.",
    action: "Get started",
    href: "/get-started",
  },
  {
    title: "Customer support",
    description:
      "Questions about a verification in progress, a report, or your account. Sign in first so we can see the record.",
    action: "Client login",
    href: "/login",
  },
  {
    title: "Everything else",
    description:
      "Press, partnerships, security disclosures, or anything that does not fit above — email hello@verifyengine.com.",
    action: "Read our FAQ",
    href: "/faq",
  },
];

export default function ContactPage() {
  return (
    <CompanyPage
      badge="Contact Us"
      title="Tell us what you need and"
      titleAccent="we'll point you the right way"
      intro="Whether you are evaluating Verify Engine, already running verifications, or here about something else entirely, this is the fastest way to reach the right person."
      sections={sections}
      cta={{
        title: "Prefer to just talk it through?",
        subtitle: "Book a 20-minute call and we'll answer whatever you bring.",
      }}
    >
      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {routes.map((route) => (
          <RevealItem key={route.title}>
            <Link
              href={route.href}
              className="group flex h-full flex-col rounded-2xl border border-slate-100 p-6 transition-shadow duration-200 hover:shadow-card"
            >
              <h3 className="text-lg font-bold text-ink-900 group-hover:text-teal-700">
                {route.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{route.description}</p>
              <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-teal-600">
                {route.action} <ArrowRight />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </CompanyPage>
  );
}
