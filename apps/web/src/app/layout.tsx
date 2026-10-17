import type { Metadata } from "next";
import React from "react";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import { AppProviders } from "@/providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "VitalAI — AI Health, Clinical Nutrition & Fitness Intelligence",
  description:
    "Evidence-based clinical nutrition therapy, life-stage advisory, and biomechanical training with deterministic safety guardrails.",
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html
      lang="en"
      data-brand="vitalai"
      data-theme="vitalai-dark"
      className={`dark ${manrope.variable} ${sora.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground vital-bg-matrix min-h-screen antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
