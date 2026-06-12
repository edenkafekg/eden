import { redirect } from "next/navigation";
import { AdminStaffManager } from "@/components/app/AdminStaffManager";
import { getAdminSession } from "@/lib/app/session-auth";

export default async function AdminStaffPage() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) redirect("/app/admin/login");
  return <AdminStaffManager />;
}
