import { redirect } from "next/navigation";
import { CheckInForm } from "@/components/app/CheckInForm";
import { AppShell } from "@/components/app/AppShell";
import { getStaffSession } from "@/lib/app/session-auth";

export default async function CheckInPage() {
  const session = await getStaffSession();
  if (!session) redirect("/app/login");

  return (
    <AppShell staffName={session.staffName}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-eden-headline">Novi ulazak</h1>
      </div>
      <CheckInForm />
    </AppShell>
  );
}
