import { api } from '../api-client';
import { API_CONFIG } from '../config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  name: string;
  role: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Store token and user info
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        userId: response.userId,
        email: response.email,
        name: response.name,
        role: response.role,
      }));
    }

    return response;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isAgent(): boolean {
    return this.hasRole('Agent');
  }
}

export const authService = new AuthService();
