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

const mockServices = [
  { id: 1, requestNumber: 'SRV-001', type: 'Installation', status: 'In Progress', customer: 'TechCorp' },
  { id: 2, requestNumber: 'SRV-002', type: 'Support', status: 'Completed', customer: 'DataSys' },
  { id: 3, requestNumber: 'SRV-003', type: 'Maintenance', status: 'Pending', customer: 'CloudNet' },
];

export default function ServicesPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">{t('services.title')}</h1>
          <Button>
            <Plus className="me-2 h-4 w-4" />
            {t('services.serviceRequest')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('services.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('services.requestNumber')}</TableHead>
                  <TableHead>{t('services.type')}</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>{t('services.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.requestNumber}</TableCell>
                    <TableCell>{service.type}</TableCell>
                    <TableCell>{service.customer}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        service.status === 'Completed' 
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : service.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {service.status === 'Completed' ? t('services.completed') : 
                         service.status === 'In Progress' ? t('services.inProgress') : 
                         'Pending'}
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
