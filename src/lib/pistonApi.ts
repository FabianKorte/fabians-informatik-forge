// Piston API - Free Code Execution Engine
// https://github.com/engineer-man/piston

import type { CodeExecutionResult } from "@/types/javaLearning";

const PISTON_API_URL = "https://emkc.org/api/v2/piston";

interface PistonExecuteResponse {
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  language: string;
  version: string;
}

/**
 * Translate common Java error messages to German with beginner-friendly explanations
 */
function translateJavaError(error: string): string {
  const translations: Array<{
    pattern: RegExp;
    german: string;
    tip: string;
  }> = [
    // Compilation Errors
    {
      pattern: /error: ';' expected/i,
      german: "❌ Fehler: Semikolon ';' erwartet",
      tip: "💡 Tipp: Jede Anweisung in Java muss mit einem Semikolon (;) enden!"
    },
    {
      pattern: /error: unclosed string literal/i,
      german: "❌ Fehler: Text nicht geschlossen",
      tip: "💡 Tipp: Hast du die schließenden Anführungszeichen (\") vergessen?"
    },
    {
      pattern: /error: '\)' expected/i,
      german: "❌ Fehler: Schließende Klammer ')' erwartet",
      tip: "💡 Tipp: Zähle deine Klammern! Jede '(' braucht eine ')'."
    },
    {
      pattern: /error: '\(' expected/i,
      german: "❌ Fehler: Öffnende Klammer '(' erwartet",
      tip: "💡 Tipp: Nach Methodennamen wie 'println' muss eine Klammer kommen."
    },
    {
      pattern: /error: '\}' expected/i,
      german: "❌ Fehler: Schließende geschweifte Klammer '}' erwartet",
      tip: "💡 Tipp: Jede '{' braucht eine passende '}'."
    },
    {
      pattern: /error: '\{' expected/i,
      german: "❌ Fehler: Öffnende geschweifte Klammer '{' erwartet",
      tip: "💡 Tipp: Nach 'class Main' und 'main(...)' muss '{' kommen."
    },
    {
      pattern: /error: cannot find symbol.*variable (\w+)/i,
      german: "❌ Fehler: Variable nicht gefunden",
      tip: "💡 Tipp: Hast du die Variable vorher definiert? Prüfe auch die Schreibweise (Groß/Klein)!"
    },
    {
      pattern: /error: cannot find symbol.*method (\w+)/i,
      german: "❌ Fehler: Methode nicht gefunden",
      tip: "💡 Tipp: Prüfe die Schreibweise! 'println' statt 'Println'. Java unterscheidet Groß/Klein."
    },
    {
      pattern: /error: cannot find symbol/i,
      german: "❌ Fehler: Symbol nicht gefunden",
      tip: "💡 Tipp: Java kennt diesen Namen nicht. Prüfe die Schreibweise!"
    },
    {
      pattern: /error: class .* is public, should be declared in a file named/i,
      german: "❌ Fehler: Klassenname stimmt nicht mit Dateiname überein",
      tip: "💡 Tipp: Die Klasse muss 'Main' heißen (public class Main)."
    },
    {
      pattern: /error: reached end of file while parsing/i,
      german: "❌ Fehler: Dateiende unerwartet erreicht",
      tip: "💡 Tipp: Es fehlen wahrscheinlich schließende Klammern '}'. Zähle deine Klammern!"
    },
    {
      pattern: /error: not a statement/i,
      german: "❌ Fehler: Keine gültige Anweisung",
      tip: "💡 Tipp: Diese Zeile ergibt für Java keinen Sinn. Prüfe die Syntax!"
    },
    {
      pattern: /error: illegal start of expression/i,
      german: "❌ Fehler: Ungültiger Ausdrucksbeginn",
      tip: "💡 Tipp: Hier stimmt etwas mit der Syntax nicht. Schau dir die Zeile genau an!"
    },
    {
      pattern: /error: incompatible types/i,
      german: "❌ Fehler: Inkompatible Typen",
      tip: "💡 Tipp: Du versuchst, verschiedene Datentypen zu mischen (z.B. Text und Zahl)."
    },
    {
      pattern: /error: variable .* might not have been initialized/i,
      german: "❌ Fehler: Variable wurde nicht initialisiert",
      tip: "💡 Tipp: Gib der Variable einen Startwert, z.B. 'int x = 0;'"
    },
    {
      pattern: /error: \.class expected/i,
      german: "❌ Fehler: '.class' erwartet",
      tip: "💡 Tipp: Wahrscheinlich fehlen Anführungszeichen um einen Text."
    },
    {
      pattern: /error: bad operand types for binary operator/i,
      german: "❌ Fehler: Ungültige Operanden",
      tip: "💡 Tipp: Du kannst diese Werte nicht so kombinieren (z.B. Text + Zahl ohne Umwandlung)."
    },
    // Runtime Errors
    {
      pattern: /java\.lang\.NullPointerException/i,
      german: "❌ Laufzeitfehler: NullPointerException",
      tip: "💡 Tipp: Du versuchst, auf etwas zuzugreifen, das 'null' (leer) ist."
    },
    {
      pattern: /java\.lang\.ArrayIndexOutOfBoundsException/i,
      german: "❌ Laufzeitfehler: Array-Index außerhalb der Grenzen",
      tip: "💡 Tipp: Du greifst auf eine Position zu, die im Array nicht existiert. Arrays beginnen bei 0!"
    },
    {
      pattern: /java\.lang\.StringIndexOutOfBoundsException/i,
      german: "❌ Laufzeitfehler: String-Index außerhalb der Grenzen",
      tip: "💡 Tipp: Du greifst auf eine Position im Text zu, die nicht existiert."
    },
    {
      pattern: /java\.lang\.ArithmeticException.*\/ by zero/i,
      german: "❌ Laufzeitfehler: Division durch Null",
      tip: "💡 Tipp: Du kannst nicht durch 0 teilen!"
    },
    {
      pattern: /java\.lang\.NumberFormatException/i,
      german: "❌ Laufzeitfehler: Zahlenformat-Fehler",
      tip: "💡 Tipp: Der Text kann nicht in eine Zahl umgewandelt werden."
    },
    {
      pattern: /java\.util\.InputMismatchException/i,
      german: "❌ Laufzeitfehler: Eingabe-Fehler",
      tip: "💡 Tipp: Die Eingabe hat nicht das erwartete Format."
    },
    // Generic fallback for line number extraction
    {
      pattern: /Main\.java:(\d+): error:/i,
      german: "❌ Fehler in Zeile $1",
      tip: "💡 Schau dir diese Zeile genau an!"
    }
  ];

  // Try to match and translate
  for (const { pattern, german, tip } of translations) {
    if (pattern.test(error)) {
      // Extract line number if present
      const lineMatch = error.match(/Main\.java:(\d+):/);
      const lineInfo = lineMatch ? `\n📍 Zeile: ${lineMatch[1]}` : "";
      
      return `${german}${lineInfo}\n\n${tip}`;
    }
  }

  // If no specific translation found, try to extract line number and give generic help
  const lineMatch = error.match(/Main\.java:(\d+):/);
  if (lineMatch) {
    return `❌ Kompilierungsfehler in Zeile ${lineMatch[1]}\n\n💡 Tipp: Prüfe die Syntax in dieser Zeile!\n\n📋 Original: ${error.substring(0, 200)}...`;
  }

  // Return original with German header
  return `❌ Fehler aufgetreten:\n\n${error}`;
}

