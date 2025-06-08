
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

// Настройка React Query с оптимизацией
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут (заменяет cacheTime)
      retry: (failureCount, error: any) => {
        // Не повторяем запросы для 4xx ошибок
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Глобальный обработчик ошибок
const GlobalErrorHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Необработанная ошибка Promise:', event.reason);
      // В продакшене отправлять на сервер логирования
    };

    const handleError = (event: ErrorEvent) => {
      console.error('Глобальная ошибка:', event.error);
      // В продакшене отправлять на сервер логирования
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return <>{children}</>;
};

// Компонент загрузки
const AppLoading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Загрузка приложения...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <GlobalErrorHandler>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AuthProvider>
                <div className="App min-h-screen bg-gray-50">
                  <Suspense fallback={<AppLoading />}>
                    <Routes />
                  </Suspense>
                  
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    toastClassName="text-sm"
                  />
                  
                  {process.env.NODE_ENV === 'development' && (
                    <ReactQueryDevtools initialIsOpen={false} />
                  )}
                </div>
              </AuthProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </HelmetProvider>
      </GlobalErrorHandler>
    </ErrorBoundary>
  );
};

export default App;
