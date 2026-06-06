import Link from "next/link";
import { EdenLogo } from "@/components/EdenLogo";
import { INSTAGRAM, NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-eden-cream-dark bg-eden-headline text-eden-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <EdenLogo width={130} height={42} framed />
          <p className="mt-3 text-sm text-eden-cream-dark">{SITE.tagline}</p>
          <p className="mt-4 text-sm text-eden-cream-dark">{SITE.hours}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Stranice</p>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-eden-cream-dark transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Kontakt</p>
          <address className="mt-3 space-y-2 text-sm not-italic text-eden-cream-dark">
            <p>{SITE.address}</p>
            <p>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {SITE.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </p>
            <p>
              <a
                href={INSTAGRAM.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                @{INSTAGRAM.handle}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-eden-cream-dark">
        © {new Date().getFullYear()} {SITE.name} – {SITE.city}. Sva prava zadržana.
      </div>
    </footer>
  );
}
