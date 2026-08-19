export type BlogCategory =
  | "Industry Insights"
  | "Compliance & Regulations"
  | "Product Updates"
  | "Best Practices"
  | "Customer Stories";

export const blogCategories: BlogCategory[] = [
  "Industry Insights",
  "Compliance & Regulations",
  "Product Updates",
  "Best Practices",
  "Customer Stories",
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO date; formatted for display at render time. */
  date: string;
  readingMinutes: number;
  author: { name: string; role: string };
  /** Section headings plus body copy, rendered by the article template. */
  body: { heading: string; paragraphs: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "future-of-tenant-screening",
    title: "The Future of Tenant Screening: AI-Powered Verification Explained",
    excerpt:
      "Discover how AI and automated verification are transforming tenant screening—improving accuracy, reducing fraud, and saving time for property managers.",
    category: "Industry Insights",
    date: "2024-05-07",
    readingMinutes: 8,
    author: { name: "Sarah Johnson", role: "VP of Operations" },
    body: [
      {
        heading: "Why manual screening no longer scales",
        paragraphs: [
          "For decades, verifying a rental applicant meant phone calls, voicemails, and waiting. A leasing agent would call a previous landlord, leave a message, and hope for a callback that often never came. Multiply that across dozens of applicants a week and the cost is measured in vacant units.",
          "The problem is not effort — it is that manual outreach cannot be scheduled, retried, or standardised. Two agents calling the same landlord will ask different questions and record different answers.",
        ],
      },
      {
        heading: "What AI voice agents actually change",
        paragraphs: [
          "An AI voice agent dials on a schedule, handles voicemail and gatekeepers, and retries until it reaches a person. Every call follows the same structure, so the data that comes back is comparable across applicants.",
          "Just as importantly, the conversation adapts. When an answer is ambiguous, the agent asks a follow-up rather than recording an incomplete field.",
        ],
      },
      {
        heading: "Where humans still belong in the loop",
        paragraphs: [
          "Automation is not the same as autonomy. Every report should pass a trained reviewer who listens to the call, confirms the extracted data, and adds context a model cannot infer.",
          "That combination — machine consistency plus human judgement — is what makes results defensible when a decision is questioned.",
        ],
      },
    ],
  },
  {
    slug: "reducing-risk-tenant-screening",
    title: "5 Best Practices for Reducing Risk in Tenant Screening",
    excerpt:
      "Proven strategies to help landlords and property managers minimize risk while delivering a better rental experience for applicants.",
    category: "Best Practices",
    date: "2024-04-22",
    readingMinutes: 6,
    author: { name: "Marcus Lee", role: "Director of Screening" },
    body: [
      {
        heading: "Write your criteria down before you screen",
        paragraphs: [
          "Consistency is the single most effective risk control available to a landlord. Documented, uniformly applied criteria protect both the applicant and the owner.",
        ],
      },
      {
        heading: "Verify income at the source",
        paragraphs: [
          "Pay stubs are easy to fabricate and increasingly are. Verifying directly with the employer or payroll provider removes the weakest link in the chain.",
        ],
      },
      {
        heading: "Treat rental history as more than a reference",
        paragraphs: [
          "A previous landlord can tell you about payment timeliness, lease compliance, and condition at move-out — the three signals that predict the next tenancy best.",
        ],
      },
    ],
  },
  {
    slug: "tenant-screening-laws-2024",
    title: "Staying Compliant: Key Tenant Screening Laws in 2024",
    excerpt:
      "A breakdown of the latest federal and state regulations every landlord and property manager needs to know to stay compliant.",
    category: "Compliance & Regulations",
    date: "2024-04-10",
    readingMinutes: 10,
    author: { name: "Elena Rodriguez", role: "Head of Compliance" },
    body: [
      {
        heading: "The federal baseline",
        paragraphs: [
          "The Fair Credit Reporting Act governs how consumer information is collected and used in screening, including the adverse action notices required when an application is denied.",
        ],
      },
      {
        heading: "Where state law goes further",
        paragraphs: [
          "A growing number of states restrict the use of criminal history, limit application fees, or require that criteria be disclosed in advance. Operating across markets means reconciling the strictest of them.",
        ],
      },
    ],
  },
  {
    slug: "greenfield-cut-screening-time",
    title: "How Greenfield Property Management Cut Screening Time by 60%",
    excerpt:
      "See how Greenfield scaled their operations, improved applicant experience, and reduced risk with Verify Engine.",
    category: "Customer Stories",
    date: "2024-03-26",
    readingMinutes: 5,
    author: { name: "Sarah Johnson", role: "VP of Operations" },
    body: [
      {
        heading: "The starting point",
        paragraphs: [
          "Greenfield managed roughly 4,000 units across three markets, with a leasing team spending most of its week on verification calls rather than on applicants.",
        ],
      },
      {
        heading: "What changed",
        paragraphs: [
          "Moving outreach to AI voice agents took average turnaround from just under four days to about six minutes of active work per applicant, with reviewers handling only the exceptions.",
        ],
      },
    ],
  },
  {
    slug: "data-security-in-verification",
    title: "Data Security in Verification: What You Need to Know",
    excerpt:
      "Learn how Verify Engine protects sensitive data with enterprise-grade security and industry-leading compliance standards.",
    category: "Industry Insights",
    date: "2024-03-15",
    readingMinutes: 7,
    author: { name: "Elena Rodriguez", role: "Head of Compliance" },
    body: [
      {
        heading: "Encryption is the floor, not the ceiling",
        paragraphs: [
          "Encrypting data in transit and at rest is table stakes. The harder questions are who can access a record, under what circumstances, and whether that access leaves a trail.",
        ],
      },
      {
        heading: "Why the audit trail matters",
        paragraphs: [
          "A complete, immutable record of who viewed or changed what turns a security claim into something you can demonstrate during an audit.",
        ],
      },
    ],
  },
  {
    slug: "product-updates-spring-2024",
    title: "What's New: Product Updates Spring 2024",
    excerpt:
      "Explore the latest features and enhancements designed to help you verify faster and make better decisions.",
    category: "Product Updates",
    date: "2024-02-29",
    readingMinutes: 4,
    author: { name: "Marcus Lee", role: "Director of Screening" },
    body: [
      {
        heading: "Faster reports, clearer scores",
        paragraphs: [
          "Report generation now completes in seconds after the final verification lands, and the VE Score breakdown explains which factors moved the result.",
        ],
      },
      {
        heading: "More integrations",
        paragraphs: [
          "New connectors for major property management platforms mean verifications can start from the tools your team already uses.",
        ],
      },
    ],
  },
];

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function relatedPosts(slug: string, limit = 3) {
  const current = getPost(slug);
  if (!current) return blogPosts.slice(0, limit);
  const sameCategory = blogPosts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const rest = blogPosts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
