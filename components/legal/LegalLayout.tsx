import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main className="section-y bg-wertavio-cream pt-24">
        <article className="container-narrow max-w-2xl space-y-10">
          <h1 className="text-h2 text-balance text-wertavio-slate">{title}</h1>
          <div className="space-y-10 text-sm leading-relaxed">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
