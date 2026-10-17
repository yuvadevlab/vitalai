import React from "react";
import { AppShell } from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <AppShell>{children}</AppShell>;
}
