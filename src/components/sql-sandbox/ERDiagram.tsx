import { useMemo } from 'react';
import type { ERModel } from '@/types/sqlSandbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Key, Link } from 'lucide-react';

interface ERDiagramProps {
  erModel: ERModel;
}

export function ERDiagram({ erModel }: ERDiagramProps) {
  const relationships = useMemo(() => {
    const rels: { from: string; fromCol: string; to: string; toCol: string }[] = [];
    
    erModel.tables.forEach(table => {
      table.columns.forEach(col => {
        if (col.foreignKey) {
          rels.push({
            from: table.name,
            fromCol: col.name,
            to: col.foreignKey.table,
            toCol: col.foreignKey.column,
          });
        }
      });
    });
    
    return rels;
  }, [erModel]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Database className="h-4 w-4" />
        <span>{erModel.name}</span>
      </div>
      
      {/* Table Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {erModel.tables.map(table => (
          <Card key={table.name} className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                {table.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {table.columns.map(col => (
                  <div 
                    key={col.name}
                    className="flex items-center justify-between text-xs font-mono py-1 px-2 rounded bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      {col.primaryKey && (
                        <Key className="h-3 w-3 text-yellow-500" />
                      )}
                      {col.foreignKey && (
                        <Link className="h-3 w-3 text-blue-500" />
                      )}
                      <span className={col.primaryKey ? 'font-semibold' : ''}>
                        {col.name}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-[10px] h-5">
                      {col.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Relationships Legend */}
      {relationships.length > 0 && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <h4 className="text-xs font-semibold mb-2 text-muted-foreground">Beziehungen:</h4>
          <div className="space-y-1">
            {relationships.map((rel, idx) => (
              <div key={idx} className="text-xs font-mono flex items-center gap-2">
                <span className="text-primary">{rel.from}.{rel.fromCol}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-primary">{rel.to}.{rel.toCol}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
