
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  measureRender(componentName: string, renderTime: number): void {
    this.addMetric(`render_${componentName}`, renderTime);
  }

  measureApiCall(endpoint: string, duration: number): void {
    this.addMetric(`api_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`, duration);
  }

  measureBundleSize(): void {
    if ('performance' in window && 'navigation' in performance) {
      const nav = performance.navigation as any;
      if (nav.transferSize) {
        this.addMetric('bundle_size', nav.transferSize);
      }
    }
  }

  private addMetric(name: string, value: number): void {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now()
    });

    // Ограничиваем количество метрик
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-500);
    }

    // В продакшене отправлять на сервер
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(name, value);
    }
  }

  private async sendToAnalytics(name: string, value: number): Promise<void> {
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metric: name, value, timestamp: Date.now() })
      });
    } catch (error) {
      // Тихо игнорируем ошибки аналитики
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// HOC для измерения производительности компонентов
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
): React.ComponentType<P> {
  return React.memo((props: P) => {
    const startTime = performance.now();

    React.useEffect(() => {
      const endTime = performance.now();
      performanceMonitor.measureRender(componentName, endTime - startTime);
    });

    return <Component {...props} />;
  });
}
