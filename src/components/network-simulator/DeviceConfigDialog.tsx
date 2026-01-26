import React, { useState } from 'react';
import { NetworkDevice, DeviceConfig, isValidIPv4, isValidSubnetMask, RoutingEntry } from '@/types/networkSimulator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Save, Network } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DeviceConfigDialogProps {
  device: NetworkDevice | null;
  open: boolean;
  onClose: () => void;
  onSave: (deviceId: string, config: Partial<DeviceConfig>, name?: string) => void;
}

export const DeviceConfigDialog: React.FC<DeviceConfigDialogProps> = ({
  device,
  open,
  onClose,
  onSave
}) => {
  const [name, setName] = useState(device?.name || '');
  const [ipAddress, setIpAddress] = useState(device?.config.ipAddress || '');
  const [subnetMask, setSubnetMask] = useState(device?.config.subnetMask || '255.255.255.0');
  const [gateway, setGateway] = useState(device?.config.gateway || '');
  const [routingTable, setRoutingTable] = useState<RoutingEntry[]>(device?.config.routingTable || []);
  const [newRoute, setNewRoute] = useState<Partial<RoutingEntry>>({});

  React.useEffect(() => {
    if (device) {
      setName(device.name);
      setIpAddress(device.config.ipAddress || '');
      setSubnetMask(device.config.subnetMask || '255.255.255.0');
      setGateway(device.config.gateway || '');
      setRoutingTable(device.config.routingTable || []);
    }
  }, [device]);

  const handleSave = () => {
    if (!device) return;

    // Validate IP if provided
    if (ipAddress && !isValidIPv4(ipAddress)) {
      toast({
        title: "Ungültige IP-Adresse",
        description: "Bitte geben Sie eine gültige IPv4-Adresse ein.",
        variant: "destructive"
      });
      return;
    }

    if (subnetMask && !isValidSubnetMask(subnetMask)) {
      toast({
        title: "Ungültige Subnetzmaske",
        description: "Bitte geben Sie eine gültige Subnetzmaske ein.",
        variant: "destructive"
      });
      return;
    }

    if (gateway && !isValidIPv4(gateway)) {
      toast({
        title: "Ungültiges Gateway",
        description: "Bitte geben Sie eine gültige Gateway-Adresse ein.",
        variant: "destructive"
      });
      return;
    }

    const config: Partial<DeviceConfig> = {
      ipAddress: ipAddress || undefined,
      subnetMask: subnetMask || undefined,
      gateway: gateway || undefined,
      routingTable: device.type === 'router' ? routingTable : undefined
    };

    onSave(device.id, config, name !== device.name ? name : undefined);
    toast({
      title: "Konfiguration gespeichert",
      description: `${name} wurde erfolgreich konfiguriert.`
    });
    onClose();
  };

  const addRoute = () => {
    if (!newRoute.network || !newRoute.mask || !newRoute.nextHop || !newRoute.interface) {
      toast({
        title: "Unvollständige Route",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive"
      });
      return;
    }

    setRoutingTable([...routingTable, newRoute as RoutingEntry]);
    setNewRoute({});
  };

  const removeRoute = (index: number) => {
    setRoutingTable(routingTable.filter((_, i) => i !== index));
  };

  if (!device) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            {device.name} konfigurieren
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Grundkonfiguration</TabsTrigger>
            {device.type === 'router' && (
              <TabsTrigger value="routing">Routing-Tabelle</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Gerätename</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="z.B. Router-1"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ip">IP-Adresse</Label>
                <Input
                  id="ip"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="z.B. 192.168.1.1"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mask">Subnetzmaske</Label>
                <Input
                  id="mask"
                  value={subnetMask}
                  onChange={(e) => setSubnetMask(e.target.value)}
                  placeholder="z.B. 255.255.255.0"
                />
              </div>

              {(device.type === 'pc' || device.type === 'server') && (
                <div className="grid gap-2">
                  <Label htmlFor="gateway">Standard-Gateway</Label>
                  <Input
                    id="gateway"
                    value={gateway}
                    onChange={(e) => setGateway(e.target.value)}
                    placeholder="z.B. 192.168.1.1"
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label>MAC-Adresse</Label>
                <Input
                  value={device.config.macAddress || 'Nicht zugewiesen'}
                  disabled
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </TabsContent>

          {device.type === 'router' && (
            <TabsContent value="routing" className="space-y-4 mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Netzwerk</TableHead>
                      <TableHead>Maske</TableHead>
                      <TableHead>Next Hop</TableHead>
                      <TableHead>Interface</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routingTable.map((route, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{route.network}</TableCell>
                        <TableCell className="font-mono text-sm">{route.mask}</TableCell>
                        <TableCell className="font-mono text-sm">{route.nextHop}</TableCell>
                        <TableCell>{route.interface}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeRoute(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <Input
                          placeholder="0.0.0.0"
                          value={newRoute.network || ''}
                          onChange={(e) => setNewRoute({ ...newRoute, network: e.target.value })}
                          className="h-8 text-sm"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="0.0.0.0"
                          value={newRoute.mask || ''}
                          onChange={(e) => setNewRoute({ ...newRoute, mask: e.target.value })}
                          className="h-8 text-sm"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="IP"
                          value={newRoute.nextHop || ''}
                          onChange={(e) => setNewRoute({ ...newRoute, nextHop: e.target.value })}
                          className="h-8 text-sm"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="eth0"
                          value={newRoute.interface || ''}
                          onChange={(e) => setNewRoute({ ...newRoute, interface: e.target.value })}
                          className="h-8 text-sm"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={addRoute}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          )}
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
