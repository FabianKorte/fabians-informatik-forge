import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Lightbulb, PlayCircle, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";

interface RoadmapItem {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: number;
  category: string | null;
  estimated_completion: string | null;
  completion_date: string | null;
  created_at: string;
  updated_at: string;
}

const statusIcons: Record<string, any> = {
  planned: Lightbulb,
  in_progress: PlayCircle,
  completed: CheckCircle2,
  on_hold: Clock,
};

const statusColors: Record<string, string> = {
  planned: "bg-muted text-muted-foreground border-border",
  in_progress: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-success/10 text-success border-success/20",
  on_hold: "bg-warning/10 text-warning border-warning/20",
};

const statusLabels: Record<string, string> = {
  planned: "Geplant",
  in_progress: "In Arbeit",
  completed: "Fertiggestellt",
  on_hold: "Pausiert",
};

export default function Roadmap() {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const { data, error } = await supabase
        .from("roadmap")
        .select("*")
        .order("priority", { ascending: false })
        .order("created_at", { ascending: true });

      if (error) throw error;
      setRoadmapItems(data || []);
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Roadmap konnte nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const { completedCount, totalCount, overallProgress } = useMemo(() => {
    const total = roadmapItems.length;
    const completed = roadmapItems.filter((item) => item.status === "completed").length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return {
      completedCount: completed,
      totalCount: total,
      overallProgress: progress,
    };
  }, [roadmapItems]);

  const groupedByStatus = useMemo(() => {
    const groups: Record<string, RoadmapItem[]> = {
      in_progress: [],
      planned: [],
      on_hold: [],
      completed: [],
    };

    roadmapItems.forEach((item) => {
      if (groups[item.status]) {
        groups[item.status].push(item);
      }
    });

    return groups;
  }, [roadmapItems]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Entwicklungs-Roadmap"
        description="Verfolgen Sie die Entwicklung und geplante Features der Fabian Korte Lernplattform."
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Entwicklungs-Roadmap
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Verfolge die Entwicklung der Plattform und erfahre, welche Features als nächstes kommen.
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="p-6 mb-12 bg-gradient-to-br from-card to-card/50 border-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Gesamtfortschritt</h2>
                <span className="text-2xl font-bold text-primary">
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <Progress value={overallProgress} className="h-3" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {Object.entries(groupedByStatus).map(([status, items]) => {
                  const Icon = statusIcons[status];
                  return (
                    <div key={status} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          {statusLabels[status]}
                        </span>
                      </div>
                      <p className="text-2xl font-bold">{items.length}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

            <div className="space-y-8">
              {Object.entries(groupedByStatus).map(([status, items]) => {
                if (items.length === 0) return null;

                return (
                  <div key={status} className="space-y-6">
                    <div className="flex items-center gap-4 ml-4">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${statusColors[status]} z-10`}>
                        {React.createElement(statusIcons[status], { className: "h-5 w-5" })}
                      </div>
                      <h3 className="text-2xl font-bold">{statusLabels[status]}</h3>
                    </div>

                    <div className="ml-20 space-y-4">
                      {items.map((item) => {
                        const Icon = statusIcons[item.status];
                        return (
                          <Card
                            key={item.id}
                            className="p-6 hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-l-4"
                            style={{
                              borderLeftColor: `hsl(var(--${item.status === "completed" ? "success" : item.status === "in_progress" ? "primary" : "muted"}))`,
                            }}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                  <h4 className="text-lg font-semibold">{item.title}</h4>
                                  {item.category && (
                                    <Badge variant="outline" className="text-xs">
                                      {item.category}
                                    </Badge>
                                  )}
                                  <Badge className={statusColors[item.status]}>
                                    {statusLabels[item.status]}
                                  </Badge>
                                </div>
                                {item.description && (
                                  <p className="text-muted-foreground">{item.description}</p>
                                )}
                                {item.estimated_completion && item.status !== "completed" && (
                                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Geplant für: {new Date(item.estimated_completion).toLocaleDateString("de-DE")}
                                  </p>
                                )}
                                {item.completion_date && item.status === "completed" && (
                                  <p className="text-sm text-success flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Fertiggestellt: {new Date(item.completion_date).toLocaleDateString("de-DE")}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {roadmapItems.length === 0 && (
            <Card className="p-12 text-center">
              <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Keine Roadmap-Einträge</h3>
              <p className="text-muted-foreground">
                Aktuell sind keine Features in der Roadmap vorhanden.
              </p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
