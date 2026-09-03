import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export type Audience = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
};

/** Grid of sub-audience cards, e.g. the five landlord segments. */
const columnsClass: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

export function AudienceCards({
  eyebrow,
  title,
  subtitle,
  audiences,
  columns,
  background = "white",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  audiences: Audience[];
  /** Defaults to one column per audience. */
  columns?: 3 | 4 | 5 | 6;
  background?: "white" | "muted";
}) {
  const cols = columnsClass[columns ?? audiences.length] ?? "lg:grid-cols-5";

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

        <RevealGroup className={`mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 ${cols}`}>
          {audiences.map((item) => {
            const card = (
              <>
                <div className="flex size-16 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                  <item.icon className="size-7" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{item.description}</p>
              </>
            );

            const shell =
              "flex h-full flex-col items-center rounded-2xl border border-slate-100 p-6 text-center transition-shadow duration-200 hover:shadow-card";

            return (
              <RevealItem key={item.title}>
                {item.href ? (
                  <Link href={item.href} className={shell}>
                    {card}
                  </Link>
                ) : (
                  <div className={shell}>{card}</div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
