import type { Metadata } from "next";
import { McpDocs } from "@/components/mcp-docs";
import { SITE, TalksFrame } from "@/components/talks-view";
import { TOOLS } from "@/lib/mcp-tools";

export const metadata: Metadata = { title: "MCP API — Talks", description: "How to call the Talks read-only MCP endpoint.", alternates: { canonical: "/mcp" } };

export default function McpPage() {
  return <TalksFrame><McpDocs name="Talks" site={SITE} tools={TOOLS} /></TalksFrame>;
}
