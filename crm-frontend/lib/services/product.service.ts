import { api } from '../api-client';
import { API_CONFIG } from '../config';

export interface ProductDto {
  id: string;
  name: string;
  description?: string;
  category: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  createdAt: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  category: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  category?: string;
  costPrice?: number;
  salePrice?: number;
  stock?: number;
  minStock?: number;
}

class ProductService {
  async getAll(): Promise<ProductDto[]> {
    return api.get<ProductDto[]>(API_CONFIG.ENDPOINTS.PRODUCTS);
  }

  async getById(id: string): Promise<ProductDto> {
    return api.get<ProductDto>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
  }

  async create(data: CreateProductDto): Promise<ProductDto> {
    return api.post<ProductDto>(API_CONFIG.ENDPOINTS.PRODUCTS, data);
  }

  async update(id: string, data: UpdateProductDto): Promise<ProductDto> {
    return api.put<ProductDto>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return api.delete(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
  }
}

export const productService = new ProductService();
