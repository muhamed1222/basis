
import { z } from 'zod';

// Схемы валидации
const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Пароль должен быть не менее 8 символов')
});

const registerSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Пароль должен содержать заглавные, строчные буквы и цифры'),
  name: z.string().min(2, 'Имя должно быть не менее 2 символов').max(50)
});

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  isVerified: boolean;
}

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

class AuthService {
  private baseUrl = '/api/auth';
  private token: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.initializeTokens();
  }

  private async initializeTokens(): Promise<void> {
    try {
      // Пытаемся получить токены из httpOnly cookies через API
      const response = await fetch('/api/auth/verify', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        this.token = data.token;
        this.refreshToken = data.refreshToken;
      } else {
        // Fallback к sessionStorage
        this.token = sessionStorage.getItem('auth_token');
        this.refreshToken = sessionStorage.getItem('refresh_token');
      }
    } catch (error) {
      console.warn('Ошибка инициализации токенов:', error);
      // Fallback к sessionStorage
      this.token = sessionStorage.getItem('auth_token');
      this.refreshToken = sessionStorage.getItem('refresh_token');
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const validatedData = loginSchema.parse({ email, password });
    
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка входа');
    }

    const data: AuthResponse = await response.json();
    this.setTokens(data.token, data.refreshToken);
    return data;
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const validatedData = registerSchema.parse({ email, password, name });
    
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка регистрации');
    }

    const data: AuthResponse = await response.json();
    this.setTokens(data.token, data.refreshToken);
    return data;
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.token) return null;

    try {
      const response = await this.makeAuthenticatedRequest('/api/user/me');
      return await response.json();
    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.refreshToken) {
        await fetch(`${this.baseUrl}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });
      }
    } catch (error) {
      console.error('Ошибка выхода:', error);
    } finally {
      this.clearTokens();
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    if (!this.refreshToken) return null;

    try {
      const response = await fetch(`${this.baseUrl}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const data = await response.json();
      this.setTokens(data.token, data.refreshToken);
      return data.token;
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      this.clearTokens();
      return null;
    }
  }

  private async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    if (!this.token) {
      throw new Error('Пользователь не авторизован');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (response.status === 401) {
      const newToken = await this.refreshAccessToken();
      if (newToken) {
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`,
          },
        });
      } else {
        throw new Error('Сессия истекла');
      }
    }

    return response;
  }

  private async setTokens(token: string, refreshToken: string): Promise<void> {
    this.token = token;
    this.refreshToken = refreshToken;
    
    // Отправляем токены на сервер для установки httpOnly cookies
    try {
      await fetch('/api/auth/set-cookies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, refreshToken }),
        credentials: 'include'
      });
    } catch (error) {
      console.error('Ошибка установки cookies:', error);
      // Fallback для совместимости
      try {
        sessionStorage.setItem('auth_token', token);
        sessionStorage.setItem('refresh_token', refreshToken);
      } catch (e) {
        console.warn('SessionStorage недоступен');
      }
    }
  }

  private clearTokens(): void {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  isAuthenticated(): boolean {
    if (!this.token) return false;
    
    try {
      // Простая проверка структуры JWT без верификации подписи
      const parts = this.token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);
      
      // Проверяем срок действия
      if (payload.exp && payload.exp < now) {
        this.clearTokens();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Ошибка валидации токена:', error);
      this.clearTokens();
      return false;
    }
  }

  getToken(): string | null {
    return this.token;
  }
}

export const authService = new AuthService();
export type { User, AuthResponse };
