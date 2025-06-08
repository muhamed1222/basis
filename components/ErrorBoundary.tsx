import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ retry: () => void }>;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const DefaultErrorFallback: React.FC<{ retry: () => void }> = ({ retry }) => (
  <div className="min-h-[200px] flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
    <div className="text-red-600 text-center mb-4">
      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h3 className="text-lg font-semibold">Что-то пошло не так</h3>
      <p className="text-sm text-red-500 mt-1">Произошла непредвиденная ошибка</p>
    </div>
    <button
      onClick={retry}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Попробовать снова
    </button>
  </div>
);

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    
    // В продакшене отправлять на сервер логирования
    if (process.env.NODE_ENV === 'production') {
      // sendErrorToLogging(error, errorInfo);
    }orInfo);
    }
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent retry={this.retry} />;
    }

    return this.props.children;
  }
}children;
  }
}
