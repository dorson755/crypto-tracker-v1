import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-serif p-8">
      <div className="max-w-6xl mx-auto space-y-6">{children}</div>
    </div>
  );
};
