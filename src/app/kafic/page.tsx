import type { Metadata } from "next";
import { CafeMenuFooter } from "@/components/cafe-menu/CafeMenuFooter";
import { DigitalMenu } from "@/components/cafe-menu/DigitalMenu";
import { SummerFavoritesSection } from "@/components/cafe-menu/SummerFavoritesSection";
import { CafeMediaGallery } from "@/components/kafic/CafeMediaGallery";
import { KaficHero } from "@/components/kafic/KaficHero";
import { FloatingToys } from "@/components/fun/FloatingToys";

export const metadata: Metadata = {
  title: "EDEN kafić i igraonica Kragujevac | Meni",
  description:
    "Pogledajte meni EDEN kafića i igraonice na Novom Bubnju u Kragujevcu. Kafe, osvežavajući letnji napici, točeno pivo, smutiji, kokteli i ponuda za decu.",
};

export default function KaficPage() {
  return (
    <>
      <KaficHero />

      {/* Uvod meni */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">Meni</p>
            <h2 className="mt-2 text-3xl font-bold text-eden-headline sm:text-4xl">
              Napravite pauzu dok se vaša deca igraju
            </h2>
            <p className="mt-4 leading-relaxed">
              Bilo da želite jutarnju kafu, osveženje tokom toplog dana ili piće sa prijateljima, u
              EDENU možete pronaći nešto za svaki trenutak.
            </p>
            <a
              href="#digitalni-meni"
              className="mt-8 inline-flex rounded-full bg-eden-accent px-8 py-3.5 font-semibold text-white transition hover:bg-eden-headline"
            >
              Pogledajte meni
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Domaća kafa i espresso",
              "Letnja osveženja",
              "Smutiji i dečija pića",
              "Točeno pivo i kokteli",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-eden-cream-dark bg-white px-4 py-3 text-center text-sm font-medium text-eden-headline"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CafeMediaGallery />

      <SummerFavoritesSection />

      <section className="relative overflow-hidden bg-white">
        <FloatingToys variant="section" />
        <div className="relative">
          <div className="border-b border-eden-cream-dark bg-eden-bg/50 py-8">
            <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
              <h2 className="text-2xl font-bold text-eden-headline sm:text-3xl">Kompletan meni</h2>
              <p className="mt-2 text-sm text-eden-paragraph">
                Izaberite kategoriju ispod — optimizovano za telefon, bez horizontalnog skrolovanja
                stavki.
              </p>
            </div>
          </div>
          <DigitalMenu />
        </div>
      </section>

      <CafeMenuFooter />
    </>
  );
}
