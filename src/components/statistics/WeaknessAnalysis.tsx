import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLearningAnalytics } from "@/hooks/useLearningAnalytics";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Brain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/categories";

export const WeaknessAnalysis = () => {
  const { weaknesses, isWeaknessLoading } = useLearningAnalytics();
  const navigate = useNavigate();

  if (isWeaknessLoading) {
    return <Skeleton className="h-[400px]" />;
  }

  if (!weaknesses || weaknesses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Schwachstellen-Analyse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Brain className="w-12 h-12 mb-4 opacity-50" />
            <p>Noch keine Daten verfügbar</p>
            <p className="text-sm">Absolviere Module, um deine Schwachstellen zu identifizieren</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getCategory = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Schwachstellen-Analyse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {weaknesses.slice(0, 5).map((weakness) => {
          const category = getCategory(weakness.category_id);
          return (
            <div key={weakness.category_id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {category && <category.icon className="w-4 h-4 text-muted-foreground" />}
                  <span className="font-medium text-sm">
                    {category?.title || weakness.category_name}
                  </span>
                  {weakness.needs_improvement && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Verbesserung nötig
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {weakness.avg_performance}%
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/learn/${weakness.category_id}`)}
                  >
                    Üben
                  </Button>
                </div>
              </div>
              <Progress 
                value={weakness.avg_performance} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {weakness.total_sessions} Lernsessions
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};