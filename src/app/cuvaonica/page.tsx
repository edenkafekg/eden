import type { Metadata } from "next";
import Link from "next/link";
import { CuvaonicaHero } from "@/components/cuvaonica/CuvaonicaHero";
import { CuvaonicaStickyCta, PHONE_TEL } from "@/components/cuvaonica/CuvaonicaStickyCta";
import { DaycareGallery } from "@/components/cuvaonica/DaycareGallery";
import { DaycareInquiryForm } from "@/components/cuvaonica/DaycareInquiryForm";
import { FloatingToys } from "@/components/fun/FloatingToys";

export const metadata: Metadata = {
  title: "EDEN Čuvaonica Kragujevac | Fleksibilni boravak za decu",
  description:
    "EDEN čuvaonica na Novom Bubnju u Kragujevcu nudi bezbedan i fleksibilan boravak za decu radnim danima od 10h do 16h. Izaberite boravak na sat, ceo dan ili zatražite posebnu ponudu prilagođenu vašem rasporedu.",
};

const benefits = [
  {
    title: "Zdrava ishrana",
    text: "Doručak, ručak i užina dostupni su u okviru ponude, u zavisnosti od odabranog paketa i dogovora sa roditeljima.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Isplaniran program",
    text: "Zabavne i obrazovne aktivnosti prilagođene su deci različitih uzrasta.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: "Odvojena spavaonica",
    text: "Prostorija za odmor odvojena je od prostora za igru, kako bi dete moglo mirno da odspava kada mu je potreban odmor.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    ),
  },
];

const durationOptions = [
  { main: "1", sub: "sat" },
  { main: "2", sub: "sata" },
  { main: "3", sub: "sata" },
  { main: "4", sub: "sata" },
  { main: "8", sub: "Do sati", highlight: true },
];

const pricing = [
  {
    title: "Boravak na sat",
    price: "650 RSD",
    description: "Najfleksibilnija opcija. Idealna kada vam je potrebno nekoliko sati tokom dana.",
  },
  {
    title: "Ceo dan",
    price: "3.000 RSD",
    description: "Boravak do 8 sati u čuvaonici. Uključena su tri dnevna obroka.",
  },
  {
    title: "Paket od 30 sati",
    price: "15.000 RSD",
    badge: "Najekonomičnija opcija",
    description: "Koristite sate po potrebi, u skladu sa svojim rasporedom.",
    highlight: true,
  },
];

const customExamples = [
  "dva ili tri dana nedeljno po nekoliko sati",
  "samo određenim danima u nedelji",
  "svake druge nedelje",
  "povremeno, u zavisnosti od vaših obaveza",
  "sa uključenim obrocima",
  "bez uključenih obroka",
  "za više dece iz iste porodice",
];

