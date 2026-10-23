// The talk archive: two authored records. Upcoming/past is derived from the date, never stored,
// so a talk cannot stay "upcoming" after its day has passed.

export type Talk = { id: string; title: string; date: string; event: string };
export type TalkStatus = "Upcoming" | "Past";
export type TalkFilter = "All" | TalkStatus;

export const TALKS: Talk[] = [
  { id: "1", title: "Web Development Trends", date: "2025-03-15", event: "TechConf" },
  { id: "2", title: "React Patterns", date: "2024-11-20", event: "Meetup" },
];

export const FILTERS: TalkFilter[] = ["All", "Upcoming", "Past"];

/** Local calendar day as YYYY-MM-DD. */
export function isoDay(now: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** A talk on today's date still counts as upcoming. ISO dates compare correctly as strings. */
export function talkStatus(talk: Talk, today: string): TalkStatus {
  return talk.date >= today ? "Upcoming" : "Past";
}

/** Filter by status and a case-insensitive search over title, event and date.
 *  Without a known day (server render) the status filters cannot be decided, so they show nothing. */
export function filterTalks(talks: Talk[], filter: TalkFilter, query: string, today: string | null): Talk[] {
  const needle = query.trim().toLowerCase();
  return talks.filter((talk) => {
    if (filter !== "All" && (today === null || talkStatus(talk, today) !== filter)) return false;
    return `${talk.title} ${talk.event} ${talk.date}`.toLowerCase().includes(needle);
  });
}

export function findTalk(id: unknown): Talk | undefined {
  return TALKS.find((talk) => talk.id === id);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}
