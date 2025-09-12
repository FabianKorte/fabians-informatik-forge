import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Timeline } from "@/types/learn";

interface TimelineViewProps {
  timelines: Timeline[];
}

export const TimelineView = ({ timelines }: TimelineViewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const current = timelines[currentIndex];

  const next = () => {
    if (currentIndex < timelines.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedEvent(null);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{current.title}</h3>
        <p className="text-muted-foreground mb-6">{current.description}</p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30"></div>
          
          <div className="space-y-6">
            {current.events.map((event, index) => (
              <div key={index} className="relative flex items-start gap-6">
                {/* Timeline dot */}
                <div 
                  className={`relative z-10 w-8 h-8 rounded-full border-4 border-card flex items-center justify-center cursor-pointer transition-all ${
                    selectedEvent === index 
                      ? 'bg-primary border-primary shadow-lg scale-110' 
                      : 'bg-primary/20 border-primary/30 hover:bg-primary/30'
                  }`}
                  onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                >
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
                
                {/* Event content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {event.year}
                    </Badge>
                    <h4 className="font-semibold text-foreground">{event.event}</h4>
                  </div>
                  
                  {selectedEvent === index && (
                    <div className="mt-3 p-4 rounded-lg bg-secondary/50 border border-border/50 animate-fade-in">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Klicke auf die Punkte, um mehr zu erfahren
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prev} disabled={currentIndex === 0}>
          Vorherige
        </Button>
        <span className="text-sm text-muted-foreground">
          Timeline {currentIndex + 1} von {timelines.length}
        </span>
        <Button onClick={next} disabled={currentIndex === timelines.length - 1}>
          Nächste
        </Button>
      </div>
    </div>
  );
};