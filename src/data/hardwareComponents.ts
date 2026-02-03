import type { 
  CPU, 
  Motherboard, 
  RAM, 
  GPU, 
  PSU, 
  Storage, 
  Case, 
  Cooler,
  PuzzleScenario,
  HardwareComponent
} from '@/types/hardwarePuzzle';

// CPUs
export const cpus: CPU[] = [
  {
    id: 'cpu-i5-13600k',
    name: 'Intel Core i5-13600K',
    category: 'cpu',
    socket: 'LGA1700',
    cores: 14,
    threads: 20,
    baseClock: 3.5,
    tdp: 125,
    supportedRam: ['DDR4', 'DDR5'],
    powerDraw: 125,
    image: '/placeholder.svg',
    description: 'Leistungsstarker Mittelklasse-Prozessor mit P- und E-Cores',
    specs: ['14 Kerne (6P + 8E)', '20 Threads', '3.5 GHz Basis', 'LGA1700']
  },
  {
    id: 'cpu-i7-12700k',
    name: 'Intel Core i7-12700K',
    category: 'cpu',
    socket: 'LGA1700',
    cores: 12,
    threads: 20,
    baseClock: 3.6,
    tdp: 125,
    supportedRam: ['DDR4', 'DDR5'],
    powerDraw: 125,
    image: '/placeholder.svg',
    description: 'High-End Prozessor der 12. Generation',
    specs: ['12 Kerne (8P + 4E)', '20 Threads', '3.6 GHz Basis', 'LGA1700']
  },
  {
    id: 'cpu-r5-5600x',
    name: 'AMD Ryzen 5 5600X',
    category: 'cpu',
    socket: 'AM4',
    cores: 6,
    threads: 12,
    baseClock: 3.7,
    tdp: 65,
    supportedRam: ['DDR4'],
    powerDraw: 65,
    image: '/placeholder.svg',
    description: 'Effizienter Gaming-Prozessor mit Zen 3 Architektur',
    specs: ['6 Kerne', '12 Threads', '3.7 GHz Basis', 'AM4']
  },
  {
    id: 'cpu-r7-7700x',
    name: 'AMD Ryzen 7 7700X',
    category: 'cpu',
    socket: 'AM5',
    cores: 8,
    threads: 16,
    baseClock: 4.5,
    tdp: 105,
    supportedRam: ['DDR5'],
    powerDraw: 105,
    image: '/placeholder.svg',
    description: 'Zen 4 Prozessor mit exzellenter Single-Thread Leistung',
    specs: ['8 Kerne', '16 Threads', '4.5 GHz Basis', 'AM5']
  },
  {
    id: 'cpu-i3-12100',
    name: 'Intel Core i3-12100',
    category: 'cpu',
    socket: 'LGA1700',
    cores: 4,
    threads: 8,
    baseClock: 3.3,
    tdp: 60,
    supportedRam: ['DDR4', 'DDR5'],
    powerDraw: 60,
    image: '/placeholder.svg',
    description: 'Budget-freundlicher Einstiegsprozessor',
    specs: ['4 Kerne', '8 Threads', '3.3 GHz Basis', 'LGA1700']
  }
];

