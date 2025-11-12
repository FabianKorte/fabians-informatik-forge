import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import SearchBar from "@/components/SearchBar";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import RoadmapModal from "@/components/RoadmapModal";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getCategoriesFromDatabase } from "@/lib/categoryUtils";
import { getAllModules } from "@/lib/learnContentUtils";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { logger } from "@/lib/logger";
import type { Category } from "@/data/categories";
import { Download, MapPin, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import type { LearnModule } from "@/types/learn";


const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackRefreshTrigger, setFeedbackRefreshTrigger] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allModules, setAllModules] = useState<Record<string, LearnModule[]>>({});
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    logger.info('Index page mounted - starting data load');
    const loadData = async () => {
      try {
        logger.info('Fetching categories and modules...');
        const [cats, mods] = await Promise.all([
          getCategoriesFromDatabase(),
          getAllModules()
        ]);
        logger.info('Data loaded:', cats.length, 'categories', Object.keys(mods).length, 'module groups');
        setCategories(cats);
        setAllModules(mods);
      } catch (error) {
        logger.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Pure function to count elements in modules (memoized)
  const countElements = useCallback((modules: LearnModule[]) => {
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

  const handleStartLearning = useCallback(() => {
    document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleShowProgress = useCallback(() => navigate('/progress'), [navigate]);
  const handleCategoryStart = useCallback((categoryId: string) => navigate(`/learn/${categoryId}`), [navigate]);
  const handleFeedbackSubmitted = useCallback(() => setFeedbackRefreshTrigger(prev => prev + 1), []);

  // Keyboard shortcuts
  useKeyboardNavigation([
    {
      key: 's',
      ctrlKey: true,
      callback: () => document.querySelector<HTMLInputElement>('input[type="search"]')?.focus(),
      description: 'Suche fokussieren',
    },
    {
      key: 'h',
      ctrlKey: true,
      callback: () => navigate('/'),
      description: 'Zur Startseite',
    },
    {
      key: 'd',
      ctrlKey: true,
      callback: () => user ? navigate('/dashboard') : navigate('/auth'),
      description: 'Zum Dashboard',
    },
  ]);

  return (
    <>
      <SEO />
      <StructuredData />
      
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Zum Hauptinhalt springen
      </a>
      
      <div className="min-h-screen bg-background">
      {/* Floating Action Buttons */}
      <div className="fixed top-3 sm:top-6 right-3 sm:right-6 z-50 flex flex-col gap-2">
        {user && (
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg backdrop-blur-sm bg-background/80 border-border/50 h-8 sm:h-9 px-2 sm:px-3"
            onClick={() => navigate('/dashboard')}
          >
            <span className="hidden sm:inline text-xs">Dashboard</span>
            <span className="sm:hidden text-sm">👤</span>
          </Button>
        )}
        
        {!user && (
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg backdrop-blur-sm bg-background/80 border-border/50 h-8 sm:h-9 px-2 sm:px-3"
            onClick={() => navigate('/auth')}
          >
            <span className="hidden sm:inline text-xs">Anmelden</span>
            <span className="sm:hidden text-sm">🔐</span>
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="shadow-lg backdrop-blur-sm bg-background/80 border-border/50 h-8 sm:h-9 px-2 sm:px-3"
          onClick={() => window.open('https://drive.google.com/drive/folders/1x_OJDgFV7z0XGMcSBPIvKe-fTTHqp1kR?usp=sharing', '_blank')}
        >
          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline ml-2 text-xs">Downloads</span>
        </Button>
        
        <RoadmapModal>
          <Button
            variant="outline"
            size="sm"
            className="shadow-lg backdrop-blur-sm bg-background/80 border-border/50 h-8 sm:h-9 px-2 sm:px-3"
          >
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline ml-2 text-xs">Roadmap</span>
          </Button>
        </RoadmapModal>
      </div>

      <div className="transition-all duration-300">
        <Hero
          totalQuestions={stats.totalQuestions}
          answeredQuestions={stats.answeredQuestions}
          correctAnswers={stats.correctAnswers}
          onStartLearning={handleStartLearning}
          onShowProgress={handleShowProgress}
        />
      </div>

      {randomTrainingCategory && (
        <section className="py-6 sm:py-12 px-4 sm:px-6 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-purple-500/10 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-violet-500" />
                <h2 className="text-xl sm:text-3xl font-medium text-foreground">Zufallstraining</h2>
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-fuchsia-500" />
              </div>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
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

      <section id="categories-section" className="py-8 sm:py-20 px-4 sm:px-6 bg-background relative z-10">
        <main 
          id="main-content"
          tabIndex={-1}
          aria-label="Hauptinhalt"
        >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-2 sm:mb-4">Lernkategorien</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Wähle eine Kategorie aus und beginne dein strukturiertes Lernen.
            </p>
          </div>

          <div className="mb-8 sm:mb-12">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <section className="py-6 sm:py-16 bg-muted/30 rounded-xl mb-8 sm:mb-12">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
                <div className="text-center p-3 sm:p-6 bg-card rounded-lg border border-border">
                  <div className="text-lg sm:text-2xl font-light text-foreground mb-1">{stats.totalCategories}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Kategorien</div>
                </div>
                <div className="text-center p-3 sm:p-6 bg-card rounded-lg border border-border">
                  <div className="text-lg sm:text-2xl font-light text-accent mb-1">{stats.totalQuestions}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Fragen</div>
                </div>
                <div className="text-center p-3 sm:p-6 bg-card rounded-lg border border-border">
                  <div className="text-lg sm:text-2xl font-light text-success-foreground mb-1">{stats.correctAnswers}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Richtig</div>
                </div>
              </div>
            </div>
          </section>

          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            <div className="text-center py-12 sm:py-20">
              <p className="text-base sm:text-lg text-muted-foreground mb-4">
                Keine Kategorien gefunden für "{searchQuery}"
              </p>
              <p className="text-sm text-muted-foreground">
                Versuche einen anderen Suchbegriff.
              </p>
            </div>
          )}
        </div>
        </main>
      </section>

      <section className="py-8 sm:py-20 px-4 sm:px-6 bg-muted/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-2 sm:mb-4">Feedback</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Teile deine Gedanken mit uns und sieh, was andere über die Lernplattform sagen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex justify-center">
              <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
            </div>
            <div className="flex justify-center">
              <FeedbackList refreshTrigger={feedbackRefreshTrigger} />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 sm:py-12 px-4 sm:px-6 border-t border-border bg-background relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 sm:mb-6">
            <img 
              src={logo} 
              alt="Fabian Korte - Fachinformatiker" 
              className="mx-auto h-12 sm:h-16 w-auto object-contain opacity-80"
            />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
            Vorbereitung auf die IHK IT-Prüfungen.
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 Fabian Korte. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Index;