import { redirect } from "next/navigation";
import { ShiftHistory } from "@/components/app/ShiftHistory";
import { AppShell } from "@/components/app/AppShell";
import { getStaffSession } from "@/lib/app/session-auth";

export default async function HistoryPage() {
  const session = await getStaffSession();
  if (!session) redirect("/app/login");

  return (
    <AppShell staffName={session.staffName}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-eden-headline">Danas u smeni</h1>
      </div>
      <ShiftHistory />
    </AppShell>
  );
}
