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
      return {
        success: false,
        output: "",
        error: data.compile.stderr || data.compile.output || "Compilation failed",
        executionTime,
      };
    }

    // Check for runtime errors
    if (data.run.code !== 0) {
      return {
        success: false,
        output: data.run.stdout || "",
        error: data.run.stderr || data.run.output || "Runtime error",
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
      error: error instanceof Error ? error.message : "Fehler bei der Code-Ausführung",
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
