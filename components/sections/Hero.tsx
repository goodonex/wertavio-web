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
  { icon: ShieldCheck, title: "Persönlich geprüft", body: "Erlaubnis nach § 34c GewO und Gespräch vor der ersten Anfrage." },
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
    <section>
      {/* Petrol trägt die Fläche, Orange nur am Knopf (Markenpaket Richtung B). */}
      <div className="on-dark bg-wertavio-slate pb-14 pt-[7.5rem] md:pb-20 md:pt-36">
        <div className="container-wide grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <motion.h1 className="text-h1 max-w-[17ch] text-wertavio-cream lg:max-w-[22ch] lg:text-[3.4rem]" {...enter(0)}>
              Wir finden den Makler, der zu Ihrer Immobilie passt.
            </motion.h1>
            <motion.p className="mt-6 max-w-[44ch] text-pretty text-lg leading-relaxed text-wertavio-nebel" {...enter(0.1)}>
              Sie beschreiben Immobilie und Ziel. Innerhalb von 48 Stunden meldet sich ein geprüfter Spezialist aus
              Ihrer Region. Für Sie kostenlos.
            </motion.p>
            <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" {...enter(0.2)}>
              <Button href="/anfrage" className="w-full sm:w-auto">
                {PRIMARY_CTA_LABEL}
              </Button>
              <Button href="#how-it-works" variant="ghost" className="self-center text-wertavio-cream">
                So funktioniert es
              </Button>
            </motion.div>
          </div>

          <motion.figure
            className="lg:col-span-5"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: motionEase, delay: 0.25 }}
          >
            {/* Karte liegt auf Papier, wie beim Termin im Vermessungsbüro. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-wertavio-cream p-2 shadow-soft sm:p-3">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/images/marke/flurkarte.jpg"
                  alt="Historische württembergische Flurkarte im Maßstab 1:2.500 mit Ortskern und Flurstücken"
                  fill
                  priority
                  className="scale-[1.14] object-cover object-[50%_45%]"
                  sizes="(min-width: 1024px) 450px, 100vw"
                />
              </div>
            </div>
          </motion.figure>
        </div>
      </div>

      <div className="container-wide">
        <FactList items={facts} className="mt-10 md:mt-12" />
      </div>
    </section>
  );
}
