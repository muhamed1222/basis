
import { z } from 'zod';

// Схемы валидации
const profileSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  slug: z.string().min(3).max(50).regex(/^[a-zA-Z0-9-_]+$/),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  cover: z.string().url().optional(),
  theme: z.enum(['light', 'dark', 'auto']).default('light'),
  layout: z.enum(['default', 'minimal', 'creative']).default('default'),
  isPublic: z.boolean().default(true),
  blocks: z.array(z.object({
    id: z.string(),
    type: z.enum(['text', 'button', 'divider', 'image', 'video']),
    content: z.record(z.any()),
    order: z.number()
  })).default([])
});

type Profile = z.infer<typeof profileSchema>;

// Простой кэш с TTL
class Cache {
  private cache = new Map<string, { data: any; expires: number }>();
  private defaultTTL = 5 * 60 * 1000; // 5 минут

  set(key: string, data: any, ttl?: number): void {
    const expires = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { data, expires });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

class ApiService {
  private baseUrl = '/api';
  private cache = new Cache();

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useCache = true
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const cacheKey = `${options.method || 'GET'}:${url}`;

    // Проверяем кэш для GET запросов
    if (useCache && (!options.method || options.method === 'GET')) {
      const cached = this.cache.get(cacheKey);
      if (cached) return cached;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд

    // Получаем CSRF токен для небезопасных методов
    let csrfToken = '';
    if (options.method && !['GET', 'HEAD', 'OPTIONS'].includes(options.method)) {
      try {
        const csrfResponse = await fetch('/api/csrf-token', {
          credentials: 'include'
        });
        if (csrfResponse.ok) {
          const csrfData = await csrfResponse.json();
          csrfToken = csrfData.token;
        }
      } catch (error) {
        console.warn('Не удалось получить CSRF токен:', error);
      }
    }

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Кэшируем GET запросы
      if (useCache && (!options.method || options.method === 'GET')) {
        this.cache.set(cacheKey, data);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Превышено время ожидания запроса');
      }
      throw error;
    }
  }

  // Профили
  async getProfile(slug: string): Promise<Profile> {
    const data = await this.request<Profile>(`/profiles/${slug}`);
    return profileSchema.parse(data);
  }

  async updateProfile(slug: string, updates: Partial<Profile>): Promise<Profile> {
    const data = await this.request<Profile>(`/profiles/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }, false);

    // Инвалидируем кэш
    this.cache.delete(`GET:/api/profiles/${slug}`);
    
    return profileSchema.parse(data);
  }

  async createProfile(profile: Omit<Profile, 'id'>): Promise<Profile> {
    const data = await this.request<Profile>('/profiles', {
      method: 'POST',
      body: JSON.stringify(profile),
    }, false);

    return profileSchema.parse(data);
  }

  async deleteProfile(slug: string): Promise<void> {
    await this.request(`/profiles/${slug}`, {
      method: 'DELETE',
    }, false);

    this.cache.delete(`GET:/api/profiles/${slug}`);
  }

  // Аналитика
  async getAnalytics(slug: string, period = '30d'): Promise<any> {
    return this.request(`/analytics/${slug}?period=${period}`);
  }

  // Загрузка файлов
  async uploadFile(file: File, type: 'avatar' | 'cover' | 'image'): Promise<{ url: string }> {
    // Валидация файла
    const maxSize = type === 'avatar' ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error(`Файл слишком большой. Максимум ${maxSize / 1024 / 1024}MB`);
    }

    // Проверка MIME типа
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Поддерживаются только JPEG, PNG и WebP');
    }

    // Проверка реального содержимого файла
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Magic numbers для проверки реального типа файла
    const isJPEG = uint8Array[0] === 0xFF && uint8Array[1] === 0xD8;
    const isPNG = uint8Array[0] === 0x89 && uint8Array[1] === 0x50 && uint8Array[2] === 0x4E && uint8Array[3] === 0x47;
    const isWebP = uint8Array[8] === 0x57 && uint8Array[9] === 0x45 && uint8Array[10] === 0x42 && uint8Array[11] === 0x50;
    
    if (!isJPEG && !isPNG && !isWebP) {
      throw new Error('Файл поврежден или не является изображением');
    }

    // Расширенная проверка на вредоносное содержимое
    const fileContent = new TextDecoder('utf-8', { fatal: false }).decode(uint8Array.slice(0, 2048));
    const dangerousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /data:text\/html/gi,
      /vbscript:/gi,
      /<iframe/gi,
      /<embed/gi,
      /<object/gi,
      /<link.*rel.*stylesheet/gi,
      /<?php/gi,
      /<%.*%>/gi,
      /\bon\w+\s*=/gi // события onclick, onload и т.д.
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(fileContent)) {
        throw new Error('Файл содержит потенциально опасный код');
      }
    }

    // Дополнительная проверка EXIF данных для изображений
    if (isJPEG) {
      const exifStart = uint8Array.indexOf(0xFF, 2);
      if (exifStart > 0) {
        const exifData = uint8Array.slice(exifStart, exifStart + 1024);
        const exifString = new TextDecoder('utf-8', { fatal: false }).decode(exifData);
        if (dangerousPatterns.some(pattern => pattern.test(exifString))) {
          throw new Error('EXIF данные содержат опасный код');
        }
      }
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки файла');
    }

    return response.json();
  }

  // Проверка доступности slug
  async checkSlugAvailability(slug: string): Promise<{ available: boolean }> {
    return this.request(`/slugs/check?slug=${encodeURIComponent(slug)}`);
  }

  // Очистка кэша
  clearCache(): void {
    this.cache.clear();
  }
}

export const apiService = new ApiService();
export type { Profile };
