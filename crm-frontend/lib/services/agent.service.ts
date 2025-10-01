import { api } from '../api-client';
import { API_CONFIG } from '../config';

export interface AgentDto {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  balance: number;
  assignedLicenses: number;
  soldLicenses: number;
  createdAt: string;
}

export interface CommissionDto {
  id: string;
  agentId: string;
  agentName?: string;
  saleId: string;
  invoiceNumber?: string;
  type: number; // 0: PercentageOfSale, 1: PercentageOfProfit, 2: FixedAmount
  rate: number;
  amount: number;
  earnedDate: string;
}

class AgentService {
  async getAll(): Promise<AgentDto[]> {
    return api.get<AgentDto[]>(API_CONFIG.ENDPOINTS.AGENTS);
  }

  async getById(id: string): Promise<AgentDto> {
    return api.get<AgentDto>(`${API_CONFIG.ENDPOINTS.AGENTS}/${id}`);
  }

  async getCommissions(agentId: string): Promise<CommissionDto[]> {
    return api.get<CommissionDto[]>(`${API_CONFIG.ENDPOINTS.AGENTS}/${agentId}/commissions`);
  }

  async getAllCommissions(): Promise<CommissionDto[]> {
    return api.get<CommissionDto[]>(API_CONFIG.ENDPOINTS.COMMISSIONS);
  }
}

export const agentService = new AgentService();
