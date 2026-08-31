import { ArrowRight, Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";

const integrations = [
  { name: "appfolio", sub: "Property Manager" },
  { name: "YARDI", sub: "Property Manager" },
  { name: "Buildium", sub: "Property Manager" },
  { name: "Propertyware", sub: "Property Manager" },
  { name: "tazworks", sub: "Screening" },
  { name: ".zapier", sub: "Automation" },
  { name: "+ More", sub: "Integrations" },
];

export function IntegrationsRow() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Seamless Integrations</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Connect Verify Engine With Your Tools
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {integrations.map((item) => (
            <RevealItem
              key={item.name}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-200 px-3 py-6 text-center"
            >
              <p className="text-sm font-bold tracking-tight text-slate-500">{item.name}</p>
              <p className="mt-1 text-[10px] text-slate-400">{item.sub}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-8 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-600/80"
          >
            View All Integrations <ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}
