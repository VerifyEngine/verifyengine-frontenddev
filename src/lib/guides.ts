import type { ArticleSection } from "@/components/sections/ArticlePage";

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
  date: string;
  /** Section headings plus body copy, rendered by the shared article template. */
  body: ArticleSection[];
};

export const guides: Guide[] = [
  {
    slug: "getting-started-with-verify-engine",
    title: "Getting Started with Verify Engine",
    excerpt:
      "A step-by-step guide to set up your account, invite your team, and run your first verification.",
    category: "Getting Started",
    date: "2024-05-06",
    body: [
      {
        heading: "Before You Start",
        paragraphs: [
          "Setting up Verify Engine takes about twenty minutes, and most of that time goes on decisions rather than data entry. The forms are short. What takes thought is how you want your organisation structured, who should be able to do what, and where verification fits into the process your team already follows.",
          "It helps to have two things settled before you begin. The first is who in your organisation needs to submit verification requests. The second is who needs to read the reports that come back. Those are almost always different groups of people, and the gap between them is wider than most teams assume at the outset.",
          "Leasing agents, recruiters and admissions staff submit. Managers, underwriters and compliance staff read. Some people do both, but far fewer than the number who currently have access to everything in whatever system you are using today. Verify Engine models that split directly through its roles, so getting it right at the start saves unpicking permissions later — and permissions, once granted, are socially difficult to take back.",
          "The second thing worth deciding early is what you will do with a result that comes back with a flag. Not the detail of it, just the shape: does it stop the process, does it trigger a second check, does it go to a named person. Teams that answer this before their first verification handle their first difficult result calmly. Teams that answer it afterwards tend to answer it inconsistently.",
        ],
      },
      {
        heading: "Setting Up Your Organisation",
        paragraphs: [
          "Your organisation is the container for everything else. Users, verification requests, reports, billing and settings all belong to it, and nothing crosses between organisations. If you manage several distinct portfolios, brands or legal entities, you can run each as its own organisation and switch between them from the organisation selector in the top navigation.",
          "That decision is worth a moment's thought. Separate organisations give you clean separation of data and billing, which matters if you report to different owners or operate under different regulatory regimes. A single organisation gives you one queue, one set of users and one view of activity, which is simpler to run day to day. Most teams start with one and split only when a genuine reporting boundary appears.",
          "During setup you will be asked for the legal entity name, your primary industry, and the volume of verifications you expect each month. The volume figure is not a commitment and does not affect what you are charged; it simply sets sensible defaults for queue thresholds and notification frequency, both of which you can change afterwards.",
          "The industry selection does slightly more work. It determines which verification types appear first in your request form and which fields are treated as standard. Choosing the industry that covers the majority of your work is the right approach — you can still run any verification type regardless of what you pick.",
        ],
        bullets: [
          "Use the legal entity name rather than a trading name — it appears on reports and invoices.",
          "Pick the industry matching most of your verifications; every type stays available regardless.",
          "Set your time zone before inviting anyone, so activity timestamps read correctly for the whole team.",
          "Decide up front whether separate portfolios need separate organisations, or one shared queue.",
        ],
      },
      {
        heading: "Inviting Your Team",
        paragraphs: [
          "People are invited by email address from Settings. Each invitation carries a role, and it is worth being precise about what a role does: it governs what someone can do, not what they can see. Everyone inside an organisation can see the verifications that belong to it. Roles decide who can create requests, who can manage users and billing, and who can change organisation settings.",
          "That distinction matters when you are deciding how many organisations to run. If you have a genuine need to prevent one group from seeing another group's verifications, that is a separation-of-organisations question, not a roles question.",
          "Start narrower than feels comfortable. It is straightforward to widen someone's permissions when they ask, and considerably less pleasant to explain to an applicant, an auditor or an owner why a report containing income and contact details was accessible to someone whose job did not require it. Least privilege is a well-worn principle precisely because the alternative fails quietly until it fails loudly.",
          "Set a recurring reminder to review the user list — quarterly is enough for most teams. Access lists drift as people change roles, and drift is only visible if someone looks.",
        ],
        bullets: [
          "Submitter — creates verification requests and tracks their own queue.",
          "Reviewer — reads completed reports and flags results that need follow-up.",
          "Administrator — manages users, billing and organisation settings, in addition to the above.",
        ],
      },
      {
        heading: "Running Your First Verification",
        paragraphs: [
          "Create a request from the dashboard. You will choose the verification type, enter the applicant's details, and supply the contact you want verified — a previous landlord, an employer, a school or an issuing institution, depending on what you are confirming.",
          "Of everything on that form, the contact's phone number deserves the most care. A transposed digit is by a wide margin the most common cause of a verification that never completes, and it is invisible until the request has already spent a day going nowhere. If the number came from an applicant-supplied document, it is worth a second look before you submit.",
          "From there the process runs without you. The AI voice agent places the call, introduces itself and its purpose, conducts a structured interview, and cross-checks each answer against what the applicant submitted. A human reviewer then confirms the outcome before the report is released. Most verifications complete within the same business day; the ones that do not are almost always waiting on a reference who has not yet picked up.",
          "Read your first report end to end even if the result is unambiguous. It shows you the level of detail your team will actually be working with, which fields turned out to matter, and where your own intake form is leaving gaps. Most teams change something about how they collect applicant information after reading their first two or three reports, and it is far cheaper to do that in week one than in month six.",
          "If a verification comes back unable to reach the reference, that is reported as unverified rather than negative. The distinction is deliberate and worth explaining to your team early: an employer who does not answer the phone tells you nothing about the applicant, and treating it as though it did is both unfair and indefensible.",
        ],
      },
      {
        heading: "Connecting It to How You Already Work",
        paragraphs: [
          "Verify Engine works perfectly well as a standalone tool, and there is no reason to rush past that stage. But once your team has run enough verifications to be comfortable with the output, connecting it to the system where applicants already live removes the step that causes most of the avoidable failures — retyping.",
          "There are three routes. The browser extension reads the applicant from whatever page your team is already looking at and submits without anyone retyping anything; it requires nothing from your software vendor. A direct platform connection syncs applicants automatically from supported management systems. The API gives full programmatic control for teams that have built their own intake tooling.",
          "Most teams start with the extension because it can be adopted by one person on one afternoon, then move to a direct connection once the volume makes the setup effort obviously worthwhile.",
        ],
      },
      {
        heading: "Establishing Your House Rules",
        paragraphs: [
          "The last setup step is not in the product. Before volume builds, agree in writing what your organisation does when a verification returns something other than a clean confirmation — a conflict between what was claimed and what the source said, a reference who could not be reached, or a fraud signal raised during the call.",
          "A documented, consistently applied response is fairer to applicants, easier to train new staff on, and dramatically easier to defend if a decision is ever questioned. It does not need to be long. A single page covering the three or four outcomes you will actually encounter is enough, and it will be more useful than a policy nobody reads.",
          "Pair that with your criteria: the income multiple, the rental or employment history you require, and how you treat past issues. Written before you look at applications, applied in the same order to everyone. This is the single highest-value thing a new team can do, and it costs an afternoon.",
        ],
      },
      {
        heading: "What Good Looks Like After a Month",
        paragraphs: [
          "A month in, a well-established setup has a few recognisable characteristics. Verifications are being created automatically or near-automatically rather than typed in by hand. The queue is being worked by exception — people look at the ones that need attention rather than reading every clean result.",
          "The reports are reaching the people who make decisions without being forwarded around by email, and the access list contains only people who need it. When someone asks why a particular applicant was declined three months ago, the answer is retrievable in under a minute.",
          "None of that requires anything unusual. It follows from the decisions made during setup — which is why the twenty minutes at the start are worth spending deliberately rather than clicking through.",
        ],
      },
    ],
  },
  {
    slug: "best-practices-tenant-screening",
    title: "10 Best Practices for Tenant Screening",
    excerpt:
      "Proven strategies to reduce risk, improve applicant quality, and protect your properties.",
    category: "Best Practices",
    date: "2024-04-24",
    body: [
      {
        heading: "1. Write Your Criteria Down Before You Screen",
        paragraphs: [
          "The most common screening failure is not a bad decision. It is an inconsistent one. Two applicants with comparable histories treated differently is the shape almost every fair housing complaint takes, and it is nearly always the result of criteria that lived in someone's head rather than on paper.",
          "Decide, in writing and in advance, your income requirement, the rental history you expect, how you treat past issues, and what documentation you require. Then apply that standard to every applicant, in the same order, without exception.",
          "This costs an afternoon once and saves you repeatedly. It also makes training new staff trivial, because the standard exists independently of whoever happens to be doing the screening this week.",
        ],
      },
      {
        heading: "2. Verify at the Source, Not on Paper",
        paragraphs: [
          "Pay stubs, bank letters and reference letters are all straightforward to fabricate, and the tools to do it convincingly are now free and require no particular skill. A document proves that a document exists. It does not prove the fact it asserts.",
          "Source verification means confirming with the employer, the landlord or the institution directly. That is the difference between believing a claim and having confirmed it, and it is the single change with the largest effect on screening quality.",
          "This is not about assuming applicants are dishonest — the overwhelming majority are not. It is about the fact that document review cannot reliably distinguish the small minority who are, which makes it a control that does not control anything.",
        ],
      },
      {
        heading: "3. Treat Rental History as More Than a Reference Check",
        paragraphs: [
          "A previous landlord will usually confirm dates and rent amount if asked directly. The information that actually predicts anything sits one question further on: was rent paid on time, was the lease complied with, and would they rent to this person again.",
          "Those answers rarely appear in writing, which is exactly why a structured conversation outperforms a form. And structure is what makes the answers useful — ask every reference the same questions in the same order and the responses become comparable rather than anecdotal.",
          "Pay attention to hesitation as well as content. A landlord who pauses before saying they would rent to someone again has told you something a checkbox never would.",
        ],
        bullets: [
          "Confirm tenancy dates and rent against what the applicant submitted, and note any gap.",
          "Ask specifically about payment timeliness rather than general satisfaction.",
          "Ask whether they would rent to the applicant again.",
          "Ask about lease compliance separately — notice periods, unauthorised occupants, condition on exit.",
        ],
      },
      {
        heading: "4. Watch for the Landlord Who Is Not a Landlord",
        paragraphs: [
          "One of the oldest patterns in tenant fraud is a reference number that reaches a friend or relative rather than a property owner. It costs nothing to attempt and, without verification, is close to impossible to detect from an application alone.",
          "Cross-check the contact against public ownership records where they are available. Beyond that, a reference who cannot answer basic factual questions about the tenancy — the rent amount, the length of the lease, the condition of the unit at move-out — should be recorded as unverified rather than positive.",
          "The tell is usually vagueness about specifics combined with enthusiasm about the person. Genuine landlords tend to be the other way round.",
        ],
      },
      {
        heading: "5. Verify Income Against the Employer, Not the Payslip",
        paragraphs: [
          "Income is the claim with the largest financial consequence if it is wrong, and the one most commonly inflated. Confirming employment status, position and income directly with the employer removes the entire category of fabricated documentation in one step.",
          "For self-employed applicants, where there is no employer to call, the equivalent is corroboration from independent sources — tax documentation, bank records, and the consistency between them. It is more work, and it should be applied consistently to all self-employed applicants rather than at the screener's discretion.",
          "Set your income threshold as a written multiple of rent and apply it uniformly. A threshold that moves depending on how much you liked the applicant is not a threshold.",
        ],
      },
      {
        heading: "6. Screen Every Adult Occupant",
        paragraphs: [
          "Screening only the named leaseholder is a gap that shows up eventually. Every adult who will occupy the unit should go through the same process, for the straightforward reason that they will be living there and their conduct affects the tenancy and the neighbours.",
          "Apply this uniformly. Screening some occupants and not others based on who seems to matter more is exactly the kind of discretion that produces both bad outcomes and complaints.",
          "Be clear in your published criteria that this is your policy, so applicants know before they apply rather than being surprised partway through.",
        ],
      },
      {
        heading: "7. Document Every Step, Not Just the Decision",
        paragraphs: [
          "Every screening decision should leave a record of what was checked, what came back, and what was concluded from it. Not just the outcome — the evidence.",
          "That record protects the applicant from arbitrary treatment and protects you from having to reconstruct your reasoning from memory months later, possibly to a regulator or in a deposition. Memory is not evidence, and reconstruction after the fact always looks worse than contemporaneous notes.",
          "An audit trail is not bureaucracy. It is the only durable proof that your process was applied consistently, and it is worth almost nothing if it is created retrospectively.",
        ],
      },
      {
        heading: "8. Handle Adverse Action Properly, Every Time",
        paragraphs: [
          "When a screening report contributes to a denial, a higher deposit or a co-signer requirement, the applicant is generally entitled to notice identifying the source of the report and explaining their right to dispute it. This is a legal obligation in most jurisdictions, not a courtesy.",
          "Treat it as a standard step rather than an exception handled case by case. A prompt, complete notice resolves most disputes before they escalate, and its absence is among the easiest violations for a regulator to establish — because the absence is itself the evidence.",
          "Build it into the workflow so it happens automatically rather than depending on someone remembering.",
        ],
      },
      {
        heading: "9. Move Quickly — Good Applicants Do Not Wait",
        paragraphs: [
          "Thorough and slow are routinely confused, and they are not the same thing. Strong applicants typically hold several options and commit to whichever landlord responds first. A screening process measured in days therefore quietly selects for applicants who have nowhere else to go, which is the exact opposite of what it was designed to do.",
          "This is worth stating plainly because it is counter-intuitive: a slow, rigorous process can produce a worse tenant pool than a fast, equally rigorous one. The rigour is not what costs you the applicant. The waiting is.",
          "Automating verification is what makes speed and rigour compatible. Checks that used to take a week of phone tag complete the same day with nothing skipped, because the delay was never adding thoroughness in the first place.",
        ],
      },
      {
        heading: "10. Review Your Criteria on a Schedule",
        paragraphs: [
          "Criteria drift. Markets change, local ordinances add protected classes, and rules written three years ago start producing outcomes nobody intended. Review them annually, and whenever you enter a new market.",
          "The review is also the moment to check whether your criteria are producing disparate outcomes. A rule applied identically to everyone can still create liability if it disproportionately excludes a protected class and cannot be justified as a genuine business necessity — and you will only know if you look.",
          "Keep the previous versions. Being able to show what your criteria were at the time a particular decision was made is worth a great deal if that decision is ever questioned.",
        ],
      },
      {
        heading: "Putting It Together",
        paragraphs: [
          "None of these practices is individually difficult. What makes them effective is that they compound: written criteria make consistency possible, source verification makes the criteria meaningful, documentation makes both provable, and speed means you are applying all of it to the applicants you actually want.",
          "Teams that adopt them piecemeal tend to get partial results. Teams that adopt them together usually find that screening stops being a source of anxiety and becomes a routine part of the process — which is the real objective.",
        ],
      },
    ],
  },
  {
    slug: "fair-housing-compliance",
    title: "Fair Housing Compliance in Tenant Screening",
    excerpt:
      "Ensure your screening process is fair, consistent, and compliant with all regulations.",
    category: "Compliance",
    date: "2024-04-11",
    body: [
      {
        heading: "What the Federal Baseline Requires",
        paragraphs: [
          "The Fair Housing Act prohibits refusing to rent, or applying different terms and conditions, on the basis of race, colour, national origin, religion, sex, familial status or disability. These are the federal protected classes, and they apply to essentially every rental transaction of any scale.",
          "The provisions on familial status and disability are the ones most often misunderstood. Familial status protects households with children under eighteen, which means occupancy rules and property policies that effectively exclude families require careful justification. Disability protection carries an affirmative obligation: landlords must make reasonable accommodations to rules and policies, and permit reasonable modifications to the premises.",
          "Critically, the prohibition covers effect as well as intent. A criterion applied identically to every applicant can still create liability if it disproportionately excludes a protected class and cannot be justified as a genuine business necessity. Good intentions are not a defence, and neither is uniformity on its own.",
        ],
      },
      {
        heading: "Where State and Local Law Goes Further",
        paragraphs: [
          "Many states and cities extend protection well beyond the federal list. Source of income, sexual orientation, gender identity, age, marital status, military or veteran status, and criminal history all appear in state and local ordinances, in varying combinations.",
          "Source of income protection is among the most widely adopted and the most operationally significant. Where it applies, it generally requires landlords to consider housing vouchers and other lawful income on the same terms as employment income — which means an income multiple calculated only on wages may itself be a violation.",
          "Criminal history restrictions are the fastest-moving area. A growing number of jurisdictions limit how far back you may look, prohibit blanket bans, or require individualised assessment considering the nature of the offence, the time elapsed and evidence of rehabilitation.",
          "The practical consequence is that compliance is local. A policy that is lawful in one state may not be in the next, and may not be in a particular city within a state where it is otherwise fine. Multi-market operators need their criteria reviewed per market, not once nationally.",
        ],
      },
      {
        heading: "Consistency Is the Practical Test",
        paragraphs: [
          "In practice, most fair housing exposure arises from inconsistency rather than animus. Very few complaints involve someone saying something overtly discriminatory. Most involve two applicants who were treated differently, and an explanation that does not adequately account for the difference.",
          "If one applicant's employment was verified at the source and another's was accepted on a payslip, that difference has to be explicable by something other than who the applicants were. If one was asked for additional documentation and another was not, the same applies.",
          "Written criteria, applied in a fixed order, with each step recorded, is the most reliable protection available. It is also, independently, a better process — the compliance benefit is a side effect of doing the job properly.",
        ],
        bullets: [
          "Apply the same checks, in the same sequence, to every applicant for a given property.",
          "Record what was checked and what came back, not only the final decision.",
          "Keep criteria in writing, dated, with previous versions retained.",
          "Review annually and whenever entering a new market.",
        ],
      },
      {
        heading: "Advertising and Pre-Application Conduct",
        paragraphs: [
          "Fair housing obligations begin before an application is ever submitted. Listing language, the way enquiries are answered, and who is invited to view a property are all within scope, and all are common sources of complaint.",
          "Descriptions of the ideal occupant — phrasing suggesting a property suits professionals, or is not suitable for children — can constitute a statement of preference even where no discrimination was intended. Describe the property, not the person you imagine living in it.",
          "Testing organisations routinely make paired enquiries to check whether callers are treated equally. Handling every enquiry with the same script and the same information is straightforward, and it removes an entire category of risk.",
        ],
      },
      {
        heading: "Reasonable Accommodations and Modifications",
        paragraphs: [
          "A reasonable accommodation is a change to a rule, policy or practice that allows a person with a disability equal opportunity to use and enjoy a dwelling. Assistance animals in a no-pets building are the most familiar example; a reserved accessible parking space is another.",
          "A reasonable modification is a physical change to the premises. The two are governed by different rules and are frequently conflated, which causes avoidable disputes.",
          "Requests do not need to be made in a particular form or use particular words. Train whoever handles enquiries to recognise a request for what it is, route it consistently, and respond in writing. Refusing a request should be a considered, documented decision — never a front-line reflex.",
        ],
      },
      {
        heading: "Adverse Action and the Applicant's Right to Know",
        paragraphs: [
          "When a screening report contributes to a denial, a higher deposit, or a co-signer requirement, the applicant is generally entitled to notice identifying the source of the report and explaining their right to dispute what it contains.",
          "Handle this as a standard step, built into the workflow rather than depending on someone remembering. A prompt, complete adverse action notice resolves most disputes before they escalate. Its absence is one of the easiest violations for a regulator to establish, because the missing notice is itself the evidence.",
          "Where a report is disputed and subsequently corrected, reconsider the decision on the corrected information and document that you did.",
        ],
      },
      {
        heading: "Automation Helps, but It Does Not Transfer Responsibility",
        paragraphs: [
          "Automated verification improves consistency in a way that is directly relevant to fair housing compliance. The same questions get asked of every reference, in the same order, and a complete record is produced as a by-product rather than as an additional task someone has to remember. Both of those address the failure mode that generates most complaints.",
          "It does not, however, move responsibility for the decision anywhere. The criteria remain yours. The decision remains yours. Any tool you use should make both easier to explain to a regulator, not harder — and if it produces a result you cannot explain, that is a reason to look at it more closely rather than less.",
          "Treat the verification output as evidence you then apply your written criteria to, and the division of responsibility stays clear.",
        ],
      },
      {
        heading: "Building a Defensible Process",
        paragraphs: [
          "A defensible screening process has four properties. The criteria are written down and dated. They are applied to every applicant in the same order. Each step leaves a record of what was checked and what came back. And the whole thing is reviewed on a schedule rather than when something goes wrong.",
          "That is genuinely the whole list. It is not complicated, and nothing in it requires legal expertise to implement — though a review of your criteria by counsel familiar with your specific markets is money well spent, particularly if you operate across state lines.",
          "The organisations that get into difficulty are almost never the ones that thought about this and got a detail wrong. They are the ones that never wrote anything down.",
        ],
      },
    ],
  },
  {
    slug: "understanding-the-ve-score",
    title: "Understanding the VE Score™",
    excerpt:
      "How our proprietary score works and how to use it to make better leasing decisions.",
    category: "Product How-To's",
    date: "2024-03-29",
    body: [
      {
        heading: "What the Score Actually Measures",
        paragraphs: [
          "The VE Score is a 0–100 summary of how well an applicant's claims held up when checked against their sources. It measures confirmation, not character, and it deliberately does not attempt to predict whether someone will be a good tenant, employee or student.",
          "That distinction is not a technicality. A low score means information could not be confirmed, or that what came back conflicted with what was submitted. It does not say the applicant is unreliable, and treating it as though it did would be both wrong and, in a housing context, legally risky.",
          "Read in the right frame, the score answers one useful question: how much of this application still needs a human to look at it. That is what it is built for.",
        ],
      },
      {
        heading: "What Goes Into It",
        paragraphs: [
          "The score is assembled from the verification outcomes themselves. Whether each claim was confirmed at the source, how completely the reference was able to answer, whether independent sources agreed with each other, and whether any fraud signals were raised during the process.",
          "Claims that could not be reached at all are treated as unverified rather than negative. This matters more than it might appear. An employer who does not answer the phone tells you nothing whatsoever about the applicant, and a scoring model that penalised the applicant for it would be systematically unfair to people whose former employers have closed, been acquired, or simply have poor phone coverage.",
          "Instead, unreachable claims widen the uncertainty around the score rather than pushing it downward. The report says explicitly which items were unverified, so the gap is visible rather than buried in a number.",
        ],
        bullets: [
          "Source confirmation — was each claim verified with the employer, landlord or institution.",
          "Consistency — did independent sources agree with each other and with the application.",
          "Completeness — how much of the submitted information could be checked at all.",
          "Fraud signals — anomalies detected during the call or in supporting documentation.",
        ],
      },
      {
        heading: "Reading the Bands",
        paragraphs: [
          "Scores above 85 indicate that essentially everything checked out. The report will still list what was verified, but there is unlikely to be anything in it that changes your decision.",
          "The 70–85 band usually means one item could not be confirmed, and the report will name it. Often this is an older employer or a landlord who could not be reached. It warrants a look at which item it was, not necessarily any further action.",
          "Below 70, something material either conflicted with what was submitted or could not be reached. This is where reading the detail is not optional — the number is not the finding, the report is.",
          "The bands are a triage aid. They tell you how much of the report you need to read closely, which is a genuinely useful thing to know when you have forty applications and limited hours.",
        ],
      },
      {
        heading: "Using It Well",
        paragraphs: [
          "Use the score to prioritise attention, not to replace judgement. This is the single most important point in this guide.",
          "A hard cutoff applied to a score is functionally a screening criterion, and it carries every obligation any other criterion does. You would need to justify the threshold as a business necessity, apply it consistently to every applicant, disclose it in your published criteria, and be able to explain it to a regulator. Most organisations that think carefully about this conclude that a cutoff is more trouble than it is worth.",
          "The alternative is straightforward and works better: use the band to decide how closely to read, then apply your written criteria to what the report actually says. The score gets you to the relevant detail faster. The decision still comes from the detail.",
        ],
      },
      {
        heading: "What the Score Is Not",
        paragraphs: [
          "It is not a credit score, and it is not derived from one. It is not a risk prediction, a background check summary, or an assessment of the person. It is not comparable across different verification types in a meaningful way — a score built from three confirmed items is not the same object as one built from eight.",
          "It is also not stable over time in the way a credit score is. It describes one verification, at one moment, against the sources available then. Re-running the same applicant six months later with a different employer would produce a different number for entirely legitimate reasons.",
          "Being clear about these boundaries with your team prevents the most common misuse, which is treating the number as a summary of the applicant rather than a summary of the verification.",
        ],
      },
      {
        heading: "Explaining It to Applicants",
        paragraphs: [
          "Applicants occasionally ask about their score, particularly if a decision went against them. The honest answer is usually the simplest one: the score reflects how much of the information they supplied could be confirmed with the sources they nominated, and a low score most often means a source could not be reached rather than anything about them.",
          "If the score contributed to an adverse decision, adverse action requirements apply in the normal way — the applicant is entitled to know the source of the report and their right to dispute what it contains.",
          "Where an applicant can supply a better contact for an unreachable reference, re-running the verification is usually the fastest resolution for everyone.",
        ],
      },
    ],
  },
  {
    slug: "integrating-with-property-software",
    title: "Integrating Verify Engine with Your Property Software",
    excerpt: "Connect with popular property management platforms in just a few simple steps.",
    category: "Product How-To's",
    date: "2024-03-14",
    body: [
      {
        heading: "Why Integrate at All",
        paragraphs: [
          "Verify Engine works perfectly well on its own, and plenty of teams run it that way indefinitely. But the case for connecting it to the system your team already lives in is not really about convenience, which is how it is usually pitched.",
          "It is about eliminating retyping, because retyping is where applicant data quietly gets corrupted. A transposed digit in a reference phone number is the single most common cause of a verification that never completes, and it is invisible at the point it happens. The request looks fine. It simply goes nowhere, and nobody finds out for a day.",
          "Passing the applicant through directly removes that failure mode entirely rather than reducing it. That is a categorical improvement, not an incremental one, and it is why integration is worth doing even for teams with modest volume.",
        ],
      },
      {
        heading: "Choosing an Integration Path",
        paragraphs: [
          "There are three ways to connect, and the right one depends less on which platform you use than on how your team actually works.",
          "The browser extension suits teams whose applicants arrive through listing portals or applicant portals that vary from case to case. It reads the applicant from the page in front of you and submits without retyping, and it requires nothing at all from your software vendor — which means one person can adopt it this afternoon without a project.",
          "A direct platform connection suits teams whose applicants consistently land in one management system. Applicants sync automatically, and reports come back attached to the right record without anyone moving them.",
          "The API suits teams that have built their own intake tooling and want verification triggered by their own logic. It offers the most control and requires development time proportionate to that.",
          "Most teams start with the extension and add a direct connection once volume makes the setup effort obviously worthwhile. There is no penalty for running both.",
        ],
        bullets: [
          "Browser extension — reads the applicant from the page you are already on; no vendor involvement.",
          "Direct platform connection — applicants sync automatically from supported management systems.",
          "API — full programmatic control for teams with their own intake tooling.",
        ],
      },
      {
        heading: "Setting Up a Direct Connection",
        paragraphs: [
          "From Settings, choose your platform and authorise the connection. You will be asked which properties or portfolios should sync, and whether verifications should be created automatically when an application is received or held for a person to trigger manually.",
          "That second choice is worth deciding deliberately. Automatic creation suits high-volume operators who verify everyone, and removes a step that is easy to forget. Manual triggering suits teams who pre-screen before spending on verification, which is common where application volume greatly exceeds available units.",
          "Either can be changed later without disturbing records already created, so it is not a decision you need to agonise over. Starting manual and switching to automatic once you trust the flow is a reasonable default.",
        ],
      },
      {
        heading: "Mapping Your Fields",
        paragraphs: [
          "Field mapping is the one step that repays care. Verify Engine needs the applicant's name and contact details, and the reference contact it should reach. Everything else is optional context that makes the resulting report more useful.",
          "The friction is almost always the reference contact. Many property management systems store a previous landlord's phone number in a free-text note rather than a structured field, which means it cannot be mapped reliably. Where that is the case, map what you can and plan for that one field to be completed manually.",
          "It is much better to know this before you switch your team over than to discover it during your first week of live syncing. Spend ten minutes looking at three or four real records in your system and check that the reference contact is somewhere a mapping can actually reach.",
        ],
        bullets: [
          "Required: applicant name, applicant contact details, reference contact.",
          "Valuable if available: claimed employer, claimed income, tenancy dates, unit and property.",
          "Check the reference contact is in a structured field before relying on automatic sync.",
        ],
      },
      {
        heading: "Verifying the Connection Works",
        paragraphs: [
          "Run one real verification end to end before switching the team over. Not a test record — a real applicant, through the full flow.",
          "Confirm three things. The applicant arrived in Verify Engine with the right details, particularly the reference phone number. The completed report came back attached to the right record in your management system. And the people who need to read it can actually see it without anyone forwarding anything.",
          "If something is mismatched, it is almost always the field mapping rather than the connection itself. Check the mapping before assuming anything more serious.",
        ],
      },
      {
        heading: "Rolling It Out to the Team",
        paragraphs: [
          "Once the connection is verified, roll it out to one team or one property first rather than everywhere at once. A week is usually enough to surface the local quirks — the portfolio where references are recorded differently, the property type where an extra field matters.",
          "Tell people explicitly what changes and what does not. In most cases the change is that they stop typing applicant details into a second system, and everything after that is the same. Framed that way, adoption tends to be immediate, because it removes work rather than adding any.",
          "Keep the manual request form available. There will always be the applicant who arrived by an unusual route, and a team that knows how to handle that case is not blocked by it.",
        ],
      },
      {
        heading: "Keeping It Healthy",
        paragraphs: [
          "Integrations drift when the systems on either side change. If your management platform adds fields, changes how it stores references, or you restructure your portfolios, revisit the mapping rather than assuming it followed.",
          "A simple check works well: once a month, look at a handful of recent verifications and confirm the reference contact came through populated. If it did, the mapping is still healthy. If a proportion are arriving empty, something upstream has changed and it is far cheaper to find it that way than through a run of verifications that never complete.",
        ],
      },
    ],
  },
  {
    slug: "enterprise-verification-large-portfolios",
    title: "Enterprise Verification for Large Portfolios",
    excerpt: "How enterprise teams use Verify Engine to scale, standardize, and stay secure.",
    category: "Industry-Specific",
    date: "2024-02-27",
    body: [
      {
        heading: "The Problem Scale Creates",
        paragraphs: [
          "At a few dozen verifications a month, inconsistency is a nuisance that a manager can see and correct. At several thousand across multiple regions, it becomes a structural risk — precisely because the variation is no longer visible to anyone positioned to do anything about it.",
          "Large operators rarely have trouble with any individual verification. Their difficulty is knowing whether the same standard was applied in Phoenix as in Atlanta, and being able to demonstrate that it was. Those are different problems from the ones smaller operators solve, and they are not solved by the same means.",
          "The failure mode is quiet. Nothing looks wrong on any given day. It surfaces when a pattern emerges across a region, or when an auditor asks a question that requires comparing records that were never designed to be comparable.",
        ],
      },
      {
        heading: "Standardising Without Centralising",
        paragraphs: [
          "The instinctive response is to route everything through a central verification team. It is worth resisting. Centralisation creates a bottleneck, and a bottleneck pushes regional staff into workarounds — which reintroduces exactly the variation you were trying to eliminate, now with the added disadvantage of being invisible.",
          "A better structure separates the standard from the execution. Criteria, required verification types and escalation rules are defined centrally and are not negotiable locally. Submission, tracking and follow-up stay with the regional teams who know the properties and the applicants.",
          "The central team then handles exceptions rather than volume, which is both a better use of expertise and a workload that scales sub-linearly with the portfolio.",
        ],
        bullets: [
          "Define required verification types by property class, not by region.",
          "Let regional teams submit and manage their own queue.",
          "Escalate only exceptions centrally, never routine volume.",
          "Publish the standard where regional staff can actually find it.",
        ],
      },
      {
        heading: "Structuring Organisations and Portfolios",
        paragraphs: [
          "Whether to run one organisation or several is the first architectural decision, and it is worth taking seriously because it is awkward to change later.",
          "Separate organisations give clean separation of data, users and billing. That matters when you report to different ownership groups, operate under different regulatory regimes, or need to be able to demonstrate that one region's staff cannot see another's applicants. A single organisation gives one queue, one user list and one activity view, which is considerably simpler to administer.",
          "The deciding question is usually about reporting boundaries rather than convenience: if an owner, a regulator or a joint-venture partner would expect their data to be separate, separate it. Otherwise, prefer one.",
        ],
      },
      {
        heading: "Access, Roles and Least Privilege",
        paragraphs: [
          "Verification reports contain employment history, income figures and contact details for people who are not yet your customers, and in many cases never will be. The number of staff who genuinely need to read one is almost always smaller than the number who currently can.",
          "Separate submission from review. Keep administrative rights with a small, named group rather than distributing them for convenience. Review the access list on a schedule rather than when something prompts it — quarterly is sufficient, and it takes minutes.",
          "Access lists drift as people change roles, and drift is only ever visible if somebody looks. The review is not about distrust; it is about the fact that nobody remembers to hand back permissions they no longer use.",
        ],
      },
      {
        heading: "Auditability as a Design Requirement",
        paragraphs: [
          "For an enterprise, the question is rarely whether a given verification was performed. It is whether you can show, months or years later, exactly what was checked, by whom, and what was concluded — for any record, on demand, without a project.",
          "That has to be a property of the system rather than a reporting exercise layered on top. Every verification should produce its own complete, immutable record as a by-product of running, not as an additional step someone is asked to remember at the end of a busy day.",
          "The test is simple and worth actually running: pick a verification from eight months ago at random and see how long it takes to produce the full evidence trail. If the answer is more than a minute or two, the audit position is weaker than it appears.",
        ],
      },
      {
        heading: "Integration at Enterprise Scale",
        paragraphs: [
          "Large portfolios rarely run on a single system. Acquisitions bring their own platforms, regions have local preferences, and consolidation projects run for years. Assuming one integration will cover the estate is usually optimistic.",
          "Plan for a mixed model. Direct platform connections where a management system covers meaningful volume; the browser extension for teams working across portals and legacy systems; the API where you have your own intake tooling. What matters is that all three routes produce the same verification, to the same standard, with the same record.",
          "That is the real argument for standardising the verification layer rather than the systems around it: system consolidation takes years, and the standard cannot wait for it.",
        ],
      },
      {
        heading: "Rolling Out Across Regions",
        paragraphs: [
          "Start with one region and one property class. Run it long enough to surface the local exceptions — markets with additional protected classes, portfolios where references are structured unusually, property types with extra requirements — and fold what you learn into the standard before expanding.",
          "A rollout that reaches every region in a month and then spends six months absorbing exceptions is slower, and considerably more disruptive, than one that spends two months getting the standard right and then moves quickly.",
          "Name an owner for the standard. Documents without an owner stop being updated, and a verification standard that has drifted out of date is worse than none, because people follow it believing it is current.",
        ],
      },
      {
        heading: "Measuring Whether It Is Working",
        paragraphs: [
          "Track a small number of things rather than a dashboard nobody reads. Time from request to completed verification, by region. The proportion of verifications that complete without human intervention. The proportion that return a conflict. And the rate at which references cannot be reached at all.",
          "That last figure is the most diagnostic and the most commonly ignored. A region with a markedly higher unreachable rate usually has a data-quality problem upstream — reference contacts collected badly or stored somewhere the integration cannot see — and that is fixable once you know where to look.",
          "Compare regions against each other rather than against a target. The variance is the signal; the absolute numbers depend on market conditions you do not control.",
        ],
      },
    ],
  },
];

/**
 * Reading time, derived from the guide itself rather than stored.
 *
 * The design package shows a time on each card, but those were sample values
 * against sample cards — there was no guide body behind them. Computing it
 * from the copy means the figure is true on the day it ships and stays true
 * when the copy is edited, which a hand-maintained number never does.
 * 200 words per minute, rounded up, is the usual convention for prose.
 */
export function guideReadingMinutes(guide: Guide) {
  const words = guide.body
    .flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Long form dates read as "May 6, 2024" across the site. */
export function formatGuideDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

/** Same category first, then the most recent, so the rail is never empty. */
export function relatedGuides(slug: string, limit = 3) {
  const current = getGuide(slug);
  if (!current) return [];
  const others = guides.filter((guide) => guide.slug !== slug);
  return [...others]
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 0 : 1;
      const bMatch = b.category === current.category ? 0 : 1;
      return aMatch - bMatch || b.date.localeCompare(a.date);
    })
    .slice(0, limit);
}
