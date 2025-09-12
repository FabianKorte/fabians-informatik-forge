import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { categories } from "@/data/categories";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // Calculate total stats
  const totalQuestions = categories.reduce((sum, cat) => sum + cat.totalElements, 0);
  const answeredQuestions = categories.reduce((sum, cat) => sum + cat.completedElements, 0);
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

          {/* Statistics overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center p-6 card-gradient rounded-2xl border border-border/50 shadow-md">
              <p className="text-3xl font-bold text-primary mb-2">{filteredCategories.length}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Kategorien</p>
            </div>
            <div className="text-center p-6 card-gradient rounded-2xl border border-border/50 shadow-md">
              <p className="text-3xl font-bold text-accent mb-2">{totalQuestions}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Lernelemente</p>
            </div>
            <div className="text-center p-6 card-gradient rounded-2xl border border-border/50 shadow-md">
              <p className="text-3xl font-bold text-success mb-2">{answeredQuestions}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Bearbeitet</p>
            </div>
            <div className="text-center p-6 card-gradient rounded-2xl border border-border/50 shadow-md">
              <p className="text-3xl font-bold text-warning mb-2">{Math.round((answeredQuestions / totalQuestions) * 100)}%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Fortschritt</p>
            </div>
          </div>

          {/* Category grid */}
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              {filteredCategories.map((category, index) => (
                <div key={category.id} className="animate-scale-in" style={{ animationDelay: `${0.1 * index}s` }}>
                  <CategoryCard
                    title={category.title}
                    description={category.description}
                    totalElements={category.totalElements}
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
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">
                Keine Kategorien gefunden für "{searchQuery}"
              </p>
              <p className="text-muted-foreground">
                Versuche einen anderen Suchbegriff oder durchstöbere alle verfügbaren Kategorien.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Fabian Korte - Fachinformatiker Lernplattform
          </h3>
          <p className="text-muted-foreground mb-6">
            Professionelle Vorbereitung auf alle IT-Prüfungen mit modernster Lerntechnologie.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 Fabian Korte. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;