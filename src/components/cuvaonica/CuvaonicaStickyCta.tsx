"use client";

import Link from "next/link";

const PHONE_TEL = "tel:+381611721394";

export function CuvaonicaStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-eden-cream-dark bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm md:hidden">
      <div className="mx-auto flex max-w-lg gap-3">
        <Link
          href="#upit"
          className="flex flex-1 items-center justify-center rounded-full bg-eden-accent py-3.5 text-sm font-semibold text-white transition active:scale-[0.98]"
        >
          Pošaljite upit
        </Link>
        <a
          href={PHONE_TEL}
          className="flex flex-1 items-center justify-center rounded-full border-2 border-eden-headline py-3.5 text-sm font-semibold text-eden-headline transition active:scale-[0.98]"
        >
          Pozovite nas
        </a>
      </div>
    </div>
  );
}

export { PHONE_TEL };
