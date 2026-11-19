// @vitest-environment happy-dom
import { renderToStaticMarkup } from "react-dom/server";
import McpPage from "@/app/mcp/page";
import { describe, expect, it } from "vitest";
import { TalksView } from "@/components/talks-view";
import { TALKS } from "@/lib/talks";
import Home from "@/app/page";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import nextConfig from "../next.config";

const page = (node: React.ReactNode) => {
  const host = document.createElement("div");
  host.innerHTML = renderToStaticMarkup(<>{node}</>);
  return host;
};
const texts = (host: Element, selector: string) => [...host.querySelectorAll(selector)].map((el) => el.textContent);

describe("talks page", () => {
  it("renders both authored talks as past, newest first, with an honest note and a way to ask", () => {
    const host = page(<Home />);
    expect(host.querySelectorAll("h1").length).toBe(1);
    expect(texts(host, "#past ~ * .rs-entry h3, section:last-of-type .rs-entry h3")).toEqual(["Web Development Trends", "React Patterns"]);
    expect(host.querySelector(".rs-entry time")?.getAttribute("dateTime")).toBe("2025-03-15");
    expect(host.textContent).toContain("2 talks");
    expect(host.querySelector(".rs-empty h3")?.textContent).toBe("Nothing scheduled");
    expect(host.querySelector('.rs-head a[href="https://bookchaowalit.com/"]')?.textContent).toBe("Ask about a talk");
    expect(host.querySelector('.rs-foot a[href="https://bookchaowalit.com/"]')?.textContent).toBe("More projects");
    expect(host.textContent).not.toMatch(/UPCOMING|local demo|FREQUENCY/);
  });

  it("lists a talk on or after today as upcoming, soonest first", () => {
    const host = page(<TalksView talks={TALKS} today="2024-11-20" />);
    expect(texts(host, 'ul[aria-labelledby="upcoming"] h3')).toEqual(["React Patterns", "Web Development Trends"]);
    expect(host.querySelector(".rs-empty h3")?.textContent).toBe("No past talks yet");
  });

  it("links the footer to an MCP how-to page with the real tools", () => {
    expect(page(<Home />).querySelector('.rs-foot a[href="/mcp"]')?.textContent).toBe("MCP API");
    const host = page(<McpPage />);
    expect(host.querySelectorAll("h1").length).toBe(1);
    expect([...host.querySelectorAll("tbody code")].map((c) => c.textContent)).toEqual(["get_all", "get_by_id", "search"]);
  });

  it("says /api/mcp is a custom JSON-RPC subset, not a full MCP server", () => {
    const text = page(<McpPage />).textContent ?? "";
    expect(text).not.toMatch(/answers Model Context Protocol/);
    expect(text).toContain("Not a full MCP server");
    expect(text).toContain("result.talks");
    expect(text).toMatch(/standard MCP\s+clients expect/);
  });

  it("uses the site's own domain and sends /more-projects to the main site", async () => {
    expect(sitemap()[0].url).toBe("https://talks.bookchaowalit.com/");
    expect(robots().sitemap).toBe("https://talks.bookchaowalit.com/sitemap.xml");
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});
