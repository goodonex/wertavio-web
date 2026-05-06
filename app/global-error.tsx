"use client";

import "./globals.css";

export interface AppGlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: AppGlobalErrorProps): JSX.Element {
  return (
    <html lang="de-DE">
      <body className="min-h-dvh bg-wertavio-cream font-sans text-wertavio-slate antialiased">
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-6 px-4 py-20 text-center">
          <h1 className="text-xl font-semibold">Anwendungsfehler</h1>
          <p className="text-sm text-wertavio-muted">
            Die Oberfläche konnte nicht gestartet werden. Seite neu laden oder Entwicklungsserver
            neu starten.
          </p>
          {process.env.NODE_ENV === "development" ? (
            <pre className="w-full overflow-x-auto rounded border border-wertavio-border bg-wertavio-white p-3 text-left text-xs text-red-800">
              {error.message}
            </pre>
          ) : null}
          <button
            type="button"
            onClick={reset}
            className="rounded bg-wertavio-gold px-5 py-2 text-sm font-semibold text-wertavio-slate"
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
