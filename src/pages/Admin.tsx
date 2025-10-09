import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, BookOpen, MapPin, MessageSquare, Home, FileText } from "lucide-react";
import { AdminLearningContent } from "@/components/admin/AdminLearningContent";
import { AdminRoadmap } from "@/components/admin/AdminRoadmap";
import { AdminFeedbacks } from "@/components/admin/AdminFeedbacks";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminSuggestions } from "@/components/admin/AdminSuggestions";
import { AdminNotes } from "@/components/admin/AdminNotes";

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
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1">
                <TabsTrigger value="learning" className="text-xs lg:text-sm">
                  <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Lerninhalte</span>
                  <span className="sm:hidden">Inhalte</span>
                </TabsTrigger>
                <TabsTrigger value="suggestions" className="text-xs lg:text-sm">
                  <MessageSquare className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Vorschläge</span>
                  <span className="sm:hidden">Vor.</span>
                </TabsTrigger>
                <TabsTrigger value="roadmap" className="text-xs lg:text-sm">
                  <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Roadmap</span>
                  <span className="sm:hidden">Road</span>
                </TabsTrigger>
                <TabsTrigger value="feedbacks" className="text-xs lg:text-sm">
                  <MessageSquare className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Feedbacks</span>
                  <span className="sm:hidden">Feed</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="text-xs lg:text-sm">
                  <Home className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Benutzer</span>
                  <span className="sm:hidden">User</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-xs lg:text-sm">
                  <FileText className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Notizen</span>
                  <span className="sm:hidden">Note</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="learning" className="mt-6">
                <AdminLearningContent />
              </TabsContent>

              <TabsContent value="suggestions" className="mt-6">
                <AdminSuggestions />
              </TabsContent>

              <TabsContent value="roadmap" className="mt-6">
                <AdminRoadmap />
              </TabsContent>

              <TabsContent value="feedbacks" className="mt-6">
                <AdminFeedbacks />
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <AdminUsers />
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <AdminNotes />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
