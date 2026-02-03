import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { NumberBase, bitUtils } from '@/types/bitCalculator';
import { ArrowRight, Binary, Hash } from 'lucide-react';

interface NumberConverterProps {
  inputValue: string;
  inputBase: NumberBase;
  conversionResult: ReturnType<typeof bitUtils.convertNumber> | null;
  onInputChange: (value: string) => void;
  onBaseChange: (base: NumberBase) => void;
}

const baseLabels: Record<NumberBase, { label: string; prefix: string; placeholder: string }> = {
  binary: { label: 'Binär (Basis 2)', prefix: '0b', placeholder: '101010' },
  decimal: { label: 'Dezimal (Basis 10)', prefix: '', placeholder: '42' },
  hexadecimal: { label: 'Hexadezimal (Basis 16)', prefix: '0x', placeholder: 'FF' },
  octal: { label: 'Oktal (Basis 8)', prefix: '0o', placeholder: '52' },
};

export function NumberConverter({
  inputValue,
  inputBase,
  conversionResult,
  onInputChange,
  onBaseChange,
}: NumberConverterProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Binary className="h-5 w-5 text-primary" />
            Eingabe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Zahlensystem</Label>
              <Select value={inputBase} onValueChange={(v) => onBaseChange(v as NumberBase)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(baseLabels).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Wert eingeben</Label>
              <div className="flex items-center gap-2">
                {baseLabels[inputBase].prefix && (
                  <span className="text-muted-foreground font-mono">
                    {baseLabels[inputBase].prefix}
                  </span>
                )}
                <Input
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={baseLabels[inputBase].placeholder}
                  className="font-mono"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {conversionResult && (
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ArrowRight className="h-5 w-5 text-primary" />
              Ergebnisse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Binär"
                value={bitUtils.formatBinary(conversionResult.binary)}
                prefix="0b"
                highlight={inputBase === 'binary'}
              />
              <ResultCard
                label="Dezimal"
                value={conversionResult.decimal.toLocaleString('de-DE')}
                highlight={inputBase === 'decimal'}
              />
              <ResultCard
                label="Hexadezimal"
                value={conversionResult.hexadecimal}
                prefix="0x"
                highlight={inputBase === 'hexadecimal'}
              />
              <ResultCard
                label="Oktal"
                value={conversionResult.octal}
                prefix="0o"
                highlight={inputBase === 'octal'}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {!conversionResult && inputValue && (
        <Card className="bg-destructive/10 border-destructive/30">
          <CardContent className="pt-6">
            <p className="text-destructive text-center">
              Ungültige Eingabe für {baseLabels[inputBase].label}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ResultCard({ 
  label, 
  value, 
  prefix, 
  highlight 
}: { 
  label: string; 
  value: string; 
  prefix?: string; 
  highlight?: boolean;
}) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? 'bg-primary/10 border-primary/30' : 'bg-muted/30 border-border'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        {highlight && <Badge variant="secondary" className="text-xs">Eingabe</Badge>}
      </div>
      <div className="font-mono text-lg break-all">
        {prefix && <span className="text-muted-foreground">{prefix}</span>}
        <span className={highlight ? 'text-primary' : ''}>{value}</span>
      </div>
    </div>
  );
}
