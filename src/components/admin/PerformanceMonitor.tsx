import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Database, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function PerformanceMonitor() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['performance-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const grouped = data.reduce((acc: any, metric) => {
        if (!acc[metric.metric_name]) {
          acc[metric.metric_name] = [];
        }
        acc[metric.metric_name].push({
          value: Number(metric.metric_value),
          time: new Date(metric.created_at).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
        return acc;
      }, {});

      const avgMetrics = Object.entries(grouped).reduce((acc: any, [name, values]: any) => {
        const avg = values.reduce((sum: number, v: any) => sum + v.value, 0) / values.length;
        acc[name] = {
          avg: Math.round(avg * 100) / 100,
          data: values.reverse().slice(-20),
        };
        return acc;
      }, {});

      return avgMetrics;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  const metricIcons: Record<string, any> = {
    page_load: Clock,
    api_response: Zap,
    database_query: Database,
    render_time: Activity,
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics && Object.entries(metrics).map(([name, data]: any) => {
          const Icon = metricIcons[name] || Activity;
          return (
            <Card key={name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                  {name.replace(/_/g, ' ')}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.avg}ms</div>
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={data.data}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance-Verlauf</CardTitle>
        </CardHeader>
        <CardContent>
          {metrics && Object.entries(metrics).map(([name, data]: any) => (
            <div key={name} className="mb-6">
              <h4 className="text-sm font-medium mb-2 capitalize">
                {name.replace(/_/g, ' ')}
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={data.data}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
