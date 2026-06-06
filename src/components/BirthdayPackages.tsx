import Link from "next/link";

const kidsChildIncludes = [
  "Pozivnica",
  "Animatorke",
  "Crtanje po licu",
  "Pića i sokovi",
];

const kidsParentIncludes = [
  "Kafa (domaća, Nescafé, espresso)",
  "Voda, čajevi, sokovi",
];

const familyChildIncludes = kidsChildIncludes;

const familyParentIncludes = [
  "Piće: kafa (domaća, Nescafé, espresso), voda, čajevi, sokovi",
  "Hrana: pizza ili roštilj",
];

export function BirthdayPackages() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-eden-headline sm:text-3xl">Paketi za rođendan</h2>
          <p className="mx-auto mt-3 max-w-2xl">
            Dva gotova paketa za brzu organizaciju — ili formular za ponudu skrojenu po vašoj meri.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-eden-cream-dark bg-eden-bg/80 p-4 sm:p-6">
          <p className="text-center text-sm font-medium text-eden-headline">
            <span className="font-bold text-eden-accent">Eden Kids</span> — roditelji se doplaćuju po
            osobi &nbsp;·&nbsp;{" "}
            <span className="font-bold text-eden-headline">Eden Family</span> — roditelji su uključeni
            u cenu paketa
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:items-stretch">
          <PackageCard
            emoji="🧒"
            name="Eden Kids"
            price="14.500 RSD"
            duration="2 sata"
            extras={[
              "Svako sledeće dete: 400 RSD",
              "Po roditelju: 400 RSD",
            ]}
            childIncludes={kidsChildIncludes}
            parentIncludes={kidsParentIncludes}
            parentMode="paid"
          />

          <PackageCard
            emoji="👨‍👩‍👧‍👦"
            name="Eden Family"
            price="25.500 RSD"
            duration="2 sata"
            highlight
            badge="Roditelji uključeni"
            capacity={{ children: 20, adults: 20 }}
            extras={[
              "Svako sledeće dete: 400 RSD",
              "Svaki sledeći odrasli: 500 RSD",
            ]}
            childIncludes={familyChildIncludes}
            parentIncludes={familyParentIncludes}
            parentMode="included"
          />

          <CustomPackageCard />
        </div>
      </div>
    </section>
  );
}

function PackageCard({
  emoji,
  name,
  price,
  duration,
  highlight,
  badge,
  capacity,
  extras,
  childIncludes,
  parentIncludes,
  parentMode,
}: {
  emoji: string;
  name: string;
  price: string;
  duration: string;
  highlight?: boolean;
  badge?: string;
  capacity?: { children: number; adults: number };
  extras: string[];
  childIncludes: string[];
  parentIncludes: string[];
  parentMode: "paid" | "included";
}) {
  const isIncluded = parentMode === "included";

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-3xl border-2 shadow-sm transition hover:shadow-lg ${
        highlight
          ? "border-eden-headline bg-eden-headline text-white shadow-xl lg:scale-[1.02]"
          : "border-eden-cream-dark bg-white"
      }`}
    >
      {badge && (
        <div className="bg-eden-accent px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-white">
          {badge}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-3xl" aria-hidden>
              {emoji}
            </span>
            <h3
              className={`mt-2 text-xl font-bold ${highlight ? "text-white" : "text-eden-headline"}`}
            >
              {name}
            </h3>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${highlight ? "text-eden-cream-dark" : "text-eden-accent"}`}>
              {price}
            </p>
            <p className={`text-xs ${highlight ? "text-eden-cream-dark/90" : "text-eden-paragraph"}`}>
              Trajanje: {duration}
            </p>
          </div>
        </div>

        {capacity && (
          <div
            className={`mt-5 flex gap-2 rounded-xl p-3 ${
              highlight ? "bg-white/10" : "bg-eden-bg"
            }`}
          >
            <CapacityPill
              icon="👶"
              label={`do ${capacity.children} dece`}
              highlight={highlight}
            />
            <CapacityPill
              icon="☕"
              label={`do ${capacity.adults} odraslih`}
              highlight={highlight}
              included
            />
          </div>
        )}

        <ul className={`mt-4 space-y-1 text-sm ${highlight ? "text-eden-cream-dark" : "text-eden-paragraph"}`}>
          {extras.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className={highlight ? "text-white" : "text-eden-accent"}>+</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-4">
          <IncludesBlock
            title="Uključeno za decu"
            icon="🎈"
            items={childIncludes}
            highlight={highlight}
            tone="child"
          />

          <IncludesBlock
            title="Za roditelje"
            icon="☕"
            items={parentIncludes}
            highlight={highlight}
            tone="parent"
            status={isIncluded ? "included" : "paid"}
            statusLabel={isIncluded ? "Uključeno u cenu" : "400 RSD po roditelju"}
          />
        </div>

        {!isIncluded && (
          <p
            className={`mt-5 rounded-xl border border-dashed px-3 py-2 text-center text-xs font-medium ${
              highlight
                ? "border-white/30 text-eden-cream-dark"
                : "border-eden-accent/40 bg-eden-accent/5 text-eden-accent"
            }`}
          >
            Roditelji nisu u osnovnoj ceni — piće se naplaćuje po osobi
          </p>
        )}

        {isIncluded && (
          <p
            className={`mt-5 rounded-xl px-3 py-2 text-center text-xs font-semibold ${
              highlight ? "bg-eden-accent text-white" : "bg-eden-headline/10 text-eden-headline"
            }`}
          >
            ✓ Piće i hrana za roditelje uključeni u paket
          </p>
        )}
      </div>
    </article>
  );
}

