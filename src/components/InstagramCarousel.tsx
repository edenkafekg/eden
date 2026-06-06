"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { InstagramPreview } from "@/lib/instagram";

type InstagramCarouselProps = {
  posts: InstagramPreview[];
};

export function InstagramCarousel({ posts }: InstagramCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
  }, []);

  const scrollBy = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    window.setTimeout(updateScrollState, 350);
  };

  useEffect(() => {
    updateScrollState();
  }, [updateScrollState, posts]);

  return (
    <div className="relative mt-10">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy("left")}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-eden-cream-dark bg-white p-3 shadow-lg transition hover:bg-eden-bg sm:flex"
          aria-label="Prethodna objava"
        >
          <svg className="h-5 w-5 text-eden-headline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollBy("right")}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-eden-cream-dark bg-white p-3 shadow-lg transition hover:bg-eden-bg sm:flex"
          aria-label="Sledeća objava"
        >
          <svg className="h-5 w-5 text-eden-headline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-[260px] shrink-0 snap-center overflow-hidden rounded-2xl border border-eden-cream-dark bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl sm:w-[300px]"
          >
            <div className="relative aspect-square overflow-hidden bg-eden-cream-dark">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.caption ?? "Instagram objava"}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="300px"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-eden-headline to-eden-accent text-white">
                  <svg className="h-12 w-12 opacity-80" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              )}

              {post.isReel && (
                <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
                  Reel
                </span>
              )}

              <span className="absolute inset-0 flex items-center justify-center bg-eden-headline/0 opacity-0 transition group-hover:bg-eden-headline/30 group-hover:opacity-100">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-eden-headline shadow">
                  Otvori na Instagramu
                </span>
              </span>
            </div>

            {post.caption && (
              <p className="line-clamp-2 px-4 py-3 text-sm text-eden-paragraph">{post.caption}</p>
            )}
          </a>
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-eden-paragraph sm:hidden">
        Prevucite prstom ulevo ili udesno →
      </p>
    </div>
  );
}
