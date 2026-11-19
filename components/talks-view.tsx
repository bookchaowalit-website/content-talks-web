import type { ReactNode } from "react";
import { EmptyState, Reader, ReaderFoot, ReaderHead, ReaderTop, formatDate, plural } from "@/components/reader-shell";
import { talkStatus, type Talk } from "@/lib/talks";

// The talks index on the Reader shell. The talks have no pages, recordings or slides of their own, so each
// one is a plain entry (no link), grouped by whether its date has passed.

export const SITE = "https://talks.bookchaowalit.com";
const SOURCE = "https://github.com/bookchaowalit-website/content-talks-web";

function TalkList({ talks, id }: { talks: Talk[]; id: string }) {
  return (
    <ul className="rs-list" role="list" aria-labelledby={id}>
      {talks.map((talk) => (
        <li key={talk.id}>
          <article className="rs-entry">
            <h3>{talk.title}</h3>
            <p className="rs-entry-meta"><time dateTime={talk.date}>{formatDate(talk.date)}</time> · {talk.event}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

/** `today` is YYYY-MM-DD; a talk on today's date still counts as upcoming (lib/talks.ts). */
export function TalksView({ talks, today }: { talks: Talk[]; today: string }) {
  const upcoming = talks.filter((talk) => talkStatus(talk, today) === "Upcoming").sort((a, b) => a.date.localeCompare(b.date));
  const past = talks.filter((talk) => talkStatus(talk, today) === "Past").sort((a, b) => b.date.localeCompare(a.date));
  return (
    <TalksFrame>
        <ReaderHead
          title="Talks at conferences and meetups."
          lede="Each talk with its date and event. There are no recordings or slides online yet."
        >
          <a className="rs-plain" href="https://bookchaowalit.com/">Ask about a talk</a>
        </ReaderHead>
        <section aria-labelledby="upcoming">
          <div className="rs-section-head"><h2 id="upcoming">Upcoming</h2></div>
          {upcoming.length > 0 ? (
            <TalkList id="upcoming" talks={upcoming} />
          ) : (
            <EmptyState headingLevel={3} title="Nothing scheduled">
              No talk is booked right now. To ask about one, use the contact details on bookchaowalit.com.
            </EmptyState>
          )}
        </section>
        <section aria-labelledby="past">
          <div className="rs-section-head"><h2 id="past">Past talks</h2></div>
          {past.length > 0 ? (
            <>
              <p className="rs-count">{plural(past.length, "talk")}</p>
              <TalkList id="past" talks={past} />
            </>
          ) : (
            <EmptyState headingLevel={3} title="No past talks yet" />
          )}
        </section>
    </TalksFrame>
  );
}

export function TalksFrame({ children }: { children: ReactNode }) {
  return (
    <Reader>
      <ReaderTop name="Talks" tagline="Chaowalit Greepoke" links={[]} />
      <main id="main" className="rs-main">{children}</main>
      <ReaderFoot source={SOURCE} links={[{ href: "/mcp", label: "MCP API" }]} note="A short hand-written list kept in the repository: no recordings, booking or backend." />
    </Reader>
  );
}
