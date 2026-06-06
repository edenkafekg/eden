import type { MenuItem } from "@/lib/cafe-menu-data";

type MenuItemWithDescriptionProps = {
  item: MenuItem;
  variant?: "description" | "combo";
};

export function MenuItemWithDescription({ item, variant = "description" }: MenuItemWithDescriptionProps) {
  return (
    <div className="border-b border-eden-cream-dark/80 py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold leading-snug text-eden-headline">{item.name}</p>
          {item.volume && (
            <p className="mt-0.5 text-sm text-eden-paragraph">{item.volume}</p>
          )}
        </div>
        <p className="shrink-0 text-base font-bold tabular-nums text-eden-accent">{item.price}</p>
      </div>
      {item.description && (
        <p className="mt-2 text-sm leading-relaxed text-eden-paragraph">
          {variant === "combo" ? item.description : item.description}
        </p>
      )}
    </div>
  );
}
