import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ChevronUp, ChevronDown, Copy, Plus } from 'lucide-react';
import type { StruktogrammBlock, SwitchBlock } from '@/types/struktogramm';
import { blockTypeLabels, blockTypeIcons } from '@/types/struktogramm';

interface BlockEditorProps {
  block: StruktogrammBlock | null;
  onUpdate: (id: string, updates: Partial<StruktogrammBlock>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onCopy: (id: string) => void;
  onDeselect: () => void;
}

export const BlockEditor = ({ 
  block, 
  onUpdate, 
  onDelete, 
  onMove, 
  onCopy,
  onDeselect 
}: BlockEditorProps) => {
  const [localValues, setLocalValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (block) {
      const values: Record<string, string> = {};
      if ('content' in block) values.content = block.content;
      if ('condition' in block) values.condition = block.condition;
      if ('variable' in block) values.variable = block.variable;
      if ('prompt' in block && block.prompt) values.prompt = block.prompt;
      if ('start' in block) values.start = block.start;
      if ('end' in block) values.end = block.end;
      if ('step' in block && block.step) values.step = block.step;
      if ('expression' in block) values.expression = block.expression;
      setLocalValues(values);
    }
  }, [block?.id]);

  if (!block) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full text-muted-foreground">
          <p className="text-sm">Wähle einen Block zum Bearbeiten</p>
        </CardContent>
      </Card>
    );
  }

  const handleChange = (field: string, value: string) => {
    setLocalValues(prev => ({ ...prev, [field]: value }));
    onUpdate(block.id, { [field]: value } as Partial<StruktogrammBlock>);
  };

  const handleAddCase = () => {
    if (block.type === 'switch') {
      const switchBlock = block as SwitchBlock;
      onUpdate(block.id, {
        cases: [...switchBlock.cases, { value: `Fall ${switchBlock.cases.length + 1}`, blocks: [] }]
      });
    }
  };

  const handleUpdateCase = (index: number, value: string) => {
    if (block.type === 'switch') {
      const switchBlock = block as SwitchBlock;
      const newCases = [...switchBlock.cases];
      newCases[index] = { ...newCases[index], value };
      onUpdate(block.id, { cases: newCases });
    }
  };

  const handleRemoveCase = (index: number) => {
    if (block.type === 'switch') {
      const switchBlock = block as SwitchBlock;
      const newCases = switchBlock.cases.filter((_, i) => i !== index);
      onUpdate(block.id, { cases: newCases });
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm flex items-center gap-2">
          <span>{blockTypeIcons[block.type]}</span>
          {blockTypeLabels[block.type]}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onMove(block.id, 'up')}>
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onMove(block.id, 'down')}>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onCopy(block.id)}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={() => {
              onDelete(block.id);
              onDeselect();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {/* Sequence / Output */}
        {(block.type === 'sequence' || block.type === 'output') && (
          <div className="space-y-2">
            <Label htmlFor="content">Inhalt</Label>
            <Input
              id="content"
              value={localValues.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder={block.type === 'output' ? 'Ausgabe...' : 'Anweisung...'}
            />
          </div>
        )}

        {/* Input */}
        {block.type === 'input' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="variable">Variable</Label>
              <Input
                id="variable"
                value={localValues.variable || ''}
                onChange={(e) => handleChange('variable', e.target.value)}
                placeholder="variablenname"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt">Eingabeaufforderung (optional)</Label>
              <Input
                id="prompt"
                value={localValues.prompt || ''}
                onChange={(e) => handleChange('prompt', e.target.value)}
                placeholder="Bitte eingeben:"
              />
            </div>
          </>
        )}

        {/* If / While / DoWhile */}
        {(block.type === 'if' || block.type === 'while' || block.type === 'doWhile') && (
          <div className="space-y-2">
            <Label htmlFor="condition">Bedingung</Label>
            <Input
              id="condition"
              value={localValues.condition || ''}
              onChange={(e) => handleChange('condition', e.target.value)}
              placeholder="x > 0"
            />
          </div>
        )}

        {/* For */}
        {block.type === 'for' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="variable">Zählvariable</Label>
              <Input
                id="variable"
                value={localValues.variable || ''}
                onChange={(e) => handleChange('variable', e.target.value)}
                placeholder="i"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="start">Startwert</Label>
                <Input
                  id="start"
                  value={localValues.start || ''}
                  onChange={(e) => handleChange('start', e.target.value)}
                  placeholder="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">Endwert</Label>
                <Input
                  id="end"
                  value={localValues.end || ''}
                  onChange={(e) => handleChange('end', e.target.value)}
                  placeholder="10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="step">Schrittweite (optional)</Label>
              <Input
                id="step"
                value={localValues.step || ''}
                onChange={(e) => handleChange('step', e.target.value)}
                placeholder="1"
              />
            </div>
          </>
        )}

        {/* Switch */}
        {block.type === 'switch' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="expression">Ausdruck</Label>
              <Input
                id="expression"
                value={localValues.expression || ''}
                onChange={(e) => handleChange('expression', e.target.value)}
                placeholder="wahl"
              />
            </div>
            <div className="space-y-2">
              <Label>Fälle</Label>
              {(block as SwitchBlock).cases.map((c, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={c.value}
                    onChange={(e) => handleUpdateCase(idx, e.target.value)}
                    placeholder={`Fall ${idx + 1}`}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="shrink-0"
                    onClick={() => handleRemoveCase(idx)}
                    disabled={(block as SwitchBlock).cases.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full" onClick={handleAddCase}>
                <Plus className="h-4 w-4 mr-2" />
                Fall hinzufügen
              </Button>
            </div>
          </>
        )}

        <p className="text-xs text-muted-foreground pt-2">
          Tipp: Klicke auf einen Block im Diagramm, um ihn zu bearbeiten. Ziehe Blöcke aus der Toolbar in Container-Bereiche.
        </p>
      </CardContent>
    </Card>
  );
};
