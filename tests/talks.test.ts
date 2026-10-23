import { describe, expect, it } from "vitest";
import { TALKS, filterTalks, findTalk, formatDate, isoDay, talkStatus } from "@/lib/talks";

const [trends, patterns] = TALKS;

describe("talkStatus", () => {
  it("derives the status from the date, not a stored flag", () => {
    expect(talkStatus(trends, "2026-10-23")).toBe("Past");
    expect(talkStatus(trends, "2025-03-14")).toBe("Upcoming");
  });

  it("counts a talk on today's date as upcoming", () => {
    expect(talkStatus(trends, "2025-03-15")).toBe("Upcoming");
    expect(talkStatus(trends, "2025-03-16")).toBe("Past");
  });
});

describe("filterTalks", () => {
  it("All keeps every talk, including before the day is known", () => {
    expect(filterTalks(TALKS, "All", "", null)).toEqual(TALKS);
  });

  it("splits upcoming and past for a given day", () => {
    expect(filterTalks(TALKS, "Upcoming", "", "2025-01-01")).toEqual([trends]);
    expect(filterTalks(TALKS, "Past", "", "2025-01-01")).toEqual([patterns]);
    expect(filterTalks(TALKS, "Upcoming", "", "2026-10-23")).toEqual([]);
  });

  it("status filters show nothing until the day is known", () => {
    expect(filterTalks(TALKS, "Past", "", null)).toEqual([]);
  });

  it("searches title, event and date case-insensitively and ignores surrounding spaces", () => {
    expect(filterTalks(TALKS, "All", "  TECHCONF ", null)).toEqual([trends]);
    expect(filterTalks(TALKS, "All", "2024-11", null)).toEqual([patterns]);
    expect(filterTalks(TALKS, "All", "nothing", null)).toEqual([]);
  });
});

describe("helpers", () => {
  it("isoDay pads month and day", () => {
    expect(isoDay(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("findTalk only matches an exact id", () => {
    expect(findTalk("2")).toBe(patterns);
    expect(findTalk(2)).toBeUndefined();
  });

  it("formatDate does not shift the day across time zones", () => {
    expect(formatDate("2025-03-15")).toBe("Mar 15, 2025");
  });
});
