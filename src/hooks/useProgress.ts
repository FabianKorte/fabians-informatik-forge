import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { useAuth } from "@/hooks/useAuth";

interface ProgressData {
  flashcards?: {
    knownCards: number[];
    unknownCards: number[];
    lastIndex: number;
  };
  quiz?: {
    completedQuestions: number[];
    scores: number[];
    bestScore: number;
  };
  matching?: {
    completions: number;
    bestScore: number;
  };
  code?: {
    completedChallenges: number[];
  };
  dragdrop?: {
    completedGames: number[];
  };
  memory?: {
    completedGames: number[];
    bestMoves: { [gameIndex: number]: number };
  };
  timeline?: {
    viewedTimelines: number[];
  };
  scenario?: {
    completedScenarios: number[];
    correctChoices: number;
  };
}

interface AllProgressData {
  [categoryId: string]: {
    [methodType: string]: {
      [moduleIndex: string]: ProgressData;
    };
  };
}

const PROGRESS_COOKIE_NAME = "ihk_learn_progress";
const COOKIE_EXPIRES_DAYS = 90;

// Cookie utilities for backward compatibility
const setCookie = (name: string, value: string, days: number) => {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  } catch (error) {
    logger.error('Error setting cookie:', error);
  }
};

const getCookie = (name: string): string | null => {
  try {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } catch (error) {
    logger.error('Error getting cookie:', error);
    return null;
  }
};