// Motherboards
export const motherboards: Motherboard[] = [
  {
    id: 'mb-z690-ddr5',
    name: 'ASUS ROG Strix Z690-F',
    category: 'motherboard',
    socket: 'LGA1700',
    ramType: 'DDR5',
    ramSlots: 4,
    maxRam: 128,
    formFactor: 'ATX',
    pciSlots: 3,
    m2Slots: 4,
    sataSlots: 6,
    image: '/placeholder.svg',
    description: 'Premium ATX Mainboard mit DDR5 Support',
    specs: ['LGA1700', 'DDR5', '4 RAM-Slots', 'ATX']
  },
  {
    id: 'mb-b660-ddr4',
    name: 'MSI PRO B660M-A',
    category: 'motherboard',
    socket: 'LGA1700',
    ramType: 'DDR4',
    ramSlots: 2,
    maxRam: 64,
    formFactor: 'Micro-ATX',
    pciSlots: 1,
    m2Slots: 2,
    sataSlots: 4,
    image: '/placeholder.svg',
    description: 'Kompaktes Budget-Mainboard mit DDR4',
    specs: ['LGA1700', 'DDR4', '2 RAM-Slots', 'Micro-ATX']
  },
  {
    id: 'mb-b550-am4',
    name: 'Gigabyte B550 AORUS Elite',
    category: 'motherboard',
    socket: 'AM4',
    ramType: 'DDR4',
    ramSlots: 4,
    maxRam: 128,
    formFactor: 'ATX',
    pciSlots: 2,
    m2Slots: 2,
    sataSlots: 6,
    image: '/placeholder.svg',
    description: 'Solides AM4 Mainboard für Ryzen CPUs',
    specs: ['AM4', 'DDR4', '4 RAM-Slots', 'ATX']
  },
  {
    id: 'mb-x670-am5',
    name: 'ASUS TUF Gaming X670E-Plus',
    category: 'motherboard',
    socket: 'AM5',
    ramType: 'DDR5',
    ramSlots: 4,
    maxRam: 128,
    formFactor: 'ATX',
    pciSlots: 2,
    m2Slots: 4,
    sataSlots: 4,
    image: '/placeholder.svg',
    description: 'Robustes AM5 Mainboard für Ryzen 7000',
    specs: ['AM5', 'DDR5', '4 RAM-Slots', 'ATX']
  },
  {
    id: 'mb-h610-itx',
    name: 'ASRock H610M-ITX',
    category: 'motherboard',
    socket: 'LGA1700',
    ramType: 'DDR4',
    ramSlots: 2,
    maxRam: 64,
    formFactor: 'Mini-ITX',
    pciSlots: 1,
    m2Slots: 1,
    sataSlots: 2,
    image: '/placeholder.svg',
    description: 'Kompaktes Mini-ITX Board für kleine Builds',
    specs: ['LGA1700', 'DDR4', '2 RAM-Slots', 'Mini-ITX']
  }
];

// RAM
export const ramModules: RAM[] = [
  {
    id: 'ram-ddr5-32gb-6000',
    name: 'G.Skill Trident Z5 RGB 32GB',
    category: 'ram',
    type: 'DDR5',
    capacity: 32,
    speed: 6000,
    modules: 2,
    powerDraw: 10,
    image: '/placeholder.svg',
    description: 'High-Performance DDR5 Kit mit RGB',
    specs: ['32GB (2x16GB)', 'DDR5-6000', 'CL30', 'RGB']
  },
  {
    id: 'ram-ddr4-16gb-3200',
    name: 'Corsair Vengeance LPX 16GB',
    category: 'ram',
    type: 'DDR4',
    capacity: 16,
    speed: 3200,
    modules: 2,
    powerDraw: 5,
    image: '/placeholder.svg',
    description: 'Zuverlässiges DDR4 Kit für Gaming',
    specs: ['16GB (2x8GB)', 'DDR4-3200', 'CL16', 'Low Profile']
  },
  {
    id: 'ram-ddr4-32gb-3600',
    name: 'Kingston Fury Beast 32GB',
    category: 'ram',
    type: 'DDR4',
    capacity: 32,
    speed: 3600,
    modules: 2,
    powerDraw: 8,
    image: '/placeholder.svg',
    description: 'Schnelles DDR4 Kit mit XMP',
    specs: ['32GB (2x16GB)', 'DDR4-3600', 'CL18', 'XMP 2.0']
  },
  {
    id: 'ram-ddr5-16gb-5600',
    name: 'Crucial DDR5-5600 16GB',
    category: 'ram',
    type: 'DDR5',
    capacity: 16,
    speed: 5600,
    modules: 2,
    powerDraw: 8,
    image: '/placeholder.svg',
    description: 'Einsteiger DDR5 Kit',
    specs: ['16GB (2x8GB)', 'DDR5-5600', 'CL46', 'On-Die ECC']
  }
];

