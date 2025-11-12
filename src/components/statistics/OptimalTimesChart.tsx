import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLearningAnalytics } from "@/hooks/useLearningAnalytics";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const OptimalTimesChart = () => {
  const { optimalTimes, isTimesLoading } = useLearningAnalytics();

  if (isTimesLoading) {
    return <Skeleton className="h-[400px]" />;
  }

  if (!optimalTimes || optimalTimes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Optimale Lernzeiten
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Clock className="w-12 h-12 mb-4 opacity-50" />
            <p>Noch keine Daten verfügbar</p>
            <p className="text-sm">Lerne zu verschiedenen Tageszeiten, um deine beste Zeit zu finden</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatHour = (hour: number) => `${hour}:00`;

  const bestTime = optimalTimes.reduce((best, current) => 
    current.avg_performance > best.avg_performance ? current : best
  , optimalTimes[0]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Optimale Lernzeiten
        </CardTitle>
        {bestTime && (
          <p className="text-sm text-muted-foreground">
            Deine beste Zeit: {formatHour(bestTime.hour)} ({bestTime.avg_performance}% Performance)
          </p>
        )}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={optimalTimes}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="hour"
              tickFormatter={formatHour}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [`${value}%`, 'Performance']}
              labelFormatter={(hour: number) => `Uhrzeit: ${formatHour(hour)}`}
            />
            <Bar
              dataKey="avg_performance"
              fill="hsl(var(--accent))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};