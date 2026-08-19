export const caseStudyIndustries = [
  "Property Management",
  "Employment Services",
  "Financial Services",
  "Healthcare",
  "Education",
  "Background Screening",
] as const;

export type CaseStudyIndustry = (typeof caseStudyIndustries)[number];

export type CaseStudy = {
  slug: string;
  company: string;
  tagline: string;
  summary: string;
  industry: CaseStudyIndustry;
  /** Newest first when sorted by "recent". */
  date: string;
  results: { value: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "greenfield-property-management",
    company: "Greenfield Property Management",
    tagline: "Streamlining Tenant Screening at Scale",
    summary:
      "Facing slow manual processes and high applicant drop-off, Greenfield modernized their screening workflows with Verify Engine.",
    industry: "Property Management",
    date: "2024-05-02",
    results: [
      { value: "60%", label: "Faster Screening Turnaround" },
      { value: "35%", label: "Increase in Approved Applicants" },
      { value: "90%", label: "Reduction in Manual Work" },
    ],
  },
  {
    slug: "workforce-solutions",
    company: "WorkForce Solutions",
    tagline: "Verifying Candidates, Faster and Fairer",
    summary:
      "Verify Engine helped WorkForce Solutions deliver faster verifications while ensuring compliance and a better candidate experience.",
    industry: "Employment Services",
    date: "2024-04-18",
    results: [
      { value: "70%", label: "Faster Verification Time" },
      { value: "98%", label: "Candidate Satisfaction Rate" },
      { value: "50%", label: "Lower Verification Costs" },
    ],
  },
  {
    slug: "securebank",
    company: "SecureBank",
    tagline: "Mitigating Risk with Accurate Verifications",
    summary:
      "SecureBank reduced fraud risk and strengthened compliance by integrating Verify Engine into their onboarding process.",
    industry: "Financial Services",
    date: "2024-04-03",
    results: [
      { value: "45%", label: "Reduction in Fraud Risk" },
      { value: "100%", label: "Audit & Compliance Readiness" },
      { value: "2.5x", label: "More Verifications Processed" },
    ],
  },
  {
    slug: "carepoint-health",
    company: "CarePoint Health",
    tagline: "Ensuring Trust in Every Hire",
    summary:
      "CarePoint Health verifies licenses, credentials, and employment history—helping them hire qualified professionals with confidence.",
    industry: "Healthcare",
    date: "2024-03-21",
    results: [
      { value: "99.6%", label: "Credential Accuracy" },
      { value: "80%", label: "Faster Time to Hire" },
      { value: "0", label: "Compliance Findings" },
    ],
  },
  {
    slug: "statetech-university",
    company: "StateTech University",
    tagline: "Protecting Enrollment and Reputation",
    summary:
      "Verify Engine helped StateTech University validate student records faster while reducing fraudulent enrollments.",
    industry: "Education",
    date: "2024-03-08",
    results: [
      { value: "65%", label: "Faster Processing Time" },
      { value: "40%", label: "Reduction in Fraudulent Enrollments" },
      { value: "100%", label: "Data Integrity Achieved" },
    ],
  },
  {
    slug: "vericheck-solutions",
    company: "VeriCheck Solutions",
    tagline: "Scaling Verifications Without Scaling Headcount",
    summary:
      "By partnering with Verify Engine, VeriCheck Solutions scaled operations 3x while maintaining accuracy and compliance.",
    industry: "Background Screening",
    date: "2024-02-26",
    results: [
      { value: "3x", label: "Increase in Throughput" },
      { value: "30%", label: "Lower Operating Costs" },
      { value: "99.5%", label: "Verification Accuracy" },
    ],
  },
];
