import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Public_Sans, Poppins } from "next/font/google";
import localFont from "next/font/local";
import { ToastProvider } from "@/components/ui/Toast";
import { env } from "@/lib/env";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

// Poppins powers headings and the "VerifyEngine" wordmark — a geometric,
// single-story-g sans that matches the letterforms in the client's logo file
// (Color=Color2.svg / Color=Defualt.png), unlike the previous display face.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

// Satoshi is the typeface the signed-in platform is drawn in (font/family/body,
// font/family/label and font/family/title all resolve to it in the Figma
// variables). It is not on Google Fonts, so the three weights the design
// actually uses are self-hosted from Fontshare.
const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  // Absolute URLs in metadata follow the environment, so staging never emits
  // production links and production never emits localhost ones.
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Verify Engine — AI-Powered Landlord Verification",
    template: "%s | Verify Engine",
  },
  description:
    "Verify Engine is the AI-powered verification platform transforming landlord verification while powering verification workflows across multiple industries.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${poppins.variable} ${satoshi.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
