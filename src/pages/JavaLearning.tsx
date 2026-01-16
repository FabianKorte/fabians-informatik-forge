import { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { javaCurriculum } from "@/data/java/curriculum";
import { LessonView } from "@/components/java/LessonView";
import { ChapterProgress } from "@/components/java/ChapterProgress";
import { Coffee, ArrowLeft, Trophy, Flame, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function JavaLearning() {
  // Load progress from localStorage
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("java-progress");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [currentChapterId, setCurrentChapterId] = useState(() => {
    const saved = localStorage.getItem("java-current-chapter");
    return saved || javaCurriculum[0].id;
  });

  const [currentLessonId, setCurrentLessonId] = useState(() => {
    const saved = localStorage.getItem("java-current-lesson");
    return saved || javaCurriculum[0].lessons[0].id;
  });

  // Save progress
  useEffect(() => {
    localStorage.setItem("java-progress", JSON.stringify([...completedLessons]));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem("java-current-chapter", currentChapterId);
    localStorage.setItem("java-current-lesson", currentLessonId);
  }, [currentChapterId, currentLessonId]);

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
    setCompletedLessons(prev => new Set([...prev, currentLessonId]));
  }, [currentLessonId]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      setCurrentChapterId(nextChapterId);
      setCurrentLessonId(nextLessonId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasNext, nextChapterId, nextLessonId]);

  const handleSelectLesson = useCallback((chapterId: string, lessonId: string) => {
    setCurrentChapterId(chapterId);
    setCurrentLessonId(lessonId);
  }, []);

  // Stats
  const totalLessons = useMemo(() => 
    javaCurriculum.reduce((acc, ch) => acc + ch.lessons.length, 0),
    []
  );

  const streak = useMemo(() => {
    // Simple streak calculation based on consecutive completed lessons
    let count = 0;
    for (const chapter of javaCurriculum) {
      for (const lesson of chapter.lessons) {
        if (completedLessons.has(lesson.id)) {
          count++;
        } else {
          break;
        }
      }
    }
    return count;
  }, [completedLessons]);

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
              <div className="flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>{streak} Streak</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>{completedLessons.size}/{totalLessons}</span>
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
