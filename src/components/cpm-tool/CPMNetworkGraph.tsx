import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CPMActivity } from '@/types/cpmTool';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CPMNetworkGraphProps {
  activities: CPMActivity[];
  calculatedActivities: CPMActivity[];
  markedCritical: string[];
  showSolution: boolean;
}

interface NodePosition {
  x: number;
  y: number;
  level: number;
}

export const CPMNetworkGraph: React.FC<CPMNetworkGraphProps> = ({
  activities,
  calculatedActivities,
  markedCritical,
  showSolution
}) => {
  // Berechne Positionen für jeden Knoten
  const nodePositions = useMemo(() => {
    const positions: Record<string, NodePosition> = {};
    const levels: Record<string, number> = {};
    
    // Bestimme Level für jeden Knoten (basierend auf Vorgängern)
    const getLevel = (id: string, visited: Set<string> = new Set()): number => {
      if (levels[id] !== undefined) return levels[id];
      if (visited.has(id)) return 0; // Zirkuläre Abhängigkeit vermeiden
      
      visited.add(id);
      const activity = activities.find(a => a.id === id);
      if (!activity || activity.predecessors.length === 0) {
        levels[id] = 0;
        return 0;
      }
      
      const maxPredLevel = Math.max(
        ...activity.predecessors.map(predId => getLevel(predId, new Set(visited)))
      );
      levels[id] = maxPredLevel + 1;
      return levels[id];
    };
    
    // Berechne Level für alle
    activities.forEach(a => getLevel(a.id));
    
    // Gruppiere nach Level
    const levelGroups: Record<number, string[]> = {};
    Object.entries(levels).forEach(([id, level]) => {
      if (!levelGroups[level]) levelGroups[level] = [];
      levelGroups[level].push(id);
    });
    
    // Berechne Positionen
    const nodeWidth = 140;
    const nodeHeight = 80;
    const levelGap = 180;
    const nodeGap = 100;
    
    Object.entries(levelGroups).forEach(([levelStr, ids]) => {
      const level = parseInt(levelStr);
      const totalHeight = ids.length * nodeHeight + (ids.length - 1) * nodeGap;
      
      ids.forEach((id, index) => {
        positions[id] = {
          x: level * levelGap + 50,
          y: index * (nodeHeight + nodeGap) + 50,
          level
        };
      });
    });
    
    return positions;
  }, [activities]);

  // SVG Dimensionen berechnen
  const svgDimensions = useMemo(() => {
    const maxX = Math.max(...Object.values(nodePositions).map(p => p.x)) + 180;
    const maxY = Math.max(...Object.values(nodePositions).map(p => p.y)) + 120;
    return { width: Math.max(maxX, 600), height: Math.max(maxY, 300) };
  }, [nodePositions]);

  // Pfade zwischen Knoten zeichnen
  const connections = useMemo(() => {
    const lines: Array<{ from: string; to: string; isCritical: boolean }> = [];
    
    activities.forEach(activity => {
      activity.predecessors.forEach(predId => {
        const fromCalc = calculatedActivities.find(a => a.id === predId);
        const toCalc = calculatedActivities.find(a => a.id === activity.id);
        const isCritical = showSolution && fromCalc?.isCritical && toCalc?.isCritical;
        
        lines.push({
          from: predId,
          to: activity.id,
          isCritical: !!isCritical
        });
      });
    });
    
    return lines;
  }, [activities, calculatedActivities, showSolution]);

  return (
    <Card>
      <CardHeader className="py-3 bg-muted/50">
        <CardTitle className="text-lg">Netzplan-Diagramm</CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-x-auto">
        <svg 
          width={svgDimensions.width} 
          height={svgDimensions.height}
          className="min-w-full"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon 
                points="0 0, 10 3.5, 0 7" 
                className="fill-muted-foreground"
              />
            </marker>
            <marker
              id="arrowhead-critical"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon 
                points="0 0, 10 3.5, 0 7" 
                className="fill-destructive"
              />
            </marker>
          </defs>
          
          {/* Verbindungslinien */}
          {connections.map((conn, index) => {
            const fromPos = nodePositions[conn.from];
            const toPos = nodePositions[conn.to];
            if (!fromPos || !toPos) return null;
            
            const x1 = fromPos.x + 130;
            const y1 = fromPos.y + 35;
            const x2 = toPos.x;
            const y2 = toPos.y + 35;
            
            return (
              <line
                key={`${conn.from}-${conn.to}-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={cn(
                  "stroke-2",
                  conn.isCritical ? "stroke-destructive" : "stroke-muted-foreground/50"
                )}
                markerEnd={conn.isCritical ? "url(#arrowhead-critical)" : "url(#arrowhead)"}
              />
            );
          })}
          
          {/* Knoten */}
          {activities.map(activity => {
            const pos = nodePositions[activity.id];
            if (!pos) return null;
            
            const calculatedActivity = calculatedActivities.find(a => a.id === activity.id);
            const isMarkedCritical = markedCritical.includes(activity.id);
            const isActuallyCritical = calculatedActivity?.isCritical || false;
            
            return (
              <g key={activity.id} transform={`translate(${pos.x}, ${pos.y})`}>
                {/* Hauptbox */}
                <rect
                  width="130"
                  height="70"
                  rx="6"
                  className={cn(
                    "stroke-2 fill-card",
                    isMarkedCritical && "stroke-destructive fill-destructive/10",
                    showSolution && isActuallyCritical && !isMarkedCritical && "stroke-primary fill-primary/10",
                    !isMarkedCritical && !showSolution && "stroke-border"
                  )}
                />
                
                {/* ID Badge */}
                <rect
                  x="4"
                  y="4"
                  width="24"
                  height="18"
                  rx="3"
                  className="fill-primary"
                />
                <text
                  x="16"
                  y="16"
                  textAnchor="middle"
                  className="fill-primary-foreground text-xs font-bold"
                >
                  {activity.id}
                </text>
                
                {/* Name */}
                <text
                  x="65"
                  y="16"
                  textAnchor="middle"
                  className="fill-foreground text-xs font-medium"
                >
                  {activity.name.length > 12 ? activity.name.slice(0, 12) + '...' : activity.name}
                </text>
                
                {/* Dauer */}
                <text
                  x="65"
                  y="35"
                  textAnchor="middle"
                  className="fill-muted-foreground text-xs"
                >
                  Dauer: {activity.duration}
                </text>
                
                {/* Zeitwerte */}
                {showSolution && calculatedActivity && (
                  <>
                    <line x1="0" y1="45" x2="130" y2="45" className="stroke-border" />
                    <text x="8" y="58" className="fill-muted-foreground text-[10px]">
                      FAZ:{calculatedActivity.faz}
                    </text>
                    <text x="45" y="58" className="fill-muted-foreground text-[10px]">
                      FEZ:{calculatedActivity.fez}
                    </text>
                    <text x="8" y="68" className="fill-muted-foreground text-[10px]">
                      SAZ:{calculatedActivity.saz}
                    </text>
                    <text x="45" y="68" className="fill-muted-foreground text-[10px]">
                      SEZ:{calculatedActivity.sez}
                    </text>
                    <text x="90" y="63" className="fill-muted-foreground text-[10px]">
                      GP:{calculatedActivity.gp}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Legende */}
        <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-destructive bg-destructive/10" />
            <span>Kritischer Pfad (markiert)</span>
          </div>
          {showSolution && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-primary bg-primary/10" />
              <span>Kritischer Pfad (Lösung)</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
