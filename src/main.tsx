import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";

// Initialize error tracking and performance monitoring
import "@/lib/errorTracking";
import "@/lib/performanceMonitoring";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
