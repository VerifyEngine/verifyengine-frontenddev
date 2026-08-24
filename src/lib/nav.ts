export type NavLink = {
  label: string;
  href: string;
};

export const industriesMenu: { title: string; href: string; description: string }[] = [
  {
    title: "Landlord Verification",
    href: "/industries/landlord-verification",
    description: "Rental history verification for tenant screening.",
  },
  {
    title: "Employment Verification",
    href: "/industries/employment-verification",
    description: "Verify employment, position, and income.",
  },
  {
    title: "Financial Services",
    href: "/industries/financial-services",
    description: "Income, employment, and mortgage verification.",
  },
  {
    title: "Healthcare Verification",
    href: "/industries/healthcare-verification",
    description: "Verify healthcare employment and credentials.",
  },
  {
    title: "Education Verification",
    href: "/industries/education-verification",
    description: "Verify student, degree, and institution information.",
  },
];

// Landlord Verification carries ~70% of the site's content weight (per the
// spec doc's content strategy) and is the only industry with its own set of
// audience sub-pages — the header mega menu gives it a dedicated featured
// column rather than listing it as a plain row like the other four.
export const landlordAudiences: NavLink[] = [
  { label: "Tenant Screening Companies", href: "/industries/landlord-verification/tenant-screening-companies" },
  { label: "Property Management Companies", href: "/industries/landlord-verification/property-management-companies" },
  { label: "Independent Landlords", href: "/industries/landlord-verification/independent-landlords" },
  { label: "Multifamily Operators", href: "/industries/landlord-verification/multifamily-operators" },
  { label: "Affordable Housing", href: "/industries/landlord-verification/affordable-housing" },
];

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export const footerNav = {
  // Mirrors the six entries the footer carries in the approved design. Income
  // and Mortgage have no /industries page of their own, so they point at their
  // verification-process pages, which is where that content lives.
  solutions: [
    { label: "Landlord Verification", href: "/industries/landlord-verification" },
    { label: "Employment Verification", href: "/industries/employment-verification" },
    { label: "Income Verification", href: "/how-it-works/income-verification" },
    { label: "Mortgage Verification", href: "/how-it-works/mortgage-verification" },
    { label: "Healthcare Verification", href: "/industries/healthcare-verification" },
    { label: "Education Verification", href: "/industries/education-verification" },
  ],
  industries: [
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
    { label: "Affordable Housing", href: "/industries/landlord-verification/affordable-housing" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Guides", href: "/guides" },
    { label: "Glossary", href: "/glossary" },
    { label: "FAQ", href: "/faq" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Partners", href: "/partners" },
    { label: "Press", href: "/press" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Security", href: "/legal/security" },
    { label: "Accessibility", href: "/legal/accessibility" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};
