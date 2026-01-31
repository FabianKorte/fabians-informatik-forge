import { useState, useCallback, useEffect } from 'react';
import type { SQLScenario, SQLSandboxState, SQLQueryResult } from '@/types/sqlSandbox';
import { parseAndExecuteSQL } from '@/types/sqlSandbox';
import { sqlScenarios } from '@/data/sqlScenarios';
import { useGamification } from '@/hooks/useGamification';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'sql-sandbox-completed';

export function useSQLSandbox() {
  const { addXP } = useGamification();
  const { toast } = useToast();
  
  const [state, setState] = useState<SQLSandboxState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const completedExercises = saved ? JSON.parse(saved) : [];
    
    return {
      currentScenario: null,
      currentExerciseIndex: 0,
      userQuery: '',
      queryResult: null,
      completedExercises,
      showHint: false,
      showTheory: false,
    };
  });

  // Persist completed exercises
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.completedExercises));
  }, [state.completedExercises]);

  const selectScenario = useCallback((scenario: SQLScenario) => {
    setState(prev => ({
      ...prev,
      currentScenario: scenario,
      currentExerciseIndex: 0,
      userQuery: '',
      queryResult: null,
      showHint: false,
      showTheory: scenario.exercises[0]?.theory ? true : false,
    }));
  }, []);

  const setExerciseIndex = useCallback((index: number) => {
    setState(prev => {
      if (!prev.currentScenario || index < 0 || index >= prev.currentScenario.exercises.length) {
        return prev;
      }
      const exercise = prev.currentScenario.exercises[index];
      return {
        ...prev,
        currentExerciseIndex: index,
        userQuery: '',
        queryResult: null,
        showHint: false,
        showTheory: exercise.theory ? true : false,
      };
    });
  }, []);

  const setUserQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, userQuery: query }));
  }, []);

  const executeQuery = useCallback(() => {
    if (!state.currentScenario || !state.userQuery.trim()) {
      setState(prev => ({
        ...prev,
        queryResult: { success: false, error: 'Bitte gib eine SQL-Abfrage ein.' },
      }));
      return;
    }

    const result = parseAndExecuteSQL(
      state.userQuery,
      state.currentScenario.erModel.tables
    );

    setState(prev => ({ ...prev, queryResult: result }));
  }, [state.currentScenario, state.userQuery]);

  const checkSolution = useCallback(() => {
    if (!state.currentScenario || !state.queryResult?.success) {
      toast({
        title: 'Führe zuerst die Abfrage aus',
        description: 'Klicke auf "Ausführen" bevor du die Lösung prüfst.',
        variant: 'destructive',
      });
      return false;
    }

    const exercise = state.currentScenario.exercises[state.currentExerciseIndex];
    const isCorrect = exercise.expectedResultCheck(state.queryResult.data || []);

    if (isCorrect) {
      const alreadyCompleted = state.completedExercises.includes(exercise.id);
      
      if (!alreadyCompleted) {
        // Award XP only once
        addXP({ xp: exercise.xpReward, reason: `SQL-Übung: ${exercise.title}` });
        
        setState(prev => ({
          ...prev,
          completedExercises: [...prev.completedExercises, exercise.id],
        }));
      }

      toast({
        title: '✅ Richtig!',
        description: alreadyCompleted 
          ? 'Du hast diese Aufgabe bereits gelöst.' 
          : `+${exercise.xpReward} XP verdient!`,
      });

      return true;
    } else {
      toast({
        title: '❌ Nicht ganz richtig',
        description: 'Das Ergebnis stimmt nicht mit der erwarteten Lösung überein. Versuche es erneut!',
        variant: 'destructive',
      });
      return false;
    }
  }, [state, addXP, toast]);

  const toggleHint = useCallback(() => {
    setState(prev => ({ ...prev, showHint: !prev.showHint }));
  }, []);

  const toggleTheory = useCallback(() => {
    setState(prev => ({ ...prev, showTheory: !prev.showTheory }));
  }, []);

  const nextExercise = useCallback(() => {
    setState(prev => {
      if (!prev.currentScenario) return prev;
      const nextIndex = prev.currentExerciseIndex + 1;
      if (nextIndex >= prev.currentScenario.exercises.length) {
        toast({
          title: '🎉 Szenario abgeschlossen!',
          description: 'Du hast alle Übungen in diesem Szenario bearbeitet.',
        });
        return prev;
      }
      const exercise = prev.currentScenario.exercises[nextIndex];
      return {
        ...prev,
        currentExerciseIndex: nextIndex,
        userQuery: '',
        queryResult: null,
        showHint: false,
        showTheory: exercise.theory ? true : false,
      };
    });
  }, [toast]);

  const resetProgress = useCallback(() => {
    setState(prev => ({
      ...prev,
      completedExercises: [],
    }));
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: 'Fortschritt zurückgesetzt',
      description: 'Alle SQL-Übungen wurden als nicht abgeschlossen markiert.',
    });
  }, [toast]);

  const currentExercise = state.currentScenario?.exercises[state.currentExerciseIndex] || null;
  const isCurrentExerciseCompleted = currentExercise 
    ? state.completedExercises.includes(currentExercise.id) 
    : false;

  const scenarioProgress = state.currentScenario
    ? {
        total: state.currentScenario.exercises.length,
        completed: state.currentScenario.exercises.filter(e => 
          state.completedExercises.includes(e.id)
        ).length,
      }
    : { total: 0, completed: 0 };

  return {
    // State
    scenarios: sqlScenarios,
    currentScenario: state.currentScenario,
    currentExercise,
    currentExerciseIndex: state.currentExerciseIndex,
    userQuery: state.userQuery,
    queryResult: state.queryResult,
    completedExercises: state.completedExercises,
    showHint: state.showHint,
    showTheory: state.showTheory,
    isCurrentExerciseCompleted,
    scenarioProgress,
    
    // Actions
    selectScenario,
    setExerciseIndex,
    setUserQuery,
    executeQuery,
    checkSolution,
    toggleHint,
    toggleTheory,
    nextExercise,
    resetProgress,
  };
}
