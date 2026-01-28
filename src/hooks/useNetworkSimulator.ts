import { useState, useCallback, useEffect } from 'react';
import { 
  NetworkDevice, 
  NetworkConnection, 
  NetworkTopology, 
  PacketInfo,
  NetworkScenario,
  SimulatorState,
  DeviceConfig,
  areInSameNetwork,
  generateMacAddress,
  isValidIPv4
} from '@/types/networkSimulator';
import { useAuth } from '@/hooks/useAuth';
import { useGamification } from '@/hooks/useGamification';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'network-simulator-progress';

export function useNetworkSimulator() {
  const { user } = useAuth();
  const { addXP } = useGamification();
  
  const [state, setState] = useState<SimulatorState>({
    topology: { devices: [], connections: [] },
    selectedDevice: null,
    packets: [],
    isSimulating: false,
    currentScenario: null,
    completedObjectives: [],
    earnedPoints: 0
  });

  // Load local progress for guests
  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setState(prev => ({
            ...prev,
            earnedPoints: parsed.earnedPoints || 0
          }));
        } catch (e) {
          console.error('Failed to load simulator progress', e);
        }
      }
    }
  }, [user]);

  // Save local progress for guests
  useEffect(() => {
    if (!user && state.earnedPoints > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        earnedPoints: state.earnedPoints
      }));
    }
  }, [user, state.earnedPoints]);

  const addDevice = useCallback((type: NetworkDevice['type'], x: number, y: number) => {
    const id = `${type}-${Date.now()}`;
    const names: Record<string, string> = {
      router: 'Router',
      switch: 'Switch',
      pc: 'PC',
      server: 'Server'
    };
    
    const newDevice: NetworkDevice = {
      id,
      type,
      name: `${names[type]}-${Math.floor(Math.random() * 100)}`,
      x,
      y,
      config: {
        macAddress: generateMacAddress(),
        routingTable: type === 'router' ? [] : undefined
      }
    };

    setState(prev => ({
      ...prev,
      topology: {
        ...prev.topology,
        devices: [...prev.topology.devices, newDevice]
      }
    }));

    return id;
  }, []);

  const removeDevice = useCallback((deviceId: string) => {
    setState(prev => ({
      ...prev,
      topology: {
        devices: prev.topology.devices.filter(d => d.id !== deviceId),
        connections: prev.topology.connections.filter(
          c => c.sourceId !== deviceId && c.targetId !== deviceId
        )
      },
      selectedDevice: prev.selectedDevice === deviceId ? null : prev.selectedDevice
    }));
  }, []);

  const updateDevicePosition = useCallback((deviceId: string, x: number, y: number) => {
    setState(prev => ({
      ...prev,
      topology: {
        ...prev.topology,
        devices: prev.topology.devices.map(d =>
          d.id === deviceId ? { ...d, x, y } : d
        )
      }
    }));
  }, []);

  const updateDeviceConfig = useCallback((deviceId: string, config: Partial<DeviceConfig>) => {
    setState(prev => ({
      ...prev,
      topology: {
        ...prev.topology,
        devices: prev.topology.devices.map(d =>
          d.id === deviceId ? { ...d, config: { ...d.config, ...config } } : d
        )
      }
    }));
  }, []);

  const updateDeviceName = useCallback((deviceId: string, name: string) => {
    setState(prev => ({
      ...prev,
      topology: {
        ...prev.topology,
        devices: prev.topology.devices.map(d =>
          d.id === deviceId ? { ...d, name } : d
        )
      }
    }));
  }, []);

  const selectDevice = useCallback((deviceId: string | null) => {
    setState(prev => ({ ...prev, selectedDevice: deviceId }));
  }, []);

  const addConnection = useCallback((sourceId: string, targetId: string) => {
    // Check if connection already exists
    const exists = state.topology.connections.some(
      c => (c.sourceId === sourceId && c.targetId === targetId) ||
           (c.sourceId === targetId && c.targetId === sourceId)
    );

    if (exists) {
      toast({
        title: "Verbindung existiert bereits",
        description: "Diese Geräte sind bereits verbunden.",
        variant: "destructive"
      });
      return;
    }

    const newConnection: NetworkConnection = {
      id: `conn-${Date.now()}`,
      sourceId,
      targetId
    };

    setState(prev => ({
      ...prev,
      topology: {
        ...prev.topology,
        connections: [...prev.topology.connections, newConnection]
      }
    }));

    checkObjectives();
  }, [state.topology.connections]);

  const removeConnection = useCallback((connectionId: string) => {
    setState(prev => ({
      ...prev,
      topology: {
        ...prev.topology,
        connections: prev.topology.connections.filter(c => c.id !== connectionId)
      }
    }));
  }, []);

  const loadScenario = useCallback((scenario: NetworkScenario) => {
    setState(prev => ({
      ...prev,
      topology: JSON.parse(JSON.stringify(scenario.initialTopology)),
      currentScenario: scenario,
      completedObjectives: [],
      packets: [],
      selectedDevice: null,
      isSimulating: false
    }));
  }, []);

  const resetTopology = useCallback(() => {
    if (state.currentScenario) {
      loadScenario(state.currentScenario);
    } else {
      setState(prev => ({
        ...prev,
        topology: { devices: [], connections: [] },
        packets: [],
        selectedDevice: null
      }));
    }
  }, [state.currentScenario, loadScenario]);

  const findPath = useCallback((sourceId: string, targetId: string): string[] | null => {
    const { devices, connections } = state.topology;
    const visited = new Set<string>();
    const queue: { id: string; path: string[] }[] = [{ id: sourceId, path: [sourceId] }];

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.id === targetId) {
        return current.path;
      }

      if (visited.has(current.id)) continue;
      visited.add(current.id);

      // Find all connected devices
      const connectedIds = connections
        .filter(c => c.sourceId === current.id || c.targetId === current.id)
        .map(c => c.sourceId === current.id ? c.targetId : c.sourceId)
        .filter(id => !visited.has(id));

      for (const nextId of connectedIds) {
        queue.push({ id: nextId, path: [...current.path, nextId] });
      }
    }

    return null;
  }, [state.topology]);

  const simulatePing = useCallback(async (sourceId: string, targetId: string): Promise<boolean> => {
    const sourceDevice = state.topology.devices.find(d => d.id === sourceId);
    const targetDevice = state.topology.devices.find(d => d.id === targetId);

    if (!sourceDevice || !targetDevice) {
      toast({
        title: "Fehler",
        description: "Quelle oder Ziel nicht gefunden.",
        variant: "destructive"
      });
      return false;
    }

    // Check if both have IP addresses
    if (!sourceDevice.config.ipAddress || !targetDevice.config.ipAddress) {
      toast({
        title: "Ping fehlgeschlagen",
        description: "Beide Geräte müssen eine IP-Adresse haben.",
        variant: "destructive"
      });
      return false;
    }

    // Find path
    const path = findPath(sourceId, targetId);
    if (!path) {
      toast({
        title: "Ping fehlgeschlagen",
        description: "Kein physischer Pfad zwischen den Geräten. Verbinde die Geräte zuerst!",
        variant: "destructive"
      });
      return false;
    }

    // Check if in same network or routing is configured
    const sourceIP = sourceDevice.config.ipAddress;
    const targetIP = targetDevice.config.ipAddress;
    const sourceMask = sourceDevice.config.subnetMask || '255.255.255.0';

    const sameNetwork = areInSameNetwork(sourceIP, targetIP, sourceMask);

    if (!sameNetwork) {
      // Need gateway for cross-network communication
      if (!sourceDevice.config.gateway) {
        toast({
          title: "Ping fehlgeschlagen",
          description: `Ziel ${targetIP} ist nicht im selben Netzwerk. Konfiguriere ein Gateway auf ${sourceDevice.name}!`,
          variant: "destructive"
        });
        return false;
      }
      
      // Check if there's a router in the path
      const hasRouter = path.some(deviceId => {
        const device = state.topology.devices.find(d => d.id === deviceId);
        return device?.type === 'router';
      });
      
      if (!hasRouter) {
        toast({
          title: "Ping fehlgeschlagen",
          description: "Kein Router im Pfad gefunden. Für netzwerkübergreifende Kommunikation wird ein Router benötigt.",
          variant: "destructive"
        });
        return false;
      }
    }

    // Create packet animation
    const packetId = `packet-${Date.now()}`;
    const packet: PacketInfo = {
      id: packetId,
      sourceId,
      targetId,
      sourceIP,
      targetIP,
      currentPath: path,
      status: 'traveling',
      ttl: 64
    };

    setState(prev => ({
      ...prev,
      isSimulating: true,
      packets: [...prev.packets, packet]
    }));

    // Animate packet
    await new Promise(resolve => setTimeout(resolve, path.length * 300));

    setState(prev => ({
      ...prev,
      isSimulating: false,
      packets: prev.packets.map(p =>
        p.id === packetId ? { ...p, status: 'delivered' as const } : p
      )
    }));

    toast({
      title: "Ping erfolgreich! ✓",
      description: `Reply von ${targetIP}: Zeit=${path.length * 10}ms TTL=64`
    });

    // Mark ping objectives as complete
    if (state.currentScenario) {
      const pingObjective = state.currentScenario.objectives.find(
        obj => obj.type === 'ping' && 
               obj.target.sourceDevice === sourceId && 
               obj.target.targetDevice === targetId
      );
      
      if (pingObjective && !state.completedObjectives.includes(pingObjective.id)) {
        setState(prev => ({
          ...prev,
          completedObjectives: [...prev.completedObjectives, pingObjective.id]
        }));
      }
    }

    return true;
  }, [state.topology, state.currentScenario, state.completedObjectives, findPath]);

  const checkObjectives = useCallback(() => {
    if (!state.currentScenario) return;

    const newCompletedIds: string[] = [...state.completedObjectives];
    
    for (const objective of state.currentScenario.objectives) {
      // Skip if already completed
      if (newCompletedIds.includes(objective.id)) {
        continue;
      }

      let completed = false;

      switch (objective.type) {
        case 'connect-devices':
          if (objective.target.sourceDevice && objective.target.targetDevice) {
            // Check specific connection
            completed = state.topology.connections.some(
              c => (c.sourceId === objective.target.sourceDevice && c.targetId === objective.target.targetDevice) ||
                   (c.sourceId === objective.target.targetDevice && c.targetId === objective.target.sourceDevice)
            );
          } else if (objective.target.sourceDevice) {
            // Check if source device has ANY connection
            completed = state.topology.connections.some(
              c => c.sourceId === objective.target.sourceDevice || c.targetId === objective.target.sourceDevice
            );
          }
          break;

        case 'configure-ip':
          if (objective.target.sourceDevice) {
            const device = state.topology.devices.find(d => d.id === objective.target.sourceDevice);
            if (device && device.config.ipAddress) {
              const ipMatch = !objective.target.requiredIP || device.config.ipAddress === objective.target.requiredIP;
              const maskMatch = !objective.target.requiredMask || device.config.subnetMask === objective.target.requiredMask;
              const gwMatch = !objective.target.requiredGateway || device.config.gateway === objective.target.requiredGateway;
              completed = ipMatch && maskMatch && gwMatch;
            }
          }
          break;

        case 'ping':
          // Ping objectives are completed when a successful ping happens
          // This is tracked separately in simulatePing
          break;
      }

      if (completed && !newCompletedIds.includes(objective.id)) {
        newCompletedIds.push(objective.id);
      }
    }

    // Only update state if something changed
    if (newCompletedIds.length !== state.completedObjectives.length) {
      setState(prev => ({
        ...prev,
        completedObjectives: newCompletedIds
      }));
    }
  }, [state.currentScenario, state.topology, state.completedObjectives]);

  const completeScenario = useCallback(async () => {
    if (!state.currentScenario) return;

    const points = state.currentScenario.points;
    
    if (user) {
      // Award XP for logged-in users
      addXP({ xp: points, reason: `Netzwerk-Szenario: ${state.currentScenario.title}` });
    }

    setState(prev => ({
      ...prev,
      earnedPoints: prev.earnedPoints + points
    }));

    toast({
      title: "Szenario abgeschlossen! 🎉",
      description: `Du hast ${points} Punkte verdient!`
    });
  }, [state.currentScenario, user, addXP]);

  return {
    state,
    addDevice,
    removeDevice,
    updateDevicePosition,
    updateDeviceConfig,
    updateDeviceName,
    selectDevice,
    addConnection,
    removeConnection,
    loadScenario,
    resetTopology,
    simulatePing,
    checkObjectives,
    completeScenario,
    findPath
  };
}