export const useProgress = (categoryId: string, methodType: string, moduleIndex: number) => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<ProgressData>({});
  const [allProgressData, setAllProgressData] = useState<AllProgressData>({});
  const [loaded, setLoaded] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const moduleKey = moduleIndex.toString();

  // Load progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        // Load from cookies if not authenticated
        const savedProgress = getCookie(PROGRESS_COOKIE_NAME);
        if (savedProgress) {
          try {
            const parsed = JSON.parse(decodeURIComponent(savedProgress));
            setAllProgressData(parsed);
            setProgressData(parsed[categoryId]?.[methodType]?.[moduleKey] || {});
          } catch (error) {
            logger.warn("Failed to parse progress cookie:", error);
          }
        }
        setLoaded(true);
        return;
      }

      try {
        // Load from database for authenticated users
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        // Build progress data structure from database
        const dbProgress: AllProgressData = {};
        data?.forEach((record) => {
          if (!dbProgress[record.category_id]) {
            dbProgress[record.category_id] = {};
          }
          if (!dbProgress[record.category_id][record.module_type]) {
            dbProgress[record.category_id][record.module_type] = {};
          }
          dbProgress[record.category_id][record.module_type][record.module_index.toString()] =
            record.progress_data as ProgressData;
        });

        setAllProgressData(dbProgress);
        setProgressData(dbProgress[categoryId]?.[methodType]?.[moduleKey] || {});

        // Try to migrate cookie data if exists
        const cookieProgress = getCookie(PROGRESS_COOKIE_NAME);
        if (cookieProgress) {
          try {
            const parsed = JSON.parse(decodeURIComponent(cookieProgress));
            await migrateCookieDataToDatabase(parsed, user.id);
            // Clear cookie after migration
            document.cookie = `${PROGRESS_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          } catch (error) {
            logger.error('Cookie migration failed:', error);
          }
        }
      } catch (error) {
        logger.error('Failed to load progress:', error);
      } finally {
        setLoaded(true);
      }
    };

    loadProgress();
  }, [user, categoryId, methodType, moduleKey]);

  // Save progress to database or cookies
  const saveProgressToStorage = useCallback(async (updatedData: ProgressData) => {
    if (syncing) return; // Prevent concurrent saves
    setSyncing(true);

    try {
      if (!user) {
        // Save to cookies if not authenticated
        const newAllProgress = {
          ...allProgressData,
          [categoryId]: {
            ...allProgressData[categoryId],
            [methodType]: {
              ...allProgressData[categoryId]?.[methodType],
              [moduleKey]: updatedData
            }
          }
        };
        setAllProgressData(newAllProgress);
        const encoded = encodeURIComponent(JSON.stringify(newAllProgress));
        setCookie(PROGRESS_COOKIE_NAME, encoded, COOKIE_EXPIRES_DAYS);
      } else {
        // Save to database for authenticated users
        const { error } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            category_id: categoryId,
            module_type: methodType,
            module_index: moduleIndex,
            progress_data: updatedData as any,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,category_id,module_type,module_index'
          });

        if (error) {
          logger.error('Failed to save progress:', error);
          throw error;
        }

        // Update local state
        const newAllProgress = {
          ...allProgressData,
          [categoryId]: {
            ...allProgressData[categoryId],
            [methodType]: {
              ...allProgressData[categoryId]?.[methodType],
              [moduleKey]: updatedData
            }
          }
        };
        setAllProgressData(newAllProgress);
      }
    } catch (error) {
      logger.error('Error saving progress:', error);
    } finally {
      setSyncing(false);
    }
  }, [user, categoryId, methodType, moduleIndex, moduleKey, allProgressData, syncing]);

  // Migrate cookie data to database
  const migrateCookieDataToDatabase = async (cookieData: AllProgressData, userId: string) => {
    const records = [];
    
    for (const [catId, methods] of Object.entries(cookieData)) {
      for (const [modType, modules] of Object.entries(methods)) {
        for (const [modIdx, progData] of Object.entries(modules)) {
          records.push({
            user_id: userId,
            category_id: catId,
            module_type: modType,
            module_index: parseInt(modIdx),
            progress_data: progData as any,
          });
        }
      }
    }

    if (records.length > 0) {
      const { error } = await supabase
        .from('user_progress')
        .upsert(records, {
          onConflict: 'user_id,category_id,module_type,module_index'
        });

      if (error) {
        logger.error('Cookie migration error:', error);
      } else {
        logger.info('Successfully migrated cookie data to database');
      }
    }
  };

  const getModuleProgress = useCallback(() => {
    return progressData;
  }, [progressData]);

  const updateProgress = useCallback((methodData: any) => {
    const updatedData = {
      ...progressData,
      [methodType]: methodData
    };
    setProgressData(updatedData);
    saveProgressToStorage(updatedData);
  }, [progressData, methodType, saveProgressToStorage]);

  // Specific method helpers
  const saveFlashcardProgress = useCallback((knownCards: Set<number>, unknownCards: Set<number>, lastIndex: number) => {
    const updatedData = {
      ...progressData,
      flashcards: {
        knownCards: Array.from(knownCards),
        unknownCards: Array.from(unknownCards),
        lastIndex
      }
    };
    setProgressData(updatedData);
    saveProgressToStorage(updatedData);
  }, [progressData, saveProgressToStorage]);

  const saveQuizProgress = useCallback((completedQuestions: number[], newScore: number) => {
    const current = progressData.quiz || { completedQuestions: [], scores: [], bestScore: 0 };
    
    const updatedData = {
      ...progressData,
      quiz: {
        completedQuestions: [...new Set([...current.completedQuestions, ...completedQuestions])],
        scores: [...current.scores, newScore],
        bestScore: Math.max(current.bestScore, newScore)
      }
    };
    setProgressData(updatedData);
    saveProgressToStorage(updatedData);
  }, [progressData, saveProgressToStorage]);

  const saveMatchingProgress = useCallback((score: number) => {
    const current = progressData.matching || { completions: 0, bestScore: 0 };
    
    const updatedData = {
      ...progressData,
      matching: {
        completions: current.completions + 1,
        bestScore: Math.max(current.bestScore, score)
      }
    };
    setProgressData(updatedData);
    saveProgressToStorage(updatedData);
  }, [progressData, saveProgressToStorage]);

  const saveCodeProgress = useCallback((challengeIndex: number) => {
    const current = progressData.code || { completedChallenges: [] };
    
    const updatedData = {
      ...progressData,
      code: {
        completedChallenges: [...new Set([...current.completedChallenges, challengeIndex])]
      }
    };
    setProgressData(updatedData);
    saveProgressToStorage(updatedData);
  }, [progressData, saveProgressToStorage]);

  const saveDragDropProgress = useCallback((gameIndex: number) => {
    const current = progressData.dragdrop || { completedGames: [] };
    
    const updatedData = {
      ...progressData,
      dragdrop: {
        completedGames: [...new Set([...current.completedGames, gameIndex])]
      }
    };
    setProgressData(updatedData);
    saveProgressToStorage(updatedData);
  }, [progressData, saveProgressToStorage]);

  const saveMemoryProgress = useCallback((gameIndex: number, moves: number) => {
    const current = progressData.memory || { completedGames: [], bestMoves: {} };
    
    const updatedData = {
      ...progressData,
      memory: {
        completedGames: [...new Set([...current.completedGames, gameIndex])],
        bestMoves: {
          ...current.bestMoves,
          [gameIndex]: Math.min(current.bestMoves[gameIndex] || Infinity, moves)
        }
      }
    };
    setProgressData(updatedData);
    saveProgressToStorage(updatedData);
  }, [progressData, saveProgressToStorage]);

  const saveTimelineProgress = useCallback((timelineIndex: number) => {
    const current = progressData.timeline || { viewedTimelines: [] };
    
    const updatedData = {
      ...progressData,
      timeline: {
        viewedTimelines: [...new Set([...current.viewedTimelines, timelineIndex])]
      }
    };
    setProgressData(updatedData);
    saveProgressToStorage(updatedData);
  }, [progressData, saveProgressToStorage]);

  const saveScenarioProgress = useCallback((scenarioIndex: number, wasCorrect: boolean) => {
    const current = progressData.scenario || { completedScenarios: [], correctChoices: 0 };
    
    const updatedData = {
      ...progressData,
      scenario: {
        completedScenarios: [...new Set([...current.completedScenarios, scenarioIndex])],
        correctChoices: current.correctChoices + (wasCorrect ? 1 : 0)
      }
    };
    setProgressData(updatedData);
    saveProgressToStorage(updatedData);
  }, [progressData, saveProgressToStorage]);

  // Get overall progress statistics - memoized
  const getOverallProgress = useMemo(() => {
    const totalCategories = Object.keys(allProgressData).length;
    const totalModules = Object.values(allProgressData).reduce((acc, category) => {
      return acc + Object.values(category).reduce((methodAcc, method) => {
        return methodAcc + Object.keys(method).length;
      }, 0);
    }, 0);

    return {
      totalCategories,
      totalModules,
      hasProgress: totalModules > 0
    };
  }, [allProgressData]);

  const clearAllProgress = useCallback(async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', user.id);
        
        if (error) throw error;
        logger.info('Cleared all progress from database');
      } catch (error) {
        logger.error('Error clearing progress:', error);
      }
    }
    
    setProgressData({});
    setAllProgressData({});
    document.cookie = `${PROGRESS_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }, [user]);

  return {
    progressData: getModuleProgress(),
    allProgressData,
    loaded,
    syncing,
    saveFlashcardProgress,
    saveQuizProgress,
    saveMatchingProgress,
    saveCodeProgress,
    saveDragDropProgress,
    saveMemoryProgress,
    saveTimelineProgress,
    saveScenarioProgress,
    overallProgress: getOverallProgress,
    clearAllProgress
  };
};