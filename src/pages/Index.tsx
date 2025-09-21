import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { getModulesForCategory } from "@/data/learn";
import type { LearnModule } from "@/types/learn";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
    // Could open a progress modal or navigate to progress page
    console.log('Show progress clicked');
  };

  const handleCategoryStart = (categoryId: string) => {
    navigate(`/learn/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-background">
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
            <SearchBar
              onSearch={setSearchQuery}
              showFilter={true}
              onFilterToggle={() => console.log('Filter toggle')}
            />
          </div>

        {/* Minimalist statistics section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-6 bg-card rounded-lg border border-border">
                <div className="text-2xl font-light text-foreground mb-1">{Object.keys(filteredCategories).length}</div>
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

      {/* Simple Footer */}
      <footer className="py-12 px-6 border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-medium text-foreground mb-4">
            Fabian Korte - Fachinformatiker Lernplattform
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Professionelle Vorbereitung auf alle IT-Prüfungen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <Button variant="outline" size="sm">
              Kontakt
            </Button>
            <Button variant="outline" size="sm">
              Über das Projekt
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © 2025 Fabian Korte. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;