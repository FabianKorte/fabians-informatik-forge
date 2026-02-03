import { useState, useCallback, useEffect } from 'react';
import { 
  BitCalculatorState, 
  NumberBase, 
  BitwiseOperation, 
  bitUtils,
  BitExercise 
} from '@/types/bitCalculator';
import { bitExercises } from '@/data/bitExercises';
import { useGamification } from '@/hooks/useGamification';

const STORAGE_KEY = 'bit-calculator-progress';

const initialState: BitCalculatorState = {
  activeTab: 'converter',
  inputValue: '',
  inputBase: 'decimal',
  conversionResult: null,
  operandA: '',
  operandB: '',
  selectedOperation: 'AND',
  shiftAmount: 1,
  bitwiseResult: null,
  byteValue: '',
  byteUnit: 'KB',
  byteResults: {},
  currentExercise: null,
  userAnswer: '',
  exerciseCompleted: [],
  showHint: false,
  earnedPoints: 0,
};

export function useBitCalculator() {
  const [state, setState] = useState<BitCalculatorState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialState,
          exerciseCompleted: parsed.exerciseCompleted || [],
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
      exerciseCompleted: state.exerciseCompleted,
      earnedPoints: state.earnedPoints,
    }));
  }, [state.exerciseCompleted, state.earnedPoints]);

  const setActiveTab = useCallback((tab: BitCalculatorState['activeTab']) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  // Converter functions
  const setInputValue = useCallback((value: string) => {
    setState(prev => {
      const parsed = bitUtils.parseInput(value, prev.inputBase);
      return {
        ...prev,
        inputValue: value,
        conversionResult: parsed !== null ? bitUtils.convertNumber(parsed) : null,
      };
    });
  }, []);

  const setInputBase = useCallback((base: NumberBase) => {
    setState(prev => {
      const parsed = bitUtils.parseInput(prev.inputValue, base);
      return {
        ...prev,
        inputBase: base,
        conversionResult: parsed !== null ? bitUtils.convertNumber(parsed) : null,
      };
    });
  }, []);

  // Bitwise functions
  const setOperandA = useCallback((value: string) => {
    setState(prev => ({ ...prev, operandA: value, bitwiseResult: null }));
  }, []);

  const setOperandB = useCallback((value: string) => {
    setState(prev => ({ ...prev, operandB: value, bitwiseResult: null }));
  }, []);

  const setSelectedOperation = useCallback((op: BitwiseOperation) => {
    setState(prev => ({ ...prev, selectedOperation: op, bitwiseResult: null }));
  }, []);

  const setShiftAmount = useCallback((amount: number) => {
    setState(prev => ({ ...prev, shiftAmount: amount, bitwiseResult: null }));
  }, []);

  const calculateBitwise = useCallback(() => {
    setState(prev => {
      const a = bitUtils.parseInput(prev.operandA, 'decimal');
      const b = bitUtils.parseInput(prev.operandB, 'decimal');
      
      if (a === null) return prev;
      
      const needsSecondOperand = ['AND', 'OR', 'XOR'].includes(prev.selectedOperation);
      if (needsSecondOperand && b === null) return prev;
      
      const result = bitUtils.performBitwise(
        prev.selectedOperation,
        a,
        needsSecondOperand ? b! : undefined,
        prev.shiftAmount
      );
      
      return { ...prev, bitwiseResult: result };
    });
  }, []);

  // Byte converter functions
  const setByteValue = useCallback((value: string) => {
    setState(prev => {
      const num = parseFloat(value.replace(',', '.'));
      return {
        ...prev,
        byteValue: value,
        byteResults: !isNaN(num) ? bitUtils.convertBytes(num, prev.byteUnit) : {},
      };
    });
  }, []);

  const setByteUnit = useCallback((unit: string) => {
    setState(prev => {
      const num = parseFloat(prev.byteValue.replace(',', '.'));
      return {
        ...prev,
        byteUnit: unit,
        byteResults: !isNaN(num) ? bitUtils.convertBytes(num, unit) : {},
      };
    });
  }, []);

  // Exercise functions
  const startExercise = useCallback((exercise: BitExercise) => {
    setState(prev => ({
      ...prev,
      currentExercise: exercise,
      userAnswer: '',
      showHint: false,
    }));
  }, []);

  const setUserAnswer = useCallback((answer: string) => {
    setState(prev => ({ ...prev, userAnswer: answer }));
  }, []);

  const toggleHint = useCallback(() => {
    setState(prev => ({ ...prev, showHint: !prev.showHint }));
  }, []);

  const checkAnswer = useCallback(() => {
    setState(prev => {
      if (!prev.currentExercise) return prev;
      
      const { answer } = prev.currentExercise;
      const userAnswer = prev.userAnswer.trim().toUpperCase();
      const correctAnswer = String(answer).toUpperCase();
      
      const isCorrect = userAnswer === correctAnswer;
      
      if (isCorrect && !prev.exerciseCompleted.includes(prev.currentExercise.id)) {
        addXP({ 
          xp: prev.currentExercise.points, 
          reason: `Bit-Rechner: ${prev.currentExercise.title}` 
        });
        
        return {
          ...prev,
          exerciseCompleted: [...prev.exerciseCompleted, prev.currentExercise.id],
          earnedPoints: prev.earnedPoints + prev.currentExercise.points,
        };
      }
      
      return prev;
    });
  }, [addXP]);

  const isAnswerCorrect = useCallback(() => {
    if (!state.currentExercise) return false;
    const userAnswer = state.userAnswer.trim().toUpperCase();
    const correctAnswer = String(state.currentExercise.answer).toUpperCase();
    return userAnswer === correctAnswer;
  }, [state.currentExercise, state.userAnswer]);

  const closeExercise = useCallback(() => {
    setState(prev => ({ ...prev, currentExercise: null, userAnswer: '', showHint: false }));
  }, []);

  const getExerciseProgress = useCallback(() => {
    const total = bitExercises.length;
    const completed = state.exerciseCompleted.length;
    return { total, completed, percentage: Math.round((completed / total) * 100) };
  }, [state.exerciseCompleted]);

  return {
    state,
    setActiveTab,
    // Converter
    setInputValue,
    setInputBase,
    // Bitwise
    setOperandA,
    setOperandB,
    setSelectedOperation,
    setShiftAmount,
    calculateBitwise,
    // Bytes
    setByteValue,
    setByteUnit,
    // Exercises
    startExercise,
    setUserAnswer,
    toggleHint,
    checkAnswer,
    isAnswerCorrect,
    closeExercise,
    getExerciseProgress,
    exercises: bitExercises,
  };
}
