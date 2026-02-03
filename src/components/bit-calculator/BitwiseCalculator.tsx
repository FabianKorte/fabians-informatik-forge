import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BitwiseOperation, BitwiseResult } from '@/types/bitCalculator';
import { Calculator, Zap } from 'lucide-react';

interface BitwiseCalculatorProps {
  operandA: string;
  operandB: string;
  selectedOperation: BitwiseOperation;
  shiftAmount: number;
  result: BitwiseResult | null;
  onOperandAChange: (value: string) => void;
  onOperandBChange: (value: string) => void;
  onOperationChange: (op: BitwiseOperation) => void;
  onShiftAmountChange: (amount: number) => void;
  onCalculate: () => void;
}

const operations: { value: BitwiseOperation; label: string; symbol: string; description: string }[] = [
  { value: 'AND', label: 'AND', symbol: '&', description: 'Beide Bits müssen 1 sein' },
  { value: 'OR', label: 'OR', symbol: '|', description: 'Mindestens ein Bit muss 1 sein' },
  { value: 'XOR', label: 'XOR', symbol: '^', description: 'Genau ein Bit muss 1 sein' },
  { value: 'NOT', label: 'NOT', symbol: '~', description: 'Alle Bits invertieren (8-Bit)' },
  { value: 'LEFT_SHIFT', label: '<<', symbol: '<<', description: 'Bits nach links verschieben' },
  { value: 'RIGHT_SHIFT', label: '>>', symbol: '>>', description: 'Bits nach rechts verschieben' },
];

export function BitwiseCalculator({
  operandA,
  operandB,
  selectedOperation,
  shiftAmount,
  result,
  onOperandAChange,
  onOperandBChange,
  onOperationChange,
  onShiftAmountChange,
  onCalculate,
}: BitwiseCalculatorProps) {
  const needsSecondOperand = ['AND', 'OR', 'XOR'].includes(selectedOperation);
  const isShiftOperation = ['LEFT_SHIFT', 'RIGHT_SHIFT'].includes(selectedOperation);
  const currentOp = operations.find(o => o.value === selectedOperation);

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-primary" />
            Operation wählen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {operations.map((op) => (
              <Button
                key={op.value}
                variant={selectedOperation === op.value ? 'default' : 'outline'}
                className="flex flex-col h-auto py-3"
                onClick={() => onOperationChange(op.value)}
              >
                <span className="font-mono text-lg">{op.symbol}</span>
                <span className="text-xs mt-1">{op.label}</span>
              </Button>
            ))}
          </div>
          {currentOp && (
            <p className="text-sm text-muted-foreground mt-4 text-center">
              {currentOp.description}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            Eingabe (Dezimal)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Operand A</Label>
              <Input
                type="number"
                value={operandA}
                onChange={(e) => onOperandAChange(e.target.value)}
                placeholder="z.B. 12"
                className="font-mono"
              />
            </div>
            
            {needsSecondOperand && (
              <div className="space-y-2">
                <Label>Operand B</Label>
                <Input
                  type="number"
                  value={operandB}
                  onChange={(e) => onOperandBChange(e.target.value)}
                  placeholder="z.B. 10"
                  className="font-mono"
                />
              </div>
            )}
            
            {isShiftOperation && (
              <div className="space-y-2">
                <Label>Verschiebung (Stellen)</Label>
                <Input
                  type="number"
                  min={1}
                  max={31}
                  value={shiftAmount}
                  onChange={(e) => onShiftAmountChange(parseInt(e.target.value) || 1)}
                  className="font-mono"
                />
              </div>
            )}
          </div>

          <Button onClick={onCalculate} className="w-full">
            Berechnen
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-primary/5 border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg">Ergebnis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="font-mono text-center space-y-2 text-lg">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span>{result.operandA}</span>
                <Badge variant="secondary">{result.binaryA}</Badge>
              </div>
              
              {result.operandB !== undefined && (
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <span>{result.operandB}</span>
                  <Badge variant="secondary">{result.binaryB}</Badge>
                </div>
              )}
              
              <div className="text-muted-foreground text-2xl py-2">
                {currentOp?.symbol}
                {isShiftOperation && <span className="ml-2">{shiftAmount}</span>}
              </div>
              
              <div className="flex items-center justify-center gap-4 flex-wrap border-t pt-4">
                <span className="text-primary text-2xl font-bold">{result.result}</span>
                <Badge className="bg-primary/20 text-primary">{result.binaryResult}</Badge>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-muted-foreground text-center">
                Hexadezimal: <span className="font-mono text-foreground">0x{result.result.toString(16).toUpperCase()}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
