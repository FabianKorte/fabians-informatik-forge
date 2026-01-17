import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { javaCurriculum } from "@/data/java/curriculum";

const LOCAL_STORAGE_KEY = "java-progress";
const CURRENT_CHAPTER_KEY = "java-current-chapter";
const CURRENT_LESSON_KEY = "java-current-lesson";

interface JavaProgress {
  completedLessons: Set<string>;
  currentChapterId: string;
  currentLessonId: string;
}

export function useJavaProgress() {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [currentChapterId, setCurrentChapterId] = useState(javaCurriculum[0]?.id || "chapter-0");
  const [currentLessonId, setCurrentLessonId] = useState(javaCurriculum[0]?.lessons[0]?.id || "0-1");
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load progress on mount or when user changes
  useEffect(() => {
    const loadProgress = async () => {
      setIsLoading(true);
      
      if (user) {
        // Load from Supabase for authenticated users
        try {
          const { data, error } = await supabase
            .from("user_progress")
            .select("progress_data, module_index")
            .eq("user_id", user.id)
            .eq("category_id", "java")
            .eq("module_type", "java-learning");

          if (error) throw error;

          if (data && data.length > 0) {
            // Combine all progress data
            const allCompleted = new Set<string>();
            let savedChapter = javaCurriculum[0]?.id;
            let savedLesson = javaCurriculum[0]?.lessons[0]?.id;

            data.forEach((row) => {
              const progressData = row.progress_data as { 
                completedLessons?: string[]; 
                currentChapterId?: string;
                currentLessonId?: string;
              };
              
              if (progressData.completedLessons) {
                progressData.completedLessons.forEach(id => allCompleted.add(id));
              }
              if (progressData.currentChapterId) {
                savedChapter = progressData.currentChapterId;
              }
              if (progressData.currentLessonId) {
                savedLesson = progressData.currentLessonId;
              }
            });

            setCompletedLessons(allCompleted);
            setCurrentChapterId(savedChapter);
            setCurrentLessonId(savedLesson);

            // Migrate localStorage data to Supabase if exists
            const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (localData) {
              const localLessons = JSON.parse(localData) as string[];
              localLessons.forEach(id => allCompleted.add(id));
              setCompletedLessons(allCompleted);
              
              // Clear localStorage after migration
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              localStorage.removeItem(CURRENT_CHAPTER_KEY);
              localStorage.removeItem(CURRENT_LESSON_KEY);
            }
          } else {
            // No Supabase data - check localStorage for migration
            const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (localData) {
              const localLessons = new Set(JSON.parse(localData) as string[]);
              setCompletedLessons(localLessons);
              
              const savedChapter = localStorage.getItem(CURRENT_CHAPTER_KEY);
              const savedLesson = localStorage.getItem(CURRENT_LESSON_KEY);
              
              if (savedChapter) setCurrentChapterId(savedChapter);
              if (savedLesson) setCurrentLessonId(savedLesson);
              
              // Clear localStorage after loading (will save to Supabase)
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              localStorage.removeItem(CURRENT_CHAPTER_KEY);
              localStorage.removeItem(CURRENT_LESSON_KEY);
            }
          }
        } catch (error) {
          console.error("Error loading Java progress from Supabase:", error);
          // Fallback to localStorage
          loadFromLocalStorage();
        }
      } else {
        // Load from localStorage for unauthenticated users
        loadFromLocalStorage();
      }
      
      setIsLoading(false);
    };

    const loadFromLocalStorage = () => {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setCompletedLessons(new Set(JSON.parse(saved)));
      }
      
      const savedChapter = localStorage.getItem(CURRENT_CHAPTER_KEY);
      const savedLesson = localStorage.getItem(CURRENT_LESSON_KEY);
      
      if (savedChapter) setCurrentChapterId(savedChapter);
      if (savedLesson) setCurrentLessonId(savedLesson);
    };

    loadProgress();
  }, [user]);

  // Save progress to Supabase or localStorage
  const saveProgress = useCallback(async (
    newCompletedLessons: Set<string>,
    newChapterId: string,
    newLessonId: string
  ) => {
    if (user) {
      setIsSyncing(true);
      try {
        const progressData = {
          completedLessons: [...newCompletedLessons],
          currentChapterId: newChapterId,
          currentLessonId: newLessonId,
        };

        const { error } = await supabase
          .from("user_progress")
          .upsert({
            user_id: user.id,
            category_id: "java",
            module_type: "java-learning",
            module_index: 0,
            progress_data: progressData,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: "user_id,category_id,module_type,module_index"
          });

        if (error) throw error;
      } catch (error) {
        console.error("Error saving Java progress to Supabase:", error);
        // Fallback to localStorage
        saveToLocalStorage(newCompletedLessons, newChapterId, newLessonId);
      } finally {
        setIsSyncing(false);
      }
    } else {
      saveToLocalStorage(newCompletedLessons, newChapterId, newLessonId);
    }
  }, [user]);

  const saveToLocalStorage = (
    lessons: Set<string>,
    chapterId: string,
    lessonId: string
  ) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...lessons]));
    localStorage.setItem(CURRENT_CHAPTER_KEY, chapterId);
    localStorage.setItem(CURRENT_LESSON_KEY, lessonId);
  };

  // Mark lesson as completed
  const markLessonComplete = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set([...prev, lessonId]);
      saveProgress(newSet, currentChapterId, currentLessonId);
      return newSet;
    });
  }, [currentChapterId, currentLessonId, saveProgress]);

  // Navigate to a lesson
  const navigateToLesson = useCallback((chapterId: string, lessonId: string) => {
    setCurrentChapterId(chapterId);
    setCurrentLessonId(lessonId);
    saveProgress(completedLessons, chapterId, lessonId);
  }, [completedLessons, saveProgress]);

  // Calculate streak (consecutive completed lessons from start)
  const streak = (() => {
    let count = 0;
    for (const chapter of javaCurriculum) {
      for (const lesson of chapter.lessons) {
        if (completedLessons.has(lesson.id)) {
          count++;
        } else {
          return count;
        }
      }
    }
    return count;
  })();

  // Total lessons count
  const totalLessons = javaCurriculum.reduce((acc, ch) => acc + ch.lessons.length, 0);

  return {
    completedLessons,
    currentChapterId,
    currentLessonId,
    isLoading,
    isSyncing,
    markLessonComplete,
    navigateToLesson,
    streak,
    totalLessons,
    completedCount: completedLessons.size,
  };
}
