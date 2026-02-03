import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Lightbulb, 
  RotateCcw, 
  ArrowLeft,
  Trophy,
  Eye,
  EyeOff
} from 'lucide-react';
import type { PuzzleScenario, BuildState } from '@/types/hardwarePuzzle';

interface BuildControlsProps {
  scenario: PuzzleScenario;
  build: BuildState;
  showHints: boolean;
  isCompleted: boolean;
  onToggleHints: () => void;
  onCompleteBuild: () => void;
  onResetBuild: () => void;
  onExit: () => void;
}

export const BuildControls = ({
  scenario,
  build,
  showHints,
  isCompleted,
  onToggleHints,
  onCompleteBuild,
  onResetBuild,
  onExit
}: BuildControlsProps) => {
  const errors = build.errors.filter(e => e.type === 'error');
  const warnings = build.errors.filter(e => e.type === 'warning');
  const canComplete = build.isComplete && build.isCompatible;

  return (
    <div className="space-y-4">
      {/* Scenario Info */}
      <Card>
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{scenario.title}</CardTitle>
            <Badge variant={isCompleted ? 'default' : 'secondary'}>
              {scenario.xpReward} XP
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-4">
          <p className="text-sm text-muted-foreground mb-3">
            {scenario.description}
          </p>
          <div className="space-y-1">
            <span className="text-xs font-medium">Anforderungen:</span>
            <ul className="text-xs space-y-1 text-muted-foreground">
              {scenario.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Compatibility Status */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-base flex items-center gap-2">
            {build.isCompatible ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
            Kompatibilität
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-4 space-y-2">
          {errors.length === 0 && warnings.length === 0 ? (
            <div className="text-sm text-green-500 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Alle Komponenten kompatibel!
            </div>
          ) : (
            <div className="space-y-2">
              {errors.map((error, i) => (
                <Alert key={`error-${i}`} variant="destructive" className="py-2">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    {error.message}
                  </AlertDescription>
                </Alert>
              ))}
              {warnings.map((warning, i) => (
                <Alert key={`warning-${i}`} className="py-2 border-yellow-500/50 bg-yellow-500/10">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-xs">
                    {warning.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hints */}
      <Card>
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              Hinweise
            </CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleHints}
              className="h-7"
            >
              {showHints ? (
                <><EyeOff className="h-3 w-3 mr-1" /> Ausblenden</>
              ) : (
                <><Eye className="h-3 w-3 mr-1" /> Anzeigen</>
              )}
            </Button>
          </div>
        </CardHeader>
        {showHints && (
          <CardContent className="pt-0 px-4 pb-4">
            <ul className="text-xs space-y-2 text-muted-foreground">
              {scenario.hints.map((hint, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                  {hint}
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {canComplete && (
          <Button 
            onClick={onCompleteBuild}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
          >
            <Trophy className="h-4 w-4 mr-2" />
            {isCompleted ? 'Erneut abschließen' : 'Build abschließen'}
          </Button>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onResetBuild}
            className="flex-1"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Zurücksetzen
          </Button>
          <Button 
            variant="ghost" 
            onClick={onExit}
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
        </div>
      </div>
    </div>
  );
};
