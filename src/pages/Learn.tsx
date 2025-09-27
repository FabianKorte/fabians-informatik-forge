import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/categories";
import { getModulesForCategory } from "@/data/learn";
import { GradientShadowCard } from "@/components/ui/gradient-shadow-card";
import type { LearnModule } from "@/types/learn";
import { Flashcards } from "@/components/learn/Flashcards";
import { Quiz } from "@/components/learn/Quiz";
import { FocusTraining } from "@/components/learn/FocusTraining";
import { InteractiveTraining } from "@/components/learn/InteractiveTraining";
import { interactiveTasksByCategory } from "@/data/learn/interactive-training";
import { Play, Target, Brain, Zap } from "lucide-react";

const LearnPage = () => {
  const { categoryId } = useParams();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const modules: LearnModule[] = useMemo(() => getModulesForCategory(categoryId || ""), [categoryId]);
  const category = categories.find((c) => c.id === categoryId);

  // Get all available activities from all modules
  const allActivities = useMemo(() => {
    const activities: Array<{module: LearnModule, moduleIndex: number}> = [];
    modules.forEach((module, index) => {
      if (module.type === 'flashcards' || module.type === 'quiz') {
        activities.push({ module, moduleIndex: index });
      }
    });
    return activities;
  }, [modules]);

  // Get interactive tasks for this category
  const interactiveTasks = useMemo(() => {
    return interactiveTasksByCategory[categoryId || ""] || [];
  }, [categoryId]);

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

              {allActivities.length === 0 && interactiveTasks.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold mb-2">Inhalte werden erstellt</h3>
                  <p className="text-muted-foreground">
                    Für diese Kategorie werden die Lerninhalte gerade erstellt. Schau bald wieder vorbei!
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* New Interactive Training */}
                  {interactiveTasks.length > 0 && (
                    <div className="md:col-span-3 mb-6">
                      <GradientShadowCard>
                        <Card 
                          className="cursor-pointer p-8 text-center hover:scale-[1.02] transition-transform bg-gradient-to-br from-primary/5 to-accent/5"
                          onClick={() => setSelectedMethod('new-interactive')}
                        >
                          <div className="flex items-center justify-center gap-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <Zap className="w-10 h-10 text-primary animate-pulse" />
                            </div>
                            <div className="text-left">
                              <h3 className="text-2xl font-bold mb-2">🚀 Neues Interaktives Training</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                Spannende, praxisnahe Aufgaben mit Hilfsmitteln, Tipps und Gamification-Elementen
                              </p>
                              <div className="flex gap-2 mt-3">
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
                            <Button size="lg" className="ml-auto">
                              <Zap className="w-5 h-5 mr-2" />
                              Jetzt starten
                            </Button>
                          </div>
                        </Card>
                      </GradientShadowCard>
                    </div>
                  )}
                  
                  {/* Classic Interactive Training (fallback) */}
                  {allActivities.length > 0 && (
                    <GradientShadowCard>
                      <Card 
                        className="cursor-pointer p-8 text-center h-full flex flex-col justify-between hover:scale-105 transition-transform"
                        onClick={() => setSelectedMethod('interactive')}
                      >
                        <div>
                          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Play className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">Klassisches Training</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Bewährte Mischung aus Karteikarten und Quizzes
                          </p>
                        </div>
                        <Button variant="outline" className="w-full mt-6" size="lg">
                          Training starten
                        </Button>
                      </Card>
                    </GradientShadowCard>
                  )}

                  {/* Flashcards */}
                  <GradientShadowCard>
                    <Card 
                      className="cursor-pointer p-8 text-center h-full flex flex-col justify-between hover:scale-105 transition-transform"
                      onClick={() => setSelectedMethod('flashcards')}
                    >
                      <div>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center">
                          <span className="text-2xl">🃏</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Karteikarten</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Klassisches Lernen mit Frage-Antwort-Karten für effektives Memorieren
                        </p>
                      </div>
                      <Button variant="outline" className="w-full mt-6" size="lg">
                        Karteikarten lernen
                      </Button>
                    </Card>
                  </GradientShadowCard>

                  {/* Quiz */}
                  <GradientShadowCard>
                    <Card 
                      className="cursor-pointer p-8 text-center h-full flex flex-col justify-between hover:scale-105 transition-transform"
                      onClick={() => setSelectedMethod('quiz')}
                    >
                      <div>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center">
                          <span className="text-2xl">❓</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Quiz</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Multiple-Choice-Fragen zum Testen und Vertiefen deines Wissens
                        </p>
                      </div>
                      <Button variant="outline" className="w-full mt-6" size="lg">
                        Quiz starten
                      </Button>
                    </Card>
                  </GradientShadowCard>

                  {/* Focus Training */}
                  <div className="md:col-span-3">
                    <GradientShadowCard>
                      <Card 
                        className="cursor-pointer p-8 text-center hover:scale-[1.02] transition-transform"
                        onClick={() => setSelectedMethod('focus')}
                      >
                        <div className="flex items-center justify-center gap-6">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-destructive/20 to-primary/20 flex items-center justify-center">
                            <Target className="w-10 h-10 text-primary" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-2xl font-bold mb-2">Schwerpunkt-Training</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              Konzentriere dich auf deine schwierigsten Themen mit personalisiertem Training
                            </p>
                          </div>
                          <Button size="lg" className="ml-auto">
                            <Brain className="w-5 h-5 mr-2" />
                            Schwerpunkte trainieren
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
                {selectedMethod === 'new-interactive' && interactiveTasks.length > 0 && (
                  <InteractiveTraining tasks={interactiveTasks} categoryId={categoryId} />
                )}

                {selectedMethod === 'interactive' && allActivities.length > 0 && (
                  <div>
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">Interaktives Training</h3>
                      <p className="text-muted-foreground">Aktivität {currentActivityIndex + 1} von {allActivities.length}</p>
                    </div>
                    
                    {(() => {
                      const currentActivity = allActivities[currentActivityIndex];
                      if (!currentActivity) return null;
                      
                      const { module, moduleIndex } = currentActivity;
                      
                      if (module.type === 'flashcards') {
                        return <Flashcards cards={module.cards} categoryId={categoryId} moduleIndex={moduleIndex} />;
                      }
                      if (module.type === 'quiz') {
                        return <Quiz questions={module.questions} />;
                      }
                      return null;
                    })()}
                    
                    <div className="flex justify-center gap-4 mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentActivityIndex(Math.max(0, currentActivityIndex - 1))}
                        disabled={currentActivityIndex === 0}
                      >
                        ← Vorherige
                      </Button>
                      <Button 
                        onClick={() => setCurrentActivityIndex(Math.min(allActivities.length - 1, currentActivityIndex + 1))}
                        disabled={currentActivityIndex === allActivities.length - 1}
                      >
                        Nächste →
                      </Button>
                    </div>
                  </div>
                )}

                {selectedMethod === 'flashcards' && (
                  <Tabs defaultValue="m-0" className="w-full">
                    <TabsList className="mb-6 flex flex-wrap gap-2">
                      {modules.filter(m => m.type === 'flashcards').map((m, i) => (
                        <TabsTrigger key={i} value={`m-${i}`} className="capitalize">
                          {m.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {modules.filter(m => m.type === 'flashcards').map((m, i) => (
                      <TabsContent key={i} value={`m-${i}`}>
                        <Flashcards cards={m.cards} categoryId={categoryId} moduleIndex={i} />
                      </TabsContent>
                    ))}
                  </Tabs>
                )}

                {selectedMethod === 'quiz' && (
                  <Tabs defaultValue="m-0" className="w-full">
                    <TabsList className="mb-6 flex flex-wrap gap-2">
                      {modules.filter(m => m.type === 'quiz').map((m, i) => (
                        <TabsTrigger key={i} value={`m-${i}`} className="capitalize">
                          {m.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {modules.filter(m => m.type === 'quiz').map((m, i) => (
                      <TabsContent key={i} value={`m-${i}`}>
                        <Quiz questions={m.questions} />
                      </TabsContent>
                    ))}
                  </Tabs>
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
  );
};

export default LearnPage;
