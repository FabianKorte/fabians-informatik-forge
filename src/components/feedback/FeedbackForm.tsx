import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, Bug, Lightbulb, MessageSquare, Star } from "lucide-react";
import { z } from "zod";
import { logger } from "@/lib/logger";
import { handleError } from "@/lib/errorHandler";

const FEEDBACK_CATEGORIES = {
  general: { label: 'Allgemein', icon: MessageSquare, color: 'text-gray-500' },
  bug: { label: 'Fehlermeldung', icon: Bug, color: 'text-red-500' },
  feature: { label: 'Feature-Wunsch', icon: Star, color: 'text-yellow-500' },
  suggestion: { label: 'Verbesserungsvorschlag', icon: Lightbulb, color: 'text-blue-500' },
  content: { label: 'Inhaltsfehler', icon: MessageSquare, color: 'text-orange-500' },
  ui: { label: 'Design/UI', icon: Star, color: 'text-purple-500' },
  performance: { label: 'Performance', icon: Bug, color: 'text-pink-500' },
};

const feedbackSchema = z.object({
  name: z.string().trim().max(100, "Name darf maximal 100 Zeichen lang sein"),
  message: z.string().trim().min(1, "Feedback ist erforderlich").max(1000, "Feedback darf maximal 1000 Zeichen lang sein"),
  category: z.enum(['general', 'bug', 'feature', 'suggestion', 'content', 'ui', 'performance'])
});

const FeedbackForm = ({ onFeedbackSubmitted }: { onFeedbackSubmitted?: () => void }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState<keyof typeof FEEDBACK_CATEGORIES>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabase) {
      toast({
        title: "Fehler",
        description: "Feedback-System ist nicht verfügbar.",
        variant: "destructive",
      });
      return;
    }
    
    // Check 24h rate limit
    const lastSubmission = localStorage.getItem('lastFeedbackSubmission');
    if (lastSubmission) {
      const hoursSinceLastSubmission = (Date.now() - parseInt(lastSubmission)) / (1000 * 60 * 60);
      if (hoursSinceLastSubmission < 24) {
        const hoursRemaining = Math.ceil(24 - hoursSinceLastSubmission);
        toast({
          title: "Zu früh",
          description: `Du kannst nur alle 24 Stunden Feedback senden. Versuche es in ${hoursRemaining} Stunde(n) erneut.`,
          variant: "destructive",
        });
        return;
      }
    }
    
    // Validate input with zod
    const validationResult = feedbackSchema.safeParse({
      name: name,
      message: feedback,
      category: category
    });
    
    if (!validationResult.success) {
      toast({
        title: "Eingabefehler",
        description: validationResult.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const sanitizedData = validationResult.data;
      const { error } = await supabase
        .from('feedbacks')
        .insert([{
          name: sanitizedData.name || 'Anonym',
          message: sanitizedData.message,
          category: sanitizedData.category,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      // Store submission timestamp
      localStorage.setItem('lastFeedbackSubmission', Date.now().toString());
      
      toast({
        title: "Feedback gesendet!",
        description: "Vielen Dank für dein Feedback.",
      });
      
      setName("");
      setFeedback("");
      setCategory('general');
      onFeedbackSubmitted?.();
      
    } catch (error) {
      handleError(error, {
        title: "Fehler beim Senden",
        description: "Feedback konnte nicht gesendet werden",
        logError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Feedback senden
        </CardTitle>
        <CardDescription>
          Teile deine Gedanken und Verbesserungsvorschläge mit uns.
          <br />
          <span className="text-xs text-muted-foreground">
            Hinweis: Feedbacks sind nur für Administratoren sichtbar und werden vertraulich behandelt.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              placeholder="Dein Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategorie *</Label>
            <Select value={category} onValueChange={(value: any) => setCategory(value)}>
              <SelectTrigger id="category" disabled={isSubmitting}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(FEEDBACK_CATEGORIES).map(([key, { label, icon: Icon, color }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${color}`} />
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback *</Label>
            <Textarea
              id="feedback"
              placeholder="Schreibe hier dein Feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              disabled={isSubmitting}
              rows={4}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Feedback senden
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(FeedbackForm);
