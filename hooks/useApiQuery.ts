import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { ZodSchema } from 'zod';
import { fetchJson, ApiOptions } from '../services/api';

export function useApiQuery<T>(
  key: string | unknown[],
  url: string,
  schema: ZodSchema<T>,
  options?: ApiOptions,
  queryOptions?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => fetchJson(url, schema, options),
    ...(queryOptions || {}),
  });
}
