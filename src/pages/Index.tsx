import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { RoadmapModal } from "@/components/RoadmapModal";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { getModulesForCategory } from "@/data/learn";
import { Download, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import type { LearnModule } from "@/types/learn";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackRefreshTrigger, setFeedbackRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  // Dynamic counts from learn content
  const countElements = (modules: LearnModule[]) => modules.reduce((sum, m) => {
    switch (m.type) {
      case "flashcards":
        return sum + m.cards.length;
      case "quiz":
        return sum + m.questions.length;
      case "matching":
        return sum + m.pairs.length;
      case "code":
        return sum + m.challenges.length;
      case "dragdrop":
        return sum + m.games.reduce((a, g) => a + g.items.length, 0);
      case "memory":
        return sum + m.games.reduce((a, g) => a + g.pairs.length, 0);
      case "timeline":
        return sum + m.timelines.reduce((a, t) => a + t.events.length, 0);
      case "scenario":
        return sum + m.scenarios.length;
      default:
        return sum;
    }
  }, 0);

  const dynamicTotalsByCategory: Record<string, number> = Object.fromEntries(
    categories.map((cat) => [cat.id, countElements(getModulesForCategory(cat.id))])
  );

  const totalQuestions = Object.values(dynamicTotalsByCategory).reduce((a, b) => a + b, 0);
  const answeredQuestions = categories.reduce((sum, cat) => sum + (cat.completedElements || 0), 0);
  const correctAnswers = Math.floor(answeredQuestions * 0.78); // 78% accuracy simulation

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartLearning = () => {
    // Scroll to categories section
    const categoriesSection = document.getElementById('categories-section');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowProgress = () => {
    navigate('/progress');
  };

  const handleCategoryStart = (categoryId: string) => {
    navigate(`/learn/${categoryId}`);
  };

  const handleFeedbackSubmitted = () => {
    setFeedbackRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Action Buttons */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
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

      {/* Hero Section */}
      <Hero
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        correctAnswers={correctAnswers}
        onStartLearning={handleStartLearning}
        onShowProgress={handleShowProgress}
      />

      {/* Categories Section */}
      <section id="categories-section" className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-foreground mb-4">
              Lernkategorien
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wähle eine Kategorie aus und beginne dein strukturiertes Lernen.
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-12">
          <SearchBar onSearch={setSearchQuery} />
          </div>

        {/* Minimalist statistics section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-6 bg-card rounded-lg border border-border">
                <div className="text-2xl font-light text-foreground mb-1">{filteredCategories.length}</div>
                <div className="text-sm text-muted-foreground">Kategorien</div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border border-border">
                <div className="text-2xl font-light text-accent mb-1">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Fragen insgesamt</div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border border-border">
                <div className="text-2xl font-light text-success mb-1">{correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Richtig beantwortet</div>
              </div>
            </div>
          </div>
        </section>

          {/* Category grid */}
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  totalElements={dynamicTotalsByCategory[category.id]}
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

      {/* Feedback Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-foreground mb-4">
              Feedback
            </h2>
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

      {/* Simple Footer */}
      <footer className="py-12 px-6 border-t border-border bg-background">
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