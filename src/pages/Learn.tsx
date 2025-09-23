import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/categories";
import { getModulesForCategory } from "@/data/learn";
import { getAvailableMethodsForCategory } from "@/data/categoryMethods";
import { GradientShadowCard } from "@/components/ui/gradient-shadow-card";
import type { LearnModule } from "@/types/learn";
import { Flashcards } from "@/components/learn/Flashcards";
import { Quiz } from "@/components/learn/Quiz";
import { Matching } from "@/components/learn/Matching";
import { CodeChallengeComponent } from "@/components/learn/CodeChallenge";
import { DragDropGameComponent } from "@/components/learn/DragDropGame";
import { MemoryGameComponent } from "@/components/learn/MemoryGame";
import { TimelineView } from "@/components/learn/TimelineView";
import { ScenarioGame } from "@/components/learn/ScenarioGame";

const LearnPage = () => {
  const { categoryId } = useParams();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const modules: LearnModule[] = useMemo(() => getModulesForCategory(categoryId || ""), [categoryId]);
  const category = categories.find((c) => c.id === categoryId);
  const availableMethods = useMemo(() => getAvailableMethodsForCategory(categoryId || ""), [categoryId]);

  const learningMethods = [
    { id: "flashcards", title: "Karteikarten", description: "Klassisches Lernen mit Frage und Antwort", icon: "🃏" },
    { id: "quiz", title: "Quiz", description: "Multiple Choice Fragen zum Testen deines Wissens", icon: "❓" },
    { id: "matching", title: "Zuordnungsspiel", description: "Verbinde passende Begriffe miteinander", icon: "🔗" },
    { id: "code", title: "Code-Challenge", description: "Praktische Programmieraufgaben lösen", icon: "💻" },
    { id: "dragdrop", title: "Drag & Drop", description: "Sortiere Elemente per Drag and Drop", icon: "🔄" },
    { id: "memory", title: "Memory-Spiel", description: "Finde passende Kartenpaare", icon: "🧠" },
    { id: "timeline", title: "Timeline", description: "Lerne chronologische Abläufe", icon: "📅" },
    { id: "scenario", title: "Szenario-Training", description: "Realitätsnahe Situationen meistern", icon: "🎯" }
  ].filter(method => availableMethods.includes(method.id));

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
            // Method Selection View
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Wähle deine Lernmethode</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningMethods.map((method) => {
                  const hasContent = modules.some(m => m.type === method.id);
                  return (
                    <GradientShadowCard 
                      key={method.id}
                      onClick={() => hasContent && setSelectedMethod(method.id)}
                    >
                      <Card className="cursor-pointer">
                      <CardHeader className="text-center">
                        <div className="text-4xl mb-2">{method.icon}</div>
                        <CardTitle className="text-lg">{method.title}</CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        {hasContent ? (
                          <Button variant="outline" size="sm">Starten</Button>
                        ) : (
                          <p className="text-sm text-muted-foreground">Wird erstellt...</p>
                        )}
                      </CardContent>
                    </Card>
                    </GradientShadowCard>
                  );
                })}
              </div>
            </div>
          ) : (
            // Learning Content View
            <div>
              <div className="mb-6 flex items-center gap-4">
                <Button variant="outline" onClick={() => setSelectedMethod(null)}>
                  ← Zurück zur Methodenauswahl
                </Button>
                <h2 className="text-xl font-semibold">
                  {learningMethods.find(m => m.id === selectedMethod)?.title}
                </h2>
              </div>
              
              {modules.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground mb-2">Für diese Kategorie werden die Lerninhalte gerade erstellt.</p>
                  <p className="text-sm text-muted-foreground">Schau bald wieder vorbei für neue Inhalte!</p>
                </div>
              ) : (
                <Tabs defaultValue={"m-0"} className="w-full">
                  <TabsList className="mb-6 flex flex-wrap gap-2">
                    {modules.filter(m => m.type === selectedMethod).map((m, i) => (
                      <TabsTrigger key={i} value={`m-${i}`} className="capitalize">
                        {m.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {modules.filter(m => m.type === selectedMethod).map((m, i) => (
                    <TabsContent key={i} value={`m-${i}`}>
                      <article className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
                        {m.type === "flashcards" && <Flashcards cards={m.cards} categoryId={categoryId} moduleIndex={i} />}
                        {m.type === "quiz" && <Quiz questions={m.questions} />}
                        {m.type === "matching" && <Matching pairs={m.pairs} />}
                        {m.type === "code" && <CodeChallengeComponent challenges={m.challenges} />}
                        {m.type === "dragdrop" && <DragDropGameComponent games={m.games} />}
                        {m.type === "memory" && <MemoryGameComponent games={m.games} />}
                        {m.type === "timeline" && <TimelineView timelines={m.timelines} />}
                        {m.type === "scenario" && <ScenarioGame scenarios={m.scenarios} />}
                      </article>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default LearnPage;
