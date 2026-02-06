import { ChallengeSet, SubnettingChallenge } from '@/types/subnetting';

// Helper to create challenges
const createChallenge = (
  id: string,
  partial: Omit<SubnettingChallenge, 'id'>
): SubnettingChallenge => ({ id, ...partial });

// Anfänger-Challenges: Basis-Berechnungen
const anfaengerChallenges: SubnettingChallenge[] = [
  createChallenge('anf-1', {
    type: 'subnet-mask',
    difficulty: 'anfaenger',
    question: 'Wie lautet die Subnetzmaske für /24?',
    givenData: { cidr: 24 },
    expectedAnswers: { subnetMask: '255.255.255.0' },
    hints: [
      '/24 bedeutet 24 Bits für das Netzwerk',
      '24 Bits = 3 volle Oktette (3 × 8 = 24)',
      'Volle Oktette sind 255, leere sind 0'
    ],
    explanation: 'Bei /24 sind die ersten 24 Bits auf 1 gesetzt. Das ergibt 3 volle Oktette (255.255.255) und ein leeres Oktett (0).',
    timeLimit: 30,
    points: 10
  }),
  createChallenge('anf-2', {
    type: 'subnet-mask',
    difficulty: 'anfaenger',
    question: 'Wie lautet die Subnetzmaske für /16?',
    givenData: { cidr: 16 },
    expectedAnswers: { subnetMask: '255.255.0.0' },
    hints: [
      '/16 bedeutet 16 Netzwerk-Bits',
      '16 Bits = 2 volle Oktette',
      'Die restlichen 2 Oktette sind für Hosts'
    ],
    explanation: 'Bei /16 sind die ersten 16 Bits gesetzt, was 2 volle Oktette (255.255) und 2 leere Oktette (0.0) ergibt.',
    timeLimit: 30,
    points: 10
  }),
  createChallenge('anf-3', {
    type: 'host-count',
    difficulty: 'anfaenger',
    question: 'Wie viele nutzbare Hosts hat ein /24 Netzwerk?',
    givenData: { cidr: 24 },
    expectedAnswers: { hostCount: 254 },
    hints: [
      'Host-Bits = 32 - CIDR',
      'Anzahl Adressen = 2^Host-Bits',
      'Nutzbare Hosts = Adressen - 2 (Netzwerk & Broadcast)'
    ],
    explanation: '/24 hat 8 Host-Bits. 2^8 = 256 Adressen. Minus Netzwerkadresse und Broadcast = 254 nutzbare Hosts.',
    timeLimit: 45,
    points: 15
  }),
  createChallenge('anf-4', {
    type: 'network-address',
    difficulty: 'anfaenger',
    question: 'Wie lautet die Netzwerkadresse für 192.168.1.100/24?',
    givenData: { ip: '192.168.1.100', cidr: 24 },
    expectedAnswers: { networkAddress: '192.168.1.0' },
    hints: [
      'Bei /24 bleiben die ersten 3 Oktette unverändert',
      'Das letzte Oktett wird zu 0',
      'Die Netzwerkadresse ist immer die niedrigste Adresse im Subnetz'
    ],
    explanation: 'Bei /24 wird das letzte Oktett auf 0 gesetzt, da alle 8 Host-Bits 0 sein müssen für die Netzwerkadresse.',
    timeLimit: 30,
    points: 10
  }),
  createChallenge('anf-5', {
    type: 'broadcast',
    difficulty: 'anfaenger',
    question: 'Wie lautet die Broadcast-Adresse für 192.168.1.0/24?',
    givenData: { networkAddress: '192.168.1.0', cidr: 24 },
    expectedAnswers: { broadcastAddress: '192.168.1.255' },
    hints: [
      'Die Broadcast-Adresse ist die höchste Adresse im Subnetz',
      'Bei /24 werden alle Host-Bits auf 1 gesetzt',
      '8 Bits auf 1 = 255'
    ],
    explanation: 'Die Broadcast-Adresse hat alle Host-Bits auf 1. Bei /24 ergibt das 192.168.1.255.',
    timeLimit: 30,
    points: 10
  })
];

