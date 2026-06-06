"use client";

import { useCallback, useEffect, useState } from "react";
import { MENU_NAV_ITEMS } from "@/lib/cafe-menu-data";

export function MenuCategoryNavigation() {
  const [activeId, setActiveId] = useState(MENU_NAV_ITEMS[0]?.id ?? "");

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }, []);

  useEffect(() => {
    const ids = MENU_NAV_ITEMS.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navigacija kroz meni"
      className="sticky top-[72px] z-30 -mx-4 border-b border-eden-cream-dark bg-eden-bg/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:top-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MENU_NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                activeId === item.id
                  ? "bg-eden-headline text-white shadow-sm"
                  : "bg-white text-eden-headline ring-1 ring-eden-cream-dark hover:ring-eden-accent/40"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
