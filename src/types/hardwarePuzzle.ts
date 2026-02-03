// Hardware Puzzle Types for PC Assembly Learning Tool

export type ComponentCategory = 
  | 'cpu' 
  | 'motherboard' 
  | 'ram' 
  | 'gpu' 
  | 'psu' 
  | 'storage' 
  | 'case' 
  | 'cooler';

export type SocketType = 'LGA1700' | 'LGA1200' | 'AM5' | 'AM4';
export type RamType = 'DDR4' | 'DDR5';
export type FormFactor = 'ATX' | 'Micro-ATX' | 'Mini-ITX';
export type StorageInterface = 'SATA' | 'NVMe' | 'M.2';

export interface BaseComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  image: string;
  description: string;
  specs: string[];
  powerDraw?: number; // Watt
}

export interface CPU extends BaseComponent {
  category: 'cpu';
  socket: SocketType;
  cores: number;
  threads: number;
  baseClock: number; // GHz
  tdp: number; // Watt
  supportedRam: RamType[];
}

export interface Motherboard extends BaseComponent {
  category: 'motherboard';
  socket: SocketType;
  ramType: RamType;
  ramSlots: number;
  maxRam: number; // GB
  formFactor: FormFactor;
  pciSlots: number;
  m2Slots: number;
  sataSlots: number;
}

export interface RAM extends BaseComponent {
  category: 'ram';
  type: RamType;
  capacity: number; // GB
  speed: number; // MHz
  modules: number;
}

export interface GPU extends BaseComponent {
  category: 'gpu';
  vram: number; // GB
  powerConnector: string;
  length: number; // mm
}

export interface PSU extends BaseComponent {
  category: 'psu';
  wattage: number;
  efficiency: string;
  modular: boolean;
}

export interface Storage extends BaseComponent {
  category: 'storage';
  interface: StorageInterface;
  capacity: number; // GB
  readSpeed: number; // MB/s
  writeSpeed: number; // MB/s
}

export interface Case extends BaseComponent {
  category: 'case';
  formFactors: FormFactor[];
  maxGpuLength: number; // mm
  maxCoolerHeight: number; // mm
}

export interface Cooler extends BaseComponent {
  category: 'cooler';
  sockets: SocketType[];
  height: number; // mm
  tdpRating: number; // Watt
  type: 'air' | 'aio';
}

export type HardwareComponent = 
  | CPU 
  | Motherboard 
  | RAM 
  | GPU 
  | PSU 
  | Storage 
  | Case 
  | Cooler;

export interface CompatibilityError {
  type: 'error' | 'warning';
  message: string;
  components: ComponentCategory[];
}

export interface BuildSlot {
  category: ComponentCategory;
  label: string;
  required: boolean;
  installed: HardwareComponent | null;
}

export interface PuzzleScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  budget?: number;
  requirements: string[];
  availableComponents: HardwareComponent[];
  hints: string[];
  xpReward: number;
}

export interface BuildState {
  slots: Record<ComponentCategory, HardwareComponent | null>;
  errors: CompatibilityError[];
  totalPower: number;
  isComplete: boolean;
  isCompatible: boolean;
}

export interface HardwarePuzzleState {
  currentScenario: PuzzleScenario | null;
  build: BuildState;
  completedScenarios: string[];
  showHints: boolean;
  selectedComponent: HardwareComponent | null;
}

