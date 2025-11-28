/**
 * Memory leak detection and monitoring utilities
 */

import { logger } from '@/lib/logger';

interface MemorySnapshot {
  timestamp: number;
  usedJSHeapSize?: number;
  totalJSHeapSize?: number;
  jsHeapSizeLimit?: number;
}

class MemoryMonitor {
  private snapshots: MemorySnapshot[] = [];
  private maxSnapshots = 20;
  private monitoringInterval: NodeJS.Timeout | null = null;

  /**
   * Start monitoring memory usage
   */
  startMonitoring(intervalMs: number = 30000): void {
    if (this.monitoringInterval) {
      logger.warn('Memory monitoring already started');
      return;
    }

    if (typeof window === 'undefined' || !('performance' in window)) {
      logger.warn('Memory monitoring not available in this environment');
      return;
    }

    this.monitoringInterval = setInterval(() => {
      this.takeSnapshot();
    }, intervalMs);

    logger.info('Memory monitoring started');
  }

  /**
   * Stop monitoring memory usage
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      logger.info('Memory monitoring stopped');
    }
  }

  /**
   * Take a memory snapshot
   */
  private takeSnapshot(): void {
    if (!('memory' in performance)) {
      return;
    }

    const memory = (performance as any).memory;
    const snapshot: MemorySnapshot = {
      timestamp: Date.now(),
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    };

    this.snapshots.push(snapshot);

    // Keep only the last N snapshots
    if (this.snapshots.length > this.maxSnapshots) {
      this.snapshots = this.snapshots.slice(-this.maxSnapshots);
    }

    // Check for potential memory leaks
    this.checkForLeaks();
  }

  /**
   * Check for potential memory leaks
   */
  private checkForLeaks(): void {
    if (this.snapshots.length < 5) {
      return; // Need at least 5 snapshots for trend analysis
    }

    const recent = this.snapshots.slice(-5);
    const memoryGrowth = recent.map((s, i) => {
      if (i === 0) return 0;
      return (s.usedJSHeapSize || 0) - (recent[i - 1].usedJSHeapSize || 0);
    });

    const avgGrowth = memoryGrowth.reduce((a, b) => a + b, 0) / memoryGrowth.length;
    const threshold = 5 * 1024 * 1024; // 5MB average growth

    if (avgGrowth > threshold) {
      logger.warn('Potential memory leak detected:', {
        averageGrowth: `${(avgGrowth / 1024 / 1024).toFixed(2)} MB`,
        currentUsage: `${((recent[recent.length - 1].usedJSHeapSize || 0) / 1024 / 1024).toFixed(2)} MB`,
      });
    }
  }

  /**
   * Get current memory usage
   */
  getCurrentUsage(): MemorySnapshot | null {
    if (this.snapshots.length === 0) {
      this.takeSnapshot();
    }
    return this.snapshots[this.snapshots.length - 1] || null;
  }

  /**
   * Get memory usage trend
   */
  getMemoryTrend(): {
    current: number;
    average: number;
    peak: number;
    growth: number;
  } | null {
    if (this.snapshots.length < 2) {
      return null;
    }

    const usages = this.snapshots.map(s => s.usedJSHeapSize || 0);
    const current = usages[usages.length - 1];
    const average = usages.reduce((a, b) => a + b, 0) / usages.length;
    const peak = Math.max(...usages);
    const growth = current - usages[0];

    return {
      current: current / 1024 / 1024, // Convert to MB
      average: average / 1024 / 1024,
      peak: peak / 1024 / 1024,
      growth: growth / 1024 / 1024,
    };
  }

  /**
   * Clear all snapshots
   */
  clearSnapshots(): void {
    this.snapshots = [];
  }
}

export const memoryMonitor = new MemoryMonitor();

// Start monitoring in development
if (import.meta.env.DEV) {
  memoryMonitor.startMonitoring(60000); // Check every minute in dev
}
