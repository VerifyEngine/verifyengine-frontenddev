import type { Metadata } from "next";
import { Eye, Keyboard, Lightbulb, MonitorSmartphone } from "lucide-react";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Verify Engine's commitment to digital accessibility, the standards we aim to meet, and how to request assistance or give feedback.",
};

// Text from the client's "VE_Accessibility Statement" document. The four WCAG
// principles keep the card treatment the design gave them.
const principles = [
  {
    icon: Eye,
    title: "Perceivable",
    description: "Information and interface components should be presented in ways users can perceive.",
  },
  {
    icon: Keyboard,
    title: "Operable",
    description: "Navigation and interactive components should be usable through different input methods.",
  },
  {
    icon: Lightbulb,
    title: "Understandable",
    description: "Information and interface behavior should be clear and predictable.",
  },
  {
    icon: MonitorSmartphone,
    title: "Robust",
    description: "Content should support a range of browsers, devices, and assistive technologies.",
  },
];

const principleCards = (
  <ul className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
    {principles.map((principle) => (
      <li
        key={principle.title}
        className="flex flex-col items-center rounded-xl border border-slate-100 px-4 py-6 text-center"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-mint-100 text-teal-600">
          <principle.icon className="size-5" strokeWidth={1.75} />
        </span>
        <p className="mt-3 text-base font-bold text-ink-900">{principle.title}</p>
        <p className="mt-1.5 text-base leading-relaxed text-slate-600">{principle.description}</p>
      </li>
    ))}
  </ul>
);

