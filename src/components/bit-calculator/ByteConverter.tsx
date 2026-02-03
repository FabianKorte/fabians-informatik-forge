import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BYTE_UNITS } from '@/types/bitCalculator';
import { HardDrive, ArrowDownUp } from 'lucide-react';

interface ByteConverterProps {
  value: string;
  unit: string;
  results: Record<string, string>;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
}

export function ByteConverter({
  value,
  unit,
  results,
  onValueChange,
  onUnitChange,
}: ByteConverterProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HardDrive className="h-5 w-5 text-primary" />
            Eingabe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Wert</Label>
              <Input
                type="text"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder="z.B. 1024"
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label>Einheit</Label>
              <Select value={unit} onValueChange={onUnitChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BYTE_UNITS.map((u) => (
                    <SelectItem key={u.abbreviation} value={u.abbreviation}>
                      {u.name} ({u.abbreviation})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {Object.keys(results).length > 0 && (
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ArrowDownUp className="h-5 w-5 text-primary" />
              Umrechnungen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {BYTE_UNITS.map((u) => {
                const resultValue = results[u.abbreviation];
                if (!resultValue) return null;
                
                const isInput = u.abbreviation === unit;
                
                return (
                  <div
                    key={u.abbreviation}
                    className={`p-4 rounded-lg border ${
                      isInput 
                        ? 'bg-primary/10 border-primary/30' 
                        : 'bg-muted/30 border-border'
                    }`}
                  >
                    <div className="text-sm text-muted-foreground mb-1">
                      {u.name}
                    </div>
                    <div className="font-mono text-lg">
                      <span className={isInput ? 'text-primary font-bold' : ''}>
                        {resultValue}
                      </span>
                      <span className="text-muted-foreground ml-2">{u.abbreviation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/30 border-border">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-3">Umrechnungsfaktoren</h4>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">1 Byte</span>
              <span className="font-mono">8 Bits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">1 Kilobyte (KB)</span>
              <span className="font-mono">1.024 Bytes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">1 Megabyte (MB)</span>
              <span className="font-mono">1.024 KB = 1.048.576 Bytes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">1 Gigabyte (GB)</span>
              <span className="font-mono">1.024 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">1 Terabyte (TB)</span>
              <span className="font-mono">1.024 GB</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
