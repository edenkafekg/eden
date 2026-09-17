import { describe, expect, it } from "vitest";
import { applyDiscount } from "./discount";

describe("applyDiscount", () => {
  it("applies 20% discount", () => {
    const result = applyDiscount(1000, 20);
    expect(result.subtotalRsd).toBe(1000);
    expect(result.discountPercent).toBe(20);
    expect(result.discountRsd).toBe(200);
    expect(result.totalRsd).toBe(800);
  });

  it("clamps percent to 0-100", () => {
    expect(applyDiscount(500, -5).discountPercent).toBe(0);
    expect(applyDiscount(500, 150).discountPercent).toBe(100);
    expect(applyDiscount(500, 150).totalRsd).toBe(0);
  });
});
