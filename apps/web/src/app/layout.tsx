import React from "react";
import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/providers";
import { appearanceScript } from "@/lib/appearance-script";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
  display: "swap",
});

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
      className={`dark ${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
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
