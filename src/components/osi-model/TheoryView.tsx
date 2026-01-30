import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent } from "@/components/ui/card";
import { OSI_LAYERS } from "@/types/osiModel";
import { cn } from "@/lib/utils";

interface TheoryViewProps {
  content: string;
}

export function TheoryView({ content }: TheoryViewProps) {
  return (
    <div className="space-y-6">
      {/* Markdown Content */}
      <Card>
        <CardContent className="pt-6 prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </CardContent>
      </Card>

      {/* Visual Layer Stack */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-bold mb-4">Visuelle Darstellung</h3>
          <div className="space-y-2">
            {OSI_LAYERS.map((layer) => (
              <div
                key={layer.number}
                className={cn(
                  "p-4 rounded-lg bg-gradient-to-r text-white",
                  layer.color
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-lg">
                      Schicht {layer.number}: {layer.germanName}
                    </span>
                    <span className="text-white/70 ml-2 text-sm">({layer.name})</span>
                  </div>
                </div>
                <p className="text-sm text-white/80 mt-1">{layer.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {layer.examples.slice(0, 4).map((example) => (
                    <span 
                      key={example}
                      className="px-2 py-0.5 bg-white/20 rounded text-xs"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
