/*
 * User Activity & Responses - Users — Figma node 18030:2381.
 *
 * The rows are the design's own, in its order, standing in for the responses
 * endpoint. Each user row shows their latest answer; "Details" opens the rest,
 * which the design only draws for the first user (18030:2398).
 *
 * The design fills every voice-note transcript with lorem ipsum — placeholder
 * copy, not a transcript — so the mock carries none (null) and the cell shows
 * only the recording's play button until the endpoint supplies the text.
 */

export type UserResponse = {
  question: string;
  answer: "Yes" | "No";
};

export type UserActivityRow = {
  id: string;
  name: string;
  email: string;
  totalResponses: number;
  /** MLS IDs of the properties the user answered about. */
  properties: readonly string[];
  latest: UserResponse;
  voiceNote: { duration: string; transcript: string | null };
  addedAt: string;
  updatedAt: string;
  insightActive: boolean;
  /** Earlier answers, listed under the row when it is expanded. */
  earlier: readonly UserResponse[];
};

const row = (
  name: string,
  email: string,
  totalResponses: number,
  properties: readonly string[],
  question: string,
  answer: UserResponse["answer"],
  addedAt: string,
  updatedAt: string,
  earlier: readonly UserResponse[] = [],
): UserActivityRow => ({
  id: email,
  name,
  email,
  totalResponses,
  properties,
  latest: { question, answer },
  voiceNote: { duration: "0:49", transcript: null },
  addedAt,
  updatedAt,
  insightActive: true,
  earlier,
});

