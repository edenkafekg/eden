import Link from "next/link";
import { FloatingToys } from "@/components/fun/FloatingToys";

type PageHeroProps = {
  title: string;
  subtitle: string;
  cta?: { href: string; label: string };
  animated?: boolean;
};

export function PageHero({ title, subtitle, cta, animated = false }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-eden-headline px-4 py-16 text-eden-bg sm:px-6 sm:py-20">
      {animated && <FloatingToys variant="full" />}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-eden-accent/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-eden-green-light/40 blur-2xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-eden-cream-dark">{subtitle}</p>
        {cta && (
          <Link
            href={cta.href}
            className="mt-8 inline-flex rounded-full bg-eden-accent px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-eden-headline"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
