"use client";

import { useEffect, useState } from "react";
import { formatShiftDuration, getShiftDurationMinutes } from "@/lib/shifts";

export function ShiftTimer() {
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/app/shifts/start");
      if (!res.ok) return;
      const data = await res.json();
      if (data.shift?.started_at) {
        setStartedAt(data.shift.started_at);
        setMinutes(getShiftDurationMinutes(data.shift.started_at, data.shift.ended_at));
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!startedAt) return;
    const id = setInterval(() => {
      setMinutes(getShiftDurationMinutes(startedAt, null));
    }, 30000);
    return () => clearInterval(id);
  }, [startedAt]);

  if (!startedAt) return null;

  return (
    <p className="text-xs text-eden-cream-dark">
      Smena: {formatShiftDuration(minutes)}
    </p>
  );
}
