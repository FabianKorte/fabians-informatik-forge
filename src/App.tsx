import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Privacy from "./pages/Privacy";
import { AuthProvider } from "@/hooks/useAuth";
import { useViewTransition } from "@/hooks/useViewTransition";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FallbackLoader } from "@/components/FallbackLoader";
import { AdminErrorBoundary } from "@/components/ErrorBoundaries/AdminErrorBoundary";
import { ChatErrorBoundary } from "@/components/ErrorBoundaries/ChatErrorBoundary";
import { LearnErrorBoundary } from "@/components/ErrorBoundaries/LearnErrorBoundary";
import { SkipToContent } from "@/components/SkipToContent";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import ClickSpark from "@/components/ui/ClickSpark";
import { TentacleBackground } from "@/components/TentacleBackground";
import { NavigationDrawer } from "@/components/NavigationDrawer";

// Lazy load heavy pages and components
const LearnPage = lazy(() => import("./pages/Learn"));
const Progress = lazy(() => import("./pages/Progress"));
const Admin = lazy(() => import("./pages/Admin"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Chat = lazy(() => import("./pages/Chat"));
const StudyGroups = lazy(() => import("./pages/StudyGroups"));
const Install = lazy(() => import("./pages/Install"));
const Lexikon = lazy(() => import("./pages/Lexikon"));
const AIChatbot = lazy(() => import("@/components/AIChatbot").then(module => ({ default: module.AIChatbot })));

const queryClient = new QueryClient();

const AppRoutes = () => {
  useViewTransition();
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationDrawer />
      <SkipToContent />
      <main id="main-content" className="flex-1" role="main">
        <Suspense fallback={<FallbackLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/learn/:categoryId" element={
              <LearnErrorBoundary>
                <LearnPage />
              </LearnErrorBoundary>
            } />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminErrorBoundary>
                    <Admin />
                  </AdminErrorBoundary>
                </ProtectedRoute>
              } 
            />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/study-groups" element={<StudyGroups />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/install" element={<Install />} />
            <Route path="/lexikon" element={<Lexikon />} />
            <Route path="/chat" element={
              <ChatErrorBoundary>
                <Chat />
              </ChatErrorBoundary>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <TentacleBackground />
            <ClickSpark
              sparkColor="hsl(var(--primary))"
              sparkSize={12}
              sparkRadius={20}
              sparkCount={8}
              duration={500}
            >
              <AppRoutes />
              <PWAInstallPrompt />
              <OfflineIndicator />
            </ClickSpark>
          </BrowserRouter>
          <Suspense fallback={null}>
            <ChatErrorBoundary>
              <AIChatbot />
            </ChatErrorBoundary>
          </Suspense>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
