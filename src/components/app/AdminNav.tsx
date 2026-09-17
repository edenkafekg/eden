"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: "/app/admin", label: "Pregled" },
    { href: "/app/admin/shifts", label: "Smene" },
    { href: "/app/admin/staff", label: "Radnice" },
  ];

  return (
    <header className="border-b border-eden-cream-dark bg-eden-headline text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-eden-cream-dark">
            Eden Tracker Admin
          </p>
        </div>
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/app/auth/logout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ scope: "admin" }),
            });
            window.location.href = "/app/admin/login";
          }}
          className="text-sm font-semibold text-eden-cream-dark"
        >
          Odjava
        </button>
      </div>
      <nav className="mx-auto flex max-w-5xl gap-2 px-4 pb-4 sm:px-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              pathname === link.href ? "bg-eden-accent text-white" : "bg-white/10 text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
