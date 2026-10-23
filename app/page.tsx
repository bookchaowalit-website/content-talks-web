"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { FILTERS, TALKS, filterTalks, formatDate, isoDay, talkStatus, type TalkFilter } from "@/lib/talks";

// Today's date is only known in the browser. The server snapshot is null, so the static HTML never
// carries a build-time "upcoming" label, and hydration matches before the client fills it in.
const noSubscription = () => () => {};
const clientToday = () => isoDay(new Date());
const serverToday = () => null;

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TalkFilter>("All");
  const today = useSyncExternalStore(noSubscription, clientToday, serverToday);
  const visibleTalks = useMemo(() => filterTalks(TALKS, filter, query, today), [filter, query, today]);

  return (
    <main className="broadcast-shell">
      <header className="broadcast-header">
        <div className="station-mark" aria-label="Bookchaowalit broadcast station">B/01</div>
        <div className="header-rule" />
        <p className="station-status"><span className="live-dot" /> Static programme archive · local demo</p>
      </header>

      <section className="broadcast-hero">
        <div className="hero-copy">
          <p className="section-code">BOOKCHAOWALIT / ON AIR ARCHIVE</p>
          <h1>Talks worth<br /><em>replaying.</em></h1>
          <p className="hero-note">A small speaking-engagement index for ideas that deserve a second listen.</p>
        </div>
        <div className="tuning-panel" aria-label="Archive summary">
          <div className="dial"><span>{String(TALKS.length).padStart(2, "0")}</span><small>programmes</small></div>
          <div className="wave-bars" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ height: `${18 + ((i * 17) % 50)}%` }} />)}</div>
          <p>FREQUENCY 01<br /><strong>IDEAS / SYSTEMS / BUILDING</strong></p>
        </div>
      </section>

      <section className="archive-console" aria-label="Talk archive">
        <div className="console-topline">
          <div><p className="section-code">PROGRAMME SELECTOR</p><h2>Choose a signal</h2></div>
          <label className="search-console"><span>Find in archive</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or event" /></label>
        </div>
        <div className="filter-strip" role="group" aria-label="Talk status">
          {FILTERS.map((option) => <button key={option} className={filter === option ? "filter-button active" : "filter-button"} onClick={() => setFilter(option)}>{option}</button>)}
          <span className="result-count">{visibleTalks.length} of {TALKS.length} transmissions</span>
        </div>
        <div className="programme-list">
          {visibleTalks.length === 0 ? <div className="empty-frequency">No transmission matches that search. Try a different frequency.</div> : visibleTalks.map((talk, index) => (
            <article className="programme-row" key={talk.id}>
              <div className="programme-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="programme-date"><span>{formatDate(talk.date)}</span><small>{today ? talkStatus(talk, today).toUpperCase() : "DATED"}</small></div>
              <div className="programme-title"><h3>{talk.title}</h3><p>{talk.event}</p></div>
              <div className="programme-signal" aria-hidden="true"><span /><span /><span /><span /><span /></div>
            </article>
          ))}
        </div>
      </section>
      <footer className="broadcast-footer"><span>HONEST DEMO / STATIC CONTENT</span><span>No recording, booking, or backend attached.</span></footer>
    </main>
  );
}
