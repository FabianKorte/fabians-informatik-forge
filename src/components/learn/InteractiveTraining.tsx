import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AlertCircle, Lightbulb, Calculator, Clock, Trophy, Target, Code, FileText, Brain, Zap, Star, BookOpen, Plus } from "lucide-react";
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
    }
  };

  const resetTask = () => {
    setUserAnswer("");
    setShowFeedback(false);
    setAttempts(0);
    setShowHints([]);
    setShowTimeUpHelp(false);
    setTimeLeft(currentTask.gamification.timeLimit || null);
  };

  const addToFocusTraining = () => {
    toast.success("🎯 Aufgabe zu Schwerpunkt-Training hinzugefügt!");
  };

  if (!currentTask) {
    return (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-accent/5 to-warning/5 animate-pulse-glow" />
        <Card className="relative glass-effect border-none shadow-elegant animate-fade-up">
          <CardContent className="p-12 text-center">
            <div className="relative">
              <div className="text-8xl mb-6 animate-bounce">🏆</div>
              <div className="absolute -top-2 -right-2 text-2xl animate-float">✨</div>
              <div className="absolute -bottom-2 -left-2 text-2xl animate-float-reverse">🎉</div>
            </div>
            
            <h3 className="text-3xl font-bold mb-4 text-gradient">Training erfolgreich abgeschlossen!</h3>
            
            <div className="bg-gradient-to-r from-success via-accent to-warning bg-clip-text text-transparent">
              <div className="text-5xl font-black mb-4">{totalPoints}</div>
              <p className="text-lg font-semibold">Punkte gesammelt</p>
            </div>
            
            <div className="mt-6 p-4 rounded-xl bg-success/10 border border-success/20">
              <p className="text-success-foreground font-medium">
                🎯 {completed.filter(Boolean).length} von {tasks.length} Aufgaben erfolgreich gelöst!
              </p>
            </div>
            
            <div className="flex justify-center gap-3 mt-8">
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
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-success/3 animate-pulse-glow" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl animate-float-reverse" />
      </div>

      <div className="space-y-8 relative z-10">
        {/* Enhanced Header with Progress */}
        <div className="space-y-6">
          <Card className="glass-effect border-none shadow-accent animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-accent-light shadow-accent">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gradient">Interaktives Training</h3>
                    <p className="text-muted-foreground">
                      Mission {currentTaskIndex + 1} von {tasks.length}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-warning/10 border border-warning/20">
                    <Trophy className="w-5 h-5 text-warning" />
                    <span className="font-bold text-lg">{totalPoints}</span>
                    <span className="text-sm text-muted-foreground">XP</span>
                  </div>
                  {timeLeft && (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                      timeLeft <= 30 ? 'bg-destructive/10 border-destructive/20' : 'bg-accent/10 border-accent/20'
                    }`}>
                      <Clock className={`w-5 h-5 ${timeLeft <= 30 ? 'text-destructive animate-pulse' : 'text-accent'}`} />
                      <span className="font-mono font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <Progress value={progress} className="h-3 bg-secondary/50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-success/20 rounded-full" 
                       style={{ width: `${progress}%` }} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={currentTask.difficulty === 'leicht' ? 'secondary' : 
                               currentTask.difficulty === 'mittel' ? 'default' : 'destructive'}
                      className="px-3 py-1 font-medium"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      {currentTask.difficulty}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      Level {currentTask.gamification.level}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      {currentTask.taskType}
                    </Badge>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addToFocusTraining}
                    className="hover:shadow-accent transition-all"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Zu Schwerpunkt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Task Content */}
        <Card className="gradient-shadow-card border-none shadow-elegant animate-scale-in">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-4">
              <div className="relative">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary-light shadow-primary">
                  <span className="text-3xl">
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
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gradient">Challenge #{currentTaskIndex + 1}</h4>
                <p className="text-muted-foreground font-medium">Zeige dein Können!</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Enhanced Task Description */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-card to-card-hover border border-border/50 shadow-elegant">
              <div className="absolute top-4 right-4">
                <BookOpen className="w-5 h-5 text-muted-foreground/50" />
              </div>
              <p className="leading-relaxed text-lg font-medium pr-8">{currentTask.taskText}</p>
            </div>

            {/* Enhanced Tools and Help Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentTask.tools.length > 0 && (
                <Button 
                  variant="outline" 
                  className="h-16 flex-col gap-2 hover:shadow-accent transition-all hover:scale-105"
                  onClick={() => setShowTools(!showTools)}
                >
                  <Calculator className="w-6 h-6 text-accent" />
                  <div className="text-center">
                    <div className="font-semibold">Hilfsmittel</div>
                    <div className="text-xs text-muted-foreground">{currentTask.tools.length} verfügbar</div>
                  </div>
                </Button>
              )}
              
              {currentTask.infoTexts.length > 0 && (
                <Button 
                  variant="outline" 
                  className="h-16 flex-col gap-2 hover:shadow-success transition-all hover:scale-105"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <FileText className="w-6 h-6 text-success" />
                  <div className="text-center">
                    <div className="font-semibold">Wissen</div>
                    <div className="text-xs text-muted-foreground">{currentTask.infoTexts.length} Info-Texte</div>
                  </div>
                </Button>
              )}

              {currentTask.helpButtons.length > 0 && (
                <Button 
                  variant="outline" 
                  className="h-16 flex-col gap-2 hover:shadow-warning transition-all hover:scale-105"
                  onClick={() => {
                    const newShowHints = [...showHints];
                    const nextIndex = showHints.findIndex(show => !show);
                    if (nextIndex >= 0) {
                      newShowHints[nextIndex] = true;
                      setShowHints(newShowHints);
                    }
                  }}
                >
                  <Lightbulb className="w-6 h-6 text-warning" />
                  <div className="text-center">
                    <div className="font-semibold">Hilfe</div>
                    <div className="text-xs text-muted-foreground">{currentTask.helpButtons.length} Tipps</div>
                  </div>
                </Button>
              )}
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

            {/* Enhanced Input Area */}
            <div className="space-y-6">
              <div className="text-center">
                <h5 className="text-lg font-semibold mb-2 text-gradient">Deine Lösung</h5>
                <p className="text-muted-foreground">Gib deine beste Antwort ein und zeige dein Wissen!</p>
              </div>
              
              {currentTask.inputFormat === 'code' ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Code className="w-4 h-4" />
                    Code-Editor
                  </div>
                  <Textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="// Schreibe deinen Code hier..."
                    className="font-mono text-sm min-h-[160px] border-2 border-dashed border-accent/30 focus:border-accent/60 bg-card/50 backdrop-blur-sm"
                    disabled={showFeedback && isCorrect}
                  />
                </div>
              ) : currentTask.inputFormat === 'number' ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Target className="w-4 h-4" />
                    Numerische Antwort
                  </div>
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Deine Antwort eingeben..."
                    className="text-center text-2xl font-bold h-16 border-2 border-dashed border-success/30 focus:border-success/60 bg-card/50 backdrop-blur-sm"
                    disabled={showFeedback && isCorrect}
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    Text-Antwort
                  </div>
                  <Input
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Deine Antwort eingeben..."
                    className="text-lg h-14 border-2 border-dashed border-warning/30 focus:border-warning/60 bg-card/50 backdrop-blur-sm"
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

            {/* Time Up Help Section */}
            {showTimeUpHelp && !showFeedback && (
              <Card className="border-warning/20 bg-warning/5 animate-fade-in">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">⏰</div>
                  <h5 className="text-lg font-semibold mb-3">Zeit ist um!</h5>
                  <p className="text-muted-foreground mb-6">
                    Keine Sorge! Du kannst trotzdem weitermachen oder dir Hilfe holen.
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newShowHints = [...showHints];
                        const nextIndex = showHints.findIndex(show => !show);
                        if (nextIndex >= 0) {
                          newShowHints[nextIndex] = true;
                          setShowHints(newShowHints);
                        }
                        setShowTimeUpHelp(false);
                      }}
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Tipp anzeigen
                    </Button>
                    <Button onClick={() => setShowTimeUpHelp(false)}>
                      Weitermachen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Action Buttons */}
            <div className="flex justify-center">
              {!showFeedback ? (
                <Button 
                  onClick={checkAnswer} 
                  disabled={!userAnswer.trim()}
                  size="lg"
                  className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-accent to-accent-light hover:shadow-accent transition-all hover:scale-105 animate-pulse-glow"
                >
                  <Target className="w-5 h-5 mr-3" />
                  Lösung prüfen
                </Button>
              ) : isCorrect ? (
                <Button 
                  onClick={nextTask} 
                  size="lg"
                  className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-success to-success-light hover:shadow-success transition-all hover:scale-105"
                >
                  <Star className="w-5 h-5 mr-3" />
                  {currentTaskIndex < tasks.length - 1 ? 'Nächste Challenge' : 'Training beenden'}
                </Button>
              ) : (
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={resetTask}
                    size="lg"
                    className="px-8 py-4 text-lg hover:shadow-warning transition-all hover:scale-105"
                  >
                    🔄 Nochmal versuchen
                  </Button>
                  <Button 
                    onClick={nextTask}
                    size="lg"
                    className="px-8 py-4 text-lg hover:shadow-accent transition-all hover:scale-105"
                  >
                    ⏭️ Überspringen
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};