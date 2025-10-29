import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SuggestionPreviewProps {
  content: any;
  moduleType: string;
}

export const SuggestionPreview = ({ content, moduleType }: SuggestionPreviewProps) => {
  if (moduleType === "flashcards" && content.cards) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge>Karteikarten</Badge>
          <span className="text-sm text-muted-foreground">{content.cards.length} Karten</span>
        </div>
        <div className="space-y-3">
          {content.cards.map((card: any, index: number) => (
            <Card key={`card-${index}-${card.front?.substring(0, 20)}`} className="p-4">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Frage:</p>
                  <p className="text-sm">{card.question || card.front}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Antwort:</p>
                  <p className="text-sm">{card.answer || card.back}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (moduleType === "quiz" && content.questions) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Quiz</Badge>
          <span className="text-sm text-muted-foreground">{content.questions.length} Fragen</span>
        </div>
        <div className="space-y-3">
          {content.questions.map((q: any, index: number) => (
            <Card key={`question-${index}-${q.question?.substring(0, 20)}`} className="p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Frage {index + 1}:</p>
                  <p className="text-sm font-medium">{q.question}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Antwortmöglichkeiten:</p>
                  {q.options?.map((option: string, optIndex: number) => (
                    <div 
                      key={optIndex} 
                      className={`p-2 rounded text-sm ${
                        optIndex === q.correctAnswer 
                          ? 'bg-success/10 text-success-foreground border border-success/20' 
                          : 'bg-muted'
                      }`}
                    >
                      {optIndex === q.correctAnswer && '✓ '}
                      {option}
                    </div>
                  ))}
                </div>
                {q.explanation && (
                  <div className="text-xs text-muted-foreground italic">
                    Erklärung: {q.explanation}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Fallback: JSON anzeigen
  return (
    <div className="space-y-2">
      <Badge variant="outline">Vorschau nicht verfügbar</Badge>
      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
};