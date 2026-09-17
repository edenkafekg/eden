import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/app/session-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import type { BillingLine, Session } from "@/lib/supabase/types";
import { getEdenDayBounds } from "@/lib/timezone";

type ExportSessionRow = Session & {
  session_children: { name: string }[];
  shifts: { staff: { name: string } | null } | null;
};

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
    const date = searchParams.get("date");

    const supabase = createSupabaseAdmin();
    let query = supabase
      .from("sessions")
      .select(
        `
        *,
        session_children (name),
        shifts (staff (name))
      `,
      )
      .eq("status", "closed")
      .order("checked_out_at", { ascending: true });

    if (date) {
      const { start, end } = getEdenDayBounds(date);
      query = query.gte("checked_in_at", start).lte("checked_in_at", end);
    }

    const { data, error } = await query;
    if (error) throw error;

    const header = [
      "Datum ulaska",
      "Datum izlaska",
      "Tip",
      "Sto",
      "Deca",
      "Radnica",
      "Pre popusta RSD",
      "Popust %",
      "Popust RSD",
      "Za naplatu RSD",
      "Stavke",
    ].join(",");

    const rows = ((data ?? []) as ExportSessionRow[]).map((s) => {
      const children = (s.session_children ?? []).map((c) => c.name).join("; ");
      const staffName = s.shifts?.staff?.name ?? "";
      const lines = Array.isArray(s.billing_breakdown)
        ? (s.billing_breakdown as BillingLine[])
            .map((l) => `${l.posLabel} x${l.quantity}`)
            .join("; ")
        : "";

      return [
        s.checked_in_at,
        s.checked_out_at ?? "",
        s.type,
        s.table_number ?? "",
        children,
        staffName,
        s.subtotal_rsd ?? s.total_rsd ?? 0,
        s.discount_percent ?? 0,
        s.discount_rsd ?? 0,
        s.total_rsd ?? 0,
        lines,
      ]
        .map((v) => escapeCsv(String(v)))
        .join(",");
    });

    const csv = [header, ...rows].join("\n");
    const filename = date ? `eden-tracker-${date}.csv` : "eden-tracker-export.csv";

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
