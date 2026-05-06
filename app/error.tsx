"use client";

import { useEffect } from "react";

export interface AppErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: AppErrorProps): JSX.Element {
  useEffect(() => {
    console.error("Wertavio Seitenfehler:", error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-wertavio-cream px-4 py-16 text-center">
      <div className="container-narrow flex max-w-lg flex-col items-center gap-6">
        <h1 className="font-display text-2xl font-semibold text-wertavio-slate">
          Diese Seite konnte nicht geladen werden
        </h1>
        <p className="text-sm leading-relaxed text-wertavio-muted">
          Bitte laden Sie neu. Wenn das wieder passiert, prüfen Sie die Browser-Konsole (F12) und
          ob der Entwicklungsserver noch läuft.
        </p>
        {process.env.NODE_ENV === "development" ? (
          <pre className="max-w-full overflow-x-auto rounded border border-wertavio-border bg-wertavio-white p-4 text-left text-xs text-red-800">
            {error.message}
          </pre>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="rounded bg-wertavio-gold px-6 py-3 text-sm font-semibold text-wertavio-slate transition-colors hover:bg-wertavio-gold-light"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
