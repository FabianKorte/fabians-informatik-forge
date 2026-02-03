// Bit-/Byte-Rechner Types

export type NumberBase = 'binary' | 'decimal' | 'hexadecimal' | 'octal';

export type BitwiseOperation = 'AND' | 'OR' | 'XOR' | 'NOT' | 'LEFT_SHIFT' | 'RIGHT_SHIFT';

export interface ConversionResult {
  binary: string;
  decimal: number;
  hexadecimal: string;
  octal: string;
}

export interface BitwiseResult {
  operation: BitwiseOperation;
  operandA: number;
  operandB?: number;
  shiftAmount?: number;
  result: number;
  binaryA: string;
  binaryB?: string;
  binaryResult: string;
}

export interface ByteUnit {
  name: string;
  abbreviation: string;
  bytes: number;
}

export const BYTE_UNITS: ByteUnit[] = [
  { name: 'Bit', abbreviation: 'b', bytes: 0.125 },
  { name: 'Byte', abbreviation: 'B', bytes: 1 },
  { name: 'Kilobyte', abbreviation: 'KB', bytes: 1024 },
  { name: 'Megabyte', abbreviation: 'MB', bytes: 1024 ** 2 },
  { name: 'Gigabyte', abbreviation: 'GB', bytes: 1024 ** 3 },
  { name: 'Terabyte', abbreviation: 'TB', bytes: 1024 ** 4 },
];

export interface BitExercise {
  id: string;
  title: string;
  description: string;
  type: 'conversion' | 'bitwise' | 'byte-calc';
  difficulty: 'leicht' | 'mittel' | 'schwer';
  points: number;
  question: string;
  hints: string[];
  answer: string | number;
  answerFormat?: string;
}

export interface BitCalculatorState {
  activeTab: 'converter' | 'bitwise' | 'bytes' | 'exercises';
  // Converter state
  inputValue: string;
  inputBase: NumberBase;
  conversionResult: ConversionResult | null;
  // Bitwise state
  operandA: string;
  operandB: string;
  selectedOperation: BitwiseOperation;
  shiftAmount: number;
  bitwiseResult: BitwiseResult | null;
  // Byte converter state
  byteValue: string;
  byteUnit: string;
  byteResults: Record<string, string>;
  // Exercise state
  currentExercise: BitExercise | null;
  userAnswer: string;
  exerciseCompleted: string[];
  showHint: boolean;
  earnedPoints: number;
}

// Utility functions
export const bitUtils = {
  parseInput(value: string, base: NumberBase): number | null {
    if (!value.trim()) return null;
    
    try {
      const cleanValue = value.trim().toLowerCase();
      
      switch (base) {
        case 'binary':
          if (!/^[01]+$/.test(cleanValue)) return null;
          return parseInt(cleanValue, 2);
        case 'decimal':
          if (!/^-?\d+$/.test(cleanValue)) return null;
          return parseInt(cleanValue, 10);
        case 'hexadecimal':
          if (!/^[0-9a-f]+$/.test(cleanValue)) return null;
          return parseInt(cleanValue, 16);
        case 'octal':
          if (!/^[0-7]+$/.test(cleanValue)) return null;
          return parseInt(cleanValue, 8);
        default:
          return null;
      }
    } catch {
      return null;
    }
  },

  convertNumber(value: number): ConversionResult {
    return {
      binary: (value >>> 0).toString(2),
      decimal: value,
      hexadecimal: (value >>> 0).toString(16).toUpperCase(),
      octal: (value >>> 0).toString(8),
    };
  },

  performBitwise(
    operation: BitwiseOperation,
    a: number,
    b?: number,
    shiftAmount?: number
  ): BitwiseResult {
    let result: number;
    
    switch (operation) {
      case 'AND':
        result = (a & (b ?? 0)) >>> 0;
        break;
      case 'OR':
        result = (a | (b ?? 0)) >>> 0;
        break;
      case 'XOR':
        result = (a ^ (b ?? 0)) >>> 0;
        break;
      case 'NOT':
        // For visualization, limit to 8 bits
        result = (~a & 0xFF) >>> 0;
        break;
      case 'LEFT_SHIFT':
        result = (a << (shiftAmount ?? 1)) >>> 0;
        break;
      case 'RIGHT_SHIFT':
        result = (a >>> (shiftAmount ?? 1));
        break;
      default:
        result = 0;
    }

    return {
      operation,
      operandA: a,
      operandB: b,
      shiftAmount,
      result,
      binaryA: (a >>> 0).toString(2).padStart(8, '0'),
      binaryB: b !== undefined ? (b >>> 0).toString(2).padStart(8, '0') : undefined,
      binaryResult: (result >>> 0).toString(2).padStart(8, '0'),
    };
  },

  convertBytes(value: number, fromUnit: string): Record<string, string> {
    const from = BYTE_UNITS.find(u => u.abbreviation === fromUnit);
    if (!from) return {};

    const bytes = value * from.bytes;
    const results: Record<string, string> = {};

    BYTE_UNITS.forEach(unit => {
      const converted = bytes / unit.bytes;
      if (converted >= 0.001 && converted < 1e15) {
        results[unit.abbreviation] = converted % 1 === 0 
          ? converted.toLocaleString('de-DE')
          : converted.toLocaleString('de-DE', { maximumFractionDigits: 6 });
      }
    });

    return results;
  },

  formatBinary(binary: string, groupSize: number = 4): string {
    const padded = binary.padStart(Math.ceil(binary.length / groupSize) * groupSize, '0');
    return padded.match(new RegExp(`.{1,${groupSize}}`, 'g'))?.join(' ') ?? binary;
  },
};
