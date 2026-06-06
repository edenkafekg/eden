import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { GoogleMaps } from "@/components/GoogleMaps";
import { SummerBirthdayPromo } from "@/components/SummerBirthdayPromo";
import { FloatingToys } from "@/components/fun/FloatingToys";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktirajte Eden igraonicu u Kragujevcu – adresa, telefon, email i radno vreme.",
};

const contactItems = [
  {
    emoji: "📍",
    title: "Adresa",
    content: (
      <>
        <p>{SITE.address}</p>
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex text-sm font-semibold text-eden-accent hover:underline"
        >
          Uputstva na mapi →
        </a>
      </>
    ),
  },
  {
    emoji: "📞",
    title: "Telefon",
    content: (
      <a
        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
        className="block text-lg font-medium text-eden-headline hover:text-eden-accent"
      >
        {SITE.phone}
      </a>
    ),
  },
  {
    emoji: "✉️",
    title: "Email",
    content: (
      <a
        href={`mailto:${SITE.email}`}
        className="block font-medium text-eden-headline hover:text-eden-accent"
      >
        {SITE.email}
      </a>
    ),
  },
  {
    emoji: "🕐",
    title: "Radno vreme",
    content: <p>{SITE.hours}</p>,
  },
];

export default function KontaktPage() {
  return (
    <>
      <PageHero
        title="Kontakt"
        subtitle="Imate pitanje ili želite da zakažete posetu? Javite nam se – rado ćemo vam pomoći."
        animated
      />

      <section className="relative overflow-hidden py-10 sm:py-12">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SummerBirthdayPromo variant="card" />
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <div
                  key={item.title}
                  className="eden-pop-in rounded-2xl border border-eden-cream-dark bg-white p-5 shadow-sm opacity-0 sm:p-6"
                  style={{ animationDelay: `${0.1 + i * 0.12}s` }}
                >
                  <h2 className="flex items-center gap-2 text-lg font-bold text-eden-headline">
                    <span aria-hidden>{item.emoji}</span>
                    {item.title}
                  </h2>
                  <div className="mt-2">{item.content}</div>
                </div>
              ))}
            </div>

            <form
              action={`mailto:${SITE.email}`}
              method="post"
              encType="text/plain"
              className="eden-slide-up eden-stagger-2 rounded-2xl border border-eden-cream-dark bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-xl font-bold text-eden-headline">Pošaljite poruku</h2>
              <p className="mt-2 text-sm text-eden-paragraph">
                Odgovorićemo vam u najkraćem roku. Za rođendane preporučujemo formular na stranici
                rođendana — brže dobijate ponudu.
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="k-ime" className="block text-sm font-semibold text-eden-headline">
                    Ime
                  </label>
                  <input
                    id="k-ime"
                    name="ime"
                    required
                    className="mt-1.5 w-full rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3 text-eden-headline focus:border-eden-accent focus:outline-none focus:ring-2 focus:ring-eden-accent/20"
                  />
                </div>
                <div>
                  <label htmlFor="k-email" className="block text-sm font-semibold text-eden-headline">
                    Email
                  </label>
                  <input
                    id="k-email"
                    name="email"
                    type="email"
                    required
                    className="mt-1.5 w-full rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3 text-eden-headline focus:border-eden-accent focus:outline-none focus:ring-2 focus:ring-eden-accent/20"
                  />
                </div>
                <div>
                  <label htmlFor="k-poruka" className="block text-sm font-semibold text-eden-headline">
                    Poruka
                  </label>
                  <textarea
                    id="k-poruka"
                    name="poruka"
                    rows={4}
                    required
                    className="mt-1.5 w-full resize-y rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3 text-eden-headline focus:border-eden-accent focus:outline-none focus:ring-2 focus:ring-eden-accent/20"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-eden-accent py-3 font-semibold text-white transition hover:bg-eden-headline sm:w-auto sm:px-8"
              >
                Pošalji
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-eden-headline py-12 text-eden-bg sm:py-14">
        <FloatingToys variant="section" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-eden-cream-dark">
              ☀️ Letnja ponuda
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Najbolja ponuda za rođendane tokom leta
            </h2>
            <p className="mt-2 max-w-xl text-eden-cream-dark">
              Popunite formular i dobijte ponudu po vašoj meri — hrana, piće, dekoracija i dodatne
              usluge. Javljamo vam se u najkraćem roku.
            </p>
          </div>
          <Link
            href="/rodjendani#rezervacija"
            className="eden-bounce-slow shrink-0 rounded-full bg-eden-accent px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-white hover:text-eden-headline hover:animate-none"
          >
            Bukiraj rođendan 🎉
          </Link>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <FloatingToys variant="section" />
        <GoogleMaps />
      </div>
    </>
  );
}
