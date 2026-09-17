import type { Metadata } from "next";
import { RacuniChecklist } from "@/components/RacuniChecklist";

export const metadata: Metadata = {
  title: "Checklist računa",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function InterniRacuniPage() {
  return <RacuniChecklist />;
}