function CapacityPill({
  icon,
  label,
  highlight,
  included,
}: {
  icon: string;
  label: string;
  highlight?: boolean;
  included?: boolean;
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-center rounded-lg px-2 py-2 text-center ${
        highlight ? "bg-white/15" : "bg-white"
      } ${included ? "ring-2 ring-eden-accent/60 ring-offset-1" : ""}`}
    >
      <span className="text-lg" aria-hidden>
        {icon}
      </span>
      <span
        className={`mt-1 text-xs font-semibold ${highlight ? "text-white" : "text-eden-headline"}`}
      >
        {label}
      </span>
      {included && (
        <span className="mt-0.5 text-[10px] font-bold uppercase text-eden-accent">uključeno</span>
      )}
    </div>
  );
}

function IncludesBlock({
  title,
  icon,
  items,
  highlight,
  tone,
  status,
  statusLabel,
}: {
  title: string;
  icon: string;
  items: string[];
  highlight?: boolean;
  tone: "child" | "parent";
  status?: "included" | "paid";
  statusLabel?: string;
}) {
  const bgChild = highlight ? "bg-white/10" : "bg-eden-bg";
  const bgParent =
    status === "included"
      ? highlight
        ? "bg-eden-accent/30 ring-1 ring-white/20"
        : "bg-eden-headline/5 ring-2 ring-eden-headline/20"
      : highlight
        ? "bg-white/5 ring-1 ring-dashed ring-white/25"
        : "bg-eden-accent/5 ring-2 ring-dashed ring-eden-accent/30";

  return (
    <div className={`rounded-xl p-4 ${tone === "child" ? bgChild : bgParent}`}>
      <div className="flex items-center justify-between gap-2">
        <h4
          className={`flex items-center gap-2 text-sm font-bold ${
            highlight ? "text-white" : "text-eden-headline"
          }`}
        >
          <span aria-hidden>{icon}</span>
          {title}
        </h4>
        {statusLabel && (
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
              status === "included"
                ? "bg-eden-accent text-white"
                : highlight
                  ? "bg-white/20 text-eden-cream-dark"
                  : "bg-eden-accent/15 text-eden-accent"
            }`}
          >
            {statusLabel}
          </span>
        )}
      </div>
      <ul className={`mt-3 space-y-1.5 text-sm ${highlight ? "text-eden-cream-dark" : "text-eden-paragraph"}`}>
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className={highlight ? "text-white" : "text-eden-accent"}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CustomPackageCard() {
  return (
    <Link
      href="#rezervacija"
      className="group flex flex-col rounded-3xl border-2 border-dashed border-eden-accent/50 bg-gradient-to-br from-eden-bg to-white p-6 shadow-sm transition hover:border-eden-accent hover:shadow-lg sm:p-7"
    >
      <span className="text-3xl" aria-hidden>
        ✨
      </span>
      <h3 className="mt-2 text-xl font-bold text-eden-headline group-hover:text-eden-accent">
        Rođendan po vašoj meri
      </h3>
      <p className="mt-2 text-2xl font-bold text-eden-accent">Individualna ponuda</p>
      <p className="mt-1 text-xs text-eden-paragraph">Letnja ponuda · prilagođeno vama</p>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-eden-paragraph">
        Vi birate broj dece i odraslih, hranu, piće, dekoraciju i dodatne usluge. Popunite formular i
        dobijate ponudu skrojenu tačno po vašim željama.
      </p>

      <ul className="mt-5 space-y-2 text-sm text-eden-headline">
        {[
          "Fleksibilan broj gostiju",
          "Izbor hrane i pića",
          "Dekoracija, maskota, foto & video",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-eden-accent">✓</span>
            {item}
          </li>
        ))}
      </ul>

      <span className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-eden-accent py-3.5 text-sm font-semibold text-white transition group-hover:bg-eden-headline">
        Popuni formular za ponudu
        <svg
          className="h-4 w-4 transition group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
