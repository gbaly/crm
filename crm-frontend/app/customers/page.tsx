'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Loader2, Edit, Trash2 } from 'lucide-react';
import { CustomerDto, customerService } from '@/lib/services/customer.service';
import { CustomerFormDialog } from '@/components/customers/customer-form-dialog';
import { DeleteCustomerDialog } from '@/components/customers/delete-customer-dialog';

export default function CustomersPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadCustomers();
  }, [isAuthenticated, router]);

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load customers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setFormDialogOpen(true);
  };

  const handleEditCustomer = (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setFormDialogOpen(true);
  };

  const handleDeleteCustomer = (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setDeleteDialogOpen(true);
  };

  const handleFormSuccess = () => {
    loadCustomers();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{t('customers.title')}</h1>
          <Button onClick={handleAddCustomer}>
            <Plus className="me-2 h-4 w-4" />
            {t('customers.addCustomer')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('customers.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="p-4 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : customers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('common.noData')}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('customers.name')}</TableHead>
                    <TableHead>{t('customers.email')}</TableHead>
                    <TableHead>{t('customers.phone')}</TableHead>
                    <TableHead>{t('customers.totalPurchases')}</TableHead>
                    <TableHead className="text-center">{t('common.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>${customer.totalPurchases.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCustomer(customer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCustomer(customer)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <CustomerFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        customer={selectedCustomer}
        onSuccess={handleFormSuccess}
      />

      <DeleteCustomerDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        customer={selectedCustomer}
        onSuccess={handleFormSuccess}
      />
    </DashboardLayout>
  );
}
