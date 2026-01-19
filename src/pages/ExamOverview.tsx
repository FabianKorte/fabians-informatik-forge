import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Clock, 
  Target, 
  ArrowRight,
  BookOpen,
  Briefcase,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { examConfigs } from "@/data/exam";
import { SEO } from "@/components/SEO";

const ExamOverview = () => {
  const navigate = useNavigate();

  const exams = Object.values(examConfigs);

  return (
    <>
      <SEO 
        title="IHK Prüfungssimulator | Fachinformatiker Prüfungsvorbereitung"
        description="Bereite dich optimal auf die IHK Abschlussprüfung Teil 1 und Teil 2 vor. Realistische Prüfungssimulation mit Timer, Punktebewertung und detaillierter Auswertung."
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary/10 to-background py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <GraduationCap className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">IHK Prüfungssimulator</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simuliere die IHK Abschlussprüfung unter realistischen Bedingungen. 
                Mit Timer, Punktebewertung und detaillierter Auswertung nach Themengebieten.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Exam Cards */}
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardContent className="pt-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-600 dark:text-blue-400">Hinweis zur Prüfungsvorbereitung</p>
                  <p className="text-muted-foreground mt-1">
                    Diese Simulationen orientieren sich an der IHK-Prüfungsstruktur und -themen. 
                    Die tatsächlichen Prüfungsfragen können abweichen. Nutze diese Übungen als Ergänzung 
                    zu deinen offiziellen Lernmaterialien.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {exams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Card className="group hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/exam/${exam.id}`)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {exam.id === 'teil1' ? (
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-500" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-purple-500" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-xl">{exam.title}</CardTitle>
                        <CardDescription className="mt-1">{exam.description}</CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{exam.timeLimitMinutes} Minuten</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target className="w-4 h-4" />
                      <span>{exam.questions.length} Fragen</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>{exam.totalPoints} Punkte</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exam.categories.map(cat => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Study Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tipps für die Prüfungsvorbereitung</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-medium">1</span>
                    <span>Simuliere die Prüfung unter realistischen Bedingungen - ohne Hilfsmittel und Unterbrechungen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-medium">2</span>
                    <span>Achte auf dein Zeitmanagement: ~1,5 Minuten pro Frage bei 60 Fragen / 90 Minuten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-medium">3</span>
                    <span>Markiere schwierige Fragen und komme später darauf zurück</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-medium">4</span>
                    <span>Analysiere deine Schwächen nach der Prüfung und arbeite gezielt daran</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back Button */}
          <Button variant="outline" onClick={() => navigate('/')} className="w-full">
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExamOverview;
