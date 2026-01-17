import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { javaCurriculum } from "@/data/java/curriculum";
import { LessonView } from "./LessonView";
import { Shuffle, RotateCcw, Trophy, Target, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { JavaLesson } from "@/types/javaLearning";

interface PracticeModeProps {
  completedLessons: Set<string>;
  onClose: () => void;
}

export function PracticeMode({ completedLessons, onClose }: PracticeModeProps) {
  const [currentExercise, setCurrentExercise] = useState<JavaLesson | null>(null);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Get all completed exercises (not theory lessons)
  const availableExercises = useMemo(() => {
    const exercises: JavaLesson[] = [];
    
    for (const chapter of javaCurriculum) {
      for (const lesson of chapter.lessons) {
        // Only include completed lessons that are exercises (not theory)
        if (completedLessons.has(lesson.id) && lesson.type !== "theory") {
          exercises.push(lesson);
        }
      }
    }
    
    return exercises;
  }, [completedLessons]);

  // Pick a random exercise
  const pickRandomExercise = useCallback(() => {
    if (availableExercises.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * availableExercises.length);
    setCurrentExercise(availableExercises[randomIndex]);
    setSessionStarted(true);
  }, [availableExercises]);

  // Handle exercise completion
  const handleComplete = useCallback(() => {
    setExercisesCompleted(prev => prev + 1);
  }, []);

  // Next random exercise
  const handleNext = useCallback(() => {
    pickRandomExercise();
  }, [pickRandomExercise]);

  // Not enough exercises
  if (availableExercises.length < 3) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shuffle className="w-5 h-5 text-orange-500" />
              Übungsmodus
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Noch nicht genug Übungen</h3>
          <p className="text-muted-foreground mb-6">
            Schließe mindestens 3 Übungen ab, um den Übungsmodus freizuschalten.
          </p>
          <p className="text-sm text-muted-foreground">
            Du hast {availableExercises.length} von 3 benötigten Übungen abgeschlossen.
          </p>
          <Button onClick={onClose} className="mt-6">
            Zurück zum Lernen
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Start screen
  if (!sessionStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shuffle className="w-5 h-5 text-orange-500" />
              Übungsmodus
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="text-center py-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <RotateCcw className="w-16 h-16 mx-auto mb-4 text-orange-500" />
            <h3 className="text-xl font-semibold mb-2">Bereit zum Üben?</h3>
            <p className="text-muted-foreground mb-6">
              Der Übungsmodus wählt zufällige Aufgaben aus deinen bereits 
              abgeschlossenen Lektionen. So festigst du dein Wissen!
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge variant="secondary" className="text-sm">
                {availableExercises.length} Übungen verfügbar
              </Badge>
            </div>

            <Button 
              size="lg" 
              onClick={pickRandomExercise}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Zufällige Übung starten
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  // Exercise view
  return (
    <div className="space-y-4">
      {/* Practice header */}
      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-orange-500 text-orange-500">
                <Shuffle className="w-3 h-3 mr-1" />
                Übungsmodus
              </Badge>
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>{exercisesCompleted} geschafft</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Beenden
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current exercise */}
      <AnimatePresence mode="wait">
        {currentExercise && (
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LessonView
              lesson={currentExercise}
              onComplete={handleComplete}
              onNext={handleNext}
              hasNext={true}
              isPracticeMode={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
