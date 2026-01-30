import { useState, useCallback, useEffect } from "react";
import type { DraggableItem, OSILessonState, OSIExercise, DiagnosticScenario, OSIQuizQuestion } from "@/types/osiModel";
import { validatePlacement } from "@/types/osiModel";
import { osiLessons } from "@/data/osiExercises";
import { useGamification } from "@/hooks/useGamification";

const STORAGE_KEY = "osi-model-completed-lessons";

export function useOSIModel() {
  const { addXP } = useGamification();
  
  // Track completed lessons
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Current lesson state
  const [state, setState] = useState<OSILessonState>({
    currentLessonIndex: 0,
    placements: {},
    diagnosticAnswers: {},
    quizAnswers: {},
    score: 0,
    isCompleted: false,
    showResults: false,
    feedback: {}
  });

  // Persist completed lessons
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedLessonIds]));
  }, [completedLessonIds]);

  const currentLesson = osiLessons[state.currentLessonIndex];
  const totalLessons = osiLessons.length;

  // Handle drag & drop placement
  const placeItem = useCallback((itemId: string, targetLayer: number | null) => {
    setState(prev => ({
      ...prev,
      placements: {
        ...prev.placements,
        [itemId]: targetLayer
      }
    }));
  }, []);

  // Handle diagnostic answer
  const answerDiagnostic = useCallback((scenarioId: string, answer: string) => {
    setState(prev => ({
      ...prev,
      diagnosticAnswers: {
        ...prev.diagnosticAnswers,
        [scenarioId]: answer
      }
    }));
  }, []);

  // Handle quiz answer
  const answerQuiz = useCallback((questionId: string, answerIndex: number) => {
    setState(prev => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: answerIndex
      }
    }));
  }, []);

  // Check drag & drop exercise
  const checkDragDropExercise = useCallback((exercise: OSIExercise) => {
    let correct = 0;
    const feedback: Record<string, boolean> = {};

    exercise.items.forEach(item => {
      const placement = state.placements[item.id];
      const isCorrect = placement !== null && validatePlacement(item, placement);
      feedback[item.id] = isCorrect;
      if (isCorrect) correct++;
    });

    const scorePercent = (correct / exercise.items.length) * 100;
    const earnedPoints = Math.round((correct / exercise.items.length) * exercise.points);

    return { correct, total: exercise.items.length, scorePercent, earnedPoints, feedback };
  }, [state.placements]);

  // Check diagnostic scenarios
  const checkDiagnosticScenarios = useCallback((scenarios: DiagnosticScenario[]) => {
    let correct = 0;
    let totalPoints = 0;
    const feedback: Record<string, boolean> = {};

    scenarios.forEach(scenario => {
      const answer = state.diagnosticAnswers[scenario.id];
      const isCorrect = answer === scenario.correctDiagnosis;
      feedback[scenario.id] = isCorrect;
      if (isCorrect) {
        correct++;
        totalPoints += scenario.points;
      }
    });

    return { correct, total: scenarios.length, earnedPoints: totalPoints, feedback };
  }, [state.diagnosticAnswers]);

  // Check quiz questions
  const checkQuizQuestions = useCallback((questions: OSIQuizQuestion[]) => {
    let correct = 0;
    const feedback: Record<string, boolean> = {};

    questions.forEach(question => {
      const answer = state.quizAnswers[question.id];
      const isCorrect = answer === question.correctIndex;
      feedback[question.id] = isCorrect;
      if (isCorrect) correct++;
    });

    const earnedPoints = correct * 20; // 20 points per correct answer

    return { correct, total: questions.length, earnedPoints, feedback };
  }, [state.quizAnswers]);

  // Submit current lesson
  const submitLesson = useCallback(() => {
    if (!currentLesson) return;

    let result: { earnedPoints: number; feedback: Record<string, boolean> };
    
    switch (currentLesson.type) {
      case "drag-drop":
        result = checkDragDropExercise(currentLesson.content as OSIExercise);
        break;
      case "diagnostic":
        result = checkDiagnosticScenarios(currentLesson.content as DiagnosticScenario[]);
        break;
      case "quiz":
        result = checkQuizQuestions(currentLesson.content as OSIQuizQuestion[]);
        break;
      case "theory":
        result = { earnedPoints: 25, feedback: {} };
        break;
      default:
        result = { earnedPoints: 0, feedback: {} };
    }

    setState(prev => ({
      ...prev,
      score: prev.score + result.earnedPoints,
      feedback: result.feedback,
      showResults: true
    }));

    // Award XP only once per lesson
    if (!completedLessonIds.has(currentLesson.id) && result.earnedPoints > 0) {
      addXP({
        xp: result.earnedPoints,
        reason: `OSI-Modell: ${currentLesson.title}`
      });
      setCompletedLessonIds(prev => new Set([...prev, currentLesson.id]));
    }
  }, [currentLesson, checkDragDropExercise, checkDiagnosticScenarios, checkQuizQuestions, completedLessonIds, addXP]);

  // Navigate to next lesson
  const nextLesson = useCallback(() => {
    if (state.currentLessonIndex < totalLessons - 1) {
      setState(prev => ({
        ...prev,
        currentLessonIndex: prev.currentLessonIndex + 1,
        placements: {},
        diagnosticAnswers: {},
        quizAnswers: {},
        showResults: false,
        feedback: {},
        isCompleted: false
      }));
    } else {
      setState(prev => ({
        ...prev,
        isCompleted: true
      }));
    }
  }, [state.currentLessonIndex, totalLessons]);

  // Navigate to previous lesson
  const previousLesson = useCallback(() => {
    if (state.currentLessonIndex > 0) {
      setState(prev => ({
        ...prev,
        currentLessonIndex: prev.currentLessonIndex - 1,
        placements: {},
        diagnosticAnswers: {},
        quizAnswers: {},
        showResults: false,
        feedback: {},
        isCompleted: false
      }));
    }
  }, [state.currentLessonIndex]);

  // Jump to specific lesson
  const goToLesson = useCallback((index: number) => {
    if (index >= 0 && index < totalLessons) {
      setState(prev => ({
        ...prev,
        currentLessonIndex: index,
        placements: {},
        diagnosticAnswers: {},
        quizAnswers: {},
        showResults: false,
        feedback: {},
        isCompleted: false
      }));
    }
  }, [totalLessons]);

  // Reset current lesson
  const resetLesson = useCallback(() => {
    setState(prev => ({
      ...prev,
      placements: {},
      diagnosticAnswers: {},
      quizAnswers: {},
      showResults: false,
      feedback: {}
    }));
  }, []);

  // Reset all progress
  const resetAllProgress = useCallback(() => {
    setCompletedLessonIds(new Set());
    setState({
      currentLessonIndex: 0,
      placements: {},
      diagnosticAnswers: {},
      quizAnswers: {},
      score: 0,
      isCompleted: false,
      showResults: false,
      feedback: {}
    });
  }, []);

  return {
    // State
    state,
    currentLesson,
    totalLessons,
    completedLessonIds,
    
    // Actions
    placeItem,
    answerDiagnostic,
    answerQuiz,
    submitLesson,
    nextLesson,
    previousLesson,
    goToLesson,
    resetLesson,
    resetAllProgress,
    
    // Utilities
    isLessonCompleted: (lessonId: string) => completedLessonIds.has(lessonId)
  };
}
