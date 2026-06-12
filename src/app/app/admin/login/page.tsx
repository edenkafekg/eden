"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppButton, AppCard } from "@/components/app/AppShell";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/app/auth/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Pogrešna lozinka");
      return;
    }
    router.push("/app/admin");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-eden-headline">Admin pristup</h1>
        <p className="mt-2 text-eden-paragraph">Online pregled Eden Tracker podataka</p>
      </div>
      <form onSubmit={handleSubmit}>
        <AppCard>
          <label className="block text-sm font-semibold text-eden-headline">Lozinka</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3"
            autoFocus
          />
        </AppCard>
        {error && <p className="mt-3 text-center text-sm font-semibold text-eden-accent">{error}</p>}
        <div className="mt-6">
          <AppButton type="submit" disabled={loading || !password}>
            {loading ? "Prijava..." : "Uloguj se"}
          </AppButton>
        </div>
      </form>
    </div>
  );
}
