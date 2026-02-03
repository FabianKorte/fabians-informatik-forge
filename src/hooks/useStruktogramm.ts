import { useState, useCallback } from 'react';
import type { 
  Struktogramm, 
  StruktogrammBlock, 
  StruktogrammState,
  BlockType 
} from '@/types/struktogramm';
import { createEmptyBlock, generateBlockId } from '@/types/struktogramm';
import { struktogrammScenarios, struktogrammTemplates } from '@/data/struktogrammExercises';
import { useGamification } from './useGamification';

const STORAGE_KEY = 'struktogramm_diagrams';
const COMPLETED_KEY = 'struktogramm_completed';

const loadFromStorage = (): Struktogramm[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const loadCompletedExercises = (): string[] => {
  try {
    const stored = localStorage.getItem(COMPLETED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (diagrams: Struktogramm[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(diagrams));
};

const saveCompletedExercises = (completed: string[]) => {
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
};

export const useStruktogramm = () => {
  const { addXP } = useGamification();
  
  const [state, setState] = useState<StruktogrammState>({
    currentDiagram: null,
    savedDiagrams: loadFromStorage(),
    selectedBlock: null,
    isEditing: false,
    clipboardBlock: null
  });
  
  const [completedExercises, setCompletedExercises] = useState<string[]>(loadCompletedExercises());
  const [currentExercise, setCurrentExercise] = useState<string | null>(null);

  // Create new diagram
  const createDiagram = useCallback((title: string = 'Neues Struktogramm') => {
    const newDiagram: Struktogramm = {
      id: generateBlockId(),
      title,
      blocks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      currentDiagram: newDiagram,
      selectedBlock: null,
      isEditing: true
    }));
  }, []);

  // Load template
  const loadTemplate = useCallback((templateId: string) => {
    const template = struktogrammTemplates.find(t => t.id === templateId);
    if (template) {
      const newDiagram: Struktogramm = {
        ...template,
        id: generateBlockId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setState(prev => ({
        ...prev,
        currentDiagram: newDiagram,
        selectedBlock: null,
        isEditing: true
      }));
    }
  }, []);

  // Load saved diagram
  const loadDiagram = useCallback((diagramId: string) => {
    const diagram = state.savedDiagrams.find(d => d.id === diagramId);
    if (diagram) {
      setState(prev => ({
        ...prev,
        currentDiagram: { ...diagram },
        selectedBlock: null,
        isEditing: true
      }));
    }
  }, [state.savedDiagrams]);

  // Save current diagram
  const saveDiagram = useCallback(() => {
    if (!state.currentDiagram) return;
    
    const updatedDiagram = {
      ...state.currentDiagram,
      updatedAt: new Date().toISOString()
    };
    
    setState(prev => {
      const existingIndex = prev.savedDiagrams.findIndex(d => d.id === updatedDiagram.id);
      let newSaved: Struktogramm[];
      
      if (existingIndex >= 0) {
        newSaved = [...prev.savedDiagrams];
        newSaved[existingIndex] = updatedDiagram;
      } else {
        newSaved = [...prev.savedDiagrams, updatedDiagram];
      }
      
      saveToStorage(newSaved);
      
      return {
        ...prev,
        currentDiagram: updatedDiagram,
        savedDiagrams: newSaved
      };
    });
  }, [state.currentDiagram]);

  // Delete diagram
  const deleteDiagram = useCallback((diagramId: string) => {
    setState(prev => {
      const newSaved = prev.savedDiagrams.filter(d => d.id !== diagramId);
      saveToStorage(newSaved);
      
      return {
        ...prev,
        savedDiagrams: newSaved,
        currentDiagram: prev.currentDiagram?.id === diagramId ? null : prev.currentDiagram
      };
    });
  }, []);

  // Add block to diagram
  const addBlock = useCallback((type: BlockType, parentId?: string, position?: number) => {
    if (!state.currentDiagram) return;
    
    const newBlock = createEmptyBlock(type);
    
    setState(prev => {
      if (!prev.currentDiagram) return prev;
      
      const updateBlocks = (blocks: StruktogrammBlock[]): StruktogrammBlock[] => {
        if (!parentId) {
          // Add to root level
          if (position !== undefined) {
            const newBlocks = [...blocks];
            newBlocks.splice(position, 0, newBlock);
            return newBlocks;
          }
          return [...blocks, newBlock];
        }
        
        return blocks.map(block => {
          if (block.id === parentId) {
            // Add to this block's children
            if ('body' in block) {
              return { ...block, body: [...block.body, newBlock] };
            }
            if ('thenBranch' in block) {
              return { ...block, thenBranch: [...block.thenBranch, newBlock] };
            }
          }
          
          // Recursively check children
          if ('body' in block) {
            return { ...block, body: updateBlocks(block.body) };
          }
          if ('thenBranch' in block && 'elseBranch' in block) {
            return {
              ...block,
              thenBranch: updateBlocks(block.thenBranch),
              elseBranch: updateBlocks(block.elseBranch)
            };
          }
          if ('cases' in block) {
            return {
              ...block,
              cases: block.cases.map(c => ({
                ...c,
                blocks: updateBlocks(c.blocks)
              }))
            };
          }
          
          return block;
        });
      };
      
      return {
        ...prev,
        currentDiagram: {
          ...prev.currentDiagram,
          blocks: updateBlocks(prev.currentDiagram.blocks),
          updatedAt: new Date().toISOString()
        },
        selectedBlock: newBlock.id
      };
    });
  }, [state.currentDiagram]);

  // Update block
  const updateBlock = useCallback((blockId: string, updates: Partial<StruktogrammBlock>) => {
    setState(prev => {
      if (!prev.currentDiagram) return prev;
      
      const updateInBlocks = (blocks: StruktogrammBlock[]): StruktogrammBlock[] => {
        return blocks.map(block => {
          if (block.id === blockId) {
            return { ...block, ...updates } as StruktogrammBlock;
          }
          
          // Recursively update in children
          if ('body' in block) {
            return { ...block, body: updateInBlocks(block.body) };
          }
          if ('thenBranch' in block && 'elseBranch' in block) {
            return {
              ...block,
              thenBranch: updateInBlocks(block.thenBranch),
              elseBranch: updateInBlocks(block.elseBranch)
            };
          }
          if ('cases' in block) {
            return {
              ...block,
              cases: block.cases.map(c => ({
                ...c,
                blocks: updateInBlocks(c.blocks)
              }))
            };
          }
          
          return block;
        });
      };
      
      return {
        ...prev,
        currentDiagram: {
          ...prev.currentDiagram,
          blocks: updateInBlocks(prev.currentDiagram.blocks),
          updatedAt: new Date().toISOString()
        }
      };
    });
  }, []);

  // Delete block
  const deleteBlock = useCallback((blockId: string) => {
    setState(prev => {
      if (!prev.currentDiagram) return prev;
      
      const removeFromBlocks = (blocks: StruktogrammBlock[]): StruktogrammBlock[] => {
        return blocks
          .filter(block => block.id !== blockId)
          .map(block => {
            if ('body' in block) {
              return { ...block, body: removeFromBlocks(block.body) };
            }
            if ('thenBranch' in block && 'elseBranch' in block) {
              return {
                ...block,
                thenBranch: removeFromBlocks(block.thenBranch),
                elseBranch: removeFromBlocks(block.elseBranch)
              };
            }
            if ('cases' in block) {
              return {
                ...block,
                cases: block.cases.map(c => ({
                  ...c,
                  blocks: removeFromBlocks(c.blocks)
                }))
              };
            }
            return block;
          });
      };
      
      return {
        ...prev,
        currentDiagram: {
          ...prev.currentDiagram,
          blocks: removeFromBlocks(prev.currentDiagram.blocks),
          updatedAt: new Date().toISOString()
        },
        selectedBlock: prev.selectedBlock === blockId ? null : prev.selectedBlock
      };
    });
  }, []);

  // Move block
  const moveBlock = useCallback((blockId: string, direction: 'up' | 'down') => {
    setState(prev => {
      if (!prev.currentDiagram) return prev;
      
      const moveInArray = (blocks: StruktogrammBlock[]): StruktogrammBlock[] => {
        const index = blocks.findIndex(b => b.id === blockId);
        if (index === -1) {
          // Not found at this level, check children
          return blocks.map(block => {
            if ('body' in block) {
              return { ...block, body: moveInArray(block.body) };
            }
            if ('thenBranch' in block && 'elseBranch' in block) {
              return {
                ...block,
                thenBranch: moveInArray(block.thenBranch),
                elseBranch: moveInArray(block.elseBranch)
              };
            }
            return block;
          });
        }
        
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= blocks.length) return blocks;
        
        const newBlocks = [...blocks];
        [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
        return newBlocks;
      };
      
      return {
        ...prev,
        currentDiagram: {
          ...prev.currentDiagram,
          blocks: moveInArray(prev.currentDiagram.blocks),
          updatedAt: new Date().toISOString()
        }
      };
    });
  }, []);

  // Select block
  const selectBlock = useCallback((blockId: string | null) => {
    setState(prev => ({ ...prev, selectedBlock: blockId }));
  }, []);

  // Copy block to clipboard
  const copyBlock = useCallback((blockId: string) => {
    const findBlock = (blocks: StruktogrammBlock[]): StruktogrammBlock | null => {
      for (const block of blocks) {
        if (block.id === blockId) return block;
        if ('body' in block) {
          const found = findBlock(block.body);
          if (found) return found;
        }
        if ('thenBranch' in block && 'elseBranch' in block) {
          const found = findBlock(block.thenBranch) || findBlock(block.elseBranch);
          if (found) return found;
        }
      }
      return null;
    };
    
    if (state.currentDiagram) {
      const block = findBlock(state.currentDiagram.blocks);
      if (block) {
        setState(prev => ({ ...prev, clipboardBlock: block }));
      }
    }
  }, [state.currentDiagram]);

  // Paste block
  const pasteBlock = useCallback((parentId?: string) => {
    if (!state.clipboardBlock) return;
    
    // Deep clone with new IDs
    const cloneBlock = (block: StruktogrammBlock): StruktogrammBlock => {
      const newBlock = { ...block, id: generateBlockId() };
      
      if ('body' in newBlock) {
        newBlock.body = newBlock.body.map(cloneBlock);
      }
      if ('thenBranch' in newBlock && 'elseBranch' in newBlock) {
        newBlock.thenBranch = newBlock.thenBranch.map(cloneBlock);
        newBlock.elseBranch = newBlock.elseBranch.map(cloneBlock);
      }
      if ('cases' in newBlock) {
        newBlock.cases = newBlock.cases.map(c => ({
          ...c,
          blocks: c.blocks.map(cloneBlock)
        }));
      }
      
      return newBlock as StruktogrammBlock;
    };
    
    const clonedBlock = cloneBlock(state.clipboardBlock);
    
    setState(prev => {
      if (!prev.currentDiagram) return prev;
      
      if (!parentId) {
        return {
          ...prev,
          currentDiagram: {
            ...prev.currentDiagram,
            blocks: [...prev.currentDiagram.blocks, clonedBlock],
            updatedAt: new Date().toISOString()
          },
          selectedBlock: clonedBlock.id
        };
      }
      
      // Add to parent (similar logic as addBlock)
      return prev;
    });
  }, [state.clipboardBlock]);

  // Start exercise
  const startExercise = useCallback((exerciseId: string) => {
    setCurrentExercise(exerciseId);
    createDiagram('Übung');
  }, [createDiagram]);

  // Complete exercise
  const completeExercise = useCallback((exerciseId: string) => {
    if (completedExercises.includes(exerciseId)) return;
    
    // Find exercise and award XP
    for (const scenario of struktogrammScenarios) {
      const exercise = scenario.exercises.find(e => e.id === exerciseId);
      if (exercise) {
        addXP({ xp: exercise.xpReward, reason: `Struktogramm-Übung: ${exercise.title}` });
        
        const newCompleted = [...completedExercises, exerciseId];
        setCompletedExercises(newCompleted);
        saveCompletedExercises(newCompleted);
        break;
      }
    }
  }, [completedExercises, addXP]);

  // Check if exercise completed
  const isExerciseCompleted = useCallback((exerciseId: string) => {
    return completedExercises.includes(exerciseId);
  }, [completedExercises]);

  // Close diagram
  const closeDiagram = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDiagram: null,
      selectedBlock: null,
      isEditing: false
    }));
    setCurrentExercise(null);
  }, []);

  // Update diagram title
  const updateDiagramTitle = useCallback((title: string) => {
    setState(prev => {
      if (!prev.currentDiagram) return prev;
      return {
        ...prev,
        currentDiagram: {
          ...prev.currentDiagram,
          title,
          updatedAt: new Date().toISOString()
        }
      };
    });
  }, []);

  return {
    state,
    scenarios: struktogrammScenarios,
    templates: struktogrammTemplates,
    currentExercise,
    
    // Diagram actions
    createDiagram,
    loadTemplate,
    loadDiagram,
    saveDiagram,
    deleteDiagram,
    closeDiagram,
    updateDiagramTitle,
    
    // Block actions
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    selectBlock,
    copyBlock,
    pasteBlock,
    
    // Exercise actions
    startExercise,
    completeExercise,
    isExerciseCompleted
  };
};
