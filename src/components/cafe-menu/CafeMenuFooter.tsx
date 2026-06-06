import Link from "next/link";
import { INSTAGRAM, SITE } from "@/lib/constants";
import { InfoCard } from "./InfoCard";

const PHONE_TEL = "tel:+381611721394";

export function CafeMenuFooter() {
  return (
    <section className="bg-eden-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-eden-headline sm:text-3xl">Vidimo se u EDENU</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed">
          Uživajte u kafi i osveženju dok se vaši klinći bezbrižno igraju.
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          <InfoCard
            label="Instagram"
            value={`@${INSTAGRAM.handle}`}
            href={INSTAGRAM.profileUrl}
          />
          <InfoCard label="Sajt" value="edenkg.rs" href="https://edenkg.rs" />
          <InfoCard label="Wi-Fi lozinka" value="eden2025" />
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-full bg-eden-accent px-8 py-3.5 font-semibold text-white transition hover:bg-eden-headline"
          >
            Pogledajte lokaciju
          </Link>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center justify-center rounded-full border-2 border-eden-headline px-8 py-3.5 font-semibold text-eden-headline transition hover:bg-eden-headline hover:text-white"
          >
            Pozovite nas
          </a>
        </div>

        <p className="mt-8 text-xs text-eden-paragraph">
          PDF meni:{" "}
          <a
            href={SITE.cafeMenuPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-eden-accent underline"
          >
            preuzmite ovde
          </a>
        </p>
      </div>
    </section>
  );
}
