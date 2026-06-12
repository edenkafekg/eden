"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/app/active", label: "Aktivno" },
  { href: "/app/check-in", label: "Ulazak" },
  { href: "/app/history", label: "Danas" },
];

export function AppNav({ staffName }: { staffName?: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-eden-cream-dark bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-eden-accent">Eden Tracker</p>
          {staffName && <p className="text-sm text-eden-paragraph">{staffName}</p>}
        </div>
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/app/auth/logout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ scope: "staff" }),
            });
            window.location.href = "/app/login";
          }}
          className="text-sm font-semibold text-eden-headline"
        >
          Odjava
        </button>
      </div>
      <nav className="mx-auto flex max-w-lg gap-1 px-4 pb-3">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex-1 rounded-full py-2.5 text-center text-sm font-semibold transition ${
                active
                  ? "bg-eden-headline text-white"
                  : "bg-eden-bg text-eden-headline hover:bg-eden-cream-dark"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export function AppShell({
  staffName,
  children,
}: {
  staffName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-eden-bg">
      <AppNav staffName={staffName} />
      <main className="mx-auto max-w-lg px-4 py-6">{children}</main>
    </div>
  );
}

export function AppButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles = {
    primary: "bg-eden-accent text-white hover:bg-eden-headline",
    secondary: "border-2 border-eden-headline bg-white text-eden-headline hover:bg-eden-bg",
    danger: "bg-eden-headline text-white",
  };

  return (
    <button
      className={`w-full rounded-2xl px-6 py-4 text-base font-semibold transition disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function AppCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-eden-cream-dark bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
