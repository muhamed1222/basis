
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { performanceMonitor } from '../utils/performance';

describe('Performance Monitor', () => {
  beforeEach(() => {
    performanceMonitor.clearErrors();
  });

  it('should track render performance', () => {
    performanceMonitor.measureRender('TestComponent', 16.5);
    
    const metrics = performanceMonitor.getMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('render_TestComponent');
    expect(metrics[0].value).toBe(16.5);
  });

  it('should track API call duration', () => {
    performanceMonitor.measureApiCall('/api/projects', 250);
    
    const metrics = performanceMonitor.getMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('api__api_projects');
    expect(metrics[0].value).toBe(250);
  });

  it('should limit metrics storage', () => {
    // Добавляем много метрик
    for (let i = 0; i < 1100; i++) {
      performanceMonitor.measureRender(`Component${i}`, i);
    }
    
    const metrics = performanceMonitor.getMetrics();
    expect(metrics.length).toBeLessThanOrEqual(500);
  });
});
