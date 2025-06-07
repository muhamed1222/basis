import { useToast } from '../components/ToastProvider';

export function useNotification() {
  const { showSuccess, showError } = useToast();

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    if (type === 'success') {
      showSuccess(message);
    } else {
      showError(message);
    }
  };

  return { showNotification };
}

export default useNotification;
