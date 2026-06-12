import { describe, expect, it } from "vitest";
import {
  calculateBillableHours,
  calculateDaycareBilling,
  calculatePlayBilling,
} from "./playroom-pricing";

describe("calculateBillableHours", () => {
  it("charges 1 hour up to 1h10", () => {
    expect(calculateBillableHours(70)).toBe(1);
    expect(calculateBillableHours(30)).toBe(1);
  });

  it("charges 2 hours from 1h11 to 2h10", () => {
    expect(calculateBillableHours(71)).toBe(2);
    expect(calculateBillableHours(85)).toBe(2);
    expect(calculateBillableHours(130)).toBe(2);
  });

  it("charges 3 hours from 2h11", () => {
    expect(calculateBillableHours(131)).toBe(3);
  });
});

describe("calculatePlayBilling", () => {
  const checkIn = new Date("2026-06-01T10:00:00");

  it("3 children for 1 hour = 800 + 500", () => {
    const checkOut = new Date("2026-06-01T11:00:00");
    const result = calculatePlayBilling(3, checkIn, checkOut);
    expect(result.totalRsd).toBe(1300);
    expect(result.billableHours).toBe(1);
  });

  it("3 children for 1h25 = 2400 RSD", () => {
    const checkOut = new Date("2026-06-01T11:25:00");
    const result = calculatePlayBilling(3, checkIn, checkOut);
    expect(result.billableHours).toBe(2);
    expect(result.totalRsd).toBe(2400);
  });

  it("4 children for 1 hour = 800 + 800", () => {
    const checkOut = new Date("2026-06-01T11:00:00");
    const result = calculatePlayBilling(4, checkIn, checkOut);
    expect(result.totalRsd).toBe(1600);
  });

  it("1 child for 2 hours = 500 + 400", () => {
    const checkOut = new Date("2026-06-01T11:11:00");
    const result = calculatePlayBilling(1, checkIn, checkOut);
    expect(result.totalRsd).toBe(900);
  });
});

describe("calculateDaycareBilling", () => {
  const checkIn = new Date("2026-06-01T08:00:00");

  it("recommends hourly for 3 hours", () => {
    const checkOut = new Date("2026-06-01T11:00:00");
    const result = calculateDaycareBilling(1, checkIn, checkOut);
    const recommended = result.options.find((o) => o.recommended);
    expect(recommended?.mode).toBe("hourly");
    expect(recommended?.totalRsd).toBe(1950);
  });

  it("recommends full day for 5 hours", () => {
    const checkOut = new Date("2026-06-01T13:00:00");
    const result = calculateDaycareBilling(1, checkIn, checkOut);
    const recommended = result.options.find((o) => o.recommended);
    expect(recommended?.mode).toBe("full_day");
    expect(recommended?.totalRsd).toBe(3000);
  });
});
