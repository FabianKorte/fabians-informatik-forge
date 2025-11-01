import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StudyGroupsList } from "@/components/study-groups/StudyGroupsList";
import { SEO } from "@/components/SEO";

const StudyGroups = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Lerngruppen | IHK IT-Prüfungsvorbereitung"
        description="Trete Lerngruppen bei oder erstelle eigene Gruppen zum gemeinsamen Lernen"
        keywords="Lerngruppen, Kollaboration, Gemeinsam Lernen, IHK, IT"
      />
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Lerngruppen</h1>
              <p className="text-muted-foreground">
                Lerne gemeinsam mit anderen und teile dein Wissen
              </p>
            </div>
          </div>

          <StudyGroupsList />
        </div>
      </div>
    </>
  );
};

export default StudyGroups;
