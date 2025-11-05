import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { errorTracker } from '@/lib/errorTracking';
import { performanceMonitor } from '@/lib/performanceMonitoring';
import { AlertCircle, Activity, Trash2, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export const ErrorConsole = () => {
  const [errors, setErrors] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<Record<string, number[]>>({});
  const [autoRefresh, setAutoRefresh] = useState(false);

  const loadData = () => {
    setErrors(errorTracker.getErrors());
    
    const metricsData: Record<string, number[]> = {};
    ['page_load', 'api_response', 'database_query', 'render_time'].forEach(metricName => {
      metricsData[metricName] = performanceMonitor.getLocalMetrics(metricName);
    });
    setMetrics(metricsData);
  };

  useEffect(() => {
    loadData();
    
    if (autoRefresh) {
      const interval = setInterval(loadData, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const clearErrors = () => {
    errorTracker.clearErrors();
    loadData();
    toast.success('Fehler-Log gelöscht');
  };

  const clearMetrics = () => {
    performanceMonitor.clearMetrics();
    loadData();
    toast.success('Performance-Metriken gelöscht');
  };

  const exportErrors = () => {
    const dataStr = JSON.stringify(errors, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `error-log-${new Date().toISOString()}.json`;
    link.click();
    toast.success('Fehler-Log exportiert');
  };

  const getErrorTypeColor = (message: string) => {
    if (message.toLowerCase().includes('critical')) return 'destructive';
    if (message.toLowerCase().includes('warning')) return 'secondary';
    return 'default';
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('de-DE');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System-Konsole
            </CardTitle>
            <CardDescription>
              Fehler-Tracking und Performance-Monitoring
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-Refresh An' : 'Auto-Refresh Aus'}
            </Button>
            <Button variant="outline" size="sm" onClick={loadData}>
              Aktualisieren
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="errors">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="errors">
              <AlertCircle className="h-4 w-4 mr-2" />
              Fehler ({errors.length})
            </TabsTrigger>
            <TabsTrigger value="performance">
              <Activity className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="errors" className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearErrors} disabled={errors.length === 0}>
                <Trash2 className="h-4 w-4 mr-2" />
                Löschen
              </Button>
              <Button variant="outline" size="sm" onClick={exportErrors} disabled={errors.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Exportieren
              </Button>
            </div>

            {errors.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Keine Fehler aufgezeichnet
              </div>
            ) : (
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {errors.map((error, index) => (
                    <Card key={index} className="border-l-4 border-l-destructive">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <Badge variant={getErrorTypeColor(error.message)}>
                              {error.message.includes('Unhandled') ? 'Unhandled' : 'Error'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(error.timestamp)}
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="font-medium text-sm">{error.message}</p>
                            {error.userId && (
                              <p className="text-xs text-muted-foreground">
                                User ID: {error.userId}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              URL: {error.url}
                            </p>
                          </div>

                          {error.stack && (
                            <details className="text-xs">
                              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                                Stack Trace
                              </summary>
                              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                                {error.stack}
                              </pre>
                            </details>
                          )}

                          {error.componentStack && (
                            <details className="text-xs">
                              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                                Component Stack
                              </summary>
                              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                                {error.componentStack}
                              </pre>
                            </details>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Button variant="outline" size="sm" onClick={clearMetrics}>
              <Trash2 className="h-4 w-4 mr-2" />
              Metriken löschen
            </Button>

            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(metrics).map(([name, values]) => {
                const avg = values.length > 0 
                  ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
                  : 0;
                const min = values.length > 0 ? Math.round(Math.min(...values)) : 0;
                const max = values.length > 0 ? Math.round(Math.max(...values)) : 0;

                return (
                  <Card key={name}>
                    <CardHeader>
                      <CardTitle className="text-base capitalize">
                        {name.replace(/_/g, ' ')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Messungen:</span>
                          <span className="font-medium">{values.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Durchschnitt:</span>
                          <span className="font-medium">{avg}ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Min / Max:</span>
                          <span className="font-medium">{min}ms / {max}ms</span>
                        </div>
                        
                        {values.length > 0 && (
                          <details className="text-xs mt-2">
                            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                              Alle Werte anzeigen
                            </summary>
                            <div className="mt-2 p-2 bg-muted rounded max-h-32 overflow-y-auto">
                              {values.map((v, i) => (
                                <div key={i} className="flex justify-between py-1">
                                  <span>#{i + 1}</span>
                                  <span>{Math.round(v)}ms</span>
                                </div>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {Object.keys(metrics).every(key => metrics[key].length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                Keine Performance-Metriken aufgezeichnet
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
