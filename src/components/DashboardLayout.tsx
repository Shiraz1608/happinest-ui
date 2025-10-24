
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="flex h-screen bg-background">
          {sidebar}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}