import { redirect } from "next/navigation";
import { ActiveSessionsPage } from "@/components/app/ActiveSessions";
import { AppShell } from "@/components/app/AppShell";
import { getStaffSession } from "@/lib/app/session-auth";

export default async function ActivePage() {
  const session = await getStaffSession();
  if (!session) redirect("/app/login");

  return (
    <AppShell staffName={session.staffName}>
      <ActiveSessionsPage />
    </AppShell>
  );
}
