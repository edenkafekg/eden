import { NextResponse } from "next/server";
import { getStaffSession, isPinVerified, setStaffSession } from "@/lib/app/session-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const existing = await getStaffSession();
    if (existing) {
      return NextResponse.json({
        shiftId: existing.shiftId,
        staffName: existing.staffName,
      });
    }

    const pinOk = await isPinVerified();
    if (!pinOk) {
      return NextResponse.json({ error: "Prvo unesite PIN" }, { status: 401 });
    }

    const body = (await request.json()) as { staffId?: string };
    if (!body.staffId) {
      return NextResponse.json({ error: "Izaberite radnicu" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const { data: staff, error: staffError } = await supabase
      .from("staff")
      .select("id, name")
      .eq("id", body.staffId)
      .eq("active", true)
      .single();

    if (staffError || !staff) {
      return NextResponse.json({ error: "Radnica nije pronađena" }, { status: 404 });
    }

    const { data: shift, error: shiftError } = await supabase
      .from("shifts")
      .insert({ staff_id: staff.id })
      .select("id")
      .single();

    if (shiftError || !shift) throw shiftError;

    await setStaffSession({
      kind: "staff",
      shiftId: shift.id,
      staffId: staff.id,
      staffName: staff.name,
    });

    return NextResponse.json({
      shiftId: shift.id,
      staffName: staff.name,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const session = await getStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { data: shift } = await supabase
    .from("shifts")
    .select("id, started_at, ended_at")
    .eq("id", session.shiftId)
    .single();

  return NextResponse.json({
    session,
    shift: shift ?? null,
  });
}
