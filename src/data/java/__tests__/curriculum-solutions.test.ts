import { describe, it, expect, beforeAll } from "vitest";
import { javaCurriculum } from "../curriculum";
import { executeJavaCode, compareOutputs } from "@/lib/pistonApi";

// Timeout for Piston API calls (compilation + execution)
const PISTON_TIMEOUT = 30000;

// Skip API tests in CI unless explicitly enabled
const SKIP_API_TESTS = process.env.CI === "true" && process.env.TEST_PISTON_API !== "true";

describe("Java Curriculum Solutions", () => {
  it("should have solutions for all lessons", () => {
    const lessonsWithoutSolutions: string[] = [];

    for (const chapter of javaCurriculum) {
      for (const lesson of chapter.lessons) {
        if (!lesson.content.solution) {
          lessonsWithoutSolutions.push(`${chapter.title} > ${lesson.title}`);
        }
      }
    }

    if (lessonsWithoutSolutions.length > 0) {
      console.warn("Lessons without solutions:", lessonsWithoutSolutions);
    }

    expect(lessonsWithoutSolutions.length).toBe(0);
  });

  it("should have expected outputs for all lessons", () => {
    const lessonsWithoutExpectedOutput: string[] = [];

    for (const chapter of javaCurriculum) {
      for (const lesson of chapter.lessons) {
        if (!lesson.content.expectedOutput) {
          lessonsWithoutExpectedOutput.push(`${chapter.title} > ${lesson.title}`);
        }
      }
    }

    if (lessonsWithoutExpectedOutput.length > 0) {
      console.warn("Lessons without expected output:", lessonsWithoutExpectedOutput);
    }

    expect(lessonsWithoutExpectedOutput.length).toBe(0);
  });

  it("all solutions should contain 'public class Main'", () => {
    const invalidSolutions: string[] = [];

    for (const chapter of javaCurriculum) {
      for (const lesson of chapter.lessons) {
        if (lesson.content.solution) {
          if (!lesson.content.solution.includes("public class Main")) {
            invalidSolutions.push(`${chapter.title} > ${lesson.title}`);
          }
        }
      }
    }

    if (invalidSolutions.length > 0) {
      console.error("Solutions without 'public class Main':", invalidSolutions);
    }

    expect(invalidSolutions.length).toBe(0);
  });

  it("all solutions should contain 'public static void main'", () => {
    const invalidSolutions: string[] = [];

    for (const chapter of javaCurriculum) {
      for (const lesson of chapter.lessons) {
        if (lesson.content.solution) {
          if (!lesson.content.solution.includes("public static void main")) {
            invalidSolutions.push(`${chapter.title} > ${lesson.title}`);
          }
        }
      }
    }

    if (invalidSolutions.length > 0) {
      console.error("Solutions without 'main' method:", invalidSolutions);
    }

    expect(invalidSolutions.length).toBe(0);
  });

  it("the first top-level class in each solution should be Main (Piston entrypoint)", () => {
    const invalidSolutions: string[] = [];

    for (const chapter of javaCurriculum) {
      for (const lesson of chapter.lessons) {
        const solution = lesson.content.solution;
        if (!solution) continue;

        // Find the first class declaration in the file.
        // Piston appears to use the first class it encounters as the entrypoint.
        const firstClassMatch = solution.match(/^(?:\s*\/\/.*\n)*\s*(public\s+class|class)\s+([A-Za-z_]\w*)/m);
        const firstClassName = firstClassMatch?.[2];

        if (firstClassName !== "Main") {
          invalidSolutions.push(`${chapter.title} > ${lesson.title} (first class: ${firstClassName ?? "<none>"})`);
        }
      }
    }

    if (invalidSolutions.length > 0) {
      console.error("Solutions where first class is not Main:", invalidSolutions);
    }

    expect(invalidSolutions.length).toBe(0);
  });
});

// Separate describe block for API tests (slower, optional)
describe("Java Solutions - Piston API Validation", () => {
  if (SKIP_API_TESTS) {
    it.skip("Skipping Piston API tests in CI (set TEST_PISTON_API=true to enable)", () => {});
    return;
  }

  // Test each chapter separately for better reporting
  for (const chapter of javaCurriculum) {
    describe(chapter.title, () => {
      for (const lesson of chapter.lessons) {
        if (!lesson.content.solution || !lesson.content.expectedOutput) {
          continue;
        }

        it(
          `${lesson.title} (${lesson.id}) - solution produces correct output`,
          async () => {
            const result = await executeJavaCode(lesson.content.solution);

            // Check for compilation/runtime errors
            if (!result.success) {
              throw new Error(
                `Solution failed to execute:\n${result.error}\n\nSolution code:\n${lesson.content.solution}`
              );
            }

            // Compare output using the same logic as the app
            const outputMatches = compareOutputs(
              lesson.content.expectedOutput,
              result.output
            );

            if (!outputMatches) {
              throw new Error(
                `Output mismatch!\n\nExpected:\n"${lesson.content.expectedOutput}"\n\nActual:\n"${result.output}"\n\nSolution code:\n${lesson.content.solution}`
              );
            }

            expect(outputMatches).toBe(true);
          },
          PISTON_TIMEOUT
        );
      }
    });
  }
});
