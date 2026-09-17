"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppButton, AppCard } from "@/components/app/AppShell";
import { applyDiscount } from "@/lib/pricing/discount";
import { formatDuration } from "@/lib/pricing/playroom-pricing";
import type { BillingLine, DaycareBillingMode, SessionWithChildren } from "@/lib/supabase/types";

const DISCOUNT_PRESETS = [0, 10, 20] as const;

type Preview =
  | {
      type: "igra";
      billing: {
        billableHours: number;
        durationMinutes: number;
        lines: BillingLine[];
        totalRsd: number;
      };
    }
  | {
      type: "cuvaonica";
      billing: {
        options: Array<{
          mode: DaycareBillingMode;
          label: string;
          lines: BillingLine[];
          totalRsd: number;
          recommended: boolean;
        }>;
        durationMinutes: number;
      };
      recommended: {
        mode: DaycareBillingMode;
        totalRsd: number;
      };
    };

export function CheckoutView({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [session, setSession] = useState<SessionWithChildren | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [daycareMode, setDaycareMode] = useState<DaycareBillingMode>("hourly");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [customDiscount, setCustomDiscount] = useState("");
  const [completed, setCompleted] = useState<{
    subtotalRsd: number;
    discountPercent: number;
    discountRsd: number;
    totalRsd: number;
    lines: BillingLine[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/app/sessions/${sessionId}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Greška");
        setLoading(false);
        return;
      }
      setSession(data.session);
      setPreview(data.preview);
      if (data.preview?.type === "cuvaonica") {
        setDaycareMode(data.preview.recommended.mode);
      }
      if (data.session.status === "closed") {
        setCompleted({
          subtotalRsd: data.session.subtotal_rsd ?? data.session.total_rsd ?? 0,
          discountPercent: data.session.discount_percent ?? 0,
          discountRsd: data.session.discount_rsd ?? 0,
          totalRsd: data.session.total_rsd ?? 0,
          lines: data.session.billing_breakdown ?? [],
        });
      }
      setLoading(false);
    }
    load();
  }, [sessionId]);

  const subtotalRsd = useMemo(() => {
    if (completed) return completed.subtotalRsd;
    if (!preview) return 0;
    if (preview.type === "igra") return preview.billing.totalRsd;
    return preview.billing.options.find((o) => o.mode === daycareMode)?.totalRsd ?? 0;
  }, [completed, preview, daycareMode]);

  const pricing = useMemo(
    () => applyDiscount(subtotalRsd, discountPercent),
    [subtotalRsd, discountPercent],
  );

  const displayLines = completed
    ? completed.lines
    : preview?.type === "igra"
      ? preview.billing.lines
      : preview?.billing.options.find((o) => o.mode === daycareMode)?.lines ?? [];

  const durationMinutes =
    preview?.type === "igra"
      ? preview.billing.durationMinutes
      : preview?.billing.durationMinutes ?? 0;

  function selectPreset(percent: number) {
    setDiscountPercent(percent);
    setCustomDiscount("");
  }

  function applyCustomDiscount() {
    const value = Number(customDiscount);
    if (Number.isNaN(value) || value < 0 || value > 100) {
      setError("Popust mora biti između 0 i 100%");
      return;
    }
    setError("");
    setDiscountPercent(value);
  }

  async function handleCheckout() {
    setSubmitting(true);
    setError("");
    const res = await fetch(`/api/app/sessions/${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ daycareMode, discountPercent }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error ?? "Greška");
      return;
    }
    setCompleted({
      subtotalRsd: data.subtotalRsd,
      discountPercent: data.discountPercent,
      discountRsd: data.discountRsd,
      totalRsd: data.totalRsd,
      lines: data.billingBreakdown,
    });
  }

  if (loading) return <p className="text-center text-eden-paragraph">Računanje...</p>;
  if (!session) return <p className="text-eden-accent">{error || "Sesija nije pronađena"}</p>;

  const names = session.session_children.map((c) => c.name).join(", ");
  const title = session.type === "igra" ? `Sto ${session.table_number}` : "Čuvaonica";
  const finalPricing = completed ?? pricing;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-eden-headline">Naplata</h1>
        <p className="mt-1 text-eden-paragraph">
          {title} · {names}
        </p>
        {!completed && preview && (
          <p className="mt-2 text-sm font-semibold text-eden-accent">
            Trajanje: {formatDuration(durationMinutes)}
          </p>
        )}
      </div>

      {preview?.type === "cuvaonica" && !completed && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-eden-headline">Način naplate</p>
          {preview.billing.options.map((option) => (
            <button
              key={option.mode}
              type="button"
              onClick={() => setDaycareMode(option.mode)}
              className={`w-full rounded-2xl border-2 p-4 text-left ${
                daycareMode === option.mode
                  ? "border-eden-accent bg-white"
                  : "border-eden-cream-dark bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-eden-headline">{option.label}</span>
                <span className="text-lg font-bold text-eden-headline">
                  {option.totalRsd.toLocaleString("sr-RS")} RSD
                </span>
              </div>
              {option.recommended && (
                <p className="mt-1 text-xs font-semibold text-eden-accent">Preporučeno</p>
              )}
            </button>
          ))}
        </div>
      )}

      {!completed && (
        <AppCard>
          <p className="text-sm font-semibold text-eden-headline">Popust</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {DISCOUNT_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => selectPreset(preset)}
                className={`rounded-xl py-3 text-sm font-semibold ${
                  discountPercent === preset && !customDiscount
                    ? "bg-eden-headline text-white"
                    : "bg-eden-bg text-eden-headline"
                }`}
              >
                {preset === 0 ? "Bez" : `${preset}%`}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              type="number"
              min={0}
              max={100}
              value={customDiscount}
              onChange={(e) => setCustomDiscount(e.target.value)}
              placeholder="Drugi %"
              className="flex-1 rounded-xl border border-eden-cream-dark bg-eden-bg px-4 py-3"
            />
            <button
              type="button"
              onClick={applyCustomDiscount}
              className="rounded-xl bg-eden-accent px-4 py-3 text-sm font-semibold text-white"
            >
              Primeni
            </button>
          </div>
          {pricing.discountRsd > 0 && (
            <p className="mt-2 text-sm text-eden-accent">
              Popust {pricing.discountPercent}% (−{pricing.discountRsd.toLocaleString("sr-RS")} RSD)
            </p>
          )}
        </AppCard>
      )}

      <AppCard>
        <h2 className="font-bold text-eden-headline">Stavke za kasu</h2>
        <ul className="mt-4 space-y-3">
          {displayLines.map((line, i) => (
            <li key={i} className="flex items-center justify-between gap-3 text-sm">
              <span>
                {line.posLabel} × {line.quantity}
              </span>
              <span className="font-semibold">{line.total.toLocaleString("sr-RS")} RSD</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-eden-cream-dark pt-4 text-sm">
          <div className="flex justify-between">
            <span>Pre popusta</span>
            <span>{finalPricing.subtotalRsd.toLocaleString("sr-RS")} RSD</span>
          </div>
          {finalPricing.discountRsd > 0 && (
            <div className="flex justify-between text-eden-accent">
              <span>Popust ({finalPricing.discountPercent}%)</span>
              <span>−{finalPricing.discountRsd.toLocaleString("sr-RS")} RSD</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 text-lg font-bold text-eden-headline">
            <span>Za naplatu</span>
            <span className="text-2xl text-eden-accent">
              {finalPricing.totalRsd.toLocaleString("sr-RS")} RSD
            </span>
          </div>
        </div>
      </AppCard>

      {error && <p className="text-sm font-semibold text-eden-accent">{error}</p>}

      {!completed ? (
        <AppButton onClick={handleCheckout} disabled={submitting}>
          {submitting ? "Snimanje..." : "Potvrdi naplatu i izlazak"}
        </AppButton>
      ) : (
        <>
          <AppCard className="bg-eden-headline text-white">
            <p className="text-center font-semibold">Naplata završena. Unesite stavke u kasu.</p>
          </AppCard>
          <AppButton variant="secondary" onClick={() => router.push("/app/active")}>
            Nazad na aktivne
          </AppButton>
        </>
      )}
    </div>
  );
}
