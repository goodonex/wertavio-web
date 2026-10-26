"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeEuro, Filter, MapPin, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FactList } from "@/components/ui/FactList";
import { motionEase } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const facts = [
  { icon: UserRoundCheck, title: "1 Lead = 1 Makler", body: "Sie sind alleiniger Empfänger, keine Parallelvergabe." },
  { icon: Filter, title: "Vorqualifiziert", body: "Verkaufsabsicht und Region sind vom Eigentümer bestätigt." },
  { icon: MapPin, title: "Ein Partner pro PLZ-Gebiet", body: "Ihre Region wird nicht an Mitbewerber vergeben." },
  { icon: BadgeEuro, title: "Budget fix", body: "Keine umsatzabhängige Provision an Wertavio." },
] as const;

export function PartnerHero(): JSX.Element {
  const reduced = usePrefersReducedMotion();
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
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <motion.p className="text-eyebrow" {...enter(0)}>
              Für Immobilienmakler
            </motion.p>
            <motion.h1 className="text-h1 mt-4 max-w-[16ch] text-wertavio-slate" {...enter(0.05)}>
              Verkäufer-Anfragen exklusiv für Ihr Büro
            </motion.h1>
            <motion.p className="text-lead mt-6 max-w-[44ch]" {...enter(0.12)}>
              Wertavio arbeitet pro PLZ-Gebiet nur mit einem Partner. Jede Anfrage aus Ihrer Region geht an genau ein
              Büro: Ihres.
            </motion.p>
            <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" {...enter(0.2)}>
              <Button href="#region" className="w-full sm:w-auto">
                Region prüfen
              </Button>
              <Button href="#preise" variant="ghost" className="self-center">
                Preise ansehen
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-wertavio-stone lg:col-span-5 lg:aspect-[4/5]"
            initial={reduced ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: motionEase, delay: 0.25 }}
          >
            <Image
              src="/images/hero-bg.jpg"
              alt="Altbau-Straße mit Gründerzeitfassaden"
              fill
              priority
              className="object-cover object-[30%_50%]"
              sizes="(min-width: 1024px) 450px, 100vw"
            />
          </motion.div>
        </div>
        <FactList items={facts} className="mt-14 md:mt-20" />
      </div>
    </section>
  );
}
