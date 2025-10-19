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
import { AIChatbot } from "@/components/AIChatbot";
import { AuthProvider } from "@/hooks/useAuth";
import { useViewTransition } from "@/hooks/useViewTransition";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FallbackLoader } from "@/components/FallbackLoader";

// Lazy load heavy pages
const LearnPage = lazy(() => import("./pages/Learn"));
const Progress = lazy(() => import("./pages/Progress"));
const Admin = lazy(() => import("./pages/Admin"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Chat = lazy(() => import("./pages/Chat"));

const queryClient = new QueryClient();

const AppRoutes = () => {
  useViewTransition();
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Suspense fallback={<FallbackLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/learn/:categoryId" element={<LearnPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/chat" element={<Chat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
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
            <AppRoutes />
          </BrowserRouter>
          <AIChatbot />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
