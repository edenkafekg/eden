import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE } from "@/lib/constants";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} – ${SITE.tagline} | ${SITE.city}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Eden je dečija igraonica, čuvaonica i rođendaonica u Kragujevcu. Rezervišite rođendan, igrajte se i uživajte u našem kafiću.",
  keywords: ["igraonica", "čuvaonica", "rođendani", "Kragujevac", "dečiji centar", "Eden"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
