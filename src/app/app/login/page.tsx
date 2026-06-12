"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppButton, AppCard } from "@/components/app/AppShell";

export default function StaffLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/app/auth/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Pogrešan PIN");
      return;
    }
    router.push("/app/shift");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-10">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-eden-accent">Eden Tracker</p>
        <h1 className="mt-2 text-3xl font-bold text-eden-headline">Prijava radnice</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <AppCard>
          <label className="block text-sm font-semibold text-eden-headline">PIN</label>
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="mt-2 w-full rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-4 text-center text-2xl tracking-[0.4em]"
            placeholder="••••"
            autoFocus
          />
        </AppCard>
        {error && <p className="mt-3 text-center text-sm font-semibold text-eden-accent">{error}</p>}
        <div className="mt-6">
          <AppButton type="submit" disabled={loading || !pin}>
            {loading ? "Provera..." : "Nastavi"}
          </AppButton>
        </div>
      </form>
    </div>
  );
}
