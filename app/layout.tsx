import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/JsonLd";
import { RootShell } from "@/components/RootShell";
import "./globals.css";

/** Schriften aus dem Markenpaket, selbst ausgeliefert (OFL, siehe app/fonts/LIZENZ.txt). */
const inter = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-600-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ibm-plex-sans-400-latin-ext.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-600-latin-ext.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["-apple-system", "Helvetica Neue", "Arial", "sans-serif"],
});

const display = localFont({
  src: [
    { path: "./fonts/newsreader-400-600-latin.woff2", weight: "400 600", style: "normal" },
    { path: "./fonts/newsreader-400-600-latin-ext.woff2", weight: "400 600", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const siteUrl = "https://wertavio.de";

export const metadata: Metadata = {
  title: "Wertavio | Passender Makler in 48h, 0 € für Eigentümer",
  description:
    "Eigentümer erhalten innerhalb von 48 Stunden einen passenden Makler. Ohne Portale, ohne Streuung an zehn Büros. 0 € Kosten bei Wertavio.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "Wertavio",
    title: "Wertavio | Passender Makler in 48h, 0 € für Eigentümer",
    description:
      "Eigentümer erhalten innerhalb von 48 Stunden einen passenden Makler, ohne Portale. 0 € Kosten bei Wertavio.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Wertavio Logo Schriftzug" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wertavio | Passender Makler in 48h, 0 € für Eigentümer",
    description:
      "Eigentümer erhalten innerhalb von 48 Stunden einen passenden Makler, ohne Portale. 0 € Kosten bei Wertavio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-DE" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans">
        <RootShell>
          <JsonLd />
          {children}
        </RootShell>
      </body>
    </html>
  );
}
