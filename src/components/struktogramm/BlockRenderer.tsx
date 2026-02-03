import { memo } from 'react';
import type { StruktogrammBlock, IfBlock, WhileBlock, DoWhileBlock, ForBlock, SwitchBlock } from '@/types/struktogramm';
import { cn } from '@/lib/utils';

interface BlockRendererProps {
  block: StruktogrammBlock;
  depth?: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StruktogrammBlock>) => void;
  onDelete: (id: string) => void;
  onAddToContainer?: (parentId: string, type: string) => void;
}

const DEPTH_COLORS = [
  'border-primary/50',
  'border-blue-500/50',
  'border-emerald-500/50',
  'border-amber-500/50',
  'border-rose-500/50'
];

export const BlockRenderer = memo(({ 
  block, 
  depth = 0, 
  selectedId, 
  onSelect,
  onUpdate,
  onDelete,
  onAddToContainer
}: BlockRendererProps) => {
  const isSelected = selectedId === block.id;
  const depthColor = DEPTH_COLORS[depth % DEPTH_COLORS.length];
  
  const baseClasses = cn(
    'border-2 transition-all cursor-pointer',
    depthColor,
    isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:border-primary/30'
  );

  const renderBlockContent = () => {
    switch (block.type) {
      case 'sequence':
        return (
          <div 
            className={cn(baseClasses, 'p-3 bg-card')}
            onClick={() => onSelect(block.id)}
          >
            <div className="font-mono text-sm">{block.content}</div>
          </div>
        );

      case 'input':
        return (
          <div 
            className={cn(baseClasses, 'p-3 bg-blue-500/10')}
            onClick={() => onSelect(block.id)}
          >
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold">📥</span>
              <span className="font-mono text-sm">
                {block.prompt && <span className="text-muted-foreground">{block.prompt} </span>}
                <span className="font-semibold">{block.variable}</span>
              </span>
            </div>
          </div>
        );

      case 'output':
        return (
          <div 
            className={cn(baseClasses, 'p-3 bg-green-500/10')}
            onClick={() => onSelect(block.id)}
          >
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">📤</span>
              <span className="font-mono text-sm">{block.content}</span>
            </div>
          </div>
        );

      case 'if':
        return <IfBlockRenderer block={block} depth={depth} isSelected={isSelected} baseClasses={baseClasses} selectedId={selectedId} onSelect={onSelect} onUpdate={onUpdate} onDelete={onDelete} onAddToContainer={onAddToContainer} />;

      case 'while':
        return <WhileBlockRenderer block={block} depth={depth} isSelected={isSelected} baseClasses={baseClasses} selectedId={selectedId} onSelect={onSelect} onUpdate={onUpdate} onDelete={onDelete} onAddToContainer={onAddToContainer} />;

      case 'doWhile':
        return <DoWhileBlockRenderer block={block} depth={depth} isSelected={isSelected} baseClasses={baseClasses} selectedId={selectedId} onSelect={onSelect} onUpdate={onUpdate} onDelete={onDelete} onAddToContainer={onAddToContainer} />;

      case 'for':
        return <ForBlockRenderer block={block} depth={depth} isSelected={isSelected} baseClasses={baseClasses} selectedId={selectedId} onSelect={onSelect} onUpdate={onUpdate} onDelete={onDelete} onAddToContainer={onAddToContainer} />;

      case 'switch':
        return <SwitchBlockRenderer block={block} depth={depth} isSelected={isSelected} baseClasses={baseClasses} selectedId={selectedId} onSelect={onSelect} onUpdate={onUpdate} onDelete={onDelete} onAddToContainer={onAddToContainer} />;

      default:
        return null;
    }
  };

  return renderBlockContent();
});

BlockRenderer.displayName = 'BlockRenderer';

