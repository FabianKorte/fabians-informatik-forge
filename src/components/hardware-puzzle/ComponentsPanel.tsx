import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Info } from 'lucide-react';
import type { HardwareComponent, ComponentCategory } from '@/types/hardwarePuzzle';
import { categoryLabels, categoryIcons } from '@/types/hardwarePuzzle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ComponentsPanelProps {
  availableComponents: HardwareComponent[];
  installedComponents: Record<ComponentCategory, HardwareComponent | null>;
  selectedComponent: HardwareComponent | null;
  onSelectComponent: (component: HardwareComponent | null) => void;
  onInstallComponent: (component: HardwareComponent) => void;
}

export const ComponentsPanel = ({
  availableComponents,
  installedComponents,
  selectedComponent,
  onSelectComponent,
  onInstallComponent
}: ComponentsPanelProps) => {
  // Group components by category
  const componentsByCategory = availableComponents.reduce((acc, comp) => {
    if (!acc[comp.category]) {
      acc[comp.category] = [];
    }
    acc[comp.category].push(comp);
    return acc;
  }, {} as Record<ComponentCategory, HardwareComponent[]>);

  const categories = Object.keys(componentsByCategory) as ComponentCategory[];

  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-base">Verfügbare Komponenten</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] px-4 pb-4">
          <div className="space-y-4">
            {categories.map((category) => {
              const components = componentsByCategory[category];
              const installed = installedComponents[category];
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center gap-2 sticky top-0 bg-card py-1">
                    <span className="text-lg">{categoryIcons[category]}</span>
                    <span className="text-sm font-medium">{categoryLabels[category]}</span>
                    {installed && (
                      <Badge variant="secondary" className="text-xs">
                        ✓ Verbaut
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {components.map((component) => {
                      const isInstalled = installed?.id === component.id;
                      const isSelected = selectedComponent?.id === component.id;
                      
                      return (
                        <div
                          key={component.id}
                          className={`p-3 rounded-lg border transition-all cursor-pointer ${
                            isInstalled 
                              ? 'bg-green-500/10 border-green-500/30' 
                              : isSelected 
                                ? 'bg-primary/10 border-primary/50 ring-1 ring-primary'
                                : 'bg-muted/30 hover:bg-muted/50 border-border'
                          }`}
                          onClick={() => onSelectComponent(isSelected ? null : component)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">
                                {component.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {component.specs.slice(0, 2).join(' • ')}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      size="icon" 
                                      variant="ghost" 
                                      className="h-6 w-6"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectComponent(isSelected ? null : component);
                                      }}
                                    >
                                      <Info className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left" className="max-w-xs">
                                    <div className="space-y-1">
                                      <p className="font-medium">{component.name}</p>
                                      <p className="text-xs">{component.description}</p>
                                      <div className="text-xs text-muted-foreground">
                                        {component.specs.join(' • ')}
                                      </div>
                                      {component.powerDraw && (
                                        <p className="text-xs">⚡ {component.powerDraw}W</p>
                                      )}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              {!isInstalled && (
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onInstallComponent(component);
                                  }}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
