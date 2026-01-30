import React, { useState, useCallback } from 'react';
import { useNetworkSimulator } from '@/hooks/useNetworkSimulator';
import { networkScenarios } from '@/data/networkScenarios';
import { NetworkCanvas } from './NetworkCanvas';
import { DeviceConfigDialog } from './DeviceConfigDialog';
import { DraggableDevicePalette } from './NetworkDeviceIcon';
import { ScenarioSelector, ScenarioPanel } from './ScenarioPanel';
import { DeviceType, NetworkDevice } from '@/types/networkSimulator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  RotateCcw, 
  Link, 
  Unlink, 
  Trash2, 
  Trophy,
  Network,
  Info
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const NetworkSimulator: React.FC = () => {
  const { user } = useAuth();
  const {
    state,
    completedScenarioIds,
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
    completeScenario
  } = useNetworkSimulator();

  const [configDevice, setConfigDevice] = useState<NetworkDevice | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [pingSource, setPingSource] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('sandbox');

  const handleDeviceDrop = useCallback((type: DeviceType, x: number, y: number) => {
    addDevice(type, x, y);
  }, [addDevice]);

  const handleDeviceClick = useCallback((deviceId: string) => {
    if (connectingFrom) {
      if (connectingFrom !== deviceId) {
        addConnection(connectingFrom, deviceId);
      }
      setConnectingFrom(null);
    } else if (pingSource) {
      if (pingSource !== deviceId) {
        simulatePing(pingSource, deviceId);
      }
      setPingSource(null);
    } else {
      selectDevice(deviceId);
    }
  }, [connectingFrom, pingSource, addConnection, selectDevice, simulatePing]);

  const handleDeviceDoubleClick = useCallback((deviceId: string) => {
    const device = state.topology.devices.find(d => d.id === deviceId);
    if (device) {
      setConfigDevice(device);
    }
  }, [state.topology.devices]);

  const handleSaveConfig = useCallback((deviceId: string, config: Parameters<typeof updateDeviceConfig>[1], name?: string) => {
    updateDeviceConfig(deviceId, config);
    if (name) {
      updateDeviceName(deviceId, name);
    }
  }, [updateDeviceConfig, updateDeviceName]);

  const handleStartConnect = () => {
    if (state.selectedDevice) {
      setConnectingFrom(state.selectedDevice);
      toast({
        title: "Verbindungsmodus",
        description: "Klicke auf ein anderes Gerät, um eine Verbindung herzustellen."
      });
    } else {
      toast({
        title: "Kein Gerät ausgewählt",
        description: "Wähle zuerst ein Gerät aus.",
        variant: "destructive"
      });
    }
  };

  const handleStartPing = () => {
    if (state.selectedDevice) {
      const device = state.topology.devices.find(d => d.id === state.selectedDevice);
      if (!device?.config.ipAddress) {
        toast({
          title: "Keine IP-Adresse",
          description: "Das Quellgerät benötigt eine IP-Adresse.",
          variant: "destructive"
        });
        return;
      }
      setPingSource(state.selectedDevice);
      toast({
        title: "Ping-Modus",
        description: "Klicke auf das Zielgerät für den Ping."
      });
    } else {
      toast({
        title: "Kein Gerät ausgewählt",
        description: "Wähle zuerst ein Quellgerät aus.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSelected = () => {
    if (state.selectedDevice) {
      setDeviceToDelete(state.selectedDevice);
      setShowDeleteDialog(true);
    }
  };

  const confirmDelete = () => {
    if (deviceToDelete) {
      removeDevice(deviceToDelete);
      setDeviceToDelete(null);
    }
    setShowDeleteDialog(false);
  };

  const selectedDevice = state.topology.devices.find(d => d.id === state.selectedDevice);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Netzwerk-Simulator</h1>
            <p className="text-sm text-muted-foreground">
              Interaktive Netzwerk-Topologien erstellen und testen
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Trophy className="w-3 h-3 text-yellow-500" />
            {state.earnedPoints} Punkte
            {!user && <span className="text-xs">(lokal)</span>}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sandbox">Freier Modus</TabsTrigger>
          <TabsTrigger value="scenarios">Szenarien</TabsTrigger>
          {state.currentScenario && (
            <TabsTrigger value="active">
              Aktives Szenario
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="sandbox" className="space-y-4 mt-4">
          {/* Device Palette */}
          <DraggableDevicePalette onDragStart={() => {}} />

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartConnect}
              disabled={!state.selectedDevice || !!connectingFrom}
            >
              <Link className="w-4 h-4 mr-2" />
              Verbinden
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartPing}
              disabled={!state.selectedDevice || !!pingSource}
            >
              <Play className="w-4 h-4 mr-2" />
              Ping
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={!state.selectedDevice}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Löschen
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetTopology}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Zurücksetzen
            </Button>
            {(connectingFrom || pingSource) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setConnectingFrom(null);
                  setPingSource(null);
                }}
              >
                <Unlink className="w-4 h-4 mr-2" />
                Abbrechen
              </Button>
            )}
          </div>

          {/* Canvas */}
          <NetworkCanvas
            devices={state.topology.devices}
            connections={state.topology.connections}
            packets={state.packets}
            selectedDevice={state.selectedDevice}
            connectingFrom={connectingFrom}
            onDeviceClick={handleDeviceClick}
            onDeviceDoubleClick={handleDeviceDoubleClick}
            onDeviceDrop={handleDeviceDrop}
            onDeviceMove={updateDevicePosition}
            onConnectionClick={removeConnection}
          />

          {/* Selected Device Info */}
          {selectedDevice && (
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Ausgewählt: {selectedDevice.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Typ:</span>
                    <span className="ml-2 font-medium capitalize">{selectedDevice.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">IP:</span>
                    <span className="ml-2 font-mono">{selectedDevice.config.ipAddress || '-'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Maske:</span>
                    <span className="ml-2 font-mono">{selectedDevice.config.subnetMask || '-'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gateway:</span>
                    <span className="ml-2 font-mono">{selectedDevice.config.gateway || '-'}</span>
                  </div>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="px-0 mt-2"
                  onClick={() => setConfigDevice(selectedDevice)}
                >
                  Konfiguration bearbeiten →
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="scenarios" className="mt-4">
          <ScenarioSelector
            scenarios={networkScenarios}
            completedScenarioIds={completedScenarioIds}
            onSelect={(scenario) => {
              loadScenario(scenario);
              setActiveTab('active');
            }}
          />
        </TabsContent>

        {state.currentScenario && (
          <TabsContent value="active" className="space-y-4 mt-4">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Device Palette */}
                <DraggableDevicePalette onDragStart={() => {}} />

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStartConnect}
                    disabled={!state.selectedDevice || !!connectingFrom}
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Verbinden
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStartPing}
                    disabled={!state.selectedDevice || !!pingSource}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Ping
                  </Button>
                  {(connectingFrom || pingSource) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setConnectingFrom(null);
                        setPingSource(null);
                      }}
                    >
                      Abbrechen
                    </Button>
                  )}
                </div>

                {/* Canvas */}
                <NetworkCanvas
                  devices={state.topology.devices}
                  connections={state.topology.connections}
                  packets={state.packets}
                  selectedDevice={state.selectedDevice}
                  connectingFrom={connectingFrom}
                  onDeviceClick={handleDeviceClick}
                  onDeviceDoubleClick={handleDeviceDoubleClick}
                  onDeviceDrop={handleDeviceDrop}
                  onDeviceMove={updateDevicePosition}
                  onConnectionClick={removeConnection}
                />
              </div>

              {/* Scenario Panel */}
              <div>
                <Card>
                  <CardContent className="pt-6">
                    <ScenarioPanel
                      scenario={state.currentScenario}
                      completedObjectives={state.completedObjectives}
                      onReset={resetTopology}
                      onComplete={completeScenario}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Config Dialog */}
      <DeviceConfigDialog
        device={configDevice}
        open={!!configDevice}
        onClose={() => setConfigDevice(null)}
        onSave={handleSaveConfig}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Gerät löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Das Gerät und alle zugehörigen Verbindungen werden entfernt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Löschen</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
