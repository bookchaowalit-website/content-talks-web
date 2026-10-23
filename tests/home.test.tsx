import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders both authored talks and the static-demo notice", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Talks worth");
    expect(html).toContain("Web Development Trends");
    expect(html).toContain("React Patterns");
    expect(html).toContain("No recording, booking, or backend attached.");
  });

  it("does not label a talk dated in the past as UPCOMING", () => {
    // Web Development Trends is dated 2025-03-15; it must never render as upcoming after that day.
    const html = renderToString(<Home />);
    expect(html).not.toContain("UPCOMING");
  });
});