// If Block Component
const IfBlockRenderer = memo(({ 
  block, 
  depth, 
  isSelected, 
  baseClasses,
  selectedId,
  onSelect,
  onUpdate,
  onDelete,
  onAddToContainer
}: { 
  block: IfBlock; 
  depth: number; 
  isSelected: boolean; 
  baseClasses: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StruktogrammBlock>) => void;
  onDelete: (id: string) => void;
  onAddToContainer?: (parentId: string, type: string) => void;
}) => (
  <div className={cn(baseClasses, 'bg-card overflow-hidden')}>
    {/* Condition header with triangle */}
    <div 
      className="relative bg-amber-500/10 cursor-pointer"
      onClick={() => onSelect(block.id)}
    >
      {/* Triangle pointing down */}
      <div className="flex justify-center py-2">
        <div className="font-mono text-sm px-4 py-1 bg-amber-500/20 rounded">
          {block.condition}
        </div>
      </div>
      {/* Visual triangle representation */}
      <div className="relative h-8">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
          <polygon 
            points="50,0 0,20 100,20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="text-amber-500/50"
          />
        </svg>
        <div className="absolute left-4 bottom-0 text-xs text-green-600 font-semibold">ja</div>
        <div className="absolute right-4 bottom-0 text-xs text-red-500 font-semibold">nein</div>
      </div>
    </div>
    
    {/* Branches */}
    <div className="flex border-t border-border">
      {/* Then branch */}
      <div className="flex-1 border-r border-border min-h-[60px] p-2">
        {block.thenBranch.length > 0 ? (
          <div className="space-y-1">
            {block.thenBranch.map(child => (
              <BlockRenderer 
                key={child.id} 
                block={child} 
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAddToContainer={onAddToContainer}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
            (leer)
          </div>
        )}
      </div>
      
      {/* Else branch */}
      <div className="flex-1 min-h-[60px] p-2">
        {block.elseBranch.length > 0 ? (
          <div className="space-y-1">
            {block.elseBranch.map(child => (
              <BlockRenderer 
                key={child.id} 
                block={child} 
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAddToContainer={onAddToContainer}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
            (leer)
          </div>
        )}
      </div>
    </div>
  </div>
));

IfBlockRenderer.displayName = 'IfBlockRenderer';

// While Block Component
const WhileBlockRenderer = memo(({ 
  block, 
  depth, 
  isSelected, 
  baseClasses,
  selectedId,
  onSelect,
  onUpdate,
  onDelete,
  onAddToContainer
}: { 
  block: WhileBlock; 
  depth: number; 
  isSelected: boolean; 
  baseClasses: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StruktogrammBlock>) => void;
  onDelete: (id: string) => void;
  onAddToContainer?: (parentId: string, type: string) => void;
}) => (
  <div className={cn(baseClasses, 'bg-card overflow-hidden')}>
    {/* Condition at top */}
    <div 
      className="bg-violet-500/10 p-2 cursor-pointer border-b border-violet-500/30"
      onClick={() => onSelect(block.id)}
    >
      <div className="flex items-center gap-2">
        <span className="text-violet-500">↺</span>
        <span className="text-xs text-muted-foreground">solange</span>
        <span className="font-mono text-sm font-medium">{block.condition}</span>
      </div>
    </div>
    
    {/* Body with left bar indicating loop */}
    <div className="flex">
      <div className="w-4 bg-violet-500/20 border-r-2 border-violet-500/50" />
      <div className="flex-1 p-2 min-h-[40px]">
        {block.body.length > 0 ? (
          <div className="space-y-1">
            {block.body.map(child => (
              <BlockRenderer 
                key={child.id} 
                block={child} 
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAddToContainer={onAddToContainer}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
            (Schleifenkörper)
          </div>
        )}
      </div>
    </div>
  </div>
));

WhileBlockRenderer.displayName = 'WhileBlockRenderer';

// Do-While Block Component
const DoWhileBlockRenderer = memo(({ 
  block, 
  depth, 
  isSelected, 
  baseClasses,
  selectedId,
  onSelect,
  onUpdate,
  onDelete,
  onAddToContainer
}: { 
  block: DoWhileBlock; 
  depth: number; 
  isSelected: boolean; 
  baseClasses: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StruktogrammBlock>) => void;
  onDelete: (id: string) => void;
  onAddToContainer?: (parentId: string, type: string) => void;
}) => (
  <div className={cn(baseClasses, 'bg-card overflow-hidden')}>
    {/* Body first with left bar */}
    <div className="flex">
      <div className="w-4 bg-pink-500/20 border-r-2 border-pink-500/50" />
      <div className="flex-1 p-2 min-h-[40px]">
        {block.body.length > 0 ? (
          <div className="space-y-1">
            {block.body.map(child => (
              <BlockRenderer 
                key={child.id} 
                block={child} 
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAddToContainer={onAddToContainer}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
            (Schleifenkörper)
          </div>
        )}
      </div>
    </div>
    
    {/* Condition at bottom */}
    <div 
      className="bg-pink-500/10 p-2 cursor-pointer border-t border-pink-500/30"
      onClick={() => onSelect(block.id)}
    >
      <div className="flex items-center gap-2">
        <span className="text-pink-500">↻</span>
        <span className="text-xs text-muted-foreground">wiederhole bis</span>
        <span className="font-mono text-sm font-medium">{block.condition}</span>
      </div>
    </div>
  </div>
));

DoWhileBlockRenderer.displayName = 'DoWhileBlockRenderer';

// For Block Component
const ForBlockRenderer = memo(({ 
  block, 
  depth, 
  isSelected, 
  baseClasses,
  selectedId,
  onSelect,
  onUpdate,
  onDelete,
  onAddToContainer
}: { 
  block: ForBlock; 
  depth: number; 
  isSelected: boolean; 
  baseClasses: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StruktogrammBlock>) => void;
  onDelete: (id: string) => void;
  onAddToContainer?: (parentId: string, type: string) => void;
}) => (
  <div className={cn(baseClasses, 'bg-card overflow-hidden')}>
    {/* Loop header */}
    <div 
      className="bg-cyan-500/10 p-2 cursor-pointer border-b border-cyan-500/30"
      onClick={() => onSelect(block.id)}
    >
      <div className="flex items-center gap-2">
        <span className="text-cyan-500">🔢</span>
        <span className="text-xs text-muted-foreground">für</span>
        <span className="font-mono text-sm">
          <span className="font-semibold">{block.variable}</span>
          <span className="text-muted-foreground"> = </span>
          <span>{block.start}</span>
          <span className="text-muted-foreground"> bis </span>
          <span>{block.end}</span>
          {block.step && (
            <>
              <span className="text-muted-foreground"> Schritt </span>
              <span>{block.step}</span>
            </>
          )}
        </span>
      </div>
    </div>
    
    {/* Body with left bar */}
    <div className="flex">
      <div className="w-4 bg-cyan-500/20 border-r-2 border-cyan-500/50" />
      <div className="flex-1 p-2 min-h-[40px]">
        {block.body.length > 0 ? (
          <div className="space-y-1">
            {block.body.map(child => (
              <BlockRenderer 
                key={child.id} 
                block={child} 
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAddToContainer={onAddToContainer}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
            (Schleifenkörper)
          </div>
        )}
      </div>
    </div>
  </div>
));

ForBlockRenderer.displayName = 'ForBlockRenderer';

// Switch Block Component
const SwitchBlockRenderer = memo(({ 
  block, 
  depth, 
  isSelected, 
  baseClasses,
  selectedId,
  onSelect,
  onUpdate,
  onDelete,
  onAddToContainer
}: { 
  block: SwitchBlock; 
  depth: number; 
  isSelected: boolean; 
  baseClasses: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StruktogrammBlock>) => void;
  onDelete: (id: string) => void;
  onAddToContainer?: (parentId: string, type: string) => void;
}) => (
  <div className={cn(baseClasses, 'bg-card overflow-hidden')}>
    {/* Expression header */}
    <div 
      className="bg-orange-500/10 p-2 cursor-pointer border-b border-orange-500/30"
      onClick={() => onSelect(block.id)}
    >
      <div className="flex items-center gap-2">
        <span className="text-orange-500">⧉</span>
        <span className="text-xs text-muted-foreground">Fall:</span>
        <span className="font-mono text-sm font-medium">{block.expression}</span>
      </div>
    </div>
    
    {/* Cases */}
    <div className="flex divide-x divide-border">
      {block.cases.map((caseItem, idx) => (
        <div key={idx} className="flex-1 min-w-[80px]">
          <div className="bg-orange-500/5 px-2 py-1 text-center text-xs font-medium border-b border-border">
            {caseItem.value}
          </div>
          <div className="p-2 min-h-[40px]">
            {caseItem.blocks.length > 0 ? (
              <div className="space-y-1">
                {caseItem.blocks.map(child => (
                  <BlockRenderer 
                    key={child.id} 
                    block={child} 
                    depth={depth + 1}
                    selectedId={selectedId}
                    onSelect={onSelect}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onAddToContainer={onAddToContainer}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
                (leer)
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
));

SwitchBlockRenderer.displayName = 'SwitchBlockRenderer';
