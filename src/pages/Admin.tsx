import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, BookOpen, MapPin, MessageSquare, Home } from "lucide-react";
import { AdminLearningContent } from "@/components/admin/AdminLearningContent";
import { AdminRoadmap } from "@/components/admin/AdminRoadmap";
import { AdminFeedbacks } from "@/components/admin/AdminFeedbacks";

export default function Admin() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("learning");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Admin-Bereich</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Zur Startseite
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Verwaltung</CardTitle>
            <CardDescription>
              Verwalte Lerninhalte, Roadmap und Feedbacks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="learning">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Lerninhalte
                </TabsTrigger>
                <TabsTrigger value="roadmap">
                  <MapPin className="w-4 h-4 mr-2" />
                  Roadmap
                </TabsTrigger>
                <TabsTrigger value="feedbacks">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Feedbacks
                </TabsTrigger>
              </TabsList>

              <TabsContent value="learning" className="mt-6">
                <AdminLearningContent />
              </TabsContent>

              <TabsContent value="roadmap" className="mt-6">
                <AdminRoadmap />
              </TabsContent>

              <TabsContent value="feedbacks" className="mt-6">
                <AdminFeedbacks />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
