"use client";

import type { MenuCategory } from "@/lib/cafe-menu-data";
import { MenuItemRow } from "./MenuItemRow";
import { MenuItemWithDescription } from "./MenuItemWithDescription";

type MenuCategoryCardProps = {
  category: MenuCategory;
  defaultOpen?: boolean;
  forceAccordion?: boolean;
};

export function MenuCategoryCard({
  category,
  defaultOpen = false,
  forceAccordion = false,
}: MenuCategoryCardProps) {
  const isAccordion = forceAccordion;

  if (isAccordion) {
    return (
      <details
        id={category.id}
        className="scroll-mt-36 rounded-2xl border border-eden-cream-dark bg-white shadow-sm group"
        open={defaultOpen}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
          <h3 className="text-lg font-bold text-eden-headline">{category.title}</h3>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-eden-bg text-eden-headline transition group-open:rotate-180">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </summary>
        <div className="border-t border-eden-cream-dark px-5 pb-2">
          <CategoryItems category={category} />
        </div>
      </details>
    );
  }

  return (
    <article
      id={category.id}
      className="scroll-mt-36 rounded-2xl border border-eden-cream-dark bg-white p-5 shadow-sm"
    >
      <h3 className="text-lg font-bold text-eden-headline">{category.title}</h3>
      <div className="mt-2">
        <CategoryItems category={category} />
      </div>
    </article>
  );
}

function CategoryItems({ category }: { category: MenuCategory }) {
  return (
    <>
      {category.items.map((item) =>
        category.variant === "description" || category.variant === "combo" ? (
          <MenuItemWithDescription
            key={`${item.name}-${item.price}`}
            item={item}
            variant={category.variant}
          />
        ) : (
          <MenuItemRow key={`${item.name}-${item.volume ?? ""}-${item.price}`} item={item} />
        ),
      )}
      {category.note && (
        <p className="mt-3 border-t border-eden-cream-dark pt-3 text-xs italic text-eden-paragraph">
          {category.note}
        </p>
      )}
    </>
  );
}
