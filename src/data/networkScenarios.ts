import { NetworkScenario } from '@/types/networkSimulator';

// Lernaufgaben für die Netzwerktechnik-Kategorie
// Jedes Szenario ist als strukturierte Lernübung mit Theorie und Praxis gestaltet

export const networkScenarios: NetworkScenario[] = [
  {
    id: 'lesson-1-basics',
    title: 'Lektion 1: Grundlagen der IP-Adressierung',
    description: 'Lerne die Grundlagen von IPv4-Adressen und wie Geräte im gleichen Netzwerk kommunizieren.',
    difficulty: 'leicht',
    points: 50,
    category: 'Grundlagen',
    theory: {
      title: 'Was ist eine IP-Adresse?',
      content: `Eine **IPv4-Adresse** besteht aus 4 Oktetten (z.B. 192.168.1.1).

**Wichtige Konzepte:**
- Jedes Gerät im Netzwerk braucht eine eindeutige IP-Adresse
- Die **Subnetzmaske** (z.B. 255.255.255.0 = /24) definiert, welche Geräte im gleichen Netzwerk sind
- Geräte im **gleichen Netzwerk** können direkt miteinander kommunizieren

**Beispiel:**
- PC-1: 192.168.1.1/24
- PC-2: 192.168.1.2/24
→ Beide sind im Netzwerk 192.168.1.0/24 und können sich pingen`,
      keywords: ['IPv4', 'Subnetzmaske', 'Oktett', 'Netzwerk-ID']
    },
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
        id: 'step1',
        description: 'Schritt 1: Verbinde PC-1 mit PC-2 (Klicke auf PC-1, dann "Verbinden", dann auf PC-2)',
        type: 'connect-devices',
        target: { sourceDevice: 'pc1', targetDevice: 'pc2' },
        completed: false
      },
      {
        id: 'step2',
        description: 'Schritt 2: Konfiguriere PC-1 mit IP 192.168.1.1 und Maske 255.255.255.0',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc1', 
          requiredIP: '192.168.1.1', 
          requiredMask: '255.255.255.0' 
        },
        completed: false
      },
      {
        id: 'step3',
        description: 'Schritt 3: Konfiguriere PC-2 mit IP 192.168.1.2 und Maske 255.255.255.0',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc2', 
          requiredIP: '192.168.1.2', 
          requiredMask: '255.255.255.0' 
        },
        completed: false
      },
      {
        id: 'step4',
        description: 'Schritt 4: Teste die Verbindung mit einem Ping von PC-1 zu PC-2',
        type: 'ping',
        target: { sourceDevice: 'pc1', targetDevice: 'pc2' },
        completed: false
      }
    ],
    hints: [
      '💡 Doppelklicke auf ein Gerät, um die IP-Konfiguration zu öffnen',
      '💡 /24 bedeutet: Die ersten 24 Bits (= 3 Oktette) sind die Netzwerk-ID',
      '💡 192.168.1.x sind alle im selben Netzwerk bei /24'
    ],
    timeLimit: 600
  },
  {
    id: 'lesson-2-switch',
    title: 'Lektion 2: Switches und Layer 2',
    description: 'Verstehe, wie ein Switch mehrere Geräte verbindet und auf Layer 2 (MAC-Adressen) arbeitet.',
    difficulty: 'leicht',
    points: 75,
    category: 'Layer 2',
    theory: {
      title: 'Was macht ein Switch?',
      content: `Ein **Switch** arbeitet auf **Layer 2** (Sicherungsschicht) des OSI-Modells.

**Wichtige Konzepte:**
- Switches verwenden **MAC-Adressen** zur Weiterleitung
- Ein Switch "lernt" MAC-Adressen und baut eine **MAC-Adresstabelle** auf
- Alle Geräte an einem Switch sind im **gleichen Broadcast-Domain**
- Switches teilen NICHT die Bandbreite wie ein Hub

**Vorteile von Switches:**
- Jeder Port hat volle Bandbreite
- Nur der Zielport erhält das Paket (nicht alle Ports wie beim Hub)
- Keine Kollisionen zwischen Ports`,
      keywords: ['Switch', 'MAC-Adresse', 'Layer 2', 'Broadcast-Domain']
    },
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
        id: 'connect-pc1',
        description: 'Schritt 1a: Verbinde PC-1 mit dem Switch',
        type: 'connect-devices',
        target: { sourceDevice: 'switch1', targetDevice: 'pc1' },
        completed: false
      },
      {
        id: 'connect-pc2',
        description: 'Schritt 1b: Verbinde PC-2 mit dem Switch',
        type: 'connect-devices',
        target: { sourceDevice: 'switch1', targetDevice: 'pc2' },
        completed: false
      },
      {
        id: 'connect-pc3',
        description: 'Schritt 1c: Verbinde PC-3 mit dem Switch',
        type: 'connect-devices',
        target: { sourceDevice: 'switch1', targetDevice: 'pc3' },
        completed: false
      },
      {
        id: 'config-pc1',
        description: 'Schritt 2: Konfiguriere PC-1 mit IP 10.0.0.1/24',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc1', 
          requiredIP: '10.0.0.1',
          requiredMask: '255.255.255.0' 
        },
        completed: false
      },
      {
        id: 'config-pc2',
        description: 'Schritt 3: Konfiguriere PC-2 mit IP 10.0.0.2/24',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc2',
          requiredIP: '10.0.0.2',
          requiredMask: '255.255.255.0' 
        },
        completed: false
      },
      {
        id: 'config-pc3',
        description: 'Schritt 4: Konfiguriere PC-3 mit IP 10.0.0.3/24',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc3',
          requiredIP: '10.0.0.3',
          requiredMask: '255.255.255.0' 
        },
        completed: false
      },
      {
        id: 'ping-test',
        description: 'Schritt 5: Ping von PC-1 zu PC-3',
        type: 'ping',
        target: { sourceDevice: 'pc1', targetDevice: 'pc3' },
        completed: false
      }
    ],
    hints: [
      '💡 Ein Switch braucht selbst keine IP-Adresse um zu funktionieren',
      '💡 Alle PCs müssen im selben Subnetz sein (hier: 10.0.0.0/24)',
      '💡 Der Switch leitet Pakete basierend auf MAC-Adressen weiter'
    ],
    timeLimit: 600
  },
  {
    id: 'lesson-3-routing',
    title: 'Lektion 3: Router und Layer 3',
    description: 'Lerne, wie ein Router zwei verschiedene Netzwerke verbindet.',
    difficulty: 'mittel',
    points: 150,
    category: 'Layer 3',
    theory: {
      title: 'Was macht ein Router?',
      content: `Ein **Router** arbeitet auf **Layer 3** (Netzwerkschicht) und verbindet verschiedene Netzwerke.

**Wichtige Konzepte:**
- Router treffen Weiterleitungsentscheidungen basierend auf **IP-Adressen**
- Jede Router-Schnittstelle ist in einem anderen Netzwerk
- PCs in verschiedenen Netzwerken brauchen ein **Gateway** zum Router

**Beispiel für 2 Netzwerke:**
- Netzwerk A: 192.168.1.0/24 → Router-IP: 192.168.1.1
- Netzwerk B: 192.168.2.0/24 → Router-IP: 192.168.2.1

**Warum ein Gateway?**
Wenn PC-A (192.168.1.10) PC-B (192.168.2.10) erreichen will:
1. PC-A erkennt: "Ziel ist nicht in meinem Netzwerk"
2. PC-A sendet Paket an sein Gateway (Router)
3. Router leitet Paket an Netzwerk B weiter`,
      keywords: ['Router', 'Gateway', 'Layer 3', 'Routing']
    },
    initialTopology: {
      devices: [
        {
          id: 'router1',
          type: 'router',
          name: 'Router-1',
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
          name: 'Switch-A',
          x: 100,
          y: 250,
          config: { macAddress: 'SW:IT:CH:00:00:01' }
        },
        {
          id: 'switch2',
          type: 'switch',
          name: 'Switch-B',
          x: 500,
          y: 250,
          config: { macAddress: 'SW:IT:CH:00:00:02' }
        },
        {
          id: 'pc1',
          type: 'pc',
          name: 'PC-A',
          x: 50,
          y: 400,
          config: { macAddress: 'AA:BB:CC:DD:EE:01' }
        },
        {
          id: 'pc2',
          type: 'pc',
          name: 'PC-B',
          x: 550,
          y: 400,
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
        id: 'connect-router-a',
        description: 'Schritt 1: Verbinde den Router mit Switch-A',
        type: 'connect-devices',
        target: { sourceDevice: 'router1', targetDevice: 'switch1' },
        completed: false
      },
      {
        id: 'connect-router-b',
        description: 'Schritt 2: Verbinde den Router mit Switch-B',
        type: 'connect-devices',
        target: { sourceDevice: 'router1', targetDevice: 'switch2' },
        completed: false
      },
      {
        id: 'config-router',
        description: 'Schritt 3: Konfiguriere Router mit IP 192.168.1.1/24',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'router1',
          requiredIP: '192.168.1.1',
          requiredMask: '255.255.255.0'
        },
        completed: false
      },
      {
        id: 'config-pca',
        description: 'Schritt 4: Konfiguriere PC-A (192.168.1.10/24, Gateway: 192.168.1.1)',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc1',
          requiredIP: '192.168.1.10',
          requiredMask: '255.255.255.0',
          requiredGateway: '192.168.1.1'
        },
        completed: false
      },
      {
        id: 'config-pcb',
        description: 'Schritt 5: Konfiguriere PC-B (192.168.2.10/24, Gateway: 192.168.2.1)',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc2',
          requiredIP: '192.168.2.10',
          requiredMask: '255.255.255.0',
          requiredGateway: '192.168.2.1'
        },
        completed: false
      },
      {
        id: 'ping-cross-network',
        description: 'Schritt 6: Ping von PC-A zu PC-B',
        type: 'ping',
        target: { sourceDevice: 'pc1', targetDevice: 'pc2' },
        completed: false
      }
    ],
    hints: [
      '💡 Der Router hat in jedem Netzwerk eine andere IP-Adresse (192.168.1.1 und 192.168.2.1)',
      '💡 Das Gateway eines PCs ist immer die Router-IP im gleichen Netzwerk',
      '💡 PC-A und PC-B sind in VERSCHIEDENEN Netzwerken und brauchen den Router'
    ],
    timeLimit: 900
  },
  {
    id: 'lesson-4-subnetting',
    title: 'Lektion 4: Subnetting berechnen',
    description: 'Lerne, wie du ein Netzwerk in kleinere Subnetze aufteilst.',
    difficulty: 'mittel',
    points: 200,
    category: 'Subnetting',
    theory: {
      title: 'Wie funktioniert Subnetting?',
      content: `**Subnetting** teilt ein großes Netzwerk in kleinere Subnetze auf.

**CIDR-Notation:**
- /24 = 255.255.255.0 = 256 Adressen (254 nutzbar)
- /25 = 255.255.255.128 = 128 Adressen (126 nutzbar)
- /26 = 255.255.255.192 = 64 Adressen (62 nutzbar)
- /27 = 255.255.255.224 = 32 Adressen (30 nutzbar)

**Beispiel: 192.168.1.0/24 in 4 Subnetze teilen:**
1. /24 → /26 (2 zusätzliche Bits = 4 Subnetze)
2. Subnetz 1: 192.168.1.0/26 (Hosts: .1-.62)
3. Subnetz 2: 192.168.1.64/26 (Hosts: .65-.126)
4. Subnetz 3: 192.168.1.128/26 (Hosts: .129-.190)
5. Subnetz 4: 192.168.1.192/26 (Hosts: .193-.254)

**Reservierte Adressen pro Subnetz:**
- Netzwerk-Adresse (erste IP)
- Broadcast-Adresse (letzte IP)`,
      keywords: ['Subnetting', 'CIDR', 'Netzmaske', 'Host-Bits']
    },
    initialTopology: {
      devices: [
        {
          id: 'router1',
          type: 'router',
          name: 'Core-Router',
          x: 300,
          y: 50,
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
          y: 200,
          config: { macAddress: 'SW:IT:CH:00:00:01' }
        },
        {
          id: 'switch2',
          type: 'switch',
          name: 'Abteilung-B',
          x: 500,
          y: 200,
          config: { macAddress: 'SW:IT:CH:00:00:02' }
        },
        {
          id: 'pc1',
          type: 'pc',
          name: 'PC-A1',
          x: 50,
          y: 350,
          config: { macAddress: 'AA:BB:CC:DD:EE:01' }
        },
        {
          id: 'pc2',
          type: 'pc',
          name: 'PC-B1',
          x: 550,
          y: 350,
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
        id: 'connect-router-switch1',
        description: 'Schritt 1a: Verbinde den Router mit Abteilung-A Switch',
        type: 'connect-devices',
        target: { sourceDevice: 'router1', targetDevice: 'switch1' },
        completed: false
      },
      {
        id: 'connect-router-switch2',
        description: 'Schritt 1b: Verbinde den Router mit Abteilung-B Switch',
        type: 'connect-devices',
        target: { sourceDevice: 'router1', targetDevice: 'switch2' },
        completed: false
      },
      {
        id: 'subnet-a',
        description: 'Schritt 2: Konfiguriere PC-A1 im Subnetz 192.168.1.0/26 (IP: 192.168.1.10)',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc1',
          requiredIP: '192.168.1.10',
          requiredMask: '255.255.255.192',
          requiredGateway: '192.168.1.1'
        },
        completed: false
      },
      {
        id: 'subnet-b',
        description: 'Schritt 3: Konfiguriere PC-B1 im Subnetz 192.168.1.64/26 (IP: 192.168.1.70)',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc2',
          requiredIP: '192.168.1.70',
          requiredMask: '255.255.255.192',
          requiredGateway: '192.168.1.65'
        },
        completed: false
      },
      {
        id: 'ping-subnets',
        description: 'Schritt 4: Teste die Verbindung zwischen den Subnetzen',
        type: 'ping',
        target: { sourceDevice: 'pc1', targetDevice: 'pc2' },
        completed: false
      }
    ],
    hints: [
      '💡 /26 = 255.255.255.192 (64 Adressen pro Subnetz)',
      '💡 Subnetz 1: .0-.63, Subnetz 2: .64-.127',
      '💡 Gateway für Subnetz 1: .1, Gateway für Subnetz 2: .65'
    ],
    timeLimit: 900
  },
  {
    id: 'challenge-1',
    title: 'Prüfungsaufgabe: Firmennetzwerk',
    description: 'IHK-Prüfungsähnliche Aufgabe: Konfiguriere ein komplettes Firmennetzwerk mit 3 Abteilungen.',
    difficulty: 'schwer',
    points: 300,
    category: 'Prüfung',
    theory: {
      title: 'Prüfungshinweise',
      content: `**Typische IHK-Prüfungsaufgaben:**

1. **Netzwerkplanung**
   - Anzahl benötigter Hosts pro Subnetz berechnen
   - Passende Subnetzmaske wählen
   - IP-Adressbereiche zuweisen

2. **Wichtige Punkte:**
   - Erste und letzte Adresse sind reserviert
   - Gateway = Router-IP im jeweiligen Subnetz
   - Bei /24 → 254 nutzbare Hosts
   - Bei /25 → 126 nutzbare Hosts
   - Bei /26 → 62 nutzbare Hosts

3. **Typische Fehler vermeiden:**
   - Falsche Subnetzmaske
   - Gateway in falschem Subnetz
   - Doppelte IP-Adressen`,
      keywords: ['IHK-Prüfung', 'Netzwerkplanung', 'Fehleranalyse']
    },
    initialTopology: {
      devices: [
        {
          id: 'router1',
          type: 'router',
          name: 'Hauptrouter',
          x: 300,
          y: 50,
          config: { 
            macAddress: 'RO:UT:ER:00:00:01',
            routingTable: []
          }
        },
        {
          id: 'switch1',
          type: 'switch',
          name: 'Buchhaltung',
          x: 80,
          y: 180,
          config: { macAddress: 'SW:IT:CH:00:00:01' }
        },
        {
          id: 'switch2',
          type: 'switch',
          name: 'Entwicklung',
          x: 300,
          y: 180,
          config: { macAddress: 'SW:IT:CH:00:00:02' }
        },
        {
          id: 'switch3',
          type: 'switch',
          name: 'Vertrieb',
          x: 520,
          y: 180,
          config: { macAddress: 'SW:IT:CH:00:00:03' }
        },
        {
          id: 'pc1',
          type: 'pc',
          name: 'Buchhaltung-PC',
          x: 30,
          y: 320,
          config: { macAddress: 'AA:BB:CC:DD:EE:01' }
        },
        {
          id: 'pc2',
          type: 'pc',
          name: 'Entwickler-PC',
          x: 250,
          y: 320,
          config: { macAddress: 'AA:BB:CC:DD:EE:02' }
        },
        {
          id: 'pc3',
          type: 'pc',
          name: 'Vertrieb-PC',
          x: 470,
          y: 320,
          config: { macAddress: 'AA:BB:CC:DD:EE:03' }
        },
        {
          id: 'server1',
          type: 'server',
          name: 'Datei-Server',
          x: 570,
          y: 320,
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
        id: 'connect-all',
        description: 'Alle Switches mit dem Router verbinden',
        type: 'connect-devices',
        target: { sourceDevice: 'router1' },
        completed: false
      },
      {
        id: 'config-buchhaltung',
        description: 'Buchhaltung-PC: 172.16.10.10/24, Gateway: 172.16.10.1',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc1',
          requiredIP: '172.16.10.10',
          requiredMask: '255.255.255.0',
          requiredGateway: '172.16.10.1'
        },
        completed: false
      },
      {
        id: 'config-entwicklung',
        description: 'Entwickler-PC: 172.16.20.10/24, Gateway: 172.16.20.1',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc2',
          requiredIP: '172.16.20.10',
          requiredMask: '255.255.255.0',
          requiredGateway: '172.16.20.1'
        },
        completed: false
      },
      {
        id: 'config-vertrieb',
        description: 'Vertrieb-PC: 172.16.30.10/24, Gateway: 172.16.30.1',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'pc3',
          requiredIP: '172.16.30.10',
          requiredMask: '255.255.255.0',
          requiredGateway: '172.16.30.1'
        },
        completed: false
      },
      {
        id: 'config-server',
        description: 'Server: 172.16.30.100/24, Gateway: 172.16.30.1',
        type: 'configure-ip',
        target: { 
          sourceDevice: 'server1',
          requiredIP: '172.16.30.100',
          requiredMask: '255.255.255.0',
          requiredGateway: '172.16.30.1'
        },
        completed: false
      },
      {
        id: 'ping-server',
        description: 'Teste: Ping vom Buchhaltung-PC zum Server',
        type: 'ping',
        target: { sourceDevice: 'pc1', targetDevice: 'server1' },
        completed: false
      }
    ],
    hints: [
      '💡 3 Abteilungen = 3 verschiedene Subnetze (172.16.10.x, 172.16.20.x, 172.16.30.x)',
      '💡 Der Router benötigt in jedem Subnetz die .1 Adresse als Gateway',
      '💡 Server und Vertrieb-PC sind im gleichen Subnetz'
    ],
    timeLimit: 1200
  }
];

// Helper functions
export function getScenarioById(id: string): NetworkScenario | undefined {
  return networkScenarios.find(s => s.id === id);
}

export function getScenariosByDifficulty(difficulty: 'leicht' | 'mittel' | 'schwer'): NetworkScenario[] {
  return networkScenarios.filter(s => s.difficulty === difficulty);
}

export function getScenariosByCategory(category: string): NetworkScenario[] {
  return networkScenarios.filter(s => s.category === category);
}

export function getLessons(): NetworkScenario[] {
  return networkScenarios.filter(s => s.id.startsWith('lesson-'));
}

export function getChallenges(): NetworkScenario[] {
  return networkScenarios.filter(s => s.id.startsWith('challenge-'));
}
