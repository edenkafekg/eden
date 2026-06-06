"use client";

import Image from "next/image";
import { useRef } from "react";
import { INSTAGRAM } from "@/lib/constants";
import { PLAYROOM_GALLERY_PHOTOS, PLAYROOM_VIDEO } from "@/lib/playroom-media";

export function PlayroomMediaGallery() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
              ih zabave.
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

        {/* Video */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-eden-cream-dark bg-eden-headline shadow-lg">
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black object-cover"
            controls
            playsInline
            preload="metadata"
            poster={PLAYROOM_VIDEO.poster}
            aria-label={PLAYROOM_VIDEO.title}
          >
            <source src={PLAYROOM_VIDEO.src} type="video/quicktime" />
            <source src={PLAYROOM_VIDEO.src} type="video/mp4" />
            Vaš pregledač ne podržava reprodukciju videa.
          </video>
          <p className="px-5 py-3 text-center text-sm text-eden-cream-dark">
            Video iz EDEN igraonice — igra, aktivnosti i atmosfera u našem prostoru
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="mt-8 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PLAYROOM_GALLERY_PHOTOS.map((photo) => (
              <figure
                key={photo.id}
                className="relative w-[min(100%,280px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-eden-cream-dark bg-white shadow-sm"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm font-medium text-eden-headline">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="mt-8 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {PLAYROOM_GALLERY_PHOTOS.map((photo) => (
            <figure
              key={photo.id}
              className="group overflow-hidden rounded-2xl border border-eden-cream-dark bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
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
