"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/app/AdminNav";
import { AppCard } from "@/components/app/AppShell";
import type { Staff } from "@/lib/supabase/types";

export function AdminStaffManager() {
  const router = useRouter();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStaff() {
    const res = await fetch("/api/app/admin/staff");
    if (res.status === 401) {
      router.replace("/app/admin/login");
      return;
    }
    const data = await res.json();
    setStaff(data.staff ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadStaff();
  }, [router]);

  async function addStaff() {
    const res = await fetch("/api/app/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Greška");
      return;
    }
    setNewName("");
    loadStaff();
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch("/api/app/admin/staff", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active: !active }),
    });
    loadStaff();
  }

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold text-eden-headline">Radnice</h1>
        <AppCard className="mt-6">
          <label className="block text-sm font-semibold text-eden-headline">Novo ime</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3"
              placeholder="Ime radnice"
            />
            <button
              type="button"
              onClick={addStaff}
              className="rounded-full bg-eden-accent px-6 py-3 font-semibold text-white"
            >
              Dodaj
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-eden-accent">{error}</p>}
        </AppCard>

        {loading ? (
          <p className="mt-8 text-eden-paragraph">Učitavanje...</p>
        ) : (
          <div className="mt-8 space-y-3">
            {staff.map((member) => (
              <AppCard key={member.id} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-eden-headline">{member.name}</p>
                  <p className="text-sm text-eden-paragraph">
                    {member.active ? "Aktivna" : "Neaktivna"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleActive(member.id, member.active)}
                  className="rounded-full border border-eden-headline px-4 py-2 text-sm font-semibold text-eden-headline"
                >
                  {member.active ? "Deaktiviraj" : "Aktiviraj"}
                </button>
              </AppCard>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
