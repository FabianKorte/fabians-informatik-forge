import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { javaCurriculum } from "@/data/java/curriculum";
import { LessonView } from "@/components/java/LessonView";
import { ChapterProgress } from "@/components/java/ChapterProgress";
import { useJavaProgress } from "@/hooks/useJavaProgress";
import { Coffee, ArrowLeft, Trophy, Flame, Loader2, Cloud } from "lucide-react";
import { motion } from "framer-motion";

export default function JavaLearning() {
  const {
    completedLessons,
    currentChapterId,
    currentLessonId,
    isLoading,
    isSyncing,
    markLessonComplete,
    navigateToLesson,
    streak,
    totalLessons,
    completedCount,
  } = useJavaProgress();

  // Get current lesson
  const currentChapter = useMemo(() => 
    javaCurriculum.find(ch => ch.id === currentChapterId) || javaCurriculum[0],
    [currentChapterId]
  );

  const currentLesson = useMemo(() => 
    currentChapter.lessons.find(l => l.id === currentLessonId) || currentChapter.lessons[0],
    [currentChapter, currentLessonId]
  );

  // Navigation
  const { hasNext, nextChapterId, nextLessonId } = useMemo(() => {
    const currentLessonIndex = currentChapter.lessons.findIndex(l => l.id === currentLessonId);
    
    // Next lesson in same chapter
    if (currentLessonIndex < currentChapter.lessons.length - 1) {
      return {
        hasNext: true,
        nextChapterId: currentChapterId,
        nextLessonId: currentChapter.lessons[currentLessonIndex + 1].id,
      };
    }

    // First lesson of next chapter
    const currentChapterIndex = javaCurriculum.findIndex(ch => ch.id === currentChapterId);
    if (currentChapterIndex < javaCurriculum.length - 1) {
      const nextChapter = javaCurriculum[currentChapterIndex + 1];
      return {
        hasNext: true,
        nextChapterId: nextChapter.id,
        nextLessonId: nextChapter.lessons[0].id,
      };
    }

    return { hasNext: false, nextChapterId: "", nextLessonId: "" };
  }, [currentChapterId, currentLessonId, currentChapter]);

  const handleComplete = useCallback(() => {
    markLessonComplete(currentLessonId);
  }, [currentLessonId, markLessonComplete]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      navigateToLesson(nextChapterId, nextLessonId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasNext, nextChapterId, nextLessonId, navigateToLesson]);

  const handleSelectLesson = useCallback((chapterId: string, lessonId: string) => {
    navigateToLesson(chapterId, lessonId);
  }, [navigateToLesson]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-950/20 via-background to-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <p className="text-muted-foreground">Lade Fortschritt...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Java Programmierung lernen | Interaktiver Kurs"
        description="Lerne Java von Grund auf mit echtem Code-Editor und direkter Ausführung. Schritt für Schritt vom Anfänger zum Profi."
        keywords="Java lernen, Java Kurs, Programmieren lernen, Java Tutorial, Java für Anfänger"
      />

      <div className="min-h-screen bg-gradient-to-b from-orange-950/20 via-background to-background">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold">Java Programmierung</h1>
                  <p className="text-xs text-muted-foreground">Interaktiver Lernpfad</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              {isSyncing && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Cloud className="w-3 h-3 animate-pulse" />
                  <span>Speichern...</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>{streak} Streak</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>{completedCount}/{totalLessons}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8">
            {/* Sidebar - Chapter Progress */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <ChapterProgress
                chapters={javaCurriculum}
                currentChapterId={currentChapterId}
                currentLessonId={currentLessonId}
                completedLessons={completedLessons}
                onSelectLesson={handleSelectLesson}
              />
            </aside>

            {/* Main Content - Lesson View */}
            <motion.div
              key={currentLessonId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LessonView
                lesson={currentLesson}
                onComplete={handleComplete}
                onNext={handleNext}
                hasNext={hasNext}
              />
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
