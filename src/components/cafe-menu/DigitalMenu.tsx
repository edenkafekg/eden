"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MENU_CATEGORIES, PLAY_AND_CARE_ITEMS } from "@/lib/cafe-menu-data";
import { MenuCategoryCard } from "./MenuCategoryCard";
import { MenuCategoryNavigation } from "./MenuCategoryNavigation";

export function DigitalMenu() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div id="digitalni-meni" className="scroll-mt-24">
      <MenuCategoryNavigation />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div
          className={
            isMobile
              ? "flex flex-col gap-3"
              : "grid grid-cols-1 gap-5 md:grid-cols-2"
          }
        >
          {MENU_CATEGORIES.map((category) => (
            <MenuCategoryCard
              key={category.id}
              category={category}
              defaultOpen={category.defaultOpen ?? false}
              forceAccordion={isMobile}
            />
          ))}
        </div>

        <PlayAndCareBlock />
      </div>
    </div>
  );
}

function PlayAndCareBlock() {
  return (
    <section
      id="igra-cuvanje"
      className="scroll-mt-36 mt-12 rounded-3xl border-2 border-eden-headline/15 bg-eden-headline p-6 text-eden-bg sm:p-8"
    >
      <h2 className="text-2xl font-bold">Igra i čuvanje dece</h2>
      <p className="mt-2 text-sm text-eden-cream-dark">
        Odvojena ponuda — nije deo pića, već usluga za decu dok ste u EDENU.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PLAY_AND_CARE_ITEMS.map((item) => (
          <div
            key={item.name}
            className="flex items-start justify-between gap-4 rounded-xl bg-white/10 px-4 py-3"
          >
            <p className="text-sm font-medium leading-snug text-white">{item.name}</p>
            <p className="shrink-0 text-sm font-bold tabular-nums text-eden-cream-dark">
              {item.price}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 text-sm leading-relaxed text-eden-cream-dark">
        <p>
          <strong className="text-white">„Igranje“</strong> važi kada roditelj boravi u objektu, u
          kafiću ili igraonici.
        </p>
        <p>
          <strong className="text-white">„Čuvanje“</strong> je usluga čuvanja deteta: dete ostaje u
          sigurnim rukama našeg osoblja dok roditelj obavlja svoje obaveze.
        </p>
      </div>

      <Link
        href="/cuvaonica"
        className="mt-6 inline-flex items-center gap-2 font-semibold text-white underline-offset-4 hover:underline"
      >
        Saznajte više o čuvaonici
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  );
}
