"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppButton, AppCard } from "@/components/app/AppShell";
import { formatDuration } from "@/lib/pricing/playroom-pricing";
import type { SessionWithChildren } from "@/lib/supabase/types";

function liveDurationMinutes(checkedInAt: string) {
  return Math.max(0, Math.round((Date.now() - new Date(checkedInAt).getTime()) / 60000));
}

function SessionCard({ session }: { session: SessionWithChildren }) {
  const [minutes, setMinutes] = useState(() => liveDurationMinutes(session.checked_in_at));

  useEffect(() => {
    const id = setInterval(() => setMinutes(liveDurationMinutes(session.checked_in_at)), 30000);
    return () => clearInterval(id);
  }, [session.checked_in_at]);

  const names = session.session_children.map((c) => c.name).join(", ");
  const label =
    session.type === "igra"
      ? `Sto ${session.table_number}`
      : `Čuvaonica · ${session.session_children.length} dete(a)`;

  return (
    <a
      href={`/app/sessions/${session.id}`}
      className="block rounded-2xl border-2 border-eden-cream-dark bg-white p-5 shadow-sm transition hover:border-eden-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-eden-headline">{label}</p>
          <p className="mt-1 text-sm text-eden-paragraph">{names}</p>
        </div>
        <div className="rounded-xl bg-eden-bg px-3 py-2 text-right">
          <p className="text-xs font-semibold uppercase text-eden-accent">Trajanje</p>
          <p className="text-lg font-bold text-eden-headline">{formatDuration(minutes)}</p>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-eden-accent">Tapni za naplatu →</p>
    </a>
  );
}

export function ActiveSessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<SessionWithChildren[]>([]);
  const [staffName, setStaffName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const shiftRes = await fetch("/api/app/shifts/start");
      if (shiftRes.status === 401) {
        router.replace("/app/login");
        return;
      }
      const shiftData = await shiftRes.json();
      if (shiftData.session) {
        setStaffName(shiftData.session.staffName);
      }

      const res = await fetch("/api/app/sessions");
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) router.replace("/app/login");
        else setError(data.error ?? "Greška");
        setLoading(false);
        return;
      }
      setStaffName(data.staffName ?? staffName);
      setSessions(data.sessions ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) {
    return <p className="text-center text-eden-paragraph">Učitavanje...</p>;
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-eden-headline">Aktivne sesije</h1>
        {staffName && <p className="mt-1 text-sm text-eden-paragraph">Smena: {staffName}</p>}
      </div>

      {error && <AppCard className="mb-4 text-eden-accent">{error}</AppCard>}

      {sessions.length === 0 ? (
        <AppCard>
          <p className="text-center text-eden-paragraph">Nema aktivnih dece. Dodaj novi ulazak.</p>
          <div className="mt-4">
            <AppButton onClick={() => router.push("/app/check-in")}>Novi ulazak</AppButton>
          </div>
        </AppCard>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </>
  );
}
