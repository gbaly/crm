import { api } from '../api-client';
import { API_CONFIG } from '../config';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: number; // 1: Admin, 2: Agent, 3: Accountant
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: number;
  isActive?: boolean;
}

class UserService {
  async getAll(): Promise<UserDto[]> {
    return api.get<UserDto[]>(API_CONFIG.ENDPOINTS.USERS);
  }

  async getById(id: string): Promise<UserDto> {
    return api.get<UserDto>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
  }

  async create(data: CreateUserDto): Promise<UserDto> {
    return api.post<UserDto>(API_CONFIG.ENDPOINTS.USERS, data);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserDto> {
    return api.put<UserDto>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return api.delete(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
  }
}

export const userService = new UserService();
