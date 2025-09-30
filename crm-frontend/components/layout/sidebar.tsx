'use client';

import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  ShoppingCart, 
  Package, 
  Receipt, 
  Wrench, 
  TrendingUp, 
  FileText, 
  Settings 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

export function Sidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  const navItems: NavItem[] = [
    { href: '/dashboard', icon: LayoutDashboard, label: t('common.dashboard') },
    { href: '/users', icon: Users, label: t('common.users') },
    { href: '/agents', icon: UserCog, label: t('common.agents') },
    { href: '/customers', icon: ShoppingCart, label: t('common.customers') },
    { href: '/products', icon: Package, label: t('common.products') },
    { href: '/sales', icon: Receipt, label: t('common.sales') },
    { href: '/services', icon: Wrench, label: t('common.services') },
    { href: '/commissions', icon: TrendingUp, label: t('common.commissions') },
    { href: '/audit', icon: FileText, label: t('common.audit') },
    { href: '/settings', icon: Settings, label: t('common.settings') },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="flex h-full flex-col gap-2 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href} onClick={() => close()}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-secondary'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden lg:block w-64" />
    </>
  );
}
