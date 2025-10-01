'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { ProductDto, productService } from '@/lib/services/product.service';
import { ProductFormDialog } from '@/components/products/product-form-dialog';

export default function ProductsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadProducts();
  }, [isAuthenticated, router]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await productService.getAll();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormDialogOpen(true);
  };

  const handleEditProduct = (product: ProductDto) => {
    setSelectedProduct(product);
    setFormDialogOpen(true);
  };

  const handleFormSuccess = () => {
    loadProducts();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{t('products.title')}</h1>
          <Button onClick={handleAddProduct}>
            <Plus className="me-2 h-4 w-4" />
            {t('products.addProduct')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('products.title')}</CardTitle>
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
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('common.noData')}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('products.name')}</TableHead>
                    <TableHead>{t('products.category')}</TableHead>
                    <TableHead>{t('products.costPrice')}</TableHead>
                    <TableHead>{t('products.salePrice')}</TableHead>
                    <TableHead>{t('products.stock')}</TableHead>
                    <TableHead className="text-center">{t('common.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.costPrice.toFixed(2)}</TableCell>
                      <TableCell>${product.salePrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          product.stock > product.minStock
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {product.stock}
                          {product.stock <= product.minStock && (
                            <AlertTriangle className="ms-1 h-3 w-3" />
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" disabled>
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

      {/* Dialog */}
      <ProductFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        product={selectedProduct}
        onSuccess={handleFormSuccess}
      />
    </DashboardLayout>
  );
}
