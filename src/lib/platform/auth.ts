import { api } from "@/lib/api";

/**
 * Frontend calls for Milestone 5's authentication screens. Shaped exactly
 * like the real endpoints are expected to look, so once the backend exists
 * these three functions are the only place that changes — every page that
 * calls them keeps working.
 */

export type Session = {
  user: { name: string; email: string };
  organization: { name: string };
};

const MOCK_SESSION: Session = {
  user: { name: "Account", email: "demo@verifyengine.com" },
  organization: { name: "CutRite Lawn Care" },
};

export function login(email: string, password: string) {
  return api.post<Session>(
    "/auth/login",
    { email, password },
    { mock: MOCK_SESSION },
  );
}

export function requestPasswordReset(email: string) {
  return api.post<{ sent: true }>(
    "/auth/password/forgot",
    { email },
    { mock: { sent: true } },
  );
}

export function resetPassword(token: string, password: string) {
  return api.post<{ reset: true }>(
    "/auth/password/reset",
    { token, password },
    { mock: { reset: true } },
  );
}
