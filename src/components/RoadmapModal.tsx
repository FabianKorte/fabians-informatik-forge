import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, AlertCircle, CheckCircle2, Clock, Pause } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RoadmapItem {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: number;
  category: string | null;
  estimated_completion: string | null;
  completion_date: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface RoadmapModalProps {
  children: React.ReactNode;
}

const statusIcons = {
  planned: AlertCircle,
  'in-progress': Clock,
  completed: CheckCircle2,
  'on-hold': Pause,
};

const statusColors = {
  planned: 'bg-muted text-muted-foreground',
  'in-progress': 'bg-accent text-accent-foreground',
  completed: 'bg-success text-success-foreground',
  'on-hold': 'bg-warning text-warning-foreground',
};

const statusLabels = {
  planned: 'Geplant',
  'in-progress': 'In Bearbeitung',
  completed: 'Abgeschlossen',
  'on-hold': 'Pausiert',
};

export const RoadmapModal = ({ children }: RoadmapModalProps) => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchRoadmapItems = async () => {
    try {
      const { data, error } = await supabase
        .from('roadmap')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching roadmap:', error);
        return;
      }

      setRoadmapItems(data || []);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchRoadmapItems();
    }
  }, [open]);

  const getProgress = () => {
    const completed = roadmapItems.filter(item => item.status === 'completed').length;
    return roadmapItems.length > 0 ? (completed / roadmapItems.length) * 100 : 0;
  };

  const groupedItems = roadmapItems.reduce((acc, item) => {
    const category = item.category || 'Allgemein';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, RoadmapItem[]>);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Entwicklungs-Roadmap
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
            <p className="text-muted-foreground mt-4">Lade Roadmap...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gesamtfortschritt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={getProgress()} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{roadmapItems.filter(item => item.status === 'completed').length} von {roadmapItems.length} abgeschlossen</span>
                    <span>{Math.round(getProgress())}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(statusLabels).map(([status, label]) => {
                const count = roadmapItems.filter(item => item.status === status).length;
                const IconComponent = statusIcons[status as keyof typeof statusIcons];
                return (
                  <Card key={status} className="text-center">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <IconComponent className="w-4 h-4" />
                        <span className="font-medium">{count}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-6">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <span className="text-accent">{category}</span>
                    <Badge variant="outline" className="text-xs">
                      {items.length} Elemente
                    </Badge>
                  </h3>
                  
                  <div className="space-y-3">
                    {items.map((item) => {
                      const statusKey = item.status as keyof typeof statusIcons;
                      const StatusIcon = statusIcons[statusKey] || AlertCircle;
                      const statusColor = statusColors[statusKey] || statusColors.planned;
                      const statusLabel = statusLabels[statusKey] || 'Unbekannt';
                      
                      return (
                        <Card key={item.id} className="border-l-4 border-l-accent/30">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium text-foreground">{item.title}</h4>
                                  <Badge 
                                    className={`text-xs ${statusColor}`}
                                  >
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {statusLabel}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Priorität {item.priority}
                                  </Badge>
                                </div>
                                
                                {item.description && (
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {item.description}
                                  </p>
                                )}
                                
                                {item.estimated_completion && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    <span>Geplant für: {new Date(item.estimated_completion).toLocaleDateString('de-DE')}</span>
                                  </div>
                                )}
                                
                                {item.completion_date && (
                                  <div className="flex items-center gap-1 text-xs text-success">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Abgeschlossen: {new Date(item.completion_date).toLocaleDateString('de-DE')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {roadmapItems.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Keine Roadmap-Elemente</h3>
                  <p className="text-muted-foreground">
                    Momentan sind keine Entwicklungspläne verfügbar.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};