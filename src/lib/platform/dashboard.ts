/**
 * Dashboard data.
 *
 * Shaped the way the API is expected to return it, so wiring the real backend
 * later replaces the source of these values without touching the components —
 * the scope calls this state "Frontend UI Complete, Backend Integration
 * Pending". The values are the ones drawn in the Figma dashboard frame.
 */

export type Trend = "up" | "down";

export type Metric = {
  label: string;
  value: string;
  /** Rendered small next to the value, e.g. "hrs" or "s". */
  unit?: string;
  /** Some screens show a bare figure with no change indicator. */
  delta?: string;
  trend?: Trend;
};

export type DonutSlice = {
  label: string;
  /** Share of the ring, 0-100. */
  percent: number;
  color: string;
};

export type DonutMetric = {
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  slices: DonutSlice[];
};

export type VerificationStatus =
  | "Pending"
  | "In Progress"
  | "Verified"
  | "Unverified"
  | "Escalated";

export type VerificationRow = {
  fileNumber: string;
  applicant: string;
  property: string;
  client: string;
  assignedTeam: string;
  verificationType: string;
  status: VerificationStatus;
  confidenceScore: string;
  ruleResult: string;
  escalationTimer: string;
  created: string;
  lastAction: string;
};

export type AlertTone = "success" | "warning" | "highlight" | "neutral" | "accent";

export type LiveAlert = {
  id: string;
  message: string;
  newCount: string;
  tag: string;
  tone: AlertTone;
  timeAgo: string;
};

export const PRIMARY_METRICS: Metric[] = [
  { label: "Pending Verification", value: "1,248", delta: "+8.4%", trend: "up" },
  { label: "In Progress", value: "781", delta: "+8.4%", trend: "up" },
  { label: "Verified", value: "6,210", delta: "+8.4%", trend: "up" },
  { label: "Unverified", value: "123", delta: "+8.4%", trend: "up" },
  { label: "Escalated", value: "123", delta: "+8.4%", trend: "up" },
];

export const SECONDARY_METRICS: Metric[] = [
  { label: "AI Contact Rate", value: "87%", delta: "+8.4%", trend: "up" },
  { label: "Consent Rate", value: "94%", delta: "+8.4%", trend: "up" },
  { label: "Verification Success Rate", value: "89%", delta: "+8.4%", trend: "up" },
  { label: "Turn Around Time (TAT)", value: "9", unit: "s", delta: "+8.4%", trend: "up" },
  { label: "Avg. Completion Time", value: "14.2", unit: "hrs", delta: "-8.4%", trend: "down" },
];

export const SIDE_METRICS: Metric[] = [
  { label: "Monthly Volume", value: "1,248", delta: "+8.4%", trend: "up" },
  { label: "Billing Usage", value: "87%", delta: "+8.4%", trend: "up" },
];

export const COMPLETION_RATIO: DonutMetric = {
  label: "Completion Ratio",
  value: "150",
  delta: "+8.4%",
  trend: "up",
  slices: [
    { label: "120 Completed (80%)", percent: 82, color: "var(--ve-success)" },
    { label: "30 Unable to Verify (1%)", percent: 18, color: "var(--ve-warning)" },
  ],
};

export const HUMAN_ESCALATION: DonutMetric = {
  label: "Human Escalation",
  value: "6,210",
  delta: "+8.4%",
  trend: "up",
  slices: [
    { label: "600 AI Resolved (90%)", percent: 66, color: "var(--ve-success)" },
    { label: "200 Human Review (9%)", percent: 22, color: "var(--ve-accent)" },
    { label: "10 Manual Override (1%)", percent: 12, color: "var(--ve-neutral)" },
  ],
};

