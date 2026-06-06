"use client";

import { SUMMER_FAVORITES } from "@/lib/cafe-menu-data";
import { FeaturedDrinkCard } from "./FeaturedDrinkCard";

export function SummerFavoritesSection() {
  const primary = SUMMER_FAVORITES.filter((d) => !d.secondary);
  const secondary = SUMMER_FAVORITES.filter((d) => d.secondary);

  return (
    <section
      id="letnji-favoriti"
      className="scroll-mt-36 relative overflow-hidden bg-gradient-to-b from-sky-50 via-eden-bg to-white py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-10 bottom-8 h-32 w-32 rounded-full bg-lime-200/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
            ☀️ Leto u EDENU
          </p>
          <h2 className="mt-2 text-2xl font-bold text-eden-headline sm:text-3xl">
            Letnji favoriti u EDENU
          </h2>
          <p className="mt-3 leading-relaxed text-eden-paragraph">
            Hladno, osvežavajuće i taman za pauzu dok se deca igraju.
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="mt-8 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SUMMER_FAVORITES.map((drink) => (
              <FeaturedDrinkCard key={drink.id} drink={drink} compact />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="mt-8 hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-5">
          {primary.map((drink) => (
            <FeaturedDrinkCard key={drink.id} drink={drink} />
          ))}
        </div>

        {secondary.length > 0 && (
          <div className="mt-8 hidden md:block">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-eden-accent">
              Još preporuka
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {secondary.map((drink) => (
                <FeaturedDrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
