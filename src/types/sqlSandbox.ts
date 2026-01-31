// Types for SQL Sandbox learning tool

export interface SQLColumn {
  name: string;
  type: 'INT' | 'VARCHAR' | 'DATE' | 'DECIMAL' | 'BOOLEAN' | 'TEXT';
  primaryKey?: boolean;
  foreignKey?: {
    table: string;
    column: string;
  };
  nullable?: boolean;
}

export interface SQLTable {
  name: string;
  columns: SQLColumn[];
  data: Record<string, unknown>[];
}

export interface ERModel {
  id: string;
  name: string;
  description: string;
  tables: SQLTable[];
}

export interface SQLExercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  erModelId: string;
  hint?: string;
  theory?: string;
  expectedQuery: string; // Normalized expected query pattern
  expectedResultCheck: (result: Record<string, unknown>[]) => boolean;
  xpReward: number;
}

export interface SQLScenario {
  id: string;
  title: string;
  description: string;
  erModel: ERModel;
  exercises: SQLExercise[];
}

export interface SQLQueryResult {
  success: boolean;
  data?: Record<string, unknown>[];
  error?: string;
  rowCount?: number;
  executionTime?: number;
}

export interface SQLSandboxState {
  currentScenario: SQLScenario | null;
  currentExerciseIndex: number;
  userQuery: string;
  queryResult: SQLQueryResult | null;
  completedExercises: string[];
  showHint: boolean;
  showTheory: boolean;
}

// Helper function to normalize SQL for comparison
export function normalizeSQL(sql: string): string {
  return sql
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s*=\s*/g, '=')
    .replace(/\s*<\s*/g, '<')
    .replace(/\s*>\s*/g, '>')
    .replace(/\s*;\s*$/, '')
    .trim();
}

// Simple SQL parser for SELECT queries (client-side simulation)
export function parseAndExecuteSQL(
  sql: string,
  tables: SQLTable[]
): SQLQueryResult {
  const startTime = performance.now();
  const normalizedSQL = normalizeSQL(sql);
  
  try {
    // Basic SELECT parser
    const selectMatch = normalizedSQL.match(
      /^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(.+?))?(?:\s+limit\s+(\d+))?$/i
    );
    
    if (!selectMatch) {
      // Check for JOIN syntax
      const joinMatch = normalizedSQL.match(
        /^select\s+(.+?)\s+from\s+(\w+)\s+(?:inner\s+)?join\s+(\w+)\s+on\s+(.+?)(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(.+?))?$/i
      );
      
      if (joinMatch) {
        return executeJoinQuery(joinMatch, tables, startTime);
      }
      
      return {
        success: false,
        error: 'Ungültige SQL-Syntax. Unterstützt: SELECT ... FROM ... [WHERE ...] [ORDER BY ...] [LIMIT ...]',
      };
    }
    
    const [, columns, tableName, whereClause, orderBy, limit] = selectMatch;
    
    const table = tables.find(t => t.name.toLowerCase() === tableName.toLowerCase());
    if (!table) {
      return {
        success: false,
        error: `Tabelle "${tableName}" nicht gefunden. Verfügbare Tabellen: ${tables.map(t => t.name).join(', ')}`,
      };
    }
    
    let result = [...table.data];
    
    // Apply WHERE clause
    if (whereClause) {
      result = applyWhereClause(result, whereClause);
    }
    
    // Apply ORDER BY
    if (orderBy) {
      result = applyOrderBy(result, orderBy);
    }
    
    // Apply LIMIT
    if (limit) {
      result = result.slice(0, parseInt(limit));
    }
    
    // Select columns
    if (columns.trim() !== '*') {
      const selectedColumns = columns.split(',').map(c => c.trim());
      result = result.map(row => {
        const newRow: Record<string, unknown> = {};
        selectedColumns.forEach(col => {
          // Handle column aliases (col AS alias)
          const aliasMatch = col.match(/(\w+)\s+as\s+(\w+)/i);
          if (aliasMatch) {
            newRow[aliasMatch[2]] = row[aliasMatch[1]];
          } else {
            // Handle table.column notation
            const cleanCol = col.includes('.') ? col.split('.')[1] : col;
            newRow[cleanCol] = row[cleanCol];
          }
        });
        return newRow;
      });
    }
    
    return {
      success: true,
      data: result,
      rowCount: result.length,
      executionTime: performance.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unbekannter Fehler bei der Abfrage',
    };
  }
}

