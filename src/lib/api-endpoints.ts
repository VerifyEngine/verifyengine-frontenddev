import { api } from "./api";

/**
 * Every backend endpoint the public website calls, with the shape of what it
 * sends and what it expects back.
 *
 * The site talks to the backend in exactly these six places. Keeping them here
 * rather than inline in the components means the contract is one file long, the
 * compiler checks each call against it, and the mock returned while the backend
 * is being built has the same type as the real response — so connecting the API
 * cannot silently change what a call site receives.
 *
 * The written contract, including status codes, error format and the questions
 * still open with the backend team, is in `docs/api-contract.md`. Change one and
 * change the other.
 */

/** Contact details every business form collects. */
export type ContactDetails = {
  firstName: string;
  lastName: string;
  /** Business address; consumer domains are rejected in the browser. */
  workEmail: string;
  companyName: string;
  /** Optional. Free text, validated loosely as a phone number. */
  phone: string;
  /** Optional. */
  jobTitle: string;
  industry: string;
};

export type DemoRequest = ContactDetails & {
  /** Expected monthly verification volume, as a range label. */
  volume: string;
  /** Zero or more topics the visitor wants the demo to cover. */
  focusAreas: string[];
};

export type SignupRequest = ContactDetails;

export type DemoCallRequest = {
  /** The number the AI agent should call back. */
  phone: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type NewsletterRequest = {
  email: string;
};

/**
 * What the site needs back from a successful submission: confirmation, and an
 * identifier when the backend has one to give. Anything else in the payload is
 * ignored, so the backend can return more without breaking the site.
 */
export type Accepted = {
  ok: true;
  id?: string;
};

/** A session, once the backend can issue one. See the contract's open questions. */
export type LoginResponse = {
  ok: true;
  id?: string;
};

/** Book Demo — a sales-qualified demo request. */
export function submitDemoRequest(body: DemoRequest, signal?: AbortSignal) {
  return api.post<Accepted>("/demo-requests", body, { mock: { ok: true }, signal });
}

/** Get Started — a new account request. */
export function submitSignup(body: SignupRequest, signal?: AbortSignal) {
  return api.post<Accepted>("/signup", body, { mock: { ok: true }, signal });
}

/** Homepage AI call demo — the visitor asks to be called by the voice agent. */
export function requestDemoCall(body: DemoCallRequest, signal?: AbortSignal) {
  return api.post<Accepted>("/demo-calls", body, { mock: { ok: true }, signal });
}

/** Client Login. Not wired to a session yet — see the contract. */
export function submitLogin(body: LoginRequest, signal?: AbortSignal) {
  return api.post<LoginResponse>("/auth/login", body, { mock: { ok: true }, signal });
}

/** Newsletter subscription, from the blog card and the closing band. */
export function subscribeToNewsletter(body: NewsletterRequest, signal?: AbortSignal) {
  return api.post<Accepted>("/newsletter", body, { mock: { ok: true }, signal });
}
