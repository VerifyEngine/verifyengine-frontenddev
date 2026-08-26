/**
 * The canonical list of public pages, in the grouping the design's Sitemap
 * screen shows.
 *
 * Two things read this and must never drift apart: the human-readable
 * `/sitemap` page and `app/sitemap.ts`, which emits the `/sitemap.xml` the
 * design's "Download Sitemap XML" button points at. Blog articles are appended
 * to the XML from `lib/blog`; they are not listed here because the design's
 * Sitemap screen links the Blog index, not every article.
 */

export type SiteMapLink = { label: string; href: string };

export type SiteMapColumn = { title: string; links: SiteMapLink[] };

export const siteMapColumns: SiteMapColumn[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Client Login", href: "/login" },
      { label: "Get Started", href: "/get-started" },
      { label: "Book Demo", href: "/book-demo" },
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Press", href: "/press" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Industries Overview", href: "/industries" },
      { label: "Landlord Verification", href: "/industries/landlord-verification" },
      { label: "Employment Verification", href: "/industries/employment-verification" },
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Healthcare Verification", href: "/industries/healthcare-verification" },
      { label: "Education Verification", href: "/industries/education-verification" },
    ],
  },
  {
    title: "Landlord Audiences",
    links: [
      {
        label: "Tenant Screening Companies",
        href: "/industries/landlord-verification/tenant-screening-companies",
      },
      {
        label: "Property Management Companies",
        href: "/industries/landlord-verification/property-management-companies",
      },
      {
        label: "Independent Landlords",
        href: "/industries/landlord-verification/independent-landlords",
      },
      {
        label: "Multifamily Operators",
        href: "/industries/landlord-verification/multifamily-operators",
      },
      {
        label: "Affordable Housing",
        href: "/industries/landlord-verification/affordable-housing",
      },
    ],
  },
  {
    title: "Verification Processes",
    links: [
      { label: "Landlord Verification", href: "/how-it-works/landlord-verification" },
      { label: "Employment Verification", href: "/how-it-works/employment-verification" },
      { label: "Income Verification", href: "/how-it-works/income-verification" },
      { label: "Mortgage Verification", href: "/how-it-works/mortgage-verification" },
      { label: "Healthcare Verification", href: "/how-it-works/healthcare-verification" },
      { label: "Education Verification", href: "/how-it-works/education-verification" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/guides" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Glossary", href: "/glossary" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Use", href: "/legal/terms" },
      { label: "Security", href: "/legal/security" },
      { label: "Accessibility", href: "/legal/accessibility" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

/** Every public path exactly once, for the XML sitemap. */
export function allSiteMapPaths(): string[] {
  return [...new Set(siteMapColumns.flatMap((c) => c.links.map((l) => l.href)))];
}
