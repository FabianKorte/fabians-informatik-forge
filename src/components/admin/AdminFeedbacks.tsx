import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, RefreshCw, Circle, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Feedback {
  id: string;
  name: string;
  message: string;
  created_at: string;
  status: string;
}

const ITEMS_PER_PAGE = 10;

export const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    
    const abortController = new AbortController();
    
    try {
      // Get total count
      const { count } = await supabase
        .from('feedbacks')
        .select('*', { count: 'exact', head: true });
      
      setTotalCount(count || 0);

      // Get paginated data
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to)
        .abortSignal(abortController.signal);

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        toast({
          title: "Fehler",
          description: "Konnte Feedbacks nicht laden",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [currentPage]);

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

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('feedbacks')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Konnte Status nicht ändern",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolg",
        description: "Status wurde aktualisiert",
      });
      fetchFeedbacks();
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    
    if (!confirm(`Möchtest du ${selectedIds.size} Feedbacks wirklich löschen?`)) return;

    const { error } = await supabase
      .from('feedbacks')
      .delete()
      .in('id', Array.from(selectedIds));

    if (error) {
      toast({
        title: "Fehler",
        description: "Konnte Feedbacks nicht löschen",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolg",
        description: `${selectedIds.size} Feedbacks wurden gelöscht`,
      });
      setSelectedIds(new Set());
      fetchFeedbacks();
    }
  };

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === feedbacks.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(feedbacks.map(f => f.id)));
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
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
            {selectedIds.size > 0 && ` (${selectedIds.size} ausgewählt)`}
          </p>
        </div>
        <div className="flex gap-2">
          {selectedIds.size > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              {selectedIds.size} löschen
            </Button>
          )}
          <Button variant="outline" onClick={fetchFeedbacks}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Aktualisieren
          </Button>
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          Noch keine Feedbacks vorhanden
        </Card>
      ) : (
        <div className="space-y-4">
          {feedbacks.length > 0 && (
            <div className="flex items-center gap-2 pb-2 border-b">
              <Checkbox
                checked={selectedIds.size === feedbacks.length}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm text-muted-foreground">Alle auswählen</span>
            </div>
          )}
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Checkbox
                    checked={selectedIds.has(feedback.id)}
                    onCheckedChange={() => toggleSelection(feedback.id)}
                  />
                  <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{feedback.name}</span>
                    <Badge variant={
                      feedback.status === 'resolved' ? 'default' :
                      feedback.status === 'in_progress' ? 'secondary' :
                      'outline'
                    }>
                      <Circle className="w-2 h-2 mr-1 fill-current" />
                      {feedback.status === 'new' ? 'Neu' :
                       feedback.status === 'in_progress' ? 'In Arbeit' :
                       'Erledigt'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(feedback.created_at), "PPp", { locale: de })}
                    </span>
                  </div>
                  <p className="text-sm mb-3">{feedback.message}</p>
                  <Select 
                    value={feedback.status} 
                    onValueChange={(value) => handleStatusChange(feedback.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Neu</SelectItem>
                      <SelectItem value="in_progress">In Arbeit</SelectItem>
                      <SelectItem value="resolved">Erledigt</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Seite {currentPage} von {totalPages} ({totalCount} gesamt)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Zurück
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Weiter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