// Compatibility check utilities
export const checkCompatibility = {
  cpuMotherboard: (cpu: CPU, mb: Motherboard): CompatibilityError | null => {
    if (cpu.socket !== mb.socket) {
      return {
        type: 'error',
        message: `CPU-Sockel ${cpu.socket} ist nicht kompatibel mit Mainboard-Sockel ${mb.socket}`,
        components: ['cpu', 'motherboard']
      };
    }
    return null;
  },

  ramMotherboard: (ram: RAM, mb: Motherboard): CompatibilityError | null => {
    if (ram.type !== mb.ramType) {
      return {
        type: 'error',
        message: `${ram.type} RAM ist nicht kompatibel mit ${mb.ramType} Mainboard`,
        components: ['ram', 'motherboard']
      };
    }
    if (ram.capacity > mb.maxRam) {
      return {
        type: 'error',
        message: `RAM-Kapazität (${ram.capacity}GB) überschreitet Maximum des Mainboards (${mb.maxRam}GB)`,
        components: ['ram', 'motherboard']
      };
    }
    return null;
  },

  cpuRam: (cpu: CPU, ram: RAM): CompatibilityError | null => {
    if (!cpu.supportedRam.includes(ram.type)) {
      return {
        type: 'error',
        message: `CPU unterstützt kein ${ram.type} RAM`,
        components: ['cpu', 'ram']
      };
    }
    return null;
  },

  gpuCase: (gpu: GPU, pcCase: Case): CompatibilityError | null => {
    if (gpu.length > pcCase.maxGpuLength) {
      return {
        type: 'error',
        message: `GPU zu lang (${gpu.length}mm) für Gehäuse (max. ${pcCase.maxGpuLength}mm)`,
        components: ['gpu', 'case']
      };
    }
    return null;
  },

  coolerCase: (cooler: Cooler, pcCase: Case): CompatibilityError | null => {
    if (cooler.height > pcCase.maxCoolerHeight) {
      return {
        type: 'error',
        message: `Kühler zu hoch (${cooler.height}mm) für Gehäuse (max. ${pcCase.maxCoolerHeight}mm)`,
        components: ['cooler', 'case']
      };
    }
    return null;
  },

  coolerCpu: (cooler: Cooler, cpu: CPU): CompatibilityError | null => {
    if (!cooler.sockets.includes(cpu.socket)) {
      return {
        type: 'error',
        message: `Kühler unterstützt Sockel ${cpu.socket} nicht`,
        components: ['cooler', 'cpu']
      };
    }
    if (cooler.tdpRating < cpu.tdp) {
      return {
        type: 'warning',
        message: `Kühler (${cooler.tdpRating}W TDP) könnte für CPU (${cpu.tdp}W TDP) zu schwach sein`,
        components: ['cooler', 'cpu']
      };
    }
    return null;
  },

  motherboardCase: (mb: Motherboard, pcCase: Case): CompatibilityError | null => {
    if (!pcCase.formFactors.includes(mb.formFactor)) {
      return {
        type: 'error',
        message: `${mb.formFactor} Mainboard passt nicht in Gehäuse (unterstützt: ${pcCase.formFactors.join(', ')})`,
        components: ['motherboard', 'case']
      };
    }
    return null;
  },

  psuPower: (psu: PSU, totalPower: number): CompatibilityError | null => {
    const recommended = totalPower * 1.2; // 20% headroom
    if (psu.wattage < totalPower) {
      return {
        type: 'error',
        message: `Netzteil (${psu.wattage}W) liefert nicht genug Leistung für System (${totalPower}W benötigt)`,
        components: ['psu']
      };
    }
    if (psu.wattage < recommended) {
      return {
        type: 'warning',
        message: `Netzteil hat wenig Reserve. Empfohlen: mindestens ${Math.ceil(recommended)}W`,
        components: ['psu']
      };
    }
    return null;
  }
};

export const categoryLabels: Record<ComponentCategory, string> = {
  cpu: 'Prozessor (CPU)',
  motherboard: 'Mainboard',
  ram: 'Arbeitsspeicher (RAM)',
  gpu: 'Grafikkarte (GPU)',
  psu: 'Netzteil (PSU)',
  storage: 'Speicher (SSD/HDD)',
  case: 'Gehäuse',
  cooler: 'CPU-Kühler'
};

export const categoryIcons: Record<ComponentCategory, string> = {
  cpu: '🔲',
  motherboard: '🖥️',
  ram: '📊',
  gpu: '🎮',
  psu: '⚡',
  storage: '💾',
  case: '📦',
  cooler: '❄️'
};
