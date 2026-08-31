import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const colsClass: Record<number, string> = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
  6: "sm:grid-cols-3 lg:grid-cols-6",
};

/**
 * Centred feature row. The designs use three treatments of the same block, so
 * both the separator and the icon styling are options here rather than five
 * near-identical components:
 *
 * - `dividers` (default) — hairline rules between columns, as on Get Started,
 *   Landlord Verification, Client Login and Industries Overview.
 * - `cards` — each feature in its own bordered card, as on How It Works.
 *
 * Icons sit in a mint circle everywhere except Industries Overview, which
 * shows the bare navy line icon.
 */
export function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  features,
  columns = 5,
  background = "white",
  variant = "dividers",
  iconStyle = "circle",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 3 | 4 | 5 | 6;
  background?: "white" | "muted";
  variant?: "dividers" | "cards";
  iconStyle?: "circle" | "plain";
}) {
  const isCards = variant === "cards";

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

        <RevealGroup
          className={`mt-14 grid grid-cols-1 text-center ${colsClass[columns]} ${
            isCards ? "gap-5" : "gap-y-10"
          }`}
        >
          {features.map((f, i) => (
            <RevealItem
              key={f.title}
              className={
                isCards
                  ? "flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-white px-5 py-7 shadow-card"
                  : // Hairline between columns — suppressed on the first item
                    // of each row so it never hangs off the outer edge.
                    `flex flex-col items-center px-6 ${
                      i > 0 ? "lg:border-l lg:border-slate-200" : ""
                    }`
              }
            >
              {iconStyle === "circle" ? (
                <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-mint-100 text-navy-900">
                  <f.icon className="size-7" strokeWidth={1.75} />
                </span>
              ) : (
                <f.icon className="size-11 shrink-0 text-navy-900" strokeWidth={1.5} />
              )}

              <h3 className="mt-4 text-base font-bold text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
