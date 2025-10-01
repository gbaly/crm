import { api } from '../api-client';
import { API_CONFIG } from '../config';

export interface AuditLogDto {
  id: string;
  userId: string;
  userName?: string;
  userRole: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  timestamp: string;
}

class AuditService {
  async getAll(): Promise<AuditLogDto[]> {
    return api.get<AuditLogDto[]>(API_CONFIG.ENDPOINTS.AUDIT_LOGS);
  }

  async getByUser(userId: string): Promise<AuditLogDto[]> {
    return api.get<AuditLogDto[]>(`${API_CONFIG.ENDPOINTS.AUDIT_LOGS}/user/${userId}`);
  }

  async getByEntity(entity: string, entityId: string): Promise<AuditLogDto[]> {
    return api.get<AuditLogDto[]>(`${API_CONFIG.ENDPOINTS.AUDIT_LOGS}/entity/${entity}/${entityId}`);
  }
}

export const auditService = new AuditService();
