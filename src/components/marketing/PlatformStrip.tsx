import {
  Building2,
  Headset,
  TrendingUp,
  Workflow,
  ShieldAlert,
  UserCheck,
  Lock,
  Boxes,
} from "lucide-react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";

const platform = [
  { icon: Building2, label: "Reference Verification Engine" },
  { icon: TrendingUp, label: "Income Verification Engine" },
  { icon: Headset, label: "AI Voice Agents" },
  { icon: Workflow, label: "Workflow Automation" },
  { icon: ShieldAlert, label: "Fraud Detection" },
  { icon: UserCheck, label: "Human Quality Assurance" },
  { icon: Lock, label: "Enterprise Security" },
  { icon: Boxes, label: "API Integrations" },
];

export function PlatformStrip() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>The Verify Engine Platform</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            One Platform. Multiple Verification Workflows.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {platform.map((item) => (
            <RevealItem key={item.label} className="group flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-mint-100 text-teal-600 transition-transform duration-200 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white">
                <item.icon className="size-7" strokeWidth={1.75} />
              </div>
              <p className="mt-3 text-sm font-medium text-ink-900">{item.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-600/80"
          >
            See All Platform Features <ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}
