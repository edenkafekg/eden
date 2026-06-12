"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppButton, AppCard } from "@/components/app/AppShell";
import { formatDatetimeLocalInEden, parseDatetimeLocalInEden } from "@/lib/timezone";

export function CheckInForm() {
  const router = useRouter();
  const [type, setType] = useState<"igra" | "cuvaonica">("igra");
  const [tableNumber, setTableNumber] = useState("1");
  const [childCount, setChildCount] = useState(1);
  const [names, setNames] = useState<string[]>([""]);
  const [checkedInAt, setCheckedInAt] = useState(() => formatDatetimeLocalInEden());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateChildCount(count: number) {
    const next = Math.max(1, Math.min(10, count));
    setChildCount(next);
    setNames((prev) => {
      const copy = [...prev];
      while (copy.length < next) copy.push("");
      return copy.slice(0, next);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const childNames = names.map((n) => n.trim()).filter(Boolean);
    if (childNames.length !== childCount) {
      setError("Unesite ime za svako dete");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/app/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        tableNumber: type === "igra" ? Number(tableNumber) : undefined,
        childNames,
        checkedInAt: parseDatetimeLocalInEden(checkedInAt).toISOString(),
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Greška");
      return;
    }
    router.push("/app/active");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-semibold text-eden-headline">Tip usluge</p>
        <div className="grid grid-cols-2 gap-3">
          {(["igra", "cuvaonica"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setType(value)}
              className={`rounded-2xl py-4 text-sm font-semibold ${
                type === value
                  ? "bg-eden-headline text-white"
                  : "border border-eden-cream-dark bg-white text-eden-headline"
              }`}
            >
              {value === "igra" ? "Igra" : "Čuvaonica"}
            </button>
          ))}
        </div>
      </div>

      {type === "igra" && (
        <AppCard>
          <label className="block text-sm font-semibold text-eden-headline">Broj stola (0–9)</label>
          <select
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="mt-2 w-full rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i}>
                Sto {i}
              </option>
            ))}
          </select>
        </AppCard>
      )}

      <AppCard>
        <label className="block text-sm font-semibold text-eden-headline">Broj dece</label>
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => updateChildCount(childCount - 1)}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-eden-bg text-xl font-bold"
          >
            −
          </button>
          <span className="min-w-10 text-center text-2xl font-bold">{childCount}</span>
          <button
            type="button"
            onClick={() => updateChildCount(childCount + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-eden-bg text-xl font-bold"
          >
            +
          </button>
        </div>
      </AppCard>

      <div className="space-y-3">
        {names.map((name, index) => (
          <AppCard key={index}>
            <label className="block text-sm font-semibold text-eden-headline">
              Ime deteta {index + 1}
            </label>
            <input
              value={name}
              onChange={(e) =>
                setNames((prev) => prev.map((n, i) => (i === index ? e.target.value : n)))
              }
              className="mt-2 w-full rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3"
              placeholder="Ime"
              required
            />
          </AppCard>
        ))}
      </div>

      <AppCard>
        <label className="block text-sm font-semibold text-eden-headline">Vreme ulaska</label>
        <input
          type="datetime-local"
          value={checkedInAt}
          onChange={(e) => setCheckedInAt(e.target.value)}
          className="mt-2 w-full rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3"
        />
      </AppCard>

      {error && <p className="text-sm font-semibold text-eden-accent">{error}</p>}

      <AppButton type="submit" disabled={loading}>
        {loading ? "Snimanje..." : "Potvrdi ulazak"}
      </AppButton>
    </form>
  );
}
