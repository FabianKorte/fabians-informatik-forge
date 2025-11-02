import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, BookOpen, MapPin, MessageSquare, Home, FileText, Users, Shield } from "lucide-react";

// Lazy load admin components
const AdminLearningContent = lazy(() => import("@/components/admin/AdminLearningContent").then(m => ({ default: m.AdminLearningContent })));
const AdminRoadmap = lazy(() => import("@/components/admin/AdminRoadmap").then(m => ({ default: m.AdminRoadmap })));
const AdminFeedbacks = lazy(() => import("@/components/admin/AdminFeedbacks").then(m => ({ default: m.AdminFeedbacks })));
const AdminUsers = lazy(() => import("@/components/admin/AdminUsers").then(m => ({ default: m.AdminUsers })));
const AdminSuggestions = lazy(() => import("@/components/admin/AdminSuggestions").then(m => ({ default: m.AdminSuggestions })));
const AdminNotes = lazy(() => import("@/components/admin/AdminNotes").then(m => ({ default: m.AdminNotes })));
const AdminAuditLogs = lazy(() => import("@/components/admin/AdminAuditLogs").then(m => ({ default: m.AdminAuditLogs })));
const BulkEditModules = lazy(() => import("@/components/admin/BulkEditModules").then(m => ({ default: m.BulkEditModules })));

const TabSkeleton = () => (
  <div className="space-y-4">
    <div className="h-8 w-48 bg-muted animate-pulse rounded" />
    <div className="h-64 bg-muted animate-pulse rounded" />
  </div>
);

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
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-1">
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
                  <Users className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Benutzer</span>
                  <span className="sm:hidden">User</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-xs lg:text-sm">
                  <FileText className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Notizen</span>
                  <span className="sm:hidden">Note</span>
                </TabsTrigger>
                <TabsTrigger value="audit" className="text-xs lg:text-sm">
                  <Shield className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Audit-Log</span>
                  <span className="sm:hidden">Audit</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="learning" className="mt-6">
                <Suspense fallback={<TabSkeleton />}>
                  <AdminLearningContent />
                </Suspense>
              </TabsContent>

              <TabsContent value="suggestions" className="mt-6">
                <Suspense fallback={<TabSkeleton />}>
                  <AdminSuggestions />
                </Suspense>
              </TabsContent>

              <TabsContent value="roadmap" className="mt-6">
                <Suspense fallback={<TabSkeleton />}>
                  <AdminRoadmap />
                </Suspense>
              </TabsContent>

              <TabsContent value="feedbacks" className="mt-6">
                <Suspense fallback={<TabSkeleton />}>
                  <AdminFeedbacks />
                </Suspense>
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <Suspense fallback={<TabSkeleton />}>
                  <AdminUsers />
                </Suspense>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <Suspense fallback={<TabSkeleton />}>
                  <AdminNotes />
                </Suspense>
              </TabsContent>

              <TabsContent value="audit" className="mt-6">
                <Suspense fallback={<TabSkeleton />}>
                  <AdminAuditLogs />
                </Suspense>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
