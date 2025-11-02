import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useExamMode } from '@/hooks/useExamMode';
import { Quiz } from '@/components/learn/Quiz';
import type { LearnModule } from '@/types/learn';

interface ExamModeProps {
  categoryId: string;
  modules: LearnModule[];
  timeLimitMinutes: number;
}

export function ExamMode({ categoryId, modules, timeLimitMinutes }: ExamModeProps) {
  const { currentSession, timeRemaining, startExam, completeSession, submitCorrectAnswers } = useExamMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const quizModules = modules.filter(m => m.type === 'quiz');
  const allQuestions = quizModules.flatMap(m => m.questions || []);
  const examQuestions = allQuestions.slice(0, Math.min(20, allQuestions.length));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    startExam(categoryId, timeLimitMinutes, examQuestions.length);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const correctCount = examQuestions.reduce((count, question, idx) => {
      return count + (answers[idx] === question.correctIndex ? 1 : 0);
    }, 0);
    
    submitCorrectAnswers(correctCount);
    completeSession();
    setShowResults(true);
  };

  useEffect(() => {
    if (timeRemaining === 0 && currentSession && !currentSession.completed_at) {
      handleSubmit();
    }
  }, [timeRemaining]);

  if (!currentSession) {
    return (
      <Card className="p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Prüfungsmodus</h2>
        <p className="text-muted-foreground">
          Teste dein Wissen unter Zeitdruck mit {examQuestions.length} Fragen in {timeLimitMinutes} Minuten.
        </p>
        <Button onClick={handleStartExam} size="lg">
          Prüfung starten
        </Button>
      </Card>
    );
  }

  if (showResults || currentSession.completed_at) {
    const score = currentSession.score || 0;
    const passed = score >= 50;

    return (
      <Card className="p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {passed ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold">
            {passed ? 'Bestanden!' : 'Nicht bestanden'}
          </h2>
          <div className="text-4xl font-bold">{score.toFixed(1)}%</div>
          <p className="text-muted-foreground">
            {currentSession.correct_answers} von {currentSession.total_questions} Fragen richtig
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Antworten im Detail:</h3>
          {examQuestions.map((question, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 rounded bg-accent/50">
              <Badge variant={answers[idx] === question.correctIndex ? "default" : "destructive"}>
                {idx + 1}
              </Badge>
              <span className="text-sm flex-1">{question.question}</span>
              {answers[idx] === question.correctIndex ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const currentQuestion = examQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / examQuestions.length) * 100;

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg font-semibold">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Badge variant="outline">
              Frage {currentQuestionIndex + 1} / {examQuestions.length}
            </Badge>
          </div>
          <Progress value={progress} className="w-32" />
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => (
            <Button
              key={idx}
              variant={answers[currentQuestionIndex] === idx ? "default" : "outline"}
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => handleAnswer(idx)}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
              {option}
            </Button>
          ))}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Zurück
        </Button>
        {currentQuestionIndex === examQuestions.length - 1 ? (
          <Button onClick={handleSubmit}>
            Prüfung abgeben
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Weiter
          </Button>
        )}
      </div>
    </div>
  );
}