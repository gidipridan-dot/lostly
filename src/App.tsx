import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DemoStart from "./pages/DemoStart";
import NotFound from "./pages/NotFound";
import FestivalDemo from "./pages/FestivalDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demo" element={<DemoStart />} />
          <Route path="/festival" element={<FestivalDemo key="festival-home" />} />
          <Route path="/festival/lost" element={<FestivalDemo key="festival-lost" />} />
          <Route path="/festival/found" element={<FestivalDemo key="festival-found" />} />
          <Route path="/festival/claim" element={<FestivalDemo key="festival-claim" />} />
          <Route path="/lost" element={<Navigate to="/festival/lost" replace />} />
          <Route path="/found" element={<Navigate to="/festival/found" replace />} />
          <Route path="/claim" element={<Navigate to="/festival/claim" replace />} />
          <Route path="/recovery" element={<Navigate to="/festival/claim" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
