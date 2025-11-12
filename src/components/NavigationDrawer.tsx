import { useState } from "react";
import { Home, BookOpen, TrendingUp, User, MessageSquare, Users, Shield, Download, MapPin, LogIn, LogOut, Menu, FileText, Activity, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import RoadmapModal from "@/components/RoadmapModal";
import { cn } from "@/lib/utils";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Lernen", url: "/learn", icon: BookOpen },
  { title: "Fortschritt", url: "/progress", icon: TrendingUp },
];

const userItems = [
  { title: "Dashboard", url: "/dashboard", icon: User },
  { title: "Profil", url: "/profile", icon: User },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Studiengruppen", url: "/study-groups", icon: Users },
];

const adminSubItems = [
  { title: "Lerninhalte", tab: "learning", icon: BookOpen },
  { title: "Vorschläge", tab: "suggestions", icon: MessageSquare },
  { title: "Roadmap", tab: "roadmap", icon: MapPin },
  { title: "Feedbacks", tab: "feedbacks", icon: MessageSquare },
  { title: "Benutzer", tab: "users", icon: Users },
  { title: "Rollen", tab: "roles", icon: Shield },
  { title: "Notizen", tab: "notes", icon: FileText },
  { title: "Audit-Log", tab: "audit", icon: Shield },
  { title: "Analytics", tab: "analytics", icon: TrendingUp },
  { title: "Performance", tab: "performance", icon: Activity },
  { title: "Konsole", tab: "console", icon: Shield },
];

export const NavigationDrawer = () => {
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const handleNavigate = (url: string, tab?: string) => {
    if (tab) {
      navigate(`${url}?tab=${tab}`);
    } else {
      navigate(url);
    }
    setOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-card/90 backdrop-blur-sm hover:bg-card border-border shadow-lg"
          aria-label="Navigation öffnen"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-xl font-medium">Navigation</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)] px-6">
          <div className="space-y-6">
            {/* Hauptnavigation */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Hauptmenü
              </h3>
              {mainItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                return (
                  <Button
                    key={item.url}
                    variant={active ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      active && "bg-accent text-accent-foreground font-medium"
                    )}
                    onClick={() => handleNavigate(item.url)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Button>
                );
              })}
            </div>

            <Separator />

            {/* Benutzer-Bereich */}
            {user && (
              <>
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Mein Bereich
                  </h3>
                  {userItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.url);
                    return (
                      <Button
                        key={item.url}
                        variant={active ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3",
                          active && "bg-accent text-accent-foreground font-medium"
                        )}
                        onClick={() => handleNavigate(item.url)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Button>
                    );
                  })}
                </div>
                <Separator />
              </>
            )}

            {/* Admin-Bereich */}
            {isAdmin && (
              <>
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Administration
                  </h3>
                  <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={isActive("/admin") ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-between gap-3",
                          isActive("/admin") && "bg-accent text-accent-foreground font-medium"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5" />
                          <span>Admin Panel</span>
                        </div>
                        {adminOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 mt-1 space-y-1">
                      {adminSubItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Button
                            key={item.tab}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start gap-2 text-sm"
                            onClick={() => handleNavigate("/admin", item.tab)}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Button>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                <Separator />
              </>
            )}

            {/* Externe Links */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Ressourcen
              </h3>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                asChild
              >
                <a
                  href="https://drive.google.com/drive/folders/1x_OJDgFV7z0XGMcSBPIvKe-fTTHqp1kR?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-5 w-5" />
                  <span>Downloads</span>
                </a>
              </Button>

              <RoadmapModal>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>Roadmap</span>
                </Button>
              </RoadmapModal>
            </div>

            <Separator />

            {/* Auth */}
            <div className="pb-6">
              {user ? (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Abmelden</span>
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="w-full justify-start gap-3"
                  onClick={() => handleNavigate("/auth")}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Anmelden</span>
                </Button>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
