import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { THEORY_SECTIONS, EAR_LABELS, FourEarsMessage, EarType } from '@/types/communication';
import { BookOpen, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function TheoryView() {
  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Das 4-Ohren-Modell nach Schulz von Thun
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Jede Nachricht enthält vier Botschaften gleichzeitig. Lerne, alle vier Seiten zu erkennen 
            und Missverständnisse zu vermeiden.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.entries(EAR_LABELS) as [EarType, typeof EAR_LABELS[EarType]][]).map(([key, ear]) => (
              <div 
                key={key}
                className={`p-3 rounded-lg border text-center bg-${ear.color}-500/10 border-${ear.color}-500/30`}
              >
                <div className="text-2xl mb-1">{ear.icon}</div>
                <div className="text-sm font-medium">{ear.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theory Sections */}
      <Accordion type="single" collapsible className="space-y-2">
        {THEORY_SECTIONS.map((section, index) => (
          <AccordionItem 
            key={section.id} 
            value={section.id}
            className="border rounded-lg bg-card/50 px-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </Badge>
                <span className="font-medium">{section.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{section.content}</ReactMarkdown>
              </div>
              
              {section.example && (
                <ExampleMessage message={section.example} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Quick Reference */}
      <Card className="bg-muted/30 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Schnellreferenz: Die vier Fragen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.entries(EAR_LABELS) as [EarType, typeof EAR_LABELS[EarType]][]).map(([key, ear]) => (
              <div 
                key={key}
                className="p-3 rounded-lg border bg-card/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{ear.icon}</span>
                  <span className="font-medium">{ear.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{ear.question}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExampleMessage({ message }: { message: FourEarsMessage }) {
  return (
    <div className="mt-4 p-4 rounded-lg bg-muted/50 border">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-yellow-500" />
        <span className="font-medium text-sm">Beispiel</span>
      </div>
      <div className="mb-4 p-3 bg-card rounded border-l-4 border-primary">
        <p className="font-medium italic">"{message.text}"</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <EarBadge ear="sachinhalt" text={message.sachinhalt} />
        <EarBadge ear="selbstkundgabe" text={message.selbstkundgabe} />
        <EarBadge ear="beziehung" text={message.beziehung} />
        <EarBadge ear="appell" text={message.appell} />
      </div>
    </div>
  );
}

function EarBadge({ ear, text }: { ear: EarType; text: string }) {
  const label = EAR_LABELS[ear];
  return (
    <div className="p-2 rounded border bg-card/50 text-sm">
      <div className="flex items-center gap-1 mb-1">
        <span>{label.icon}</span>
        <span className="font-medium text-xs">{label.name}</span>
      </div>
      <p className="text-muted-foreground text-xs">{text}</p>
    </div>
  );
}
