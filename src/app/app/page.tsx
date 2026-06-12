import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getStaffSession } from "@/lib/app/session-auth";

export const metadata: Metadata = {
  title: "Eden Tracker",
  robots: { index: false, follow: false },
};

export default async function AppRootPage() {
  const session = await getStaffSession();
  redirect(session ? "/app/active" : "/app/login");
}
