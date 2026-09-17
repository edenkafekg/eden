import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/app/session-auth";
import { buildShiftReport } from "@/lib/shifts-report";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getEdenDayBounds, getEdenMonthBounds } from "@/lib/timezone";

export async function GET(request: Request) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Niste admin" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const month = searchParams.get("month");

    const supabase = createSupabaseAdmin();
    let query = supabase
      .from("shifts")
      .select(
        `
        *,
        staff (id, name),
        sessions (id, total_rsd, discount_rsd, status)
      `,
      )
      .order("started_at", { ascending: false });

    let period: { type: "day" | "month"; value: string } | null = null;

    if (month) {
      const { start, end } = getEdenMonthBounds(month);
      query = query.gte("started_at", start).lte("started_at", end);
      period = { type: "month", value: month };
    } else if (date) {
      const { start, end } = getEdenDayBounds(date);
      query = query.gte("started_at", start).lte("started_at", end);
      period = { type: "day", value: date };
    }

    const { data, error } = await query.limit(month ? 500 : 200);
    if (error) throw error;

    const report = buildShiftReport(data ?? []);

    return NextResponse.json({ ...report, period });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
