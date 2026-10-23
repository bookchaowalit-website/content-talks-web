# Talks — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `talks`, evidence Live→Prototype) on 2026-10-23.

## What it is

A client-only demo of a speaking-engagement index over two hard-coded talks.

## Who it is for

A portfolio visitor who wants to see a small archive UI: search, a status filter and a styled programme list.

## What works today

1. Search title, event or date and filter by All, Upcoming or Past. The status is derived from the talk date and
   the visitor's date, so a talk never stays "upcoming" after its day. Both records (2025-03-15, 2024-11-20) are past.
2. `/api/mcp` answers JSON-RPC with `get_all`, `get_by_id` and `search` over the same list, echoing the request id.
3. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No embedded slide decks, video recordings, related posts, reach numbers or speaking-invite impact (claims in the
  portfolio card, flagged in the 2026-10 review).
- No booking, account, storage or CMS; the two records are sample content in `lib/talks.ts`.

## Live URL and deploy state

- Live: https://talks.bookchaowalit.com (HTTP 200 on 2026-10-23).
- Last production deploy: 2026-10-23 12:19 (+07), Vercel CLI, commit d76fb71 (the CVE patch). The Vercel project
  `bookchaowalit-talks-frontend` has a Git link naming the old repository (`bookchaowalit/bookchaowalit-talks-frontend`),
  so a push to `main` does not deploy. The L2 commits (status fix, truthful MCP route, tests, Sentry) stay undeployed
  until the owner reconnects Vercel Git to `bookchaowalit-website/content-talks-web` (owner action D9). Until then the
  live site still labels the 2025 talk "UPCOMING".
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `content-talks-web`, org `personal-yu0`).

## Boundaries

- Browser-only apart from the stateless `/api/mcp` route. No personal data is collected.
