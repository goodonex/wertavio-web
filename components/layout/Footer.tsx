import Link from "next/link";

const columns = [
  {
    title: "Eigentümer",
    links: [
      { href: "/#how-it-works", label: "Wie es funktioniert" },
      { href: "/#faq", label: "FAQ" },
      { href: "/anfrage", label: "Makler finden" },
    ],
  },
  {
    title: "Makler",
    links: [{ href: "/partner", label: "Partner werden" }],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/agb", label: "Nutzungsbedingungen" },
    ],
  },
] as const;

export function Footer(): JSX.Element {
  return (
    <footer className="on-dark bg-wertavio-slate pb-10 pt-16 text-wertavio-cream md:pt-20">
      <div className="container-wide grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <p className="font-display text-2xl font-bold tracking-[-0.03em] text-white">Wertavio</p>
          <p className="mt-3 text-sm leading-relaxed text-wertavio-cream/70">
            Der richtige Makler für Ihre Immobilie. Persönlich ausgewählt, für Eigentümer kostenlos.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-semibold text-white">{col.title}</p>
            <ul className="mt-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-2.5 text-wertavio-cream/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-wide mt-14">
        <p className="border-t border-white/10 pt-6 text-xs text-wertavio-cream/60">
          © 2026 Wertavio. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
