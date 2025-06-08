
import { z } from 'zod';

const API_BASE = '/api';

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  schema?: z.ZodType<T>
): Promise<T> {
  // Проверяем rate limit
  if (!checkRateLimit(endpoint)) {
    throw new ApiError(429, 'Слишком много запросов. Попробуйте позже.');
  }

  const url = `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.message || 'API Error', errorData);
  }

  const data = await response.json();
  
  if (schema) {
    return schema.parse(data);
  }
  
  return data;
}

export async function fetchJson<T>(
  endpoint: string,
  schema?: z.ZodType<T>,
  options?: RequestInit
): Promise<T> {
  return request(endpoint, options, schema);
}

export async function postJson<T>(
  endpoint: string,
  data: any,
  schema?: z.ZodType<T>
): Promise<T> {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }, schema);
}

export async function putJson<T>(
  endpoint: string,
  data: any,
  schema?: z.ZodType<T>
): Promise<T> {
  return request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, schema);
}

export async function deleteJson<T>(
  endpoint: string,
  schema?: z.ZodType<T>
): Promise<T> {
  return request(endpoint, {
    method: 'DELETE',
  }, schema);
}

// Простое кэширование
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 минут

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_PER_MINUTE = 60;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута

function checkRateLimit(endpoint: string): boolean {
  const now = Date.now();
  const key = endpoint;
  const existing = rateLimitMap.get(key);
  
  if (!existing || now > existing.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (existing.count >= RATE_LIMIT_PER_MINUTE) {
    return false;
  }
  
  existing.count += 1;
  return true;
}

export async function fetchWithCache<T>(
  endpoint: string,
  schema?: z.ZodType<T>
): Promise<T> {
  const cached = cache.get(endpoint);
  const now = Date.now();
  
  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetchJson(endpoint, schema);
  cache.set(endpoint, { data, timestamp: now });
  
  return data;
}

export function clearCache(endpoint?: string) {
  if (endpoint) {
    cache.delete(endpoint);
  } else {
    cache.clear();
  }
}
