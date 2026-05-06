import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { RootShell } from "@/components/RootShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = "https://wertavio.de";

export const metadata: Metadata = {
  title: "Wertavio — Makler in 48h, 0 € für Eigentümer",
  description:
    "Eigentümer erhalten innerhalb von 48 Stunden einen passenden Makler — ohne Portale, ohne Streuung an zehn Büros. 0 € Kosten bei Wertavio.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "Wertavio",
    title: "Wertavio — Makler in 48h, 0 € für Eigentümer",
    description:
      "Eigentümer erhalten innerhalb von 48 Stunden einen passenden Makler — ohne Portale. 0 € Kosten bei Wertavio.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Wertavio Logo Schriftzug" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wertavio — Makler in 48h, 0 € für Eigentümer",
    description:
      "Eigentümer erhalten innerhalb von 48 Stunden einen passenden Makler — ohne Portale. 0 € Kosten bei Wertavio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-DE" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-dvh font-sans">
        <RootShell>
          <JsonLd />
          {children}
        </RootShell>
      </body>
    </html>
  );
}
