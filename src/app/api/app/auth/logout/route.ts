import { NextResponse } from "next/server";
import { clearAdminSession, clearStaffSession, getStaffSession } from "@/lib/app/session-auth";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { scope } = (await request.json()) as { scope?: "staff" | "admin" | "all" };

  if (scope === "staff" || scope === "all") {
    const session = await getStaffSession();
    if (session?.shiftId && isSupabaseConfigured()) {
      try {
        const supabase = createSupabaseAdmin();
        await supabase
          .from("shifts")
          .update({ ended_at: new Date().toISOString() })
          .eq("id", session.shiftId)
          .is("ended_at", null);
      } catch {
        // Continue logout even if shift close fails
      }
    }
    await clearStaffSession();
  }

  if (scope === "admin" || scope === "all") await clearAdminSession();

  return NextResponse.json({ ok: true });
}