// GPUs
export const gpus: GPU[] = [
  {
    id: 'gpu-rtx4070',
    name: 'NVIDIA GeForce RTX 4070',
    category: 'gpu',
    vram: 12,
    powerConnector: '1x 8-Pin',
    length: 285,
    powerDraw: 200,
    image: '/placeholder.svg',
    description: 'Effiziente 1440p Gaming-GPU',
    specs: ['12GB GDDR6X', 'DLSS 3', '200W TDP', '285mm']
  },
  {
    id: 'gpu-rtx4080',
    name: 'NVIDIA GeForce RTX 4080',
    category: 'gpu',
    vram: 16,
    powerConnector: '1x 16-Pin',
    length: 320,
    powerDraw: 320,
    image: '/placeholder.svg',
    description: 'High-End 4K Gaming-GPU',
    specs: ['16GB GDDR6X', 'DLSS 3', '320W TDP', '320mm']
  },
  {
    id: 'gpu-rx7600',
    name: 'AMD Radeon RX 7600',
    category: 'gpu',
    vram: 8,
    powerConnector: '1x 8-Pin',
    length: 240,
    powerDraw: 165,
    image: '/placeholder.svg',
    description: 'Preis-Leistungs-Sieger für 1080p',
    specs: ['8GB GDDR6', 'FSR 3', '165W TDP', '240mm']
  },
  {
    id: 'gpu-rtx3060',
    name: 'NVIDIA GeForce RTX 3060',
    category: 'gpu',
    vram: 12,
    powerConnector: '1x 8-Pin',
    length: 242,
    powerDraw: 170,
    image: '/placeholder.svg',
    description: 'Beliebte Mittelklasse-GPU',
    specs: ['12GB GDDR6', 'DLSS 2', '170W TDP', '242mm']
  }
];

// PSUs
export const psus: PSU[] = [
  {
    id: 'psu-750w-gold',
    name: 'Corsair RM750x',
    category: 'psu',
    wattage: 750,
    efficiency: '80+ Gold',
    modular: true,
    image: '/placeholder.svg',
    description: 'Zuverlässiges modulares Netzteil',
    specs: ['750W', '80+ Gold', 'Vollmodular', '10 Jahre Garantie']
  },
  {
    id: 'psu-850w-gold',
    name: 'be quiet! Straight Power 12',
    category: 'psu',
    wattage: 850,
    efficiency: '80+ Platinum',
    modular: true,
    image: '/placeholder.svg',
    description: 'Premium-Netzteil für High-End Systeme',
    specs: ['850W', '80+ Platinum', 'Vollmodular', 'Silent']
  },
  {
    id: 'psu-550w-bronze',
    name: 'EVGA 550 B5',
    category: 'psu',
    wattage: 550,
    efficiency: '80+ Bronze',
    modular: false,
    image: '/placeholder.svg',
    description: 'Budget-Netzteil für Einsteiger-Builds',
    specs: ['550W', '80+ Bronze', 'Nicht-modular', '5 Jahre Garantie']
  },
  {
    id: 'psu-650w-gold',
    name: 'Seasonic Focus GX-650',
    category: 'psu',
    wattage: 650,
    efficiency: '80+ Gold',
    modular: true,
    image: '/placeholder.svg',
    description: 'Kompaktes modulares Netzteil',
    specs: ['650W', '80+ Gold', 'Vollmodular', 'Kompakt']
  }
];

