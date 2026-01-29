// CPM (Critical Path Method) Tool Types

export interface CPMActivity {
  id: string;
  name: string;
  duration: number;
  predecessors: string[]; // IDs der Vorgänger
  // Vorwärtsrechnung
  faz: number | null; // Frühester Anfangszeitpunkt
  fez: number | null; // Frühester Endzeitpunkt
  // Rückwärtsrechnung
  saz: number | null; // Spätester Anfangszeitpunkt
  sez: number | null; // Spätester Endzeitpunkt
  // Puffer
  gp: number | null;  // Gesamtpuffer
  fp: number | null;  // Freier Puffer
  // Status
  isCritical: boolean;
  userFaz?: number | null;
  userFez?: number | null;
  userSaz?: number | null;
  userSez?: number | null;
}

export interface CPMProject {
  id: string;
  name: string;
  activities: CPMActivity[];
  projectDuration: number | null;
}

export interface CPMScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'leicht' | 'mittel' | 'schwer';
  points: number;
  theory?: {
    title: string;
    content: string;
    keywords: string[];
  };
  project: CPMProject;
  objectives: CPMObjective[];
  hints: string[];
}

export interface CPMObjective {
  id: string;
  description: string;
  type: 'calculate-faz-fez' | 'calculate-saz-sez' | 'mark-critical-path' | 'identify-duration';
  target?: {
    activityId?: string;
    requiredValue?: number;
  };
  completed: boolean;
}

export interface CPMState {
  currentScenario: CPMScenario | null;
  userInputs: Record<string, Partial<CPMActivity>>;
  markedCritical: string[]; // IDs der vom Nutzer markierten kritischen Vorgänge
  completedObjectives: string[];
  earnedPoints: number;
  showSolution: boolean;
}

// Hilfsfunktionen
export function calculateForwardPass(activities: CPMActivity[]): CPMActivity[] {
  const result = activities.map(a => ({ ...a }));
  const activityMap = new Map(result.map(a => [a.id, a]));
  
  // Sortiere nach Abhängigkeiten (topologische Sortierung)
  const sorted = topologicalSort(result);
  
  for (const activity of sorted) {
    if (activity.predecessors.length === 0) {
      activity.faz = 0;
      activity.fez = activity.duration;
    } else {
      // FAZ = Maximum aller FEZ der Vorgänger
      const maxFez = Math.max(
        ...activity.predecessors.map(predId => {
          const pred = activityMap.get(predId);
          return pred?.fez ?? 0;
        })
      );
      activity.faz = maxFez;
      activity.fez = maxFez + activity.duration;
    }
  }
  
  return result;
}

export function calculateBackwardPass(activities: CPMActivity[], projectDuration: number): CPMActivity[] {
  const result = activities.map(a => ({ ...a }));
  const activityMap = new Map(result.map(a => [a.id, a]));
  
  // Finde Nachfolger für jeden Vorgang
  const successors = new Map<string, string[]>();
  for (const activity of result) {
    successors.set(activity.id, []);
  }
  for (const activity of result) {
    for (const predId of activity.predecessors) {
      successors.get(predId)?.push(activity.id);
    }
  }
  
  // Rückwärts sortieren
  const sorted = topologicalSort(result).reverse();
  
  for (const activity of sorted) {
    const succs = successors.get(activity.id) || [];
    if (succs.length === 0) {
      // Endvorgang
      activity.sez = projectDuration;
      activity.saz = projectDuration - activity.duration;
    } else {
      // SEZ = Minimum aller SAZ der Nachfolger
      const minSaz = Math.min(
        ...succs.map(succId => {
          const succ = activityMap.get(succId);
          return succ?.saz ?? projectDuration;
        })
      );
      activity.sez = minSaz;
      activity.saz = minSaz - activity.duration;
    }
    
    // Puffer berechnen
    activity.gp = (activity.saz ?? 0) - (activity.faz ?? 0);
    activity.fp = Math.min(
      ...succs.map(succId => {
        const succ = activityMap.get(succId);
        return (succ?.faz ?? projectDuration) - (activity.fez ?? 0);
      }),
      succs.length === 0 ? projectDuration - (activity.fez ?? 0) : Infinity
    );
    
    // Kritischer Pfad: GP = 0
    activity.isCritical = activity.gp === 0;
  }
  
  return result;
}

export function topologicalSort(activities: CPMActivity[]): CPMActivity[] {
  const result: CPMActivity[] = [];
  const visited = new Set<string>();
  const activityMap = new Map(activities.map(a => [a.id, a]));
  
  function visit(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    
    const activity = activityMap.get(id);
    if (!activity) return;
    
    for (const predId of activity.predecessors) {
      visit(predId);
    }
    
    result.push(activity);
  }
  
  for (const activity of activities) {
    visit(activity.id);
  }
  
  return result;
}

export function getProjectDuration(activities: CPMActivity[]): number {
  return Math.max(...activities.map(a => a.fez ?? 0), 0);
}

export function verifyCriticalPath(activities: CPMActivity[], markedIds: string[]): boolean {
  const criticalIds = activities.filter(a => a.isCritical).map(a => a.id);
  if (criticalIds.length !== markedIds.length) return false;
  return criticalIds.every(id => markedIds.includes(id));
}
