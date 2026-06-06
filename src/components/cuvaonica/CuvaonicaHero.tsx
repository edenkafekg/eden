import Image from "next/image";
import Link from "next/link";
import { FloatingToys } from "@/components/fun/FloatingToys";
import { DAYCARE_HERO_PHOTO } from "@/lib/daycare-media";
import { PHONE_TEL } from "@/components/cuvaonica/CuvaonicaStickyCta";

export function CuvaonicaHero() {
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
            EDEN Cafe &amp; Kids Playground
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Čuvaonica u EDENU
          </h1>
          <p className="mt-4 text-xl font-medium text-white">
            Sigurno, veselo i edukativno mesto za vaše dete
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-eden-cream-dark">
            Dok završavate svoje obaveze, radite ili jednostavno želite nekoliko sati za sebe, vaše
            dete može da provede vreme u bezbednom i prijatnom okruženju, uz igru, aktivnosti i
            pažnju našeg osoblja.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
            <svg className="h-5 w-5 text-eden-cream-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Radnim danima od 10h do 16h
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#upit"
              className="inline-flex items-center justify-center rounded-full bg-eden-accent px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white hover:text-eden-headline"
            >
              Pošaljite nam upit
            </Link>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white hover:text-eden-headline"
            >
              Pozovite nas
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl sm:aspect-[3/4]">
            <Image
              src={DAYCARE_HERO_PHOTO.src}
              alt={DAYCARE_HERO_PHOTO.alt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-eden-headline/80 to-transparent p-5">
              <p className="text-sm font-semibold text-white">{DAYCARE_HERO_PHOTO.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
