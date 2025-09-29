import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AlertCircle, Lightbulb, Calculator, Clock, Trophy, Code, FileText, HelpCircle, Plus, Eye, CheckCircle2, RotateCcw, ChevronRight, Star, Brain } from "lucide-react";
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
  const [showTimeUpHelp, setShowTimeUpHelp] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

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
    setShowTimeUpHelp(true);
    toast.info("⏰ Zeit abgelaufen! Möchtest du Hilfe oder weitermachen?");
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
      setShowSolution(false);
      setShowTimeUpHelp(false);
    }
  };

  const resetTask = () => {
    setUserAnswer("");
    setShowFeedback(false);
    setAttempts(0);
    setShowHints([]);
    setShowTimeUpHelp(false);
    setShowSolution(false);
    setTimeLeft(currentTask.gamification.timeLimit || null);
  };

  const addToFocusTraining = () => {
    toast.success("🎯 Aufgabe zu Schwerpunkt-Training hinzugefügt!");
  };

  const showHint = () => {
    const newShowHints = [...showHints];
    const nextIndex = showHints.findIndex(show => !show);
    if (nextIndex >= 0) {
      newShowHints[nextIndex] = true;
      setShowHints(newShowHints);
    } else if (showHints.length < currentTask.helpButtons.length) {
      newShowHints.push(true);
      setShowHints(newShowHints);
    }
  };

  if (!currentTask) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-4">Training erfolgreich abgeschlossen!</h3>
          <div className="text-4xl font-bold text-primary mb-2">{totalPoints}</div>
          <p className="text-lg text-muted-foreground">Punkte gesammelt</p>
          <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-success-foreground font-medium">
              🎯 {completed.filter(Boolean).length} von {tasks.length} Aufgaben erfolgreich gelöst!
            </p>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <Badge variant="secondary" className="px-4 py-2">
              <Trophy className="w-4 h-4 mr-2" />
              Experte
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Level Up!
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header mit Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Interaktives Training</h3>
                <p className="text-muted-foreground">
                  Aufgabe {currentTaskIndex + 1} von {tasks.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-warning/10 border border-warning/20">
                <Trophy className="w-4 h-4 text-warning" />
                <span className="font-bold">{totalPoints}</span>
                <span className="text-sm text-muted-foreground">Punkte</span>
              </div>
              {timeLeft && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
                  timeLeft <= 30 ? 'bg-destructive/10 border-destructive/20' : 'bg-muted'
                }`}>
                  <Clock className={`w-4 h-4 ${timeLeft <= 30 ? 'text-destructive' : 'text-muted-foreground'}`} />
                  <span className="font-mono text-sm">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge 
                  variant={currentTask.difficulty === 'leicht' ? 'secondary' : 
                           currentTask.difficulty === 'mittel' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {currentTask.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Level {currentTask.gamification.level}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {currentTask.taskType}
                </Badge>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={addToFocusTraining}
                className="h-8"
              >
                <Plus className="w-3 h-3 mr-1" />
                Zu Schwerpunkt
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hauptaufgabe */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="text-xl">
                {currentTask.taskType === 'code-complete' ? '💻' :
                 currentTask.taskType === 'calculation' ? '🔢' :
                 currentTask.taskType === 'number-conversion' ? '🔄' :
                 currentTask.taskType === 'security-audit' ? '🔒' :
                 currentTask.taskType === 'drag-drop' ? '🎯' :
                 currentTask.taskType === 'step-by-step' ? '📋' :
                 currentTask.taskType === 'simulation' ? '⚙️' :
                 currentTask.taskType === 'error-finding' ? '🐛' : '❓'}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-bold">Aufgabe #{currentTaskIndex + 1}</h4>
              <p className="text-sm text-muted-foreground font-normal">Zeige dein Können!</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Aufgabenbeschreibung */}
          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="leading-relaxed">{currentTask.taskText}</p>
          </div>

          {/* Eingabebereich */}
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Deine Lösung:</h5>
              {currentTask.inputFormat === 'code' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code className="w-4 h-4" />
                    Code-Editor
                  </div>
                  <Textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Gib deinen Code hier ein..."
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
              ) : (
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={
                    currentTask.inputFormat === 'number' ? "Gib eine Zahl ein..." :
                    currentTask.inputFormat === 'text' ? "Gib deine Antwort ein..." :
                    "Deine Antwort..."
                  }
                  type={currentTask.inputFormat === 'number' ? 'number' : 'text'}
                />
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
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">
                      {isCorrect ? "Richtig!" : "Nicht ganz richtig"}
                    </p>
                    <p className="text-sm mt-1">
                      {isCorrect ? currentTask.feedback.correct : currentTask.feedback.incorrect}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Lösung anzeigen */}
            {showSolution && (
              <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-info mt-0.5" />
                  <div>
                    <p className="font-medium text-info-foreground">Musterlösung:</p>
                    <p className="text-sm mt-1 font-mono">
                      {Array.isArray(currentTask.expectedSolution) 
                        ? currentTask.expectedSolution.join(' oder ')
                        : currentTask.expectedSolution}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Hints */}
            {showHints.some(Boolean) && (
              <div className="space-y-3">
                <h6 className="font-semibold text-sm">Hilfestellungen:</h6>
                {showHints.map((show, index) => 
                  show && (
                    <div key={index} className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-warning mt-0.5" />
                        <div>
                          <p className="font-medium text-sm text-warning-foreground">
                            {currentTask.helpButtons[index]?.label || `Tipp ${index + 1}`}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {currentTask.helpButtons[index]?.content || 
                             currentTask.adaptiveHelp.hints[index] || "Kein Tipp verfügbar"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Time up help dialog */}
            {showTimeUpHelp && (
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-warning" />
                  <div>
                    <p className="font-medium text-warning-foreground">Zeit abgelaufen!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Du kannst trotzdem weitermachen oder dir Hilfe holen.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hilfsmittel und Informationen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentTask.tools.length > 0 && (
          <Card className="cursor-pointer" onClick={() => setShowTools(!showTools)}>
            <CardContent className="p-4 text-center">
              <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h6 className="font-semibold text-sm">Hilfsmittel</h6>
              <p className="text-xs text-muted-foreground">{currentTask.tools.length} verfügbar</p>
            </CardContent>
          </Card>
        )}
        
        {currentTask.infoTexts.length > 0 && (
          <Card className="cursor-pointer" onClick={() => setShowInfo(!showInfo)}>
            <CardContent className="p-4 text-center">
              <FileText className="w-6 h-6 mx-auto mb-2 text-success" />
              <h6 className="font-semibold text-sm">Wissen</h6>
              <p className="text-xs text-muted-foreground">{currentTask.infoTexts.length} Info-Texte</p>
            </CardContent>
          </Card>
        )}

        <Card className="cursor-pointer" onClick={showHint}>
          <CardContent className="p-4 text-center">
            <HelpCircle className="w-6 h-6 mx-auto mb-2 text-warning" />
            <h6 className="font-semibold text-sm">Hilfe</h6>
            <p className="text-xs text-muted-foreground">{currentTask.helpButtons.length} Tipps</p>
          </CardContent>
        </Card>
      </div>

      {/* Hilfsmittel Panel */}
      {showTools && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Verfügbare Hilfsmittel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentTask.tools.map((tool, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg border">
                  <span className="text-sm font-medium">{tool}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informationen Panel */}
      {showInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hintergrundwissen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentTask.infoTexts.map((info, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg border">
                  <p className="text-sm leading-relaxed">{info}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons - unten */}
      <div className="flex flex-wrap gap-3 justify-center pt-4 border-t">
        <Button
          onClick={checkAnswer}
          disabled={!userAnswer.trim()}
          className="min-w-[120px]"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Lösung prüfen
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowSolution(!showSolution)}
          className="min-w-[120px]"
        >
          <Eye className="w-4 h-4 mr-2" />
          Lösung zeigen
        </Button>

        <Button
          variant="outline"
          onClick={resetTask}
          className="min-w-[120px]"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Neu starten
        </Button>

        {(isCorrect || showFeedback) && currentTaskIndex < tasks.length - 1 && (
          <Button
            onClick={nextTask}
            className="min-w-[120px]"
          >
            Nächste Aufgabe
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};