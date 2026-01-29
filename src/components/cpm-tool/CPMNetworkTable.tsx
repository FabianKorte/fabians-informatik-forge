import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CPMActivity } from '@/types/cpmTool';
import { cn } from '@/lib/utils';
import { Info, ArrowRight } from 'lucide-react';

interface CPMNetworkTableProps {
  activities: CPMActivity[];
  calculatedActivities: CPMActivity[];
  userInputs: Record<string, Partial<CPMActivity>>;
  markedCritical: string[];
  showSolution: boolean;
  onUpdateInput: (activityId: string, field: keyof CPMActivity, value: number | null) => void;
  onToggleCritical: (activityId: string) => void;
}

export const CPMNetworkTable: React.FC<CPMNetworkTableProps> = ({
  activities,
  calculatedActivities,
  userInputs,
  markedCritical,
  showSolution,
  onUpdateInput,
  onToggleCritical
}) => {
  const getCalculatedValue = (activityId: string, field: keyof CPMActivity): number | null => {
    const activity = calculatedActivities.find(a => a.id === activityId);
    return activity ? (activity[field] as number | null) : null;
  };

  const isValueCorrect = (activityId: string, field: keyof CPMActivity): boolean => {
    const userValue = userInputs[activityId]?.[field];
    const correctValue = getCalculatedValue(activityId, field);
    return userValue !== undefined && userValue === correctValue;
  };

  const parseInputValue = (value: string): number | null => {
    if (value === '' || value === null || value === undefined) return null;
    const num = parseInt(value, 10);
    return isNaN(num) ? null : num;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-3 bg-muted/50">
        <CardTitle className="text-lg flex items-center gap-2">
          Vorgangstabelle
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Trage die berechneten Werte in die Felder ein. Grüne Felder = korrekt.</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Vorgang</th>
                <th className="px-3 py-2 text-left font-medium">Bezeichnung</th>
                <th className="px-3 py-2 text-center font-medium">Dauer</th>
                <th className="px-3 py-2 text-left font-medium">Vorgänger</th>
                <th className="px-3 py-2 text-center font-medium">
                  <Tooltip>
                    <TooltipTrigger className="cursor-help underline decoration-dotted">FAZ</TooltipTrigger>
                    <TooltipContent>Frühester Anfangszeitpunkt</TooltipContent>
                  </Tooltip>
                </th>
                <th className="px-3 py-2 text-center font-medium">
                  <Tooltip>
                    <TooltipTrigger className="cursor-help underline decoration-dotted">FEZ</TooltipTrigger>
                    <TooltipContent>Frühester Endzeitpunkt (FAZ + Dauer)</TooltipContent>
                  </Tooltip>
                </th>
                <th className="px-3 py-2 text-center font-medium">
                  <Tooltip>
                    <TooltipTrigger className="cursor-help underline decoration-dotted">SAZ</TooltipTrigger>
                    <TooltipContent>Spätester Anfangszeitpunkt</TooltipContent>
                  </Tooltip>
                </th>
                <th className="px-3 py-2 text-center font-medium">
                  <Tooltip>
                    <TooltipTrigger className="cursor-help underline decoration-dotted">SEZ</TooltipTrigger>
                    <TooltipContent>Spätester Endzeitpunkt</TooltipContent>
                  </Tooltip>
                </th>
                <th className="px-3 py-2 text-center font-medium">
                  <Tooltip>
                    <TooltipTrigger className="cursor-help underline decoration-dotted">GP</TooltipTrigger>
                    <TooltipContent>Gesamtpuffer (SAZ - FAZ)</TooltipContent>
                  </Tooltip>
                </th>
                <th className="px-3 py-2 text-center font-medium">Kritisch?</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => {
                const isMarkedCritical = markedCritical.includes(activity.id);
                const calculatedActivity = calculatedActivities.find(a => a.id === activity.id);
                const isActuallyCritical = calculatedActivity?.isCritical || false;
                
                return (
                  <tr 
                    key={activity.id}
                    className={cn(
                      "border-t border-border/50 transition-colors",
                      isMarkedCritical && "bg-destructive/10",
                      showSolution && isActuallyCritical && "bg-primary/10"
                    )}
                  >
                    <td className="px-3 py-2">
                      <Badge variant="outline" className="font-mono">
                        {activity.id}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 font-medium">{activity.name}</td>
                    <td className="px-3 py-2 text-center">
                      <Badge variant="secondary">{activity.duration}</Badge>
                    </td>
                    <td className="px-3 py-2">
                      {activity.predecessors.length > 0 ? (
                        <div className="flex items-center gap-1 flex-wrap">
                          {activity.predecessors.map((pred, i) => (
                            <React.Fragment key={pred}>
                              {i > 0 && <span className="text-muted-foreground">,</span>}
                              <Badge variant="outline" className="font-mono text-xs">
                                {pred}
                              </Badge>
                            </React.Fragment>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">–</span>
                      )}
                    </td>
                    
                    {/* FAZ Input */}
                    <td className="px-3 py-2">
                      <Input
                        type="number"
                        min="0"
                        className={cn(
                          "w-16 h-8 text-center mx-auto",
                          isValueCorrect(activity.id, 'faz') && "border-green-500 bg-green-500/10"
                        )}
                        value={userInputs[activity.id]?.faz ?? ''}
                        onChange={(e) => onUpdateInput(activity.id, 'faz', parseInputValue(e.target.value))}
                        placeholder={showSolution ? String(getCalculatedValue(activity.id, 'faz') ?? '?') : '?'}
                      />
                    </td>
                    
                    {/* FEZ Input */}
                    <td className="px-3 py-2">
                      <Input
                        type="number"
                        min="0"
                        className={cn(
                          "w-16 h-8 text-center mx-auto",
                          isValueCorrect(activity.id, 'fez') && "border-green-500 bg-green-500/10"
                        )}
                        value={userInputs[activity.id]?.fez ?? ''}
                        onChange={(e) => onUpdateInput(activity.id, 'fez', parseInputValue(e.target.value))}
                        placeholder={showSolution ? String(getCalculatedValue(activity.id, 'fez') ?? '?') : '?'}
                      />
                    </td>
                    
                    {/* SAZ Input */}
                    <td className="px-3 py-2">
                      <Input
                        type="number"
                        min="0"
                        className={cn(
                          "w-16 h-8 text-center mx-auto",
                          isValueCorrect(activity.id, 'saz') && "border-green-500 bg-green-500/10"
                        )}
                        value={userInputs[activity.id]?.saz ?? ''}
                        onChange={(e) => onUpdateInput(activity.id, 'saz', parseInputValue(e.target.value))}
                        placeholder={showSolution ? String(getCalculatedValue(activity.id, 'saz') ?? '?') : '?'}
                      />
                    </td>
                    
                    {/* SEZ Input */}
                    <td className="px-3 py-2">
                      <Input
                        type="number"
                        min="0"
                        className={cn(
                          "w-16 h-8 text-center mx-auto",
                          isValueCorrect(activity.id, 'sez') && "border-green-500 bg-green-500/10"
                        )}
                        value={userInputs[activity.id]?.sez ?? ''}
                        onChange={(e) => onUpdateInput(activity.id, 'sez', parseInputValue(e.target.value))}
                        placeholder={showSolution ? String(getCalculatedValue(activity.id, 'sez') ?? '?') : '?'}
                      />
                    </td>
                    
                    {/* GP (calculated) */}
                    <td className="px-3 py-2 text-center">
                      {showSolution ? (
                        <Badge 
                          variant={calculatedActivity?.gp === 0 ? "destructive" : "secondary"}
                        >
                          {calculatedActivity?.gp ?? '?'}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">–</span>
                      )}
                    </td>
                    
                    {/* Critical Checkbox */}
                    <td className="px-3 py-2">
                      <div className="flex justify-center">
                        <Checkbox
                          checked={isMarkedCritical}
                          onCheckedChange={() => onToggleCritical(activity.id)}
                          className={cn(
                            showSolution && isActuallyCritical && !isMarkedCritical && "border-destructive"
                          )}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
