import { useState, useCallback } from 'react';
import { useToast } from '../components/Toast';

export interface AsyncState<T> {
  loading: boolean;
  data?: T;
  error?: unknown;
}

export function useAsync<T>(asyncFn: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ loading: false });
  const { showToast } = useToast();

  const run = useCallback(async () => {
    setState({ loading: true });
    try {
      const data = await asyncFn();
      setState({ loading: false, data });
    } catch (error) {
      setState({ loading: false, error });
      showToast('Ошибка');
    }
  }, [asyncFn]);

  return { ...state, run };
}