// Fortgeschrittene Challenges: VLSM und unübliche Masken
const fortgeschrittenChallenges: SubnettingChallenge[] = [
  createChallenge('fort-1', {
    type: 'subnet-mask',
    difficulty: 'fortgeschritten',
    question: 'Wie lautet die Subnetzmaske für /26?',
    givenData: { cidr: 26 },
    expectedAnswers: { subnetMask: '255.255.255.192' },
    hints: [
      '/26 = 24 + 2 zusätzliche Bits',
      'Die zusätzlichen 2 Bits im letzten Oktett: 11000000',
      '128 + 64 = 192'
    ],
    explanation: '/26 setzt 26 Bits. Das letzte Oktett hat 2 Netzwerk-Bits (11000000 binär = 192 dezimal).',
    timeLimit: 45,
    points: 20
  }),
  createChallenge('fort-2', {
    type: 'host-count',
    difficulty: 'fortgeschritten',
    question: 'Wie viele nutzbare Hosts hat ein /28 Netzwerk?',
    givenData: { cidr: 28 },
    expectedAnswers: { hostCount: 14 },
    hints: [
      'Host-Bits = 32 - 28 = 4',
      '2^4 = 16 Adressen',
      'Minus 2 für Netzwerk und Broadcast'
    ],
    explanation: '/28 hat 4 Host-Bits. 2^4 = 16. Minus 2 (Netzwerk + Broadcast) = 14 nutzbare Hosts.',
    timeLimit: 45,
    points: 20
  }),
  createChallenge('fort-3', {
    type: 'network-address',
    difficulty: 'fortgeschritten',
    question: 'Wie lautet die Netzwerkadresse für 172.16.45.130/26?',
    givenData: { ip: '172.16.45.130', cidr: 26 },
    expectedAnswers: { networkAddress: '172.16.45.128' },
    hints: [
      '/26 hat Subnetzgrenzen alle 64 Adressen',
      '130 liegt zwischen 128 und 192',
      'Die nächst niedrigere Grenze ist 128'
    ],
    explanation: 'Bei /26 sind die Subnetzgrenzen bei 0, 64, 128, 192. 130 liegt im Subnetz ab 128, also ist die Netzwerkadresse 172.16.45.128.',
    timeLimit: 60,
    points: 25
  }),
  createChallenge('fort-4', {
    type: 'broadcast',
    difficulty: 'fortgeschritten',
    question: 'Wie lautet die Broadcast-Adresse für 10.0.0.0/22?',
    givenData: { networkAddress: '10.0.0.0', cidr: 22 },
    expectedAnswers: { broadcastAddress: '10.0.3.255' },
    hints: [
      '/22 hat 10 Host-Bits',
      '2^10 = 1024 Adressen pro Subnetz',
      'Die Broadcast-Adresse ist Netzwerkadresse + 1023'
    ],
    explanation: '/22 umfasst 1024 Adressen (4 × 256). Von 10.0.0.0 bis 10.0.3.255.',
    timeLimit: 60,
    points: 25
  }),
  createChallenge('fort-5', {
    type: 'cidr-notation',
    difficulty: 'fortgeschritten',
    question: 'Wie lautet die CIDR-Notation für die Subnetzmaske 255.255.255.240?',
    givenData: { subnetMask: '255.255.255.240' },
    expectedAnswers: { cidr: 28 },
    hints: [
      '240 binär = 11110000',
      'Das sind 4 gesetzte Bits im letzten Oktett',
      '24 + 4 = 28'
    ],
    explanation: '255.255.255.240: Die ersten 3 Oktette = 24 Bits. 240 = 11110000 = 4 weitere Bits. Gesamt: /28.',
    timeLimit: 45,
    points: 20
  }),
  createChallenge('fort-6', {
    type: 'first-last-host',
    difficulty: 'fortgeschritten',
    question: 'Wie lauten der erste und letzte nutzbare Host für 192.168.10.64/27?',
    givenData: { networkAddress: '192.168.10.64', cidr: 27 },
    expectedAnswers: { firstHost: '192.168.10.65', lastHost: '192.168.10.94' },
    hints: [
      'Erster Host = Netzwerkadresse + 1',
      '/27 hat 32 Adressen (2^5)',
      'Letzter Host = Broadcast - 1 = 64 + 31 - 1 = 94'
    ],
    explanation: 'Netzwerk: .64, Broadcast: .95 (64+31). Erster Host: .65, Letzter Host: .94.',
    timeLimit: 60,
    points: 25
  })
];

