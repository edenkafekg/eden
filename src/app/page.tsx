import Link from "next/link";
import Image from "next/image";
import { ServiceCard } from "@/components/ServiceCard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { GoogleReviews } from "@/components/GoogleReviews";
import { GoogleMaps } from "@/components/GoogleMaps";
import { InstagramGallery } from "@/components/InstagramGallery";
import { SummerBirthdayPromo } from "@/components/SummerBirthdayPromo";
import { FloatingToys } from "@/components/fun/FloatingToys";
import { SITE } from "@/lib/constants";

const services = [
  {
    title: "Rođendani",
    description:
      "Nezaboravne proslave sa dekoracijom, animatorima, tortom i paketima hrane i pića po vašem izboru.",
    href: "/rodjendani",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
      </svg>
    ),
  },
  {
    title: "Igraonica",
    description:
      "Prostor pun igračaka i aktivnosti koji podstiču motoriku, maštu i druženje dece različitih uzrasta.",
    href: "/igraonica",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Čuvaonica",
    description:
      "Sigurno čuvanje dece uz stručno osoblje – dnevne i mesečne karte za igru i boravak.",
    href: "/cuvaonica",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Kafić",
    description:
      "Dok se deca igraju, uživajte u kafi, osveženjima i obrocima u prijatnom ambijentu za roditelje.",
    href: "/kafic",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 11h14M5 11a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2M5 11v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14">
        <FloatingToys variant="full" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eden-pop-in eden-stagger-1 inline-flex items-center gap-2 rounded-full border-2 border-eden-accent/30 bg-white px-4 py-2 text-sm font-semibold text-eden-headline shadow-sm">
              <span className="eden-bounce-slow inline-block text-lg">🎈</span>
              {SITE.city} · Igraonica · Čuvaonica · Rođendaonica
            </p>

            <h1 className="eden-slide-up eden-stagger-2 mt-6 text-4xl font-bold leading-tight text-eden-headline sm:text-5xl lg:text-6xl">
              Mesto gde deca{" "}
              <span className="relative inline-block text-eden-accent">
                rastu kroz igru
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#c9a227] opacity-60"
                  viewBox="0 0 200 12"
                  aria-hidden
                >
                  <path
                    d="M5 8 Q50 2, 100 8 T195 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="eden-slide-up eden-stagger-3 mt-6 text-lg leading-relaxed">
              Dobrodošli u {SITE.name} – igraonicu i kafić. Dok se deca bezbrižno igraju uz nadzor
              našeg osoblja, vi uživajte u vrhunskoj kafi, osvežavajućim smutijima ili hladnom
              točenom pivu.
            </p>

            <div className="eden-slide-up eden-stagger-4 mt-8 flex flex-wrap gap-4">
              <Link
                href="/rodjendani#rezervacija"
                className="eden-wiggle rounded-full bg-eden-accent px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-eden-headline hover:animate-none"
              >
                🎉 Rezerviši rođendan
              </Link>
              <Link
                href="/kontakt"
                className="rounded-full border-2 border-eden-headline bg-white px-7 py-3.5 font-semibold text-eden-headline transition hover:bg-eden-headline hover:text-white"
              >
                Kontaktiraj nas
              </Link>
            </div>

            <dl className="eden-slide-up eden-stagger-4 mt-10 flex flex-wrap gap-6">
              {[
                { value: "10–21", label: "Radno vreme", emoji: "🕐" },
                { value: "7/7", label: "Otvoreni svaki dan", emoji: "⭐" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="eden-rainbow-border rounded-2xl border-2 bg-white px-5 py-3 shadow-sm"
                >
                  <dt className="flex items-center gap-2 text-2xl font-bold text-eden-headline">
                    <span className="text-lg">{stat.emoji}</span>
                    {stat.value}
                  </dt>
                  <dd className="text-sm">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="eden-pop-in eden-stagger-3 relative">
            <div className="eden-rainbow-border relative overflow-hidden rounded-[2rem] border-4 bg-white shadow-2xl">
              <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                <Image
                  src="/eden-kafic-igraonica-hero.png"
                  alt="EDEN kafić i igraonica — udoban kafić za roditelje i igraonica za decu"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-eden-headline/80 via-eden-headline/40 to-transparent px-5 pb-5 pt-12">
                  <p className="text-base font-semibold text-white sm:text-lg">
                    Kafić i igraonica — sve na jednom mestu
                  </p>
                  <p className="mt-1 text-sm text-eden-cream-dark">
                    Igraonica · Čuvaonica · Rođendaonica · Kafić
                  </p>
                </div>
              </div>
            </div>

            <div className="eden-float absolute -bottom-5 -left-5 rounded-2xl border-2 border-eden-cream-dark bg-white p-4 shadow-xl sm:-left-8">
              <p className="text-sm font-semibold text-eden-headline">{SITE.hours}</p>
              <p className="text-xs text-eden-paragraph">{SITE.address}</p>
            </div>

            <div
              className="eden-wiggle absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full bg-eden-accent text-2xl shadow-lg sm:-right-5 sm:-top-5 sm:h-16 sm:w-16"
              aria-hidden
            >
              🎂
            </div>
          </div>
        </div>
      </section>

      {/* Ponuda */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
              🎪 Naša ponuda
            </p>
            <h2 className="mt-2 text-3xl font-bold text-eden-headline sm:text-4xl">
              Sve na jednom mestu
            </h2>
            <p className="mx-auto mt-4 max-w-2xl">
              Od igre i čuvanja do proslave rođendana i opuštanja u kafiću – Eden je kompletan
              dečiji centar za celu porodicu.
            </p>
          </div>
          <SummerBirthdayPromo />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <div
                key={s.href}
                className="eden-pop-in opacity-0"
                style={{ animationDelay: `${0.1 + i * 0.15}s` }}
              >
                <ServiceCard {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* CTA rođendan */}
      <section className="relative overflow-hidden bg-eden-headline py-14 text-eden-bg sm:py-16">
        <FloatingToys variant="section" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              ☀️ Letnja ponuda za rođendane
            </h2>
            <p className="mt-2 text-eden-cream-dark">
              Popunite formular i dobijte ponudu po vašoj meri — odgovaramo u najkraćem roku.
            </p>
          </div>
          <Link
            href="/rodjendani#rezervacija"
            className="eden-bounce-slow shrink-0 rounded-full bg-eden-accent px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-white hover:text-eden-headline hover:animate-none"
          >
            Zatraži ponudu 🎉
          </Link>
        </div>
      </section>

      <GoogleReviews />
      <InstagramGallery />
      <GoogleMaps />
    </>
  );
}
