import { useCallback, useState } from 'react';
import { useAuth as useAuthContext } from '../contexts/AuthContext';
import * as auth from '../services/auth';

export function useAuth() {
  const ctx = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const u = await auth.getCurrentUser();
      ctx.updateUser(u);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [ctx]);

  return {
    ...ctx,
    loading,
    error,
    isAuthenticated: Boolean(ctx.user),
    refreshUser,
  };
}

export default useAuth;
