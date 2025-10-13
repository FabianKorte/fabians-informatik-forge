import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LearnPage from "./pages/Learn";
import Progress from "./pages/Progress";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import { AIChatbot } from "@/components/AIChatbot";
import { AuthProvider } from "@/hooks/useAuth";
import { useViewTransition } from "@/hooks/useViewTransition";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Footer } from "@/components/Footer";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useViewTransition();
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const App = () => (
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
);

export default App;
