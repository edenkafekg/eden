import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/app/session-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import type { SessionWithChildren } from "@/lib/supabase/types";
import { getEdenDayBounds } from "@/lib/timezone";

export async function GET(request: Request) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Niste admin" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    const supabase = createSupabaseAdmin();
    let query = supabase
      .from("sessions")
      .select(
        `
        *,
        session_children (id, name, sort_order),
        shifts (
          id,
          started_at,
          staff (id, name)
        )
      `,
      )
      .order("checked_in_at", { ascending: false });

    if (date) {
      const { start, end } = getEdenDayBounds(date);
      query = query.gte("checked_in_at", start).lte("checked_in_at", end);
    }

    const { data, error } = await query.limit(500);
    if (error) throw error;

    const sessions = (data ?? []) as SessionWithChildren[];
    const totalRsd = sessions.reduce((sum, s) => sum + (s.total_rsd ?? 0), 0);
    const subtotalRsd = sessions.reduce(
      (sum, s) => sum + (s.subtotal_rsd ?? s.total_rsd ?? 0),
      0,
    );
    const totalDiscountRsd = sessions.reduce((sum, s) => sum + (s.discount_rsd ?? 0), 0);
    const discountedSessionCount = sessions.filter((s) => (s.discount_rsd ?? 0) > 0).length;

    return NextResponse.json({
      sessions,
      totalRsd,
      subtotalRsd,
      totalDiscountRsd,
      discountedSessionCount,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