// Storage
export const storageDevices: Storage[] = [
  {
    id: 'ssd-nvme-1tb',
    name: 'Samsung 980 PRO 1TB',
    category: 'storage',
    interface: 'NVMe',
    capacity: 1000,
    readSpeed: 7000,
    writeSpeed: 5000,
    powerDraw: 8,
    image: '/placeholder.svg',
    description: 'Schnelle PCIe 4.0 NVMe SSD',
    specs: ['1TB', 'NVMe PCIe 4.0', '7000 MB/s Lesen', 'M.2']
  },
  {
    id: 'ssd-sata-500gb',
    name: 'Crucial MX500 500GB',
    category: 'storage',
    interface: 'SATA',
    capacity: 500,
    readSpeed: 560,
    writeSpeed: 510,
    powerDraw: 4,
    image: '/placeholder.svg',
    description: 'Zuverlässige SATA SSD',
    specs: ['500GB', 'SATA III', '560 MB/s Lesen', '2.5"']
  },
  {
    id: 'ssd-nvme-2tb',
    name: 'WD Black SN850X 2TB',
    category: 'storage',
    interface: 'NVMe',
    capacity: 2000,
    readSpeed: 7300,
    writeSpeed: 6600,
    powerDraw: 9,
    image: '/placeholder.svg',
    description: 'High-End Gaming SSD mit viel Speicher',
    specs: ['2TB', 'NVMe PCIe 4.0', '7300 MB/s Lesen', 'Heatsink']
  }
];

// Cases
export const cases: Case[] = [
  {
    id: 'case-atx-meshify',
    name: 'Fractal Design Meshify 2',
    category: 'case',
    formFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    maxGpuLength: 467,
    maxCoolerHeight: 185,
    image: '/placeholder.svg',
    description: 'Luftiges Mesh-Gehäuse mit exzellentem Airflow',
    specs: ['ATX', 'GPU bis 467mm', 'Kühler bis 185mm', 'Mesh-Front']
  },
  {
    id: 'case-matx-nr200',
    name: 'Cooler Master NR200P',
    category: 'case',
    formFactors: ['Mini-ITX'],
    maxGpuLength: 330,
    maxCoolerHeight: 155,
    image: '/placeholder.svg',
    description: 'Kompaktes Mini-ITX Gehäuse',
    specs: ['Mini-ITX', 'GPU bis 330mm', 'Kühler bis 155mm', 'Glasseite']
  },
  {
    id: 'case-atx-4000d',
    name: 'Corsair 4000D Airflow',
    category: 'case',
    formFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    maxGpuLength: 360,
    maxCoolerHeight: 170,
    image: '/placeholder.svg',
    description: 'Beliebtes Mid-Tower mit guter Kühlung',
    specs: ['ATX', 'GPU bis 360mm', 'Kühler bis 170mm', 'Mesh-Front']
  },
  {
    id: 'case-matx-q300l',
    name: 'Cooler Master MasterBox Q300L',
    category: 'case',
    formFactors: ['Micro-ATX', 'Mini-ITX'],
    maxGpuLength: 360,
    maxCoolerHeight: 159,
    image: '/placeholder.svg',
    description: 'Günstiges Micro-ATX Gehäuse',
    specs: ['Micro-ATX', 'GPU bis 360mm', 'Kühler bis 159mm', 'Budget']
  }
];

// Coolers
export const coolers: Cooler[] = [
  {
    id: 'cooler-nhd15',
    name: 'Noctua NH-D15',
    category: 'cooler',
    sockets: ['LGA1700', 'LGA1200', 'AM5', 'AM4'],
    height: 165,
    tdpRating: 250,
    type: 'air',
    powerDraw: 5,
    image: '/placeholder.svg',
    description: 'Premium Dual-Tower Luftkühler',
    specs: ['165mm Höhe', '250W TDP', 'Dual-Tower', 'Sehr leise']
  },
  {
    id: 'cooler-vetrox5',
    name: 'ID-COOLING SE-224-XT',
    category: 'cooler',
    sockets: ['LGA1700', 'LGA1200', 'AM5', 'AM4'],
    height: 154,
    tdpRating: 180,
    type: 'air',
    powerDraw: 3,
    image: '/placeholder.svg',
    description: 'Preis-Leistungs Tower-Kühler',
    specs: ['154mm Höhe', '180W TDP', 'Tower', 'Budget']
  },
  {
    id: 'cooler-h100i',
    name: 'Corsair iCUE H100i RGB Elite',
    category: 'cooler',
    sockets: ['LGA1700', 'LGA1200', 'AM5', 'AM4'],
    height: 52,
    tdpRating: 300,
    type: 'aio',
    powerDraw: 15,
    image: '/placeholder.svg',
    description: '240mm AIO Wasserkühlung mit RGB',
    specs: ['240mm Radiator', '300W TDP', 'AIO', 'RGB']
  },
  {
    id: 'cooler-basic',
    name: 'Arctic Freezer 34',
    category: 'cooler',
    sockets: ['LGA1700', 'LGA1200', 'AM4'],
    height: 157,
    tdpRating: 150,
    type: 'air',
    powerDraw: 3,
    image: '/placeholder.svg',
    description: 'Solider Einsteiger-Kühler',
    specs: ['157mm Höhe', '150W TDP', 'Tower', 'Günstig']
  }
];

