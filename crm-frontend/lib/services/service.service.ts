import { api } from '../api-client';
import { API_CONFIG } from '../config';

export interface ServiceRequestDto {
  id: string;
  requestNumber: string;
  customerId: string;
  customerName?: string;
  type: string;
  description: string;
  status: number; // 1: New, 2: InProgress, 3: Closed, 4: Cancelled
  requestDate: string;
  completedDate?: string;
}

export interface CreateServiceRequestDto {
  customerId: string;
  type: string;
  description: string;
}

export interface UpdateServiceRequestDto {
  type?: string;
  description?: string;
  status?: number;
}

class ServiceRequestService {
  async getAll(): Promise<ServiceRequestDto[]> {
    return api.get<ServiceRequestDto[]>(API_CONFIG.ENDPOINTS.SERVICES);
  }

  async getById(id: string): Promise<ServiceRequestDto> {
    return api.get<ServiceRequestDto>(`${API_CONFIG.ENDPOINTS.SERVICES}/${id}`);
  }

  async create(data: CreateServiceRequestDto): Promise<ServiceRequestDto> {
    return api.post<ServiceRequestDto>(API_CONFIG.ENDPOINTS.SERVICES, data);
  }

  async update(id: string, data: UpdateServiceRequestDto): Promise<ServiceRequestDto> {
    return api.put<ServiceRequestDto>(`${API_CONFIG.ENDPOINTS.SERVICES}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return api.delete(`${API_CONFIG.ENDPOINTS.SERVICES}/${id}`);
  }

  async updateStatus(id: string, status: number): Promise<void> {
    return api.patch(`${API_CONFIG.ENDPOINTS.SERVICES}/${id}/status`, { status });
  }
}

export const serviceRequestService = new ServiceRequestService();
