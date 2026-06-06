import { INSTAGRAM } from "@/lib/constants";
import { fetchInstagramPreviews } from "@/lib/instagram";
import { InstagramCarousel } from "@/components/InstagramCarousel";

export async function PlayroomGallery() {
  const posts = await fetchInstagramPreviews(INSTAGRAM.posts);

  return (
    <section className="bg-eden-bg py-16 sm:py-20" id="galerija">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
              Galerija
            </p>
            <h2 className="mt-2 text-3xl font-bold text-eden-headline sm:text-4xl">
              Pogledajte našu igraonicu
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed">
              Deca se igraju, uče i druže u prostoru punom igračaka — a naše devojke su uvek tu da
              ih zabave. Pogledajte trenutke iz EDEN igraonice.
            </p>
          </div>
          <a
            href={INSTAGRAM.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-eden-headline px-5 py-2.5 text-sm font-semibold text-eden-headline transition hover:bg-eden-headline hover:text-white"
          >
            @{INSTAGRAM.handle}
          </a>
        </div>

        <InstagramCarousel posts={posts} />
      </div>
    </section>
  );
}
