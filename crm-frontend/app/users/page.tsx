'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash, Loader2 } from 'lucide-react';
import { UserDto, userService } from '@/lib/services/user.service';
import { UserFormDialog } from '@/components/users/user-form-dialog';

// Role mapping
const roleNames: Record<string, string> = {
  '1': 'Admin',
  'Admin': 'Admin',
  '2': 'Agent',
  'Agent': 'Agent',
  '3': 'Accountant',
  'Accountant': 'Accountant',
};

export default function UsersPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated, user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadUsers();
  }, [isAuthenticated, router]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await userService.getAll();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormDialogOpen(true);
  };

  const handleEditUser = (user: UserDto) => {
    setSelectedUser(user);
    setFormDialogOpen(true);
  };

  const handleFormSuccess = () => {
    loadUsers();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('users.title')}</h1>
          </div>
          {currentUser?.role === 'admin' && (
            <Button onClick={handleAddUser}>
              <Plus className="me-2 h-4 w-4" />
              {t('users.addUser')}
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('users.title')}</CardTitle>
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
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('common.noData')}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('users.name')}</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>{t('users.role')}</TableHead>
                    <TableHead>{t('users.status')}</TableHead>
                    {currentUser?.role === 'admin' && (
                      <TableHead>{t('users.actions')}</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{roleNames[user.role] || user.role}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          user.isActive
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {user.isActive ? t('users.active') : t('users.inactive')}
                        </span>
                      </TableCell>
                      {currentUser?.role === 'admin' && (
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog */}
      <UserFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        user={selectedUser}
        onSuccess={handleFormSuccess}
      />
    </DashboardLayout>
  );
}
