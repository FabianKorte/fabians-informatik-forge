// Network Simulator Types

export type DeviceType = 'router' | 'switch' | 'pc' | 'server';

export interface NetworkDevice {
  id: string;
  type: DeviceType;
  name: string;
  x: number;
  y: number;
  config: DeviceConfig;
}

export interface DeviceConfig {
  ipAddress?: string;
  subnetMask?: string;
  gateway?: string;
  routingTable?: RoutingEntry[];
  macAddress?: string;
}

export interface RoutingEntry {
  network: string;
  mask: string;
  nextHop: string;
  interface: string;
}

export interface NetworkConnection {
  id: string;
  sourceId: string;
  targetId: string;
  sourcePort?: number;
  targetPort?: number;
}

export interface NetworkTopology {
  devices: NetworkDevice[];
  connections: NetworkConnection[];
}

export interface PacketInfo {
  id: string;
  sourceId: string;
  targetId: string;
  sourceIP: string;
  targetIP: string;
  currentPath: string[];
  currentHop?: { from: string; to: string }; // Current hop for animation
  status: 'traveling' | 'delivered' | 'dropped' | 'timeout';
  ttl: number;
}

export interface ScenarioTheory {
  title: string;
  content: string;
  keywords: string[];
}

export interface NetworkScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'leicht' | 'mittel' | 'schwer';
  points: number;
  category?: string;
  theory?: ScenarioTheory;
  initialTopology: NetworkTopology;
  objectives: ScenarioObjective[];
  hints: string[];
  timeLimit?: number; // in seconds
}

export interface ScenarioObjective {
  id: string;
  description: string;
  type: 'ping' | 'configure-ip' | 'configure-routing' | 'connect-devices';
  target: {
    sourceDevice?: string;
    targetDevice?: string;
    requiredIP?: string;
    requiredMask?: string;
    requiredGateway?: string;
    requiredRoute?: RoutingEntry;
  };
  completed: boolean;
}

export interface SimulatorState {
  topology: NetworkTopology;
  selectedDevice: string | null;
  packets: PacketInfo[];
  isSimulating: boolean;
  currentScenario: NetworkScenario | null;
  completedObjectives: string[];
  earnedPoints: number;
}

// Validation helpers
export function isValidIPv4(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  return parts.every(part => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
  });
}

export function isValidSubnetMask(mask: string): boolean {
  const parts = mask.split('.');
  if (parts.length !== 4) return false;
  
  const binary = parts.map(p => parseInt(p, 10).toString(2).padStart(8, '0')).join('');
  const firstZero = binary.indexOf('0');
  if (firstZero === -1) return true;
  return !binary.slice(firstZero).includes('1');
}

export function getNetworkAddress(ip: string, mask: string): string {
  const ipParts = ip.split('.').map(p => parseInt(p, 10));
  const maskParts = mask.split('.').map(p => parseInt(p, 10));
  return ipParts.map((p, i) => p & maskParts[i]).join('.');
}

export function areInSameNetwork(ip1: string, ip2: string, mask: string): boolean {
  return getNetworkAddress(ip1, mask) === getNetworkAddress(ip2, mask);
}

export function generateMacAddress(): string {
  const hexDigits = '0123456789ABCDEF';
  let mac = '';
  for (let i = 0; i < 6; i++) {
    if (i > 0) mac += ':';
    mac += hexDigits[Math.floor(Math.random() * 16)];
    mac += hexDigits[Math.floor(Math.random() * 16)];
  }
  return mac;
}
