import { useState, useCallback } from 'react';
import type { 
  HardwarePuzzleState, 
  HardwareComponent,
  ComponentCategory,
  BuildState,
  CompatibilityError,
  CPU,
  Motherboard,
  RAM,
  GPU,
  PSU,
  Case,
  Cooler
} from '@/types/hardwarePuzzle';
import { checkCompatibility } from '@/types/hardwarePuzzle';
import { puzzleScenarios } from '@/data/hardwareComponents';
import { useGamification } from '@/hooks/useGamification';

const STORAGE_KEY = 'hardware-puzzle-progress';

const createEmptyBuild = (): BuildState => ({
  slots: {
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    psu: null,
    storage: null,
    case: null,
    cooler: null
  },
  errors: [],
  totalPower: 0,
  isComplete: false,
  isCompatible: true
});

const loadProgress = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load hardware puzzle progress:', e);
  }
  return [];
};

const saveProgress = (completedScenarios: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedScenarios));
  } catch (e) {
    console.error('Failed to save hardware puzzle progress:', e);
  }
};

export const useHardwarePuzzle = () => {
  const { addXP } = useGamification();
  
  const [state, setState] = useState<HardwarePuzzleState>({
    currentScenario: null,
    build: createEmptyBuild(),
    completedScenarios: loadProgress(),
    showHints: false,
    selectedComponent: null
  });

  const validateBuild = useCallback((build: BuildState): CompatibilityError[] => {
    const errors: CompatibilityError[] = [];
    const { slots } = build;

    // CPU + Motherboard compatibility
    if (slots.cpu && slots.motherboard) {
      const cpuMbError = checkCompatibility.cpuMotherboard(
        slots.cpu as CPU, 
        slots.motherboard as Motherboard
      );
      if (cpuMbError) errors.push(cpuMbError);
    }

    // RAM + Motherboard compatibility
    if (slots.ram && slots.motherboard) {
      const ramMbError = checkCompatibility.ramMotherboard(
        slots.ram as RAM, 
        slots.motherboard as Motherboard
      );
      if (ramMbError) errors.push(ramMbError);
    }

    // CPU + RAM compatibility
    if (slots.cpu && slots.ram) {
      const cpuRamError = checkCompatibility.cpuRam(
        slots.cpu as CPU, 
        slots.ram as RAM
      );
      if (cpuRamError) errors.push(cpuRamError);
    }

    // GPU + Case compatibility
    if (slots.gpu && slots.case) {
      const gpuCaseError = checkCompatibility.gpuCase(
        slots.gpu as GPU, 
        slots.case as Case
      );
      if (gpuCaseError) errors.push(gpuCaseError);
    }

    // Cooler + Case compatibility
    if (slots.cooler && slots.case) {
      const coolerCaseError = checkCompatibility.coolerCase(
        slots.cooler as Cooler, 
        slots.case as Case
      );
      if (coolerCaseError) errors.push(coolerCaseError);
    }

    // Cooler + CPU compatibility
    if (slots.cooler && slots.cpu) {
      const coolerCpuError = checkCompatibility.coolerCpu(
        slots.cooler as Cooler, 
        slots.cpu as CPU
      );
      if (coolerCpuError) errors.push(coolerCpuError);
    }

    // Motherboard + Case compatibility
    if (slots.motherboard && slots.case) {
      const mbCaseError = checkCompatibility.motherboardCase(
        slots.motherboard as Motherboard, 
        slots.case as Case
      );
      if (mbCaseError) errors.push(mbCaseError);
    }

    // Calculate total power and check PSU
    let totalPower = 0;
    Object.values(slots).forEach(component => {
      if (component && component.powerDraw) {
        totalPower += component.powerDraw;
      }
    });

    if (slots.psu) {
      const psuError = checkCompatibility.psuPower(
        slots.psu as PSU, 
        totalPower
      );
      if (psuError) errors.push(psuError);
    }

    return errors;
  }, []);

  const selectScenario = useCallback((scenarioId: string) => {
    const scenario = puzzleScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setState(prev => ({
        ...prev,
        currentScenario: scenario,
        build: createEmptyBuild(),
        showHints: false,
        selectedComponent: null
      }));
    }
  }, []);

  const installComponent = useCallback((component: HardwareComponent) => {
    setState(prev => {
      const newSlots = { ...prev.build.slots };
      newSlots[component.category] = component;
      
      // Calculate total power
      let totalPower = 0;
      Object.values(newSlots).forEach(c => {
        if (c && c.powerDraw) {
          totalPower += c.powerDraw;
        }
      });

      const newBuild: BuildState = {
        ...prev.build,
        slots: newSlots,
        totalPower
      };

      // Validate build
      const errors = validateBuild(newBuild);
      newBuild.errors = errors;
      newBuild.isCompatible = errors.filter(e => e.type === 'error').length === 0;
      
      // Check if build is complete (all required slots filled)
      const requiredSlots: ComponentCategory[] = ['cpu', 'motherboard', 'ram', 'psu', 'storage', 'case'];
      newBuild.isComplete = requiredSlots.every(slot => newSlots[slot] !== null);

      return {
        ...prev,
        build: newBuild,
        selectedComponent: null
      };
    });
  }, [validateBuild]);

  const removeComponent = useCallback((category: ComponentCategory) => {
    setState(prev => {
      const newSlots = { ...prev.build.slots };
      newSlots[category] = null;

      // Calculate total power
      let totalPower = 0;
      Object.values(newSlots).forEach(c => {
        if (c && c.powerDraw) {
          totalPower += c.powerDraw;
        }
      });

      const newBuild: BuildState = {
        ...prev.build,
        slots: newSlots,
        totalPower
      };

      // Validate build
      const errors = validateBuild(newBuild);
      newBuild.errors = errors;
      newBuild.isCompatible = errors.filter(e => e.type === 'error').length === 0;
      
      // Check if build is complete
      const requiredSlots: ComponentCategory[] = ['cpu', 'motherboard', 'ram', 'psu', 'storage', 'case'];
      newBuild.isComplete = requiredSlots.every(slot => newSlots[slot] !== null);

      return {
        ...prev,
        build: newBuild
      };
    });
  }, [validateBuild]);

  const selectComponent = useCallback((component: HardwareComponent | null) => {
    setState(prev => ({
      ...prev,
      selectedComponent: component
    }));
  }, []);

  const toggleHints = useCallback(() => {
    setState(prev => ({
      ...prev,
      showHints: !prev.showHints
    }));
  }, []);

  const completeBuild = useCallback(() => {
    const { currentScenario, build, completedScenarios } = state;
    
    if (!currentScenario || !build.isComplete || !build.isCompatible) {
      return false;
    }

    // Check if already completed
    if (completedScenarios.includes(currentScenario.id)) {
      return true;
    }

    // Award XP only once
    addXP({
      xp: currentScenario.xpReward,
      reason: `Hardware-Puzzle abgeschlossen: ${currentScenario.title}`
    });

    const newCompleted = [...completedScenarios, currentScenario.id];
    saveProgress(newCompleted);

    setState(prev => ({
      ...prev,
      completedScenarios: newCompleted
    }));

    return true;
  }, [state, addXP]);

  const resetBuild = useCallback(() => {
    setState(prev => ({
      ...prev,
      build: createEmptyBuild(),
      selectedComponent: null
    }));
  }, []);

  const exitScenario = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScenario: null,
      build: createEmptyBuild(),
      selectedComponent: null,
      showHints: false
    }));
  }, []);

  const isScenarioCompleted = useCallback((scenarioId: string) => {
    return state.completedScenarios.includes(scenarioId);
  }, [state.completedScenarios]);

  return {
    state,
    scenarios: puzzleScenarios,
    selectScenario,
    installComponent,
    removeComponent,
    selectComponent,
    toggleHints,
    completeBuild,
    resetBuild,
    exitScenario,
    isScenarioCompleted
  };
};
