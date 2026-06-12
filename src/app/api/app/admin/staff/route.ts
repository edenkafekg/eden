import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/app/session-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Niste admin" }, { status: 401 });
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.from("staff").select("*").order("name");
    if (error) throw error;
    return NextResponse.json({ staff: data ?? [] });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Niste admin" }, { status: 401 });
    }

    const { name } = (await request.json()) as { name?: string };
    if (!name?.trim()) {
      return NextResponse.json({ error: "Ime je obavezno" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("staff")
      .insert({ name: name.trim() })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ staff: data });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Niste admin" }, { status: 401 });
    }

    const { id, active, name } = (await request.json()) as {
      id?: string;
      active?: boolean;
      name?: string;
    };

    if (!id) {
      return NextResponse.json({ error: "ID je obavezan" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("staff")
      .update({
        ...(name !== undefined ? { name: name.trim() } : {}),
        ...(active !== undefined ? { active } : {}),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ staff: data });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
