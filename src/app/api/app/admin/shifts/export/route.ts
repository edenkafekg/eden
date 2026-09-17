import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/app/session-auth";
import { buildShiftReport } from "@/lib/shifts-report";
import { formatShiftDuration } from "@/lib/shifts";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getEdenMonthBounds } from "@/lib/timezone";

function escapeCsv(value: string) {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: Request) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Niste admin" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    if (!month) {
      return NextResponse.json({ error: "Mesec je obavezan (YYYY-MM)" }, { status: 400 });
    }

    const { start, end } = getEdenMonthBounds(month);
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("shifts")
      .select(
        `
        *,
        staff (id, name),
        sessions (id, total_rsd, discount_rsd, status)
      `,
      )
      .gte("started_at", start)
      .lte("started_at", end)
      .order("started_at", { ascending: true });

    if (error) throw error;

    const { summary } = buildShiftReport(data ?? []);

    const header = [
      "Mesec",
      "Radnica",
      "Broj smena",
      "Ukupno sati",
      "Prosek po smeni",
      "Broj naplata",
      "Naplaćeno RSD",
      "Popusti RSD",
    ].join(",");

    const rows = summary.map((row) =>
      [
        month,
        row.staffName,
        row.shiftCount,
        formatShiftDuration(row.totalMinutes),
        formatShiftDuration(row.avgMinutesPerShift),
        row.sessionCount,
        row.totalRsd,
        row.discountRsd,
      ]
        .map((v) => escapeCsv(String(v)))
        .join(","),
    );

    const csv = [header, ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="eden-tracker-smene-${month}.csv"`,
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
