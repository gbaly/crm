'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockCommissions = [
  { id: 1, agent: 'Ahmed Ali', rate: '10%', totalEarned: '$5,230' },
  { id: 2, agent: 'Sara Hassan', rate: '12%', totalEarned: '$3,450' },
  { id: 3, agent: 'Omar Khalil', rate: '15%', totalEarned: '$7,890' },
];

export default function CommissionsPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">{t('commissions.title')}</h1>

        <Card>
          <CardHeader>
            <CardTitle>{t('commissions.agentReports')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>{t('commissions.rate')}</TableHead>
                  <TableHead>{t('commissions.totalEarned')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCommissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell className="font-medium">{commission.agent}</TableCell>
                    <TableCell>{commission.rate}</TableCell>
                    <TableCell>{commission.totalEarned}</TableCell>
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
