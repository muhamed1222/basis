
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
