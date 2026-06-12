import { NextResponse } from "next/server";
import { clearAdminSession, clearStaffSession } from "@/lib/app/session-auth";

export async function POST(request: Request) {
  const { scope } = (await request.json()) as { scope?: "staff" | "admin" | "all" };
  if (scope === "admin" || scope === "all") await clearAdminSession();
  if (scope === "staff" || scope === "all") await clearStaffSession();
  return NextResponse.json({ ok: true });
}
