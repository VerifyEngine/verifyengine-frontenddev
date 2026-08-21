import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EnvBadge } from "@/components/layout/EnvBadge";

// The marketing site keeps the public chrome — header, footer, sticky nav.
// The signed-in platform lives in its own route group with a different shell,
// which is why this layout exists instead of putting the chrome in the root.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-white text-ink-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <EnvBadge />
    </div>
  );
}
