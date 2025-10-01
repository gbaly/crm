import { api } from '../api-client';
import { API_CONFIG } from '../config';

export interface CustomerDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  totalPurchases: number;
  createdAt: string;
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface UpdateCustomerDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

class CustomerService {
  async getAll(): Promise<CustomerDto[]> {
    return api.get<CustomerDto[]>(API_CONFIG.ENDPOINTS.CUSTOMERS);
  }

  async getById(id: string): Promise<CustomerDto> {
    return api.get<CustomerDto>(`${API_CONFIG.ENDPOINTS.CUSTOMERS}/${id}`);
  }

  async create(data: CreateCustomerDto): Promise<CustomerDto> {
    return api.post<CustomerDto>(API_CONFIG.ENDPOINTS.CUSTOMERS, data);
  }

  async update(id: string, data: UpdateCustomerDto): Promise<CustomerDto> {
    return api.put<CustomerDto>(`${API_CONFIG.ENDPOINTS.CUSTOMERS}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return api.delete(`${API_CONFIG.ENDPOINTS.CUSTOMERS}/${id}`);
  }
}

export const customerService = new CustomerService();
