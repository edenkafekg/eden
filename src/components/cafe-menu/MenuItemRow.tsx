import type { MenuItem } from "@/lib/cafe-menu-data";

type MenuItemRowProps = {
  item: MenuItem;
};

export function MenuItemRow({ item }: MenuItemRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-eden-cream-dark/80 py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold leading-snug text-eden-headline">{item.name}</p>
        {item.volume && (
          <p className="mt-0.5 text-sm text-eden-paragraph">{item.volume}</p>
        )}
        {item.altName && (
          <p className="mt-0.5 text-xs text-eden-paragraph/80">{item.altName}</p>
        )}
      </div>
      <p className="shrink-0 text-base font-bold tabular-nums text-eden-accent">{item.price}</p>
    </div>
  );
}
