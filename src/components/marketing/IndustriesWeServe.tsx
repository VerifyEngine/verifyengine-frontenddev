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

/**
 * Industry line-up with Landlord Verification featured.
 *
 * Two layouts from the designs: `featured-split` (homepage) puts the featured
 * card beside a 2x2 grid of the rest; `row` (Industries Overview) lays all
 * five out in a single row. Defaults match the homepage.
 */
export function IndustriesWeServe({
  eyebrow = "Industries We Serve",
  title = "One Platform. Multiple Verification Workflows.",
  subtitle,
  layout = "featured-split",
  background = "muted",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  layout?: "featured-split" | "row";
  background?: "muted" | "white";
} = {}) {
  const isRow = layout === "row";

  return (
    <section
      className={`py-20 sm:py-24 ${background === "muted" ? "bg-bg-muted" : "bg-white"}`}
    >
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-base text-slate-600">{subtitle}</p>}
        </Reveal>

        <RevealGroup
          className={`mt-14 grid grid-cols-1 gap-6 ${
            isRow ? "sm:grid-cols-2 lg:grid-cols-5" : "lg:grid-cols-3"
          }`}
        >
          <RevealItem
            className={`flex flex-col rounded-2xl bg-navy-900 text-white ${
              isRow ? "p-6 sm:col-span-2 lg:col-span-1" : "p-8 lg:col-span-1"
            }`}
          >
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
            <div className="mt-auto pt-7">
              <Button
                href="/industries/landlord-verification"
                variant="primary"
                className={isRow ? "" : "w-full"}
              >
                Learn More <ArrowRight />
              </Button>
            </div>
          </RevealItem>

          {/* In the row layout the supporting cards are siblings in the same
              grid; in the split layout they get their own nested 2x2 grid. */}
          <SupportingCards isRow={isRow} />
        </RevealGroup>
      </Container>
    </section>
  );
}

function SupportingCards({ isRow }: { isRow: boolean }) {
  const cards = supporting.map((card) => (
    <RevealItem
      key={card.title}
      className={`flex flex-col rounded-2xl bg-white shadow-card ${isRow ? "p-6" : "p-7"}`}
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-mint-100 text-teal-600">
        <card.icon className="size-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink-900">{card.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
      <div className="mt-auto pt-5">
        <Button href={card.href} variant="outline-light" size="md">
          Learn More <ArrowRight />
        </Button>
      </div>
    </RevealItem>
  ));

  if (isRow) return <>{cards}</>;

  return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">{cards}</div>;
}
