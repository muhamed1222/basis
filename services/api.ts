export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

import { ZodSchema } from 'zod';

export async function fetchJson<T>(
  url: string,
  schema: ZodSchema<T>,
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers } = options;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    let message = `HTTP error ${response.status}`;
    try {
      const err = await response.json();
      message = err.error || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  const json = await response.json();
  return schema.parse(json);
}
