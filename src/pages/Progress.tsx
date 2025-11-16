import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Brain, 
  Trophy,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { categories } from "@/data/categories";
import { getModulesForCategory } from "@/lib/learnContentUtils";
import { useProgress } from "@/hooks/useProgress";

const Progress = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get overall progress data
  const { overallProgress } = useProgress("", "", 0);
  const overallStats = overallProgress;

  // Calculate real statistics for each category from actual progress data
  // Get all progress data once instead of calling hook multiple times in loops
  const { allProgressData: globalProgressData } = useProgress("", "", 0);
  
  const categoryStats = await Promise.all(categories.map(async category => {
    const modules = await getModulesForCategory(category.id);
    let totalItems = 0;
    let completedItems = 0;
    let difficultItems = 0;

    modules.forEach((module, moduleIndex) => {
      // Access progress data from global state instead of calling hook
      const progress = globalProgressData[category.id]?.[module.type]?.[moduleIndex.toString()] || {};

      switch (module.type) {
        case "flashcards":
          if ('cards' in module) {
            totalItems += module.cards.length;
            if (progress.flashcards?.knownCards) {
              completedItems += progress.flashcards.knownCards.length;
            }
            if (progress.flashcards?.unknownCards) {
              difficultItems += progress.flashcards.unknownCards.length;
            }
          }
          break;
        case "quiz":
          if ('questions' in module) {
            totalItems += module.questions.length;
            if (progress.quiz?.completedQuestions) {
              completedItems += progress.quiz.completedQuestions.length;
            }
            // For quiz, difficult items could be questions answered incorrectly
            // We'll estimate based on scores if available
            if (progress.quiz?.scores && progress.quiz.scores.length > 0) {
              const avgScore = progress.quiz.scores.reduce((a, b) => a + b, 0) / progress.quiz.scores.length;
              if (avgScore < 60) { // If average score is below 60%, consider it difficult
                difficultItems += Math.ceil(module.questions.length * 0.4);
              }
            }
          }
          break;
        case "matching":
          if ('pairs' in module) {
            totalItems += module.pairs.length;
            if (progress.matching?.completions && progress.matching.completions > 0) {
              completedItems += module.pairs.length; // If completed at least once
            }
            if (progress.matching?.bestScore && progress.matching.bestScore < 80) {
              difficultItems += Math.ceil(module.pairs.length * 0.3);
            }
          }
          break;
        case "code":
          if ('challenges' in module) {
            totalItems += module.challenges.length;
            if (progress.code?.completedChallenges) {
              completedItems += progress.code.completedChallenges.length;
              // Assume non-completed challenges are difficult
              difficultItems += module.challenges.length - progress.code.completedChallenges.length;
            } else {
              // If no progress, all are difficult
              difficultItems += module.challenges.length;
            }
          }
          break;
        case "dragdrop":
          if ('games' in module) {
            totalItems += module.games.length;
            if (progress.dragdrop?.completedGames) {
              completedItems += progress.dragdrop.completedGames.length;
            }
          }
          break;
        case "memory":
          if ('games' in module) {
            totalItems += module.games.length;
            if (progress.memory?.completedGames) {
              completedItems += progress.memory.completedGames.length;
            }
          }
          break;
        case "timeline":
          if ('timelines' in module) {
            totalItems += module.timelines.length;
            if (progress.timeline?.viewedTimelines) {
              completedItems += progress.timeline.viewedTimelines.length;
            }
          }
          break;
        case "scenario":
          if ('scenarios' in module) {
            totalItems += module.scenarios.length;
            if (progress.scenario?.completedScenarios) {
              completedItems += progress.scenario.completedScenarios.length;
              // Calculate difficult scenarios based on correctness
              const correctRate = progress.scenario.correctChoices && progress.scenario.completedScenarios.length > 0 
                ? progress.scenario.correctChoices / progress.scenario.completedScenarios.length 
                : 0;
              if (correctRate < 0.7) {
                difficultItems += Math.ceil(progress.scenario.completedScenarios.length * 0.3);
              }
            }
          }
          break;
      }
    });

    const completionRate = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    const difficultyRate = totalItems > 0 ? (difficultItems / totalItems) * 100 : 0;

    return {
      ...category,
      totalItems,
      completedItems,
      difficultItems,
      completionRate,
      difficultyRate,
      modules
    };
  }).sort((a, b) => b.completionRate - a.completionRate);

  const handleFocusLearning = (categoryId: string) => {
    navigate(`/learn/${categoryId}?focus=difficult`);
  };

  const handleContinueLearning = (categoryId: string) => {
    navigate(`/learn/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </Button>
            <div>
              <h1 className="text-2xl font-medium text-foreground">Lernfortschritt</h1>
              <p className="text-sm text-muted-foreground">
                Detailierte Übersicht deiner Lernaktivitäten
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {overallStats.totalCategories}
                </p>
                <p className="text-sm text-muted-foreground">Kategorien aktiv</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {categoryStats.reduce((sum, cat) => sum + cat.completedItems, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Abgeschlossen</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Target className="w-5 h-5 text-success-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {Math.round(
                    categoryStats.reduce((sum, cat) => sum + cat.completionRate, 0) / 
                    Math.max(categoryStats.length, 1)
                  )}%
                </p>
                <p className="text-sm text-muted-foreground">Durchschnitt</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Brain className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {categoryStats.reduce((sum, cat) => sum + cat.difficultItems, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Schwierige Inhalte</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Progress */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Übersicht</TabsTrigger>
            <TabsTrigger value="focus">Schwerpunkt-Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6">
              {categoryStats.map((category) => (
                <Card key={category.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <category.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-foreground">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant={category.completionRate > 75 ? "default" : "secondary"}>
                      {category.difficulty}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fortschritt</span>
                      <span className="font-medium">
                        {category.completedItems} / {category.totalItems} 
                        ({Math.round(category.completionRate)}%)
                      </span>
                    </div>
                    <ProgressBar value={category.completionRate} className="h-2" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {category.completedItems} abgeschlossen
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-muted-foreground">
                          {category.difficultItems} schwierig
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {category.totalItems - category.completedItems} offen
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContinueLearning(category.id)}
                      >
                        <BookOpen className="w-4 h-4" />
                        Weiterlernen
                      </Button>
                      {category.difficultItems > 0 && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleFocusLearning(category.id)}
                        >
                          <Brain className="w-4 h-4" />
                          Schwerpunkt-Training ({category.difficultItems})
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="focus" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <Brain className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    Schwerpunkt-Training
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Konzentriere dich auf schwierige und noch nicht gemeisterte Inhalte
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {categoryStats
                  .filter(cat => cat.difficultItems > 0)
                  .map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <category.icon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{category.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {category.difficultItems} schwierige Inhalte
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleFocusLearning(category.id)}
                        size="sm"
                      >
                        <Brain className="w-4 h-4" />
                        Training starten
                      </Button>
                    </div>
                  ))}

                {categoryStats.filter(cat => cat.difficultItems > 0).length === 0 && (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-success-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-foreground mb-2">
                      Großartig!
                    </h4>
                    <p className="text-muted-foreground">
                      Du hast keine schwierigen Inhalte mehr. Weiter so!
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Progress;