import { useState } from "react";
import { useLearningPaths } from "@/hooks/useLearningPaths";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Play, 
  Plus,
  TrendingUp,
  Target,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  title: string;
  type: string;
  completed?: boolean;
}

export function LearningPathsDashboard() {
  const { paths, activePath, isLoading, setActivePath, updateProgress } = useLearningPaths();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-muted animate-pulse rounded-lg" />
        <div className="h-48 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  const getProgressPercentage = (path: typeof activePath) => {
    if (!path || !path.modules || path.modules.length === 0) return 0;
    return (path.current_position / path.modules.length) * 100;
  };

  const getRecommendedModules = (path: typeof activePath) => {
    if (!path || !path.modules) return [];
    const nextModules = path.modules.slice(
      path.current_position, 
      Math.min(path.current_position + 3, path.modules.length)
    );
    return nextModules;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-success';
      case 'intermediate': return 'text-warning';
      case 'advanced': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Anfänger';
      case 'intermediate': return 'Fortgeschritten';
      case 'advanced': return 'Experte';
      default: return difficulty;
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Learning Path */}
      {activePath ? (
        <Card className="border-primary/50 shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {activePath.name}
                </CardTitle>
                <CardDescription>{activePath.description}</CardDescription>
              </div>
              <Badge className={cn("text-xs", getDifficultyColor(activePath.difficulty_level))}>
                {getDifficultyLabel(activePath.difficulty_level)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Overview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gesamtfortschritt</span>
                <span className="font-semibold">
                  {activePath.current_position} / {activePath.modules.length} Module
                </span>
              </div>
              <Progress value={getProgressPercentage(activePath)} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {Math.round(getProgressPercentage(activePath))}% abgeschlossen
              </p>
            </div>

            {/* Current Module */}
            {activePath.current_position < activePath.modules.length && (
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary" />
                  Aktuelles Modul
                </h4>
                <div className="space-y-2">
                  <p className="font-medium">
                    {activePath.modules[activePath.current_position]?.title || 'Unbekannt'}
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      // Navigate to module
                      const module = activePath.modules[activePath.current_position];
                      if (module) {
                        window.location.href = `/learn/${module.categoryId || 'unknown'}`;
                      }
                    }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Modul starten
                  </Button>
                </div>
              </div>
            )}

            {/* Recommended Next Modules */}
            {getRecommendedModules(activePath).length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Empfohlene nächste Module
                </h4>
                <div className="space-y-2">
                  {getRecommendedModules(activePath).map((module: Module, idx: number) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                        idx === 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        {activePath.current_position + idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{module.title}</p>
                        <p className="text-xs text-muted-foreground">{module.type}</p>
                      </div>
                      {idx === 0 && (
                        <Badge variant="outline" className="shrink-0">
                          <Clock className="w-3 h-3 mr-1" />
                          Als Nächstes
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completion State */}
            {activePath.current_position >= activePath.modules.length && (
              <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-2" />
                <h4 className="font-semibold text-success mb-1">Lernpfad abgeschlossen!</h4>
                <p className="text-sm text-muted-foreground">
                  Herzlichen Glückwunsch! Du hast alle Module in diesem Pfad abgeschlossen.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold mb-2">Kein aktiver Lernpfad</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Erstelle oder aktiviere einen Lernpfad, um strukturiert zu lernen
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Lernpfad erstellen
            </Button>
          </CardContent>
        </Card>
      )}

      {/* All Learning Paths */}
      {paths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alle Lernpfade</CardTitle>
            <CardDescription>
              Wechsle zwischen verschiedenen Lernpfaden oder erstelle neue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paths.map((path) => (
                <div
                  key={path.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all hover:shadow-md",
                    path.is_active 
                      ? "border-primary/50 bg-primary/5" 
                      : "border-border bg-card hover:border-primary/30"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold flex items-center gap-2">
                        {path.name}
                        {path.is_active && (
                          <Badge variant="default" className="text-xs">
                            Aktiv
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <Badge className={cn("text-xs", getDifficultyColor(path.difficulty_level))}>
                      {getDifficultyLabel(path.difficulty_level)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Progress value={getProgressPercentage(path)} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{path.current_position} / {path.modules.length} Module</span>
                      <span>{Math.round(getProgressPercentage(path))}%</span>
                    </div>
                  </div>

                  {!path.is_active && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-3"
                      onClick={() => setActivePath(path.id)}
                    >
                      Aktivieren
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Neuen Lernpfad erstellen
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = '/'}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Alle Kategorien ansehen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
