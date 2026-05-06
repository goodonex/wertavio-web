"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

export interface RootErrorBoundaryProps {
  children: ReactNode;
}

interface RootErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class RootErrorBoundary extends Component<RootErrorBoundaryProps, RootErrorBoundaryState> {
  constructor(props: RootErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): RootErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Wertavio RootErrorBoundary:", error, info.componentStack);
  }

  private handleReload = (): void => {
    this.setState({ hasError: false, message: "" });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-wertavio-cream px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold text-wertavio-slate">
            Die Oberfläche ist abgestürzt
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-wertavio-muted">
            Bitte laden Sie die Seite neu. Wenn das wieder passiert, prüfen Sie die Konsole (F12).
          </p>
          {process.env.NODE_ENV === "development" ? (
            <pre className="max-w-full overflow-x-auto rounded border border-wertavio-border bg-wertavio-white p-4 text-left text-xs text-red-800">
              {this.state.message}
            </pre>
          ) : null}
          <button
            type="button"
            onClick={this.handleReload}
            className="rounded bg-wertavio-gold px-6 py-3 text-sm font-semibold text-wertavio-slate transition-colors hover:bg-wertavio-gold-light"
          >
            Seite neu laden
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
