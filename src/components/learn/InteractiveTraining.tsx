import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AlertCircle, Lightbulb, Calculator, Clock, Trophy, Target, Code, FileText } from "lucide-react";
import type { InteractiveTask } from "@/types/learn";
import { toast } from "sonner";

interface InteractiveTrainingProps {
  tasks: InteractiveTask[];
  categoryId: string;
}

export const InteractiveTraining = ({ tasks, categoryId }: InteractiveTrainingProps) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(new Array(tasks.length).fill(false));
  const [totalPoints, setTotalPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const currentTask = tasks[currentTaskIndex];
  const progress = (currentTaskIndex / tasks.length) * 100;

  // Timer effect
  useEffect(() => {
    if (currentTask?.gamification.timeLimit && timeLeft === null) {
      setTimeLeft(currentTask.gamification.timeLimit);
    }
  }, [currentTask, timeLeft]);

  useEffect(() => {
    if (timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft]);

  const handleTimeUp = () => {
    toast.error("Zeit abgelaufen! Versuche es erneut.");
    setShowFeedback(true);
    setIsCorrect(false);
  };

  const checkAnswer = () => {
    let correct = false;
    
    if (typeof currentTask.expectedSolution === 'string') {
      correct = userAnswer.trim().toLowerCase() === currentTask.expectedSolution.toLowerCase();
    } else if (typeof currentTask.expectedSolution === 'number') {
      correct = parseFloat(userAnswer) === currentTask.expectedSolution;
    } else if (Array.isArray(currentTask.expectedSolution)) {
      correct = currentTask.expectedSolution.some(solution => 
        userAnswer.trim().toLowerCase() === solution.toLowerCase()
      );
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setAttempts(attempts + 1);

    if (correct) {
      const points = currentTask.gamification.points;
      setTotalPoints(totalPoints + points);
      
      const newCompleted = [...completed];
      newCompleted[currentTaskIndex] = true;
      setCompleted(newCompleted);
      
      toast.success(`🎉 Richtig! +${points} Punkte`, {
        description: currentTask.gamification.badge ? `Badge erhalten: ${currentTask.gamification.badge}` : undefined
      });
    } else {
      // Show adaptive hints after failed attempts
      if (attempts + 1 >= currentTask.adaptiveHelp.hintsAfterFailures) {
        const newShowHints = [...showHints];
        newShowHints[Math.min(attempts, currentTask.adaptiveHelp.hints.length - 1)] = true;
        setShowHints(newShowHints);
      }
      
      toast.error("Nicht ganz richtig. Versuch es nochmal!");
    }
  };

  const nextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setUserAnswer("");
      setShowHints([]);
      setAttempts(0);
      setShowFeedback(false);
      setTimeLeft(null);
      setShowTools(false);
      setShowInfo(false);
    }
  };

  const resetTask = () => {
    setUserAnswer("");
    setShowFeedback(false);
    setAttempts(0);
    setShowHints([]);
    setTimeLeft(currentTask.gamification.timeLimit || null);
  };

  if (!currentTask) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-2xl font-semibold mb-4">Training abgeschlossen!</h3>
        <div className="text-3xl font-bold text-primary mb-2">{totalPoints} Punkte</div>
        <p className="text-muted-foreground">
          Du hast {completed.filter(Boolean).length} von {tasks.length} Aufgaben erfolgreich gelöst!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-semibold">Interaktives Training</h3>
              <p className="text-sm text-muted-foreground">
                Aufgabe {currentTaskIndex + 1} von {tasks.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-warning" />
              <span className="font-semibold">{totalPoints} Punkte</span>
            </div>
            {timeLeft && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-destructive" />
                <span className="font-mono">{timeLeft}s</span>
              </div>
            )}
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex items-center gap-2">
          <Badge variant={currentTask.difficulty === 'leicht' ? 'secondary' : 
                       currentTask.difficulty === 'mittel' ? 'default' : 'destructive'}>
            {currentTask.difficulty}
          </Badge>
          <Badge variant="outline">Level {currentTask.gamification.level}</Badge>
          <Badge variant="outline">{currentTask.taskType}</Badge>
        </div>
      </div>

      {/* Task Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">
              {currentTask.taskType === 'code-complete' ? '💻' :
               currentTask.taskType === 'calculation' ? '🔢' :
               currentTask.taskType === 'number-conversion' ? '🔄' :
               currentTask.taskType === 'security-audit' ? '🔒' :
               currentTask.taskType === 'drag-drop' ? '🎯' :
               currentTask.taskType === 'step-by-step' ? '📋' :
               currentTask.taskType === 'simulation' ? '⚙️' :
               currentTask.taskType === 'error-finding' ? '🐛' : '❓'}
            </span>
            Aufgabe #{currentTaskIndex + 1}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Task Description */}
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="leading-relaxed">{currentTask.taskText}</p>
          </div>

          {/* Tools and Info Buttons */}
          <div className="flex flex-wrap gap-2">
            {currentTask.tools.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowTools(!showTools)}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Hilfsmittel ({currentTask.tools.length})
              </Button>
            )}
            
            {currentTask.infoTexts.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Info-Texte ({currentTask.infoTexts.length})
              </Button>
            )}

            {currentTask.helpButtons.map((help, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newShowHints = [...showHints];
                  newShowHints[index] = !newShowHints[index];
                  setShowHints(newShowHints);
                }}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {help.label}
              </Button>
            ))}
          </div>

          {/* Tools Panel */}
          {showTools && (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">Verfügbare Hilfsmittel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentTask.tools.map((tool, index) => (
                    <div key={index} className="p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium">{tool}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Texts Panel */}
          {showInfo && (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">Hintergrundwissen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentTask.infoTexts.map((info, index) => (
                    <div key={index} className="p-3 bg-info/5 rounded-lg">
                      <p className="text-sm leading-relaxed">{info}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hints */}
          {showHints.some(Boolean) && (
            <div className="space-y-2">
              {showHints.map((show, index) => 
                show && (
                  <div key={index} className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-warning-foreground">
                        {currentTask.helpButtons[index]?.label || `Tipp ${index + 1}`}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentTask.helpButtons[index]?.content || 
                         currentTask.adaptiveHelp.hints[index] || "Kein Tipp verfügbar"}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Input Area */}
          <div className="space-y-4">
            {currentTask.inputFormat === 'code' ? (
              <div>
                <label className="text-sm font-medium mb-2 block">Code eingeben:</label>
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Gib deinen Code hier ein..."
                  className="font-mono text-sm min-h-[120px]"
                  disabled={showFeedback && isCorrect}
                />
              </div>
            ) : currentTask.inputFormat === 'number' ? (
              <div>
                <label className="text-sm font-medium mb-2 block">Antwort eingeben:</label>
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Deine Antwort..."
                  disabled={showFeedback && isCorrect}
                />
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium mb-2 block">Antwort eingeben:</label>
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Deine Antwort..."
                  disabled={showFeedback && isCorrect}
                />
              </div>
            )}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg border ${
              isCorrect 
                ? 'bg-success/10 border-success/20 text-success-foreground' 
                : 'bg-destructive/10 border-destructive/20 text-destructive-foreground'
            }`}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <div className="space-y-2">
                  <p className="font-medium">
                    {isCorrect ? currentTask.feedback.correct : currentTask.feedback.incorrect}
                  </p>
                  
                  {!isCorrect && currentTask.feedback.commonMistakes.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Häufige Fehler:</p>
                      <ul className="text-sm space-y-1">
                        {currentTask.feedback.commonMistakes.map((mistake, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-destructive">•</span>
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {isCorrect && (
                    <div className="text-sm">
                      <p>Erwartete Lösung: <code className="bg-background/50 px-1 rounded">{currentTask.expectedSolution}</code></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {!showFeedback ? (
              <Button 
                onClick={checkAnswer} 
                disabled={!userAnswer.trim()}
                size="lg"
              >
                Antwort prüfen
              </Button>
            ) : isCorrect ? (
              <Button onClick={nextTask} size="lg">
                {currentTaskIndex < tasks.length - 1 ? 'Nächste Aufgabe' : 'Training beenden'}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetTask}>
                  Erneut versuchen
                </Button>
                <Button onClick={nextTask}>
                  Aufgabe überspringen
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};