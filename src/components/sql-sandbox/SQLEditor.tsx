import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, RotateCcw } from 'lucide-react';

interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  disabled?: boolean;
}

export function SQLEditor({ value, onChange, onExecute, disabled }: SQLEditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Execute on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onExecute();
    }
    
    // Tab inserts spaces instead of changing focus
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      // Move cursor after the inserted spaces
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="SELECT * FROM tabelle WHERE ..."
          className="font-mono text-sm min-h-[120px] bg-[#1e1e1e] text-[#d4d4d4] border-border resize-y"
          spellCheck={false}
          disabled={disabled}
        />
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          Strg+Enter zum Ausführen
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={onExecute} 
          disabled={disabled || !value.trim()}
          className="flex-1"
        >
          <Play className="h-4 w-4 mr-2" />
          Ausführen
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onChange('')}
          disabled={disabled || !value}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
