import { useState } from 'react';
import { useStruktogramm } from '@/hooks/useStruktogramm';
import { ScenarioSelector, ExercisePanel } from './ScenarioSelector';
import { BlockRenderer } from './BlockRenderer';
import { BlockToolbar } from './BlockToolbar';
import { BlockEditor } from './BlockEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Save, 
  FolderOpen, 
  Trash2, 
  ArrowLeft,
  FileText,
  Download
} from 'lucide-react';
import type { BlockType, StruktogrammExercise } from '@/types/struktogramm';
import { struktogrammScenarios } from '@/data/struktogrammExercises';

export const StruktogrammTool = () => {
  const {
    state,
    scenarios,
    templates,
    currentExercise,
    createDiagram,
    loadTemplate,
    loadDiagram,
    saveDiagram,
    deleteDiagram,
    closeDiagram,
    updateDiagramTitle,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    selectBlock,
    copyBlock,
    pasteBlock,
    startExercise,
    completeExercise,
    isExerciseCompleted
  } = useStruktogramm();

  const [showSaved, setShowSaved] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  // Find current exercise object
  const currentExerciseObj: StruktogrammExercise | undefined = currentExercise 
    ? struktogrammScenarios
        .flatMap(s => s.exercises)
        .find(e => e.id === currentExercise)
    : undefined;

  // If no diagram is open, show scenario selector or saved diagrams
  if (!state.currentDiagram) {
    if (showSaved) {
      return (
        <div className="container mx-auto p-4 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setShowSaved(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
            <h2 className="text-xl font-bold">Gespeicherte Diagramme</h2>
            <div />
          </div>
          
          {state.savedDiagrams.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Noch keine Diagramme gespeichert</p>
                <Button className="mt-4" onClick={() => { setShowSaved(false); createDiagram(); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neues Diagramm erstellen
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {state.savedDiagrams.map(diagram => (
                <Card key={diagram.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="py-3 flex items-center justify-between">
                    <div onClick={() => loadDiagram(diagram.id)}>
                      <h3 className="font-medium">{diagram.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {diagram.blocks.length} Blöcke • Zuletzt geändert: {new Date(diagram.updatedAt).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive"
                      onClick={(e) => { e.stopPropagation(); deleteDiagram(diagram.id); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (showTemplates) {
      return (
        <div className="container mx-auto p-4 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setShowTemplates(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
            <h2 className="text-xl font-bold">Vorlagen</h2>
            <div />
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2">
            {templates.map(template => (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => loadTemplate(template.id)}
              >
                <CardContent className="py-4">
                  <h3 className="font-medium">{template.title}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  <Badge variant="outline" className="mt-2">
                    {template.blocks.length} Blöcke
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4 max-w-5xl">
        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <Button onClick={() => createDiagram()}>
            <Plus className="h-4 w-4 mr-2" />
            Neues Diagramm
          </Button>
          <Button variant="outline" onClick={() => setShowTemplates(true)}>
            <Download className="h-4 w-4 mr-2" />
            Vorlage verwenden
          </Button>
          <Button variant="outline" onClick={() => setShowSaved(true)}>
            <FolderOpen className="h-4 w-4 mr-2" />
            Gespeicherte ({state.savedDiagrams.length})
          </Button>
        </div>

        <ScenarioSelector 
          scenarios={scenarios}
          onSelectExercise={startExercise}
          isExerciseCompleted={isExerciseCompleted}
        />
      </div>
    );
  }

  // Find selected block
  const findBlock = (blocks: any[], id: string): any => {
    for (const block of blocks) {
      if (block.id === id) return block;
      if ('body' in block) {
        const found = findBlock(block.body, id);
        if (found) return found;
      }
      if ('thenBranch' in block) {
        const found = findBlock(block.thenBranch, id) || findBlock(block.elseBranch, id);
        if (found) return found;
      }
      if ('cases' in block) {
        for (const c of block.cases) {
          const found = findBlock(c.blocks, id);
          if (found) return found;
        }
      }
    }
    return null;
  };

  const selectedBlock = state.selectedBlock 
    ? findBlock(state.currentDiagram.blocks, state.selectedBlock)
    : null;

  const handleAddBlock = (type: BlockType) => {
    addBlock(type);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Exercise panel or empty space */}
        <div className="lg:col-span-3">
          {currentExerciseObj ? (
            <ExercisePanel 
              exercise={currentExerciseObj}
              onExit={closeDiagram}
              onComplete={() => completeExercise(currentExerciseObj.id)}
              isCompleted={isExerciseCompleted(currentExerciseObj.id)}
            />
          ) : (
            <Card className="h-full">
              <CardHeader className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" onClick={closeDiagram}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Zurück
                  </Button>
                  <Button size="sm" onClick={saveDiagram}>
                    <Save className="h-4 w-4 mr-1" />
                    Speichern
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Input
                  value={state.currentDiagram.title}
                  onChange={(e) => updateDiagramTitle(e.target.value)}
                  className="font-medium"
                  placeholder="Diagramm-Titel"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {state.currentDiagram.blocks.length} Blöcke
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Center: Diagram */}
        <div className="lg:col-span-6">
          <Card className="h-full">
            <CardHeader className="py-2 px-4 border-b">
              <BlockToolbar onAddBlock={handleAddBlock} />
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[500px]">
                {state.currentDiagram.blocks.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="text-4xl mb-4">📐</div>
                    <p className="text-muted-foreground mb-2">Diagramm ist leer</p>
                    <p className="text-sm text-muted-foreground">
                      Klicke auf die Symbole oben, um Blöcke hinzuzufügen
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 p-2 border-2 border-dashed border-muted rounded-lg min-h-[400px]">
                    {state.currentDiagram.blocks.map(block => (
                      <BlockRenderer
                        key={block.id}
                        block={block}
                        depth={0}
                        selectedId={state.selectedBlock}
                        onSelect={selectBlock}
                        onUpdate={updateBlock}
                        onDelete={deleteBlock}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right: Block editor */}
        <div className="lg:col-span-3">
          <BlockEditor
            block={selectedBlock}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            onMove={moveBlock}
            onCopy={copyBlock}
            onDeselect={() => selectBlock(null)}
          />
        </div>
      </div>
    </div>
  );
};
