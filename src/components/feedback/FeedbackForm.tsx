import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().trim().max(100, "Name darf maximal 100 Zeichen lang sein"),
  message: z.string().trim().min(1, "Feedback ist erforderlich").max(1000, "Feedback darf maximal 1000 Zeichen lang sein")
});

export const FeedbackForm = ({ onFeedbackSubmitted }: { onFeedbackSubmitted?: () => void }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
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
      message: feedback
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
      onFeedbackSubmitted?.();
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Fehler",
        description: "Feedback konnte nicht gesendet werden. Versuche es später erneut.",
        variant: "destructive",
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