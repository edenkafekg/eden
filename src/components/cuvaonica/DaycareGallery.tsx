import Image from "next/image";
import Link from "next/link";
import { DAYCARE_PHOTOS } from "@/lib/daycare-media";

export function DaycareGallery() {
  return (
    <section className="border-y border-eden-cream-dark bg-eden-bg py-14 sm:py-16" id="galerija">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
              Naš prostor
            </p>
            <h2 className="mt-2 text-2xl font-bold text-eden-headline sm:text-3xl">
              Kako izgleda EDEN čuvaonica
            </h2>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">
              Igra, obroci, aktivnosti i pažnja našeg tima — pogledajte trenutke iz svakodnevnog
              boravka dece u EDENU.
            </p>
          </div>
          <Link
            href="#upit"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-eden-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-eden-headline"
          >
            Pošaljite upit
          </Link>
        </div>

        {/* Mobile carousel */}
        <div className="mt-8 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {DAYCARE_PHOTOS.map((photo) => (
              <figure
                key={photo.id}
                className="relative w-[min(100%,260px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-eden-cream-dark bg-white shadow-sm"
              >
                <div className="relative aspect-[4/5]">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="260px" />
                </div>
                <figcaption className="px-3 py-2.5 text-sm font-medium text-eden-headline">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="mt-8 hidden gap-4 md:grid md:grid-cols-4 md:grid-rows-2">
          <figure className="group relative overflow-hidden rounded-2xl border border-eden-cream-dark bg-white shadow-sm md:col-span-2 md:row-span-2">
            <div className="relative aspect-[4/5] md:h-full md:min-h-[420px] md:aspect-auto">
              <Image
                src={DAYCARE_PHOTOS[0].src}
                alt={DAYCARE_PHOTOS[0].alt}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 50vw, 480px"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-eden-headline/85 to-transparent px-4 py-4 text-sm font-semibold text-white">
              {DAYCARE_PHOTOS[0].caption}
            </figcaption>
          </figure>

          {DAYCARE_PHOTOS.slice(1).map((photo) => (
            <figure
              key={photo.id}
              className="group overflow-hidden rounded-2xl border border-eden-cream-dark bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="25vw"
                />
              </div>
              <figcaption className="px-3 py-2 text-xs font-medium text-eden-headline sm:text-sm">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
