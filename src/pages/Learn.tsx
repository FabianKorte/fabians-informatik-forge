import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { getModulesForCategory } from "@/data/learnContent";
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
  const modules: LearnModule[] = useMemo(() => getModulesForCategory(categoryId || ""), [categoryId]);
  const category = categories.find((c) => c.id === categoryId);

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
          {modules.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Für diese Kategorie werden die Lerninhalte gerade erstellt.</p>
            </div>
          ) : (
            <Tabs defaultValue={"m-0"} className="w-full">
              <TabsList className="mb-6 flex flex-wrap gap-2">
                {modules.map((m, i) => (
                  <TabsTrigger key={i} value={`m-${i}`} className="capitalize">
                    {m.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {modules.map((m, i) => (
                <TabsContent key={i} value={`m-${i}`}>
                  <article className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
                    {m.type === "flashcards" && <Flashcards cards={m.cards} />}
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
      </section>
    </main>
  );
};

export default LearnPage;
