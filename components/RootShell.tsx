"use client";

import type { ReactNode } from "react";
import { RootErrorBoundary } from "@/components/RootErrorBoundary";

export interface RootShellProps {
  children: ReactNode;
}

export function RootShell({ children }: RootShellProps): JSX.Element {
  return <RootErrorBoundary>{children}</RootErrorBoundary>;
}
