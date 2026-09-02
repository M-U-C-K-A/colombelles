import { NextResponse, type NextRequest } from "next/server";
import { search } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  if (query.trim().length < 2) return NextResponse.json({ results: [] });
  const results = await search(query);
  return NextResponse.json({ results: results.slice(0, 20) });
}
