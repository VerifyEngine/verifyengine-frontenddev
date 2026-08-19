import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { ComponentGallery } from "./ComponentGallery";

export const metadata: Metadata = {
  title: "Component library",
  robots: { index: false, follow: false },
};

/**
 * Internal gallery of every shared component, used to review them in isolation
 * and as living component documentation. Not linked from the site, and hidden
 * entirely once NEXT_PUBLIC_APP_ENV is "production".
 */
export default function ComponentsPage() {
  if (env.appEnv === "production") notFound();
  return <ComponentGallery />;
}
