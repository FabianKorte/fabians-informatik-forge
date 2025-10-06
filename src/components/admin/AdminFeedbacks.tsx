import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Feedback {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Fehler",
        description: "Konnte Feedbacks nicht laden",
        variant: "destructive",
      });
    } else {
      setFeedbacks(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Möchtest du dieses Feedback wirklich löschen?")) return;

    const { error } = await supabase
      .from('feedbacks')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Konnte Feedback nicht löschen",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolg",
        description: "Feedback wurde gelöscht",
      });
      fetchFeedbacks();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Feedbacks verwalten</h3>
          <p className="text-sm text-muted-foreground">
            {feedbacks.length} {feedbacks.length === 1 ? "Feedback" : "Feedbacks"} vorhanden
          </p>
        </div>
        <Button variant="outline" onClick={fetchFeedbacks}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Aktualisieren
        </Button>
      </div>

      {feedbacks.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          Noch keine Feedbacks vorhanden
        </Card>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{feedback.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(feedback.created_at), "PPp", { locale: de })}
                    </span>
                  </div>
                  <p className="text-sm">{feedback.message}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDelete(feedback.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
