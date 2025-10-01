import { api } from '../api-client';
import { API_CONFIG } from '../config';

export interface SaleItemDto {
  productId: string;
  productName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SaleDto {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName?: string;
  agentId?: string;
  agentName?: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentType: number; // 0: Cash, 1: Card, 2: Credit
  saleDate: string;
  isPaid: boolean;
  items: SaleItemDto[];
}

export interface CreateSaleDto {
  customerId: string;
  agentId?: string;
  paymentType: number;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}

class SaleService {
  async getAll(): Promise<SaleDto[]> {
    return api.get<SaleDto[]>(API_CONFIG.ENDPOINTS.SALES);
  }

  async getById(id: string): Promise<SaleDto> {
    return api.get<SaleDto>(`${API_CONFIG.ENDPOINTS.SALES}/${id}`);
  }

  async create(data: CreateSaleDto): Promise<SaleDto> {
    return api.post<SaleDto>(API_CONFIG.ENDPOINTS.SALES, data);
  }

  async delete(id: string): Promise<void> {
    return api.delete(`${API_CONFIG.ENDPOINTS.SALES}/${id}`);
  }

  async addPayment(saleId: string, amount: number, paymentType: number): Promise<void> {
    return api.post(`${API_CONFIG.ENDPOINTS.SALES}/${saleId}/payments`, {
      amount,
      paymentType,
    });
  }
}

export const saleService = new SaleService();
