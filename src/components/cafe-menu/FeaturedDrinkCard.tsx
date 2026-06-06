import type { FeaturedDrink } from "@/lib/cafe-menu-data";
import { PriceBadge } from "./PriceBadge";

type FeaturedDrinkCardProps = {
  drink: FeaturedDrink;
  compact?: boolean;
};

export function FeaturedDrinkCard({ drink, compact }: FeaturedDrinkCardProps) {
  return (
    <article
      className={`flex shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-md transition hover:shadow-lg ${
        compact ? "w-[260px]" : "w-full"
      }`}
    >
      <div
        className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${drink.accent}`}
      >
        <span className="text-5xl drop-shadow-sm" aria-hidden>
          {drink.emoji}
        </span>
        <div className="pointer-events-none absolute right-3 top-3">
          <PriceBadge variant="summer">{drink.badge}</PriceBadge>
        </div>
        <div className="pointer-events-none absolute bottom-2 left-3 text-lg opacity-40" aria-hidden>
          🧊
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold leading-snug text-eden-headline">{drink.name}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-eden-paragraph">{drink.description}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <span className="text-sm text-eden-paragraph">{drink.volume}</span>
          <span className="text-lg font-bold tabular-nums text-eden-accent">{drink.price}</span>
        </div>
      </div>
    </article>
  );
}
