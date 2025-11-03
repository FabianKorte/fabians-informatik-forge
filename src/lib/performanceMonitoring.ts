import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  async trackMetric(name: string, value: number, unit: string = 'ms', metadata: Record<string, any> = {}) {
    try {
      // Store locally for aggregation
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      this.metrics.get(name)?.push(value);

      // Send to database (with throttling)
      if (Math.random() < 0.1) { // Only send 10% of metrics to avoid overload
        await supabase.from('performance_metrics').insert({
          metric_name: name,
          metric_value: value,
          metric_unit: unit,
          metadata,
        });
      }
    } catch (error) {
      logger.error('Failed to track metric:', error);
    }
  }

  trackPageLoad() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        this.trackMetric('page_load', perfData.loadEventEnd - perfData.fetchStart, 'ms', {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
          domInteractive: perfData.domInteractive - perfData.fetchStart,
        });
      }
    });
  }

  async trackApiCall(url: string, duration: number) {
    await this.trackMetric('api_response', duration, 'ms', { url });
  }

  async trackDatabaseQuery(query: string, duration: number) {
    await this.trackMetric('database_query', duration, 'ms', { query });
  }

  async trackRenderTime(componentName: string, duration: number) {
    await this.trackMetric('render_time', duration, 'ms', { component: componentName });
  }

  getLocalMetrics(name: string): number[] {
    return this.metrics.get(name) || [];
  }

  getAverageMetric(name: string): number {
    const values = this.getLocalMetrics(name);
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  clearMetrics() {
    this.metrics.clear();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Auto-track page load
if (typeof window !== 'undefined') {
  performanceMonitor.trackPageLoad();
}
