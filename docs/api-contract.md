# API contract — public website

What the public website sends to the backend, and what it expects back.

The site is built to work before the backend exists and to switch over without a
code change. While `NEXT_PUBLIC_API_BASE_URL` is empty, every call below resolves
locally against a mock of the same shape, so forms, loading states and success
states stay exercisable. Set the variable and the same calls become real
requests against `<NEXT_PUBLIC_API_BASE_URL><path>`.

One exception, deliberately: in `production`, a submission with no API
configured does **not** resolve. It fails with an error the visitor can see,
because a form that says "request received" when nothing was sent anywhere is
worse than one that says it is unavailable.

Every call lives in `src/lib/api-endpoints.ts`, typed. That file and this
document describe the same six endpoints — change one and change the other.

## Conventions

| | |
|---|---|
| Format | JSON request and response bodies, UTF-8 |
| Content type | `application/json` on any request with a body |
| Success | Any `2xx`. The site reads `ok` and, when present, `id`; extra fields are ignored, so the response can grow without breaking the site |
| Errors | Any non-`2xx`. If the body is `{ "message": "..." }`, that message is shown to the visitor verbatim — so write it for a human. Without it, the site falls back to a generic failure message |
| Timeout | 15 seconds per request. A backend that accepts the connection and stalls surfaces as a timeout error rather than an endless spinner |
| Validation | Every field below is validated in the browser before sending. Treat that as a convenience, not as trust: validate again server-side |

## Endpoints

### `POST /demo-requests`

A demo request from the Book Demo page.

```json
{
  "firstName": "string",
  "lastName": "string",
  "workEmail": "string",
  "companyName": "string",
  "phone": "string",
  "jobTitle": "string",
  "industry": "string",
  "volume": "string",
  "focusAreas": ["string"]
}
```

`phone` and `jobTitle` may be empty strings. `workEmail` is checked as an email
and rejected for consumer domains (gmail, outlook and similar). `industry` and
`volume` come from fixed dropdowns, sent as their labels. `focusAreas` is a
possibly empty list of checkbox labels.

Expected: `{ "ok": true, "id": "optional-reference" }`

### `POST /signup`

An account request from the Get Started page. Same fields as above minus
`volume` and `focusAreas`.

```json
{
  "firstName": "string",
  "lastName": "string",
  "workEmail": "string",
  "companyName": "string",
  "phone": "string",
  "jobTitle": "string",
  "industry": "string"
}
```

Expected: `{ "ok": true, "id": "optional-reference" }`

No password is collected here: the page requests an account rather than creating
one. If that changes, it changes on both sides.

### `POST /demo-calls`

The homepage AI call demo — the visitor asks the voice agent to call them.

```json
{ "phone": "string" }
```

Expected: `{ "ok": true, "id": "optional-call-id" }`

Worth agreeing on: this endpoint triggers an outbound call, so it needs rate
limiting and abuse protection on the server side. The browser cannot be trusted
to hold that line.

### `POST /auth/login`

Client Login.

```json
{ "email": "string", "password": "string" }
```

This is the one endpoint that is **not finished on the frontend**. The form
collects and posts the credentials, but nothing consumes a session yet: the site
does not store a token, does not attach an `Authorization` header, and does not
send cookies. See the open questions below — this is the first thing to settle
when the platform milestone starts.

### `POST /newsletter`

Newsletter subscription, sent from the blog sidebar card and the closing band on
content pages.

```json
{ "email": "string" }
```

Expected: `{ "ok": true }`

An address that is already subscribed should still return success — the visitor
does not need to know, and an error would read as a failure they can act on.

## Open questions for the backend team

1. **Authentication.** Cookie session or bearer token? A cookie set by the
   backend needs `credentials: "include"` on the client and a CORS configuration
   that allows it; a token needs a decision on where the browser keeps it. The
   frontend has no preference, but it cannot be built until this is chosen.
2. **CORS.** The browser calls the API directly from the site's origin, so the
   backend must allow that origin, the methods used here, and
   `Content-Type: application/json`. The alternative is routing these calls
   through the site's own server, which also keeps any secret server-side; say
   which you prefer.
3. **Error shape.** The site already renders `message` for the visitor. If you
   also return field-level errors (e.g. `{ "errors": { "workEmail": "..." } }`),
   say so and the forms will map them onto the fields instead of showing one
   message at the top.
4. **Spam.** These forms are public and unauthenticated. Rate limiting, and
   whatever else you want in front of them, belongs on the server.
5. **Idempotency.** Someone double-clicking submit can produce two requests. If
   duplicates matter for `/demo-requests` or `/signup`, tell us what to send —
   an idempotency key is easy to add.

## Environments

| Variable | Meaning |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the API. Empty means "no backend yet": mocks locally, honest errors in production |
| `NEXT_PUBLIC_SITE_URL` | Public origin of the site — the origin CORS must allow |
| `NEXT_PUBLIC_APP_ENV` | `development`, `staging` or `production` |

The base URL is read once in `src/lib/env.ts`; nothing else in the codebase
touches `process.env`.
