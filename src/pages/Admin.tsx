import { useState, lazy, Suspense, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, BookOpen, MapPin, MessageSquare, Home, FileText, Users, Shield, TrendingUp, Activity, AlertCircle, Bell, BarChart3, Terminal, Radio, Menu } from "lucide-react";
import { useAdminCounts } from "@/hooks/useAdminCounts";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Lazy load admin components
const AdminAnnouncements = lazy(() => import("@/components/admin/AdminAnnouncements"));
const AdminLearningContent = lazy(() => import("@/components/admin/AdminLearningContent"));
const AdminRoadmap = lazy(() => import("@/components/admin/AdminRoadmap"));
const AdminFeedbacks = lazy(() => import("@/components/admin/AdminFeedbacks"));
const AdminUsers = lazy(() => import("@/components/admin/AdminUsers"));
const AdminSuggestions = lazy(() => import("@/components/admin/AdminSuggestions"));
const AdminNotes = lazy(() => import("@/components/admin/AdminNotes"));
const AdminAuditLogs = lazy(() => import("@/components/admin/AdminAuditLogs"));
const LiveAuditLog = lazy(() => import("@/components/admin/LiveAuditLog"));
const RolePermissions = lazy(() => import("@/components/admin/RolePermissions"));
const LiveUserTracking = lazy(() => import("@/components/admin/LiveUserTracking"));
const RealtimeConsole = lazy(() => import("@/components/admin/RealtimeConsole"));
const AnalyticsDashboard = lazy(() => import("@/components/admin/AnalyticsDashboard"));
const CategoryManager = lazy(() => import("@/components/admin/CategoryManager"));
const PerformanceMonitor = lazy(() => import("@/components/admin/PerformanceMonitor"));
const ErrorConsole = lazy(() => import("@/components/admin/ErrorConsole"));
const AdminErrorReporting = lazy(() => import("@/components/admin/AdminErrorReporting"));

const TabSkeleton = () => (
  <div className="space-y-4">
    <div className="h-8 w-48 bg-muted animate-pulse rounded" />
    <div className="h-64 bg-muted animate-pulse rounded" />
  </div>
);

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
  badge?: number;
  gradient?: string;
}

const AdminCard = ({ title, description, icon: Icon, onClick, badge, gradient = "from-primary/10 to-primary/5" }: AdminCardProps) => (
  <Card 
    className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50 overflow-hidden"
    onClick={onClick}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
    <CardHeader className="relative p-3 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
        </div>
        {badge !== undefined && badge > 0 && (
          <Badge variant="destructive" className="animate-pulse text-xs">
            {badge}
          </Badge>
        )}
      </div>
      <CardTitle className="mt-2 sm:mt-4 text-sm sm:text-base group-hover:text-primary transition-colors">{title}</CardTitle>
      <CardDescription className="text-xs sm:text-sm hidden sm:block">{description}</CardDescription>
    </CardHeader>
  </Card>
);

