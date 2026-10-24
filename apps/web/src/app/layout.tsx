import React from "react";
import type { Metadata } from "next";
import { AppProviders } from "@/providers";
import { appearanceScript } from "@/lib/appearance-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "VitalAI — High-Performance Athletic Intelligence",
  description:
    "AI-powered biometric conditioning, adaptive workout periodization and progressive overload tracking.",
  openGraph: {
    title: "VitalAI — Athletic Intelligence",
    description: "AI-powered workout execution and progressive overload tracking.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="dark"
      data-brand="vitalai"
      data-theme="vitalai"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
