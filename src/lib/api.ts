import { env, isApiConfigured } from "./env";

/**
 * Thin API client for the Verify Engine backend.
 *
 * The scope has frontend and backend running in parallel, so this deliberately
 * supports both states: while `NEXT_PUBLIC_API_BASE_URL` is unset the client
 * short-circuits to the caller-supplied mock, and once the backend lands the
 * same call sites start hitting the real endpoint with no edits.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions<TMock> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /**
   * Returned instead of performing a request while no API base URL is set.
   * Keep the shape identical to the real response so swapping is transparent.
   */
  mock?: TMock;
  /** Simulated latency for the mock path, so loading states are exercised. */
  mockDelayMs?: number;
};

export async function apiRequest<TResponse>(
  path: string,
  options: RequestOptions<TResponse> = {},
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
    mock,
    mockDelayMs = 600,
  } = options;

  if (!isApiConfigured) {
    if (mock === undefined) {
      throw new ApiError(
        `No API configured and no mock supplied for ${method} ${path}. ` +
          "Set NEXT_PUBLIC_API_BASE_URL or pass a mock.",
        0,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, mockDelayMs));
    return mock;
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method,
    signal,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  // Read the payload once, tolerating empty and non-JSON bodies.
  const text = await response.text();
  let payload: unknown = undefined;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message: unknown }).message)
        : null) ?? `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, payload);
  }

  return payload as TResponse;
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions<T>, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions<T>, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions<T>, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions<T>, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: Omit<RequestOptions<T>, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};
