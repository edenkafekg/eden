"use client";

import { useEffect, useMemo, useState } from "react";

type ChecklistItem = {
  id: string;
  label: string;
  amount?: string;
  note?: string;
};

type ChecklistGroup = {
  id: string;
  title: string;
  summary?: string;
  items: ChecklistItem[];
};

const GROUPS: ChecklistGroup[] = [
  {
    id: "omladinska",
    title: "Omladinska zadruga",
    summary: "Nema nijednog računa · ukupno uplata 990.645,90",
    items: [
      {
        id: "omladinska-all",
        label: "Kompletna dokumentacija / svi računi",
        amount: "990.645,90",
        note: "Ukupan iznos uplata",
      },
    ],
  },
  {
    id: "radosava",
    title: "Radosava Mijailović",
    items: [
      {
        id: "radosava-all",
        label: "Računi / dokumentacija",
        amount: "810.000,00",
      },
    ],
  },
  {
    id: "gigatron",
    title: "GIGATRON",
    summary: "Ukupan iznos 75.197,00",
    items: [
      {
        id: "gigatron-all",
        label: "Svi računi",
        amount: "75.197,00",
      },
    ],
  },
  {
    id: "aljosa",
    title: "ALJOŠA ŽIVANOVIĆ PR",
    items: [
      {
        id: "aljosa-0206",
        label: "Račun plaćen 02.06.",
        amount: "43.419,00",
      },
    ],
  },
  {
    id: "anrou",
    title: "ANROU PAN",
    items: [
      {
        id: "anrou-all",
        label: "Nedostajući računi (ukupno)",
        amount: "26.350,00",
      },
    ],
  },
  {
    id: "eps",
    title: "ELEKTROPRIVREDA SRBIJE",
    items: [
      {
        id: "eps-all",
        label: "Plaćeno u ukupnom iznosu",
        amount: "19.214,95",
      },
    ],
  },
  {
    id: "openai",
    title: "OpenAI",
    items: [
      {
        id: "openai-all",
        label: "Računi / fakture",
        note: "Proveriti sve račune",
      },
    ],
  },
  {
    id: "gomex",
    title: "GOMEX",
    summary: "Pojedinačni računi + kompleti za jun i jul",
    items: [
      { id: "gomex-2701", label: "Račun plaćen 27.01.", amount: "112,14" },
      { id: "gomex-0302a", label: "Račun 03.02.", amount: "1.850,06" },
      { id: "gomex-0302b", label: "Račun 03.02.", amount: "851,14" },
      { id: "gomex-1902", label: "Račun 19.02.", amount: "1.149,95" },
      { id: "gomex-0303", label: "Račun 03.03.", amount: "707,54" },
      { id: "gomex-1103", label: "Račun 11.03.", amount: "2.129,91" },
      { id: "gomex-2403", label: "Račun 24.03.", amount: "858,73" },
      { id: "gomex-1504", label: "Račun 15.04.", amount: "1.109,35" },
      { id: "gomex-2904", label: "Račun 29.04.", amount: "892,46" },
      { id: "gomex-1205", label: "Račun 12.05.", amount: "795,28" },
      { id: "gomex-2305", label: "Račun 23.05.", amount: "1.211,07" },
      { id: "gomex-jun", label: "Sve fakture iz juna", note: "Komplet" },
      { id: "gomex-jul", label: "Sve fakture iz jula", note: "Komplet" },
    ],
  },
  {
    id: "index",
    title: "INDEX",
    summary: "Maj, jun, jul — nema računa (jedan iz maja se ne vidi lepo)",
    items: [
      { id: "index-1901", label: "Račun 19.01.", amount: "8.172,00" },
      { id: "index-2101", label: "Račun 21.01.", amount: "4.500,00" },
      { id: "index-2301", label: "Račun 23.01.", amount: "1.746,00" },
      { id: "index-0702a", label: "Račun 07.02.", amount: "3.204,00" },
      { id: "index-0702b", label: "Račun 07.02.", amount: "867,25" },
      { id: "index-1902", label: "Račun 19.02.", amount: "2.925,00" },
      { id: "index-2302", label: "Račun 23.02.", amount: "9.180,00" },
      { id: "index-2802", label: "Račun 28.02.", amount: "1.944,00" },
      { id: "index-0703", label: "Račun 07.03.", amount: "4.167,00" },
      { id: "index-2003", label: "Račun 20.03.", amount: "2.709,00" },
      { id: "index-2903a", label: "Račun 29.03.", amount: "4.050,00" },
      { id: "index-2903b", label: "Račun 29.03.", amount: "3.105,00" },
      { id: "index-3103", label: "Račun 31.03.", amount: "6.237,00" },
      { id: "index-0104", label: "Račun 01.04.", amount: "5.130,00" },
      { id: "index-0804", label: "Račun 08.04.", amount: "7.101,00" },
      { id: "index-1104a", label: "Račun 11.04.", amount: "2.943,00" },
      { id: "index-1104b", label: "Račun 11.04.", amount: "1.269,00" },
      { id: "index-1304", label: "Račun 13.04.", amount: "6.858,00" },
      { id: "index-1504", label: "Račun 15.04.", amount: "2.790,00" },
      { id: "index-1604", label: "Račun 16.04.", amount: "1.593,00" },
      { id: "index-1804", label: "Račun 18.04.", amount: "5.841,00" },
      { id: "index-2004", label: "Račun 20.04.", amount: "8.325,00" },
      { id: "index-2204", label: "Račun 22.04.", amount: "8.298,00" },
      { id: "index-2504", label: "Račun 25.04.", amount: "5.994,00" },
      {
        id: "index-maj",
        label: "Računi za maj",
        note: "Nema ništa; jedan priložen se ne vidi lepo",
      },
      { id: "index-jun", label: "Računi za jun", note: "Nema ništa" },
      { id: "index-jul", label: "Računi za jul", note: "Nema ništa" },
    ],
  },
  {
    id: "sanmarco",
    title: "SAN MARCO",
    summary: "Nedostaju računi iz aprila, maja i juna",
    items: [
      { id: "sanmarco-apr", label: "Računi — april" },
      { id: "sanmarco-maj", label: "Računi — maj" },
      { id: "sanmarco-jun", label: "Računi — jun" },
    ],
  },
  {
    id: "atlantic",
    title: "ATLANTIC",
    summary: "Nedostaju svi računi iz ove godine",
    items: [
      {
        id: "atlantic-year",
        label: "Svi računi za tekuću godinu",
        note: "Komplet",
      },
    ],
  },
  {
    id: "delhaize",
    title: "Delhaize",
    summary: "Maj, jun, jul — nema ništa",
    items: [
      { id: "del-0601", label: "Račun 06.01.", amount: "1.650,87" },
      { id: "del-0801", label: "Račun 08.01.", amount: "486,44" },
      { id: "del-2701", label: "Račun 27.01.", amount: "419,38" },
      { id: "del-1504", label: "Račun 15.04.", amount: "839,93" },
      { id: "del-2204", label: "Račun 22.04.", amount: "958,45" },
      { id: "del-2804", label: "Račun 28.04.", amount: "319,97" },
      { id: "del-2904", label: "Račun 29.04.", amount: "2.829,38" },
      { id: "del-maj", label: "Računi za maj", note: "Nema ništa" },
      { id: "del-jun", label: "Računi za jun", note: "Nema ništa" },
      { id: "del-jul", label: "Računi za jul", note: "Nema ništa" },
    ],
  },
];

