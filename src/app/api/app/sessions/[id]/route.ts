import { NextResponse } from "next/server";
import {
  calculateDaycareBilling,
  calculatePlayBilling,
  getRecommendedDaycareOption,
} from "@/lib/pricing/playroom-pricing";
import { getStaffSession } from "@/lib/app/session-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import type { DaycareBillingMode } from "@/lib/supabase/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const session = await getStaffSession();
    if (!session) {
      return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 });
    }

    const { id } = await context.params;
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("sessions")
      .select(`*, session_children (id, name, sort_order)`)
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Sesija nije pronađena" }, { status: 404 });
    }

    if (data.status === "closed") {
      return NextResponse.json({ session: data, preview: null });
    }

    const childCount = data.session_children?.length ?? 0;
    const checkIn = new Date(data.checked_in_at);
    const checkOut = new Date();

    if (data.type === "igra") {
      const billing = calculatePlayBilling(childCount, checkIn, checkOut);
      return NextResponse.json({ session: data, preview: { type: "igra", billing } });
    }

    const billing = calculateDaycareBilling(childCount, checkIn, checkOut);
    return NextResponse.json({
      session: data,
      preview: { type: "cuvaonica", billing, recommended: getRecommendedDaycareOption(billing) },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const session = await getStaffSession();
    if (!session) {
      return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = (await request.json()) as { daycareMode?: DaycareBillingMode };
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("sessions")
      .select(`*, session_children (id, name, sort_order)`)
      .eq("id", id)
      .eq("status", "active")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Aktivna sesija nije pronađena" }, { status: 404 });
    }

    const childCount = data.session_children?.length ?? 0;
    const checkIn = new Date(data.checked_in_at);
    const checkOut = new Date();

    let billingBreakdown;
    let totalRsd;
    let daycareBillingMode: DaycareBillingMode | null = null;

    if (data.type === "igra") {
      const billing = calculatePlayBilling(childCount, checkIn, checkOut);
      billingBreakdown = billing.lines;
      totalRsd = billing.totalRsd;
    } else {
      const billing = calculateDaycareBilling(childCount, checkIn, checkOut);
      const mode = body.daycareMode ?? getRecommendedDaycareOption(billing).mode;
      const option = billing.options.find((o) => o.mode === mode);
      if (!option) {
        return NextResponse.json({ error: "Neispravan način naplate" }, { status: 400 });
      }
      billingBreakdown = option.lines;
      totalRsd = option.totalRsd;
      daycareBillingMode = mode;
    }

    const { data: updated, error: updateError } = await supabase
      .from("sessions")
      .update({
        status: "closed",
        checked_out_at: checkOut.toISOString(),
        billing_breakdown: billingBreakdown,
        total_rsd: totalRsd,
        daycare_billing_mode: daycareBillingMode,
      })
      .eq("id", id)
      .select(`*, session_children (id, name, sort_order)`)
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ session: updated, totalRsd, billingBreakdown });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
