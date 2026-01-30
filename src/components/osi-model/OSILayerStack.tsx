import { OSI_LAYERS, type DraggableItem } from "@/types/osiModel";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface OSILayerStackProps {
  placements: Record<string, number | null>;
  items: DraggableItem[];
  onDrop: (itemId: string, layerNumber: number) => void;
  feedback: Record<string, boolean>;
  showResults: boolean;
  disabled?: boolean;
}

export function OSILayerStack({
  placements,
  items,
  onDrop,
  feedback,
  showResults,
  disabled = false
}: OSILayerStackProps) {
  const handleDragOver = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, layerNumber: number) => {
    if (disabled) return;
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId) {
      onDrop(itemId, layerNumber);
    }
  };

  // Get items placed in each layer
  const getItemsInLayer = (layerNumber: number): DraggableItem[] => {
    return items.filter(item => placements[item.id] === layerNumber);
  };

  return (
    <div className="space-y-1">
      <h3 className="text-lg font-semibold mb-4 text-center">OSI-Schichten</h3>
      {OSI_LAYERS.map((layer) => {
        const itemsInLayer = getItemsInLayer(layer.number);
        
        return (
          <div
            key={layer.number}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, layer.number)}
            className={cn(
              "relative p-3 rounded-lg border-2 border-dashed transition-all min-h-[60px]",
              `bg-gradient-to-r ${layer.color} bg-opacity-10`,
              disabled 
                ? "opacity-75 cursor-not-allowed" 
                : "hover:border-primary hover:bg-opacity-20 cursor-pointer"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white text-sm">
                {layer.number}. {layer.germanName}
              </span>
              <span className="text-xs text-white/70">{layer.name}</span>
            </div>
            
            {/* Dropped items */}
            <div className="flex flex-wrap gap-1 mt-2">
              {itemsInLayer.map((item) => {
                const isCorrect = feedback[item.id];
                const showFeedback = showResults && feedback[item.id] !== undefined;
                
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium flex items-center gap-1",
                      "bg-background/90 text-foreground border",
                      showFeedback && isCorrect && "border-green-500 bg-green-500/20",
                      showFeedback && !isCorrect && "border-red-500 bg-red-500/20"
                    )}
                  >
                    {item.label}
                    {showFeedback && (
                      isCorrect 
                        ? <CheckCircle className="w-3 h-3 text-green-500" />
                        : <XCircle className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                );
              })}
            </div>
            
            {itemsInLayer.length === 0 && (
              <p className="text-xs text-white/50 italic">Ziehe Elemente hierher...</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
