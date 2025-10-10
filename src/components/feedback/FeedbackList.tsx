import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare, RefreshCw, User, Clock, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface Feedback {
  id: string;
  name: string;
  message: string;
  created_at: string;
  status: string;
}

export const FeedbackList = ({ refreshTrigger }: { refreshTrigger?: number }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const { isAdmin } = useAuth();

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setHasAccess(true);
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setHasAccess(false);
      setFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [refreshTrigger, isAdmin]);

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

  // Show access restricted message for non-admins
  if (!isLoading && !hasAccess) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Feedback-Übersicht
          </CardTitle>
          <CardDescription>
            Feedbacks können nur von Administratoren eingesehen werden.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">Geschützter Bereich</p>
            <p className="text-sm text-muted-foreground">
              Um Feedbacks einzusehen, melde dich als Administrator an.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Feedback-Verwaltung
          <Badge variant="secondary" className="ml-auto">
            {feedbacks.length} Einträge
          </Badge>
        </CardTitle>
        <CardDescription>
          Übersicht aller eingereichten Feedbacks (nur für Admins sichtbar).
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
                    {feedback.status && (
                      <Badge variant={
                        feedback.status === 'resolved' ? 'default' :
                        feedback.status === 'in_progress' ? 'secondary' :
                        'outline'
                      } className="text-xs">
                        {feedback.status === 'new' ? 'Neu' :
                         feedback.status === 'in_progress' ? 'In Arbeit' :
                         'Erledigt'}
                      </Badge>
                    )}
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