import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/app/AdminDashboard";
import { getAdminSession } from "@/lib/app/session-auth";

export default async function AdminPage() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) redirect("/app/admin/login");
  return <AdminDashboard />;
}