const sections: LegalSection[] = [
  {
    heading: "Our Commitment to Accessibility",
    numbered: false,
    content: [
      "Verify Engine is committed to making our website and digital services accessible and usable for individuals with disabilities.",
      "We believe that access to information, technology, and business services should be available to everyone, regardless of ability or the technologies they use.",
      "Our goal is to provide an inclusive digital experience for visitors exploring our products, requesting information, scheduling demonstrations, and communicating with our team.",
      "We recognize that accessibility is an ongoing process and are committed to identifying and addressing barriers as our website and services evolve.",
    ],
  },
  {
    heading: "Accessibility Standards",
    content: [
      "Verify Engine aims to align its public website with the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA, published by the World Wide Web Consortium (W3C).",
      "These guidelines provide recommendations for making digital content more accessible to people with visual, auditory, physical, speech, cognitive, neurological, and other disabilities.",
      "Our accessibility efforts are guided by four fundamental principles:",
      { node: principleCards },
      "Our stated goal does not represent a certification or guarantee that every part of the website currently conforms to WCAG 2.2 Level AA.",
    ],
  },
  {
    heading: "Accessibility Features",
    content: [
      "As part of our accessibility efforts, we seek to incorporate the following practices where applicable:",
      { subheading: "Keyboard Accessibility" },
      "Website navigation, forms, buttons, and interactive elements should be accessible without requiring a mouse.",
      { subheading: "Screen Reader Compatibility" },
      "We aim to use appropriate semantic structures, labels, and descriptions to support assistive technologies.",
      { subheading: "Readable Content" },
      "We strive to provide clear text, understandable navigation, and consistent layouts.",
      { subheading: "Color and Contrast" },
      "We seek to maintain sufficient contrast between text, interface elements, and backgrounds to improve readability.",
      { subheading: "Alternative Text" },
      "Meaningful images and graphics should include appropriate text alternatives when needed.",
      { subheading: "Responsive Design" },
      "Our website is designed to support different screen sizes and devices, including desktop computers, tablets, and mobile phones.",
      { subheading: "Forms and Interactive Elements" },
      "We aim to provide clear labels, instructions, and error messages for contact forms, demonstration requests, and other interactive features.",
    ],
  },
  {
    heading: "Assistive Technologies",
    content: [
      "We aim to support visitors using commonly available assistive technologies, including:",
      {
        list: [
          "Screen readers.",
          "Keyboard-only navigation.",
          "Screen magnification.",
          "Browser zoom and text resizing.",
          "Voice recognition and alternative input methods.",
          "Operating system accessibility features.",
        ],
      },
      "Actual compatibility may vary depending on the browser, device, assistive technology, and specific website feature.",
    ],
  },
  {
    heading: "Third-Party Content and Integrations",
    content: [
      "Certain website features may rely on third-party services, including scheduling tools, embedded demonstrations, communication systems, and external websites.",
      "Although we seek to work with providers that support accessible experiences, we may not control every aspect of third-party interfaces.",
      "If a third-party feature creates an accessibility barrier, we encourage visitors to contact us so we can evaluate the issue and, where feasible, offer an alternative way to access the information or service.",
    ],
  },
  {
    heading: "Ongoing Accessibility Improvements",
    content: [
      "Accessibility is an ongoing responsibility.",
      "As our website evolves, we intend to consider accessibility during design, development, content updates, and the introduction of new features.",
      "Our improvement efforts may include:",
      {
        list: [
          "Reviewing website navigation and structure.",
          "Evaluating interactive forms and controls.",
          "Addressing identified accessibility barriers.",
          "Improving compatibility with assistive technologies.",
          "Considering accessibility when selecting third-party services.",
          "Incorporating accessibility considerations into future development.",
        ],
      },
      "We recognize that some barriers may remain and welcome feedback to help us prioritize improvements.",
    ],
  },
  {
    heading: "Known Limitations",
    content: [
      "Despite our accessibility goals, certain content or interactive features may not yet provide an optimal experience for every visitor or assistive technology.",
      "This may include newly introduced features, third-party integrations, or complex interactive demonstrations.",
      "We are committed to reviewing reported issues and working toward reasonable solutions.",
      "Where appropriate, we will seek to provide alternative access to information or assistance.",
    ],
  },
  {
    heading: "Accessibility Assistance and Feedback",
    content: [
      "We welcome feedback from visitors who experience difficulty accessing any part of our website.",
      "If you encounter an accessibility barrier, please contact us at:",
      {
        lines: [
          "Verify Engine Accessibility Support",
          "Email: support@verifyengine.ai",
          "Website: https://verifyengine.ai",
        ],
      },
      "When contacting us, please include, if possible:",
      {
        list: [
          "The webpage or feature involved.",
          "A description of the accessibility issue.",
          "The browser, device, or assistive technology used, if relevant.",
          "Your preferred method of communication.",
        ],
      },
      "You are not required to disclose a disability or medical condition to request accessibility assistance.",
      "We will review accessibility concerns and make reasonable efforts to respond and provide assistance.",
    ],
  },
  {
    heading: "Alternative Access to Information",
    content: [
      "If you cannot access information or complete an action through our website because of an accessibility barrier, please contact us.",
      "Where reasonably available, we will work to provide the requested information or assistance through an alternative method.",
      "This may include email correspondence, telephone assistance, or another appropriate communication format.",
    ],
  },
  {
    heading: "Legal and Accessibility Considerations",
    content: [
      "Verify Engine recognizes the importance of applicable disability rights and accessibility requirements, including the Americans with Disabilities Act (ADA), where applicable.",
      "We aim to improve the accessibility of our digital services consistent with applicable legal requirements and recognized accessibility standards.",
      "This statement describes our accessibility commitment and does not limit any rights available under applicable law.",
    ],
  },
  {
    heading: "Updates to This Statement",
    content: [
      "We may update this Accessibility Statement as our website, accessibility practices, or applicable requirements change.",
      "The date above will reflect the latest revision.",
    ],
  },
  {
    heading: "Contact Verify Engine",
    numbered: false,
    content: [
      {
        lines: [
          "Verify Engine",
          "Website: https://verifyengine.ai",
          "Accessibility Support: support@verifyengine.ai",
          "General Inquiries: support@verifyengine.ai",
        ],
      },
      "For information about how we collect and process personal information, please review our Privacy Policy.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" lastUpdated="October 12, 2026" sections={sections} />
  );
}
