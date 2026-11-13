# Design system — Talks

## Overview

The talks archive is a late-night broadcast console: a quiet station header, a large editorial title, and a paper-bright programme selector. It makes the existing static search/filter demo feel like a deliberate speaking archive without implying live streaming or booking.

## Colors

- #101719 — broadcast room ground and primary ink.
- #E9F1EA — programme paper and high-contrast type.
- #9CE7D0 — signal green for active controls and station marks.
- #F2A56F — warm transmission accent for dates and signal bars.
- #54766D — secondary ink on the light console.

## Typography

Trebuchet MS carries the compact station labels and controls. Georgia italic is reserved for the expressive word in the main title and the editorial programme names.

## Layout

The dark hero is an asymmetric broadcast field. The light archive console creates a hard change of medium, then rows the talks into a readable date/title/event sequence. On mobile the control panel stacks and each programme becomes a three-column signal strip.

## Elevation & Depth

Depth comes from the light console inserted into the dark room, 1px rules, and the inset tuning-panel frame. There are no floating cards or fake live metrics.

## Shapes

Corners are square or minimally softened. Lines are thin, functional, and used like equipment markings; signal blocks are rectangular.

## Components

- Station mark and transmission status
- Tuning panel with programme count and waveform
- Search console and status filters
- Programme rows with date, event, and signal bars
- Honest static-demo footer

## Do's and Don'ts

- Do keep dates, event names, and archive states prominent.
- Do let the warm accent mark status, not decoration everywhere.
- Don't suggest audio playback, ticketing, or a live feed.
- Don't convert the archive into generic equal cards or add fake engagement metrics.


---

## Storybook

Storybook 10 (`@storybook/nextjs-vite`) shows this design system with the app's real CSS, tokens and fonts.

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build in storybook-static/ (CI: .github/workflows/storybook.yml)
```

- **Foundations/Tokens** reads every CSS custom property the app defines at runtime, so it never drifts from the code.
- **Design/DESIGN.md** renders this file.
- **Components/**, **Sections/** and **Pages/** show the UI with mock data only (no network, analytics off).
- Toolbar: locale, theme (light / dark, when the app has a dark theme), viewports 320 / 375 / 768 / 1440. The a11y panel runs axe (WCAG 2.2 AA).
- Rule: a new shared component or page section ships with a story in `stories/`.
