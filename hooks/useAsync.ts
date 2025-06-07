import { useState, useCallback } from 'react';
import { useToast } from '../components/ToastProvider';

export interface AsyncState<T> {
  loading: boolean;
  data?: T;
  error?: unknown;
}

export function useAsync<T>(asyncFn: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ loading: false });
  const { showError } = useToast();

  const run = useCallback(async () => {
    setState({ loading: true });
    try {
      const data = await asyncFn();
      setState({ loading: false, data });
    } catch (error) {
      setState({ loading: false, error });
      showError('Ошибка');
    }
  }, [asyncFn]);

  return { ...state, run };
}
