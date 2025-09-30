'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';

const mockSales = [
  { id: 1, invoiceNumber: 'INV-001', customer: 'TechCorp', amount: '$1,200', date: '2025-09-25', status: 'Paid' },
  { id: 2, invoiceNumber: 'INV-002', customer: 'DataSys', amount: '$850', date: '2025-09-24', status: 'Pending' },
  { id: 3, invoiceNumber: 'INV-003', customer: 'CloudNet', amount: '$2,100', date: '2025-09-23', status: 'Paid' },
];

export default function SalesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{t('sales.title')}</h1>
          <Button>
            <Plus className="me-2 h-4 w-4" />
            {t('sales.createInvoice')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('sales.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('sales.invoiceNumber')}</TableHead>
                  <TableHead>{t('sales.customer')}</TableHead>
                  <TableHead>{t('sales.amount')}</TableHead>
                  <TableHead>{t('sales.date')}</TableHead>
                  <TableHead>{t('sales.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.invoiceNumber}</TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>{sale.amount}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        sale.status === 'Paid' 
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {sale.status === 'Paid' ? t('sales.paid') : t('sales.pending')}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
