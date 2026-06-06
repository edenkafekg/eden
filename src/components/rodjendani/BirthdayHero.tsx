import Image from "next/image";
import Link from "next/link";
import { FloatingToys } from "@/components/fun/FloatingToys";
import { BIRTHDAY_HERO_PHOTO } from "@/lib/birthday-media";

export function BirthdayHero() {
  return (
    <section className="relative overflow-hidden bg-eden-headline text-eden-bg">
      <FloatingToys variant="full" />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-eden-accent/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-eden-green-light/30 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-eden-cream-dark">
            EDEN rođendaonica
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Rođendani
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-eden-cream-dark">
            Nezaboravne proslave sa tematskom dekoracijom, animatorima, tortom i paketima hrane i
            pića – sve na jednom mestu.
          </p>
          <Link
            href="#rezervacija"
            className="mt-8 inline-flex rounded-full bg-eden-accent px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-eden-headline"
          >
            Zatraži letnju ponudu
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl sm:aspect-[3/4]">
            <Image
              src={BIRTHDAY_HERO_PHOTO.src}
              alt={BIRTHDAY_HERO_PHOTO.alt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-eden-headline/80 to-transparent p-5">
              <p className="text-sm font-semibold text-white">{BIRTHDAY_HERO_PHOTO.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
