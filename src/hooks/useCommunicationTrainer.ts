import { useState, useCallback, useEffect } from 'react';
import { 
  CommunicationState, 
  CommunicationScenario,
  CommunicationExercise,
  EarType
} from '@/types/communication';
import { communicationScenarios, getExercisesForScenario } from '@/data/communicationScenarios';
import { useGamification } from '@/hooks/useGamification';

const STORAGE_KEY = 'communication-trainer-progress';

const initialState: CommunicationState = {
  activeTab: 'theory',
  currentScenario: null,
  currentMessageIndex: 0,
  currentExercise: null,
  userAnswers: {},
  completedScenarios: [],
  completedExercises: [],
  earnedPoints: 0,
  showExplanation: false,
};

export function useCommunicationTrainer() {
  const [state, setState] = useState<CommunicationState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialState,
          completedScenarios: parsed.completedScenarios || [],
          completedExercises: parsed.completedExercises || [],
          earnedPoints: parsed.earnedPoints || 0,
        };
      }
    } catch {
      // Ignore
    }
    return initialState;
  });

  const { addXP } = useGamification();

  // Persist progress
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedScenarios: state.completedScenarios,
      completedExercises: state.completedExercises,
      earnedPoints: state.earnedPoints,
    }));
  }, [state.completedScenarios, state.completedExercises, state.earnedPoints]);

  const setActiveTab = useCallback((tab: CommunicationState['activeTab']) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  const startScenario = useCallback((scenario: CommunicationScenario) => {
    const exercises = getExercisesForScenario(scenario.id);
    setState(prev => ({
      ...prev,
      activeTab: 'practice',
      currentScenario: scenario,
      currentMessageIndex: 0,
      currentExercise: exercises.length > 0 ? exercises[0] : null,
      showExplanation: false,
    }));
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    setState(prev => {
      if (!prev.currentExercise) return prev;
      
      const exerciseId = prev.currentExercise.id;
      const isCorrect = answerIndex === prev.currentExercise.correctAnswer;
      const alreadyCompleted = prev.completedExercises.includes(exerciseId);
      
      let newPoints = prev.earnedPoints;
      let newCompletedExercises = [...prev.completedExercises];
      
      if (isCorrect && !alreadyCompleted) {
        const pointsForExercise = Math.floor((prev.currentScenario?.points || 15) / 3);
        newPoints += pointsForExercise;
        newCompletedExercises.push(exerciseId);
        addXP({ 
          xp: pointsForExercise, 
          reason: `4-Ohren-Modell: ${prev.currentScenario?.title}` 
        });
      }
      
      return {
        ...prev,
        userAnswers: { ...prev.userAnswers, [exerciseId]: answerIndex },
        completedExercises: newCompletedExercises,
        earnedPoints: newPoints,
        showExplanation: true,
      };
    });
  }, [addXP]);

  const nextExercise = useCallback(() => {
    setState(prev => {
      if (!prev.currentScenario) return prev;
      
      const exercises = getExercisesForScenario(prev.currentScenario.id);
      const currentIndex = exercises.findIndex(e => e.id === prev.currentExercise?.id);
      
      if (currentIndex < exercises.length - 1) {
        return {
          ...prev,
          currentExercise: exercises[currentIndex + 1],
          showExplanation: false,
        };
      }
      
      // All exercises completed for this scenario
      const newCompletedScenarios = prev.completedScenarios.includes(prev.currentScenario.id)
        ? prev.completedScenarios
        : [...prev.completedScenarios, prev.currentScenario.id];
      
      return {
        ...prev,
        completedScenarios: newCompletedScenarios,
        currentExercise: null,
        showExplanation: false,
      };
    });
  }, []);

  const closeScenario = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScenario: null,
      currentExercise: null,
      currentMessageIndex: 0,
      showExplanation: false,
      activeTab: 'scenarios',
    }));
  }, []);

  const isAnswerCorrect = useCallback((exerciseId: string) => {
    const exercise = getExercisesForScenario(state.currentScenario?.id || '').find(e => e.id === exerciseId);
    if (!exercise) return false;
    return state.userAnswers[exerciseId] === exercise.correctAnswer;
  }, [state.currentScenario, state.userAnswers]);

  const getProgress = useCallback(() => {
    const total = communicationScenarios.length;
    const completed = state.completedScenarios.length;
    return {
      total,
      completed,
      percentage: Math.round((completed / total) * 100),
    };
  }, [state.completedScenarios]);

  return {
    state,
    setActiveTab,
    startScenario,
    selectAnswer,
    nextExercise,
    closeScenario,
    isAnswerCorrect,
    getProgress,
    scenarios: communicationScenarios,
  };
}