export default function CuvaonicaPage() {
  return (
    <>
      <CuvaonicaHero />

      {/* Zašto EDEN */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-eden-headline sm:text-3xl">
            Zašto izabrati EDEN čuvaonicu za vaše dete?
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-eden-cream-dark bg-white p-6 shadow-sm transition hover:shadow-md"
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

      <DaycareGallery />

      {/* Fleksibilnost */}
      <section className="relative overflow-hidden bg-eden-bg py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-eden-headline sm:text-3xl">
              Čuvaonica koja se prilagođava vašim potrebama
            </h2>
            <p className="mt-4 leading-relaxed">
              Dete možete ostaviti u čuvaonici onoliko dugo koliko vam odgovara. Možete izabrati
              boravak na sat, ceo dan ili paket sati koji koristite po potrebi.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            {durationOptions.map((option) => (
              <div
                key={option.sub + option.main}
                className={`flex min-w-[88px] flex-col items-center rounded-2xl border-2 px-5 py-4 text-center transition ${
                  option.highlight
                    ? "border-eden-headline bg-eden-headline text-white shadow-lg"
                    : "border-eden-cream-dark bg-white text-eden-headline"
                }`}
              >
                <span className="text-2xl font-bold">
                  {option.highlight ? "Do" : option.main}
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-wide opacity-80">
                  {option.highlight ? `${option.main} sati` : option.sub}
                </span>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-xl rounded-2xl border border-eden-accent/20 bg-white px-6 py-4 text-center font-semibold text-eden-headline shadow-sm">
            Dođite, ostavite dete i završite svoje obaveze bez brige.
          </p>
        </div>
      </section>

      {/* Cenovnik */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-eden-headline sm:text-3xl">
            Cenovnik čuvaonice
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricing.map((plan) => (
              <article
                key={plan.title}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  plan.highlight
                    ? "border-eden-headline bg-eden-headline text-eden-bg shadow-xl md:scale-[1.02]"
                    : "border-eden-cream-dark bg-white shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-eden-accent px-3 py-1 text-xs font-bold uppercase text-white">
                    {plan.badge}
                  </span>
                )}
                <h3
                  className={`text-xl font-bold ${plan.highlight ? "text-white" : "text-eden-headline"}`}
                >
                  {plan.title}
                </h3>
                <p
                  className={`mt-2 text-3xl font-bold ${plan.highlight ? "text-eden-cream-dark" : "text-eden-accent"}`}
                >
                  {plan.price}
                </p>
                <p
                  className={`mt-4 flex-1 text-sm leading-relaxed ${plan.highlight ? "text-eden-cream-dark" : ""}`}
                >
                  {plan.description}
                </p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-eden-paragraph">
            Za detalje o obrocima i načinu korišćenja paketa, pošaljite nam upit ili nas pozovite.
          </p>
        </div>
      </section>

      {/* Personalizovane ponude */}
      <section className="relative overflow-hidden bg-gradient-to-br from-eden-headline via-eden-green-light to-eden-headline py-16 text-white sm:py-20">
        <FloatingToys variant="section" />
        <div
          className="pointer-events-none absolute -right-10 top-10 h-40 w-40 rounded-full bg-eden-accent/30 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-eden-cream-dark">
              Fleksibilno za svaku porodicu
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Potrebna vam je drugačija organizacija? Napravićemo ponudu po vašoj meri.
            </h2>
            <p className="mt-4 leading-relaxed text-eden-cream-dark">
              Svaka porodica ima drugačiji raspored. Zbog toga nudimo mogućnost da napravimo posebnu
              ponudu u skladu sa vašim potrebama.
            </p>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-medium text-white/90">
            Na primer, možete nam pisati ako vam je čuvaonica potrebna:
          </p>

          <ul className="mx-auto mt-6 grid max-w-3xl gap-2 sm:grid-cols-2">
            {customExamples.map((example) => (
              <li
                key={example}
                className="flex items-start gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur-sm"
              >
                <span className="text-eden-cream-dark">✓</span>
                {example}
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-eden-cream-dark">
            Pošaljite nam svoj okvirni raspored i napišite koliko često biste koristili čuvaonicu.
            Javićemo vam se sa predlogom paketa i personalizovanom ponudom.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="#upit"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-eden-headline transition hover:bg-eden-bg"
            >
              Zatražite posebnu ponudu
            </Link>
          </div>
        </div>
      </section>

      {/* Kontakt forma */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20" id="upit">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">Kontakt</p>
            <h2 className="mt-2 text-3xl font-bold text-eden-headline">Pošaljite nam upit</h2>
            <p className="mt-3 leading-relaxed">
              Napišite nam kakva organizacija vam je potrebna i napravićemo ponudu prilagođenu vašoj
              porodici.
            </p>
          </div>
          <div className="mt-10">
            <DaycareInquiryForm />
          </div>
        </div>
      </section>

      {/* Završna CTA */}
      <section className="relative overflow-hidden bg-eden-bg py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-eden-headline sm:text-3xl">
            Posvećenost, radost, igra i obrazovanje
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed">
            Čuvaonica je naša prilika da pružimo najbolje vašoj deci. Slobodan obilazak prostora je
            uvek dobrodošao.
          </p>

          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <div className="rounded-xl border border-eden-cream-dark bg-white px-6 py-4 text-left sm:text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-eden-accent">
                Telefon
              </p>
              <a
                href={PHONE_TEL}
                className="mt-1 block text-lg font-bold text-eden-headline hover:text-eden-accent"
              >
                +381 61 1721 394
              </a>
            </div>
            <div className="rounded-xl border border-eden-cream-dark bg-white px-6 py-4 text-left sm:text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-eden-accent">
                Lokacija
              </p>
              <p className="mt-1 text-lg font-bold text-eden-headline">Novi Bubanj, Kragujevac</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center rounded-full bg-eden-accent px-8 py-3.5 font-semibold text-white transition hover:bg-eden-headline"
            >
              Pozovite nas
            </a>
            <Link
              href="#upit"
              className="inline-flex items-center justify-center rounded-full border-2 border-eden-headline px-8 py-3.5 font-semibold text-eden-headline transition hover:bg-eden-headline hover:text-white"
            >
              Pošaljite upit
            </Link>
          </div>
        </div>
      </section>

      <CuvaonicaStickyCta />

      {/* Prostor za sticky bar na mobilnom */}
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
