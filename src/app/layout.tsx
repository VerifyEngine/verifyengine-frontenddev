import type { Metadata } from "next";
import { Public_Sans, Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
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

export const metadata: Metadata = {
  title: {
    default: "Verify Engine — AI-Powered Landlord Verification",
    template: "%s | Verify Engine",
  },
  description:
    "Verify Engine is the AI-powered verification platform transforming landlord verification while powering verification workflows across multiple industries.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink-900">
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
