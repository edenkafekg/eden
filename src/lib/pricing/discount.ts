export type DiscountResult = {
  subtotalRsd: number;
  discountPercent: number;
  discountRsd: number;
  totalRsd: number;
};

export function applyDiscount(subtotalRsd: number, discountPercent: number): DiscountResult {
  const percent = Math.min(100, Math.max(0, Math.round(discountPercent)));
  const discountRsd = Math.round(subtotalRsd * (percent / 100));
  const totalRsd = subtotalRsd - discountRsd;

  return {
    subtotalRsd,
    discountPercent: percent,
    discountRsd,
    totalRsd,
  };
}
