#!/usr/bin/env node
/**
 * Static validation script that can run without API access
 * This validates the structure of all Java solutions
 * 
 * Run with: node scripts/validate-java-structure.js
 */

import { javaCurriculum } from "../src/data/java/curriculum.js";

console.log("🧪 Java Curriculum Structure Validator\n");
console.log("=".repeat(60));

let totalLessons = 0;
let validLessons = 0;
let invalidLessons = 0;
const issues = [];

for (const chapter of javaCurriculum) {
  console.log(`\n📚 ${chapter.title}`);
  
  for (const lesson of chapter.lessons) {
    totalLessons++;
    const { solution, expectedOutput } = lesson.content;
    const lessonInfo = `[${lesson.id}] ${lesson.title}`;
    
    const lessonIssues = [];
    
    // Check solution exists
    if (!solution) {
      lessonIssues.push("Missing solution");
    } else {
      // Check for public class Main
      if (!solution.includes("public class Main")) {
        lessonIssues.push("Missing 'public class Main'");
      }
      
      // Check for main method
      if (!solution.includes("public static void main")) {
        lessonIssues.push("Missing 'public static void main' method");
      }
      
      // Check for balanced braces
      const openBraces = (solution.match(/{/g) || []).length;
      const closeBraces = (solution.match(/}/g) || []).length;
      if (openBraces !== closeBraces) {
        lessonIssues.push(`Unbalanced braces: ${openBraces} '{' vs ${closeBraces} '}'`);
      }
      
      // Check for balanced parentheses
      const openParens = (solution.match(/\(/g) || []).length;
      const closeParens = (solution.match(/\)/g) || []).length;
      if (openParens !== closeParens) {
        lessonIssues.push(`Unbalanced parentheses: ${openParens} '(' vs ${closeParens} ')'`);
      }
    }
    
    // Check expectedOutput exists
    if (!expectedOutput) {
      lessonIssues.push("Missing expectedOutput");
    }
    
    if (lessonIssues.length > 0) {
      console.log(`  ❌ ${lessonInfo}`);
      lessonIssues.forEach(issue => console.log(`     - ${issue}`));
      invalidLessons++;
      issues.push({ lesson: lessonInfo, issues: lessonIssues });
    } else {
      console.log(`  ✅ ${lessonInfo}`);
      validLessons++;
    }
  }
}

console.log("\n" + "=".repeat(60));
console.log("📊 SUMMARY\n");
console.log(`Total lessons: ${totalLessons}`);
console.log(`✅ Valid: ${validLessons}`);
console.log(`❌ Invalid: ${invalidLessons}`);
console.log(`\nSuccess rate: ${((validLessons / totalLessons) * 100).toFixed(1)}%`);

if (issues.length > 0) {
  console.log("\n❌ ISSUES FOUND:");
  issues.forEach(({ lesson, issues }) => {
    console.log(`\n${lesson}:`);
    issues.forEach(issue => console.log(`  - ${issue}`));
  });
  process.exit(1);
} else {
  console.log("\n🎉 All solutions have valid structure!");
  process.exit(0);
}
