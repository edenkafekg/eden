import type { Metadata } from "next";
import Link from "next/link";
import { BirthdayBookingForm } from "@/components/BirthdayBookingForm";
import { BirthdayPackages } from "@/components/BirthdayPackages";
import { BirthdayGallery } from "@/components/rodjendani/BirthdayGallery";
import { BirthdayHero } from "@/components/rodjendani/BirthdayHero";
import { SummerBirthdayPromo } from "@/components/SummerBirthdayPromo";
import { FloatingToys } from "@/components/fun/FloatingToys";

export const metadata: Metadata = {
  title: "Rođendani",
  description: "Organizujte nezaboravan dečiji rođendan u Eden rođendaonici u Kragujevcu.",
};

export default function RodjendaniPage() {
  return (
    <>
      <BirthdayHero />

      <section className="relative overflow-hidden py-10 sm:py-12">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SummerBirthdayPromo variant="card" />
        </div>
      </section>

      <div className="relative overflow-hidden">
        <FloatingToys variant="section" />
        <div className="relative">
          <BirthdayPackages />
        </div>
      </div>

      <section className="relative overflow-hidden bg-white py-16 sm:py-20" id="rezervacija">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
              Letnja ponuda
            </p>
            <h2 className="mt-2 text-3xl font-bold text-eden-headline">
              Rođendan po vašoj meri
            </h2>
            <p className="mt-3">
              Popunite formular ispod sa brojem gostiju, izborom hrane, pića i dodatnih usluga. Javićemo
              vam se sa predlogom ponude u najkraćem roku.
            </p>
          </div>
          <div className="mt-10">
            <BirthdayBookingForm />
          </div>
        </div>
      </section>

      <BirthdayGallery />

      <section className="relative overflow-hidden bg-eden-headline py-12 text-eden-bg sm:py-14">
        <FloatingToys variant="section" />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-xl font-bold sm:text-2xl">Spremni za proslavu?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-eden-cream-dark sm:text-base">
            Popunite formular i javićemo vam se sa terminom i ponudom prilagođenom vašem rođendanu.
          </p>
          <Link
            href="#rezervacija"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-eden-accent px-8 py-3.5 font-semibold text-white transition hover:bg-white hover:text-eden-headline"
          >
            Bukiraj rođendan
          </Link>
        </div>
      </section>
    </>
  );
}
