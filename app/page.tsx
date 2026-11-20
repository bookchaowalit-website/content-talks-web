import { TalksToday } from "@/components/talks-today";
import { TALKS, isoDay } from "@/lib/talks";

// The HTML is rebuilt at most once a day with the server's date; TalksToday then regroups Upcoming and Past
// with the visitor's own date in the browser, so a talk never stays "upcoming" after its day.
export const revalidate = 86400;

export default function Home() {
  return <TalksToday talks={TALKS} serverToday={isoDay(new Date())} />;
}
