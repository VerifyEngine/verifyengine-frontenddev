import type { Metadata } from "next";
import Link from "next/link";
import { Download, ShieldCheck } from "lucide-react";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Navigation";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { siteMapColumns } from "@/lib/site-map";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Find all pages on the Verify Engine website.",
};

export default function SitemapPage() {
  return (
    <>
      <div className="bg-navy-900 py-5">
        <Container>
          <div className="[&_a]:text-white/50 [&_a:hover]:text-mint-200 [&_span[aria-current]]:text-white">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sitemap" }]} />
          </div>
        </Container>
      </div>

      <div className="bg-white py-12 sm:py-16">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
                  Sitemap
                </h1>
                <p className="mt-2 text-base text-slate-600">
                  Find all pages on the Verify Engine website.
                </p>
              </div>
              <a
                href="/sitemap.xml"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:border-teal-500 hover:text-teal-600"
              >
                <Download className="size-4" strokeWidth={2} />
                Download Sitemap XML
              </a>
            </div>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 rounded-2xl border border-slate-100 p-8 sm:grid-cols-2 lg:grid-cols-3">
            {siteMapColumns.map((column) => (
              <RevealItem key={column.title}>
                <h2 className="text-base font-bold text-ink-900">{column.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-teal-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-bg-mint-50 px-6 py-8 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
              <div className="flex items-center gap-4">
                <span className="hidden size-14 shrink-0 items-center justify-center rounded-full bg-white text-teal-600 sm:flex">
                  <ShieldCheck className="size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">
                    Can&apos;t find what you&apos;re looking for?
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Our team is here to help. Contact us and we&apos;ll point you in the right
                    direction.
                  </p>
                </div>
              </div>
              <Button href="/contact" variant="dark" className="shrink-0">
                Contact Us <ArrowRight />
              </Button>
            </div>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
