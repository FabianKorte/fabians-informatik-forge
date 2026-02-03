import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Cpu, HardDrive, MemoryStick, MonitorPlay, Plug, Box, Fan, CircuitBoard } from 'lucide-react';
import type { ComponentCategory, HardwareComponent } from '@/types/hardwarePuzzle';
import { categoryLabels } from '@/types/hardwarePuzzle';

interface PCCaseVisualizerProps {
  slots: Record<ComponentCategory, HardwareComponent | null>;
  onRemoveComponent: (category: ComponentCategory) => void;
  totalPower: number;
}

const slotConfig: { category: ComponentCategory; icon: React.ElementType; position: string }[] = [
  { category: 'cpu', icon: Cpu, position: 'top-8 left-1/2 -translate-x-1/2' },
  { category: 'cooler', icon: Fan, position: 'top-20 left-1/2 -translate-x-1/2' },
  { category: 'motherboard', icon: CircuitBoard, position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' },
  { category: 'ram', icon: MemoryStick, position: 'top-1/3 right-4' },
  { category: 'gpu', icon: MonitorPlay, position: 'bottom-1/3 left-1/2 -translate-x-1/2' },
  { category: 'storage', icon: HardDrive, position: 'bottom-8 right-4' },
  { category: 'psu', icon: Plug, position: 'bottom-4 left-4' },
  { category: 'case', icon: Box, position: 'top-4 left-4' },
];

export const PCCaseVisualizer = ({ slots, onRemoveComponent, totalPower }: PCCaseVisualizerProps) => {
  const requiredSlots: ComponentCategory[] = ['cpu', 'motherboard', 'ram', 'psu', 'storage', 'case'];
  const optionalSlots: ComponentCategory[] = ['gpu', 'cooler'];
  
  const allSlots = [...requiredSlots, ...optionalSlots];
  
  const filledRequired = requiredSlots.filter(s => slots[s] !== null).length;
  const totalRequired = requiredSlots.length;

  return (
    <Card className="h-full">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">PC-Zusammenbau</h3>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono">
              ⚡ {totalPower}W
            </Badge>
            <Badge variant={filledRequired === totalRequired ? 'default' : 'secondary'}>
              {filledRequired}/{totalRequired} Pflicht
            </Badge>
          </div>
        </div>
        
        {/* Visual PC Case representation */}
        <div className="relative bg-gradient-to-b from-muted/50 to-muted rounded-xl border-2 border-dashed border-border min-h-[400px] p-4">
          {/* Case frame */}
          <div className="absolute inset-2 border-2 border-muted-foreground/20 rounded-lg">
            {/* PC internals grid */}
            <div className="grid grid-cols-2 gap-2 p-3 h-full">
              {allSlots.map((category) => {
                const component = slots[category];
                const isRequired = requiredSlots.includes(category);
                const Icon = slotConfig.find(s => s.category === category)?.icon || Box;
                
                return (
                  <div
                    key={category}
                    className={`relative rounded-lg border-2 transition-all ${
                      component 
                        ? 'bg-primary/10 border-primary/50' 
                        : isRequired 
                          ? 'bg-muted/50 border-dashed border-yellow-500/30' 
                          : 'bg-muted/30 border-dashed border-muted-foreground/20'
                    }`}
                  >
                    <div className="p-2 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <Icon className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground truncate">
                            {categoryLabels[category].split(' ')[0]}
                          </span>
                        </div>
                        {!isRequired && (
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            Optional
                          </Badge>
                        )}
                      </div>
                      
                      {component ? (
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-xs font-medium truncate">
                              {component.name}
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate">
                              {component.specs[0]}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-5 w-full text-xs text-destructive hover:text-destructive hover:bg-destructive/10 mt-1"
                            onClick={() => onRemoveComponent(category)}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Entfernen
                          </Button>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            {isRequired ? 'Benötigt' : 'Leer'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