export const USER_ACTIVITY: UserActivityRow[] = [
  row(
    "Rhonda Rhodes",
    "lorri73@gmail.com",
    112,
    ["M-6838", "M-8531", "M-9523", "M-8402", "M-2843", "M-4945", "M-1699", "M-4190", "M-1024"],
    "Are the fixtures (handles/taps) too 'old-fashioned'?",
    "Yes",
    "24 Mar 2026 6:12 am",
    "01 Mar 2026 3:20 pm",
    [
      { question: "Does the flooring look low-quality or outdated?", answer: "No" },
      { question: "Does the exterior color make the home look 'cheap' to you?", answer: "Yes" },
      { question: "Would you pay a premium for 'modern' colors like Grey or White?", answer: "No" },
      { question: "Does the kitchen feel 'builder-grade' (standard/cheap)?", answer: "Yes" },
    ],
  ),
  row(
    "Daniel Hamilton",
    "kurt_bates@outlook.com",
    461,
    ["M-2977", "M-3644", "M-4113", "M-7744", "M-4026", "M-5167", "M-6498", "M-1496", "M-5083"],
    "Would you consider this a 'Project House' rather than a 'Home'?",
    "Yes",
    "11 Feb 2026 6:26 pm",
    "05 Feb 2026 3:00 am",
  ),
  row(
    "Bradley Lawlor",
    "katie63@aol.com",
    420,
    ["M-4803", "M-3710", "M-1169", "M-8512", "M-7619", "M-3031", "M-7636", "M-5659", "M-3757"],
    "Does the flooring look low-quality or outdated?",
    "No",
    "12 Apr 2026 4:17 pm",
    "01 Feb 2026 12:26 am",
  ),
  row(
    "Patricia Sanders",
    "david291@gmail.com",
    110,
    ["M-3330", "M-3531", "M-2544", "M-6630", "M-8997", "M-3963", "M-6493", "M-7811", "M-5410"],
    "Does the exterior color make the home look 'cheap' to you?",
    "Yes",
    "14 Feb 2026 10:28 pm",
    "25 Mar 2026 1:25 pm",
  ),
  row(
    "James Hall",
    "r.m.smith@gmail.com",
    161,
    ["M-7601", "M-5606", "M-1030", "M-3531", "M-2367", "M-1674", "M-7108", "M-9439", "M-2280"],
    "Is the curb appeal (yard/front) worth more than the inside?",
    "No",
    "20 Apr 2026 6:40 am",
    "04 Apr 2026 4:10 pm",
  ),
  row(
    "Chris Glasser",
    "m.k.freund@aol.com",
    103,
    ["M-9290", "M-8806", "M-6642", "M-7730", "M-6764", "M-4554", "M-9577", "M-1065", "M-8147"],
    "Does the house have a 'heavy' or 'cluttered' feel?",
    "Yes",
    "09 Mar 2026 2:52 am",
    "23 Mar 2026 3:58 pm",
  ),
  row(
    "Eddie Lake",
    "patricia651@outlook.com",
    228,
    ["M-9312", "M-7151", "M-5589", "M-3846", "M-1772", "M-3714", "M-2790", "M-5351", "M-4554"],
    "Did the neighbor's house/yard lower your bid amount?",
    "No",
    "23 Mar 2026 9:42 am",
    "09 Mar 2026 7:51 pm",
  ),
  row(
    "David Elson",
    "alex941@outlook.com",
    311,
    ["M-5729", "M-9763", "M-9748", "M-3908", "M-1896", "M-3728", "M-4515", "M-7211", "M-7530"],
    "Are the fixtures (handles/taps) too 'old-fashioned'?",
    "Yes",
    "21 Mar 2026 6:00 pm",
    "31 Jan 2026 3:00 am",
  ),
  row(
    "Kathy Pacheco",
    "rodger913@aol.com",
    279,
    ["M-8569", "M-3961", "M-7319", "M-6635", "M-5463", "M-9260", "M-5719", "M-5768", "M-9776"],
    "Would you pay a premium for 'modern' colors like Grey or White?",
    "Yes",
    "16 Mar 2026 6:01 pm",
    "02 Feb 2026 1:57 pm",
  ),
  row(
    "Judith Rodriguez",
    "j.e.dukes@aol.com",
    82,
    ["M-5730", "M-5275", "M-7740", "M-7281", "M-9844", "M-6221", "M-1726", "M-1049", "M-9231"],
    "Would you consider this a 'Project House' rather than a 'Home'?",
    "No",
    "19 Apr 2026 10:48 am",
    "01 Feb 2026 2:57 pm",
  ),
  row(
    "Alex Buckmaster",
    "jerry73@aol.com",
    386,
    ["M-7374", "M-8479", "M-9744", "M-9641", "M-4223", "M-1016", "M-1374", "M-8134", "M-5531"],
    "Does the exterior color make the home look 'cheap' to you?",
    "No",
    "26 Mar 2026 1:44 am",
    "23 Feb 2026 7:53 pm",
  ),
  row(
    "Mary Freund",
    "k.r.mastrangelo@outlook.com",
    258,
    ["M-9866", "M-7765", "M-4403", "M-4288", "M-7769", "M-7051", "M-6852", "M-9674", "M-2174"],
    "Does the house have a 'heavy' or 'cluttered' feel?",
    "No",
    "26 Mar 2026 3:36 pm",
    "13 Feb 2026 5:54 pm",
  ),
  row(
    "Stephanie Sharkey",
    "r.g.rhodes@aol.com",
    457,
    ["M-4141", "M-4964", "M-7049", "M-3970", "M-6301", "M-7024", "M-8956", "M-5675", "M-6120"],
    "Does the kitchen feel 'builder-grade' (standard/cheap)?",
    "No",
    "05 Apr 2026 4:57 am",
    "08 Feb 2026 3:34 am",
  ),
  row(
    "Lorri Warf",
    "f.j.swann@aol.com",
    392,
    ["M-4581", "M-5886", "M-7282", "M-1328", "M-9403", "M-3440", "M-5953", "M-9900", "M-5274"],
    "Does the flooring look low-quality or outdated?",
    "No",
    "15 Mar 2026 5:21 pm",
    "09 Feb 2026 4:50 pm",
  ),
  row(
    "Rodger Struck",
    "k_pacheco@gmail.com",
    365,
    ["M-7504", "M-8118", "M-1055", "M-8973", "M-1962", "M-7454", "M-4397", "M-1766", "M-9550"],
    "Is the interior lighting bright enough for your price?",
    "No",
    "17 Mar 2026 4:23 pm",
    "26 Feb 2026 11:33 pm",
  ),
  row(
    "Autumn Phillips",
    "dennis416@gmail.com",
    408,
    ["M-9255", "M-4114", "M-3394", "M-6988", "M-5924", "M-3850", "M-7721", "M-6892", "M-6432"],
    "Is the curb appeal (yard/front) worth more than the inside?",
    "Yes",
    "21 Feb 2026 4:22 am",
    "06 Feb 2026 5:44 pm",
  ),
];
