import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIRecommendations } from "@/hooks/useAIRecommendations";
import { Button } from "@/components/ui/button";
import { Sparkles, X, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/categories";

export const AIRecommendations = () => {
  const { recommendations, isLoading, generateRecommendations, isGenerating, dismissRecommendation } = useAIRecommendations();
  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton className="h-[400px]" />;
  }

  const getCategory = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return "destructive";
    if (priority >= 3) return "default";
    return "secondary";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            AI-Empfehlungen
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={() => generateRecommendations()}
            disabled={isGenerating}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            Aktualisieren
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!recommendations || recommendations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Sparkles className="w-12 h-12 mb-4 opacity-50" />
            <p>Keine Empfehlungen verfügbar</p>
            <p className="text-sm mb-4">Klicke auf Aktualisieren, um personalisierte Empfehlungen zu erhalten</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.map((rec) => {
              const category = getCategory(rec.category_id);
              return (
                <div
                  key={rec.id}
                  className="p-4 border border-border rounded-lg hover:bg-card-hover transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {category && <category.icon className="w-4 h-4 text-accent" />}
                        <span className="font-medium text-sm">
                          {category?.title || rec.category_id}
                        </span>
                        <Badge variant={getPriorityColor(rec.priority)} className="text-xs">
                          Priorität {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {rec.recommendation_reason}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/learn/${rec.category_id}`)}
                        >
                          Jetzt lernen
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dismissRecommendation(rec.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};