export const VERIFICATION_QUEUE: VerificationRow[] = [
  {
    fileNumber: "#415773",
    applicant: "Lorri Warf",
    property: "4319 Wakefield Street, Philadelphia, PA 19126",
    client: "Rainbow Bay Crafts",
    assignedTeam: "Team A",
    verificationType: "Basic",
    status: "Pending",
    confidenceScore: "0.23",
    ruleResult: "Pass",
    escalationTimer: "3 days",
    created: "May 11, 2026 10:39 pm",
    lastAction: "Feb 21, 2026 9:04 pm",
  },
  {
    fileNumber: "#299269",
    applicant: "John Dukes",
    property: "605 Dog Hill Lane, Topeka, KS 66603",
    client: "Electronic Geek",
    assignedTeam: "Team C",
    verificationType: "Basic",
    status: "In Progress",
    confidenceScore: "0.38",
    ruleResult: "Pass",
    escalationTimer: "4 days",
    created: "Feb 15, 2026 3:42 pm",
    lastAction: "May 1, 2026 6:41 pm",
  },
  {
    fileNumber: "#824966",
    applicant: "Daniel Hamilton",
    property: "199 Oakway Lane, Woodland Hills, CA 91303",
    client: "Tams Stationers",
    assignedTeam: "Team B",
    verificationType: "Basic",
    status: "Unverified",
    confidenceScore: "0.63",
    ruleResult: "Fail",
    escalationTimer: "5 days",
    created: "Apr 30, 2026 6:50 am",
    lastAction: "Mar 18, 2026 12:35 pm",
  },
  {
    fileNumber: "#879088",
    applicant: "Frances Swann",
    property: "4387 Farland Avenue, San Antonio, TX 78212",
    client: "Auto Works",
    assignedTeam: "Team C",
    verificationType: "Basic",
    status: "Verified",
    confidenceScore: "0.71",
    ruleResult: "Pass",
    escalationTimer: "3 days",
    created: "Feb 13, 2026 2:54 am",
    lastAction: "Apr 29, 2026 7:12 pm",
  },
  {
    fileNumber: "#869591",
    applicant: "Ricky Smith",
    property: "184 Griffin Street, Gilbert, AZ 85233",
    client: "Britches of Georgetown",
    assignedTeam: "Team A",
    verificationType: "Basic",
    status: "Escalated",
    confidenceScore: "0.43",
    ruleResult: "Pass",
    escalationTimer: "7 days",
    created: "May 1, 2026 12:49 pm",
    lastAction: "Feb 27, 2026 3:26 pm",
  },
  {
    fileNumber: "#697934",
    applicant: "Stephanie Nicol",
    property: "2614 Sweetwood Drive, Arvada, CO 80002",
    client: "Specialty Restaurant Group",
    assignedTeam: "Team C",
    verificationType: "Basic",
    status: "Pending",
    confidenceScore: "0.92",
    ruleResult: "Fail",
    escalationTimer: "5 days",
    created: "Feb 18, 2026 6:46 am",
    lastAction: "Mar 8, 2026 9:21 am",
  },
  {
    fileNumber: "#741710",
    applicant: "Rodger Struck",
    property: "612 Shadowmar Drive, New Orleans, LA 70115",
    client: "Super Duper",
    assignedTeam: "Team A",
    verificationType: "Basic",
    status: "In Progress",
    confidenceScore: "0.93",
    ruleResult: "Pass",
    escalationTimer: "5 days",
    created: "Apr 11, 2026 8:00 pm",
    lastAction: "Feb 14, 2026 2:12 am",
  },
  {
    fileNumber: "#898066",
    applicant: "Alex Buckmaster",
    property: "3831 Cedar Lane, Somerville, MA 02143",
    client: "Bugle Boy",
    assignedTeam: "Team C",
    verificationType: "Basic",
    status: "Unverified",
    confidenceScore: "0.89",
    ruleResult: "Pass",
    escalationTimer: "7 days",
    created: "Feb 21, 2026 4:30 pm",
    lastAction: "Mar 28, 2026 2:30 pm",
  },
  {
    fileNumber: "#998272",
    applicant: "Jerry Helfer",
    property: "2323 Dancing Dove Lane, Long Island City, NY 11101",
    client: "Giant",
    assignedTeam: "Team B",
    verificationType: "Basic",
    status: "Verified",
    confidenceScore: "0.84",
    ruleResult: "Fail",
    escalationTimer: "6 days",
    created: "May 4, 2026 2:21 am",
    lastAction: "May 4, 2026 11:55 am",
  },
  {
    fileNumber: "#675154",
    applicant: "Katie Sims",
    property: "3274 Doe Meadow Drive, Annapolis Junction, MD 20701",
    client: "Finast",
    assignedTeam: "Team C",
    verificationType: "Basic",
    status: "Escalated",
    confidenceScore: "0.23",
    ruleResult: "Fail",
    escalationTimer: "4 days",
    created: "Feb 24, 2026 8:49 pm",
    lastAction: "Feb 25, 2026 6:36 pm",
  },
  {
    fileNumber: "#803554",
    applicant: "Bradley Lawlor",
    property: "179 Sampson Street, Georgetown, CO 80444",
    client: "Pro Property Maintenance",
    assignedTeam: "Team A",
    verificationType: "Basic",
    status: "Pending",
    confidenceScore: "0.43",
    ruleResult: "Fail",
    escalationTimer: "9 days",
    created: "Feb 23, 2026 12:44 am",
    lastAction: "Feb 16, 2026 1:35 pm",
  },
  {
    fileNumber: "#568682",
    applicant: "Kimberly Mastrangelo",
    property: "1851 Lynch Street, New Berlin, WI 53151",
    client: "Cala Foods",
    assignedTeam: "Team B",
    verificationType: "Basic",
    status: "In Progress",
    confidenceScore: "0.66",
    ruleResult: "Fail",
    escalationTimer: "9 days",
    created: "Mar 18, 2026 3:51 pm",
    lastAction: "Apr 1, 2026 12:25 am",
  },
  {
    fileNumber: "#794297",
    applicant: "Kurt Bates",
    property: "591 Joanne Lane, Wilmington, MA 01887",
    client: "Luskins",
    assignedTeam: "Team B",
    verificationType: "Basic",
    status: "Unverified",
    confidenceScore: "0.00",
    ruleResult: "Pass",
    escalationTimer: "7 days",
    created: "Mar 8, 2026 8:40 pm",
    lastAction: "Apr 22, 2026 1:49 pm",
  },
  {
    fileNumber: "#575099",
    applicant: "Dennis Callis",
    property: "2900 Ritter Street, Huntsville, AL 35802",
    client: "Western Auto",
    assignedTeam: "Team B",
    verificationType: "Basic",
    status: "Verified",
    confidenceScore: "0.80",
    ruleResult: "Fail",
    escalationTimer: "6 days",
    created: "Mar 1, 2026 7:59 pm",
    lastAction: "Apr 28, 2026 1:42 pm",
  },
  {
    fileNumber: "#863751",
    applicant: "Joshua Jones",
    property: "3024 Joes Road, Albany, NY 12207",
    client: "Rinks",
    assignedTeam: "Team A",
    verificationType: "Basic",
    status: "Escalated",
    confidenceScore: "0.85",
    ruleResult: "Pass",
    escalationTimer: "7 days",
    created: "Feb 23, 2026 8:26 pm",
    lastAction: "Mar 13, 2026 3:09 pm",
  },
];

/**
 * The design fills every alert with lorem ipsum — placeholder copy, not an
 * alert — so the mock carries none and the panel shows its empty state until
 * the alerts endpoint exists.
 */
export const LIVE_ALERTS: LiveAlert[] = [];
