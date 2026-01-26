import { NetworkScenario } from '@/types/networkSimulator';

export const networkScenarios: NetworkScenario[] = [
  {
    id: 'basic-ping',
    title: 'Erste Schritte: Zwei PCs verbinden',
    description: 'Verbinde zwei PCs miteinander und konfiguriere ihre IP-Adressen so, dass sie kommunizieren können.',
    difficulty: 'leicht',
    points: 50,
    initialTopology: {
      devices: [
        {
          id: 'pc1',
          type: 'pc',
          name: 'PC-1',
          x: 100,
          y: 200,
          config: { macAddress: 'AA:BB:CC:DD:EE:01' }
        },
        {
          id: 'pc2',
          type: 'pc',
          name: 'PC-2',
          x: 500,
          y: 200,
          config: { macAddress: 'AA:BB:CC:DD:EE:02' }
        }
      ],
      connections: []
    },
    objectives: [
      {
        id: 'obj1',
        description: 'Verbinde PC-1 mit PC-2',
        type: 'connect-devices',
        target: { sourceDevice: 'pc1', targetDevice: 'pc2' },
        completed: false
      },
      {
        id: 'obj2',
        description: 'Konfiguriere PC-1 mit IP 192.168.1.1/24',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc1', 
          requiredIP: '192.168.1.1', 
          requiredMask: '255.255.255.0' 
        },
        completed: false
      },
      {
        id: 'obj3',
        description: 'Konfiguriere PC-2 mit IP 192.168.1.2/24',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc2', 
          requiredIP: '192.168.1.2', 
          requiredMask: '255.255.255.0' 
        },
        completed: false
      },
      {
        id: 'obj4',
        description: 'Sende erfolgreich einen Ping von PC-1 zu PC-2',
        type: 'ping',
        target: { sourceDevice: 'pc1', targetDevice: 'pc2' },
        completed: false
      }
    ],
    hints: [
      'Beide PCs müssen im selben Subnetz sein (z.B. 192.168.1.x)',
      'Die Subnetzmaske /24 entspricht 255.255.255.0',
      'Klicke auf ein Gerät, um es zu konfigurieren'
    ],
    timeLimit: 300
  },
  {
    id: 'switch-network',
    title: 'Switch-Netzwerk aufbauen',
    description: 'Baue ein Netzwerk mit einem Switch und drei PCs. Alle Geräte sollen miteinander kommunizieren können.',
    difficulty: 'leicht',
    points: 75,
    initialTopology: {
      devices: [
        {
          id: 'switch1',
          type: 'switch',
          name: 'Switch-1',
          x: 300,
          y: 150,
          config: { macAddress: 'SW:IT:CH:00:00:01' }
        },
        {
          id: 'pc1',
          type: 'pc',
          name: 'PC-1',
          x: 100,
          y: 300,
          config: { macAddress: 'AA:BB:CC:DD:EE:01' }
        },
        {
          id: 'pc2',
          type: 'pc',
          name: 'PC-2',
          x: 300,
          y: 300,
          config: { macAddress: 'AA:BB:CC:DD:EE:02' }
        },
        {
          id: 'pc3',
          type: 'pc',
          name: 'PC-3',
          x: 500,
          y: 300,
          config: { macAddress: 'AA:BB:CC:DD:EE:03' }
        }
      ],
      connections: []
    },
    objectives: [
      {
        id: 'obj1',
        description: 'Verbinde alle PCs mit dem Switch',
        type: 'connect-devices',
        target: { sourceDevice: 'switch1', targetDevice: 'pc1' },
        completed: false
      },
      {
        id: 'obj2',
        description: 'Konfiguriere alle PCs im Netzwerk 10.0.0.0/24',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc1', 
          requiredMask: '255.255.255.0' 
        },
        completed: false
      },
      {
        id: 'obj3',
        description: 'Ping von PC-1 zu PC-3 erfolgreich',
        type: 'ping',
        target: { sourceDevice: 'pc1', targetDevice: 'pc3' },
        completed: false
      }
    ],
    hints: [
      'Ein Switch verbindet Geräte auf Layer 2 (MAC-Adressen)',
      'Alle PCs müssen im selben IP-Subnetz sein',
      'Nutze z.B. 10.0.0.1, 10.0.0.2, 10.0.0.3 für die PCs'
    ],
    timeLimit: 420
  },
  {
    id: 'router-basics',
    title: 'Router zwischen zwei Netzwerken',
    description: 'Konfiguriere einen Router, um zwei separate Netzwerke miteinander zu verbinden.',
    difficulty: 'mittel',
    points: 150,
    initialTopology: {
      devices: [
        {
          id: 'router1',
          type: 'router',
          name: 'Router-1',
          x: 300,
          y: 150,
          config: { 
            macAddress: 'RO:UT:ER:00:00:01',
            routingTable: []
          }
        },
        {
          id: 'switch1',
          type: 'switch',
          name: 'Switch-A',
          x: 100,
          y: 300,
          config: { macAddress: 'SW:IT:CH:00:00:01' }
        },
        {
          id: 'switch2',
          type: 'switch',
          name: 'Switch-B',
          x: 500,
          y: 300,
          config: { macAddress: 'SW:IT:CH:00:00:02' }
        },
        {
          id: 'pc1',
          type: 'pc',
          name: 'PC-A1',
          x: 50,
          y: 450,
          config: { macAddress: 'AA:BB:CC:DD:EE:01' }
        },
        {
          id: 'pc2',
          type: 'pc',
          name: 'PC-B1',
          x: 550,
          y: 450,
          config: { macAddress: 'AA:BB:CC:DD:EE:02' }
        }
      ],
      connections: [
        { id: 'conn1', sourceId: 'switch1', targetId: 'pc1' },
        { id: 'conn2', sourceId: 'switch2', targetId: 'pc2' }
      ]
    },
    objectives: [
      {
        id: 'obj1',
        description: 'Verbinde die Switches mit dem Router',
        type: 'connect-devices',
        target: { sourceDevice: 'router1', targetDevice: 'switch1' },
        completed: false
      },
      {
        id: 'obj2',
        description: 'Netzwerk A: 192.168.1.0/24, Netzwerk B: 192.168.2.0/24',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'router1'
        },
        completed: false
      },
      {
        id: 'obj3',
        description: 'Konfiguriere PC-A1 mit Gateway zum Router',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc1',
          requiredGateway: '192.168.1.1'
        },
        completed: false
      },
      {
        id: 'obj4',
        description: 'Ping von PC-A1 zu PC-B1',
        type: 'ping',
        target: { sourceDevice: 'pc1', targetDevice: 'pc2' },
        completed: false
      }
    ],
    hints: [
      'Der Router braucht in jedem Netzwerk eine IP-Adresse (z.B. 192.168.1.1 und 192.168.2.1)',
      'Die PCs müssen das Gateway zum Router konfiguriert haben',
      'Der Router leitet Pakete zwischen den Netzwerken weiter'
    ],
    timeLimit: 600
  },
  {
    id: 'subnetting-challenge',
    title: 'Subnetting-Herausforderung',
    description: 'Teile das Netzwerk 172.16.0.0/16 in 4 Subnetze auf und konfiguriere die Geräte entsprechend.',
    difficulty: 'schwer',
    points: 250,
    initialTopology: {
      devices: [
        {
          id: 'router1',
          type: 'router',
          name: 'Core-Router',
          x: 300,
          y: 100,
          config: { 
            macAddress: 'RO:UT:ER:00:00:01',
            routingTable: []
          }
        },
        {
          id: 'switch1',
          type: 'switch',
          name: 'Abteilung-A',
          x: 100,
          y: 250,
          config: { macAddress: 'SW:IT:CH:00:00:01' }
        },
        {
          id: 'switch2',
          type: 'switch',
          name: 'Abteilung-B',
          x: 300,
          y: 250,
          config: { macAddress: 'SW:IT:CH:00:00:02' }
        },
        {
          id: 'switch3',
          type: 'switch',
          name: 'Abteilung-C',
          x: 500,
          y: 250,
          config: { macAddress: 'SW:IT:CH:00:00:03' }
        },
        {
          id: 'pc1',
          type: 'pc',
          name: 'PC-A1',
          x: 50,
          y: 400,
          config: { macAddress: 'AA:BB:CC:DD:EE:01' }
        },
        {
          id: 'pc2',
          type: 'pc',
          name: 'PC-B1',
          x: 250,
          y: 400,
          config: { macAddress: 'AA:BB:CC:DD:EE:02' }
        },
        {
          id: 'pc3',
          type: 'pc',
          name: 'PC-C1',
          x: 450,
          y: 400,
          config: { macAddress: 'AA:BB:CC:DD:EE:03' }
        },
        {
          id: 'server1',
          type: 'server',
          name: 'Server',
          x: 550,
          y: 400,
          config: { macAddress: 'SE:RV:ER:00:00:01' }
        }
      ],
      connections: [
        { id: 'conn1', sourceId: 'switch1', targetId: 'pc1' },
        { id: 'conn2', sourceId: 'switch2', targetId: 'pc2' },
        { id: 'conn3', sourceId: 'switch3', targetId: 'pc3' },
        { id: 'conn4', sourceId: 'switch3', targetId: 'server1' }
      ]
    },
    objectives: [
      {
        id: 'obj1',
        description: 'Verbinde alle Switches mit dem Router',
        type: 'connect-devices',
        target: { sourceDevice: 'router1' },
        completed: false
      },
      {
        id: 'obj2',
        description: 'Subnetz A: 172.16.0.0/18, Subnetz B: 172.16.64.0/18, Subnetz C: 172.16.128.0/18',
        type: 'configure-ip',
        target: { sourceDevice: 'router1' },
        completed: false
      },
      {
        id: 'obj3',
        description: 'Alle PCs können den Server erreichen',
        type: 'ping',
        target: { sourceDevice: 'pc1', targetDevice: 'server1' },
        completed: false
      }
    ],
    hints: [
      '/18 Subnetzmaske = 255.255.192.0',
      'Jede Abteilung erhält über 16.000 Host-Adressen',
      'Der Router muss in jedem Subnetz eine IP haben (z.B. .1)'
    ],
    timeLimit: 900
  }
];

export function getScenarioById(id: string): NetworkScenario | undefined {
  return networkScenarios.find(s => s.id === id);
}

export function getScenariosByDifficulty(difficulty: 'leicht' | 'mittel' | 'schwer'): NetworkScenario[] {
  return networkScenarios.filter(s => s.difficulty === difficulty);
}
