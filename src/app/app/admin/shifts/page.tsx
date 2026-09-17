import { redirect } from "next/navigation";
import { AdminShiftsDashboard } from "@/components/app/AdminShiftsDashboard";
import { getAdminSession } from "@/lib/app/session-auth";

export default async function AdminShiftsPage() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) redirect("/app/admin/login");
  return <AdminShiftsDashboard />;
}
