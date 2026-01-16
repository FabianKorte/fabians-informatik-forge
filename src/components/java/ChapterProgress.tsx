import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { JavaChapter, JavaLesson } from "@/types/javaLearning";
import { CheckCircle2, Lock, BookOpen, Code2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChapterProgressProps {
  chapters: JavaChapter[];
  currentChapterId: string;
  currentLessonId: string;
  completedLessons: Set<string>;
  onSelectLesson: (chapterId: string, lessonId: string) => void;
}

export function ChapterProgress({
  chapters,
  currentChapterId,
  currentLessonId,
  completedLessons,
  onSelectLesson,
}: ChapterProgressProps) {
  const getLessonIcon = (lesson: JavaLesson, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
    switch (lesson.type) {
      case "theory":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "exercise":
        return <Code2 className="w-4 h-4 text-green-500" />;
      case "challenge":
        return <Trophy className="w-4 h-4 text-orange-500" />;
    }
  };

  const getTotalProgress = () => {
    const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Gesamtfortschritt</span>
          <span className="text-sm text-muted-foreground">{completedLessons.size} / {chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)}</span>
        </div>
        <Progress value={getTotalProgress()} className="h-2" />
      </Card>

      {/* Chapters */}
      {chapters.map((chapter, chapterIndex) => {
        const chapterCompleted = chapter.lessons.filter(l => completedLessons.has(l.id)).length;
        const chapterProgress = Math.round((chapterCompleted / chapter.lessons.length) * 100);
        const isCurrentChapter = chapter.id === currentChapterId;
        const isLocked = !chapter.isUnlocked && chapterIndex > 0;

        // Unlock chapter if previous is complete
        const previousChapter = chapters[chapterIndex - 1];
        const previousComplete = previousChapter 
          ? previousChapter.lessons.every(l => completedLessons.has(l.id))
          : true;
        const isUnlocked = chapter.isUnlocked || previousComplete;

        return (
          <Card
            key={chapter.id}
            className={cn(
              "overflow-hidden transition-all",
              isCurrentChapter && "ring-2 ring-primary",
              !isUnlocked && "opacity-60"
            )}
          >
            <div className="p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {!isUnlocked ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : chapterProgress === 100 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center text-xs font-bold">
                      {chapterIndex + 1}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-sm">{chapter.title}</h3>
                    <p className="text-xs text-muted-foreground">{chapter.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {chapterCompleted}/{chapter.lessons.length}
                </Badge>
              </div>
              <Progress value={chapterProgress} className="h-1.5 mt-3" />
            </div>

            {/* Lessons */}
            {isUnlocked && (
              <div className="divide-y divide-border/50">
                {chapter.lessons.map((lesson) => {
                  const isCompleted = completedLessons.has(lesson.id);
                  const isCurrent = lesson.id === currentLessonId;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(chapter.id, lesson.id)}
                      className={cn(
                        "w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors",
                        isCurrent && "bg-primary/5",
                        isCompleted && "bg-green-500/5"
                      )}
                    >
                      {getLessonIcon(lesson, isCompleted)}
                      <span className={cn(
                        "flex-1 text-sm",
                        isCompleted && "text-muted-foreground line-through"
                      )}>
                        {lesson.title}
                      </span>
                      {isCurrent && (
                        <Badge variant="default" className="text-xs">Aktuell</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
