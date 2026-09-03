import { Headset, Mail, Phone } from "lucide-react";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Light support banner used in place of the generic CTA where the design ends
 * a page by offering help rather than selling — currently the Client Login
 * page, whose visitors already are customers.
 */
export function SupportBanner({
  title,
  description,
  email,
  phone,
  ctaLabel = "Contact Support",
  ctaHref = "/contact",
}: {
  title: string;
  description: string;
  email: string;
  phone: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 px-6 py-8 sm:px-10">
            <div
              className="pointer-events-none absolute top-4 right-6 bottom-4 hidden w-40 opacity-30 lg:block"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--color-teal-500) 1.2px, transparent 1.2px)",
                backgroundSize: "14px 14px",
              }}
            />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-mint-100 text-navy-900">
                  <Headset className="size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">{title}</h2>
                  <p className="mt-1 text-base text-slate-600">{description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:gap-10">
                <a href={`mailto:${email}`} className="group flex items-center gap-3">
                  <Mail className="size-5 shrink-0 text-navy-900" strokeWidth={1.75} />
                  <span>
                    <span className="block text-sm font-bold text-ink-900">Email Support</span>
                    <span className="block text-base text-slate-600 group-hover:text-teal-600">
                      {email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="group flex items-center gap-3"
                >
                  <Phone className="size-5 shrink-0 text-navy-900" strokeWidth={1.75} />
                  <span>
                    <span className="block text-sm font-bold text-ink-900">Call Us</span>
                    <span className="block text-base text-slate-600 group-hover:text-teal-600">
                      {phone}
                    </span>
                  </span>
                </a>

                <Button href={ctaHref} variant="primary" className="shrink-0">
                  {ctaLabel} <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
