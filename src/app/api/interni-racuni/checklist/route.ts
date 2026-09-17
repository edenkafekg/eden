import { NextResponse } from "next/server";
import {
  getCheckedMap,
  resetCheckedMap,
  upsertCheckedItems,
} from "@/lib/invoice-checklist-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const checked = await getCheckedMap();
    return NextResponse.json({ checked });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška pri učitavanju";
    return NextResponse.json({ error: message, checked: {} }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      itemId?: string;
      checked?: boolean;
      items?: Array<{ itemId: string; checked: boolean }>;
      reset?: boolean;
    };

    if (body.reset) {
      const checked = await resetCheckedMap();
      return NextResponse.json({ ok: true, checked });
    }

    if (body.items?.length) {
      const checked = await upsertCheckedItems(body.items);
      return NextResponse.json({ ok: true, checked });
    }

    if (!body.itemId || typeof body.checked !== "boolean") {
      return NextResponse.json({ error: "itemId i checked su obavezni" }, { status: 400 });
    }

    const checked = await upsertCheckedItems([
      { itemId: body.itemId, checked: body.checked },
    ]);
    return NextResponse.json({ ok: true, checked });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Greška";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
