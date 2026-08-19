export const guideCategories = [
  "Getting Started",
  "Best Practices",
  "Compliance",
  "Industry-Specific",
  "Product How-To's",
] as const;

export type GuideCategory = (typeof guideCategories)[number];

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: GuideCategory;
  readingMinutes: number;
  date: string;
};

export const guides: Guide[] = [
  {
    slug: "getting-started-with-verify-engine",
    title: "Getting Started with Verify Engine",
    excerpt:
      "A step-by-step guide to set up your account, invite your team, and run your first verification.",
    category: "Getting Started",
    readingMinutes: 8,
    date: "2024-05-06",
  },
  {
    slug: "best-practices-tenant-screening",
    title: "10 Best Practices for Tenant Screening",
    excerpt:
      "Proven strategies to reduce risk, improve applicant quality, and protect your properties.",
    category: "Best Practices",
    readingMinutes: 12,
    date: "2024-04-24",
  },
  {
    slug: "fair-housing-compliance",
    title: "Fair Housing Compliance in Tenant Screening",
    excerpt:
      "Ensure your screening process is fair, consistent, and compliant with all regulations.",
    category: "Compliance",
    readingMinutes: 10,
    date: "2024-04-11",
  },
  {
    slug: "understanding-the-ve-score",
    title: "Understanding the VE Score™",
    excerpt:
      "How our proprietary score works and how to use it to make better leasing decisions.",
    category: "Product How-To's",
    readingMinutes: 7,
    date: "2024-03-29",
  },
  {
    slug: "integrating-with-property-software",
    title: "Integrating Verify Engine with Your Property Software",
    excerpt:
      "Connect with popular property management platforms in just a few simple steps.",
    category: "Product How-To's",
    readingMinutes: 9,
    date: "2024-03-14",
  },
  {
    slug: "enterprise-verification-large-portfolios",
    title: "Enterprise Verification for Large Portfolios",
    excerpt: "How enterprise teams use Verify Engine to scale, standardize, and stay secure.",
    category: "Industry-Specific",
    readingMinutes: 11,
    date: "2024-02-27",
  },
];
