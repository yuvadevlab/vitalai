"use client";

import React, { type ReactNode } from "react";
import { ConfigProvider, Toaster } from "@yuva-devlab/ui";
import { QueryProvider } from "./QueryProvider";

export interface AppProvidersProps {
  readonly children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps): React.JSX.Element {
  return (
    <ConfigProvider brand="vitalai" defaultTheme="dark">
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </ConfigProvider>
  );
}
