import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JavaCodeEditor } from "./JavaCodeEditor";
import { executeJavaCode, compareOutputs } from "@/lib/pistonApi";
import type { JavaLesson, CodeExecutionResult } from "@/types/javaLearning";
import { 
  Play, 
  RotateCcw, 
  Lightbulb, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  ChevronRight,
  BookOpen,
  Code2
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

interface LessonViewProps {
  lesson: JavaLesson;
  onComplete: () => void;
  onNext: () => void;
  hasNext: boolean;
  isPracticeMode?: boolean;
}

export function LessonView({ lesson, onComplete, onNext, hasNext, isPracticeMode = false }: LessonViewProps) {
  const [code, setCode] = useState(lesson.content.codeTemplate);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<CodeExecutionResult | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setResult(null);
    setIsCorrect(false);

    try {
      const executionResult = await executeJavaCode(code);
      setResult(executionResult);

      if (executionResult.success && lesson.content.expectedOutput) {
        const correct = compareOutputs(lesson.content.expectedOutput, executionResult.output);
        setIsCorrect(correct);
        if (correct) {
          onComplete();
        }
      }
    } catch (error) {
      setResult({
        success: false,
        output: "",
        error: "Fehler bei der Ausführung",
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, lesson.content.expectedOutput, onComplete]);

  const resetCode = useCallback(() => {
    setCode(lesson.content.codeTemplate);
    setResult(null);
    setIsCorrect(false);
    setShowSolution(false);
  }, [lesson.content.codeTemplate]);

  const showNextHint = useCallback(() => {
    if (!showHints) {
      setShowHints(true);
      setCurrentHintIndex(0);
    } else if (currentHintIndex < lesson.content.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  }, [showHints, currentHintIndex, lesson.content.hints.length]);

  const toggleSolution = useCallback(() => {
    setShowSolution(prev => !prev);
    if (!showSolution) {
      setCode(lesson.content.solution);
    }
  }, [showSolution, lesson.content.solution]);

  const getLessonTypeBadge = () => {
    switch (lesson.type) {
      case "theory":
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500"><BookOpen className="w-3 h-3 mr-1" />Theorie</Badge>;
      case "exercise":
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500"><Code2 className="w-3 h-3 mr-1" />Übung</Badge>;
      case "challenge":
        return <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">🏆 Challenge</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {getLessonTypeBadge()}
          <h2 className="text-2xl font-bold mt-2">{lesson.title}</h2>
        </div>
        {isCorrect && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 text-green-500"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-semibold">Geschafft!</span>
          </motion.div>
        )}
      </div>

      {/* Explanation */}
      <Card className="p-6 bg-card/50 backdrop-blur">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{lesson.content.explanation}</ReactMarkdown>
        </div>
      </Card>

      {/* Code Editor */}
      <Card className="overflow-hidden">
        <div className="bg-muted/50 px-4 py-2 border-b flex items-center justify-between">
          <span className="text-sm font-medium flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Main.java
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={resetCode}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
        <JavaCodeEditor
          value={code}
          onChange={setCode}
          height="280px"
        />
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={runCode} 
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-700"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Wird ausgeführt...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Code ausführen
            </>
          )}
        </Button>

        <Button variant="outline" onClick={showNextHint}>
          <Lightbulb className="w-4 h-4 mr-2" />
          Tipp ({currentHintIndex + 1}/{lesson.content.hints.length})
        </Button>

        <Button variant="outline" onClick={toggleSolution}>
          {showSolution ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showSolution ? "Lösung verbergen" : "Lösung zeigen"}
        </Button>
      </div>

      {/* Hints */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="font-medium text-yellow-600 dark:text-yellow-400">
                    Tipp {currentHintIndex + 1}
                  </p>
                  <p className="text-sm">{lesson.content.hints[currentHintIndex]}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Output */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className={`p-4 ${result.success ? (isCorrect ? "bg-green-500/10 border-green-500/20" : "bg-muted") : "bg-red-500/10 border-red-500/20"}`}>
              <div className="flex items-start gap-3">
                {result.success ? (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-muted-foreground/20 shrink-0" />
                  )
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium mb-2">
                    {result.success 
                      ? (isCorrect ? "✅ Richtig!" : "Ausgabe:") 
                      : "❌ Fehler:"}
                  </p>
                  <pre className="text-sm font-mono bg-background/50 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                    {result.error || result.output || "(Keine Ausgabe)"}
                  </pre>
                  {result.executionTime && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Ausführungszeit: {result.executionTime}ms
                    </p>
                  )}
                  {lesson.content.expectedOutput && !isCorrect && result.success && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-muted-foreground">
                        <strong>Erwartet:</strong>
                      </p>
                      <pre className="text-sm font-mono bg-background/50 p-2 rounded mt-1 text-muted-foreground">
                        {lesson.content.expectedOutput}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      {isCorrect && hasNext && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <Button onClick={onNext} size="lg" className="gap-2">
            {isPracticeMode ? "Nächste Übung" : "Weiter zur nächsten Lektion"}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
