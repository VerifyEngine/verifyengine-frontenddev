import { Mic, UserCheck, ShieldAlert, Building2, ShieldCheck, Zap } from "lucide-react";
import { Container } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const badges = [
  { icon: Mic, label: "AI Voice Agents" },
  { icon: UserCheck, label: "Human Reviewed" },
  { icon: ShieldAlert, label: "Fraud Detection" },
  { icon: Building2, label: "Enterprise Ready" },
  { icon: ShieldCheck, label: "SOC 2 Ready" },
  { icon: Zap, label: "Fast Turnaround" },
];

const logos = ["RentPrep", "ProScreen", "appfolio", "RentCheck", "Certn", "snappt"];

export function TrustBar() {
  return (
    <div className="border-b border-bg-muted bg-white py-10">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-wide text-slate-400 uppercase">
            Trusted Verification Technology
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <b.icon className="size-4 text-teal-600" strokeWidth={1.75} />
                {b.label}
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs font-semibold tracking-wide text-slate-400 uppercase">
            Trusted by Innovative Companies
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {logos.map((logo) => (
              <span key={logo} className="text-lg font-bold tracking-tight text-slate-300 select-none">
                {logo}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
