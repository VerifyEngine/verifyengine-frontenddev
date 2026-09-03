import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta({
  title = "Ready to Modernize Your Verification Process?",
  subtitle = "Join the leading companies transforming verification with AI.",
  primaryLabel = "Get Started",
  primaryHref = "/get-started",
  secondaryLabel = "Book Demo",
  secondaryHref = "/book-demo",
  inset = false,
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  inset?: boolean;
}) {
  const content = (
    <div className="flex flex-col items-center gap-6 rounded-2xl bg-navy-900 px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
      <div className="flex items-center gap-4">
        <div className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-mint-200 sm:flex">
          <ShieldCheck className="size-6" strokeWidth={1.75} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
          <p className="mt-1 text-base text-white/60">{subtitle}</p>
        </div>
      </div>
      <div className="flex shrink-0 gap-3">
        <Button href={primaryHref} variant="outline-dark">
          {primaryLabel}
        </Button>
        <Button href={secondaryHref} variant="primary">
          {secondaryLabel}
        </Button>
      </div>
    </div>
  );

  if (inset) {
    return <div className="bg-white py-4">{content}</div>;
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>{content}</Reveal>
      </Container>
    </section>
  );
}