// All components combined for easy access
export const allComponents: HardwareComponent[] = [
  ...cpus,
  ...motherboards,
  ...ramModules,
  ...gpus,
  ...psus,
  ...storageDevices,
  ...cases,
  ...coolers
];

// Puzzle Scenarios
export const puzzleScenarios: PuzzleScenario[] = [
  {
    id: 'scenario-gaming-budget',
    title: 'Budget Gaming PC',
    description: 'Baue einen soliden Gaming-PC für 1080p Gaming. Achte auf Kompatibilität zwischen CPU, Mainboard und RAM!',
    difficulty: 'beginner',
    budget: 800,
    requirements: [
      'CPU und Mainboard müssen denselben Sockel haben',
      'RAM-Typ muss zum Mainboard passen',
      'Netzteil muss genug Leistung liefern'
    ],
    availableComponents: [
      cpus.find(c => c.id === 'cpu-i3-12100')!,
      cpus.find(c => c.id === 'cpu-r5-5600x')!,
      motherboards.find(c => c.id === 'mb-b660-ddr4')!,
      motherboards.find(c => c.id === 'mb-b550-am4')!,
      ramModules.find(c => c.id === 'ram-ddr4-16gb-3200')!,
      ramModules.find(c => c.id === 'ram-ddr5-16gb-5600')!,
      gpus.find(c => c.id === 'gpu-rx7600')!,
      gpus.find(c => c.id === 'gpu-rtx3060')!,
      psus.find(c => c.id === 'psu-550w-bronze')!,
      psus.find(c => c.id === 'psu-650w-gold')!,
      storageDevices.find(c => c.id === 'ssd-sata-500gb')!,
      storageDevices.find(c => c.id === 'ssd-nvme-1tb')!,
      cases.find(c => c.id === 'case-matx-q300l')!,
      cases.find(c => c.id === 'case-atx-4000d')!,
      coolers.find(c => c.id === 'cooler-basic')!,
      coolers.find(c => c.id === 'cooler-vetrox5')!,
    ],
    hints: [
      'Intel LGA1700 CPUs benötigen ein LGA1700 Mainboard',
      'AMD AM4 CPUs nutzen nur DDR4 RAM',
      'Das Micro-ATX Gehäuse ist günstiger'
    ],
    xpReward: 50
  },
  {
    id: 'scenario-gaming-mid',
    title: 'Mittelklasse Gaming Rig',
    description: 'Stelle einen ausgewogenen Gaming-PC zusammen, der auch mit neueren Spielen gut zurechtkommt.',
    difficulty: 'intermediate',
    requirements: [
      'Alle Komponenten müssen kompatibel sein',
      'CPU-Kühler muss zur CPU passen',
      'GPU muss ins Gehäuse passen'
    ],
    availableComponents: [
      cpus.find(c => c.id === 'cpu-i5-13600k')!,
      cpus.find(c => c.id === 'cpu-r5-5600x')!,
      cpus.find(c => c.id === 'cpu-r7-7700x')!,
      motherboards.find(c => c.id === 'mb-z690-ddr5')!,
      motherboards.find(c => c.id === 'mb-b660-ddr4')!,
      motherboards.find(c => c.id === 'mb-b550-am4')!,
      motherboards.find(c => c.id === 'mb-x670-am5')!,
      ramModules.find(c => c.id === 'ram-ddr4-32gb-3600')!,
      ramModules.find(c => c.id === 'ram-ddr5-32gb-6000')!,
      ramModules.find(c => c.id === 'ram-ddr4-16gb-3200')!,
      gpus.find(c => c.id === 'gpu-rtx4070')!,
      gpus.find(c => c.id === 'gpu-rtx3060')!,
      psus.find(c => c.id === 'psu-650w-gold')!,
      psus.find(c => c.id === 'psu-750w-gold')!,
      storageDevices.find(c => c.id === 'ssd-nvme-1tb')!,
      storageDevices.find(c => c.id === 'ssd-nvme-2tb')!,
      cases.find(c => c.id === 'case-atx-meshify')!,
      cases.find(c => c.id === 'case-atx-4000d')!,
      coolers.find(c => c.id === 'cooler-nhd15')!,
      coolers.find(c => c.id === 'cooler-vetrox5')!,
      coolers.find(c => c.id === 'cooler-h100i')!,
    ],
    hints: [
      'Der i5-13600K unterstützt sowohl DDR4 als auch DDR5',
      'Der NH-D15 passt in die meisten ATX-Gehäuse',
      'Ryzen 7000 (AM5) benötigt zwingend DDR5'
    ],
    xpReward: 75
  },
  {
    id: 'scenario-compact-build',
    title: 'Kompakter Mini-ITX Build',
    description: 'Baue einen leistungsfähigen PC in einem kleinen Mini-ITX Gehäuse. Beachte die Größenbeschränkungen!',
    difficulty: 'expert',
    requirements: [
      'Alle Komponenten müssen ins Mini-ITX Gehäuse passen',
      'GPU-Länge darf Maximum nicht überschreiten',
      'Kühlerhöhe muss beachtet werden'
    ],
    availableComponents: [
      cpus.find(c => c.id === 'cpu-i5-13600k')!,
      cpus.find(c => c.id === 'cpu-i3-12100')!,
      motherboards.find(c => c.id === 'mb-h610-itx')!,
      motherboards.find(c => c.id === 'mb-b660-ddr4')!,
      ramModules.find(c => c.id === 'ram-ddr4-32gb-3600')!,
      ramModules.find(c => c.id === 'ram-ddr4-16gb-3200')!,
      gpus.find(c => c.id === 'gpu-rtx4070')!,
      gpus.find(c => c.id === 'gpu-rtx4080')!,
      gpus.find(c => c.id === 'gpu-rx7600')!,
      psus.find(c => c.id === 'psu-650w-gold')!,
      psus.find(c => c.id === 'psu-750w-gold')!,
      storageDevices.find(c => c.id === 'ssd-nvme-1tb')!,
      cases.find(c => c.id === 'case-matx-nr200')!,
      cases.find(c => c.id === 'case-atx-meshify')!,
      coolers.find(c => c.id === 'cooler-nhd15')!,
      coolers.find(c => c.id === 'cooler-vetrox5')!,
      coolers.find(c => c.id === 'cooler-basic')!,
      coolers.find(c => c.id === 'cooler-h100i')!,
    ],
    hints: [
      'Das NR200P ist Mini-ITX, das andere Gehäuse ist ATX',
      'Die RTX 4080 ist zu lang für das Mini-ITX Gehäuse',
      'Der NH-D15 ist zu hoch für das NR200P'
    ],
    xpReward: 100
  },
  {
    id: 'scenario-highend',
    title: 'High-End Workstation',
    description: 'Baue eine leistungsstarke Workstation für Content Creation und Gaming. Maximiere die Leistung!',
    difficulty: 'expert',
    requirements: [
      'Mindestens 32GB RAM',
      'High-End GPU für Rendering',
      'Ausreichend Netzteilleistung mit Reserven'
    ],
    availableComponents: [
      cpus.find(c => c.id === 'cpu-i7-12700k')!,
      cpus.find(c => c.id === 'cpu-i5-13600k')!,
      cpus.find(c => c.id === 'cpu-r7-7700x')!,
      motherboards.find(c => c.id === 'mb-z690-ddr5')!,
      motherboards.find(c => c.id === 'mb-x670-am5')!,
      ramModules.find(c => c.id === 'ram-ddr5-32gb-6000')!,
      ramModules.find(c => c.id === 'ram-ddr5-16gb-5600')!,
      gpus.find(c => c.id === 'gpu-rtx4080')!,
      gpus.find(c => c.id === 'gpu-rtx4070')!,
      psus.find(c => c.id === 'psu-750w-gold')!,
      psus.find(c => c.id === 'psu-850w-gold')!,
      storageDevices.find(c => c.id === 'ssd-nvme-2tb')!,
      storageDevices.find(c => c.id === 'ssd-nvme-1tb')!,
      cases.find(c => c.id === 'case-atx-meshify')!,
      coolers.find(c => c.id === 'cooler-nhd15')!,
      coolers.find(c => c.id === 'cooler-h100i')!,
    ],
    hints: [
      'Die RTX 4080 braucht ca. 320W - plane mindestens 600W für das System',
      'DDR5 Mainboards sind für beide Intel und AMD AM5 verfügbar',
      'Eine AIO-Kühlung ist für High-End CPUs empfehlenswert'
    ],
    xpReward: 100
  },
  // Neue Szenarien
  {
    id: 'scenario-silent-pc',
    title: 'Silent Office PC',
    description: 'Baue einen flüsterleisen Office-PC. Fokus auf geringe Lautstärke bei ausreichender Leistung!',
    difficulty: 'intermediate',
    requirements: [
      'CPU TDP maximal 65W für geräuscharmen Betrieb',
      'Keine dedizierte GPU nötig (integrierte Grafik)',
      'Passiver oder leiser Tower-Kühler empfohlen'
    ],
    availableComponents: [
      cpus.find(c => c.id === 'cpu-i3-12100')!,
      cpus.find(c => c.id === 'cpu-r5-5600x')!,
      motherboards.find(c => c.id === 'mb-b660-ddr4')!,
      motherboards.find(c => c.id === 'mb-b550-am4')!,
      ramModules.find(c => c.id === 'ram-ddr4-16gb-3200')!,
      ramModules.find(c => c.id === 'ram-ddr4-32gb-3600')!,
      psus.find(c => c.id === 'psu-550w-bronze')!,
      psus.find(c => c.id === 'psu-650w-gold')!,
      storageDevices.find(c => c.id === 'ssd-nvme-1tb')!,
      storageDevices.find(c => c.id === 'ssd-sata-500gb')!,
      cases.find(c => c.id === 'case-atx-4000d')!,
      cases.find(c => c.id === 'case-matx-q300l')!,
      coolers.find(c => c.id === 'cooler-nhd15')!,
      coolers.find(c => c.id === 'cooler-basic')!,
      coolers.find(c => c.id === 'cooler-vetrox5')!,
    ],
    hints: [
      'Der i3-12100 hat nur 60W TDP - ideal für Silent-Builds',
      'Der Ryzen 5 5600X hat 65W TDP',
      'Der Noctua NH-D15 ist extrem leise trotz hoher Kühlleistung'
    ],
    xpReward: 75
  },
  {
    id: 'scenario-dev-workstation',
    title: 'Entwickler-Workstation',
    description: 'Konfiguriere einen PC für Softwareentwicklung mit mehreren VMs und schnellen Compile-Zeiten.',
    difficulty: 'intermediate',
    requirements: [
      'Mindestens 32GB RAM für VMs und Container',
      'Schnelle NVMe SSD für IDE und Builds',
      'Viele CPU-Kerne für parallele Builds'
    ],
    availableComponents: [
      cpus.find(c => c.id === 'cpu-i7-12700k')!,
      cpus.find(c => c.id === 'cpu-i5-13600k')!,
      cpus.find(c => c.id === 'cpu-r7-7700x')!,
      motherboards.find(c => c.id === 'mb-z690-ddr5')!,
      motherboards.find(c => c.id === 'mb-b660-ddr4')!,
      motherboards.find(c => c.id === 'mb-x670-am5')!,
      ramModules.find(c => c.id === 'ram-ddr4-32gb-3600')!,
      ramModules.find(c => c.id === 'ram-ddr5-32gb-6000')!,
      gpus.find(c => c.id === 'gpu-rtx3060')!,
      gpus.find(c => c.id === 'gpu-rx7600')!,
      psus.find(c => c.id === 'psu-650w-gold')!,
      psus.find(c => c.id === 'psu-750w-gold')!,
      storageDevices.find(c => c.id === 'ssd-nvme-2tb')!,
      storageDevices.find(c => c.id === 'ssd-nvme-1tb')!,
      cases.find(c => c.id === 'case-atx-meshify')!,
      cases.find(c => c.id === 'case-atx-4000d')!,
      coolers.find(c => c.id === 'cooler-nhd15')!,
      coolers.find(c => c.id === 'cooler-h100i')!,
    ],
    hints: [
      'Der i5-13600K hat 14 Kerne - ideal für parallele Builds',
      'DDR5 bietet mehr Bandbreite für VMs',
      'Eine dedizierte GPU ist für CUDA-basierte Entwicklung hilfreich'
    ],
    xpReward: 75
  },
  {
    id: 'scenario-streaming',
    title: 'Streaming & Content Creation PC',
    description: 'Baue einen PC für Live-Streaming und Video-Editing. GPU-Encoding und schnelles Rendering sind wichtig!',
    difficulty: 'expert',
    requirements: [
      'Nvidia GPU für NVENC Hardware-Encoding',
      'Mindestens 32GB RAM für Video-Editing',
      'Ausreichend CPU-Kerne für Streaming + Gaming gleichzeitig'
    ],
    availableComponents: [
      cpus.find(c => c.id === 'cpu-i7-12700k')!,
      cpus.find(c => c.id === 'cpu-i5-13600k')!,
      cpus.find(c => c.id === 'cpu-r7-7700x')!,
      motherboards.find(c => c.id === 'mb-z690-ddr5')!,
      motherboards.find(c => c.id === 'mb-x670-am5')!,
      ramModules.find(c => c.id === 'ram-ddr5-32gb-6000')!,
      ramModules.find(c => c.id === 'ram-ddr4-32gb-3600')!,
      gpus.find(c => c.id === 'gpu-rtx4080')!,
      gpus.find(c => c.id === 'gpu-rtx4070')!,
      gpus.find(c => c.id === 'gpu-rtx3060')!,
      psus.find(c => c.id === 'psu-750w-gold')!,
      psus.find(c => c.id === 'psu-850w-gold')!,
      storageDevices.find(c => c.id === 'ssd-nvme-2tb')!,
      storageDevices.find(c => c.id === 'ssd-nvme-1tb')!,
      cases.find(c => c.id === 'case-atx-meshify')!,
      coolers.find(c => c.id === 'cooler-nhd15')!,
      coolers.find(c => c.id === 'cooler-h100i')!,
    ],
    hints: [
      'RTX 4070 und 4080 haben den neuesten NVENC Encoder',
      'Der i7-12700K mit 12 Kernen ist ideal fürs Streaming',
      'Viel schneller Speicher ist für Video-Editing wichtig'
    ],
    xpReward: 100
  }
];

export const getComponentsByCategory = (category: string): HardwareComponent[] => {
  return allComponents.filter(c => c.category === category);
};
