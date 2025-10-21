import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { getCategoriesFromDatabase } from "@/lib/categoryUtils";
import { getModulesForCategory } from "@/lib/learnContentUtils";
import { GradientShadowCard } from "@/components/ui/gradient-shadow-card";
import type { Category } from "@/data/categories";
import type { LearnModule } from "@/types/learn";
import { Flashcards } from "@/components/learn/Flashcards";
import { Quiz } from "@/components/learn/Quiz";
import { FocusTraining } from "@/components/learn/FocusTraining";
import { InteractiveTraining } from "@/components/learn/InteractiveTraining";
import { interactiveTasksByCategory } from "@/data/learn/interactive-training";
import { Target, Brain, Zap } from "lucide-react";
import { MicrochipLoader } from "@/components/MicrochipLoader";
import { logger } from "@/lib/logger";

const LearnPage = () => {
  const { categoryId } = useParams();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | undefined>();
  const [modules, setModules] = useState<LearnModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!categoryId) return;
      
      try {
        setIsLoading(true);
        const categories = await getCategoriesFromDatabase();
        const foundCategory = categories.find(c => c.id === categoryId);
        setCategory(foundCategory);
        
        const categoryModules = await getModulesForCategory(categoryId);
        setModules(categoryModules);
      } catch (error) {
        logger.error('Error loading learn data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [categoryId]);

  // Get interactive tasks for this category
  const interactiveTasks = useMemo(() => {
    return interactiveTasksByCategory[categoryId || ""] || [];
  }, [categoryId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MicrochipLoader />
          <p className="text-muted-foreground mt-4">Lade Lerninhalte...</p>
        </div>
      </main>
    );
  }

  if (!categoryId || !category) {
    return (
      <main className="min-h-screen bg-background px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Kategorie nicht gefunden</h1>
          <p className="text-muted-foreground mb-6">Wähle eine Kategorie auf der Startseite aus.</p>
          <Button asChild variant="outline">
            <Link to="/">Zurück zur Startseite</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO 
        title={`${category?.title || 'Lernen'} | IHK IT-Prüfungsvorbereitung`}
        description={category?.description || 'Lerne mit interaktiven Übungen für deine IHK IT-Prüfung'}
        keywords={`${category?.title}, IHK, IT-Prüfung, Lernen, Übungen`}
      />
      <main className="min-h-screen bg-background">
      <header className="px-6 pt-14 pb-10 bg-gradient-to-b from-background to-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block text-xs uppercase tracking-wider text-muted-foreground">{category.difficulty}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2">{category.title}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">{category.description}</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/">Zur Übersicht</Link>
          </Button>
        </div>
      </header>

      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {!selectedMethod ? (
            // Main Learning Hub
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Lernmethoden</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Wähle zwischen verschiedenen Lernmethoden oder starte das interaktive Training für eine abwechslungsreiche Lernerfahrung.
                </p>
              </div>

              {interactiveTasks.length === 0 && modules.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold mb-2">Inhalte werden erstellt</h3>
                  <p className="text-muted-foreground">
                    Für diese Kategorie werden die Lerninhalte gerade erstellt. Schau bald wieder vorbei!
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Interactive Training */}
                  {interactiveTasks.length > 0 && (
                    <div className="md:col-span-3 mb-4 md:mb-6">
                      <GradientShadowCard>
                        <Card 
                          className="cursor-pointer p-4 sm:p-6 md:p-8 hover:scale-[1.02] transition-transform bg-gradient-to-br from-primary/5 to-accent/5"
                          onClick={() => setSelectedMethod('interactive')}
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                              <Zap className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary animate-pulse" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">🚀 Interaktives Training</h3>
                              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Spannende, praxisnahe Aufgaben mit Hilfsmitteln, Tipps und Gamification-Elementen
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  {interactiveTasks.length} Aufgaben
                                </span>
                                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                                  Punkte & Badges
                                </span>
                                <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                                  Adaptive Hilfe
                                </span>
                              </div>
                            </div>
                            <Button size="default" className="w-full sm:w-auto sm:ml-auto shrink-0">
                              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                              <span className="hidden sm:inline">Jetzt starten</span>
                              <span className="sm:hidden">Starten</span>
                            </Button>
                          </div>
                        </Card>
                      </GradientShadowCard>
                    </div>
                  )}

                  {/* Flashcards */}
                  <GradientShadowCard>
                    <Card 
                      className="cursor-pointer p-4 sm:p-6 md:p-8 text-center h-full flex flex-col justify-between hover:scale-105 transition-transform"
                      onClick={() => setSelectedMethod('flashcards')}
                    >
                      <div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center">
                          <span className="text-xl sm:text-2xl">🃏</span>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">Karteikarten</h3>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                          Klassisches Lernen mit Frage-Antwort-Karten für effektives Memorieren
                        </p>
                      </div>
                      <Button variant="outline" className="w-full mt-4 sm:mt-6" size="default">
                        Karteikarten lernen
                      </Button>
                    </Card>
                  </GradientShadowCard>

                  {/* Quiz */}
                  <GradientShadowCard>
                    <Card 
                      className="cursor-pointer p-4 sm:p-6 md:p-8 text-center h-full flex flex-col justify-between hover:scale-105 transition-transform"
                      onClick={() => setSelectedMethod('quiz')}
                    >
                      <div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center">
                          <span className="text-xl sm:text-2xl">❓</span>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">Quiz</h3>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                          Multiple-Choice-Fragen zum Testen und Vertiefen deines Wissens
                        </p>
                      </div>
                      <Button variant="outline" className="w-full mt-4 sm:mt-6" size="default">
                        Quiz starten
                      </Button>
                    </Card>
                  </GradientShadowCard>

                  {/* Focus Training */}
                  <div className="md:col-span-3">
                    <GradientShadowCard>
                      <Card 
                        className="cursor-pointer p-4 sm:p-6 md:p-8 hover:scale-[1.02] transition-transform"
                        onClick={() => setSelectedMethod('focus')}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-destructive/20 to-primary/20 flex items-center justify-center shrink-0">
                            <Target className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Schwerpunkt-Training</h3>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                              Konzentriere dich auf deine schwierigsten Themen mit personalisiertem Training
                            </p>
                          </div>
                          <Button size="default" className="w-full sm:w-auto sm:ml-auto shrink-0">
                            <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            <span className="hidden sm:inline">Schwerpunkte trainieren</span>
                            <span className="sm:hidden">Training</span>
                          </Button>
                        </div>
                      </Card>
                    </GradientShadowCard>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Learning Content View
            <div>
              <div className="mb-8 flex items-center gap-4">
                <Button variant="outline" onClick={() => setSelectedMethod(null)}>
                  ← Zurück zur Übersicht
                </Button>
              </div>
              
              <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
                {selectedMethod === 'interactive' && interactiveTasks.length > 0 && (
                  <InteractiveTraining tasks={interactiveTasks} categoryId={categoryId} />
                )}

                {selectedMethod === 'flashcards' && modules.filter(m => m.type === 'flashcards').length > 0 && (
                  <Flashcards 
                    cards={modules.filter(m => m.type === 'flashcards').flatMap(m => m.cards)} 
                    categoryId={categoryId} 
                    moduleIndex={0} 
                  />
                )}

                {selectedMethod === 'quiz' && modules.filter(m => m.type === 'quiz').length > 0 && (
                  <Quiz 
                    questions={modules.filter(m => m.type === 'quiz').flatMap(m => m.questions)} 
                  />
                )}

                {selectedMethod === 'focus' && (
                  <FocusTraining modules={modules} categoryId={categoryId} />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
    </>
  );
};

export default LearnPage;
