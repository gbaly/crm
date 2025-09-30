'use client';

import { Header } from './header';
import { Sidebar } from './sidebar';
import { Footer } from './footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 pb-20">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
