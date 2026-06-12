import { redirect } from "next/navigation";
import { CheckoutView } from "@/components/app/CheckoutView";
import { AppShell } from "@/components/app/AppShell";
import { getStaffSession } from "@/lib/app/session-auth";

type PageProps = { params: Promise<{ id: string }> };

export default async function SessionCheckoutPage({ params }: PageProps) {
  const session = await getStaffSession();
  if (!session) redirect("/app/login");
  const { id } = await params;

  return (
    <AppShell staffName={session.staffName}>
      <CheckoutView sessionId={id} />
    </AppShell>
  );
}
