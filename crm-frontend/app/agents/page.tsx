'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, UserPlus } from 'lucide-react';

const mockAgents = [
  { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', balance: '$5,230', licenses: 50 },
  { id: 2, name: 'Sara Hassan', email: 'sara@example.com', balance: '$3,450', licenses: 30 },
  { id: 3, name: 'Omar Khalil', email: 'omar@example.com', balance: '$7,890', licenses: 75 },
];

export default function AgentsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">{t('agents.title')}</h1>
          <Button>
            <Plus className="me-2 h-4 w-4" />
            {t('agents.addAgent')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('agents.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('agents.name')}</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>{t('agents.balance')}</TableHead>
                  <TableHead>{t('agents.licenses')}</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.balance}</TableCell>
                    <TableCell>{agent.licenses}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <UserPlus className="me-2 h-4 w-4" />
                        {t('agents.assignLicense')}
                      </Button>
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
