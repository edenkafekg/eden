import { SITE } from "@/lib/constants";
import { GOOGLE_REVIEWS } from "@/lib/google-reviews-data";
import { GoogleReviewsCarousel } from "@/components/GoogleReviewsCarousel";

export function GoogleReviews() {
  return (
    <section className="bg-white py-16 sm:py-20" id="recenzije">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
              Google recenzije
            </p>
            <h2 className="mt-2 text-3xl font-bold text-eden-headline sm:text-4xl">
              Šta kažu naši gosti
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-eden-bg px-4 py-2">
                <span className="text-2xl font-bold text-eden-headline">{GOOGLE_REVIEWS.rating}</span>
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(GOOGLE_REVIEWS.rating)
                            ? "text-amber-400"
                            : "text-eden-cream-dark"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-eden-paragraph">{GOOGLE_REVIEWS.count} recenzija na Google-u</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={SITE.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-eden-headline px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-eden-accent"
            >
              Sve recenzije na Google-u
            </a>
            <a
              href={SITE.googleReviewsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-eden-headline px-5 py-2.5 text-sm font-semibold text-eden-headline transition hover:bg-eden-headline hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Ostavi recenziju
            </a>
          </div>
        </div>

        <GoogleReviewsCarousel reviews={[...GOOGLE_REVIEWS.reviews]} />
      </div>
    </section>
  );
}
