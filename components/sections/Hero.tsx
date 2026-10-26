"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BadgeEuro, Clock3, ShieldCheck, UserRoundCheck } from "lucide-react";
import { FactList } from "@/components/ui/FactList";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";

const facts = [
  { icon: BadgeEuro, title: "0 € für Eigentümer", body: "Kein Entgelt an Wertavio, weder vorher noch nachher." },
  { icon: UserRoundCheck, title: "Ein Makler pro Anfrage", body: "Ihre Daten gehen an genau einen Spezialisten." },
  { icon: Clock3, title: "Rückmeldung in 48 Stunden", body: "Persönlich ausgewählt nach Region und Objekt." },
  { icon: ShieldCheck, title: "Geprüftes Netzwerk", body: "Prüfung vor Aufnahme, Neubewertung jährlich." },
] as const;

export function Hero(): JSX.Element {
  const reduced = usePrefersReducedMotion();
  /** Einmaliger Einstieg: Lesereihenfolge Headline → Text → Handlung → Bild. */
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: motionEase, delay },
        };

  return (
    <section className="pb-16 pt-[7.5rem] md:pb-24 md:pt-36">
      <div className="container-wide">
        <motion.h1 className="text-h1 max-w-[17ch] text-wertavio-slate lg:max-w-[22ch]" {...enter(0)}>
          Wir finden den Makler, der zu Ihrer Immobilie passt.
        </motion.h1>

        <div className="mt-6 flex flex-col gap-8 md:mt-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.p className="text-lead max-w-[46ch]" {...enter(0.1)}>
            Sie beschreiben Immobilie und Ziel. Innerhalb von 48 Stunden meldet sich ein geprüfter Spezialist aus
            Ihrer Region. Für Sie kostenlos.
          </motion.p>
          <motion.div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" {...enter(0.2)}>
            <Button href="/anfrage" className="w-full sm:w-auto">
              {PRIMARY_CTA_LABEL}
            </Button>
            <Button href="#how-it-works" variant="ghost" className="self-center">
              So funktioniert es
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-wertavio-stone sm:aspect-[16/9] md:mt-14 lg:aspect-[2.35/1]"
          initial={reduced ? false : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: motionEase, delay: 0.25 }}
        >
          <Image
            src="/images/cta-bg.jpg"
            alt="Wohnviertel mit Einfamilienhäusern im Abendlicht, von oben fotografiert"
            fill
            priority
            className="object-cover object-[50%_60%]"
            sizes="(min-width: 1152px) 1088px, 100vw"
          />
        </motion.div>

        <FactList items={facts} className="mt-10 md:mt-12" />
      </div>
    </section>
  );
}
