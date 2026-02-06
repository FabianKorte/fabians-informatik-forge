import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  CPMScenario, 
  CPMState, 
  CPMActivity,
  calculateForwardPass,
  calculateBackwardPass,
  getProjectDuration,
  verifyCriticalPath 
} from '@/types/cpmTool';
import { cpmScenarios } from '@/data/cpmScenarios';
import { useGamification } from './useGamification';
import { useToast } from './use-toast';

export function useCPMTool() {
  const { toast } = useToast();
  const { addXP } = useGamification();
  const [state, setState] = useState<CPMState>({
    currentScenario: null,
    userInputs: {},
    markedCritical: [],
    completedObjectives: [],
    earnedPoints: 0,
    showSolution: false
  });
  
  const awardedScenariosRef = useRef<Set<string>>(new Set());
  const checkObjectivesRef = useRef<() => void>(() => {});

  // Berechne die korrekten Werte für das aktuelle Szenario
  const getCalculatedActivities = useCallback((): CPMActivity[] => {
    if (!state.currentScenario) return [];
    
    const activities = state.currentScenario.project.activities;
    const withForward = calculateForwardPass(activities);
    const projectDuration = getProjectDuration(withForward);
    return calculateBackwardPass(withForward, projectDuration);
  }, [state.currentScenario]);

  // Prüfe Objectives
  const checkObjectives = useCallback(() => {
    if (!state.currentScenario) return;
    
    const calculatedActivities = getCalculatedActivities();
    const projectDuration = getProjectDuration(calculatedActivities);
    const completedIds: string[] = [];
    
    for (const objective of state.currentScenario.objectives) {
      let isComplete = false;
      
      switch (objective.type) {
        case 'calculate-faz-fez': {
          // Prüfe ob alle FAZ/FEZ korrekt eingegeben wurden
          isComplete = calculatedActivities.every(activity => {
            const userInput = state.userInputs[activity.id];
            if (!userInput) return false;
            return userInput.faz === activity.faz && userInput.fez === activity.fez;
          });
          break;
        }
        case 'calculate-saz-sez': {
          // Prüfe ob alle SAZ/SEZ korrekt eingegeben wurden
          isComplete = calculatedActivities.every(activity => {
            const userInput = state.userInputs[activity.id];
            if (!userInput) return false;
            return userInput.saz === activity.saz && userInput.sez === activity.sez;
          });
          break;
        }
        case 'mark-critical-path': {
          isComplete = verifyCriticalPath(calculatedActivities, state.markedCritical);
          break;
        }
        case 'identify-duration': {
          if (objective.target?.requiredValue !== undefined) {
            const userDuration = Number(state.userInputs['projectDuration']);
            isComplete = !isNaN(userDuration) && userDuration === objective.target.requiredValue;
          }
          break;
        }
      }
      
      if (isComplete) {
        completedIds.push(objective.id);
      }
    }
    
    setState(prev => {
      const newCompleted = completedIds.filter(id => !prev.completedObjectives.includes(id));
      
      if (newCompleted.length > 0) {
        toast({
          title: "Aufgabe gelöst!",
          description: `${newCompleted.length} Ziel(e) erreicht!`,
        });
      }
      
      return {
        ...prev,
        completedObjectives: [...new Set([...prev.completedObjectives, ...completedIds])]
      };
    });
  }, [state.currentScenario, state.userInputs, state.markedCritical, getCalculatedActivities, toast]);
  
  checkObjectivesRef.current = checkObjectives;

  // Aktualisiere User-Input
  const updateUserInput = useCallback((activityId: string, field: keyof CPMActivity, value: number | null) => {
    setState(prev => ({
      ...prev,
      userInputs: {
        ...prev.userInputs,
        [activityId]: {
          ...prev.userInputs[activityId],
          [field]: value
        }
      }
    }));
    
    // Verzögerte Prüfung nach State-Update
    setTimeout(() => checkObjectivesRef.current(), 100);
  }, []);

  // Projektdauer eingeben
  const setProjectDuration = useCallback((duration: number) => {
    setState(prev => ({
      ...prev,
      userInputs: {
        ...prev.userInputs,
        projectDuration: duration as any
      }
    }));
    
    setTimeout(() => checkObjectivesRef.current(), 100);
  }, []);

  // Kritischen Vorgang markieren/entmarkieren
  const toggleCriticalMark = useCallback((activityId: string) => {
    setState(prev => {
      const isMarked = prev.markedCritical.includes(activityId);
      const newMarked = isMarked
        ? prev.markedCritical.filter(id => id !== activityId)
        : [...prev.markedCritical, activityId];
      
      return {
        ...prev,
        markedCritical: newMarked
      };
    });
    
    setTimeout(() => checkObjectivesRef.current(), 100);
  }, []);

  // Szenario laden
  const loadScenario = useCallback((scenarioId: string) => {
    const scenario = cpmScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    setState({
      currentScenario: { ...scenario },
      userInputs: {},
      markedCritical: [],
      completedObjectives: [],
      earnedPoints: 0,
      showSolution: false
    });
  }, []);

  // Lösung anzeigen
  const showSolution = useCallback(() => {
    setState(prev => ({ ...prev, showSolution: true }));
  }, []);

  // Lösung verstecken
  const hideSolution = useCallback(() => {
    setState(prev => ({ ...prev, showSolution: false }));
  }, []);

  // Szenario abschließen
  const completeScenario = useCallback(() => {
    if (!state.currentScenario) return;
    
    const allCompleted = state.currentScenario.objectives.every(
      obj => state.completedObjectives.includes(obj.id)
    );
    
    if (!allCompleted) {
      toast({
        title: "Noch nicht fertig",
        description: "Bitte löse zuerst alle Aufgaben.",
        variant: "destructive"
      });
      return;
    }
    
    // Prüfe ob bereits Punkte vergeben wurden
    const scenarioKey = state.currentScenario.id;
    if (awardedScenariosRef.current.has(scenarioKey)) {
      toast({
        title: "Bereits abgeschlossen",
        description: "Du hast für diese Lektion bereits Punkte erhalten.",
      });
      return;
    }
    
    // Punkte vergeben
    const points = state.currentScenario.points;
    awardedScenariosRef.current.add(scenarioKey);
    
    addXP({ xp: points, reason: `Netzplan-Lektion: ${state.currentScenario.title}` });
    
    setState(prev => ({
      ...prev,
      earnedPoints: prev.earnedPoints + points
    }));
    
    toast({
      title: "Lektion abgeschlossen!",
      description: `Du hast ${points} XP verdient!`,
    });
  }, [state.currentScenario, state.completedObjectives, addXP, toast]);

  // Reset
  const resetScenario = useCallback(() => {
    if (!state.currentScenario) return;
    
    setState(prev => ({
      ...prev,
      userInputs: {},
      markedCritical: [],
      completedObjectives: [],
      showSolution: false
    }));
  }, [state.currentScenario]);

  return {
    state,
    scenarios: cpmScenarios,
    getCalculatedActivities,
    loadScenario,
    updateUserInput,
    setProjectDuration,
    toggleCriticalMark,
    showSolution,
    hideSolution,
    completeScenario,
    resetScenario
  };
}
