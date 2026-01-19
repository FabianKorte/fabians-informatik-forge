import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  Flag,
  AlertTriangle,
  Trophy,
  BarChart3,
  RotateCcw,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { examConfigs } from "@/data/exam";
import type { ExamConfig, ExamQuestion, ExamResult, ExamSession } from "@/types/exam";
import { cn } from "@/lib/utils";

const ExamSimulator = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const examConfig = examId ? examConfigs[examId] : null;
  
  const [examState, setExamState] = useState<'intro' | 'running' | 'review' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Timer
  useEffect(() => {
    if (examState !== 'running' || !examConfig) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, examConfig]);

  const startExam = useCallback(() => {
    if (!examConfig) return;
    setTimeRemaining(examConfig.timeLimitMinutes * 60);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setCurrentQuestionIndex(0);
    setExamResult(null);
    setExamState('running');
  }, [examConfig]);

  const finishExam = useCallback(() => {
    if (!examConfig) return;

    const timeUsed = examConfig.timeLimitMinutes * 60 - timeRemaining;
    
    const categoryBreakdown: Record<string, { correct: number; total: number; points: number }> = {};
    const questionResults: { questionId: string; correct: boolean; points: number }[] = [];
    let earnedPoints = 0;

    examConfig.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctIndex;
      const points = isCorrect ? question.points : 0;
      earnedPoints += points;

      questionResults.push({
        questionId: question.id,
        correct: isCorrect,
        points
      });

      if (!categoryBreakdown[question.category]) {
        categoryBreakdown[question.category] = { correct: 0, total: 0, points: 0 };
      }
      categoryBreakdown[question.category].total++;
      if (isCorrect) {
        categoryBreakdown[question.category].correct++;
        categoryBreakdown[question.category].points += points;
      }
    });

    const percentage = (earnedPoints / examConfig.totalPoints) * 100;
    
    setExamResult({
      examId: examConfig.id,
      totalPoints: examConfig.totalPoints,
      earnedPoints,
      percentage,
      passed: percentage >= examConfig.passingPercentage,
      timeUsed,
      categoryBreakdown,
      questionResults
    });
    
    setExamState('results');
  }, [examConfig, answers, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = examConfig?.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = examConfig ? (answeredCount / examConfig.questions.length) * 100 : 0;

  if (!examConfig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Prüfung nicht gefunden</h2>
            <p className="text-muted-foreground mb-4">Die gewählte Prüfung existiert nicht.</p>
            <Button onClick={() => navigate('/exam')}>
              <Home className="w-4 h-4 mr-2" />
              Zur Prüfungsübersicht
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Intro Screen
  if (examState === 'intro') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">{examConfig.title}</CardTitle>
              <CardDescription className="text-base mt-2">{examConfig.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">{examConfig.timeLimitMinutes} Minuten</p>
                  <p className="text-sm text-muted-foreground">Zeitlimit</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <BarChart3 className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">{examConfig.questions.length} Fragen</p>
                  <p className="text-sm text-muted-foreground">{examConfig.totalPoints} Punkte</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium mb-2">Themengebiete:</h4>
                <div className="flex flex-wrap gap-2">
                  {examConfig.categories.map(cat => (
                    <Badge key={cat} variant="secondary">{cat}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-600 dark:text-yellow-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Wichtige Hinweise
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Die Prüfung startet sofort nach Klick auf "Prüfung starten"</li>
                  <li>• Sie können Fragen markieren und später zurückkehren</li>
                  <li>• Die Prüfung endet automatisch nach Ablauf der Zeit</li>
                  <li>• Bestanden ab {examConfig.passingPercentage}% der Punkte</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => navigate('/exam')} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
                <Button onClick={startExam} className="flex-1" size="lg">
                  Prüfung starten
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Results Screen
  if (examState === 'results' && examResult) {
    return (
      <div className="min-h-screen bg-background p-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Result Header */}
          <Card className={cn(
            "border-2",
            examResult.passed ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"
          )}>
            <CardContent className="pt-6 text-center">
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4",
                examResult.passed ? "bg-green-500/20" : "bg-red-500/20"
              )}>
                {examResult.passed ? (
                  <Trophy className="w-12 h-12 text-green-500" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-500" />
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {examResult.passed ? "Bestanden!" : "Nicht bestanden"}
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                {examResult.earnedPoints} von {examResult.totalPoints} Punkten ({examResult.percentage.toFixed(1)}%)
              </p>
              <Progress 
                value={examResult.percentage} 
                className={cn("h-3", examResult.passed ? "[&>div]:bg-green-500" : "[&>div]:bg-red-500")}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Zeit: {formatTime(examResult.timeUsed)} von {examConfig.timeLimitMinutes}:00
              </p>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Ergebnis nach Kategorie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(examResult.categoryBreakdown).map(([category, data]) => {
                  const catPercentage = (data.correct / data.total) * 100;
                  return (
                    <div key={category}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{category}</span>
                        <span className="text-muted-foreground">
                          {data.correct}/{data.total} richtig ({data.points} Punkte)
                        </span>
                      </div>
                      <Progress 
                        value={catPercentage}
                        className={cn(
                          "h-2",
                          catPercentage >= 50 ? "[&>div]:bg-green-500" : "[&>div]:bg-red-500"
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card>
            <CardHeader>
              <CardTitle>Fragenübersicht</CardTitle>
              <CardDescription>Klicken Sie auf eine Frage, um die Details zu sehen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {examConfig.questions.map((question, index) => {
                  const result = examResult.questionResults.find(r => r.questionId === question.id);
                  return (
                    <button
                      key={question.id}
                      onClick={() => {
                        setCurrentQuestionIndex(index);
                        setShowExplanation(true);
                        setExamState('review');
                      }}
                      className={cn(
                        "w-10 h-10 rounded-lg font-medium text-sm transition-colors",
                        result?.correct
                          ? "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                          : "bg-red-500/20 text-red-600 hover:bg-red-500/30"
                      )}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/exam')} className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              Zur Übersicht
            </Button>
            <Button onClick={startExam} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Erneut versuchen
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Review Mode (after results)
  if (examState === 'review' && currentQuestion) {
    const userAnswer = answers[currentQuestion.id];
    const isCorrect = userAnswer === currentQuestion.correctIndex;

    return (
      <div className="min-h-screen bg-background p-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setExamState('results')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zu Ergebnissen
            </Button>
            <Badge variant={isCorrect ? "default" : "destructive"}>
              {isCorrect ? "Richtig" : "Falsch"} • {currentQuestion.points} Punkte
            </Badge>
          </div>

          {/* Question */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{currentQuestion.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  Frage {currentQuestionIndex + 1} von {examConfig.questions.length}
                </span>
              </div>
              <CardTitle className="text-lg mt-4">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-colors",
                    index === currentQuestion.correctIndex
                      ? "border-green-500 bg-green-500/10"
                      : index === userAnswer && !isCorrect
                      ? "border-red-500 bg-red-500/10"
                      : "border-muted"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      index === currentQuestion.correctIndex
                        ? "bg-green-500 text-white"
                        : index === userAnswer && !isCorrect
                        ? "bg-red-500 text-white"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {index === currentQuestion.correctIndex ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : index === userAnswer && !isCorrect ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">Erklärung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{currentQuestion.explanation}</p>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Vorherige
            </Button>
            <Button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(examConfig.questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === examConfig.questions.length - 1}
              className="flex-1"
            >
              Nächste
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Running Exam
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b z-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Frage {currentQuestionIndex + 1}/{examConfig.questions.length}
              </span>
              <Badge variant="outline">{answeredCount} beantwortet</Badge>
            </div>
            <div className={cn(
              "flex items-center gap-2 font-mono font-bold text-lg px-3 py-1 rounded-lg",
              timeRemaining < 300 ? "bg-red-500/20 text-red-500 animate-pulse" : "bg-muted"
            )}>
              <Clock className="w-4 h-4" />
              {formatTime(timeRemaining)}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-3xl mx-auto p-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{currentQuestion.category}</Badge>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      currentQuestion.difficulty === 'leicht' ? 'default' :
                      currentQuestion.difficulty === 'mittel' ? 'secondary' : 'destructive'
                    }>
                      {currentQuestion.difficulty}
                    </Badge>
                    <Badge variant="outline">{currentQuestion.points} Punkte</Badge>
                  </div>
                </div>
                <CardTitle className="text-lg leading-relaxed">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: index }))}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-left transition-all",
                      answers[currentQuestion.id] === index
                        ? "border-primary bg-primary/10"
                        : "border-muted hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-medium",
                        answers[currentQuestion.id] === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="pt-0.5">{option}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
          
          <Button
            variant={flaggedQuestions.has(currentQuestion.id) ? "secondary" : "outline"}
            onClick={() => {
              setFlaggedQuestions(prev => {
                const next = new Set(prev);
                if (next.has(currentQuestion.id)) {
                  next.delete(currentQuestion.id);
                } else {
                  next.add(currentQuestion.id);
                }
                return next;
              });
            }}
            className="flex-shrink-0"
          >
            <Flag className={cn("w-4 h-4", flaggedQuestions.has(currentQuestion.id) && "fill-current")} />
          </Button>

          {currentQuestionIndex < examConfig.questions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="flex-1"
            >
              Weiter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={finishExam}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Prüfung abgeben
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Fragenübersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
              {examConfig.questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-xs font-medium transition-colors relative",
                    currentQuestionIndex === index
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                      : answers[question.id] !== undefined
                      ? "bg-green-500/20 text-green-600"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {index + 1}
                  {flaggedQuestions.has(question.id) && (
                    <Flag className="w-2.5 h-2.5 absolute -top-1 -right-1 text-yellow-500 fill-yellow-500" />
                  )}
                </button>
              ))}
            </div>
            {flaggedQuestions.size > 0 && (
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                <Flag className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                {flaggedQuestions.size} Frage(n) markiert
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamSimulator;
