import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { BlockType } from '@/types/struktogramm';
import { blockTypeLabels } from '@/types/struktogramm';
import { 
  Square, 
  GitBranch, 
  RotateCcw, 
  RotateCw, 
  Repeat,
  List,
  Download,
  Upload
} from 'lucide-react';

interface BlockToolbarProps {
  onAddBlock: (type: BlockType) => void;
  disabled?: boolean;
}

const blockButtons: { type: BlockType; icon: React.ReactNode; color: string }[] = [
  { type: 'sequence', icon: <Square className="h-4 w-4" />, color: 'text-primary' },
  { type: 'input', icon: <Download className="h-4 w-4" />, color: 'text-blue-500' },
  { type: 'output', icon: <Upload className="h-4 w-4" />, color: 'text-green-500' },
  { type: 'if', icon: <GitBranch className="h-4 w-4" />, color: 'text-amber-500' },
  { type: 'while', icon: <RotateCcw className="h-4 w-4" />, color: 'text-violet-500' },
  { type: 'doWhile', icon: <RotateCw className="h-4 w-4" />, color: 'text-pink-500' },
  { type: 'for', icon: <Repeat className="h-4 w-4" />, color: 'text-cyan-500' },
  { type: 'switch', icon: <List className="h-4 w-4" />, color: 'text-orange-500' }
];

export const BlockToolbar = ({ onAddBlock, disabled }: BlockToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-1 p-2 bg-muted/30 rounded-lg border border-border">
      <TooltipProvider delayDuration={300}>
        {blockButtons.map(({ type, icon, color }) => (
          <Tooltip key={type}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-8 px-2 ${color} hover:bg-muted`}
                onClick={() => onAddBlock(type)}
                disabled={disabled}
              >
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{blockTypeLabels[type]}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};
