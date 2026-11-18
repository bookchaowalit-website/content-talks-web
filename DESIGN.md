# Design

Since 2026-11-19 Talks uses the shared Reader shell (see `READER.md`): Geist via `next/font`, the
`--rs-*` tokens in `app/reader-shell.css` (light and dark, WCAG 2.2 AA), one h1, 44px targets and a
forced-colors fallback. The broadcast-console look (Trebuchet/Georgia system fonts, 9–11px labels,
34px filter buttons, the tuning panel whose label overlapped its bars on phones) is retired.

- One page: an Upcoming section (an empty state with a way to ask about a talk when nothing is booked)
  and Past talks, newest first, each with its date and event. Talks have no pages, recordings or
  slides, so the entries are plain text, not links.
- Upcoming/past is worked out from the date at render time; the page revalidates daily
  (`revalidate = 86400`). The search and All/Upcoming/Past filters were removed: with two talks they
  mostly produced empty states.
