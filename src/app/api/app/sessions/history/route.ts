import { NextResponse } from "next/server";
import { getStaffSession } from "@/lib/app/session-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    const session = await getStaffSession();
    if (!session) {
      return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 });
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("sessions")
      .select(`*, session_children (id, name, sort_order)`)
      .eq("shift_id", session.shiftId)
      .eq("status", "closed")
      .order("checked_out_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ sessions: data ?? [] });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
