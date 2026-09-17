"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/app/AdminNav";
import { AppCard } from "@/components/app/AppShell";
import { formatShiftDuration } from "@/lib/shifts";
import type { StaffShiftSummary } from "@/lib/shifts-report";
import {
  formatEdenDateTime,
  formatEdenMonthLabel,
  getEdenCurrentMonthIso,
  getEdenTodayIso,
} from "@/lib/timezone";

type ViewMode = "day" | "month";

type ShiftRow = {
  id: string;
  started_at: string;
  ended_at: string | null;
  durationMinutes: number;
  sessionCount: number;
  sessionTotalRsd: number;
  discountTotalRsd: number;
  staff: { id: string; name: string } | null;
};

export function AdminShiftsDashboard() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [date, setDate] = useState(getEdenTodayIso());
  const [month, setMonth] = useState(getEdenCurrentMonthIso());
  const [summary, setSummary] = useState<StaffShiftSummary[]>([]);
  const [shifts, setShifts] = useState<ShiftRow[]>([]);
  const [totals, setTotals] = useState({
    totalMinutes: 0,
    totalRsd: 0,
    discountRsd: 0,
    shiftCount: 0,
    sessionCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const url =
        viewMode === "month"
          ? `/api/app/admin/shifts?month=${month}`
          : `/api/app/admin/shifts?date=${date}`;

      const res = await fetch(url);
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
      setSummary(data.summary ?? []);
      setShifts(data.shifts ?? []);
      setTotals(
        data.totals ?? {
          totalMinutes: 0,
          totalRsd: 0,
          discountRsd: 0,
          shiftCount: 0,
          sessionCount: 0,
        },
      );
      setError("");
      setLoading(false);
    }
    load();
  }, [viewMode, date, month, router]);

  const periodLabel =
    viewMode === "month" ? formatEdenMonthLabel(month) : new Date(`${date}T12:00:00`).toLocaleDateString("sr-RS");

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-eden-headline">Smene radnica</h1>
            <p className="mt-1 text-eden-paragraph">
              {viewMode === "month" ? "Mesečni izveštaj po radnici" : "Dnevni pregled smena"}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex rounded-full bg-white p-1 shadow-sm ring-1 ring-eden-cream-dark">
              <button
                type="button"
                onClick={() => setViewMode("day")}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  viewMode === "day" ? "bg-eden-headline text-white" : "text-eden-headline"
                }`}
              >
                Dan
              </button>
              <button
                type="button"
                onClick={() => setViewMode("month")}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  viewMode === "month" ? "bg-eden-headline text-white" : "text-eden-headline"
                }`}
              >
                Mesec
              </button>
            </div>
            {viewMode === "month" ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="rounded-xl border border-eden-cream-dark bg-white px-4 py-3"
                />
                <a
                  href={`/api/app/admin/shifts/export?month=${month}`}
                  className="rounded-full bg-eden-accent px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Export CSV
                </a>
              </div>
            ) : (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-eden-cream-dark bg-white px-4 py-3"
              />
            )}
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold text-eden-accent">{periodLabel}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AppCard>
            <p className="text-sm text-eden-paragraph">Ukupno sati rada</p>
            <p className="text-2xl font-bold text-eden-headline">
              {formatShiftDuration(totals.totalMinutes)}
            </p>
          </AppCard>
          <AppCard>
            <p className="text-sm text-eden-paragraph">Broj smena</p>
            <p className="text-2xl font-bold text-eden-headline">{totals.shiftCount}</p>
          </AppCard>
          <AppCard>
            <p className="text-sm text-eden-paragraph">Naplaćeno</p>
            <p className="text-2xl font-bold text-eden-headline">
              {totals.totalRsd.toLocaleString("sr-RS")} RSD
            </p>
          </AppCard>
          <AppCard>
            <p className="text-sm text-eden-paragraph">Dati popusti</p>
            <p className="text-2xl font-bold text-eden-accent">
              {totals.discountRsd.toLocaleString("sr-RS")} RSD
            </p>
          </AppCard>
        </div>

        {error && <p className="mt-4 text-eden-accent">{error}</p>}

        {loading ? (
          <p className="mt-8 text-eden-paragraph">Učitavanje...</p>
        ) : (
          <>
            <div className="mt-8">
              <h2 className="text-xl font-bold text-eden-headline">
                {viewMode === "month" ? "Mesečni izveštaj po radnici" : "Po radnici"}
              </h2>
              <div className="mt-4 space-y-3">
                {summary.length === 0 ? (
                  <AppCard>
                    <p className="text-center text-eden-paragraph">
                      Nema smena za {viewMode === "month" ? "ovaj mesec" : "ovaj dan"}.
                    </p>
                  </AppCard>
                ) : (
                  summary.map((row) => (
                    <AppCard key={row.staffId}>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-lg font-bold text-eden-headline">{row.staffName}</p>
                          <p className="text-sm text-eden-paragraph">
                            {row.shiftCount} smena · {row.sessionCount} naplata
                            {viewMode === "month" && row.shiftCount > 0 && (
                              <> · prosek {formatShiftDuration(row.avgMinutesPerShift)}/smena</>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-eden-headline">
                            {formatShiftDuration(row.totalMinutes)}
                          </p>
                          <p className="text-sm text-eden-paragraph">
                            {row.totalRsd.toLocaleString("sr-RS")} RSD
                            {row.discountRsd > 0 && (
                              <span className="text-eden-accent">
                                {" "}
                                (−{row.discountRsd.toLocaleString("sr-RS")} popust)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </AppCard>
                  ))
                )}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-eden-headline">Detalj smena</h2>
              <div className="mt-4 space-y-3">
                {shifts.length === 0 ? (
                  <AppCard>
                    <p className="text-center text-eden-paragraph">Nema pojedinačnih smena za prikaz.</p>
                  </AppCard>
                ) : (
                  shifts.map((shift) => (
                    <AppCard key={shift.id}>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-bold text-eden-headline">{shift.staff?.name ?? "—"}</p>
                          <p className="mt-1 text-sm text-eden-paragraph">
                            {formatEdenDateTime(shift.started_at)}
                            {shift.ended_at
                              ? ` → ${formatEdenDateTime(shift.ended_at)}`
                              : " → aktivna"}
                          </p>
                          <p className="mt-1 text-xs text-eden-paragraph">
                            {shift.sessionCount} naplata u smeni
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-eden-headline">
                            {formatShiftDuration(shift.durationMinutes)}
                          </p>
                          <p className="text-sm text-eden-paragraph">
                            {shift.sessionTotalRsd.toLocaleString("sr-RS")} RSD
                          </p>
                        </div>
                      </div>
                    </AppCard>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
