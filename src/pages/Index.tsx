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
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Lernkategorien
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Wähle eine Kategorie aus und beginne dein strukturiertes Lernen mit 
              interaktiven Quizzes und umfassenden Lernmaterialien.
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-16 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <SearchBar
              onSearch={setSearchQuery}
              showFilter={true}
              onFilterToggle={() => console.log('Filter toggle')}
            />
          </div>

          {/* Statistics overview with enhanced cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="group text-center p-8 rounded-3xl border-2 border-border/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/50 card-3d bg-gradient-to-br from-card via-card/95 to-primary/5">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-primary group-hover:shadow-accent group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl">📚</span>
              </div>
              <p className="text-4xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">{filteredCategories.length}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Kategorien</p>
            </div>
            <div className="group text-center p-8 rounded-3xl border-2 border-border/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-accent/50 card-3d bg-gradient-to-br from-card via-card/95 to-accent/5">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-accent group-hover:shadow-primary group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-4xl font-bold text-accent mb-3 group-hover:scale-110 transition-transform">{totalQuestions}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Lernelemente</p>
            </div>
            <div className="group text-center p-8 rounded-3xl border-2 border-border/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-success/50 card-3d bg-gradient-to-br from-card via-card/95 to-success/5">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-success to-success-light flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-4xl font-bold text-success mb-3 group-hover:scale-110 transition-transform">{answeredQuestions}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Bearbeitet</p>
            </div>
            <div className="group text-center p-8 rounded-3xl border-2 border-border/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-warning/50 card-3d bg-gradient-to-br from-card via-card/95 to-warning/5">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-warning to-warning-light flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-4xl font-bold text-warning mb-3 group-hover:scale-110 transition-transform">{totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0}%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Fortschritt</p>
            </div>
          </div>

          {/* Category grid with enhanced animations */}
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              {filteredCategories.map((category, index) => (
                <div key={category.id} className="animate-scale-in" style={{ animationDelay: `${0.1 * index}s` }}>
                  <CategoryCard
                    title={category.title}
                    description={category.description}
                    totalElements={dynamicTotalsByCategory[category.id]}
                    completedElements={category.completedElements}
                    icon={category.icon}
                    difficulty={category.difficulty}
                    gradient={category.gradient}
                    onStartLearning={() => handleCategoryStart(category.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 animate-fade-in">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-8 shadow-lg">
                <span className="text-4xl">🔍</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mb-6">
                Keine Kategorien gefunden für "{searchQuery}"
              </p>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                Versuche einen anderen Suchbegriff oder durchstöbere alle verfügbaren Kategorien.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Footer with gradients and animations */}
      <footer className="py-16 px-6 border-t border-border/30 bg-gradient-to-br from-card via-card/90 to-primary/5 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-gradient-to-br from-success/20 to-warning/20 rounded-full blur-2xl animate-float-reverse" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-8 shadow-primary animate-pulse-glow">
            <span className="text-3xl">🚀</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            Fabian Korte - Fachinformatiker Lernplattform
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Professionelle Vorbereitung auf alle IT-Prüfungen mit modernster Lerntechnologie 
            und interaktiven Lernmethoden für deinen Erfolg.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button variant="hero" size="lg" className="min-w-[200px]">
              📧 Kontakt aufnehmen
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              📊 Über das Projekt
            </Button>
          </div>
          
          <div className="pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              © 2025 Fabian Korte. Alle Rechte vorbehalten. Made with ❤️ für IT-Azubis
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;