"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GoogleReview } from "@/lib/google-reviews-data";

type GoogleReviewsCarouselProps = {
  reviews: GoogleReview[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena ${rating} od 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-eden-cream-dark"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function GoogleReviewsCarousel({ reviews }: GoogleReviewsCarouselProps) {
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
    track.scrollBy({ left: direction === "left" ? -340 : 340, behavior: "smooth" });
    window.setTimeout(updateScrollState, 350);
  };

  useEffect(() => {
    updateScrollState();
  }, [updateScrollState, reviews]);

  return (
    <div className="relative mt-10">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy("left")}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-eden-cream-dark bg-white p-3 shadow-lg transition hover:bg-eden-bg sm:flex"
          aria-label="Prethodna recenzija"
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
          aria-label="Sledeća recenzija"
        >
          <svg className="h-5 w-5 text-eden-headline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <article
            key={`${review.author}-${review.date}`}
            className="flex w-[min(100%,320px)] shrink-0 snap-start flex-col rounded-2xl border border-eden-cream-dark bg-eden-bg p-6 shadow-sm sm:w-[340px]"
          >
            <StarRating rating={review.rating} />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-eden-headline/90">
              &ldquo;{review.text}&rdquo;
            </p>
            <footer className="mt-5 border-t border-eden-cream-dark pt-4">
              <p className="font-semibold capitalize text-eden-headline">{review.author}</p>
              <p className="mt-1 text-xs text-eden-paragraph">{review.date}</p>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
