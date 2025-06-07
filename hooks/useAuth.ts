import { useCallback, useState } from 'react';
import { useAuth as useAuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const ctx = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // В реальном приложении здесь можно запрашивать данные пользователя
      // с сервера. Текущее состояние берётся из контекста.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    ...ctx,
    loading,
    error,
    isAuthenticated: Boolean(ctx.user),
    refreshUser,
  };
}

export default useAuth;
