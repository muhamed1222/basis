
import { useState, useEffect, useCallback, useRef } from 'react';
import { z } from 'zod';
import { fetchWithCache, clearCache } from '../services/api';

interface UseApiQueryOptions {
  enabled?: boolean;
  refetchInterval?: number;
  staleTime?: number;
  cacheTime?: number;
}

export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

interface UseApiQueryResult<T> {
  data: T | undefined;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
  invalidate: () => void;
  isError: boolean;
  isSuccess: boolean;
}

export function useApiQuery<T>(
  endpoint: string,
  schema?: z.ZodType<T>,
  options: UseApiQueryOptions = {}
): UseApiQueryResult<T> {
  const {
    enabled = true,
    refetchInterval,
    staleTime = 5 * 60 * 1000, // 5 минут
  } = options;

  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    // Отменяем предыдущий запрос
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const result = await fetchWithCache(endpoint, schema);
      setData(result);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        const apiError: ApiError = {
          status: (err as any).status || 500,
          message: err.message || 'Неизвестная ошибка',
          data: (err as any).data
        };
        setError(apiError);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, schema, enabled]);

  const invalidate = useCallback(() => {
    clearCache(endpoint);
    fetchData();
  }, [endpoint, fetchData]);

  // Первоначальная загрузка
  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Периодическое обновление
  useEffect(() => {
    if (refetchInterval && enabled) {
      intervalRef.current = setInterval(fetchData, refetchInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, refetchInterval, enabled]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    invalidate,
    isError: !!error,
    isSuccess: !loading && !error && data !== undefined,
  };
}
