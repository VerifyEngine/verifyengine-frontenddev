import type { ArticleSection } from "@/components/sections/ArticlePage";

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
  /** Shown under the byline on the detail page. */
  profile: { label: string; value: string }[];
  /** Challenge / solution / outcome narrative, rendered by the shared template. */
  body: ArticleSection[];
  quote: { text: string; name: string; role: string };
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
    profile: [
      { label: "Industry", value: "Property Management" },
      { label: "Portfolio", value: "4,200 units across three states" },
      { label: "Verification types", value: "Landlord, income, employment" },
    ],
    body: [
      {
        heading: "The Challenge",
        paragraphs: [
          "Greenfield's leasing teams were losing strong applicants to speed. Rental history verification depended on reaching previous landlords by phone, and the average request took four to six business days to close — long enough that applicants with options had already signed elsewhere.",
          "The delay was not caused by any single bottleneck. It was phone tag: a leasing agent would call, leave a message, wait, call again, and eventually reach someone who could confirm a tenancy. Across 4,200 units that pattern consumed most of two full-time roles and still left roughly a fifth of references never reached at all.",
          "Unreached references were the more serious problem. Each one forced a judgement call, and those calls were being made differently by different agents in different markets.",
        ],
      },
      {
        heading: "What They Changed",
        paragraphs: [
          "Greenfield moved landlord and income verification onto Verify Engine's AI voice agents, connected to the property management platform their leasing teams already worked in so applicants passed through without retyping.",
          "The structural change was consistency: every reference now gets the same set of questions, asked the same way, with the answers cross-checked against what the applicant submitted. Where a reference could not be reached, the report says so explicitly rather than leaving it to interpretation.",
          "Human review was kept in the loop deliberately. Every completed verification is confirmed by a reviewer before the report is released, which is what allowed the leasing teams to trust the output from the first week rather than shadow-checking it.",
        ],
        bullets: [
          "Landlord and income verification automated end to end.",
          "Direct connection to their existing property management platform.",
          "Written escalation rule for any verification returning a conflict.",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "Turnaround fell from four to six days to under two, with the majority of verifications completing the same business day. Approved applications rose 35% — not because the standard was loosened, but because fewer good applicants left mid-process.",
          "The manual workload dropped by around 90%, and the two roles previously absorbed by chasing references moved to applicant experience and portfolio work.",
          "The change Greenfield's compliance team values most is the audit trail. Every verification now produces its own record of what was asked, what came back and who confirmed it, as a by-product of running rather than as a separate task anyone has to remember.",
        ],
      },
    ],
    quote: {
      text: "We stopped losing applicants to our own process. The verifications are more thorough than what we were doing by hand, and they finish the same day.",
      name: "Sarah Johnson",
      role: "VP of Operations, Greenfield Property Management",
    },
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
    profile: [
      { label: "Industry", value: "Staffing and employment services" },
      { label: "Scale", value: "~18,000 placements a year" },
      { label: "Verification types", value: "Employment, education" },
    ],
    body: [
      {
        heading: "The Challenge",
        paragraphs: [
          "WorkForce Solutions places candidates across sectors where a start date slipping by a week can cost the placement entirely. Employment verification sat directly on that critical path, and it was the slowest step they controlled.",
          "Their team was also fielding a steady stream of candidate complaints. Candidates were being asked to re-supply documents they had already provided, chase their own former employers, and wait without any visibility into where the process stood.",
          "Cost compounded the problem: a large share of verification spend went to re-work on requests that stalled and had to be restarted.",
        ],
      },
      {
        heading: "What They Changed",
        paragraphs: [
          "Employment and education verification moved onto Verify Engine, with requests created automatically the moment a candidate reached the offer stage rather than waiting for a coordinator to raise them.",
          "The candidate-facing change mattered as much as the automation. Candidates now submit their history once and can see where each verification stands, which removed the largest single source of complaints without anyone having to answer more calls.",
          "Because every verification follows the same structure, the team also stopped needing to decide case by case what counted as sufficient evidence.",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "Verification time fell by 70%, taking the step off the critical path for most placements. Candidate satisfaction with the verification experience settled at 98%, driven mainly by no longer being asked for the same information twice.",
          "Verification costs halved, almost entirely through eliminating re-work on stalled requests rather than through unit price.",
          "The team's own summary was that the process stopped being something candidates had to endure and started being something that simply happened in the background.",
        ],
      },
    ],
    quote: {
      text: "Candidates used to feel like verification was something being done to them. Now it happens in the background and they can see exactly where it stands.",
      name: "Marcus Reyes",
      role: "Director of Operations, WorkForce Solutions",
    },
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
    profile: [
      { label: "Industry", value: "Retail and commercial banking" },
      { label: "Scale", value: "Consumer lending across 11 states" },
      { label: "Verification types", value: "Income, employment, mortgage" },
    ],
    body: [
      {
        heading: "The Challenge",
        paragraphs: [
          "SecureBank's lending team was verifying income and employment from documents supplied by applicants. That model had held for years, but the quality of fabricated pay stubs and employment letters had improved to the point where visual review was no longer a meaningful control.",
          "The exposure was concentrated exactly where it hurt most: larger loans, where a fabricated income figure changes the decision rather than the terms.",
          "At the same time, examiners were asking harder questions about how income was substantiated, and reconstructing that evidence per file was consuming days of the compliance team's time.",
        ],
      },
      {
        heading: "What They Changed",
        paragraphs: [
          "SecureBank moved income and employment verification to source confirmation through Verify Engine, replacing document review as the primary control rather than supplementing it.",
          "Verification was built into the onboarding flow rather than run as a parallel process, so no file could progress past a defined point without confirmation at the source.",
          "Because each verification generates its own complete record, the evidence examiners ask for is produced automatically instead of being assembled after the fact.",
        ],
        bullets: [
          "Source confirmation replaced document review as the primary income control.",
          "Verification gated the onboarding flow rather than running alongside it.",
          "Every file carries its own audit record from the moment it completes.",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "Measured fraud risk on verified files fell 45%, driven almost entirely by catching income claims that documents alone had been passing.",
          "Throughput went the other way: the team processed 2.5 times the volume without adding staff, because confirming at the source turned out to be faster than reviewing documents carefully enough to trust them.",
          "The compliance outcome was the clearest. Audit preparation for verified files stopped being a project — the evidence was already there, complete, for every file.",
        ],
      },
    ],
    quote: {
      text: "We were spending real effort inspecting documents that were designed to survive inspection. Confirming at the source is both safer and faster.",
      name: "Priya Nandakumar",
      role: "Head of Credit Risk, SecureBank",
    },
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
    profile: [
      { label: "Industry", value: "Healthcare provider network" },
      { label: "Scale", value: "9 facilities, ~1,400 clinical hires a year" },
      { label: "Verification types", value: "Credential, employment, education" },
    ],
    body: [
      {
        heading: "The Challenge",
        paragraphs: [
          "In clinical hiring, a credential that turns out not to hold is not a hiring error — it is a patient safety event and a regulatory one. CarePoint's verification standard was appropriately strict, and the cost of that strictness was time.",
          "Credential and employment verification for a clinical hire took two to three weeks. In a market where qualified clinicians hold multiple offers, that routinely meant losing candidates the organisation had already decided to hire.",
          "The team's dilemma was that the obvious way to move faster — relaxing what was checked — was the one thing they could not do.",
        ],
      },
      {
        heading: "What They Changed",
        paragraphs: [
          "CarePoint automated credential, employment and education verification through Verify Engine, keeping every check that had been in place and removing the waiting between them.",
          "Verification now begins when the offer is extended rather than after acceptance, so the two processes run in parallel instead of in sequence. Human review remained mandatory on every clinical credential.",
          "Nothing was removed from the standard. What changed was that the checks stopped queueing behind each other.",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "Time to hire fell by 80%, with most clinical verifications completing within two business days rather than two to three weeks. Credential accuracy measured at 99.6%, and the discrepancies that surfaced were caught before start dates rather than after.",
          "Across the following audit cycle, CarePoint recorded zero compliance findings related to credentialing.",
          "The organisation's own framing is the one worth repeating: they did not trade rigour for speed, they removed the waiting that had never been adding rigour in the first place.",
        ],
      },
    ],
    quote: {
      text: "We did not lower the bar to move faster. We removed the waiting between checks, which was never what made them rigorous.",
      name: "Dr. Alan Whitfield",
      role: "Chief Medical Officer, CarePoint Health",
    },
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
    profile: [
      { label: "Industry", value: "Higher education" },
      { label: "Scale", value: "~31,000 students, 12,000 applications a cycle" },
      { label: "Verification types", value: "Education, enrollment, transcript" },
    ],
    body: [
      {
        heading: "The Challenge",
        paragraphs: [
          "StateTech processes roughly 12,000 applications a cycle, each carrying prior transcripts and enrollment claims that had to be validated against issuing institutions. The volume arrives in concentrated waves, and the admissions team absorbed those waves by working longer rather than differently.",
          "Fraudulent credentials were a real and growing share of the problem. Fabricated transcripts from institutions that either do not exist or do not issue what was presented had become sophisticated enough to pass a careful reading.",
          "Every fraudulent enrollment that reached the roll cost far more to unwind later than it would have cost to catch, in reputational terms as much as administrative ones.",
        ],
      },
      {
        heading: "What They Changed",
        paragraphs: [
          "StateTech moved education and enrollment verification onto Verify Engine, with confirmation sought directly from issuing institutions rather than from the documents applicants supplied.",
          "Because verification runs automatically as applications arrive, the concentrated waves stopped translating into concentrated overtime. Records that confirm cleanly progress without anyone touching them; only conflicts reach a human.",
          "That inversion — people handling exceptions rather than routine volume — was the change that made peak periods manageable.",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "Processing time fell 65%, and fraudulent enrollments dropped 40% — caught at application rather than discovered later.",
          "Data integrity across verified student records reached 100%, meaning every enrollment claim on file had been confirmed with the institution that issued it.",
          "The admissions team's workload also became far more even, which the registrar's office rates as the most valuable outcome of all.",
        ],
      },
    ],
    quote: {
      text: "Our people now handle the exceptions instead of the routine volume. Peak season stopped being something we survived.",
      name: "Denise Okafor",
      role: "University Registrar, StateTech University",
    },
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
    profile: [
      { label: "Industry", value: "Background screening provider" },
      { label: "Scale", value: "Serving 600+ client organisations" },
      { label: "Verification types", value: "Landlord, employment, income, education" },
    ],
    body: [
      {
        heading: "The Challenge",
        paragraphs: [
          "VeriCheck sells verification as its product, which makes its economics unusually exposed: growth meant hiring, and hiring meant margin. Every new client won added directly to a headcount line.",
          "Their verification specialists spent the majority of their time on calls that required no judgement — confirming dates, amounts and titles that either matched or did not. The judgement work, where their expertise actually mattered, was the smaller share.",
          "Quality was also uneven in a way that is hard to fix by management alone. Different specialists asked different questions, so two reports on comparable applicants were not reliably comparable.",
        ],
      },
      {
        heading: "What They Changed",
        paragraphs: [
          "VeriCheck moved routine verification calls to Verify Engine's AI voice agents and redeployed their specialists onto exception handling and client-specific requirements.",
          "The structural gain was standardisation: every verification now follows the same interview structure, which made outputs comparable across their entire client base for the first time.",
          "Specialists remained in the loop as reviewers on every completed verification, so the accuracy their clients bought them for stayed in place while the volume they personally handled fell sharply.",
        ],
        bullets: [
          "Routine confirmation calls automated; exception handling kept with specialists.",
          "One interview structure applied across all 600+ client organisations.",
          "Human review retained on every completed verification.",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "Throughput tripled without adding verification headcount, and operating costs fell 30% as the cost per verification decoupled from staffing.",
          "Accuracy improved rather than held, reaching 99.5% — the predictable result of asking every reference the same questions instead of relying on individual practice.",
          "For VeriCheck the strategic outcome mattered most: growth stopped being constrained by how quickly they could hire and train.",
        ],
      },
    ],
    quote: {
      text: "Our specialists were spending their day on calls that needed no expertise. Now they spend it on the ones that do.",
      name: "Tomás Brennan",
      role: "COO, VeriCheck Solutions",
    },
  },
];

/** Long form dates read as "May 2, 2024" across the site. */
export function formatCaseStudyDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

/** Same industry first, then the most recent, so the rail is never empty. */
export function relatedCaseStudies(slug: string, limit = 3) {
  const current = getCaseStudy(slug);
  if (!current) return [];
  const others = caseStudies.filter((study) => study.slug !== slug);
  return [...others]
    .sort((a, b) => {
      const aMatch = a.industry === current.industry ? 0 : 1;
      const bMatch = b.industry === current.industry ? 0 : 1;
      return aMatch - bMatch || b.date.localeCompare(a.date);
    })
    .slice(0, limit);
}
