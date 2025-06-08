interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
}

class ErrorReporter {
  private static instance: ErrorReporter;
  private errors: ErrorInfo[] = [];
  private maxErrors = 50;

  static getInstance(): ErrorReporter {
    if (!ErrorReporter.instance) {
      ErrorReporter.instance = new ErrorReporter();
    }
    return ErrorReporter.instance;
  }

  reportError(error: Error, componentStack?: string): void {
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.errors.push(errorInfo);

    // Ограничиваем количество сохраненных ошибок
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Отправляем на сервер (но не блокируем UI)
    this.sendToServer(errorInfo);

    console.error('Зафиксирована ошибка:', errorInfo);
  }

  private async sendToServer(errorInfo: ErrorInfo): Promise<void> {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorInfo),
      });
    } catch (error) {
      // Не выбрасываем ошибку, чтобы не создать бесконечный цикл
      console.warn('Не удалось отправить ошибку на сервер:', error);
    }
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

export const errorReporter = ErrorReporter.getInstance();

// Глобальный обработчик для необработанных ошибок
window.addEventListener('error', (event) => {
  errorReporter.reportError(event.error || new Error(event.message));
});

// Глобальный обработчик для отклоненных промисов
window.addEventListener('unhandledrejection', (event) => {
  errorReporter.reportError(
    event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason))
  );
});

export default ErrorReporter;

export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

export const handleApiError = (error: unknown): ApiError => {
  // Строгая типизация ошибок
  if (error instanceof TypeError) {
    return {
      status: 0,
      message: 'Проблемы с сетью',
      data: null
    };
  }

  if (error && typeof error === 'object' && 'status' in error) {
    return error as ApiError;
  }

  // Fallback для неизвестных ошибок
  return {
    status: 500,
    message: error instanceof Error ? error.message : 'Неизвестная ошибка',
    data: null
  };
};