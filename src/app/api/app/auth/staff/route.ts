import { NextResponse } from "next/server";
import { setPinVerified, verifyStaffPin } from "@/lib/app/session-auth";

export async function POST(request: Request) {
  try {
    const { pin } = (await request.json()) as { pin?: string };
    if (!pin || !verifyStaffPin(pin)) {
      return NextResponse.json({ error: "Pogrešan PIN" }, { status: 401 });
    }
    await setPinVerified();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Greška pri prijavi" }, { status: 500 });
  }
}