export default function Admin() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { counts, markUsersAsSeen } = useAdminCounts();

  // Read tab parameter from URL and set active section
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveSection(tab);
    }
  }, [searchParams]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const renderSection = () => {
    if (!activeSection) return null;

    const sections: Record<string, JSX.Element> = {
      announcements: <AdminAnnouncements />,
      learning: <AdminLearningContent />,
      categories: <CategoryManager />,
      suggestions: <AdminSuggestions />,
      feedbacks: <AdminFeedbacks />,
      "error-reports": <AdminErrorReporting />,
      users: <AdminUsers />,
      roles: <RolePermissions />,
      notes: <AdminNotes />,
      roadmap: <AdminRoadmap />,
      audit: (
        <div className="space-y-6">
          <LiveAuditLog />
          <AdminAuditLogs />
        </div>
      ),
      analytics: <AnalyticsDashboard />,
      performance: <PerformanceMonitor />,
      console: <RealtimeConsole />,
      tracking: <LiveUserTracking />,
    };

    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setActiveSection(null)}
          className="mb-4"
        >
          ← Zurück zum Dashboard
        </Button>
        <Suspense fallback={<TabSkeleton />}>
          {sections[activeSection]}
        </Suspense>
      </div>
    );
  };

  if (activeSection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h1 className="text-lg sm:text-2xl font-bold">Admin</h1>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                <Home className="w-4 h-4 mr-2" />
                Startseite
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Abmelden
              </Button>
            </div>
            {/* Mobile Menu */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-4 mt-8">
                    <Button variant="outline" onClick={() => navigate("/")}>
                      <Home className="w-4 h-4 mr-2" />
                      Zur Startseite
                    </Button>
                    <Button variant="outline" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Abmelden
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {renderSection()}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h1 className="text-lg sm:text-2xl font-bold">Admin</h1>
          </div>
          <div className="hidden sm:flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Startseite
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
          {/* Mobile Menu */}
          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <Button variant="outline" onClick={() => navigate("/")}>
                    <Home className="w-4 h-4 mr-2" />
                    Zur Startseite
                  </Button>
                  <Button variant="outline" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Abmelden
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Verwalte alle Aspekte deiner Lernplattform
          </p>
        </div>

        {/* Content Management */}
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold">Inhalte</h3>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <AdminCard
              title="Ankündigungen"
              description="Verwalte System-Ankündigungen"
              icon={Bell}
              onClick={() => setActiveSection("announcements")}
              gradient="from-blue-500/10 to-blue-500/5"
            />
            <AdminCard
              title="Lerninhalte"
              description="Verwalte Lernmodule und Quiz"
              icon={BookOpen}
              onClick={() => setActiveSection("learning")}
              gradient="from-green-500/10 to-green-500/5"
            />
            <AdminCard
              title="Kategorien"
              description="Verwalte Lernkategorien"
              icon={BarChart3}
              onClick={() => setActiveSection("categories")}
              gradient="from-purple-500/10 to-purple-500/5"
            />
            <AdminCard
              title="Vorschläge"
              description="Benutzervorschläge prüfen"
              icon={MessageSquare}
              onClick={() => setActiveSection("suggestions")}
              gradient="from-orange-500/10 to-orange-500/5"
            />
          </div>
        </section>

        {/* Community */}
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold">Community</h3>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <AdminCard
              title="Feedbacks"
              description="Benutzerfeedback ansehen"
              icon={MessageSquare}
              onClick={() => setActiveSection("feedbacks")}
              badge={counts.feedbacks}
              gradient="from-pink-500/10 to-pink-500/5"
            />
            <AdminCard
              title="Fehlerberichte"
              description="Bug-Reports verwalten"
              icon={AlertCircle}
              onClick={() => setActiveSection("error-reports")}
              gradient="from-red-500/10 to-red-500/5"
            />
            <AdminCard
              title="Benutzer"
              description="Benutzerverwaltung"
              icon={Users}
              onClick={() => {
                setActiveSection("users");
                // Mark users as seen when clicking the card
                markUsersAsSeen();
              }}
              badge={counts.users}
              gradient="from-cyan-500/10 to-cyan-500/5"
            />
            <AdminCard
              title="Rollen"
              description="Berechtigungen"
              icon={Shield}
              onClick={() => setActiveSection("roles")}
              gradient="from-violet-500/10 to-violet-500/5"
            />
            <AdminCard
              title="Notizen"
              description="Admin-Notizen verwalten"
              icon={FileText}
              onClick={() => setActiveSection("notes")}
              gradient="from-amber-500/10 to-amber-500/5"
            />
          </div>
        </section>

        {/* Development */}
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold">Entwicklung</h3>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2">
            <AdminCard
              title="Roadmap"
              description="Feature-Roadmap planen"
              icon={MapPin}
              onClick={() => setActiveSection("roadmap")}
              gradient="from-indigo-500/10 to-indigo-500/5"
            />
            <AdminCard
              title="Audit-Log"
              description="System-Aktivitäten prüfen"
              icon={Shield}
              onClick={() => setActiveSection("audit")}
              gradient="from-slate-500/10 to-slate-500/5"
            />
          </div>
        </section>

        {/* Monitoring */}
        <section>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold">Monitoring</h3>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <AdminCard
              title="Analytics"
              description="Nutzungsstatistiken ansehen"
              icon={TrendingUp}
              onClick={() => setActiveSection("analytics")}
              gradient="from-emerald-500/10 to-emerald-500/5"
            />
            <AdminCard
              title="Performance"
              description="System-Performance überwachen"
              icon={Activity}
              onClick={() => setActiveSection("performance")}
              gradient="from-violet-500/10 to-violet-500/5"
            />
            <AdminCard
              title="Konsole"
              description="Echtzeit-DB-Stream"
              icon={Terminal}
              onClick={() => setActiveSection("console")}
              gradient="from-rose-500/10 to-rose-500/5"
            />
            <AdminCard
              title="Live Tracking"
              description="Benutzer-Aktivität"
              icon={Radio}
              onClick={() => setActiveSection("tracking")}
              gradient="from-teal-500/10 to-teal-500/5"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
