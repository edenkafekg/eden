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
      .select(
        `
        *,
        session_children (id, name, sort_order)
      `,
      )
      .eq("shift_id", session.shiftId)
      .eq("status", "active")
      .order("checked_in_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ sessions: data ?? [], staffName: session.staffName });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getStaffSession();
    if (!session) {
      return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 });
    }

    const body = (await request.json()) as {
      type?: "igra" | "cuvaonica";
      tableNumber?: number;
      childNames?: string[];
      checkedInAt?: string;
    };

    if (!body.type || !body.childNames?.length) {
      return NextResponse.json({ error: "Tip i imena dece su obavezni" }, { status: 400 });
    }

    if (body.type === "igra" && (body.tableNumber === undefined || body.tableNumber < 0 || body.tableNumber > 9)) {
      return NextResponse.json({ error: "Sto mora biti 0–9" }, { status: 400 });
    }

    const checkedInAt = body.checkedInAt
      ? new Date(body.checkedInAt)
      : new Date();
    if (Number.isNaN(checkedInAt.getTime())) {
      return NextResponse.json({ error: "Neispravno vreme ulaska" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const { data: newSession, error: sessionError } = await supabase
      .from("sessions")
      .insert({
        shift_id: session.shiftId,
        type: body.type,
        table_number: body.type === "igra" ? body.tableNumber! : null,
        checked_in_at: checkedInAt.toISOString(),
        status: "active",
      })
      .select("id")
      .single();

    if (sessionError || !newSession) throw sessionError;

    const children = body.childNames.map((name, index) => ({
      session_id: newSession.id,
      name: name.trim(),
      sort_order: index,
    }));

    const { error: childrenError } = await supabase.from("session_children").insert(children);
    if (childrenError) throw childrenError;

    return NextResponse.json({ id: newSession.id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
