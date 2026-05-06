import type { ReactElement } from "react";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Wertavio",
  url: "https://wertavio.de",
  description:
    "Eigentümer erhalten innerhalb von 48 Stunden einen passenden Makler — 0 € Entgelt bei Wertavio, ohne Portal-Streuung.",
  addressCountry: "DE",
} as const;

export function JsonLd(): ReactElement {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessJsonLd),
      }}
    />
  );
}
