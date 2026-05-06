"use client";

import { Suspense, useMemo, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadForm, type LeadFormProps } from "@/components/anfrage/LeadForm";
import { isPropertyType } from "@/lib/lead-schema";
import { prioritaetToLeadStep2 } from "@/lib/makler-profil-map";

function AnfrageInner(): JSX.Element {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") ?? "";
  const plzParam = searchParams.get("plz");
  const prioritaetParam = searchParams.get("prioritaet");

  const flowType = typeParam === "makler" ? "makler" : "eigentuemer";

  const prefill = useMemo((): LeadFormProps["prefill"] => {
    const o: NonNullable<LeadFormProps["prefill"]> = {};

    if (flowType === "eigentuemer" && typeParam && isPropertyType(typeParam)) {
      o.propertyType = typeParam;
    }
    if (plzParam && /^\d{5}$/.test(plzParam)) {
      o.plz = plzParam;
    }
    if (flowType === "eigentuemer" && prioritaetParam) {
      Object.assign(o, prioritaetToLeadStep2(prioritaetParam));
    }
    return Object.keys(o).length ? o : undefined;
  }, [flowType, typeParam, plzParam, prioritaetParam]);

  const headline =
    flowType === "makler" ? "Partnergespräch anfragen" : "Passenden Spezialisten anfragen";

  return (
    <>
      <Header />
      <main className="section-y bg-wertavio-cream">
        <div className="container-narrow space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-eyebrow">Wertavio</p>
            <h1 className="text-h1 text-wertavio-slate">{headline}</h1>
            <p className="text-sm text-wertavio-muted md:text-base">
              Start mit Immobilie und Ziel — Kontaktdaten erst zum Schluss. Daten nur fürs Matching, keine
              Portalweitergabe.
            </p>
          </div>

          <noscript>
            <div className="rounded border border-wertavio-border bg-wertavio-white p-4 text-sm text-wertavio-slate">
              <p>
                Für das geführte Formular wird JavaScript benötigt. Bitte aktivieren Sie JavaScript in
                Ihrem Browser — oder melden Sie sich per E-Mail, wenn Ihnen das recht ist.
              </p>
            </div>
          </noscript>

          <LeadForm flowType={flowType} prefill={prefill} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function FallbackShell({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Header />
      <main className="section-y bg-wertavio-cream">
        <div className="container-narrow space-y-8">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function AnfrageContent(): JSX.Element {
  return (
    <Suspense
      fallback={
        <FallbackShell>
          <div className="h-40 animate-pulse rounded-lg bg-wertavio-border/50" aria-hidden />
        </FallbackShell>
      }
    >
      <AnfrageInner />
    </Suspense>
  );
}
