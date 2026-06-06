import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IgraonicaHero } from "@/components/igraonica/IgraonicaHero";
import { PlayroomMediaGallery } from "@/components/igraonica/PlayroomMediaGallery";
import { FloatingToys } from "@/components/fun/FloatingToys";
import { PLAYROOM_STORY_PHOTOS } from "@/lib/playroom-media";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Igraonica | EDEN Kragujevac",
  description:
    "140 m² klimatizovane igraonice u EDEN-u — bezbedan, čist prostor pun igračaka, uz nadzor osoblja dok roditelji uživaju u kafiću.",
};

const highlights = [
  {
    value: "140 m²",
    label: "Prostor za igru",
    icon: "📐",
  },
  {
    value: "Unutra",
    label: "Sve je pod krovom",
    icon: "🏠",
  },
  {
    value: "Klima",
    label: "Klimatizovano i prijatno",
    icon: "❄️",
  },
];

const features = [
  {
    title: "Naše devojke čuvaju decu",
    text: (
      <>
        Uvek imamo osoblje koje se stara o deci tokom igre, kako biste vi mogli da{" "}
        <Link href="/kafic" className="font-semibold text-eden-accent underline hover:text-eden-headline">
          uživate u kafi u našem kafiću
        </Link>
        , bez brige i bez vukanja za rukav.
      </>
    ),
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: "Bezbedna za vašu decu",
    text: "Super bezbedna za najmlađe — nema nebezbednih labyrinata i rizičnih elemenata. Prostor je osmišljen tako da deca mogu slobodno da istražuju.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Uvek čista",
    text: "Higijena nam je prioritet. Igraonica se redovno održava i čisti, kako bi deca igrala u urednom i zdravom okruženju.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    title: "Puno igračaka i sadržaja",
    text: "Igraonica je napunjena igračkama i aktivnostima za različite uzraste — deca uvek imaju šta da rade, a vi vreme za sebe.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const pricing = [
  {
    title: "Jedno dete",
    emoji: "👶",
    firstHour: "500 RSD",
    nextHour: "400 RSD",
    note: "Prvi sat, zatim svaki naredni sat",
  },
  {
    title: "Dvoje dece",
    emoji: "👶👶",
    firstHour: "800 RSD",
    nextHour: "700 RSD",
    note: "Prvi sat, zatim svaki naredni sat",
    highlight: true,
  },
];

export default function IgraonicaPage() {
  return (
    <>
      <IgraonicaHero />

      {/* Istaknute informacije */}
      <section className="border-b border-eden-cream-dark bg-white py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-2xl border border-eden-cream-dark bg-eden-bg px-5 py-4"
            >
              <span className="text-3xl" aria-hidden>
                {item.icon}
              </span>
              <div>
                <p className="text-2xl font-bold text-eden-headline">{item.value}</p>
                <p className="text-sm text-eden-paragraph">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Priča */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
                Naša ideja
              </p>
              <h2 className="mt-2 text-2xl font-bold text-eden-headline sm:text-3xl">
                Vi odmorite — deca se zabavljaju
              </h2>
              <p className="mt-4 leading-relaxed">
                Znamo kako izgleda kada deca vuku roditelje za rukav i traže pažnju non-stop. Zato
                smo EDEN osmislili drugačije: napunili smo igraonicu igračkama i sadržajem, a uvek
                je tu naše osoblje koje se igra sa decom, vodi aktivnosti i brine o njima.
              </p>
              <p className="mt-4 leading-relaxed">
                Vi možete da sednete u{" "}
                <Link href="/kafic" className="font-semibold text-eden-accent underline hover:text-eden-headline">
                  kafić
                </Link>
                , popijete kafu, porazgovarate ili jednostavno odmorite — dok znate da je vaše dete
                u bezbednim rukama i da se lepo zabavlja.
              </p>
              <Link
                href="/kafic"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-eden-accent px-6 py-3 font-semibold text-white transition hover:bg-eden-headline"
              >
                Pogledajte naš kafić
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {PLAYROOM_STORY_PHOTOS.map((photo) => (
                <figure
                  key={photo.id}
                  className="overflow-hidden rounded-3xl border border-eden-cream-dark bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-sm font-medium text-eden-headline">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cenovnik */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-eden-headline sm:text-3xl">Cenovnik igraonice</h2>
            <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-eden-bg px-4 py-2 text-sm font-semibold text-eden-headline ring-1 ring-eden-cream-dark">
              <svg className="h-5 w-5 text-eden-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Radimo svakog dana od 10h do 21h
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {pricing.map((plan) => (
              <article
                key={plan.title}
                className={`rounded-2xl border p-6 sm:p-8 ${
                  plan.highlight
                    ? "border-eden-headline bg-eden-headline text-eden-bg shadow-xl"
                    : "border-eden-cream-dark bg-eden-bg shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-3xl" aria-hidden>
                      {plan.emoji}
                    </span>
                    <h3
                      className={`mt-3 text-xl font-bold ${plan.highlight ? "text-white" : "text-eden-headline"}`}
                    >
                      {plan.title}
                    </h3>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div
                    className={`rounded-xl p-4 ${plan.highlight ? "bg-white/10" : "bg-white"}`}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-wider ${plan.highlight ? "text-eden-cream-dark" : "text-eden-paragraph"}`}>
                      Prvi sat
                    </p>
                    <p className={`mt-1 text-2xl font-bold ${plan.highlight ? "text-white" : "text-eden-accent"}`}>
                      {plan.firstHour}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-4 ${plan.highlight ? "bg-white/10" : "bg-white"}`}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-wider ${plan.highlight ? "text-eden-cream-dark" : "text-eden-paragraph"}`}>
                      Svaki naredni sat
                    </p>
                    <p className={`mt-1 text-2xl font-bold ${plan.highlight ? "text-white" : "text-eden-accent"}`}>
                      {plan.nextHour}
                    </p>
                  </div>
                </div>
                <p className={`mt-4 text-sm ${plan.highlight ? "text-eden-cream-dark" : "text-eden-paragraph"}`}>
                  {plan.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Prednosti */}
      <section className="relative overflow-hidden bg-eden-bg py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-eden-headline sm:text-3xl">
            Zašto deca i roditelji vole EDEN igraonicu
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {features.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-eden-cream-dark bg-white p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-eden-bg text-eden-accent">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-eden-headline">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PlayroomMediaGallery />

      {/* CTA */}
      <section className="relative overflow-hidden py-14 sm:py-16">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-eden-headline p-8 text-center text-eden-bg sm:flex-row sm:p-10 sm:text-left">
            <div>
              <h2 className="text-2xl font-bold">Dođite na obilazak</h2>
              <p className="mt-2 max-w-xl text-eden-cream-dark">
                Pozovite nas ili zakažite posetu — rado ćemo vam pokazati prostor. Pogledajte i našu{" "}
                <Link href="/cuvaonica" className="font-semibold text-white underline">
                  čuvaonicu
                </Link>{" "}
                za radne dane.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="inline-flex justify-center rounded-full bg-eden-accent px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-eden-headline"
              >
                {SITE.phone}
              </a>
              <Link
                href="/kontakt"
                className="inline-flex justify-center rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-eden-headline"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
