import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, RefreshCw, User, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface Feedback {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export const FeedbackList = ({ refreshTrigger }: { refreshTrigger?: number }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      if (!supabase) {
        setFeedbacks([]);
        return;
      }

      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Feedback wird geladen...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Öffentliches Feedback
          <Badge variant="secondary" className="ml-auto">
            {feedbacks.length} Einträge
          </Badge>
        </CardTitle>
        <CardDescription>
          Alle eingereichten Feedbacks sind hier öffentlich einsehbar.
        </CardDescription>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchFeedbacks}
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Aktualisieren
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedbacks.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">Noch kein Feedback vorhanden.</p>
            <p className="text-sm text-muted-foreground">Sei der Erste, der Feedback gibt!</p>
          </div>
        ) : (
          feedbacks.map((feedback, index) => (
            <div key={feedback.id}>
              {index > 0 && <Separator className="my-4" />}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{feedback.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(feedback.created_at), {
                      addSuffix: true,
                      locale: de
                    })}
                  </div>
                </div>
                <p className="text-sm leading-relaxed pl-6">{feedback.message}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};