export async function executeJavaCode(code: string, stdin?: string): Promise<CodeExecutionResult> {
  try {
    const startTime = performance.now();
    
    const response = await fetch(`${PISTON_API_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "java",
        version: "15.0.2",
        files: [
          {
            name: "Main.java",
            content: code,
          },
        ],
        stdin: stdin || "",
        compile_timeout: 10000,
        run_timeout: 5000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: PistonExecuteResponse = await response.json();
    const executionTime = Math.round(performance.now() - startTime);

    // Check for compilation errors
    if (data.compile && data.compile.code !== 0) {
      const rawError = data.compile.stderr || data.compile.output || "Compilation failed";
      return {
        success: false,
        output: "",
        error: translateJavaError(rawError),
        executionTime,
      };
    }

    // Check for runtime errors
    if (data.run.code !== 0) {
      const rawError = data.run.stderr || data.run.output || "Runtime error";
      return {
        success: false,
        output: data.run.stdout || "",
        error: translateJavaError(rawError),
        executionTime,
      };
    }

    return {
      success: true,
      output: data.run.stdout.trim(),
      executionTime,
    };
  } catch (error) {
    console.error("Piston API error:", error);
    return {
      success: false,
      output: "",
      error: "❌ Verbindungsfehler\n\n💡 Tipp: Prüfe deine Internetverbindung und versuche es erneut.",
    };
  }
}

/**
 * Normalize output for comparison - handles UTF-8 and line endings
 */
export function normalizeOutput(output: string): string {
  // Ensure proper UTF-8 handling and normalize whitespace
  return output
    .normalize("NFC") // Normalize Unicode characters (important for Umlauts)
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map(line => line.trimEnd())
    .join("\n");
}

/**
 * Compare outputs with tolerance for encoding differences
 */
export function compareOutputs(expected: string, actual: string): boolean {
  const normalizedExpected = normalizeOutput(expected);
  const normalizedActual = normalizeOutput(actual);
  
  // Direct comparison
  if (normalizedExpected === normalizedActual) {
    return true;
  }
  
  // Fallback: Compare with normalized Unicode (handles Umlaut encoding variants)
  const expectedNFD = normalizedExpected.normalize("NFD");
  const actualNFD = normalizedActual.normalize("NFD");
  
  return expectedNFD === actualNFD;
}
