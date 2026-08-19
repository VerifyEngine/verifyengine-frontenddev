import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { IconCircle } from "@/components/ui/IconCircle";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  features,
  columns = 5,
  background = "white",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 3 | 4 | 5 | 6;
  background?: "white" | "muted";
}) {
  const colsClass: Record<number, string> = {
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-2 lg:grid-cols-5",
    6: "sm:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <Section background={background}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-base text-slate-600">{subtitle}</p>}
        </div>

        <div className={`mt-14 grid grid-cols-1 gap-x-8 gap-y-10 text-center ${colsClass[columns]}`}>
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center">
              <IconCircle icon={f.icon} />
              <h3 className="mt-4 text-base font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Section({
  background,
  children,
}: {
  background: "white" | "muted";
  children: React.ReactNode;
}) {
  return (
    <section className={`py-20 sm:py-24 ${background === "muted" ? "bg-bg-muted" : "bg-white"}`}>
      {children}
    </section>
  );
}
