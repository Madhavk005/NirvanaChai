import { useEffect, useRef, useCallback } from "react";

interface PerformanceMetrics {
  pageLoadTime: number;
  timeToInteractive: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

interface PerformanceObserver {
  observe: (entry: any) => void;
  disconnect: () => void;
}

export function usePerformance() {
  const metricsRef = useRef<PerformanceMetrics>({
    pageLoadTime: 0,
    timeToInteractive: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
  });

  const observersRef = useRef<PerformanceObserver[]>([]);

  const logMetric = useCallback((name: string, value: number) => {
if (import.meta.env.DEV) {
  console.log(`Performance Metric - ${name}:`, value);
}
  
// Send to analytics service in production
if (import.meta.env.PROD) {
  // Example: send to analytics
  // analytics.track('performance_metric', { name, value });
}
  }, []);

  const measurePageLoad = useCallback(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;

      if (navigation) {
        const pageLoadTime =
          navigation.loadEventEnd - navigation.loadEventStart;
        metricsRef.current.pageLoadTime = pageLoadTime;
        logMetric("Page Load Time", pageLoadTime);
      }
    }
  }, [logMetric]);

  const measureTimeToInteractive = useCallback(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;

      if (navigation) {
        const timeToInteractive =
          navigation.domInteractive - navigation.fetchStart;
        metricsRef.current.timeToInteractive = timeToInteractive;
        logMetric("Time to Interactive", timeToInteractive);
      }
    }
  }, [logMetric]);

  const setupWebVitals = useCallback(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    // First Contentful Paint
    try {
      const fcpObserver = new (window as any).PerformanceObserver(
        (list: any) => {
          const entries = list.getEntries();
          const fcp = entries[entries.length - 1];
          metricsRef.current.firstContentfulPaint = fcp.startTime;
          logMetric("First Contentful Paint", fcp.startTime);
        },
      );
      fcpObserver.observe({ entryTypes: ["paint"] });
      observersRef.current.push(fcpObserver);
    } catch (error) {
      console.warn("FCP observer not supported:", error);
    }

    // Largest Contentful Paint
    try {
      const lcpObserver = new (window as any).PerformanceObserver(
        (list: any) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          metricsRef.current.largestContentfulPaint = lcp.startTime;
          logMetric("Largest Contentful Paint", lcp.startTime);
        },
      );
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      observersRef.current.push(lcpObserver);
    } catch (error) {
      console.warn("LCP observer not supported:", error);
    }

    // Cumulative Layout Shift
    try {
      const clsObserver = new (window as any).PerformanceObserver(
        (list: any) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          metricsRef.current.cumulativeLayoutShift = clsValue;
          logMetric("Cumulative Layout Shift", clsValue);
        },
      );
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      observersRef.current.push(clsObserver);
    } catch (error) {
      console.warn("CLS observer not supported:", error);
    }
  }, [logMetric]);

  const measureComponentRender = useCallback(
    (componentName: string) => {
      const startTime = performance.now();

      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        logMetric(`${componentName} Render Time`, renderTime);
      };
    },
    [logMetric],
  );

  const measureAsyncOperation = useCallback(
    async <T>(
      operationName: string,
      operation: () => Promise<T>,
    ): Promise<T> => {
      const startTime = performance.now();

      try {
        const result = await operation();
        const endTime = performance.now();
        const duration = endTime - startTime;
        logMetric(`${operationName} Duration`, duration);
        return result;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        logMetric(`${operationName} Error Duration`, duration);
        throw error;
      }
    },
    [logMetric],
  );

  useEffect(() => {
    // Measure initial page load
    if (document.readyState === "complete") {
      measurePageLoad();
      measureTimeToInteractive();
    } else {
      window.addEventListener("load", () => {
        measurePageLoad();
        measureTimeToInteractive();
      });
    }

    // Setup Web Vitals
    setupWebVitals();

    // Cleanup observers on unmount
    return () => {
      observersRef.current.forEach((observer) => {
        try {
          observer.disconnect();
        } catch (error) {
          console.warn("Error disconnecting observer:", error);
        }
      });
    };
  }, [measurePageLoad, measureTimeToInteractive, setupWebVitals]);

  return {
    metrics: metricsRef.current,
    measureComponentRender,
    measureAsyncOperation,
    logMetric,
  };
}

// Hook for measuring specific component performance
export function useComponentPerformance(componentName: string) {
  const { measureComponentRender } = usePerformance();

  useEffect(() => {
    const cleanup = measureComponentRender(componentName);
    return cleanup;
  }, [componentName, measureComponentRender]);
}

// Hook for measuring API calls
export function useApiPerformance() {
  const { measureAsyncOperation } = usePerformance();

  const measureApiCall = useCallback(
    async <T>(apiCall: () => Promise<T>, endpoint: string): Promise<T> => {
      return measureAsyncOperation(`API Call - ${endpoint}`, apiCall);
    },
    [measureAsyncOperation],
  );

  return { measureApiCall };
}
