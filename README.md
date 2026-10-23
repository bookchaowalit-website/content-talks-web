# Talks

A one-page Next.js demo of a speaking-engagement index styled as a broadcast archive. It holds **two authored
talk records** (title, event, date) with search and an All / Upcoming / Past filter.

## What it does

- Search title, event or date (case-insensitive). Upcoming or past is worked out from each talk's date against
  today's date in the browser; it is not a stored flag. Both current records are past.
- `/api/mcp` answers JSON-RPC `initialize`, `tools/list` and `tools/call` with `get_all`, `get_by_id` and `search`
  over the same list. It echoes the request id; unknown tools, ids and methods return JSON-RPC errors.
- Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What it does not do

No slide decks, video recordings, related posts, booking or reach metrics. There is no backend or storage.

## Layout

- `lib/talks.ts`: the talk list and the status, filter and search logic.
- `app/page.tsx`: the page. `app/api/mcp/route.ts`: the MCP endpoint.
- `lib/sentry.ts`, `instrumentation.ts`, `instrumentation-client.ts`: Sentry setup.
- `tests/`: Vitest tests for the logic, the page render, the MCP route and the Sentry scrubbing.

## Run

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint && npm run typecheck && npm test && npm run build
```

CI: shared `platform-ci-workflows` v1.1.1 (lint, typecheck, tests with an 88% line-coverage gate, build, security scan).
