import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppRoutes } from './routes';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 минут
      cacheTime: 10 * 60 * 1000, // 10 минут
    },
  },
});

function App() {
  return (
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <AppRoutes />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );
}

export default App;
