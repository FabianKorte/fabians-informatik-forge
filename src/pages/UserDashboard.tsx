import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Lightbulb, TrendingUp, Settings, LogOut, User } from "lucide-react";
import { SimpleLearningContentForm } from "@/components/user/SimpleLearningContentForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { categories } from "@/data/categories";
import { getModulesForCategory } from "@/lib/learnContentUtils";
import { useProgress } from "@/hooks/useProgress";
import { 
  Brain, 
  Trophy,
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Helper function to get progress from cookie
const getProgressFromCookie = () => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('ihk_learn_progress='));
  
  if (cookie) {
    try {
      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch (e) {
      return {};
    }
  }
  return {};
};

const ProgressView = ({ userId }: { userId?: string }) => {
  const [categoryStats, setCategoryStats] = useState<any[]>([]);
  const [overallStats, setOverallStats] = useState({ totalCategories: 0, totalModules: 0 });

  useEffect(() => {
    const loadProgress = async () => {
      const progressData = getProgressFromCookie();
      
      const stats = await Promise.all(
        categories.map(async (category) => {
          const modules = await getModulesForCategory(category.id);
          let totalItems = 0;
          let completedItems = 0;
          let difficultItems = 0;

          modules.forEach((module, moduleIndex) => {
            const progress = progressData[category.id]?.[module.type]?.[moduleIndex.toString()] || {};

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
                }
                break;
            }
          });

          const completionRate = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

          return {
            ...category,
            totalItems,
            completedItems,
            difficultItems,
            completionRate,
          };
        })
      );

      const filteredStats = stats
        .filter(cat => cat.totalItems > 0)
        .sort((a, b) => b.completionRate - a.completionRate);
      
      setCategoryStats(filteredStats);
      setOverallStats({
        totalCategories: Object.keys(progressData).length,
        totalModules: filteredStats.length,
      });
    };

    loadProgress();
  }, [userId]);

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Trophy className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xl font-semibold">{overallStats.totalCategories}</p>
              <p className="text-xs text-muted-foreground">Kategorien</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <BookOpen className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-xl font-semibold">
                {categoryStats.reduce((sum, cat) => sum + cat.completedItems, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Abgeschlossen</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Target className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-xl font-semibold">
                {Math.round(
                  categoryStats.reduce((sum, cat) => sum + cat.completionRate, 0) / 
                  Math.max(categoryStats.length, 1)
                )}%
              </p>
              <p className="text-xs text-muted-foreground">Durchschnitt</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Brain className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <p className="text-xl font-semibold">
                {categoryStats.reduce((sum, cat) => sum + cat.difficultItems, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Schwierig</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Progress */}
      <div className="space-y-4">
        {categoryStats.map((category) => (
          <Card key={category.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-accent/10 rounded-lg">
                  <category.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{category.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {category.completedItems} / {category.totalItems} 
                    ({Math.round(category.completionRate)}%)
                  </p>
                </div>
              </div>
              <Badge variant={category.completionRate > 75 ? "default" : "secondary"} className="text-xs">
                {category.difficulty}
              </Badge>
            </div>

            <ProgressBar value={category.completionRate} className="h-2 mb-3" />

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-success" />
                <span className="text-muted-foreground">{category.completedItems} ✓</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-destructive" />
                <span className="text-muted-foreground">{category.difficultItems} ⚠</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {category.totalItems - category.completedItems} offen
                </span>
              </div>
            </div>
          </Card>
        ))}

        {categoryStats.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Noch keine Lernaktivitäten vorhanden</p>
            <p className="text-sm">Starte mit dem Lernen, um deinen Fortschritt zu sehen!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setUsername(data.username);
      }
    };

    // Fetch user suggestions
    const fetchSuggestions = async () => {
      const { data } = await supabase
        .from('learn_module_suggestions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (data) {
        setSuggestions(data);
      }
    };

    fetchProfile();
    fetchSuggestions();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Mein Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/profile")}>
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Profil</span>
            </Button>
            {isAdmin && (
              <Button variant="default" onClick={() => navigate("/admin")}>
                <Settings className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            )}
            <Button variant="outline" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Abmelden</span>
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Startseite</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Willkommen, {username}!</h2>
          <p className="text-muted-foreground">
            Verwalte deine Lernfortschritte und schlage neue Inhalte vor
          </p>
        </div>

        <Tabs defaultValue="suggest" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 gap-1 sm:gap-2 h-auto">
            <TabsTrigger value="suggest" className="text-xs sm:text-sm px-2 py-2">
              <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Inhalte vorschlagen</span>
              <span className="sm:hidden">Vorschlag</span>
            </TabsTrigger>
            <TabsTrigger value="my-suggestions" className="text-xs sm:text-sm px-2 py-2">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Meine Vorschläge</span>
              <span className="sm:hidden">Meine</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-xs sm:text-sm px-2 py-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Fortschritt</span>
              <span className="sm:hidden">Progress</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggest">
            <SimpleLearningContentForm />
          </TabsContent>

          <TabsContent value="my-suggestions">
            <Card>
              <CardHeader>
                <CardTitle>Meine eingereichten Vorschläge</CardTitle>
                <CardDescription>
                  Übersicht über deine eingereichten Lerninhalt-Vorschläge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="p-4">
                      <div className="flex flex-col gap-3">
                        <div>
                          <div className="flex items-start gap-2 mb-1 flex-wrap">
                            <h4 className="font-medium text-sm sm:text-base">{suggestion.title}</h4>
                            <Badge variant={
                              suggestion.status === 'approved' ? 'default' :
                              suggestion.status === 'rejected' ? 'destructive' :
                              'secondary'
                            } className="shrink-0">
                              {suggestion.status === 'approved' ? 'Genehmigt' :
                               suggestion.status === 'rejected' ? 'Abgelehnt' :
                               'In Prüfung'}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Kategorie: {suggestion.category_id} • Typ: {suggestion.module_type}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Eingereicht am {new Date(suggestion.created_at).toLocaleDateString('de-DE')}
                          </p>
                          {suggestion.admin_notes && (
                            <p className="text-xs sm:text-sm text-muted-foreground mt-2 italic">
                              Admin-Notiz: {suggestion.admin_notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}

                  {suggestions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Du hast noch keine Vorschläge eingereicht
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Dein Lernfortschritt</CardTitle>
                <CardDescription>
                  Übersicht über deine Lernaktivitäten und Fortschritte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressView userId={user?.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
