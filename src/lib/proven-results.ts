import { CheckCircle2, Gauge, Target, Users, type LucideIcon } from "lucide-react";

/**
 * The Proven Results band.
 *
 * Both the metrics and the testimonials are data so the claims can be changed
 * in one place — these numbers are still subject to review before launch, and
 * the section lays out from whatever this file contains.
 */
export type ResultMetric = {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
};

export const resultMetrics: ResultMetric[] = [
  {
    icon: Gauge,
    value: "85%",
    label: "Faster Verification Turnaround",
    description: "Reports returned in minutes, not days.",
  },
  {
    icon: Target,
    value: "99.2%",
    label: "Verification Accuracy",
    description: "Accurate verification results you can rely on.",
  },
  {
    icon: Users,
    value: "73%",
    label: "Reduction in Manual Work",
    description: "Reduce repetitive work and let your team focus on what matters.",
  },
  {
    icon: CheckCircle2,
    value: "2M+",
    label: "Verifications Completed",
    description: "Verification workflows completed at scale.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  initials: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Verify Engine has completely transformed our verification process. We're getting reports back in minutes instead of days, and the accuracy is unmatched. Our leasing team is finally able to focus on what matters — placing great tenants.",
    name: "Sarah Johnson",
    initials: "SJ",
    role: "VP of Operations",
    company: "ProScreen",
  },
  {
    quote:
      "We used to spend entire afternoons chasing previous landlords by phone. Verify Engine handles the outreach end to end, and every report comes back human-reviewed — so we trust what we're reading.",
    name: "Marcus Lee",
    initials: "ML",
    role: "Director of Screening",
    company: "RentPrep",
  },
  {
    quote:
      "Turnaround time dropped from four days to under an hour. That difference alone has let us approve qualified applicants before competitors even pick up the phone.",
    name: "Elena Rodriguez",
    initials: "ER",
    role: "Head of Leasing",
    company: "RentCheck",
  },
];
