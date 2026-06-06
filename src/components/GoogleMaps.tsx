import { SITE } from "@/lib/constants";

export function GoogleMaps() {
  return (
    <section className="py-16 sm:py-20" id="lokacija">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
              Kako do nas
            </p>
            <h2 className="mt-2 text-3xl font-bold text-eden-headline sm:text-4xl">
              Posetite nas u {SITE.city}
            </h2>
            <p className="mt-4 leading-relaxed">
              Eden se nalazi na adresi u centru grada, sa lakim pristupom i parkingom u blizini.
              Dođite na kratku posetu ili nas pozovite unapred.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-eden-headline/10 text-eden-headline">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-eden-headline">Adresa</p>
                  <p className="text-sm">{SITE.address}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-eden-headline/10 text-eden-headline">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-eden-headline">Radno vreme</p>
                  <p className="text-sm">{SITE.hours}</p>
                </div>
              </li>
            </ul>

            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-eden-accent px-6 py-3 font-semibold text-white transition hover:bg-eden-headline"
            >
              Otvori u Google Maps
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-eden-cream-dark shadow-lg">
            <iframe
              title="Eden lokacija na mapi"
              src={SITE.mapsEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[320px] w-full sm:min-h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
