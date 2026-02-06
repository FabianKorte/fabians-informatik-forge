import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import SearchBar from "@/components/SearchBar";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getCategoriesFromDatabase } from "@/lib/categoryUtils";
import { getAllModules } from "@/lib/learnContentUtils";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { logger } from "@/lib/logger";
import type { Category } from "@/data/categories";
import { Sparkles, GraduationCap, ArrowRight, Network, GitBranch, Layers, Database, Calculator, Cpu, Workflow, Binary, Ear } from "lucide-react";
import type { CategoryTool } from "@/components/CategoryCard";

// Tools den jeweiligen Kategorien zuordnen
const categoryToolsMap: Record<string, CategoryTool[]> = {
  "netzwerktechnik": [
    { icon: Network, title: "Netzwerk-Simulator", route: "/network-simulator" },
    { icon: Layers, title: "OSI-Modell", route: "/osi-model" },
    { icon: Calculator, title: "Subnetting", route: "/subnetting" },
  ],
  "projektmanagement": [
    { icon: GitBranch, title: "Netzplantechnik (CPM)", route: "/cpm-tool" },
  ],
  "datenbanken": [
    { icon: Database, title: "SQL-Sandbox", route: "/sql-sandbox" },
  ],
  "grundlagen-it": [
    { icon: Cpu, title: "Hardware-Puzzle", route: "/hardware-puzzle" },
  ],
  "fachmodul-anwendungsentwicklung": [
    { icon: Workflow, title: "Struktogramm-Builder", route: "/struktogramm" },
  ],
  "digitaltechnik": [
    { icon: Binary, title: "Bit-/Byte-Rechner", route: "/bit-calculator" },
  ],
  "kommunikation": [
    { icon: Ear, title: "Kommunikationstrainer", route: "/communication-trainer" },
  ],
};

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
  const countElements = useCallback((modules: LearnModule[] | undefined) => {
    if (!modules || !Array.isArray(modules) || modules.length === 0) return 0;
    return modules.reduce((sum, m) => {
      if (!m) return sum;
      switch (m.type) {
        case "flashcards": return sum + (Array.isArray(m.cards) ? m.cards.length : 0);
        case "quiz": return sum + (Array.isArray(m.questions) ? m.questions.length : 0);
        case "interactive": return sum + (Array.isArray(m.tasks) ? m.tasks.length : 0);
        default: return sum;
      }
    }, 0);
  }, []);

  const { regularCategories, randomTrainingCategory, examCategory, stats } = useMemo(() => {
    const random = categories.find(c => c.id === 'zufallstraining');
    const exam = categories.find(c => c.id === 'ihk-pruefung');
    // Filtere spezielle Kategorien aus der normalen Anzeige
    const regular = categories.filter(c => 
      c.id !== 'zufallstraining' && 
      c.id !== 'ihk-pruefung'
    );
    
    const dynamicTotalsByCategory: Record<string, number> = Object.fromEntries(
      categories.map((cat) => [cat.id, countElements(allModules[cat.id] || [])])
    );

    const totalQuestions = Object.values(dynamicTotalsByCategory).reduce((a, b) => a + b, 0);
    const answeredQuestions = categories.reduce((sum, cat) => sum + (cat.completedElements || 0), 0);
    const correctAnswers = Math.floor(answeredQuestions * 0.78);

    return {
      regularCategories: regular,
      randomTrainingCategory: random,
      examCategory: exam,
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
  const handleCategoryStart = useCallback((categoryId: string) => {
    // Spezielle Routen für bestimmte Kategorien
    if (categoryId === 'java') {
      navigate('/java');
    } else if (categoryId === 'ihk-pruefung') {
      navigate('/exam');
    } else if (categoryId === 'zufallstraining') {
      // Navigiere zu einer zufälligen Kategorie mit Lerninhalten
      const categoriesWithContent = regularCategories.filter(c => 
        allModules[c.id] && allModules[c.id].length > 0
      );
      if (categoriesWithContent.length > 0) {
        const randomCategory = categoriesWithContent[Math.floor(Math.random() * categoriesWithContent.length)];
        navigate(`/learn/${randomCategory.id}`);
      } else {
        // Fallback: Navigiere zur ersten Kategorie
        navigate('/learn/grundlagen-it');
      }
    } else {
      navigate(`/learn/${categoryId}`);
    }
  }, [navigate, regularCategories, allModules]);
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
      
      <div className="min-h-screen">
      <div className="transition-all duration-300">
        <Hero
          totalQuestions={stats.totalQuestions}
          answeredQuestions={stats.answeredQuestions}
          correctAnswers={stats.correctAnswers}
          onStartLearning={handleStartLearning}
          onShowProgress={handleShowProgress}
        />
      </div>

      {/* IHK-Prüfungssimulator - Prominent */}
      {examCategory && (
        <section className="py-6 sm:py-12 px-4 sm:px-6 bg-gradient-to-br from-warning/10 via-warning/5 to-accent/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-warning" />
                <h2 className="text-xl sm:text-3xl font-medium text-foreground">IHK-Prüfungssimulator</h2>
                <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-warning" />
              </div>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                Realistische Prüfungssimulationen für AP Teil 1 & 2 mit Timer, Punktebewertung und Auswertung
              </p>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={() => navigate('/exam')}
                size="lg"
                className="bg-gradient-to-r from-warning to-accent hover:opacity-90 text-primary-foreground font-medium"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Prüfungssimulator starten
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      )}




      {randomTrainingCategory && (
        <section className="py-6 sm:py-12 px-4 sm:px-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                <h2 className="text-xl sm:text-3xl font-medium text-foreground">Zufallstraining</h2>
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
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

      <section id="categories-section" className="py-8 sm:py-20 px-4 sm:px-6 bg-background/30 backdrop-blur-sm">
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
                  tools={categoryToolsMap[category.id]}
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

      <section className="py-8 sm:py-20 px-4 sm:px-6 bg-muted/10 backdrop-blur-sm">
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

      {/* Footer wird global in App.tsx gerendert */}
      </div>
    </>
  );
};

export default Index;