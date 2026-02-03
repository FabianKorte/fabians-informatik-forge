import { useState } from 'react';
import { useHardwarePuzzle } from '@/hooks/useHardwarePuzzle';
import { ScenarioSelector } from './ScenarioSelector';
import { ComponentsPanel } from './ComponentsPanel';
import { PCCaseVisualizer } from './PCCaseVisualizer';
import { BuildControls } from './BuildControls';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Trophy, PartyPopper } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const HardwarePuzzleTool = () => {
  const {
    state,
    scenarios,
    selectScenario,
    installComponent,
    removeComponent,
    selectComponent,
    toggleHints,
    completeBuild,
    resetBuild,
    exitScenario,
    isScenarioCompleted
  } = useHardwarePuzzle();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const handleCompleteBuild = () => {
    const wasAlreadyCompleted = state.currentScenario 
      ? isScenarioCompleted(state.currentScenario.id) 
      : false;
    
    const success = completeBuild();
    
    if (success && state.currentScenario) {
      setEarnedXP(wasAlreadyCompleted ? 0 : state.currentScenario.xpReward);
      setShowSuccessDialog(true);
    }
  };

  const handleContinue = () => {
    setShowSuccessDialog(false);
    exitScenario();
  };

  // Show scenario selector if no scenario is active
  if (!state.currentScenario) {
    return (
      <div className="container mx-auto p-4 max-w-5xl">
        <ScenarioSelector
          scenarios={scenarios}
          onSelectScenario={selectScenario}
          isScenarioCompleted={isScenarioCompleted}
        />
      </div>
    );
  }

  const currentScenarioCompleted = isScenarioCompleted(state.currentScenario.id);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Components Panel */}
          <div className="lg:col-span-4">
            <ComponentsPanel
              availableComponents={state.currentScenario.availableComponents}
              installedComponents={state.build.slots}
              selectedComponent={state.selectedComponent}
              onSelectComponent={selectComponent}
              onInstallComponent={installComponent}
            />
          </div>

          {/* Center: PC Case Visualizer */}
          <div className="lg:col-span-5">
            <PCCaseVisualizer
              slots={state.build.slots}
              onRemoveComponent={removeComponent}
              totalPower={state.build.totalPower}
            />
          </div>

          {/* Right: Build Controls */}
          <div className="lg:col-span-3">
            <BuildControls
              scenario={state.currentScenario}
              build={state.build}
              showHints={state.showHints}
              isCompleted={currentScenarioCompleted}
              onToggleHints={toggleHints}
              onCompleteBuild={handleCompleteBuild}
              onResetBuild={resetBuild}
              onExit={exitScenario}
            />
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <PartyPopper className="h-6 w-6 text-yellow-500" />
              Build erfolgreich!
            </DialogTitle>
            <DialogDescription>
              Du hast den PC erfolgreich zusammengebaut!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                {earnedXP > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black">
                    +{earnedXP} XP
                  </Badge>
                )}
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="font-medium">
                {state.currentScenario?.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Alle Komponenten sind kompatibel und korrekt verbaut.
              </p>
              {earnedXP === 0 && (
                <p className="text-xs text-muted-foreground">
                  (XP wurden bereits bei der ersten Fertigstellung vergeben)
                </p>
              )}
            </div>

            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <h4 className="text-sm font-medium">Dein Build:</h4>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {Object.entries(state.build.slots).map(([category, component]) => (
                  component && (
                    <div key={category} className="truncate text-muted-foreground">
                      • {component.name}
                    </div>
                  )
                ))}
              </div>
              <div className="text-xs text-muted-foreground pt-1 border-t border-border">
                Gesamtverbrauch: {state.build.totalPower}W
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSuccessDialog(false)} className="flex-1">
              Weiter üben
            </Button>
            <Button onClick={handleContinue} className="flex-1">
              Zum nächsten Szenario
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
