// Struktogramm (Nassi-Shneiderman Diagram) Types

export type BlockType = 
  | 'sequence'      // Einfache Anweisung
  | 'if'            // Verzweigung (if/else)
  | 'while'         // Kopfgesteuerte Schleife
  | 'doWhile'       // Fußgesteuerte Schleife
  | 'for'           // Zählschleife
  | 'switch'        // Fallunterscheidung
  | 'input'         // Eingabe
  | 'output';       // Ausgabe

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface SequenceBlock extends BaseBlock {
  type: 'sequence';
  content: string;
}

export interface InputBlock extends BaseBlock {
  type: 'input';
  variable: string;
  prompt?: string;
}

export interface OutputBlock extends BaseBlock {
  type: 'output';
  content: string;
}

export interface IfBlock extends BaseBlock {
  type: 'if';
  condition: string;
  thenBranch: StruktogrammBlock[];
  elseBranch: StruktogrammBlock[];
}

export interface WhileBlock extends BaseBlock {
  type: 'while';
  condition: string;
  body: StruktogrammBlock[];
}

export interface DoWhileBlock extends BaseBlock {
  type: 'doWhile';
  condition: string;
  body: StruktogrammBlock[];
}

export interface ForBlock extends BaseBlock {
  type: 'for';
  variable: string;
  start: string;
  end: string;
  step?: string;
  body: StruktogrammBlock[];
}

export interface SwitchCase {
  value: string;
  blocks: StruktogrammBlock[];
}

export interface SwitchBlock extends BaseBlock {
  type: 'switch';
  expression: string;
  cases: SwitchCase[];
  defaultCase?: StruktogrammBlock[];
}

export type StruktogrammBlock = 
  | SequenceBlock 
  | InputBlock 
  | OutputBlock 
  | IfBlock 
  | WhileBlock 
  | DoWhileBlock 
  | ForBlock 
  | SwitchBlock;

export interface Struktogramm {
  id: string;
  title: string;
  description?: string;
  blocks: StruktogrammBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface StruktogrammExercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'anfaenger' | 'fortgeschritten' | 'experte';
  xpReward: number;
  task: string;
  hints: string[];
  solution: Struktogramm;
  category: string;
}

export interface StruktogrammScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'anfaenger' | 'fortgeschritten' | 'experte';
  exercises: StruktogrammExercise[];
  xpReward: number;
}

export interface StruktogrammState {
  currentDiagram: Struktogramm | null;
  savedDiagrams: Struktogramm[];
  selectedBlock: string | null;
  isEditing: boolean;
  clipboardBlock: StruktogrammBlock | null;
}

// Block type labels (German)
export const blockTypeLabels: Record<BlockType, string> = {
  sequence: 'Anweisung',
  if: 'Verzweigung',
  while: 'Solange-Schleife',
  doWhile: 'Wiederhole-bis-Schleife',
  for: 'Zählschleife',
  switch: 'Fallunterscheidung',
  input: 'Eingabe',
  output: 'Ausgabe'
};

// Block type icons (emoji)
export const blockTypeIcons: Record<BlockType, string> = {
  sequence: '▭',
  if: '◇',
  while: '↺',
  doWhile: '↻',
  for: '🔢',
  switch: '⧉',
  input: '📥',
  output: '📤'
};

// Helper to generate unique IDs
export const generateBlockId = (): string => {
  return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create empty block templates
export const createEmptyBlock = (type: BlockType): StruktogrammBlock => {
  const id = generateBlockId();
  
  switch (type) {
    case 'sequence':
      return { id, type, content: 'Neue Anweisung' };
    case 'input':
      return { id, type, variable: 'eingabe', prompt: 'Eingabe:' };
    case 'output':
      return { id, type, content: 'Ausgabe' };
    case 'if':
      return { id, type, condition: 'Bedingung', thenBranch: [], elseBranch: [] };
    case 'while':
      return { id, type, condition: 'Bedingung', body: [] };
    case 'doWhile':
      return { id, type, condition: 'Bedingung', body: [] };
    case 'for':
      return { id, type, variable: 'i', start: '1', end: '10', body: [] };
    case 'switch':
      return { id, type, expression: 'Ausdruck', cases: [{ value: 'Fall 1', blocks: [] }] };
  }
};
