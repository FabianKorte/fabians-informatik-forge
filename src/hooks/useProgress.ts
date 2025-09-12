import { useState, useEffect } from "react";

interface ProgressData {
  [categoryId: string]: {
    [methodType: string]: {
      [moduleIndex: string]: {
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
      };
    };
  };
}

const PROGRESS_COOKIE_NAME = "ihk_learn_progress";
const COOKIE_EXPIRES_DAYS = 90;

// Cookie utilities
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const useProgress = (categoryId: string, methodType: string, moduleIndex: number) => {
  const [progressData, setProgressData] = useState<ProgressData>({});
  const moduleKey = moduleIndex.toString();

  // Load progress from cookie on mount
  useEffect(() => {
    const savedProgress = getCookie(PROGRESS_COOKIE_NAME);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(decodeURIComponent(savedProgress));
        setProgressData(parsed);
      } catch (error) {
        console.warn("Failed to parse progress cookie:", error);
        setProgressData({});
      }
    }
  }, []);

  // Save progress to cookie whenever data changes
  useEffect(() => {
    if (Object.keys(progressData).length > 0) {
      const encoded = encodeURIComponent(JSON.stringify(progressData));
      setCookie(PROGRESS_COOKIE_NAME, encoded, COOKIE_EXPIRES_DAYS);
    }
  }, [progressData]);

  const getModuleProgress = () => {
    return progressData[categoryId]?.[methodType]?.[moduleKey] || {};
  };

  const updateProgress = (methodData: any) => {
    setProgressData(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [methodType]: {
          ...prev[categoryId]?.[methodType],
          [moduleKey]: {
            ...prev[categoryId]?.[methodType]?.[moduleKey],
            [methodType]: methodData
          }
        }
      }
    }));
  };

  // Specific method helpers
  const saveFlashcardProgress = (knownCards: Set<number>, unknownCards: Set<number>, lastIndex: number) => {
    updateProgress({
      knownCards: Array.from(knownCards),
      unknownCards: Array.from(unknownCards),
      lastIndex
    });
  };

  const saveQuizProgress = (completedQuestions: number[], newScore: number) => {
    const current = getModuleProgress();
    const quizData = current.quiz || { completedQuestions: [], scores: [], bestScore: 0 };
    
    updateProgress({
      completedQuestions: [...new Set([...quizData.completedQuestions, ...completedQuestions])],
      scores: [...quizData.scores, newScore],
      bestScore: Math.max(quizData.bestScore, newScore)
    });
  };

  const saveMatchingProgress = (score: number) => {
    const current = getModuleProgress();
    const matchingData = current.matching || { completions: 0, bestScore: 0 };
    
    updateProgress({
      completions: matchingData.completions + 1,
      bestScore: Math.max(matchingData.bestScore, score)
    });
  };

  const saveCodeProgress = (challengeIndex: number) => {
    const current = getModuleProgress();
    const codeData = current.code || { completedChallenges: [] };
    
    updateProgress({
      completedChallenges: [...new Set([...codeData.completedChallenges, challengeIndex])]
    });
  };

  const saveDragDropProgress = (gameIndex: number) => {
    const current = getModuleProgress();
    const dragDropData = current.dragdrop || { completedGames: [] };
    
    updateProgress({
      completedGames: [...new Set([...dragDropData.completedGames, gameIndex])]
    });
  };

  const saveMemoryProgress = (gameIndex: number, moves: number) => {
    const current = getModuleProgress();
    const memoryData = current.memory || { completedGames: [], bestMoves: {} };
    
    updateProgress({
      completedGames: [...new Set([...memoryData.completedGames, gameIndex])],
      bestMoves: {
        ...memoryData.bestMoves,
        [gameIndex]: Math.min(memoryData.bestMoves[gameIndex] || Infinity, moves)
      }
    });
  };

  const saveTimelineProgress = (timelineIndex: number) => {
    const current = getModuleProgress();
    const timelineData = current.timeline || { viewedTimelines: [] };
    
    updateProgress({
      viewedTimelines: [...new Set([...timelineData.viewedTimelines, timelineIndex])]
    });
  };

  const saveScenarioProgress = (scenarioIndex: number, wasCorrect: boolean) => {
    const current = getModuleProgress();
    const scenarioData = current.scenario || { completedScenarios: [], correctChoices: 0 };
    
    updateProgress({
      completedScenarios: [...new Set([...scenarioData.completedScenarios, scenarioIndex])],
      correctChoices: scenarioData.correctChoices + (wasCorrect ? 1 : 0)
    });
  };

  // Get overall progress statistics
  const getOverallProgress = () => {
    const totalCategories = Object.keys(progressData).length;
    const totalModules = Object.values(progressData).reduce((acc, category) => {
      return acc + Object.values(category).reduce((methodAcc, method) => {
        return methodAcc + Object.keys(method).length;
      }, 0);
    }, 0);

    return {
      totalCategories,
      totalModules,
      hasProgress: totalModules > 0
    };
  };

  const clearAllProgress = () => {
    setProgressData({});
    document.cookie = `${PROGRESS_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  };

  return {
    progressData: getModuleProgress(),
    saveFlashcardProgress,
    saveQuizProgress,
    saveMatchingProgress,
    saveCodeProgress,
    saveDragDropProgress,
    saveMemoryProgress,
    saveTimelineProgress,
    saveScenarioProgress,
    getOverallProgress,
    clearAllProgress
  };
};