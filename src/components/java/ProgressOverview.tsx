import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { javaCurriculum } from "@/data/java/curriculum";
import { Trophy, Target, Flame, BookOpen, Code2, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressOverviewProps {
  completedLessons: Set<string>;
  streak: number;
  onClose: () => void;
}

export function ProgressOverview({ completedLessons, streak, onClose }: ProgressOverviewProps) {
  // Calculate overall stats
  const stats = useMemo(() => {
    let totalLessons = 0;
    let totalTheory = 0;
    let totalExercises = 0;
    let completedTheory = 0;
    let completedExercises = 0;

    const chapterStats = javaCurriculum.map(chapter => {
      const lessons = chapter.lessons.length;
      const completed = chapter.lessons.filter(l => completedLessons.has(l.id)).length;
      const theoryCount = chapter.lessons.filter(l => l.type === "theory").length;
      const exerciseCount = chapter.lessons.filter(l => l.type !== "theory").length;
      const theoryCompleted = chapter.lessons.filter(l => l.type === "theory" && completedLessons.has(l.id)).length;
      const exerciseCompleted = chapter.lessons.filter(l => l.type !== "theory" && completedLessons.has(l.id)).length;

      totalLessons += lessons;
      totalTheory += theoryCount;
      totalExercises += exerciseCount;
      completedTheory += theoryCompleted;
      completedExercises += exerciseCompleted;

      return {
        id: chapter.id,
        title: chapter.title,
        total: lessons,
        completed,
        percentage: Math.round((completed / lessons) * 100),
        isComplete: completed === lessons,
      };
    });

    const overallPercentage = Math.round((completedLessons.size / totalLessons) * 100);

    return {
      totalLessons,
      completedCount: completedLessons.size,
      overallPercentage,
      totalTheory,
      totalExercises,
      completedTheory,
      completedExercises,
      chapterStats,
      chaptersCompleted: chapterStats.filter(c => c.isComplete).length,
      totalChapters: chapterStats.length,
    };
  }, [completedLessons]);

  // Estimate remaining time (avg 5 min per lesson)
  const remainingMinutes = (stats.totalLessons - stats.completedCount) * 5;
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMins = remainingMinutes % 60;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dein Fortschritt</h2>
        <button 
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Zurück zum Lernen
        </button>
      </div>

      {/* Main Progress Card */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Circular Progress */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#progressGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 352" }}
                  animate={{ strokeDasharray: `${(stats.overallPercentage / 100) * 352} 352` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{stats.overallPercentage}%</span>
                <span className="text-xs text-muted-foreground">abgeschlossen</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                <div className="text-2xl font-bold">{stats.completedCount}</div>
                <div className="text-xs text-muted-foreground">Lektionen</div>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <Target className="w-6 h-6 mx-auto mb-1 text-green-500" />
                <div className="text-2xl font-bold">{stats.chaptersCompleted}</div>
                <div className="text-xs text-muted-foreground">Kapitel</div>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <Flame className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <div className="text-2xl font-bold">
                  {remainingHours > 0 ? `${remainingHours}h` : `${remainingMins}m`}
                </div>
                <div className="text-xs text-muted-foreground">verbleibend</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theory vs Exercises */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Theorie</span>
              <Badge variant="secondary" className="ml-auto">
                {stats.completedTheory}/{stats.totalTheory}
              </Badge>
            </div>
            <Progress 
              value={(stats.completedTheory / stats.totalTheory) * 100} 
              className="h-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3 mb-3">
              <Code2 className="w-5 h-5 text-green-500" />
              <span className="font-medium">Übungen</span>
              <Badge variant="secondary" className="ml-auto">
                {stats.completedExercises}/{stats.totalExercises}
              </Badge>
            </div>
            <Progress 
              value={(stats.completedExercises / stats.totalExercises) * 100} 
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Chapter Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kapitel-Übersicht</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.chapterStats.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {chapter.isComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <span className={chapter.isComplete ? "text-muted-foreground" : ""}>
                    {chapter.title}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {chapter.completed}/{chapter.total}
                </span>
              </div>
              <Progress 
                value={chapter.percentage} 
                className="h-1.5"
              />
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Motivation Message */}
      {stats.overallPercentage < 100 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-4 text-center">
            {stats.overallPercentage < 25 && (
              <p>🚀 Du hast gerade erst angefangen - super Start!</p>
            )}
            {stats.overallPercentage >= 25 && stats.overallPercentage < 50 && (
              <p>💪 Weiter so! Du hast schon ein Viertel geschafft!</p>
            )}
            {stats.overallPercentage >= 50 && stats.overallPercentage < 75 && (
              <p>🔥 Halbzeit! Du bist auf dem besten Weg!</p>
            )}
            {stats.overallPercentage >= 75 && stats.overallPercentage < 100 && (
              <p>🎯 Fast geschafft! Nur noch {stats.totalLessons - stats.completedCount} Lektionen!</p>
            )}
          </CardContent>
        </Card>
      )}

      {stats.overallPercentage === 100 && (
        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
          <CardContent className="py-6 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
            <h3 className="text-xl font-bold mb-2">🎉 Kurs abgeschlossen!</h3>
            <p className="text-muted-foreground">
              Du hast alle {stats.totalLessons} Lektionen gemeistert. Herzlichen Glückwunsch!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
