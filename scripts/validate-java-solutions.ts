#!/usr/bin/env npx tsx
/**
 * Script to validate all Java curriculum solutions against Piston API
 * Run with: npx tsx scripts/validate-java-solutions.ts
 * 
 * This script tests each solution and reports any failures.
 */

import { javaCurriculum } from "../src/data/java/curriculum";
import { executeJavaCode, compareOutputs } from "../src/lib/pistonApi";

interface TestResult {
  chapterTitle: string;
  lessonTitle: string;
  lessonId: string;
  success: boolean;
  error?: string;
  executionTime?: number;
}

async function validateAllSolutions(): Promise<void> {
  console.log("🧪 Java Curriculum Solution Validator\n");
  console.log("=".repeat(60));

  const results: TestResult[] = [];
  let totalLessons = 0;
  let passedLessons = 0;
  let failedLessons = 0;
  let skippedLessons = 0;

  for (const chapter of javaCurriculum) {
    console.log(`\n📚 ${chapter.title}`);
    console.log("-".repeat(40));

    for (const lesson of chapter.lessons) {
      totalLessons++;
      const prefix = `  [${lesson.id}] ${lesson.title}`;

      // Check if solution exists
      if (!lesson.content.solution) {
        console.log(`${prefix}: ⚠️  SKIPPED (no solution)`);
        skippedLessons++;
        continue;
      }

      // Check if expected output exists
      if (!lesson.content.expectedOutput) {
        console.log(`${prefix}: ⚠️  SKIPPED (no expected output)`);
        skippedLessons++;
        continue;
      }

      // Check for main method
      if (!lesson.content.solution.includes("public class Main")) {
        console.log(`${prefix}: ❌ FAILED (missing 'public class Main')`);
        failedLessons++;
        results.push({
          chapterTitle: chapter.title,
          lessonTitle: lesson.title,
          lessonId: lesson.id,
          success: false,
          error: "Solution missing 'public class Main'",
        });
        continue;
      }

      if (!lesson.content.solution.includes("public static void main")) {
        console.log(`${prefix}: ❌ FAILED (missing 'main' method)`);
        failedLessons++;
        results.push({
          chapterTitle: chapter.title,
          lessonTitle: lesson.title,
          lessonId: lesson.id,
          success: false,
          error: "Solution missing 'public static void main' method",
        });
        continue;
      }

      // Execute against Piston API
      try {
        const result = await executeJavaCode(lesson.content.solution);

        if (!result.success) {
          console.log(`${prefix}: ❌ FAILED (execution error)`);
          failedLessons++;
          results.push({
            chapterTitle: chapter.title,
            lessonTitle: lesson.title,
            lessonId: lesson.id,
            success: false,
            error: result.error,
            executionTime: result.executionTime,
          });
          continue;
        }

        // Compare outputs
        const outputMatches = compareOutputs(
          lesson.content.expectedOutput,
          result.output
        );

        if (!outputMatches) {
          console.log(`${prefix}: ❌ FAILED (output mismatch)`);
          failedLessons++;
          results.push({
            chapterTitle: chapter.title,
            lessonTitle: lesson.title,
            lessonId: lesson.id,
            success: false,
            error: `Expected: "${lesson.content.expectedOutput}"\nActual: "${result.output}"`,
            executionTime: result.executionTime,
          });
          continue;
        }

        console.log(`${prefix}: ✅ PASSED (${result.executionTime}ms)`);
        passedLessons++;
        results.push({
          chapterTitle: chapter.title,
          lessonTitle: lesson.title,
          lessonId: lesson.id,
          success: true,
          executionTime: result.executionTime,
        });

        // Rate limiting: wait a bit between API calls
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.log(`${prefix}: ❌ FAILED (API error)`);
        failedLessons++;
        results.push({
          chapterTitle: chapter.title,
          lessonTitle: lesson.title,
          lessonId: lesson.id,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 SUMMARY\n");
  console.log(`Total lessons: ${totalLessons}`);
  console.log(`✅ Passed: ${passedLessons}`);
  console.log(`❌ Failed: ${failedLessons}`);
  console.log(`⚠️  Skipped: ${skippedLessons}`);
  console.log(
    `\nSuccess rate: ${((passedLessons / (totalLessons - skippedLessons)) * 100).toFixed(1)}%`
  );

  // List failures
  const failures = results.filter((r) => !r.success);
  if (failures.length > 0) {
    console.log("\n" + "=".repeat(60));
    console.log("❌ FAILURES\n");
    for (const failure of failures) {
      console.log(`\n[${failure.lessonId}] ${failure.chapterTitle} > ${failure.lessonTitle}`);
      console.log(`Error: ${failure.error}`);
    }
    process.exit(1);
  } else {
    console.log("\n🎉 All solutions validated successfully!");
    process.exit(0);
  }
}

// Run the validator
validateAllSolutions().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
