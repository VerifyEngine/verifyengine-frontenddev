import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/ui/Button";

const suggestions = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Landlord Verification", href: "/industries/landlord-verification" },
  { label: "Pricing", href: "/pricing" },
  { label: "Book a Demo", href: "/book-demo" },
];

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-mint-100 text-teal-600">
        <Compass className="size-7" strokeWidth={1.75} />
      </span>
      <p className="mt-6 text-sm font-bold tracking-[0.1em] text-teal-600 uppercase">Error 404</p>
      <h1 className="mt-2 text-2xl font-bold text-ink-900 sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-base text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Here are a few
        places to pick up from.
      </p>

      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {suggestions.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-ink-900 transition-colors hover:border-teal-500 hover:text-teal-600"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
