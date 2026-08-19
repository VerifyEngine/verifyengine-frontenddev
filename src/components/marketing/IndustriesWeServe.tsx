import { Building2, Briefcase, Landmark, HeartPulse, GraduationCap, CheckCircle2 } from "lucide-react";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { Eyebrow, CalloutTag } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const supporting = [
  {
    icon: Briefcase,
    title: "Employment Verification",
    desc: "Verify employment, position, and income with speed and accuracy.",
    href: "/industries/employment-verification",
  },
  {
    icon: Landmark,
    title: "Financial Services",
    desc: "Income, employment, and mortgage verification for lenders and banks.",
    href: "/industries/financial-services",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Verification",
    desc: "Verify healthcare employment and credentials with confidence.",
    href: "/industries/healthcare-verification",
  },
  {
    icon: GraduationCap,
    title: "Education Verification",
    desc: "Verify student, degree, and institution information automatically.",
    href: "/industries/education-verification",
  },
];

const landlordChecklist = [
  "Tenant Screening Companies",
  "Property Management Companies",
  "Independent Landlords",
  "Multifamily Operators",
  "Affordable Housing",
];

export function IndustriesWeServe() {
  return (
    <section className="bg-bg-muted py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Industries We Serve</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            One Platform. Multiple Verification Workflows.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <RevealItem className="flex flex-col rounded-2xl bg-navy-900 p-8 text-white lg:col-span-1">
            <CalloutTag>Most Popular</CalloutTag>
            <Building2 className="mt-5 size-9 text-mint-200" strokeWidth={1.5} />
            <h3 className="mt-4 text-xl font-bold">Landlord Verification</h3>
            <p className="mt-2 text-sm text-white/60">
              Rental history verification for tenant screening companies, property managers, and
              landlords.
            </p>
            <ul className="mt-5 space-y-2.5">
              {landlordChecklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CheckCircle2 className="size-4 shrink-0 text-mint-200" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/industries/landlord-verification" variant="primary" className="mt-7 w-full">
              Learn More <ArrowRight />
            </Button>
          </RevealItem>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {supporting.map((card) => (
              <RevealItem key={card.title} className="flex flex-col rounded-2xl bg-white p-7 shadow-card">
                <div className="flex size-11 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                  <card.icon className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink-900">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
                <Button href={card.href} variant="outline-light" size="md" className="mt-5 self-start">
                  Learn More <ArrowRight />
                </Button>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
