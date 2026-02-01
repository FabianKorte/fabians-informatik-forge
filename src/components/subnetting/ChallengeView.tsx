import { SubnettingChallenge } from '@/types/subnetting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb, Send, HelpCircle, Network } from 'lucide-react';

interface ChallengeViewProps {
  challenge: SubnettingChallenge;
  userInputs: Record<string, string>;
  showHint: boolean;
  currentHints: string[];
  onInputChange: (key: string, value: string) => void;
  onSubmit: () => void;
  onShowHint: () => void;
}

export function ChallengeView({
  challenge,
  userInputs,
  showHint,
  currentHints,
  onInputChange,
  onSubmit,
  onShowHint
}: ChallengeViewProps) {
  const getInputFields = () => {
    const fields: { key: string; label: string; placeholder: string }[] = [];
    const expected = challenge.expectedAnswers;

    if (expected.subnetMask !== undefined) {
      fields.push({ key: 'subnetMask', label: 'Subnetzmaske', placeholder: '255.255.255.0' });
    }
    if (expected.networkAddress !== undefined) {
      fields.push({ key: 'networkAddress', label: 'Netzwerkadresse', placeholder: '192.168.1.0' });
    }
    if (expected.broadcastAddress !== undefined) {
      fields.push({ key: 'broadcastAddress', label: 'Broadcast-Adresse', placeholder: '192.168.1.255' });
    }
    if (expected.firstHost !== undefined) {
      fields.push({ key: 'firstHost', label: 'Erster Host', placeholder: '192.168.1.1' });
    }
    if (expected.lastHost !== undefined) {
      fields.push({ key: 'lastHost', label: 'Letzter Host', placeholder: '192.168.1.254' });
    }
    if (expected.hostCount !== undefined) {
      fields.push({ key: 'hostCount', label: 'Anzahl Hosts', placeholder: '254' });
    }
    if (expected.cidr !== undefined) {
      fields.push({ key: 'cidr', label: 'CIDR-Notation', placeholder: '24' });
    }

    return fields;
  };

  const inputFields = getInputFields();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            <Badge variant="outline" className="text-xs">
              +{challenge.points} Punkte
            </Badge>
          </div>
          <CardTitle className="text-xl mt-3">{challenge.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Given Data */}
          <div className="flex flex-wrap gap-3 mb-4">
            {challenge.givenData.ip && (
              <div className="bg-muted/50 px-3 py-2 rounded-lg">
                <span className="text-xs text-muted-foreground block">IP-Adresse</span>
                <span className="font-mono font-semibold">{challenge.givenData.ip}</span>
              </div>
            )}
            {challenge.givenData.cidr !== undefined && (
              <div className="bg-muted/50 px-3 py-2 rounded-lg">
                <span className="text-xs text-muted-foreground block">CIDR</span>
                <span className="font-mono font-semibold">/{challenge.givenData.cidr}</span>
              </div>
            )}
            {challenge.givenData.subnetMask && (
              <div className="bg-muted/50 px-3 py-2 rounded-lg">
                <span className="text-xs text-muted-foreground block">Subnetzmaske</span>
                <span className="font-mono font-semibold">{challenge.givenData.subnetMask}</span>
              </div>
            )}
            {challenge.givenData.networkAddress && (
              <div className="bg-muted/50 px-3 py-2 rounded-lg">
                <span className="text-xs text-muted-foreground block">Netzwerkadresse</span>
                <span className="font-mono font-semibold">{challenge.givenData.networkAddress}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Answer Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deine Antwort</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {inputFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input
                  id={field.key}
                  value={userInputs[field.key] || ''}
                  onChange={(e) => onInputChange(field.key, e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={field.placeholder}
                  className="font-mono"
                  autoComplete="off"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onSubmit} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Antwort prüfen
            </Button>
            <Button 
              variant="outline" 
              onClick={onShowHint}
              disabled={currentHints.length >= challenge.hints.length}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Hinweis ({currentHints.length}/{challenge.hints.length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hints */}
      {showHint && currentHints.length > 0 && (
        <Alert className="border-yellow-500/30 bg-yellow-500/5">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="space-y-2">
            {currentHints.map((hint, index) => (
              <p key={index} className="text-sm">
                <span className="font-semibold text-yellow-500">Hinweis {index + 1}:</span> {hint}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
