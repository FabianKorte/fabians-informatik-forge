import { cn } from "@/lib/utils";
import type { DraggableItem } from "@/types/osiModel";
import { Cpu, Globe, HardDrive, Lightbulb } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DraggableItemsPanelProps {
  items: DraggableItem[];
  placements: Record<string, number | null>;
  onRemove: (itemId: string) => void;
  disabled?: boolean;
}

const getTypeIcon = (type: DraggableItem["type"]) => {
  switch (type) {
    case "protocol": return <Globe className="w-3 h-3" />;
    case "hardware": return <HardDrive className="w-3 h-3" />;
    case "concept": return <Lightbulb className="w-3 h-3" />;
    default: return <Cpu className="w-3 h-3" />;
  }
};

const getTypeColor = (type: DraggableItem["type"]) => {
  switch (type) {
    case "protocol": return "bg-blue-500/20 border-blue-500 hover:bg-blue-500/30";
    case "hardware": return "bg-orange-500/20 border-orange-500 hover:bg-orange-500/30";
    case "concept": return "bg-purple-500/20 border-purple-500 hover:bg-purple-500/30";
    default: return "bg-muted border-border";
  }
};

export function DraggableItemsPanel({ items, placements, onRemove, disabled = false }: DraggableItemsPanelProps) {
  // Filter items that are not yet placed
  const unplacedItems = items.filter(item => placements[item.id] === null || placements[item.id] === undefined);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    if (disabled) return;
    e.dataTransfer.setData("text/plain", itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId) {
      onRemove(itemId);
    }
  };

  return (
    <div 
      className="p-4 bg-card rounded-lg border"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3 className="text-lg font-semibold mb-4">Verfügbare Elemente</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Ziehe die Elemente auf die richtige OSI-Schicht. Zum Entfernen zurück hierher ziehen.
      </p>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-blue-500" /> Protokolle</span>
          <span className="flex items-center gap-1"><HardDrive className="w-3 h-3 text-orange-500" /> Hardware</span>
          <span className="flex items-center gap-1"><Lightbulb className="w-3 h-3 text-purple-500" /> Konzepte</span>
        </div>
        
        <div className="flex flex-wrap gap-2 min-h-[100px] p-3 bg-muted/50 rounded-lg border-2 border-dashed">
          {unplacedItems.length === 0 ? (
            <p className="text-sm text-muted-foreground italic w-full text-center py-4">
              Alle Elemente wurden platziert! ✓
            </p>
          ) : (
            unplacedItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <div
                    draggable={!disabled}
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    className={cn(
                      "px-3 py-2 rounded-lg border cursor-grab active:cursor-grabbing",
                      "flex items-center gap-2 transition-all",
                      getTypeColor(item.type),
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {getTypeIcon(item.type)}
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                </TooltipTrigger>
                {item.hint && (
                  <TooltipContent>
                    <p className="text-sm">{item.hint}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
