import { NextResponse } from "next/server";
import { setAdminSession, verifyAdminPassword } from "@/lib/app/session-auth";

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };
    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Pogrešna lozinka" }, { status: 401 });
    }
    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Greška pri prijavi" }, { status: 500 });
  }
}
