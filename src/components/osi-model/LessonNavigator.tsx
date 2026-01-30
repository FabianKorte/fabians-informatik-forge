import { cn } from "@/lib/utils";
import { osiLessons } from "@/data/osiExercises";
import { CheckCircle, BookOpen, Puzzle, AlertTriangle, HelpCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LessonNavigatorProps {
  currentIndex: number;
  completedLessonIds: Set<string>;
  onNavigate: (index: number) => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "theory": return <BookOpen className="w-4 h-4" />;
    case "drag-drop": return <Puzzle className="w-4 h-4" />;
    case "diagnostic": return <AlertTriangle className="w-4 h-4" />;
    case "quiz": return <HelpCircle className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "theory": return "Theorie";
    case "drag-drop": return "Zuordnung";
    case "diagnostic": return "Diagnose";
    case "quiz": return "Quiz";
    default: return type;
  }
};

export function LessonNavigator({ currentIndex, completedLessonIds, onNavigate }: LessonNavigatorProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-4">Lektionen</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {osiLessons.map((lesson, index) => {
            const isCompleted = completedLessonIds.has(lesson.id);
            const isCurrent = index === currentIndex;
            
            return (
              <Button
                key={lesson.id}
                variant={isCurrent ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left h-auto py-3 px-3",
                  isCompleted && !isCurrent && "bg-green-500/10 hover:bg-green-500/20"
                )}
                onClick={() => onNavigate(index)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5",
                    isCompleted ? "bg-green-500 text-white" : "bg-muted"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-medium text-sm truncate",
                      isCurrent && "text-primary-foreground"
                    )}>
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn(
                        "flex items-center gap-1 text-xs",
                        isCurrent ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {getTypeIcon(lesson.type)}
                        {getTypeBadge(lesson.type)}
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
      
      {/* Progress indicator */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Fortschritt</span>
          <span className="font-medium">
            {completedLessonIds.size} / {osiLessons.length}
          </span>
        </div>
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all"
            style={{ width: `${(completedLessonIds.size / osiLessons.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
