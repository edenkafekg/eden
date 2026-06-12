import { describe, expect, it } from "vitest";
import {
  formatDatetimeLocalInEden,
  getEdenDayBounds,
  getEdenTodayIso,
  parseDatetimeLocalInEden,
} from "./timezone";

describe("timezone Europe/Belgrade", () => {
  it("formats datetime-local without UTC offset drift", () => {
    const utc = new Date("2026-06-12T22:52:00.000Z");
    expect(formatDatetimeLocalInEden(utc)).toBe("2026-06-13T00:52");
  });

  it("parses datetime-local back to correct UTC instant", () => {
    const parsed = parseDatetimeLocalInEden("2026-06-13T00:52");
    expect(parsed.toISOString()).toBe("2026-06-12T22:52:00.000Z");
  });

  it("returns Belgrade day bounds for admin queries", () => {
    const { start, end } = getEdenDayBounds("2026-06-13");
    expect(start).toBe("2026-06-12T22:00:00.000Z");
    expect(end).toBe("2026-06-13T21:59:59.999Z");
  });

  it("uses Belgrade calendar date near midnight UTC", () => {
    const utc = new Date("2026-06-12T22:52:00.000Z");
    expect(getEdenTodayIso(utc)).toBe("2026-06-13");
  });
});