// Experten-Challenges: Komplexe Szenarien und VLSM
const expertenChallenges: SubnettingChallenge[] = [
  createChallenge('exp-1', {
    type: 'mixed',
    difficulty: 'experte',
    question: 'Berechne für 10.50.100.200/21: Netzwerkadresse, Broadcast und Host-Anzahl',
    givenData: { ip: '10.50.100.200', cidr: 21 },
    expectedAnswers: { 
      networkAddress: '10.50.96.0',
      broadcastAddress: '10.50.103.255',
      hostCount: 2046
    },
    hints: [
      '/21 = 8 Bits Netzwerk im 3. Oktett (weniger als voll)',
      'Subnetzgrenzen alle 8 im 3. Oktett (256/32 = 8)',
      '100 liegt zwischen 96 und 104'
    ],
    explanation: '/21 hat 11 Host-Bits. 2^11 = 2048 - 2 = 2046 Hosts. Subnetzgrenzen bei 0, 8, 16... 96 enthält 100. Netzwerk: 10.50.96.0, Broadcast: 10.50.103.255.',
    timeLimit: 90,
    points: 40
  }),
  createChallenge('exp-2', {
    type: 'subnet-mask',
    difficulty: 'experte',
    question: 'Wie lautet die Subnetzmaske für /19?',
    givenData: { cidr: 19 },
    expectedAnswers: { subnetMask: '255.255.224.0' },
    hints: [
      '/19 = 16 + 3 zusätzliche Bits',
      '3 Bits = 11100000 binär',
      '128 + 64 + 32 = 224'
    ],
    explanation: '/19: 2 volle Oktette + 3 Bits im dritten. 11100000 = 224. Maske: 255.255.224.0.',
    timeLimit: 60,
    points: 30
  }),
  createChallenge('exp-3', {
    type: 'network-address',
    difficulty: 'experte',
    question: 'Wie lautet die Netzwerkadresse für 172.31.145.67/18?',
    givenData: { ip: '172.31.145.67', cidr: 18 },
    expectedAnswers: { networkAddress: '172.31.128.0' },
    hints: [
      '/18 hat Subnetzgrenzen alle 64 im dritten Oktett',
      '145 liegt zwischen 128 und 192',
      'Das vierte Oktett wird immer 0'
    ],
    explanation: '/18: Grenzen bei 0, 64, 128, 192 im 3. Oktett. 145 liegt im 128er Subnetz. Netzwerk: 172.31.128.0.',
    timeLimit: 75,
    points: 35
  }),
  createChallenge('exp-4', {
    type: 'mixed',
    difficulty: 'experte',
    question: 'Für 192.168.50.100/29: Berechne ersten und letzten Host sowie die Host-Anzahl',
    givenData: { ip: '192.168.50.100', cidr: 29 },
    expectedAnswers: { 
      firstHost: '192.168.50.97',
      lastHost: '192.168.50.102',
      hostCount: 6
    },
    hints: [
      '/29 hat Subnetzgrenzen alle 8 Adressen',
      '100 liegt zwischen 96 und 104',
      '3 Host-Bits = 8 Adressen - 2 = 6 Hosts'
    ],
    explanation: '/29: Netzwerk .96, Broadcast .103. Erster Host: .97, Letzter: .102. 2^3 - 2 = 6 Hosts.',
    timeLimit: 75,
    points: 35
  }),
  createChallenge('exp-5', {
    type: 'cidr-notation',
    difficulty: 'experte',
    question: 'Wie viele /30 Subnetze können aus einem /24 Netzwerk erstellt werden?',
    givenData: { cidr: 24 },
    expectedAnswers: { hostCount: 64 },
    hints: [
      'Ein /24 hat 256 Adressen',
      'Ein /30 hat 4 Adressen',
      '256 / 4 = ?'
    ],
    explanation: '/24 = 256 Adressen. /30 = 4 Adressen. 256 / 4 = 64 mögliche /30 Subnetze.',
    timeLimit: 60,
    points: 30
  }),
  // Neue Experten-Challenges
  createChallenge('exp-6', {
    type: 'mixed',
    difficulty: 'experte',
    question: 'Berechne für 192.168.100.200/25: Netzwerkadresse, Broadcast und Host-Bereich',
    givenData: { ip: '192.168.100.200', cidr: 25 },
    expectedAnswers: { 
      networkAddress: '192.168.100.128',
      broadcastAddress: '192.168.100.255',
      hostCount: 126
    },
    hints: [
      '/25 teilt das letzte Oktett in zwei Hälften',
      '200 liegt in der zweiten Hälfte (128-255)',
      '7 Host-Bits = 128 Adressen - 2'
    ],
    explanation: '/25: Grenzen bei 0 und 128. 200 > 128, also Netzwerk 192.168.100.128. 2^7 - 2 = 126 Hosts.',
    timeLimit: 75,
    points: 40
  }),
  createChallenge('exp-7', {
    type: 'network-address',
    difficulty: 'experte',
    question: 'Ein Unternehmen hat das Netzwerk 10.0.0.0/8. Welche Netzwerkadresse hat das 100. /16 Subnetz?',
    givenData: { cidr: 8 },
    expectedAnswers: { networkAddress: '10.99.0.0' },
    hints: [
      'Das erste /16 ist 10.0.0.0/16',
      'Das zweite ist 10.1.0.0/16',
      'Das 100. wäre 10.99.0.0/16 (Zählung bei 0 beginnend)'
    ],
    explanation: 'Bei /16 Subnetzen ändert sich das zweite Oktett. Das 100. Subnetz (Index 99) ist 10.99.0.0/16.',
    timeLimit: 90,
    points: 45
  })
];

