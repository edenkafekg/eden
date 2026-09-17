import { getShiftDurationMinutes } from "@/lib/shifts";

export type ShiftSessionRow = {
  id: string;
  total_rsd: number | null;
  discount_rsd: number | null;
  status?: string;
};

export type ShiftReportRow = {
  id: string;
  staff_id: string;
  started_at: string;
  ended_at: string | null;
  staff: { id: string; name: string } | null;
  sessions: ShiftSessionRow[];
};

export type StaffShiftSummary = {
  staffId: string;
  staffName: string;
  totalMinutes: number;
  shiftCount: number;
  sessionCount: number;
  totalRsd: number;
  discountRsd: number;
  avgMinutesPerShift: number;
};

export type EnrichedShift = ShiftReportRow & {
  durationMinutes: number;
  sessionCount: number;
  sessionTotalRsd: number;
  discountTotalRsd: number;
};

export function buildShiftReport(shifts: ShiftReportRow[]) {
  const summaryMap = new Map<string, StaffShiftSummary>();

  const enriched: EnrichedShift[] = shifts.map((shift) => {
    const closedSessions = (shift.sessions ?? []).filter((s) => s.total_rsd != null);
    const durationMinutes = getShiftDurationMinutes(shift.started_at, shift.ended_at);
    const sessionTotal = closedSessions.reduce((sum, s) => sum + (s.total_rsd ?? 0), 0);
    const discountTotal = closedSessions.reduce((sum, s) => sum + (s.discount_rsd ?? 0), 0);

    const staffId = shift.staff?.id ?? shift.staff_id;
    const staffName = shift.staff?.name ?? "—";
    const existing = summaryMap.get(staffId);

    if (existing) {
      existing.totalMinutes += durationMinutes;
      existing.shiftCount += 1;
      existing.sessionCount += closedSessions.length;
      existing.totalRsd += sessionTotal;
      existing.discountRsd += discountTotal;
    } else {
      summaryMap.set(staffId, {
        staffId,
        staffName,
        totalMinutes: durationMinutes,
        shiftCount: 1,
        sessionCount: closedSessions.length,
        totalRsd: sessionTotal,
        discountRsd: discountTotal,
        avgMinutesPerShift: 0,
      });
    }

    return {
      ...shift,
      durationMinutes,
      sessionCount: closedSessions.length,
      sessionTotalRsd: sessionTotal,
      discountTotalRsd: discountTotal,
    };
  });

  const summary = Array.from(summaryMap.values())
    .map((row) => ({
      ...row,
      avgMinutesPerShift: row.shiftCount > 0 ? Math.round(row.totalMinutes / row.shiftCount) : 0,
    }))
    .sort((a, b) => a.staffName.localeCompare(b.staffName, "sr"));

  const totals = {
    totalMinutes: summary.reduce((sum, s) => sum + s.totalMinutes, 0),
    totalRsd: summary.reduce((sum, s) => sum + s.totalRsd, 0),
    discountRsd: summary.reduce((sum, s) => sum + s.discountRsd, 0),
    shiftCount: enriched.length,
    sessionCount: summary.reduce((sum, s) => sum + s.sessionCount, 0),
  };

  return { shifts: enriched, summary, totals };
}
