import { FEATURES } from "@/lib/constants";

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">
              Zašto Eden
            </p>
            <h2 className="mt-2 text-3xl font-bold text-eden-headline sm:text-4xl">
              Po čemu se izdvajamo?
            </h2>
            <p className="mt-4 leading-relaxed">
              Naša glavna briga je da vaša deca budu bezbedna, srećna i aktivna. Eden je mesto gde
              se igra, uči i slavi – a roditelji mogu da se opuste uz kafu u našem kafiću.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-eden-cream-dark bg-white p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-eden-accent text-xs font-bold text-white">
                  ✓
                </span>
                <span className="text-sm font-medium text-eden-headline">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