// Challenge Sets
export const challengeSets: ChallengeSet[] = [
  {
    id: 'anfaenger-basics',
    title: 'Grundlagen: Subnetzmasken & Hosts',
    description: 'Lerne die Basis-Berechnungen für CIDR-Notation, Subnetzmasken und Host-Anzahlen. Perfekt für den Einstieg in Subnetting.',
    difficulty: 'anfaenger',
    challenges: anfaengerChallenges,
    totalPoints: 55,
    timeLimit: 180, // 3 minutes
    passingScore: 60
  },
  {
    id: 'fortgeschritten-vlsm',
    title: 'VLSM: Variable Subnetzmasken',
    description: 'Meistere unübliche Subnetzmasken wie /26, /27, /28 und berechne Netzwerkgrenzen für VLSM-Szenarien.',
    difficulty: 'fortgeschritten',
    challenges: fortgeschrittenChallenges,
    totalPoints: 135,
    timeLimit: 360, // 6 minutes
    passingScore: 65
  },
  {
    id: 'experte-praxis',
    title: 'Praxis: Komplexe Subnetting-Szenarien',
    description: 'IHK-Prüfungsniveau: Kombinierte Berechnungen mit unüblichen CIDR-Werten und praxisnahen IP-Adressen.',
    difficulty: 'experte',
    challenges: expertenChallenges,
    totalPoints: 255,
    timeLimit: 420, // 7 minutes
    passingScore: 70
  }
];

// Utility functions for subnetting calculations
export const subnetUtils = {
  cidrToMask: (cidr: number): string => {
    const mask = [];
    for (let i = 0; i < 4; i++) {
      const bits = Math.min(8, Math.max(0, cidr - i * 8));
      mask.push(256 - Math.pow(2, 8 - bits));
    }
    return mask.join('.');
  },
  
  maskToCidr: (mask: string): number => {
    return mask.split('.').reduce((cidr, octet) => {
      let bits = 0;
      let n = parseInt(octet);
      while (n > 0) {
        bits += n & 1;
        n >>= 1;
      }
      return cidr + bits;
    }, 0);
  },
  
  getNetworkAddress: (ip: string, cidr: number): string => {
    const ipParts = ip.split('.').map(Number);
    const maskParts = subnetUtils.cidrToMask(cidr).split('.').map(Number);
    return ipParts.map((p, i) => p & maskParts[i]).join('.');
  },
  
  getBroadcastAddress: (networkIp: string, cidr: number): string => {
    const ipParts = networkIp.split('.').map(Number);
    const hostBits = 32 - cidr;
    const hostMask = Math.pow(2, hostBits) - 1;
    
    // Apply host mask to get broadcast
    const result = [...ipParts];
    let remaining = hostMask;
    for (let i = 3; i >= 0; i--) {
      result[i] = ipParts[i] | (remaining & 255);
      remaining >>= 8;
    }
    return result.join('.');
  },
  
  getHostCount: (cidr: number): number => {
    const hostBits = 32 - cidr;
    return Math.pow(2, hostBits) - 2;
  },
  
  getFirstHost: (networkIp: string): string => {
    const parts = networkIp.split('.').map(Number);
    parts[3] += 1;
    return parts.join('.');
  },
  
  getLastHost: (broadcastIp: string): string => {
    const parts = broadcastIp.split('.').map(Number);
    parts[3] -= 1;
    return parts.join('.');
  }
};
