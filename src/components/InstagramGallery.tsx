import { INSTAGRAM } from "@/lib/constants";
import { fetchInstagramPreviews } from "@/lib/instagram";
import { InstagramCarousel } from "@/components/InstagramCarousel";

export async function InstagramGallery() {
  const posts = await fetchInstagramPreviews(INSTAGRAM.posts);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20" id="instagram">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
              Instagram
            </p>
            <h2 className="mt-2 text-3xl font-bold text-eden-headline sm:text-4xl">
              Pratite nas na Instagramu
            </h2>
            <p className="mt-3 max-w-xl">
              Pogledajte trenutke iz igraonice, kafića i proslava. Kliknite na objavu da je
              otvorite na Instagramu.
            </p>
          </div>
          <a
            href={INSTAGRAM.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-eden-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-eden-headline"
          >
            @{INSTAGRAM.handle}
          </a>
        </div>

        <InstagramCarousel posts={posts} />
      </div>
    </section>
  );
}
