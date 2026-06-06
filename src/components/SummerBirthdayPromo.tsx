import Link from "next/link";

type SummerBirthdayPromoProps = {
  variant?: "banner" | "card";
};

export function SummerBirthdayPromo({ variant = "banner" }: SummerBirthdayPromoProps) {
  if (variant === "card") {
    return (
      <article className="relative overflow-hidden rounded-3xl border-2 border-eden-accent/30 bg-gradient-to-br from-eden-headline to-eden-green-light p-8 text-white shadow-xl sm:p-10">
        <div className="absolute -right-6 -top-6 text-7xl opacity-20" aria-hidden>
          ☀️
        </div>
        <p className="inline-flex rounded-full bg-eden-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Letnja ponuda
        </p>
        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
          Najbolja ponuda za rođendane tokom leta
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-eden-cream-dark">
          Popunite formular i dobijte ponudu skrojenu po vašoj meri — broj dece i odraslih, hrana,
          piće, dekoracija i dodatne usluge. Javljamo vam se sa predlogom u najkraćem roku.
        </p>
        <Link
          href="/rodjendani#rezervacija"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-eden-headline transition hover:bg-eden-bg"
        >
          Popuni formular za ponudu
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </article>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-eden-accent/25 bg-gradient-to-r from-eden-headline/10 via-eden-bg to-eden-accent/10 p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-eden-accent">
            ☀️ Letnja ponuda
          </p>
          <h3 className="mt-2 text-xl font-bold text-eden-headline sm:text-2xl">
            Najbolja ponuda za rođendane tokom leta
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
            Popunite formular i dobijte ponudu po vašoj meri — prilagođavamo broj gostiju, hranu,
            piće i dodatne usluge.
          </p>
        </div>
        <Link
          href="/rodjendani#rezervacija"
          className="shrink-0 rounded-full bg-eden-accent px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-eden-headline"
        >
          Zatraži ponudu
        </Link>
      </div>
    </div>
  );
}
