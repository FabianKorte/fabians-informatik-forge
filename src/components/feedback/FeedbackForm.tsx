import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";

export const FeedbackForm = ({ onFeedbackSubmitted }: { onFeedbackSubmitted?: () => void }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte gib dein Feedback ein.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('feedbacks')
        .insert([{
          name: name.trim() || 'Anonym',
          message: feedback.trim(),
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

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