import Image from "next/image";
import Link from "next/link";
import { CAFE_PHOTOS, CAFE_VIDEOS } from "@/lib/cafe-media";

export function CafeMediaGallery() {
  return (
    <section className="border-y border-eden-cream-dark bg-white py-14 sm:py-16" id="atmosfera">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
              Ambijent
            </p>
            <h2 className="mt-2 text-2xl font-bold text-eden-headline sm:text-3xl">
              Prostor za roditelje
            </h2>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">
              Udoban kafić, terasa i atmosfera za opuštanje — dok vaša deca igraju u EDEN igraonici.
            </p>
          </div>
          <Link
            href="#digitalni-meni"
            className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-eden-headline px-6 py-3 text-sm font-semibold text-eden-headline transition hover:bg-eden-headline hover:text-white"
          >
            Pogledajte meni
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {CAFE_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-2xl border border-eden-cream-dark bg-eden-headline shadow-sm"
            >
              <video
                className="aspect-video w-full bg-black object-cover"
                controls
                playsInline
                preload="metadata"
                poster={video.poster}
                aria-label={video.title}
              >
                <source src={video.src} type="video/quicktime" />
                <source src={video.src} type="video/mp4" />
                Vaš pregledač ne podržava reprodukciju videa.
              </video>
              <div className="px-4 py-3">
                <p className="font-semibold text-white">{video.title}</p>
                <p className="mt-1 text-sm text-eden-cream-dark">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-8 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CAFE_PHOTOS.map((photo) => (
              <figure
                key={photo.id}
                className="relative w-[min(100%,240px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-eden-cream-dark bg-eden-bg shadow-sm"
              >
                <div className="relative aspect-[4/5]">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="240px" />
                </div>
                <figcaption className="px-3 py-2.5 text-sm font-medium text-eden-headline">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {CAFE_PHOTOS.map((photo) => (
            <figure
              key={photo.id}
              className="group overflow-hidden rounded-2xl border border-eden-cream-dark bg-eden-bg shadow-sm"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm font-medium text-eden-headline">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
