import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Send, ArrowLeft } from 'lucide-react';

export default function ReportError() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: 'Fehlende Angaben',
        description: 'Bitte füllen Sie mindestens Titel und Beschreibung aus.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const browserInfo = `${navigator.userAgent} | ${window.screen.width}x${window.screen.height}`;

    const { error } = await supabase
      .from('error_reports')
      .insert({
        user_id: user?.id || null,
        title: formData.title,
        description: formData.description,
        steps_to_reproduce: formData.stepsToReproduce || null,
        expected_behavior: formData.expectedBehavior || null,
        actual_behavior: formData.actualBehavior || null,
        priority: formData.priority,
        browser_info: browserInfo,
        status: 'open',
      });

    setLoading(false);

    if (error) {
      toast({
        title: 'Fehler beim Senden',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Fehlerbericht gesendet',
        description: 'Vielen Dank für Ihre Meldung! Wir werden uns den Fehler ansehen.',
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-4">
      <div className="container max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Fehler melden
            </CardTitle>
            <CardDescription>
              Helfen Sie uns, die Plattform zu verbessern, indem Sie Fehler melden
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">
                  Titel <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Kurze Zusammenfassung des Fehlers"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">
                  Beschreibung <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detaillierte Beschreibung des Fehlers"
                  required
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="priority">Priorität</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger id="priority" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Niedrig - Kleinerer Fehler</SelectItem>
                    <SelectItem value="medium">Mittel - Beeinträchtigt Nutzung</SelectItem>
                    <SelectItem value="high">Hoch - Wichtige Funktion betroffen</SelectItem>
                    <SelectItem value="critical">Kritisch - App nicht nutzbar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="stepsToReproduce">Schritte zur Reproduktion</Label>
                <Textarea
                  id="stepsToReproduce"
                  value={formData.stepsToReproduce}
                  onChange={(e) => setFormData({ ...formData, stepsToReproduce: e.target.value })}
                  placeholder="1. Gehe zu...&#10;2. Klicke auf...&#10;3. Fehler tritt auf..."
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="expectedBehavior">Erwartetes Verhalten</Label>
                <Textarea
                  id="expectedBehavior"
                  value={formData.expectedBehavior}
                  onChange={(e) => setFormData({ ...formData, expectedBehavior: e.target.value })}
                  placeholder="Was sollte eigentlich passieren?"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="actualBehavior">Tatsächliches Verhalten</Label>
                <Textarea
                  id="actualBehavior"
                  value={formData.actualBehavior}
                  onChange={(e) => setFormData({ ...formData, actualBehavior: e.target.value })}
                  placeholder="Was passiert stattdessen?"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Hinweis:</strong> Browser- und Geräteinformationen werden automatisch erfasst, 
                  um die Fehlersuche zu erleichtern.
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Abbrechen
                </Button>
                <Button type="submit" disabled={loading}>
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? 'Wird gesendet...' : 'Fehler melden'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}