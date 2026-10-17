"use client";

import React, { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { FloatingAdvisorDrawer } from "@/features/advisors/components/FloatingAdvisorDrawer";

export interface AppShellProps {
  readonly children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isAdvisorDrawerOpen, setIsAdvisorDrawerOpen] = useState(false);

  return (
    <div className="bg-background text-foreground selection:bg-primary/20 flex min-h-screen antialiased">
      {/* Dynamic DB-driven Sidebar */}
      <Sidebar onOpenAdvisorDrawer={() => setIsAdvisorDrawerOpen(true)} />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenAdvisorDrawer={() => setIsAdvisorDrawerOpen(true)} />
        <main className="mx-auto w-full max-w-(--page-max-width) flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Persistent Floating Clinical AI Drawer */}
      <FloatingAdvisorDrawer
        isOpen={isAdvisorDrawerOpen}
        onClose={() => setIsAdvisorDrawerOpen(false)}
      />
    </div>
  );
};
