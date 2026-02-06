import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  SubnettingState, 
  ChallengeSet, 
  SubnettingChallenge,
  ChallengeSession,
  UserAnswer 
} from '@/types/subnetting';
import { challengeSets, subnetUtils } from '@/data/subnettingChallenges';
import { useGamification } from './useGamification';
import { useToast } from './use-toast';

const STORAGE_KEY = 'subnetting-progress';

interface StoredProgress {
  completedSetIds: string[];
  bestTimes: Record<string, number>;
  totalXpEarned: number;
}

export function useSubnetting() {
  const { addXP } = useGamification();
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const challengeStartTimeRef = useRef<number>(0);

  const [state, setState] = useState<SubnettingState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const progress: StoredProgress = stored 
      ? JSON.parse(stored) 
      : { completedSetIds: [], bestTimes: {}, totalXpEarned: 0 };
    
    return {
      availableSets: challengeSets,
      currentSession: null,
      currentChallenge: null,
      userInputs: {},
      showHint: false,
      hintIndex: 0,
      timeRemaining: 0,
      completedSetIds: progress.completedSetIds,
      totalXpEarned: progress.totalXpEarned,
      bestTimes: progress.bestTimes
    };
  });

  // Persist progress
  useEffect(() => {
    const progress: StoredProgress = {
      completedSetIds: state.completedSetIds,
      bestTimes: state.bestTimes,
      totalXpEarned: state.totalXpEarned
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [state.completedSetIds, state.bestTimes, state.totalXpEarned]);

  // Timer effect
  useEffect(() => {
    if (state.currentSession && !state.currentSession.isCompleted && state.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timeRemaining <= 1) {
            // Time's up - end session
            return handleTimeUp(prev);
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.currentSession?.setId, state.currentSession?.isCompleted]);

  const handleTimeUp = (prev: SubnettingState): SubnettingState => {
    if (!prev.currentSession) return prev;
    
    const session = prev.currentSession;
    const totalPossible = prev.availableSets
      .find(s => s.id === session.setId)?.totalPoints || 0;
    const percentage = (session.totalScore / totalPossible) * 100;
    const set = prev.availableSets.find(s => s.id === session.setId);
    const isPassed = percentage >= (set?.passingScore || 60);

    return {
      ...prev,
      currentSession: {
        ...session,
        isCompleted: true,
        isPassed
      },
      timeRemaining: 0
    };
  };

  const startChallenge = useCallback((setId: string) => {
    const set = challengeSets.find(s => s.id === setId);
    if (!set) return;

    const session: ChallengeSession = {
      setId,
      startTime: Date.now(),
      currentChallengeIndex: 0,
      answers: [],
      totalScore: 0,
      isCompleted: false,
      isPassed: false
    };

    challengeStartTimeRef.current = Date.now();

    setState(prev => ({
      ...prev,
      currentSession: session,
      currentChallenge: set.challenges[0],
      userInputs: {},
      showHint: false,
      hintIndex: 0,
      timeRemaining: set.timeLimit
    }));
  }, []);

  const submitAnswer = useCallback(() => {
    setState(prev => {
      if (!prev.currentSession || !prev.currentChallenge) return prev;

      const challenge = prev.currentChallenge;
      const set = prev.availableSets.find(s => s.id === prev.currentSession!.setId);
      if (!set) return prev;

      // Check answers
      const isCorrect = validateAnswers(challenge, prev.userInputs);
      const timeTaken = (Date.now() - challengeStartTimeRef.current) / 1000;
      const pointsEarned = isCorrect ? challenge.points : 0;

      const answer: UserAnswer = {
        challengeId: challenge.id,
        answers: prev.userInputs,
        isCorrect,
        timeTaken,
        pointsEarned
      };

      const newAnswers = [...prev.currentSession.answers, answer];
      const newScore = prev.currentSession.totalScore + pointsEarned;
      const nextIndex = prev.currentSession.currentChallengeIndex + 1;
      const isLastChallenge = nextIndex >= set.challenges.length;

      // Show feedback
      if (isCorrect) {
        toast({
          title: "Richtig! 🎉",
          description: `+${pointsEarned} Punkte`,
        });
      } else {
        toast({
          title: "Leider falsch",
          description: challenge.explanation,
          variant: "destructive"
        });
      }

      if (isLastChallenge) {
        const percentage = (newScore / set.totalPoints) * 100;
        const isPassed = percentage >= set.passingScore;
        const totalTime = set.timeLimit - prev.timeRemaining;
        
        // Award XP only for first completion
        if (!prev.completedSetIds.includes(set.id) && isPassed) {
          const xpReward = Math.floor(set.totalPoints / 2);
          addXP({ xp: xpReward, reason: `Subnetting-Challenge: ${set.title}` });
        }

        // Update best time
        const newBestTimes = { ...prev.bestTimes };
        if (isPassed && (!newBestTimes[set.id] || totalTime < newBestTimes[set.id])) {
          newBestTimes[set.id] = totalTime;
        }

        return {
          ...prev,
          currentSession: {
            ...prev.currentSession,
            answers: newAnswers,
            totalScore: newScore,
            currentChallengeIndex: nextIndex,
            isCompleted: true,
            isPassed
          },
          currentChallenge: null,
          completedSetIds: isPassed && !prev.completedSetIds.includes(set.id)
            ? [...prev.completedSetIds, set.id]
            : prev.completedSetIds,
          bestTimes: newBestTimes,
          totalXpEarned: prev.totalXpEarned + (isPassed && !prev.completedSetIds.includes(set.id) 
            ? Math.floor(set.totalPoints / 2) 
            : 0)
        };
      }

      // Next challenge
      challengeStartTimeRef.current = Date.now();
      
      return {
        ...prev,
        currentSession: {
          ...prev.currentSession,
          answers: newAnswers,
          totalScore: newScore,
          currentChallengeIndex: nextIndex
        },
        currentChallenge: set.challenges[nextIndex],
        userInputs: {},
        showHint: false,
        hintIndex: 0
      };
    });
  }, [addXP, toast]);

  const validateAnswers = (challenge: SubnettingChallenge, inputs: Record<string, string>): boolean => {
    const expected = challenge.expectedAnswers;
    
    for (const [key, value] of Object.entries(expected)) {
      const userValue = inputs[key]?.trim();
      if (!userValue) return false;
      
      if (typeof value === 'number') {
        const parsed = Number(userValue);
        if (isNaN(parsed) || parsed !== value) return false;
      } else {
        if (userValue.toLowerCase() !== String(value).toLowerCase()) return false;
      }
    }
    return true;
  };

  const setInput = useCallback((key: string, value: string) => {
    setState(prev => ({
      ...prev,
      userInputs: { ...prev.userInputs, [key]: value }
    }));
  }, []);

  const showNextHint = useCallback(() => {
    setState(prev => {
      if (!prev.currentChallenge) return prev;
      const maxHints = prev.currentChallenge.hints.length;
      
      return {
        ...prev,
        showHint: true,
        hintIndex: Math.min(prev.hintIndex + 1, maxHints - 1)
      };
    });
  }, []);

  const exitSession = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setState(prev => ({
      ...prev,
      currentSession: null,
      currentChallenge: null,
      userInputs: {},
      showHint: false,
      hintIndex: 0,
      timeRemaining: 0
    }));
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(prev => ({
      ...prev,
      completedSetIds: [],
      bestTimes: {},
      totalXpEarned: 0
    }));
    toast({
      title: "Fortschritt zurückgesetzt",
      description: "Alle Subnetting-Challenges wurden zurückgesetzt."
    });
  }, [toast]);

  return {
    // State
    availableSets: state.availableSets,
    currentSession: state.currentSession,
    currentChallenge: state.currentChallenge,
    userInputs: state.userInputs,
    showHint: state.showHint,
    hintIndex: state.hintIndex,
    timeRemaining: state.timeRemaining,
    completedSetIds: state.completedSetIds,
    bestTimes: state.bestTimes,
    
    // Computed
    currentHints: state.currentChallenge?.hints.slice(0, state.hintIndex + 1) || [],
    progressPercentage: state.currentSession 
      ? ((state.currentSession.currentChallengeIndex) / 
         (state.availableSets.find(s => s.id === state.currentSession?.setId)?.challenges.length || 1)) * 100
      : 0,
    
    // Actions
    startChallenge,
    submitAnswer,
    setInput,
    showNextHint,
    exitSession,
    resetProgress,
    
    // Utilities
    subnetUtils
  };
}
