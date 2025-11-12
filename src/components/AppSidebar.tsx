import { Home, BookOpen, TrendingUp, User, MessageSquare, Users, Shield, Download, MapPin, LogIn, LogOut, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RoadmapModal from "@/components/RoadmapModal";

const mainItems = [
  { title: "Home", url: "/", icon: Home, end: true },
  { title: "Lernen", url: "/learn", icon: BookOpen, end: false },
  { title: "Fortschritt", url: "/progress", icon: TrendingUp, end: true },
];

const userItems = [
  { title: "Dashboard", url: "/dashboard", icon: User },
  { title: "Profil", url: "/profile", icon: User },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Studiengruppen", url: "/study-groups", icon: Users },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string, end?: boolean) => {
    if (end) return currentPath === path;
    return currentPath.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="bg-card">
        {/* Hauptnavigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={open ? "" : "sr-only"}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.end)}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Benutzer-Bereich */}
        {user && (
          <SidebarGroup>
            <SidebarGroupLabel className={open ? "" : "sr-only"}>
              Mein Bereich
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Admin-Bereich */}
        {isAdmin && (
          <>
            <Separator className="my-2" />
            <SidebarGroup>
              <SidebarGroupLabel className={open ? "" : "sr-only"}>
                Admin
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin")}>
                      <NavLink to="/admin">
                        <Shield className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        <Separator className="my-2" />

        {/* Externe Links & Aktionen */}
        <SidebarGroup>
          <SidebarGroupLabel className={open ? "" : "sr-only"}>
            Weitere
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="https://drive.google.com/drive/folders/1x_OJDgFV7z0XGMcSBPIvKe-fTTHqp1kR?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Downloads</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <RoadmapModal>
                  <SidebarMenuButton>
                    <MapPin className="h-4 w-4" />
                    <span>Roadmap</span>
                  </SidebarMenuButton>
                </RoadmapModal>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Auth Actions */}
        <div className="mt-auto p-4">
          {user ? (
            <Button
              variant="outline"
              className="w-full justify-start"
              size={open ? "default" : "icon"}
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              {open && <span className="ml-2">Abmelden</span>}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full justify-start"
              size={open ? "default" : "icon"}
              asChild
            >
              <NavLink to="/auth">
                <LogIn className="h-4 w-4" />
                {open && <span className="ml-2">Anmelden</span>}
              </NavLink>
            </Button>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
