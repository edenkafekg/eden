import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eden Tracker",
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-eden-bg text-eden-paragraph">{children}</div>;
}
