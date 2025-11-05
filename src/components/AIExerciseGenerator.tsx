import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { logger } from '@/lib/logger';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AIExerciseGeneratorProps {
  categoryId: string;
  onGenerated?: (content: any) => void;
}

export function AIExerciseGenerator({ categoryId, onGenerated }: AIExerciseGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [moduleType, setModuleType] = useState<'flashcards' | 'quiz'>('flashcards');
  const [difficulty, setDifficulty] = useState('mittel');
  const [count, setCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Fehler',
        description: 'Bitte gib ein Thema ein.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-ai-exercises', {
        body: {
          categoryId,
          moduleType,
          topic,
          difficulty,
          count
        }
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: 'Fehler',
          description: data.error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Erfolgreich generiert!',
        description: `${count} ${moduleType === 'flashcards' ? 'Karteikarten' : 'Fragen'} wurden erstellt.`,
      });

      if (onGenerated) {
        onGenerated(data.content);
      }

      // Reset form
      setTopic('');
    } catch (error: any) {
      logger.error('Generation error:', error);
      toast({
        title: 'Fehler',
        description: error.message || 'Die Generierung ist fehlgeschlagen.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">AI-Übungsgenerator</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Thema</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="z.B. Netzwerkprotokolle, SQL-Joins, OOP-Prinzipien..."
            disabled={isGenerating}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Typ</Label>
            <Select value={moduleType} onValueChange={(v: any) => setModuleType(v)}>
              <SelectTrigger id="type" disabled={isGenerating}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flashcards">Karteikarten</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Schwierigkeit</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger id="difficulty" disabled={isGenerating}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="einfach">Einfach</SelectItem>
                <SelectItem value="mittel">Mittel</SelectItem>
                <SelectItem value="schwer">Schwer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="count">Anzahl</Label>
          <Select value={count.toString()} onValueChange={(v) => setCount(parseInt(v))}>
            <SelectTrigger id="count" disabled={isGenerating}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !topic.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generiere...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Übungen generieren
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}