function executeJoinQuery(
  match: RegExpMatchArray,
  tables: SQLTable[],
  startTime: number
): SQLQueryResult {
  const [, columns, table1Name, table2Name, onClause, whereClause, orderBy] = match;
  
  const table1 = tables.find(t => t.name.toLowerCase() === table1Name.toLowerCase());
  const table2 = tables.find(t => t.name.toLowerCase() === table2Name.toLowerCase());
  
  if (!table1 || !table2) {
    return {
      success: false,
      error: `Tabelle nicht gefunden. Verfügbare: ${tables.map(t => t.name).join(', ')}`,
    };
  }
  
  // Parse ON clause (simple: table1.col = table2.col)
  const onMatch = onClause.match(/(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/);
  if (!onMatch) {
    return {
      success: false,
      error: 'Ungültige JOIN ON-Klausel. Format: tabelle1.spalte = tabelle2.spalte',
    };
  }
  
  const [, , col1, , col2] = onMatch;
  
  // Perform inner join
  let result: Record<string, unknown>[] = [];
  for (const row1 of table1.data) {
    for (const row2 of table2.data) {
      if (row1[col1] === row2[col2]) {
        result.push({ ...row1, ...row2 });
      }
    }
  }
  
  // Apply WHERE
  if (whereClause) {
    result = applyWhereClause(result, whereClause);
  }
  
  // Apply ORDER BY
  if (orderBy) {
    result = applyOrderBy(result, orderBy);
  }
  
  // Select columns
  if (columns.trim() !== '*') {
    const selectedColumns = columns.split(',').map(c => c.trim());
    result = result.map(row => {
      const newRow: Record<string, unknown> = {};
      selectedColumns.forEach(col => {
        const cleanCol = col.includes('.') ? col.split('.')[1] : col;
        newRow[cleanCol] = row[cleanCol];
      });
      return newRow;
    });
  }
  
  return {
    success: true,
    data: result,
    rowCount: result.length,
    executionTime: performance.now() - startTime,
  };
}

function applyWhereClause(
  data: Record<string, unknown>[],
  whereClause: string
): Record<string, unknown>[] {
  // Support AND conditions
  const conditions = whereClause.split(/\s+and\s+/i);
  
  return data.filter(row => {
    return conditions.every(condition => {
      // Parse condition: column operator value
      const match = condition.match(/(\w+)\s*(=|!=|<>|<|>|<=|>=|like)\s*['"]?([^'"]+)['"]?/i);
      if (!match) return true;
      
      const [, column, operator, value] = match;
      const rowValue = row[column];
      
      switch (operator.toLowerCase()) {
        case '=':
          return String(rowValue).toLowerCase() === value.toLowerCase();
        case '!=':
        case '<>':
          return String(rowValue).toLowerCase() !== value.toLowerCase();
        case '<':
          return Number(rowValue) < Number(value);
        case '>':
          return Number(rowValue) > Number(value);
        case '<=':
          return Number(rowValue) <= Number(value);
        case '>=':
          return Number(rowValue) >= Number(value);
        case 'like':
          const pattern = value.replace(/%/g, '.*').replace(/_/g, '.');
          return new RegExp(`^${pattern}$`, 'i').test(String(rowValue));
        default:
          return true;
      }
    });
  });
}

function applyOrderBy(
  data: Record<string, unknown>[],
  orderBy: string
): Record<string, unknown>[] {
  const [column, direction = 'asc'] = orderBy.trim().split(/\s+/);
  const isDesc = direction.toLowerCase() === 'desc';
  
  return [...data].sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return isDesc ? bVal - aVal : aVal - bVal;
    }
    
    const comparison = String(aVal).localeCompare(String(bVal));
    return isDesc ? -comparison : comparison;
  });
}
