export const EDEN_TIMEZONE = "Europe/Belgrade";

type EdenParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function getEdenParts(date: Date): EdenParts {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: EDEN_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

/** YYYY-MM-DD for today in Belgrade. */
export function getEdenTodayIso(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: EDEN_TIMEZONE }).format(date);
}

/** Value for `<input type="datetime-local" />` in Belgrade time. */
export function formatDatetimeLocalInEden(date = new Date()): string {
  const p = getEdenParts(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${p.year}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}`;
}

/** Parse datetime-local string as Belgrade local time → UTC Date. */
export function parseDatetimeLocalInEden(value: string): Date {
  const [datePart, timePart] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  let timestamp = Date.UTC(year, month - 1, day, hour, minute);

  for (let i = 0; i < 4; i++) {
    const p = getEdenParts(new Date(timestamp));
    if (p.year === year && p.month === month && p.day === day && p.hour === hour && p.minute === minute) {
      return new Date(timestamp);
    }
    const target = Date.UTC(year, month - 1, day, hour, minute);
    const actual = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
    timestamp += target - actual;
  }

  return new Date(timestamp);
}

/** UTC ISO bounds for one calendar day in Belgrade (for DB queries). */
export function getEdenDayBounds(dateYmd: string): { start: string; end: string } {
  const start = parseDatetimeLocalInEden(`${dateYmd}T00:00`);
  const end = parseDatetimeLocalInEden(`${dateYmd}T23:59`);
  end.setSeconds(59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
}

/** YYYY-MM for current month in Belgrade. */
export function getEdenCurrentMonthIso(date = new Date()): string {
  const p = getEdenParts(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${p.year}-${pad(p.month)}`;
}

/** UTC ISO bounds for a calendar month in Belgrade (YYYY-MM). */
export function getEdenMonthBounds(yearMonth: string): { start: string; end: string } {
  const [yearStr, monthStr] = yearMonth.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const pad = (n: number) => String(n).padStart(2, "0");

  const start = parseDatetimeLocalInEden(`${year}-${pad(month)}-01T00:00`);
  const nextMonth =
    month === 12 ? `${year + 1}-01` : `${year}-${pad(month + 1)}`;
  const nextStart = parseDatetimeLocalInEden(`${nextMonth}-01T00:00`);
  const end = new Date(nextStart.getTime() - 1);

  return { start: start.toISOString(), end: end.toISOString() };
}

export function formatEdenMonthLabel(yearMonth: string): string {
  const [year, month] = yearMonth.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return date.toLocaleDateString("sr-RS", { month: "long", year: "numeric", timeZone: EDEN_TIMEZONE });
}

const defaultDateTimeOptions: Intl.DateTimeFormatOptions = {
  timeZone: EDEN_TIMEZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const defaultTimeOptions: Intl.DateTimeFormatOptions = {
  timeZone: EDEN_TIMEZONE,
  hour: "2-digit",
  minute: "2-digit",
};

export function formatEdenDateTime(value: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleString("sr-RS", { ...defaultDateTimeOptions, ...options });
}

export function formatEdenTime(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleTimeString("sr-RS", defaultTimeOptions);
}