const STORAGE_KEY = "eden-racuni-checklist-v1";

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function RacuniChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");

  useEffect(() => {
    setChecked(loadChecked());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked, ready]);

  const allItems = useMemo(() => GROUPS.flatMap((g) => g.items), []);
  const doneCount = allItems.filter((i) => checked[i.id]).length;
  const totalCount = allItems.length;
  const progress = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleGroup(group: ChecklistGroup, value: boolean) {
    setChecked((prev) => {
      const next = { ...prev };
      for (const item of group.items) next[item.id] = value;
      return next;
    });
  }

  function resetAll() {
    if (!confirm("Resetovati sve čekirane stavke?")) return;
    setChecked({});
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1c1917]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8e3232]">
            Interna lista · sakrivena stranica
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Checklist nedostajućih računa
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#57534e] sm:text-base">
            Čekiraj račune koje pronađeš. Stanje se čuva u ovom browseru (localStorage).
            Stranica nije linkovana sa sajta.
          </p>

          <div className="mt-6 rounded-2xl border border-[#d6d3d1] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-[#78716c]">Napredak</p>
                <p className="text-2xl font-bold">
                  {doneCount} / {totalCount}
                  <span className="ml-2 text-base font-semibold text-[#8e3232]">
                    ({progress}%)
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["all", "Sve"],
                    ["open", "Otvoreno"],
                    ["done", "Pronađeno"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      filter === key
                        ? "bg-[#385333] text-white"
                        : "bg-[#f4f1ea] text-[#385333]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={resetAll}
                  className="rounded-full border border-[#d6d3d1] px-4 py-2 text-sm font-semibold text-[#78716c]"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e7e5e4]">
              <div
                className="h-full rounded-full bg-[#385333] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {GROUPS.map((group) => {
            const groupDone = group.items.filter((i) => checked[i.id]).length;
            const groupTotal = group.items.length;
            const visibleItems = group.items.filter((item) => {
              if (filter === "open") return !checked[item.id];
              if (filter === "done") return checked[item.id];
              return true;
            });

            if (visibleItems.length === 0) return null;

            return (
              <section
                key={group.id}
                className="overflow-hidden rounded-2xl border border-[#d6d3d1] bg-white shadow-sm"
              >
                <div className="flex flex-col gap-3 border-b border-[#e7e5e4] bg-[#fafaf9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#385333]">{group.title}</h2>
                    {group.summary && (
                      <p className="mt-1 text-sm text-[#78716c]">{group.summary}</p>
                    )}
                    <p className="mt-1 text-xs font-semibold text-[#8e3232]">
                      {groupDone}/{groupTotal} pronađeno
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group, true)}
                      className="rounded-full bg-[#385333] px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Sve ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleGroup(group, false)}
                      className="rounded-full bg-[#e7e5e4] px-3 py-1.5 text-xs font-semibold text-[#57534e]"
                    >
                      Poništi
                    </button>
                  </div>
                </div>

                <ul className="divide-y divide-[#f5f5f4]">
                  {visibleItems.map((item) => {
                    const isDone = !!checked[item.id];
                    return (
                      <li key={item.id}>
                        <label
                          className={`flex cursor-pointer items-start gap-3 px-5 py-4 transition ${
                            isDone ? "bg-[#f0fdf4]" : "hover:bg-[#fafaf9]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggle(item.id)}
                            className="mt-1 h-5 w-5 shrink-0 rounded border-[#a8a29e] text-[#385333] focus:ring-[#385333]"
                          />
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block font-medium ${
                                isDone ? "text-[#166534] line-through" : "text-[#1c1917]"
                              }`}
                            >
                              {item.label}
                            </span>
                            {(item.amount || item.note) && (
                              <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#78716c]">
                                {item.amount && (
                                  <span className="font-semibold text-[#8e3232]">
                                    {item.amount} RSD
                                  </span>
                                )}
                                {item.note && <span>{item.note}</span>}
                              </span>
                            )}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-[#a8a29e]">
          /interni-racuni · noindex · nije u meniju
        </p>
      </div>
    </div>
  );
}
