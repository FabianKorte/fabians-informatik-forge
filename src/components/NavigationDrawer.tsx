import { useState } from "react";
import { Home, BookOpen, TrendingUp, User, MessageSquare, Users, Shield, Download, MapPin, LogIn, LogOut, Menu, FileText, Activity, ChevronDown, ChevronRight, AlertCircle, BarChart3, GraduationCap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCounts } from "@/hooks/useAdminCounts";
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
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Fortschritt", url: "/progress", icon: TrendingUp },
  { title: "Roadmap", url: "/roadmap", icon: MapPin },
];

const userItems = [
  { title: "Dashboard", url: "/dashboard", icon: User },
  { title: "Profil", url: "/profile", icon: User },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Lerngruppen", url: "/study-groups", icon: Users },
];

// Resource links visible to all users
const resourceItems = [
  { title: "IT-Lexikon", url: "/lexikon", icon: BookOpen, external: false },
  { title: "Downloads", url: "https://drive.google.com/drive/folders/1x_OJDgFV7z0XGMcSBPIvKe-fTTHqp1kR?usp=sharing", icon: Download, external: true },
  { title: "Lernmaterial", url: "/lernmaterial", icon: GraduationCap, external: false },
  { title: "Fehler melden", url: "/report-error", icon: AlertCircle, external: false },
  { title: "Datenschutz", url: "/privacy", icon: Shield, external: false },
] as const;

const adminSubItems = [
  { title: "Ankündigungen", tab: "announcements", icon: MessageSquare },
  { title: "Lerninhalte", tab: "learning", icon: BookOpen },
  { title: "Kategorien", tab: "categories", icon: BarChart3 },
  { title: "Vorschläge", tab: "suggestions", icon: MessageSquare },
  { title: "Roadmap", tab: "roadmap", icon: MapPin },
  { title: "Feedbacks", tab: "feedbacks", icon: MessageSquare },
  { title: "Fehlerberichte", tab: "error-reports", icon: AlertCircle },
  { title: "Benutzer", tab: "users", icon: Users },
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
  const { counts } = useAdminCounts();

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

  const getCountForTab = (tab: string): number => {
    switch (tab) {
      case 'feedbacks':
        return counts.feedbacks;
      case 'users':
        return counts.users;
      default:
        return 0;
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md hover:from-card hover:to-card/90 border border-border/50 shadow-elegant transition-all duration-300 hover:scale-105"
          aria-label="Navigation öffnen"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 p-0 bg-gradient-to-b from-background to-background/95">
        <SheetHeader className="p-6 pb-4 border-b border-border/50">
          <SheetTitle className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Navigation
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] px-4 py-4">
          <div className="space-y-4">
            {/* Hauptnavigation */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                Hauptmenü
              </h3>
              {mainItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                return (
                  <Button
                    key={item.url}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 transition-all duration-200",
                      active && "bg-gradient-to-r from-accent/20 to-accent/10 text-accent-foreground font-medium shadow-sm border-l-2 border-accent"
                    )}
                    onClick={() => handleNavigate(item.url)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Button>
                );
              })}
            </div>

            <Separator className="my-4" />

            {/* Benutzer-Bereich */}
            {user && (
              <>
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                    Mein Bereich
                  </h3>
                  {userItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.url);
                    return (
                      <Button
                        key={item.url}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-3 transition-all duration-200",
                          active && "bg-gradient-to-r from-accent/20 to-accent/10 text-accent-foreground font-medium shadow-sm border-l-2 border-accent"
                        )}
                        onClick={() => handleNavigate(item.url)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Button>
                    );
                  })}
                </div>
                <Separator className="my-4" />
              </>
            )}

            {/* Admin-Bereich */}
            {isAdmin && (
              <>
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                    Administration
                  </h3>
                  <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between gap-3 transition-all duration-200",
                          isActive("/admin") && "bg-gradient-to-r from-accent/20 to-accent/10 text-accent-foreground font-medium shadow-sm border-l-2 border-accent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5" />
                          <span>Admin Panel</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {(counts.feedbacks + counts.users) > 0 && (
                            <Badge variant="destructive" className="text-xs animate-pulse">
                              {counts.feedbacks + counts.users}
                            </Badge>
                          )}
                          {adminOpen ? (
                            <ChevronDown className="h-4 w-4 transition-transform" />
                          ) : (
                            <ChevronRight className="h-4 w-4 transition-transform" />
                          )}
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 mt-1 space-y-1 animate-in slide-in-from-top-2">
                      {adminSubItems.map((item) => {
                        const Icon = item.icon;
                        const count = getCountForTab(item.tab);
                        return (
                          <Button
                            key={item.tab}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-between gap-2 text-sm hover:bg-accent/10 transition-colors"
                            onClick={() => handleNavigate("/admin", item.tab)}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </div>
                            {count > 0 && (
                              <Badge variant="destructive" className="ml-auto text-xs animate-pulse">
                                {count}
                              </Badge>
                            )}
                          </Button>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                <Separator className="my-4" />
              </>
            )}

            {/* Externe Links & Ressourcen */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                Ressourcen
              </h3>
              
              {resourceItems.map((item) => {
                const Icon = item.icon;
                const active = !item.external && isActive(item.url);
                
                if (item.external) {
                  return (
                    <Button
                      key={item.url}
                      variant="ghost"
                      className="w-full justify-start gap-3 hover:bg-accent/10 transition-colors"
                      asChild
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    </Button>
                  );
                }
                
                return (
                  <Button
                    key={item.url}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 transition-all duration-200",
                      active && "bg-gradient-to-r from-accent/20 to-accent/10 text-accent-foreground font-medium shadow-sm border-l-2 border-accent"
                    )}
                    onClick={() => handleNavigate(item.url)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </ScrollArea>

        {/* Auth Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-gradient-to-t from-background to-background/50 backdrop-blur-sm">
          {user ? (
            <Button
              variant="outline"
              className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              <span>Abmelden</span>
            </Button>
          ) : (
            <Button
              className="w-full justify-start gap-3 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-accent transition-all duration-300"
              onClick={() => handleNavigate("/auth")}
            >
              <LogIn className="h-5 w-5" />
              <span>Anmelden</span>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
