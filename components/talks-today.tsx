"use client";

import { useSyncExternalStore } from "react";
import { TalksView } from "@/components/talks-view";
import { isoDay, type Talk } from "@/lib/talks";

// The cached page is built with the server's date, which can be a day (or more) old by the time a visitor
// opens it. This wrapper re-groups the talks with the visitor's own calendar day once the page hydrates,
// and again when the tab comes back into view or the day rolls over while it is open.

function subscribe(onChange: () => void): () => void {
  const timer = window.setInterval(onChange, 60_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", onChange);
  };
}

const visitorDay = () => isoDay(new Date());

/** `serverToday` is the day the cached HTML was built with; the browser replaces it with its own day. */
export function TalksToday({ talks, serverToday }: { talks: Talk[]; serverToday: string }) {
  const today = useSyncExternalStore(subscribe, visitorDay, () => serverToday);
  return <TalksView talks={talks} today={today} />;
}
