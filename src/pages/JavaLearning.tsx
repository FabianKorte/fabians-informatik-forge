import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { javaCurriculum } from "@/data/java/curriculum";
import { LessonView } from "@/components/java/LessonView";
import { ChapterProgress } from "@/components/java/ChapterProgress";
import { PracticeMode } from "@/components/java/PracticeMode";
import { ProgressOverview } from "@/components/java/ProgressOverview";
import { useJavaProgress } from "@/hooks/useJavaProgress";
import { Coffee, ArrowLeft, Trophy, Flame, Loader2, Cloud, Shuffle, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

type ViewMode = "learning" | "practice" | "progress";

export default function JavaLearning() {
  const [viewMode, setViewMode] = useState<ViewMode>("learning");
  
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

  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

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
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
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

              {/* Stats & Buttons */}
              <div className="flex items-center gap-3">
                {isSyncing && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Cloud className="w-3 h-3 animate-pulse" />
                    <span>Speichern...</span>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setViewMode("progress")}
                  className="hidden sm:flex"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Statistik
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setViewMode("practice")}
                  className="hidden sm:flex"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Üben
                </Button>
                
                <div className="flex items-center gap-2 text-sm">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>{streak}</span>
                </div>
                <button 
                  onClick={() => setViewMode("progress")}
                  className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                >
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>{completedCount}/{totalLessons}</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 flex items-center gap-3">
              <Progress value={progressPercentage} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground w-10">{progressPercentage}%</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {viewMode === "practice" && (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <PracticeMode 
                  completedLessons={completedLessons}
                  onClose={() => setViewMode("learning")}
                />
              </motion.div>
            )}
            
            {viewMode === "progress" && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ProgressOverview 
                  completedLessons={completedLessons}
                  streak={streak}
                  onClose={() => setViewMode("learning")}
                />
              </motion.div>
            )}
            
            {viewMode === "learning" && (
              <motion.div
                key="learning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8">
                  {/* Sidebar - Chapter Progress */}
                  <aside className="lg:sticky lg:top-28 lg:self-start">
                    <ChapterProgress
                      chapters={javaCurriculum}
                      currentChapterId={currentChapterId}
                      currentLessonId={currentLessonId}
                      completedLessons={completedLessons}
                      onSelectLesson={handleSelectLesson}
                    />
                    
                    {/* Mobile Buttons */}
                    <div className="flex gap-2 mt-4 sm:hidden">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setViewMode("progress")}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Statistik
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setViewMode("practice")}
                      >
                        <Shuffle className="w-4 h-4 mr-2" />
                        Üben
                      </Button>
                    </div>
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
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
