"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppCard } from "@/components/app/AppShell";
import { formatEdenTime } from "@/lib/timezone";
import type { SessionWithChildren } from "@/lib/supabase/types";

export function ShiftHistory() {
  const router = useRouter();
  const [sessions, setSessions] = useState<SessionWithChildren[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/app/sessions/history");
      if (res.status === 401) {
        router.replace("/app/login");
        return;
      }
      const data = await res.json();
      setSessions(data.sessions ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) return <p className="text-center text-eden-paragraph">Učitavanje...</p>;

  const total = sessions.reduce((sum, s) => sum + (s.total_rsd ?? 0), 0);

  return (
    <div className="space-y-4">
      <AppCard>
        <p className="text-sm text-eden-paragraph">Ukupno naplaćeno u smeni</p>
        <p className="text-3xl font-bold text-eden-headline">{total.toLocaleString("sr-RS")} RSD</p>
      </AppCard>

      {sessions.length === 0 ? (
        <AppCard>
          <p className="text-center text-eden-paragraph">Još nema zatvorenih sesija danas.</p>
        </AppCard>
      ) : (
        sessions.map((session) => {
          const names = session.session_children.map((c) => c.name).join(", ");
          const label =
            session.type === "igra" ? `Sto ${session.table_number}` : "Čuvaonica";
          return (
            <AppCard key={session.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-eden-headline">{label}</p>
                  <p className="mt-1 text-sm">{names}</p>
                  <p className="mt-2 text-xs text-eden-paragraph">
                    {formatEdenTime(session.checked_in_at)}
                    {session.checked_out_at && ` – ${formatEdenTime(session.checked_out_at)}`}
                  </p>
                </div>
                <p className="text-lg font-bold text-eden-accent">
                  {(session.total_rsd ?? 0).toLocaleString("sr-RS")} RSD
                </p>
              </div>
            </AppCard>
          );
        })
      )}
    </div>
  );
}
