import {
  DAYCARE_RATES,
  GRACE_MINUTES,
  PLAY_RATES,
  POS_LABELS,
} from "./rates";

export type BillingLine = {
  posLabel: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type PlayBillingResult = {
  billableHours: number;
  durationMinutes: number;
  lines: BillingLine[];
  totalRsd: number;
};

export type DaycareBillingOption = {
  mode: "hourly" | "full_day";
  label: string;
  lines: BillingLine[];
  totalRsd: number;
  recommended: boolean;
};

export type DaycareBillingResult = {
  billableHours: number;
  durationMinutes: number;
  childCount: number;
  options: DaycareBillingOption[];
};

/** Billable hours: 0–1:10 = 1h; each extra block up to +10min grace rounds up another hour. */
export function calculateBillableHours(durationMinutes: number): number {
  const graceThreshold = 60 + GRACE_MINUTES;
  if (durationMinutes <= graceThreshold) return 1;
  return 1 + Math.ceil((durationMinutes - graceThreshold) / 60);
}

export function getDurationMinutes(checkedInAt: Date, checkedOutAt: Date): number {
  return Math.max(0, Math.round((checkedOutAt.getTime() - checkedInAt.getTime()) / 60000));
}

function countPlayGroups(childCount: number) {
  const pairs = Math.floor(childCount / 2);
  const singles = childCount % 2;
  return { pairs, singles };
}

function addLine(
  lines: BillingLine[],
  posLabel: string,
  unitPrice: number,
  quantity: number,
) {
  if (quantity <= 0) return;
  const existing = lines.find((l) => l.posLabel === posLabel && l.unitPrice === unitPrice);
  if (existing) {
    existing.quantity += quantity;
    existing.total = existing.quantity * existing.unitPrice;
  } else {
    lines.push({ posLabel, quantity, unitPrice, total: quantity * unitPrice });
  }
}

export function calculatePlayBilling(
  childCount: number,
  checkedInAt: Date,
  checkedOutAt: Date,
): PlayBillingResult {
  if (childCount < 1) {
    throw new Error("Broj dece mora biti najmanje 1");
  }

  const durationMinutes = getDurationMinutes(checkedInAt, checkedOutAt);
  const billableHours = calculateBillableHours(durationMinutes);
  const { pairs, singles } = countPlayGroups(childCount);
  const additionalHours = billableHours - 1;

  const lines: BillingLine[] = [];

  addLine(lines, POS_LABELS.playPairFirstHour, PLAY_RATES.pairFirstHour, pairs);
  addLine(lines, POS_LABELS.playSingleFirstHour, PLAY_RATES.singleFirstHour, singles);
  addLine(lines, POS_LABELS.playPairAdditionalHour, PLAY_RATES.pairAdditionalHour, pairs * additionalHours);
  addLine(
    lines,
    POS_LABELS.playSingleAdditionalHour,
    PLAY_RATES.singleAdditionalHour,
    singles * additionalHours,
  );

  const totalRsd = lines.reduce((sum, line) => sum + line.total, 0);

  return { billableHours, durationMinutes, lines, totalRsd };
}

export function calculateDaycareBilling(
  childCount: number,
  checkedInAt: Date,
  checkedOutAt: Date,
): DaycareBillingResult {
  if (childCount < 1) {
    throw new Error("Broj dece mora biti najmanje 1");
  }

  const durationMinutes = getDurationMinutes(checkedInAt, checkedOutAt);
  const billableHours = calculateBillableHours(durationMinutes);

  const hourlyTotal = DAYCARE_RATES.hourly * billableHours * childCount;
  const fullDayTotal = DAYCARE_RATES.fullDay * childCount;

  const hourlyOption: DaycareBillingOption = {
    mode: "hourly",
    label: `${billableHours}h × ${childCount} dete(a)`,
    lines: [
      {
        posLabel: POS_LABELS.daycareHourly,
        quantity: billableHours * childCount,
        unitPrice: DAYCARE_RATES.hourly,
        total: hourlyTotal,
      },
    ],
    totalRsd: hourlyTotal,
    recommended: hourlyTotal <= fullDayTotal,
  };

  const fullDayOption: DaycareBillingOption = {
    mode: "full_day",
    label: `Celodnevno × ${childCount} dete(a)`,
    lines: [
      {
        posLabel: POS_LABELS.daycareFullDay,
        quantity: childCount,
        unitPrice: DAYCARE_RATES.fullDay,
        total: fullDayTotal,
      },
    ],
    totalRsd: fullDayTotal,
    recommended: fullDayTotal < hourlyTotal,
  };

  return {
    billableHours,
    durationMinutes,
    childCount,
    options: [hourlyOption, fullDayOption],
  };
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

export function getRecommendedDaycareOption(result: DaycareBillingResult): DaycareBillingOption {
  return result.options.find((o) => o.recommended) ?? result.options[0];
}
