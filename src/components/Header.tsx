"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EdenLogo } from "@/components/EdenLogo";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-eden-cream-dark/80 bg-eden-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group shrink-0" onClick={() => setOpen(false)}>
          <EdenLogo
            width={160}
            height={52}
            priority
            className="transition group-hover:scale-105"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Glavna navigacija">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-eden-headline text-eden-bg"
                    : "text-eden-headline hover:bg-eden-cream-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/rodjendani#rezervacija"
            className="rounded-full bg-eden-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-eden-headline"
          >
            Rezerviši rođendan
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-eden-cream-dark text-eden-headline lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          onClick={() => setOpen(!open)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-eden-cream-dark px-4 py-4 lg:hidden"
          aria-label="Mobilna navigacija"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 font-medium ${
                      active ? "bg-eden-headline text-eden-bg" : "text-eden-headline"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/rodjendani#rezervacija"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-eden-accent px-4 py-3 text-center font-semibold text-white"
              >
                Rezerviši rođendan
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
