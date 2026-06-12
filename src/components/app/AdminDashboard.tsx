"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/app/AdminNav";
import { AppCard } from "@/components/app/AppShell";
import type { SessionWithChildren } from "@/lib/supabase/types";
import { formatEdenDateTime, getEdenTodayIso } from "@/lib/timezone";

function todayIso() {
  return getEdenTodayIso();
}

export function AdminDashboard() {
  const router = useRouter();
  const [date, setDate] = useState(todayIso());
  const [sessions, setSessions] = useState<SessionWithChildren[]>([]);
  const [totalRsd, setTotalRsd] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/app/admin/sessions?date=${date}`);
      if (res.status === 401) {
        router.replace("/app/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Greška");
        setLoading(false);
        return;
      }
      setSessions(data.sessions ?? []);
      setTotalRsd(data.totalRsd ?? 0);
      setLoading(false);
    }
    load();
  }, [date, router]);

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-eden-headline">Pregled sesija</h1>
            <p className="mt-1 text-eden-paragraph">Online pregled naplata</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-xl border border-eden-cream-dark bg-white px-4 py-3"
            />
            <a
              href={`/api/app/admin/export?date=${date}`}
              className="rounded-full bg-eden-accent px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Export CSV
            </a>
          </div>
        </div>

        <AppCard className="mt-6">
          <p className="text-sm text-eden-paragraph">Ukupno za izabrani dan</p>
          <p className="text-3xl font-bold text-eden-headline">
            {totalRsd.toLocaleString("sr-RS")} RSD
          </p>
        </AppCard>

        {error && <p className="mt-4 text-eden-accent">{error}</p>}
        {loading ? (
          <p className="mt-8 text-eden-paragraph">Učitavanje...</p>
        ) : (
          <div className="mt-8 space-y-4">
            {sessions.length === 0 ? (
              <AppCard>
                <p className="text-center text-eden-paragraph">Nema sesija za ovaj datum.</p>
              </AppCard>
            ) : (
              sessions.map((session) => {
                const names = session.session_children?.map((c) => c.name).join(", ") ?? "";
                const staffName =
                  session.shifts &&
                  typeof session.shifts === "object" &&
                  "staff" in session.shifts
                    ? (session.shifts.staff as { name: string } | null)?.name ?? "—"
                    : "—";
                const label =
                  session.type === "igra" ? `Sto ${session.table_number}` : "Čuvaonica";

                return (
                  <AppCard key={session.id}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-bold text-eden-headline">
                          {label} · {names}
                        </p>
                        <p className="mt-1 text-sm text-eden-paragraph">Radnica: {staffName}</p>
                        <p className="mt-1 text-xs text-eden-paragraph">
                          {formatEdenDateTime(session.checked_in_at)}
                          {session.checked_out_at &&
                            ` → ${formatEdenDateTime(session.checked_out_at)}`}
                        </p>
                        {Array.isArray(session.billing_breakdown) && (
                          <ul className="mt-3 space-y-1 text-sm">
                            {session.billing_breakdown.map((line, i) => (
                              <li key={i}>
                                {line.posLabel} × {line.quantity} —{" "}
                                {line.total.toLocaleString("sr-RS")} RSD
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <p className="text-xl font-bold text-eden-accent">
                        {(session.total_rsd ?? 0).toLocaleString("sr-RS")} RSD
                      </p>
                    </div>
                  </AppCard>
                );
              })
            )}
          </div>
        )}
      </main>
    </>
  );
}
