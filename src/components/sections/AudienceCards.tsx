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
export function AudienceCards({
  eyebrow,
  title,
  audiences,
}: {
  eyebrow: string;
  title: string;
  audiences: Audience[];
}) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {title}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map((item) => {
            const card = (
              <>
                <div className="flex size-14 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                  <item.icon className="size-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
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
