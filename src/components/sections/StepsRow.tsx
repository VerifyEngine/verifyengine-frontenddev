import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const columnsClass: Record<number, string> = {
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

/**
 * Numbered step row with dotted connectors — the static counterpart to the
 * scroll-driven ProcessSteps, used where the design shows a simple sequence.
 */
export function StepsRow({
  eyebrow,
  title,
  subtitle,
  steps,
  background = "muted",
  numbered = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  steps: Step[];
  background?: "muted" | "white";
  /** Show the numbered badge above each icon. Off where the design folds the
   *  number into the step title instead. */
  numbered?: boolean;
}) {
  return (
    <section
      className={`py-20 sm:py-24 ${background === "muted" ? "bg-bg-muted" : "bg-white"}`}
    >
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-base text-slate-600">{subtitle}</p>}
        </Reveal>

        {/* Column counts are spelled out because Tailwind cannot see class
            names built at runtime. */}
        <RevealGroup className={`mt-16 grid grid-cols-2 gap-x-6 gap-y-12 ${columnsClass[steps.length] ?? "sm:grid-cols-4"}`}>
          {steps.map((step, i) => (
            <RevealItem key={step.title} className="flex flex-col items-center text-center">
              {numbered && (
                <div className="relative flex w-full items-center justify-center">
                  <span className="relative z-10 flex size-7 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
              )}

              {/* Dotted connector sits level with the icon circles. */}
              <div className="relative flex w-full items-center justify-center">
                {i > 0 && (
                  <span className="absolute top-1/2 right-1/2 hidden w-full -translate-y-1/2 border-t border-dashed border-teal-500/40 sm:block" />
                )}
                <span
                  className={`relative z-10 flex size-18 items-center justify-center rounded-full bg-mint-100 text-teal-600 ring-6 ${
                    background === "muted" ? "ring-bg-muted" : "ring-white"
                  } ${numbered ? "mt-5" : ""}`}
                >
                  <step.icon className="size-8" strokeWidth={1.75} />
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
