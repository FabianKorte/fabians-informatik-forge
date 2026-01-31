import type { SQLQueryResult } from '@/types/sqlSandbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, TableIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QueryResultsProps {
  result: SQLQueryResult | null;
}

export function QueryResults({ result }: QueryResultsProps) {
  if (!result) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-8 text-center text-muted-foreground">
          <TableIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Führe eine Abfrage aus, um Ergebnisse zu sehen</p>
        </CardContent>
      </Card>
    );
  }

  if (!result.success) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2 text-destructive">
            <XCircle className="h-4 w-4" />
            Fehler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-mono text-destructive">{result.error}</p>
        </CardContent>
      </Card>
    );
  }

  const data = result.data || [];
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Card className="border-primary/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2 text-primary">
            <CheckCircle className="h-4 w-4" />
            Ergebnis
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs">
              {result.rowCount} Zeile{result.rowCount !== 1 ? 'n' : ''}
            </Badge>
            {result.executionTime !== undefined && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {result.executionTime.toFixed(2)}ms
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Keine Ergebnisse gefunden
          </p>
        ) : (
          <ScrollArea className="max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map(col => (
                    <TableHead key={col} className="font-mono text-xs">
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, idx) => (
                  <TableRow key={idx}>
                    {columns.map(col => (
                      <TableCell key={col} className="font-mono text-xs py-2">
                        {row[col] === null ? (
                          <span className="text-muted-foreground italic">NULL</span>
                        ) : (
                          String(row[col])
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
