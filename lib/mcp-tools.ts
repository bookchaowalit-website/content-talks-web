// The MCP tools /api/mcp serves; the /mcp page documents the same list.

export const TOOLS = [
  { name: "get_all", description: "List every talk in the archive", inputSchema: { type: "object", properties: {} } },
  { name: "get_by_id", description: "Get one talk by id", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  { name: "search", description: "Search talk titles, events and dates", inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } },
];
