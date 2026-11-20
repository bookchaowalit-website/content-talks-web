// @vitest-environment happy-dom
import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TalksToday } from "@/components/talks-today";
import type { Talk } from "@/lib/talks";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const talk: Talk = { id: "9", title: "Edge Rendering", date: "2026-11-20", event: "DevDay" };
const upcoming = (host: Element) => [...host.querySelectorAll('ul[aria-labelledby="upcoming"] h3')].map((h) => h.textContent);
const past = (host: Element) => [...host.querySelectorAll('ul[aria-labelledby="past"] h3')].map((h) => h.textContent);

afterEach(() => vi.useRealTimers());

describe("TalksToday", () => {
  it("moves a talk to Past in the browser once the visitor's day is after it, even from a stale cached page", async () => {
    // Cached HTML built on the talk's day lists it as upcoming.
    const host = document.createElement("div");
    host.innerHTML = renderToString(<TalksToday talks={[talk]} serverToday="2026-11-20" />);
    expect(upcoming(host)).toEqual(["Edge Rendering"]);

    // The visitor opens it the next day.
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 10, 21, 9, 0));
    document.body.append(host);
    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => {
      root = hydrateRoot(host, <TalksToday talks={[talk]} serverToday="2026-11-20" />);
    });
    expect(upcoming(host)).toEqual([]);
    expect(past(host)).toEqual(["Edge Rendering"]);
    act(() => root?.unmount());
    host.remove();
  });

  it("keeps the server grouping when the visitor's day is the same", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 10, 20, 23, 0));
    const host = document.createElement("div");
    host.innerHTML = renderToString(<TalksToday talks={[talk]} serverToday="2026-11-20" />);
    document.body.append(host);
    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => {
      root = hydrateRoot(host, <TalksToday talks={[talk]} serverToday="2026-11-20" />);
    });
    expect(upcoming(host)).toEqual(["Edge Rendering"]);
    act(() => root?.unmount());
    host.remove();
  });
});
