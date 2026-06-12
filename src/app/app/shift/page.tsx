"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppButton, AppCard } from "@/components/app/AppShell";

type StaffMember = { id: string; name: string };

export default function ShiftStartPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const shiftRes = await fetch("/api/app/shifts/start");
      if (shiftRes.ok) {
        router.replace("/app/active");
        return;
      }
      const res = await fetch("/api/app/staff");
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || data.error?.includes("Supabase")) {
          router.replace("/app/login");
          return;
        }
        setError(data.error ?? "Greška");
      } else {
        setStaff(data.staff ?? []);
        if (data.staff?.[0]) setSelectedId(data.staff[0].id);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleStart() {
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/app/shifts/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ staffId: selectedId }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      if (res.status === 401) router.replace("/app/login");
      setError(data.error ?? "Greška");
      return;
    }
    router.push("/app/active");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-eden-paragraph">Učitavanje...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-eden-headline">Početak smene</h1>
        <p className="mt-2 text-eden-paragraph">Izaberite svoje ime</p>
      </div>
      <div className="space-y-3">
        {staff.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => setSelectedId(member.id)}
            className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-lg font-semibold ${
              selectedId === member.id
                ? "border-eden-accent bg-white text-eden-headline"
                : "border-eden-cream-dark bg-white text-eden-headline"
            }`}
          >
            {member.name}
          </button>
        ))}
      </div>
      {error && <p className="mt-4 text-center text-sm font-semibold text-eden-accent">{error}</p>}
      <div className="mt-6">
        <AppButton onClick={handleStart} disabled={submitting || !selectedId}>
          {submitting ? "Otvaranje..." : "Započni smenu"}
        </AppButton>
      </div>
    </div>
  );
}
