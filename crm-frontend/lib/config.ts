// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  TIMEOUT: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REFRESH: '/api/auth/refresh',
    },
    USERS: '/api/users',
    CUSTOMERS: '/api/customers',
    PRODUCTS: '/api/products',
    SALES: '/api/sales',
    SERVICES: '/api/services',
    AGENTS: '/api/agents',
    COMMISSIONS: '/api/commissions',
    AUDIT_LOGS: '/api/auditlogs',
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'CRM System',
  VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'ar',
  SUPPORTED_LANGUAGES: ['ar', 'en'],
} as const;
