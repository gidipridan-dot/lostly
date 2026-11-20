import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DemoStart from "./pages/DemoStart";
import LostFlow from "./pages/LostFlow";
import FoundFlow from "./pages/FoundFlow";
import ClaimVerification from "./pages/ClaimVerification";
import RecoveryFlow from "./pages/RecoveryFlow";
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
          <Route path="/lost" element={<LostFlow />} />
          <Route path="/found" element={<FoundFlow />} />
          <Route path="/claim" element={<ClaimVerification />} />
          <Route path="/recovery" element={<RecoveryFlow />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
