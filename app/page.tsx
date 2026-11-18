import { TalksView } from "@/components/talks-view";
import { TALKS, isoDay } from "@/lib/talks";

// Upcoming and past are worked out from today's date, so the page is rebuilt once a day.
export const revalidate = 86400;

export default function Home() {
  return <TalksView talks={TALKS} today={isoDay(new Date())} />;
}
