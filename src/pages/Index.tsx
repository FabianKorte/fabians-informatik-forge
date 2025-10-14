import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { RoadmapModal } from "@/components/RoadmapModal";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { seedDatabase } from "@/lib/seedDatabase";
import { useAuth } from "@/hooks/useAuth";
import { getCategoriesFromDatabase } from "@/lib/categoryUtils";
import { getAllModules } from "@/lib/learnContentUtils";
import type { Category } from "@/data/categories";
import { Download, MapPin, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import type { LearnModule } from "@/types/learn";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackRefreshTrigger, setFeedbackRefreshTrigger] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allModules, setAllModules] = useState<Record<string, LearnModule[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [splashActive, setSplashActive] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    let mounted = true;
    
    const initializeData = async () => {
      try {
        setIsLoading(true);
        await seedDatabase();
        const [cats, modules] = await Promise.all([
          getCategoriesFromDatabase(),
          getAllModules(),
        ]);
        
        if (mounted) {
          setCategories(cats);
          setAllModules(modules);
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeData();
    return () => { mounted = false; };
  }, []);

  // Failsafe: ensure splash overlay hides quickly
  useEffect(() => {
    const t = setTimeout(() => {
      setSplashActive(false);
      setShowContent(true);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  // Hide splash as soon as data finished loading
  useEffect(() => {
    if (!isLoading) {
      setSplashActive(false);
      setShowContent(true);
    }
  }, [isLoading]);

  const countElements = useMemo(() => (modules: LearnModule[]) => {
    if (!modules || modules.length === 0) return 0;
    return modules.reduce((sum, m) => {
      switch (m.type) {
        case "flashcards": return sum + (m.cards?.length || 0);
        case "quiz": return sum + (m.questions?.length || 0);
        case "matching": return sum + (m.pairs?.length || 0);
        case "code": return sum + (m.challenges?.length || 0);
        case "dragdrop": return sum + (m.games?.reduce((a, g) => a + (g.items?.length || 0), 0) || 0);
        case "memory": return sum + (m.games?.reduce((a, g) => a + (g.pairs?.length || 0), 0) || 0);
        case "timeline": return sum + (m.timelines?.reduce((a, t) => a + (t.events?.length || 0), 0) || 0);
        case "scenario": return sum + (m.scenarios?.length || 0);
        case "interactive": return sum + (m.tasks?.length || 0);
        default: return sum;
      }
    }, 0);
  }, []);

  const { regularCategories, randomTrainingCategory, stats } = useMemo(() => {
    const random = categories.find(c => c.id === 'zufallstraining');
    const regular = categories.filter(c => c.id !== 'zufallstraining');
    
    const dynamicTotalsByCategory: Record<string, number> = Object.fromEntries(
      categories.map((cat) => [cat.id, countElements(allModules[cat.id] || [])])
    );

    const totalQuestions = Object.values(dynamicTotalsByCategory).reduce((a, b) => a + b, 0);
    const answeredQuestions = categories.reduce((sum, cat) => sum + (cat.completedElements || 0), 0);
    const correctAnswers = Math.floor(answeredQuestions * 0.78);

    return {
      regularCategories: regular,
      randomTrainingCategory: random,
      stats: {
        totalCategories: regular.length,
        totalQuestions,
        answeredQuestions,
        correctAnswers,
        dynamicTotalsByCategory
      }
    };
  }, [categories, allModules, countElements]);

  const filteredCategories = useMemo(() => 
    regularCategories.filter(category =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [regularCategories, searchQuery]
  );

  const handleStartLearning = () => {
    document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowProgress = () => navigate('/progress');
  const handleCategoryStart = (categoryId: string) => navigate(`/learn/${categoryId}`);
  const handleFeedbackSubmitted = () => setFeedbackRefreshTrigger(prev => prev + 1);

  return (
    <div className="min-h-screen bg-background">
      {splashActive && (
        <LoadingScreen onComplete={() => { setSplashActive(false); setShowContent(true); }} />
      )}
      {/* Floating Action Buttons */}
      <div className={`fixed top-6 right-6 z-50 flex flex-col gap-3 transition-all duration-700 ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
        {user && (
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg backdrop-blur-sm bg-background/80 border-border/50"
            onClick={() => navigate('/dashboard')}
          >
            <span className="hidden sm:inline">Dashboard</span>
            <span className="sm:hidden">👤</span>
          </Button>
        )}
        
        {!user && (
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg backdrop-blur-sm bg-background/80 border-border/50"
            onClick={() => navigate('/auth')}
          >
            <span className="hidden sm:inline">Anmelden</span>
            <span className="sm:hidden">🔐</span>
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="shadow-lg backdrop-blur-sm bg-background/80 border-border/50"
          onClick={() => window.open('https://drive.google.com/drive/folders/1x_OJDgFV7z0XGMcSBPIvKe-fTTHqp1kR?usp=sharing', '_blank')}
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline ml-2">Downloads</span>
        </Button>
        
        <RoadmapModal>
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg backdrop-blur-sm bg-background/80 border-border/50"
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Roadmap</span>
          </Button>
        </RoadmapModal>
      </div>

      <div className={`transition-all duration-700 delay-100 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Hero
          totalQuestions={stats.totalQuestions}
          answeredQuestions={stats.answeredQuestions}
          correctAnswers={stats.correctAnswers}
          onStartLearning={handleStartLearning}
          onShowProgress={handleShowProgress}
        />
      </div>

      {randomTrainingCategory && (
        <section className={`py-12 px-6 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-purple-500/10 transition-all duration-700 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-violet-500" />
                <h2 className="text-3xl font-medium text-foreground">Zufallstraining</h2>
                <Sparkles className="w-6 h-6 text-fuchsia-500" />
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Alle Aufgaben aus allen Kategorien in einem Training - Perfekt zur Prüfungsvorbereitung
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <CategoryCard
                  title={randomTrainingCategory.title}
                  description={randomTrainingCategory.description}
                  totalElements={stats.dynamicTotalsByCategory[randomTrainingCategory.id]}
                  completedElements={randomTrainingCategory.completedElements}
                  icon={randomTrainingCategory.icon}
                  difficulty={randomTrainingCategory.difficulty}
                  onStart={() => handleCategoryStart(randomTrainingCategory.id)}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="categories-section" className={`py-20 px-6 bg-background transition-all duration-700 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-foreground mb-4">Lernkategorien</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wähle eine Kategorie aus und beginne dein strukturiertes Lernen.
            </p>
          </div>

          <div className="mb-12">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <section className="py-16 bg-muted/30 rounded-xl mb-12">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-light text-foreground mb-1">{stats.totalCategories}</div>
                  <div className="text-sm text-muted-foreground">Kategorien</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-light text-accent mb-1">{stats.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Fragen insgesamt</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-light text-success mb-1">{stats.correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Richtig beantwortet</div>
                </div>
              </div>
            </div>
          </section>

          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  totalElements={stats.dynamicTotalsByCategory[category.id]}
                  completedElements={category.completedElements}
                  icon={category.icon}
                  difficulty={category.difficulty}
                  onStart={() => handleCategoryStart(category.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                Keine Kategorien gefunden für "{searchQuery}"
              </p>
              <p className="text-sm text-muted-foreground">
                Versuche einen anderen Suchbegriff.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className={`py-20 px-6 bg-muted/30 transition-all duration-700 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-foreground mb-4">Feedback</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Teile deine Gedanken mit uns und sieh, was andere über die Lernplattform sagen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
            </div>
            <div className="flex justify-center">
              <FeedbackList refreshTrigger={feedbackRefreshTrigger} />
            </div>
          </div>
        </div>
      </section>

      <footer className={`py-12 px-6 border-t border-border bg-background transition-all duration-700 delay-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <img 
              src={logo} 
              alt="Fabian Korte - Fachinformatiker" 
              className="mx-auto h-16 w-auto object-contain opacity-80"
            />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Vorbereitung auf die IHK IT-Prüfungen.
          </p>
          
          <p className="text-xs text-muted-foreground">
            © 2025 Fabian Korte. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;